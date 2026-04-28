export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function supabase() {
  return createClient(SB_URL, SB_KEY)
}

async function tryRaw(owner: string, repo: string, path: string): Promise<string | null> {
  for (const branch of ['main', 'master']) {
    try {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`
      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (res.ok) {
        const text = await res.text()
        if (text && text.length > 100) return text
      }
    } catch {}
  }
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

  // Strategy 1: Our own skills in bytesagain/ai-skills
  if (source === 'bytesagain' || source === 'official') {
    const md = await tryRaw('bytesagain', 'ai-skills', `${slug}/SKILL.md`)
    if (md) {
      const m = md.match(/description:\s*"([^"]+)"/)
      return NextResponse.json({ summary: m?.[1] || dbDesc, full_description: md },
        { headers: { 'Cache-Control': 'public, max-age=86400' } })
    }
  }

  // Strategy 2: Try ClawHub owner / slug on GitHub
  if (source === 'clawhub' && owner) {
    // Direct match: owner/slug
    let md = await tryRaw(owner, slug, 'SKILL.md')
    if (md) {
      const m = md.match(/description:\s*"([^"]+)"/)
      return NextResponse.json({ summary: m?.[1] || dbDesc, full_description: md },
        { headers: { 'Cache-Control': 'public, max-age=86400' } })
    }

    // Ai-skills org: ai-skills/owner-slug or ai-skills/slug
    md = await tryRaw('ai-skills', `${owner}-${slug}`, 'SKILL.md')
    if (!md) md = await tryRaw('ai-skills', slug, 'SKILL.md')
    if (md) {
      const m = md.match(/description:\s*"([^"]+)"/)
      return NextResponse.json({ summary: m?.[1] || dbDesc, full_description: md },
        { headers: { 'Cache-Control': 'public, max-age=86400' } })
    }

    // Try from source_url: extract repo guess
    const urlMatch = sourceUrl?.match(/clawhub\.ai\/([^/]+)\/([^/]+)/)
    if (urlMatch) {
      const sOwner = urlMatch[1], sSlug = urlMatch[2]
      // ClawHub owner might match GitHub username
      const knownMappings: Record<string, string> = {
        'pskoett': 'peterskoett',
        'steipete': 'steipete',
        'byungkyu': 'byungkyu',
      }
      const ghOwner = knownMappings[owner] || owner
      md = await tryRaw(ghOwner, sSlug, 'SKILL.md')
      if (!md) md = await tryRaw(ghOwner, 'ai-skills', `skills/${sSlug}/SKILL.md`)
      if (md) {
        const m = md.match(/description:\s*"([^"]+)"/)
        return NextResponse.json({ summary: m?.[1] || dbDesc, full_description: md },
          { headers: { 'Cache-Control': 'public, max-age=86400' } })
      }
    }
  }

  return NextResponse.json({ summary: dbDesc, full_description: null })
}
