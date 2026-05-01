// Dynamic rendering: fetch fresh data on each request (not pre-rendered at build time)
export const revalidate = 0


import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import type { Metadata } from 'next'
import SkillSearchResults from '@/app/components/SkillSearchResults'

// CSS-in-JS hover workaround via global style tag (Server Component safe)
const hoverStyle = `
.skill-card:hover { border-color: #667eea !important; }
`

export const metadata: Metadata = {
  title: 'Browse AI Agent Skills',
  description: 'Browse 43,000+ curated AI agent skills from ClawHub, LobeHub, Dify and more. Filter by category, search by keyword.',
  alternates: { canonical: 'https://bytesagain.com/skills' },
}



const CATEGORIES = [
  'all',
  // 技术
  'coding','devops','api','database','security',
  // 数据与研究
  'data','research',
  // 内容创作
  'writing','image-gen','video','audio','translation',
  // 营销
  'seo','social-media','email-marketing','advertising',
  // 商业
  'finance','crypto-defi','ecommerce','legal','hr','real-estate',
  // 生活
  'health','education','cooking','travel','gaming',
  // 效率
  'automation','communication','productivity',
  // 来源
  'clawhub','bytesagain','lobehub','dify','mcp',
]

const SOURCE_BADGE: Record<string, { label: string; color: string; emoji: string }> = {
  clawhub:    { label: 'ClawHub',    color: '#667eea', emoji: '🦀' },
  github:     { label: 'GitHub',     color: '#444',    emoji: '⭐' },
  bytesagain: { label: 'BytesAgain', color: '#00d4ff', emoji: '✦' },
  lobehub:    { label: 'LobeHub',    color: '#7c3aed', emoji: '🤖' },
  dify:       { label: 'Dify',       color: '#f59e0b', emoji: '🔧' },
  mcp:        { label: 'MCP',        color: '#00c853', emoji: '🔌' },
  official:   { label: 'Official',   color: '#10b981', emoji: '✅' },
}

const PAGE_SIZE = 48

// Round-robin sources for cat=all: shuffle so each page shows a mix of sources
const ROUNDROBIN_SOURCES = ['clawhub', 'github', 'bytesagain', 'lobehub', 'dify', 'mcp', 'official']
const ROUNDROBIN_PER_PAGE = Math.ceil(PAGE_SIZE / ROUNDROBIN_SOURCES.length) + 2 // ~9 per source, 7 sources

// Fallback env: hardcoded as Vercel env vars sometimes missing during build
const _SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const _SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGV5Y3BpeWF5cnBqbGRwcHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzgxMTIsImV4cCI6MjA4OTgxNDExMn0.KnRmNBKeUPmJQz3m46uNx5kvBf_ZXBVWSUTXOLjW4Ps'
const _SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGV5Y3BpeWF5cnBqbGRwcHpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDIzODExMiwiZXhwIjoyMDg5ODE0MTEyfQ.lD7IcVeN47mUlrP43DFhY8-BAzn_gJAqfOBBBjteA0I'

