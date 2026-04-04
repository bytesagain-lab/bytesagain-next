import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const DASHSCOPE_KEY = process.env.DASHSCOPE_EMBEDDING_KEY!

const supabase = createClient(SB_URL, SB_KEY)

async function getEmbedding(text: string): Promise<number[] | null> {
  try {
    const res = await fetch('https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/text-embedding', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${DASHSCOPE_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'text-embedding-v3', input: { texts: [text] }, parameters: { dimension: 1024 } }),
    })
    const data = await res.json()
    return data?.output?.embeddings?.[0]?.embedding ?? null
  } catch { return null }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('user_id')
  if (!userId) return NextResponse.json([])

  // 取最近收藏（权重高）+ 最近浏览（权重低）
  const [favsRes, viewsRes] = await Promise.all([
    supabase.from('skill_favorites').select('skill_slug').eq('user_id', userId).order('created_at', { ascending: false }).limit(10),
    supabase.from('skill_views').select('skill_slug').eq('user_id', userId).order('viewed_at', { ascending: false }).limit(20),
  ])

  const favSlugs = (favsRes.data || []).map((r: any) => r.skill_slug)
  const viewSlugs = (viewsRes.data || []).map((r: any) => r.skill_slug)

  // 合并已看过的 slug（用于排除）
  const seenSlugs = new Set([...favSlugs, ...viewSlugs])
  if (seenSlugs.size === 0) return NextResponse.json([])

  // 取这些 skill 的 tags 和 name，拼成查询文本
  const allSlugs = [...new Set([...favSlugs, ...viewSlugs])].slice(0, 15)
  const { data: skillData } = await supabase
    .from('skills')
    .select('slug, name, tags')
    .in('slug', allSlugs)

  if (!skillData || skillData.length === 0) return NextResponse.json([])

  // 收藏的权重是浏览的2倍
  const queryParts: string[] = []
  for (const s of skillData) {
    const isFav = favSlugs.includes(s.slug)
    const text = [s.name, ...(s.tags || [])].filter(Boolean).join(' ')
    if (isFav) { queryParts.push(text); queryParts.push(text) } // 收藏重复2次加权
    else queryParts.push(text)
  }
  const queryText = queryParts.join(' ')

  // 向量搜索
  const embedding = await getEmbedding(queryText)
  if (!embedding) return NextResponse.json([])

  const { data: results } = await supabase.rpc('match_skills', {
    query_embedding: embedding,
    match_count: 20,
    match_threshold: 0.4,
  })

  // 过滤掉已看过的，取前8个
  const recommendations = (results || [])
    .filter((s: any) => !seenSlugs.has(s.slug))
    .slice(0, 8)

  return NextResponse.json(recommendations)
}
