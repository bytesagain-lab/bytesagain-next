export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function supabase() {
  return createClient(SB_URL, SB_KEY)
}

/** Fetch SKILL.md from a GitHub repo via raw.githubusercontent.com */
async function fetchRaw(ownerRepo: string, path: string): Promise<string | null> {
  for (const branch of ['main', 'master']) {
    try {
      const url = `https://raw.githubusercontent.com/${ownerRepo}/${branch}/${path}`
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
    .select('owner,description')
    .eq('slug', dbSlug)
    .single()

  const dbDesc = (skill as any)?.description || ''
  const owner = (skill as any)?.owner || ''

  let fullMd: string | null = null
  let summary = dbDesc

  // Strategy 1: Our own skills
  if (source === 'bytesagain' || source === 'official') {
    fullMd = await fetchRaw('bytesagain/ai-skills', `${slug}/SKILL.md`)
  }

  // Strategy 2: ClawHub skills — from openclaw/skills backup repo
  if (!fullMd && source === 'clawhub' && owner) {
    fullMd = await fetchRaw('openclaw/skills', `skills/${owner}/${slug}/SKILL.md`)
    // Try alternative author dir naming (some authors have long hash names)
    if (!fullMd) {
      fullMd = await fetchRaw('openclaw/skills', `skills/${owner}/${slug}/SKILL.md`)
    }
  }

  if (fullMd) {
    const descMatch = fullMd.match(/description:\s*"([^"]+)"/)
    summary = descMatch ? descMatch[1] : dbDesc
  }

  return NextResponse.json({
    summary,
    full_description: fullMd,
  }, {
    headers: { 'Cache-Control': 'public, max-age=86400' },
  })
}