async function cachedSkillsList(cat: string, from: number) {
  const url = _SUPABASE_URL
  const key = _SUPABASE_KEY
  
  if (cat === 'all') {
    // For 'all', round-robin fetch: get top skills from each source, then interleave
    const pagePromises = ROUNDROBIN_SOURCES.map(src => {
      const params = new URLSearchParams({
        select: 'slug,name,description,category,tags,downloads,stars,source,source_url,owner',
        order: 'downloads.desc',
        limit: String(ROUNDROBIN_PER_PAGE),
        offset: String(Math.floor(from / ROUNDROBIN_SOURCES.length)),
        source: `eq.${src}`,
      })
      return fetch(`${url}/rest/v1/skills_list?${params.toString()}`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        cache: 'no-store',
      }).then(r => r.ok ? r.json() : [])
    })
    const results = await Promise.allSettled(pagePromises)
    const bySource: Record<string, any[]> = {}
    results.forEach((res, i) => {
      if (res.status === 'fulfilled') bySource[ROUNDROBIN_SOURCES[i]] = res.value
      else bySource[ROUNDROBIN_SOURCES[i]] = []
    })
    // Interleave: take one from each source round-robin
    const interleaved: any[] = []
    let maxLen = Math.max(...Object.values(bySource).map(a => a.length))
    for (let i = 0; i < maxLen; i++) {
      for (const src of ROUNDROBIN_SOURCES) {
        if (i < bySource[src].length) {
          interleaved.push(bySource[src][i])
        }
      }
    }
    return interleaved.slice(0, PAGE_SIZE)
  }
  
  // Specific category or source
  const params = new URLSearchParams({
    select: 'slug,name,description,category,tags,downloads,stars,source,source_url,owner',
    order: 'downloads.desc',
    limit: String(PAGE_SIZE),
    offset: String(from),
  })
  if (['clawhub','lobehub','dify','github','mcp','official','bytesagain'].includes(cat)) {
    params.set('source', `eq.${cat}`)
  } else {
    params.set('tags', `ov.{${cat}}`)
  }
  const res = await fetch(`${url}/rest/v1/skills_list?${params.toString()}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: 'no-store',
  })
  if (!res.ok) return []
  return res.json()
}

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; page?: string; q?: string }>
}) {
  const supabase = createClient(
    _SUPABASE_URL,
    _SUPABASE_KEY
  )
  const sp = await searchParams
  const cat  = sp.cat  || 'all'
  const page = Math.max(1, parseInt(sp.page || '1'))
  const rawQ = (sp.q || '').trim()
  const from = (page - 1) * PAGE_SIZE

  // 多词查询取主要词（最长词），避免 AND 过严导致空结果
  const words = rawQ.split(/\s+/).filter(Boolean)
  const q = words.length > 1
    ? words.reduce((a, b) => a.length >= b.length ? a : b, words[0])
    : rawQ

  // 有搜索词时用全文搜索 RPC（更准确），否则用 skills_list 翻页
  let skills: any[] = []
  let total = 55000

  if (q) {
    try {
      // 全文搜索：不支持翻页，直接返回 top N
      const { data: ftsData } = await supabase.rpc('fts_search_skills', {
        query_text: q.replace(/-/g, ' '), // api-generator → api generator
        match_count: 200
      })
      let results = ftsData || []

      // GitHub skill index search - use REST ILIKE for reliability
      try {
        const ghUrl = `${_SUPABASE_URL}/rest/v1/github_skill_index?select=id,github_owner,repo,name,description,github_url,language,stars&or=(name.ilike.*${encodeURIComponent(q)}*,description.ilike.*${encodeURIComponent(q)}*)&order=stars.desc&limit=10`
        const ghRes = await fetch(ghUrl, {
          headers: { apikey: _SUPABASE_SERVICE_KEY, Authorization: `Bearer ${_SUPABASE_SERVICE_KEY}` },
        })
        const ghData = ghRes.ok ? await ghRes.json() : []
        if (ghData && ghData.length > 0) {
          const ghResults = ghData.map((g: any) => ({
            slug: `gh:${g.id}`,
            name: g.name,
            description: g.description,
            github_url: g.github_url,
            github_owner: g.github_owner,
            github_repo: g.repo,
            stars: g.stars || 0,
            language: g.language,
            downloads: 0,
            source: 'github',
            _source: 'github',
          }))
          results = [...results, ...ghResults]
        }
      } catch { /* GitHub search optional */ }
      // ilike fallback：全文搜不到时用 slug 匹配（补捉 api-generator 这类带连字符的 slug）
      if (results.length === 0) {
        const { data: ilikeData } = await supabase
          .from('skills')
          .select('slug,name,description,category,tags,downloads,stars,source,source_url,owner,is_ours')
          .or(`name.ilike.%${q}%,description.ilike.%${q}%,slug.ilike.%${q}%`)
          .order('downloads', { ascending: false })
          .limit(48)
        results = ilikeData || []
      }
      // 分类过滤
      if (cat !== 'all') {
        if (['clawhub','lobehub','dify','github','mcp','official','bytesagain'].includes(cat)) {
          results = results.filter((s: any) => s.source === cat)
        } else {
          results = results.filter((s: any) => (s.tags || []).includes(cat))
        }
      }
      // 搜索结果：自有skill优先，然后ClawHub和GitHub穿插
      const ghResults = results.filter((s: any) => s._source === 'github')
      const chResults = results.filter((s: any) => s._source !== 'github')
      // Sort ClawHub: is_ours first, then by downloads
      chResults.sort((a: any, b: any) => {
        const aOurs = a.is_ours ? 1 : 0
        const bOurs = b.is_ours ? 1 : 0
        if (aOurs !== bOurs) return bOurs - aOurs
        return (b.downloads || 0) - (a.downloads || 0)
      })
      // Sort GitHub by stars
      ghResults.sort((a: any, b: any) => (b.stars || 0) - (a.stars || 0))
      // Interleave: ClawHub, GitHub, ClawHub, GitHub...
      const interleaved: any[] = []
      const maxLen = Math.max(chResults.length, ghResults.length)
      for (let i = 0; i < maxLen && interleaved.length < 200; i++) {
        if (i * 3 < chResults.length) interleaved.push(chResults[i * 3])
        if (i < ghResults.length) interleaved.push(ghResults[i])
      }
      // Fill remaining ClawHub results
      for (const s of chResults) {
        if (!interleaved.includes(s)) interleaved.push(s)
      }
      results = interleaved
      skills = results
      total = results.length
    } catch (e) {
      console.error('search error', e)
    }
  } else {
    // 无搜索词：正常分页。Use cached REST fetch and avoid count(*) during crawler bursts.
    try {
      skills = await cachedSkillsList(cat, from)
      console.log('[skills page] cachedSkillsList returned', skills.length, 'skills for cat=', cat, 'from=', from)
      total = cat === 'all' ? 60202 : (skills.length < PAGE_SIZE ? from + skills.length : from + PAGE_SIZE + 1)
    } catch (e) {
      console.error('[skills page] cachedSkillsList error:', e instanceof Error ? e.message : String(e))
      skills = []
    }
  }
  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px' }}>
      <style dangerouslySetInnerHTML={{ __html: hoverStyle }} />

<h2 style={{ fontSize: '1.2em', color: '#e0e0e0', marginBottom: 8 }}>
        All Skills {cat !== 'all' ? `— ${cat}` : ''}
      </h2>
      <p style={{ color: '#666', marginBottom: 24 }}>
        {total.toLocaleString()} skills {cat !== 'all' ? `in "${cat}"` : 'total'}{rawQ ? ` matching "${rawQ}"` : ''}
      </p>

      {/* 搜索框 */}
      <form method="GET" style={{ marginBottom: 20, display: 'flex', gap: 8 }}>
        <input name="q" defaultValue={rawQ} placeholder="Search skills…"
          style={{ flex: 1, padding: '10px 16px', background: '#0f0f23', border: '1px solid #1a1a3e',
            borderRadius: 8, color: '#e0e0e0', fontSize: '1em' }} />
        {cat !== 'all' && <input type="hidden" name="cat" value={cat} />}
        <button type="submit" style={{ padding: '10px 20px', background: '#667eea',
          border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          Search
        </button>
      </form>

      {/* 分类过滤 — 桌面多行换行，移动单行横向滚动 */}
      <style>{`
        .cat-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
        @media (max-width: 640px) {
          .cat-pills { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
          .cat-pills::-webkit-scrollbar { display: none; }
        }
      `}</style>
      <div className="cat-pills">
        {CATEGORIES.map(c => (
          <Link key={c} href={`/skills?cat=${c}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            style={{
              padding: '5px 14px', borderRadius: 20, fontSize: '.85em', textDecoration: 'none',
              whiteSpace: 'nowrap',
              background: cat === c ? '#667eea' : '#0f0f23',
              color: cat === c ? '#fff' : '#888',
              border: `1px solid ${cat === c ? '#667eea' : '#1a1a3e'}`,
            }}>
            {c === 'all' ? '🌐 All' : c}
          </Link>
        ))}
      </div>

            {/* skill卡片网格 */}
      {q ? (
        <SkillSearchResults initialSkills={skills} query={q} />
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {(skills || []).map(skill => {
          const src = skill.source || 'clawhub'
          const badge = SOURCE_BADGE[src] || SOURCE_BADGE.clawhub
          const OUR_ACCOUNTS = ['ckchzh', 'xueyetianya', 'bytesagain3', 'bytesagain-lab', 'loutai0307-prog', 'bytesagain1']
          const isOurs = OUR_ACCOUNTS.includes(skill.owner || '')
          return (
            <Link key={skill.slug} href={skill._source === 'github' ? (skill.github_url || '#') : `/skill/${skill.slug}`} target={skill._source === 'github' ? '_blank' : undefined} rel={skill._source === 'github' ? 'noopener' : undefined} style={{ textDecoration: 'none' }}>
              <div className="skill-card" style={{
                background: '#0f0f23',
                border: isOurs ? '1px solid #00d4ff44' : '1px solid #1a1a3e',
                borderRadius: 12,
                padding: '20px', height: '100%', transition: 'border-color .2s',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: '.72em', background: badge.color, color: '#fff',
                      borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>
                      {badge.emoji} {badge.label}
                    </span>
                    {isOurs && (
                      <span style={{ fontSize: '.68em', color: '#00d4ff', background: '#00d4ff18', border: '1px solid #00d4ff33', borderRadius: 20, padding: '1px 7px', fontWeight: 600 }}>
                        ✦ BytesAgain
                      </span>
                    )}
                  </div>
                  {(skill.downloads ?? 0) > 0 && (
                    <span style={{ fontSize: '.75em', color: '#555' }}>
                      {Number(skill.downloads) >= 1000
                        ? `${(Number(skill.downloads)/1000).toFixed(1)}k`
                        : skill.downloads} dl
                    </span>
                  )}
                  {(skill.stars ?? 0) > 0 && skill._source !== 'github' && (
                    <span style={{ fontSize: '.75em', color: '#555' }}>⭐ {skill.stars}</span>
                  )}
                  {skill._source === 'github' && (skill.stars ?? 0) > 0 && (
                    <span style={{ fontSize: '.75em', color: '#00d4ff' }}>⭐ {(skill.stars >= 1000 ? `${(skill.stars/1000).toFixed(1)}k` : skill.stars)}</span>
                  )}
                </div>
                <div style={{ fontWeight: 700, color: '#e0e0e0', marginBottom: 6, fontSize: '.95em',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {skill.name || skill.slug}
                </div>
                <div style={{ fontSize: '.82em', color: '#666', lineHeight: 1.5,
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {skill.description || '—'}
                </div>
              </div>
            </Link>
          )
        })}
          </div>

          {/* 分页 */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40, flexWrap: 'wrap' }}>
          {page > 1 && (
            <Link href={`/skills?cat=${cat}&page=${page-1}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
              style={{ padding: '8px 16px', background: '#0f0f23', border: '1px solid #1a1a3e',
                borderRadius: 8, color: '#888', textDecoration: 'none' }}>
              ← Prev
            </Link>
          )}
          <span style={{ padding: '8px 16px', color: '#666', fontSize: '.9em' }}>
            Page {page} / {totalPages} ({total.toLocaleString()} skills)
          </span>
          {page < totalPages && (
            <Link href={`/skills?cat=${cat}&page=${page+1}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
              style={{ padding: '8px 16px', background: '#0f0f23', border: '1px solid #1a1a3e',
                borderRadius: 8, color: '#888', textDecoration: 'none' }}>
              Next →
            </Link>
          )}
        </div>
      )}
        </>
      )}
    </main>
  )
}
