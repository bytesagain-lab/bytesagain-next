import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 3600

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const CORS = { 'Access-Control-Allow-Origin': '*' }

/**
 * GET /api/related-usecases?slug=xxx&limit=6
 * 查询 skill_use_case_links_view，返回与该 skill 最相关的 use cases
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '6'), 12)
  
  if (!slug || slug.length < 2) {
    return NextResponse.json([], { headers: CORS })
  }

  try {
    const params = new URLSearchParams({
      skill_slug: `eq.${encodeURIComponent(slug)}`,
      order: 'relevance.desc',
      limit: String(limit),
    })
    const res = await fetch(`${SB_URL}/rest/v1/skill_use_case_links_view?${params}`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return NextResponse.json([], { headers: CORS })
    const data = await res.json()
    return NextResponse.json(data || [], {
      headers: {
        ...CORS,
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch {
    return NextResponse.json([], { headers: CORS })
  }
}
