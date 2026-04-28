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

  const dbSlug = source === 'clawhub' ? `clawhub-${slug}` : slug
  const { data: skill } = await supabase()
    .from('skills')
    .select('owner,source_url,description')
    .eq('slug', dbSlug)
    .single()

  const dbDesc = (skill as any)?.description || ''
  const owner = (skill as any)?.owner || ''
  const sourceUrl = (skill as any)?.source_url || ''

  // Strategy 1: GitHub raw — fast, no rate limit for public repos
  // Only works when owner name matches GitHub username exactly
  const ghAttempts: { owner: string; repo: string; path: string }[] = []

  if (source === 'bytesagain' || source === 'official') {
    ghAttempts.push({ owner: 'bytesagain', repo: 'ai-skills', path: `${slug}/SKILL.md` })
  }

  if (source === 'clawhub' && owner) {
    ghAttempts.push(
      { owner, repo: slug, path: 'SKILL.md' },
      { owner, repo: `ai-skills`, path: `skills/${slug}/SKILL.md` },
      { owner, repo: `ai-skills`, path: `${slug}/SKILL.md` },
    )
  }

  // Try main first, then master
  for (const { owner: o, repo: r, path: p } of ghAttempts) {
    for (const branch of ['main', 'master']) {
      try {
        const res = await fetch(`https://raw.githubusercontent.com/${o}/${r}/${branch}/${p}`, {
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
        }
      } catch {}
    }
  }

  // Strategy 2: Jina Reader — fetch SKILL.md from ClawHub page
  // Most reliable for third-party skills
  if (owner && sourceUrl) {
    try {
      const pageUrl = `https://clawhub.ai/${owner}/${slug}`
      const jinaRes = await fetch(`https://r.jina.ai/http://${pageUrl}`, {
        next: { revalidate: 3600 },
        headers: { 'x-return-format': 'markdown', 'Accept': 'text/markdown' },
      })
      if (jinaRes.ok) {
        const text = await jinaRes.text()
        // Strip Jina headers (Title: / URL Source: / Markdown Content: lines)
        const bodyMatch = text.match(/\n---\n([\s\S]*)/)
        const content = bodyMatch ? bodyMatch[1].trim() : text
        if (content && content.length > 300) {
          const descMatch = content.match(/description:\s*"([^"]+)"/)
          const summary = descMatch ? descMatch[1] : dbDesc
          return NextResponse.json({ summary, full_description: content }, {
            headers: { 'Cache-Control': 'public, max-age=3600' },
          })
        }
      }
    } catch {}
  }

  // Fallback
  return NextResponse.json({ summary: dbDesc, full_description: null })
}
