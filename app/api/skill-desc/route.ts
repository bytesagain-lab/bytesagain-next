export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sbp_05f85e90abd5f8ab19f1d7134146262a03fe6e5f78d6'

function supabase() {
  return createClient(SB_URL, SB_KEY)
}

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

  // Query database for owner
  let owner = ''
  let dbDesc = ''

  try {
    const { data } = await supabase()
      .from('skills')
      .select('owner,description')
      .eq('slug', dbSlug)
      .single()
    if (data) {
      owner = (data as any).owner || ''
      dbDesc = (data as any).description || ''
    }
  } catch (e) {
    // DB query failed — might be Vercel env issue
    // Fallback: construct owner from slug pattern
    // For clawhub skills, try with owner from skills_list MV
    try {
      const { data: mvData } = await supabase()
        .from('skills_list')
        .select('owner')
        .eq('slug', dbSlug)
        .single()
      if (mvData) owner = (mvData as any).owner || ''
    } catch {}
  }

  let fullMd: string | null = null

  // Try openclaw/skills — this is the ClawHub backup repo with ALL skills
  // Pattern: openclaw/skills/skills/{owner}/{slug}/SKILL.md
  if (owner) {
    fullMd = await fetchRaw('openclaw/skills', `skills/${owner}/${slug}/SKILL.md`)
  }

  // If owner doesn't match, try from skills_list MV that might have different encoding
  if (!fullMd && dbSlug.startsWith('clawhub-')) {
    // Try with first part of slug as fallback
    fullMd = await fetchRaw('openclaw/skills', `skills/${slug}/${slug}/SKILL.md`)
  }

  // Try bytesagain/ai-skills (for our own skills not detected as bytesagain source)
  if (!fullMd) {
    fullMd = await fetchRaw('bytesagain/ai-skills', `${slug}/SKILL.md`)
  }

  let summary = dbDesc
  if (fullMd) {
    const descMatch = fullMd.match(/description:\s*"([^"]+)"/)
    summary = descMatch ? descMatch[1] : dbDesc
  }

  return NextResponse.json({
    summary,
    full_description: fullMd,
    debug: { owner, dbSlug, slug, source },
  }, {
    headers: { 'Cache-Control': 'public, max-age=86400' },
  })
}
