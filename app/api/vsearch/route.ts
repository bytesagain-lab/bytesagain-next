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
  // Use REST API vector ordering instead of RPC (RPC times out on complex queries)
  const embStr = JSON.stringify(embedding)
  const url = `${SB_URL}/rest/v1/skills?select=slug,name,description,tags,source,downloads,installs_current,stars,is_ours&order=embedding.vec.cosine.${embStr}&limit=15&embedding=not.is.null`
  const res = await fetch(url, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
  })
  if (!res.ok) return []
  const data = await res.json()
  if (!Array.isArray(data)) return []
  return data.map((s: any) => ({
    slug: s.slug,
    name: s.name,
    description: s.description,
    tags: s.tags,
    source: s.source || 'clawhub',
    downloads: s.downloads || 0,
    installs_current: s.installs_current || 0,
    stars: s.stars || 0,
    is_ours: s.is_ours || false,
    _source: 'verified',
  }))
}

async function searchGithubSkills(embedding: number[]) {
  // Use REST API vector ordering for github_skill_index
  const embStr = JSON.stringify(embedding)
  const url = `${SB_URL}/rest/v1/github_skill_index?select=id,github_owner,repo,name,description,github_url,tags,stars,quality_score&order=embedding.vec.cosine.${embStr}&limit=10&embedding=not.is.null`
  const res = await fetch(url, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
  })
  if (!res.ok) return []
  const data = await res.json()
  if (!Array.isArray(data)) return []
  return data.map((s: any) => ({
    slug: `gh:${s.id}`,
    name: s.name,
    description: s.description,
    tags: s.tags || ['github-indexed'],
    source: 'github',
    downloads: 0,
    installs_current: 0,
    stars: s.stars || 0,
    is_ours: false,
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
  if (!embedding) {
    return NextResponse.json({ error: 'Failed to generate embedding' }, { status: 500 })
  }
  
  // Parallel: vector search (ClawHub) + vector search (GitHub index)
  const [clawhubResults, githubResults] = await Promise.all([
    searchSkills(embedding),
    searchGithubSkills(embedding),
  ])

  // Merge and shuffle: interleave ClawHub and GitHub results
  const merged: any[] = []
  const maxLen = Math.max(clawhubResults.length, githubResults.length)
  for (let i = 0; i < maxLen && merged.length < 20; i++) {
    if (i < clawhubResults.length) merged.push(clawhubResults[i])
    if (i < githubResults.length) merged.push(githubResults[i])
  }

  return NextResponse.json(merged)
}
