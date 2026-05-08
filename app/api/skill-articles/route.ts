export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

const SB_URL = 'https://jfpeycpiyayrpjldppzq.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGV5Y3BpeWF5cnBqbGRwcHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzgxMTIsImV4cCI6MjA4OTgxNDExMn0.KnRmNBKeUPmJQz3m46uNx5kvBf_ZXBVWSUTXOLjW4Ps'

const headers = { 'apikey': ANON_KEY, 'Authorization': `Bearer ${ANON_KEY}` }

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  if (!slug) return NextResponse.json([])

  try {
    // 1. Query skill_articles for this skill slug
    const saRes = await fetch(
      `${SB_URL}/rest/v1/skill_articles?select=article_slug&skill_slug=eq.${encodeURIComponent(slug)}&limit=5`,
      { headers, next: { revalidate: 3600 } }
    )
    if (!saRes.ok) return NextResponse.json([])
    const saRows = await saRes.json()
    if (!saRows?.length) return NextResponse.json([])

    const articleSlugs = saRows.map((r: any) => r.article_slug).filter(Boolean)
    if (!articleSlugs.length) return NextResponse.json([])

    // 2. Fetch article details from posts table
    const slugFilter = articleSlugs.map((s: string) => `"${s}"`).join(',')
    const postsRes = await fetch(
      `${SB_URL}/rest/v1/posts?select=id,title,slug,category,author_name,published_at,updated_at&slug=in.(${slugFilter})&status=eq.published&order=published_at.desc&limit=10`,
      { headers, next: { revalidate: 3600 } }
    )
    if (!postsRes.ok) return NextResponse.json([])
    const posts = await postsRes.json()
    return NextResponse.json(posts || [])
  } catch {
    return NextResponse.json([])
  }
}
