import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const DASHSCOPE_KEY = process.env.DASHSCOPE_EMBEDDING_KEY!

async function getEmbedding(text: string): Promise<number[] | null> {
  try {
    const res = await fetch('https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/text-embedding', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${DASHSCOPE_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'text-embedding-v3',
        input: { texts: [text] },
        parameters: { dimension: 1024 },
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.output?.embeddings?.[0]?.embedding ?? null
  } catch { return null }
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  const name = req.nextUrl.searchParams.get('name') || ''
  const category = req.nextUrl.searchParams.get('category') || ''

  if (!slug) return NextResponse.json([])

  const searchQ = name || slug.replace(/-/g, ' ')

  // 并行：向量搜索 + ClawHub API
  const [vsResult, chResult] = await Promise.allSettled([
    // 向量搜索（主力）
    (async () => {
      const embedding = await getEmbedding(searchQ)
      if (!embedding) return []
      const { data } = await supabase.rpc('match_skills', {
        query_embedding: embedding,
        match_count: 10,
        match_threshold: 0.35,
      })
      return (data || [])
        .filter((s: any) => s.slug !== slug)
        .slice(0, 6)
        .map((s: any) => ({
          slug: s.slug,
          name: s.name,
          description: s.description || '',
          downloads: s.downloads || 0,
          installs_current: s.installs_current || 0,
          stars: s.stars || 0,
          similarity: s.similarity || 0,
          _score: s.score || 0,
          _vsearch: true,
        }))
    })(),

    // ClawHub 语义搜索（补充）
    fetch(`https://clawhub.ai/api/v1/search?q=${encodeURIComponent(searchQ)}&limit=8`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 3600 },
    }).then(r => r.ok ? r.json() : { results: [] }).catch(() => ({ results: [] })),
  ])

  const vsSkills = vsResult.status === 'fulfilled' ? vsResult.value : []

  let chSkills: any[] = []
  if (chResult.status === 'fulfilled') {
    const chData = chResult.value as any
    const seen = new Set(vsSkills.map((s: any) => s.slug))
    chSkills = (chData.results || [])
      .filter((s: any) => s.slug !== slug && !seen.has(s.slug))
      .slice(0, 4)
      .map((s: any) => ({
        slug: s.slug,
        name: s.displayName || s.slug,
        description: s.summary || s.description || '',
        downloads: 0,
      }))
  }

  // 加权排序后合并
  const combined = [...vsSkills, ...chSkills]
  const seen = new Set<string>()
  const deduped = combined.filter(s => {
    if (seen.has(s.slug)) return false
    seen.add(s.slug)
    return true
  })

  // 按 score 排序（向量已有score，ClawHub补充的按downloads）
  const results = deduped.map((s: any) => ({
    ...s,
    _score: s._score || (Math.log((s.downloads||0) + 1) * 0.5 + Math.log((s.installs_current||0) + 1) * 0.8 + (s.stars||0) * 0.3),
  })).sort((a: any, b: any) => b._score - a._score).slice(0, 5)

  // 如果两者都没结果，fallback 到 DB ilike
  if (results.length < 2) {
    const { data } = await supabase
      .from('skills')
      .select('slug, name, description, downloads')
      .or(`name.ilike.%${searchQ.split(' ')[0]}%,tags.cs.{${category}}`)
      .neq('slug', slug)
      .order('downloads', { ascending: false })
      .limit(5)
    return NextResponse.json(data || [])
  }

  return NextResponse.json(results)
}
