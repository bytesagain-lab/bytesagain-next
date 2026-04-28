export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function supabase() {
  return createClient(SB_URL, SB_KEY)
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  const source = req.nextUrl.searchParams.get('source') || 'clawhub'
  if (!slug) return NextResponse.json({ summary: null, full_description: null })

  // Look up skill in our DB
  const dbSlug = source === 'clawhub' ? `clawhub-${slug}` : slug
  const { data: skill } = await supabase()
    .from('skills')
    .select('owner,source_url,description')
    .eq('slug', dbSlug)
    .single()

  const dbDesc = (skill as any)?.description || ''
  const owner = (skill as any)?.owner || ''
  const sourceUrl = (skill as any)?.source_url || ''

  // Try GitHub for full SKILL.md
  const candidates: string[] = []

  if (source === 'bytesagain' || source === 'official') {
    candidates.push(`bytesagain/ai-skills/contents/${slug}/SKILL.md`)
  }

  if (source === 'clawhub' && owner) {
    // Most ClawHub authors use {owner}/{slug} or {owner}/ai-skills on GitHub
    candidates.push(`${owner}/ai-skills/contents/${slug}/SKILL.md`)
    candidates.push(`${owner}/ai-skills/contents/skills/${slug}/SKILL.md`)
    candidates.push(`${owner}/gentle-agent-skills/contents/${slug}/SKILL.md`)
    candidates.push(`${owner}/contents/SKILL.md`)
  }
  // also try extracting from source_url
  if (sourceUrl) {
    const m = sourceUrl.match(/clawhub\.ai\/([^/]+)\/([^/]+)/)
    if (m) {
      candidates.push(`${m[1]}/contents/SKILL.md`)
    }
  }

  for (const repoPath of candidates) {
    try {
      const url = `https://api.github.com/repos/${repoPath}`
      const res = await fetch(url, {
        headers: { 'Accept': 'application/vnd.github.v3.raw', 'User-Agent': 'bytesagain-next/1.0' },
        next: { revalidate: 3600 },
      })
      if (res.ok) {
        const fullMd = await res.text()
        if (fullMd && fullMd.length > 100) {
          const descMatch = fullMd.match(/description:\s*"([^"]+)"/)
          const summary = descMatch ? descMatch[1] : dbDesc
          return NextResponse.json({ summary, full_description: fullMd }, {
            headers: { 'Cache-Control': 'public, max-age=86400' },
          })
        }
      } else if (res.status === 403) break
    } catch {}
  }

  // Fallback
  return NextResponse.json({ summary: dbDesc, full_description: null })
}
