import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  const name = req.nextUrl.searchParams.get('name') || ''
  const category = req.nextUrl.searchParams.get('category') || ''

  if (!slug) return NextResponse.json([])

  // 搜索词优先级: name > slug关键词 > category
  const searchQ = name || slug.replace(/-/g, ' ')

  try {
    const res = await fetch(
      `https://clawhub.ai/api/v1/search?q=${encodeURIComponent(searchQ)}&limit=15`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return NextResponse.json([])
    const data = await res.json()

    const candidates = (data.results || [])
      .filter((s: any) => s.slug !== slug)
      .slice(0, 10)

    // 取下载量，过滤低质量
    const withStats = await Promise.all(
      candidates.map(async (s: any) => {
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
            description: s.summary || s.description || '',
            downloads,
          }
        } catch { return null }
      })
    )

    const results = withStats
      .filter((s): s is NonNullable<typeof s> => s !== null && s.downloads >= 10)
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 5)

    // fallback: 搜索结果直接用，不过滤下载量
    if (results.length < 3) {
      const fallback = candidates.slice(0, 5).map((s: any) => ({
        slug: s.slug,
        name: s.displayName || s.slug,
        description: s.summary || s.description || '',
        downloads: 0,
      }))
      return NextResponse.json(fallback)
    }

    return NextResponse.json(results)
  } catch {
    return NextResponse.json([])
  }
}
