export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

const SB_URL = 'https://jfpeycpiyayrpjldppzq.supabase.co'
// Service role key (JWT) — for server-side data access
const SB_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGV5Y3BpeWF5cnBqbGRwcHpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDIzODExMiwiZXhwIjoyMDg5ODE0MTEyfQ.lD7IcVeN47mUlrP43DFhY8-BAzn_gJAqfOBBBjteA0I'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  const source = req.nextUrl.searchParams.get('source') || 'clawhub'
  if (!slug) return NextResponse.json({ summary: null, full_description: null })

  const dbSlug = source === 'clawhub' ? `clawhub-${slug}` : slug

  // Query Supabase REST API with service role key
  let owner = ''
  let dbDesc = ''
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/skills?select=owner,description&slug=eq.${encodeURIComponent(dbSlug)}&limit=1`,
      { headers: { 'apikey': SB_SERVICE_KEY, 'Authorization': `Bearer ${SB_SERVICE_KEY}` } }
    )
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

  // 1) openclaw/skills — ClawHub backup
  if (owner) {
    for (const branch of ['main', 'master']) {
      fullMd = await tryFetch(
        `https://raw.githubusercontent.com/openclaw/skills/${branch}/skills/${owner}/${slug}/SKILL.md`
      )
      if (fullMd) break
    }
  }

  // 2) bytesagain/ai-skills — our own
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
