export const revalidate = 86400
import { NextRequest, NextResponse } from 'next/server'

const CACHE_HEADERS = { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' }
const SOURCE_CATEGORIES = new Set(['clawhub','lobehub','dify','github','mcp','official'])

function sanitize(value: string, maxLen = 80) {
  return value.replace(/[^a-zA-Z0-9\- _]/g, '').slice(0, maxLen).trim()
}

async function fetchRelated(category: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const params = new URLSearchParams({
    select: 'slug,name,description,downloads',
    order: 'downloads.desc',
    limit: '10',
  })
  if (category) {
    if (SOURCE_CATEGORIES.has(category)) params.set('source', `eq.${category}`)
    else params.set('tags', `ov.{${category}}`)
  }
  const res = await fetch(`${url}/rest/v1/skills_list?${params.toString()}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    next: { revalidate: 86400 },
  })
  if (!res.ok) return []
  return res.json()
}

export async function GET(req: NextRequest) {
  const slug = sanitize(req.nextUrl.searchParams.get('slug') || '')
  const category = sanitize(req.nextUrl.searchParams.get('category') || '').toLowerCase()
  if (!slug) return NextResponse.json([], { headers: CACHE_HEADERS })

  // During crawler bursts, related recommendations must not call embeddings/vector RPC.
  // Category-level popular skills are stable, cache-friendly, and avoid per-slug DB work.
  const data = await fetchRelated(category)
  const results = (data || []).filter((s: any) => s.slug !== slug).slice(0, 5)
  return NextResponse.json(results, { headers: CACHE_HEADERS })
}
