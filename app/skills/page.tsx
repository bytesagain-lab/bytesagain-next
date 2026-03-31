import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import type { Metadata } from 'next'

// CSS-in-JS hover workaround via global style tag (Server Component safe)
const hoverStyle = `
.skill-card:hover { border-color: #667eea !important; }
`

export const metadata: Metadata = {
  title: 'Browse AI Agent Skills — BytesAgain',
  description: 'Browse 43,000+ curated AI agent skills from ClawHub, LobeHub, Dify and more. Filter by category, search by keyword.',
  alternates: { canonical: 'https://bytesagain.com/skills' },
}

export const revalidate = 3600

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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
  'clawhub','lobehub','dify',
]

const SOURCE_BADGE: Record<string, { label: string; color: string; emoji: string }> = {
  clawhub:  { label: 'ClawHub',  color: '#667eea', emoji: '🦀' },
  github:   { label: 'GitHub',   color: '#444',    emoji: '⭐' },
  lobehub:  { label: 'LobeHub',  color: '#7c3aed', emoji: '🤖' },
  dify:     { label: 'Dify',     color: '#f59e0b', emoji: '🔧' },
  official: { label: 'Official', color: '#10b981', emoji: '✅' },
}

const PAGE_SIZE = 48

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; page?: string; q?: string }>
}) {
  const sp = await searchParams
  const cat  = sp.cat  || 'all'
  const page = Math.max(1, parseInt(sp.page || '1'))
  const q    = (sp.q || '').trim()
  const from = (page - 1) * PAGE_SIZE

  let query = supabase
    .from('skills')
    .select('slug,name,description,category,tags,downloads,stars,source,source_url,owner', { count: 'exact' })
    .order('downloads', { ascending: false })
    .range(from, from + PAGE_SIZE - 1)

  if (q) {
    query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`)
  }
  if (cat !== 'all') {
    if (['clawhub','lobehub','dify','github','official'].includes(cat)) {
      query = query.eq('source', cat)
    } else {
      query = query.overlaps('tags', [cat])
    }
  }

  const { data: skills, count } = await query
  const total = count || 0
  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px' }}>
      <style dangerouslySetInnerHTML={{ __html: hoverStyle }} />
      <h1 style={{ fontSize: '2em', color: '#e0e0e0', marginBottom: 8 }}>
        Browse AI Skills
      </h1>
      <p style={{ color: '#666', marginBottom: 24 }}>
        {total.toLocaleString()} skills {cat !== 'all' ? `in "${cat}"` : 'total'}{q ? ` matching "${q}"` : ''}
      </p>

      {/* 搜索框 */}
      <form method="GET" style={{ marginBottom: 20, display: 'flex', gap: 8 }}>
        <input name="q" defaultValue={q} placeholder="Search skills…"
          style={{ flex: 1, padding: '10px 16px', background: '#0f0f23', border: '1px solid #1a1a3e',
            borderRadius: 8, color: '#e0e0e0', fontSize: '1em' }} />
        {cat !== 'all' && <input type="hidden" name="cat" value={cat} />}
        <button type="submit" style={{ padding: '10px 20px', background: '#667eea',
          border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          Search
        </button>
      </form>

      {/* 分类过滤 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {CATEGORIES.map(c => (
          <Link key={c} href={`/skills?cat=${c}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
            style={{
              padding: '5px 14px', borderRadius: 20, fontSize: '.85em', textDecoration: 'none',
              background: cat === c ? '#667eea' : '#0f0f23',
              color: cat === c ? '#fff' : '#888',
              border: `1px solid ${cat === c ? '#667eea' : '#1a1a3e'}`,
            }}>
            {c === 'all' ? '🌐 All' : c}
          </Link>
        ))}
      </div>

      {/* skill卡片网格 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {(skills || []).map(skill => {
          const src = skill.source || 'clawhub'
          const badge = SOURCE_BADGE[src] || SOURCE_BADGE.clawhub
          return (
            <Link key={skill.slug} href={`/skill/${skill.slug}`} style={{ textDecoration: 'none' }}>
              <div className="skill-card" style={{
                background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 12,
                padding: '20px', height: '100%', transition: 'border-color .2s',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '.72em', background: badge.color, color: '#fff',
                    borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>
                    {badge.emoji} {badge.label}
                  </span>
                  {(skill.downloads ?? 0) > 0 && (
                    <span style={{ fontSize: '.75em', color: '#555' }}>
                      {Number(skill.downloads) >= 1000
                        ? `${(Number(skill.downloads)/1000).toFixed(1)}k`
                        : skill.downloads} dl
                    </span>
                  )}
                  {(skill.stars ?? 0) > 0 && (
                    <span style={{ fontSize: '.75em', color: '#555' }}>⭐ {skill.stars}</span>
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
    </main>
  )
}
