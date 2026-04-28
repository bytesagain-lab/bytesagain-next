export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

const SB_URL = 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = 'sbp_05f85e90abd5f8ab19f1d7134146262a03fe6e5f78d6'

async function tryFetch(url: string): Promise<string | null> {
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

  // Query DB directly via REST (avoids SDK issues in Vercel)
  let owner = ''
  let dbDesc = ''
  try {
    const restUrl = `${SB_URL}/rest/v1/skills?select=owner,description&slug=eq.${encodeURIComponent(dbSlug)}&limit=1`
    const res = await fetch(restUrl, {
      headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` },
    })
    if (res.ok) {
      const rows = await res.json()
      if (rows?.length > 0) {
        owner = rows[0].owner || ''
        dbDesc = rows[0].description || ''
      }
    }
  } catch {}

  // Try GitHub raw sources
  let fullMd: string | null = null

  // 1) openclaw/skills — ClawHub backup with ALL skills
  if (owner) {
    fullMd = await tryFetch(
      `https://raw.githubusercontent.com/openclaw/skills/main/skills/${owner}/${slug}/SKILL.md`
    )
    if (!fullMd) {
      fullMd = await tryFetch(
        `https://raw.githubusercontent.com/openclaw/skills/master/skills/${owner}/${slug}/SKILL.md`
      )
    }
  }

  // 2) bytesagain/ai-skills — our own skills
  if (!fullMd) {
    fullMd = await tryFetch(
      `https://raw.githubusercontent.com/bytesagain/ai-skills/main/${slug}/SKILL.md`
    )
    if (!fullMd) {
      fullMd = await tryFetch(
        `https://raw.githubusercontent.com/bytesagain/ai-skills/master/${slug}/SKILL.md`
      )
    }
  }

  const descMatch = fullMd?.match(/description:\s*"([^"]+)"/)
  const summary = descMatch ? descMatch[1] : dbDesc

  return NextResponse.json({ summary, full_description: fullMd })
}
