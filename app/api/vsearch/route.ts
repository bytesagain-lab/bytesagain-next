import { NextRequest, NextResponse } from 'next/server'

const DASHSCOPE_KEY = process.env.DASHSCOPE_EMBEDDING_KEY!
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function getEmbedding(text: string): Promise<number[] | null> {
  try {
    const res = await fetch('https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/text-embedding', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DASHSCOPE_KEY}`,
        'Content-Type': 'application/json',
      },
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
  const q = req.nextUrl.searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  // 生成查询向量
  const embedding = await getEmbedding(q)
  if (!embedding) {
    return NextResponse.json({ error: 'Embedding failed' }, { status: 500 })
  }

  // 向量相似度搜索
  const res = await fetch(`${SB_URL}/rest/v1/rpc/match_skills`, {
    method: 'POST',
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query_embedding: embedding,
      match_count: 10,
      match_threshold: 0.3,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }

  const results = await res.json()
  return NextResponse.json(results.map((s: any) => ({
    slug: s.slug,
    name: s.name,
    description: s.description,
    tags: s.tags,
    source: s.source,
    similarity: Math.round(s.similarity * 100) / 100,
    downloads: s.downloads || 0,
    installs_current: s.installs_current || 0,
    stars: s.stars || 0,
    is_ours: s.is_ours || false,
    score: Math.round((s.score || 0) * 100) / 100,
  })))
}
