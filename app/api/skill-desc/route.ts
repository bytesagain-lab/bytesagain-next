export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sbp_05f85e90abd5f8ab19f1d7134146262a03fe6e5f78d6'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  const source = req.nextUrl.searchParams.get('source') || 'clawhub'
  if (!slug) return NextResponse.json({ summary: null, full_description: null })

  const dbSlug = source === 'clawhub' ? `clawhub-${slug}` : slug

  // Query database — use .maybeSingle() to avoid exceptions on not found
  const supabase = createClient(SB_URL, SB_KEY)
  let owner = ''
  let dbDesc = ''

  const { data } = await supabase
    .from('skills')
    .select('owner,description')
    .eq('slug', dbSlug)
    .maybeSingle()

  if (data) {
    owner = (data as any).owner || ''
    dbDesc = (data as any).description || ''
  }

  // Try openclaw/skills backup repo
  let fullMd: string | null = null

  if (owner) {
    for (const branch of ['main', 'master']) {
      const url = `https://raw.githubusercontent.com/openclaw/skills/${branch}/skills/${owner}/${slug}/SKILL.md`
      try {
        const res = await fetch(url, { next: { revalidate: 3600 } })
        if (res.ok) {
          const text = await res.text()
          if (text && text.length > 100) { fullMd = text; break }
        }
      } catch {}
    }
  }

  // Also try bytesagain/ai-skills for our own skills
  if (!fullMd) {
    for (const branch of ['main', 'master']) {
      const url = `https://raw.githubusercontent.com/bytesagain/ai-skills/${branch}/${slug}/SKILL.md`
      try {
        const res = await fetch(url, { next: { revalidate: 3600 } })
        if (res.ok) {
          const text = await res.text()
          if (text && text.length > 100) { fullMd = text; break }
        }
      } catch {}
    }
  }

  const descMatch = fullMd?.match(/description:\s*"([^"]+)"/)
  const summary = descMatch ? descMatch[1] : dbDesc

  return NextResponse.json({ summary, full_description: fullMd })
}
