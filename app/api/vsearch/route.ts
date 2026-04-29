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

async function searchSkills(embedding: number[]) {
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
  if (!res.ok) return []
  return (await res.json()).map((s: any) => ({
    slug: s.slug,
    name: s.name,
    description: s.description,
    tags: s.tags,
    source: s.source || 'clawhub',
    similarity: Math.round(s.similarity * 100) / 100,
    downloads: s.downloads || 0,
    installs_current: s.installs_current || 0,
    stars: s.stars || 0,
    is_ours: s.is_ours || false,
    score: Math.round((s.score || 0) * 100) / 100,
    _source: 'verified',
  }))
}

async function searchGithubSkills(query: string) {
  const res = await fetch(`${SB_URL}/rest/v1/rpc/search_github_skill_index`, {
    method: 'POST',
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query_text: query,
      match_count: 10,
    }),
  })
  if (!res.ok) return []
  return (await res.json()).map((s: any) => ({
    slug: `gh:${s.id}`,
    name: s.name,
    description: s.description,
    tags: s.tags || ['github-indexed'],
    source: 'github',
    similarity: Math.round((s.rank || 0.5) * 100) / 100,
    downloads: 0,
    installs_current: 0,
    stars: s.stars || 0,
    is_ours: false,
    score: Math.round((s.quality_score || 0) * 100) / 100,
    github_owner: s.github_owner,
    github_repo: s.repo,
    github_url: s.github_url,
    _source: 'github',
  }))
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  const embedding = await getEmbedding(q)
  
  // Parallel: vector search (ClawHub) + FTS (GitHub index)
  const [clawhubResults, githubResults] = await Promise.all([
    embedding ? searchSkills(embedding) : Promise.resolve([]),
    searchGithubSkills(q),
  ])

  // Merge: ClawHub first (verified), then GitHub
  const merged = [...clawhubResults, ...githubResults].slice(0, 15)

  return NextResponse.json(merged)
}
