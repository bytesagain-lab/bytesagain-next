const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export interface GithubSkillIndexRow {
  id: string
  github_owner: string
  repo: string
  path: string
  name: string | null
  description: string | null
  github_url: string
  skillsmp_url?: string | null
  stars?: number | null
  language?: string | null
  updated_at?: string | null
  indexed_at?: string | null
  quality_score?: number | null
  tags?: string[] | null
}

async function ghIndexFetch(path: string, revalidate = 3600) {
  if (!SB_KEY) return []
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    next: { revalidate },
  })
  if (!res.ok) return []
  return res.json()
}

export async function getGithubSkill(id: string): Promise<GithubSkillIndexRow | null> {
  const safeId = id.replace(/[^a-f0-9]/gi, '').slice(0, 40)
  if (!safeId) return null
  const rows = await ghIndexFetch(`github_skill_index?id=eq.${safeId}&select=*&limit=1`, 3600)
  return rows[0] || null
}

export async function getGithubSkillIds(limit = 50_000, offset = 0): Promise<string[]> {
  // Supabase/PostgREST caps large requests, so fetch in 1k pages.
  const ids: string[] = []
  const pageSize = 1000
  for (let localOffset = 0; localOffset < limit; localOffset += pageSize) {
    const rows = await ghIndexFetch(
      `github_skill_index?select=id&order=quality_score.desc.nullslast&order=stars.desc.nullslast&limit=${pageSize}&offset=${offset + localOffset}`,
      86400
    )
    if (!rows.length) break
    ids.push(...rows.map((r: { id?: string }) => r.id).filter(Boolean))
    // Do not stop on a short page: very large PostgREST ordered scans can
    // occasionally return a partial page while later offsets still contain rows.
  }
  return ids
}

export async function getRelatedGithubSkills(row: GithubSkillIndexRow, limit = 6): Promise<GithubSkillIndexRow[]> {
  const tags = (row.tags || []).filter(t => t && t !== 'github-indexed')
  const query = tags[0] || row.repo || row.name || ''
  if (!query) return []
  const rows = await ghIndexFetch(
    `github_skill_index?select=id,github_owner,repo,path,name,description,github_url,skillsmp_url,stars,updated_at,quality_score,tags&or=(name.ilike.*${encodeURIComponent(query)}*,description.ilike.*${encodeURIComponent(query)}*)&id=neq.${row.id}&order=quality_score.desc.nullslast&limit=${limit}`,
    3600
  )
  return rows
}
