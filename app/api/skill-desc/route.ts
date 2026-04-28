export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function supabase() {
  return createClient(SB_URL, SB_KEY)
}

async function fetchGitHubRaw(owner: string, repo: string, path: string): Promise<string | null> {
  // Use raw.githubusercontent.com — no rate limits for public files
  // Try main first, then master
  let url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`
  let res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) {
    url = `https://raw.githubusercontent.com/${owner}/${repo}/master/${path}`
    res = await fetch(url, { next: { revalidate: 3600 } })
  }
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (res.ok) {
      const text = await res.text()
      if (text && text.length > 100) return text
    }
  } catch {}
  return null
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  const source = req.nextUrl.searchParams.get('source') || 'clawhub'
  if (!slug) return NextResponse.json({ summary: null, full_description: null })

  const dbSlug = source === 'clawhub' ? `clawhub-${slug}` : slug
  const { data: skill } = await supabase()
    .from('skills')
    .select('owner,source_url,description')
    .eq('slug', dbSlug)
    .single()

  const dbDesc = (skill as any)?.description || ''
  const owner = (skill as any)?.owner || ''
  const sourceUrl = (skill as any)?.source_url || ''

  // Try raw.githubusercontent.com for SKILL.md
  const attempts: { owner: string; repo: string; path: string }[] = []

  if (source === 'bytesagain' || source === 'official') {
    attempts.push({ owner: 'bytesagain', repo: 'ai-skills', path: `${slug}/SKILL.md` })
  }

  if (source === 'clawhub' && owner) {
    // Try common patterns
    attempts.push({ owner, repo: slug, path: 'SKILL.md' })
    attempts.push({ owner, repo: `ai-skills`, path: `skills/${slug}/SKILL.md` })
    attempts.push({ owner, repo: `ai-skills`, path: `${slug}/SKILL.md` })
    attempts.push({ owner, repo: `gentle-agent-skills`, path: `${slug}/SKILL.md` })
    attempts.push({ owner, repo: `claude-code-skills`, path: `${slug}/SKILL.md` })
    attempts.push({ owner, repo: `ai-scripts`, path: `${slug}/SKILL.md` })
    attempts.push({ owner, repo: `skills`, path: `${slug}/SKILL.md` })
  }

  // Also try from source_url patterns
  if (sourceUrl) {
    const m = sourceUrl.match(/clawhub\.ai\/([^/]+)\/([^/]+)/)
    if (m) {
      const sOwner = m[1], sSlug = m[2]
      if (sOwner !== owner) {
        attempts.push({ owner: sOwner, repo: sSlug, path: 'SKILL.md' })
      }
    }
  }

  for (const a of attempts) {
    const fullMd = await fetchGitHubRaw(a.owner, a.repo, a.path)
    if (fullMd) {
      const descMatch = fullMd.match(/description:\s*"([^"]+)"/)
      const summary = descMatch ? descMatch[1] : dbDesc
      return NextResponse.json({ summary, full_description: fullMd }, {
        headers: { 'Cache-Control': 'public, max-age=86400' },
      })
    }
  }

  return NextResponse.json({ summary: dbDesc, full_description: null })
}
