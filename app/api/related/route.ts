import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') || ''
  const currentSlug = req.nextUrl.searchParams.get('slug') || ''

  if (!category) return NextResponse.json([])

  try {
    // Get more results from search
    const res = await fetch(
      `https://clawhub.ai/api/v1/search?q=${encodeURIComponent(category)}&limit=20`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return NextResponse.json([])
    const data = await res.json()

    const candidates = (data.results || [])
      .filter((s: any) => s.slug !== currentSlug)
      .slice(0, 20)

    // Fetch stats for each to filter by downloads
    const withStats = await Promise.all(
      candidates.slice(0, 10).map(async (s: any) => {
        try {
          const r = await fetch(`https://clawhub.ai/api/v1/skills/${s.slug}`, {
            next: { revalidate: 3600 }
          })
          if (!r.ok) return null
          const d = await r.json()
          const downloads = d.skill?.stats?.downloads || 0
          return {
            slug: s.slug,
            name: s.displayName || s.slug,
            description: s.summary || '',
            downloads,
          }
        } catch { return null }
      })
    )

    const results = withStats
      .filter((s): s is NonNullable<typeof s> => s !== null && s.downloads >= 50)
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 5)

    // Fallback: if not enough high-download results, use top search results
    if (results.length < 3) {
      const fallback = candidates.slice(0, 5).map((s: any) => ({
        slug: s.slug,
        name: s.displayName || s.slug,
        description: s.summary || '',
        downloads: 0,
      }))
      return NextResponse.json(fallback)
    }

    return NextResponse.json(results)
  } catch {
    return NextResponse.json([])
  }
}
