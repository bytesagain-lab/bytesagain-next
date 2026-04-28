export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

const SB_URL = 'https://jfpeycpiyayrpjldppzq.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGV5Y3BpeWF5cnBqbGRwcHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzgxMTIsImV4cCI6MjA4OTgxNDExMn0.KnRmNBKeUPmJQz3m46uNx5kvBf_ZXBVWSUTXOLjW4Ps'

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

  // Query skills_list MV (public RLS, anon key works)
  let owner = ''
  let dbDesc = ''
  const headers = { 'apikey': ANON_KEY, 'Authorization': `Bearer ${ANON_KEY}` }
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/skills_list?select=owner,description&slug=eq.${encodeURIComponent(dbSlug)}&limit=1`,
      { headers }
    )
    if (res.ok) {
      const rows = await res.json()
      if (rows?.length > 0) {
        owner = rows[0]?.owner || ''
        dbDesc = rows[0]?.description || ''
      }
    }
  } catch {}

  // Fallback: if no owner from MV (MV might not have owner column), try skills table
  if (!owner) {
    try {
      const res2 = await fetch(
        `${SB_URL}/rest/v1/skills?select=owner,description&slug=eq.${encodeURIComponent(dbSlug)}&limit=1`,
        { headers }
      )
      if (res2.ok) {
        const rows2 = await res2.json()
        if (rows2?.length > 0) {
          owner = rows2[0]?.owner || ''
          dbDesc = rows2[0]?.description || ''
        }
      }
    } catch {}
  }

  // Try GitHub raw sources
  let fullMd: string | null = null

  // 1) openclaw/skills — ClawHub backup
  if (owner) {
    for (const branch of ['main', 'master']) {
      fullMd = await tryFetch(
        `https://raw.githubusercontent.com/openclaw/skills/${branch}/skills/${owner}/${slug}/SKILL.md`
      )
      if (fullMd) break
    }
  }

  // 2) bytesagain/ai-skills
  if (!fullMd) {
    for (const branch of ['main', 'master']) {
      fullMd = await tryFetch(
        `https://raw.githubusercontent.com/bytesagain/ai-skills/${branch}/${slug}/SKILL.md`
      )
      if (fullMd) break
    }
  }

  const descMatch = fullMd?.match(/description:\s*"([^"]+)"/)
  const summary = descMatch ? descMatch[1] : dbDesc
  return NextResponse.json({ summary, full_description: fullMd })
}
