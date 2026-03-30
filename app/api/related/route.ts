import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') || ''
  const currentSlug = req.nextUrl.searchParams.get('slug') || ''

  if (!category) return NextResponse.json([])

  try {
    const res = await fetch(
      `https://clawhub.ai/api/v1/search?q=${encodeURIComponent(category)}&limit=10`,
      { next: { revalidate: 3600 } } // 1hr cache
    )
    if (!res.ok) return NextResponse.json([])
    const data = await res.json()
    const results = (data.results || [])
      .filter((s: any) => s.slug !== currentSlug)
      .slice(0, 5)
      .map((s: any) => ({
        slug: s.slug,
        name: s.displayName || s.slug,
        description: s.summary || '',
      }))
    return NextResponse.json(results)
  } catch {
    return NextResponse.json([])
  }
}
