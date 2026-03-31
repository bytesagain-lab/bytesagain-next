import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || ''
  if (!q || q.length < 2) return NextResponse.json([])

  try {
    // 1. 本地DB精确匹配
    const { data: local } = await supabase
      .from('skills')
      .select('slug, name, description, category, downloads, owner')
      .or(`name.ilike.%${q}%,description.ilike.%${q}%`)
      .order('downloads', { ascending: false })
      .limit(5)

    // 2. ClawHub语义搜索（全平台4万个skill）
    const chRes = await fetch(
      `https://clawhub.ai/api/v1/search?q=${encodeURIComponent(q)}&limit=10`,
      { next: { revalidate: 300 } }
    )
    const chData = chRes.ok ? await chRes.json() : { results: [] }
    const localSlugs = new Set((local || []).map((s: any) => s.slug))
    const remote = (chData.results || [])
      .filter((s: any) => !localSlugs.has(s.slug))
      .slice(0, 5)
      .map((s: any) => ({
        slug: s.slug,
        name: s.displayName || s.slug,
        description: s.summary || '',
        category: '',
        downloads: 0,
        owner: '',
      }))

    const results = [...(local || []), ...remote].slice(0, 8)
    return NextResponse.json(results)
  } catch {
    return NextResponse.json([])
  }
}
