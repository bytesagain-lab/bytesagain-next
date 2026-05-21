export const revalidate = 86400
import IntentSearch from './components/IntentSearch'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/supabase'
import UcScroll from './components/UcScroll'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const metadata: Metadata = {
  title: 'BytesAgain — Find Your AI Skill Stack',
  description: 'Search 60,000+ verified AI agent skills and 367 use-case workflows. Free, no login needed.',
  alternates: { canonical: 'https://bytesagain.com' },
  openGraph: {
    title: 'BytesAgain — Find Your AI Skill Stack',
    description: 'Search 60,000+ verified AI agent skills and 367 use-case workflows.',
    url: 'https://bytesagain.com',
    siteName: 'BytesAgain',
    type: 'website',
    images: [{ url: 'https://bytesagain.com/social-preview.png', width: 1200, height: 630 }],
  },
}

const USE_CASE_ICONS: Record<string, string> = {
  'build-saas': '🚀', 'content-creator': '✍️', 'data-analysis': '📊',
  'crypto-research': '💰', 'learn-programming': '🎓', 'seo-geo': '🔍',
  'meeting-notes-actions': '📋', 'knowledge-base-rag': '🧠', 'job-hunting': '💼',
  'stock-investor': '📈', 'product-listing-optimization': '🛒', 'bi-dashboard-builder': '📈',
  'travel-planner': '✈️', 'health-fitness': '🏃', 'startup-founder': '💡',
  'ecommerce-agent': '🛍️', 'writing-assistant': '📝', 'video-creation': '🎬',
}

async function getUseCases() {
  if (!SB_URL || !SB_KEY) return []
  try {
    const res = await fetch(`${SB_URL}/rest/v1/use_cases?select=slug,title,icon&limit=12`, {
      headers: { apikey: SB_KEY },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return []
    return await res.json() as { slug: string; title: string; icon?: string }[]
  } catch {
    return []
  }
}

async function getTopSkills() {
  if (!SB_URL || !SB_KEY) return []
  try {
    // Use skills_list instead of skills to avoid ORDER BY timeout on large table
    const res = await fetch(
      `${SB_URL}/rest/v1/skills_list?select=slug,name,description,category,downloads&limit=6`,
      {
        headers: { apikey: SB_KEY },
        next: { revalidate: 86400 },
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    // Filter to non-zero downloads if available, otherwise show first 6
    return (data as any[]).slice(0, 6)
  } catch {
    return []
  }
}

// ── 每日推荐 ─────────────────────────────────────
// Pick a single skill and use case deterministically from the current date.
// This ensures the same picks are shown all day, and change at midnight UTC+8.

function dailyPicksFromArray<T>(arr: T[]): T | null {
  if (!arr.length) return null
  const now = new Date()
  // Use Asia/Shanghai date for daily rotation
  const msShanghai = now.getTime() + 8 * 60 * 60 * 1000
  const dayKey = new Date(msShanghai).toISOString().slice(0, 10) // e.g. "2026-05-21"
  const dayNum = parseInt(dayKey.replace(/-/g, ''), 10) // e.g. 20260521
  const idx = dayNum % arr.length
  return arr[idx]
}

async function getDailyPickUseCase(): Promise<{ slug: string; title: string; icon: string } | null> {
  if (!SB_URL || !SB_KEY) return null
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/use_cases?select=slug,title,icon&limit=500`,
      {
        headers: { apikey: SB_KEY },
        next: { revalidate: 86400 },
      }
    )
    if (!res.ok) return null
    const data = await res.json() as { slug: string; title: string; icon?: string }[]
    if (!data.length) return null
    return dailyPicksFromArray(data) || data[0]
  } catch {
    return null
  }
}

async function getDailyPickSkill(): Promise<{ slug: string; name: string; description: string; downloads: number } | null> {
  if (!SB_URL || !SB_KEY) return null
  try {
    // Fetch a batch of top skills (popular ones make better picks)
    const res = await fetch(
      `${SB_URL}/rest/v1/skills_list?select=slug,name,description,downloads&order=downloads.desc&limit=100`,
      {
        headers: { apikey: SB_KEY },
        next: { revalidate: 86400 },
      }
    )
    if (!res.ok) return null
    const data = await res.json() as { slug: string; name: string; description: string; downloads: number }[]
    if (!data.length) return null
    // Filter to skills with downloads > 0
    const withDownloads = data.filter(s => (s.downloads || 0) > 0)
    const pool = withDownloads.length >= 20 ? withDownloads : data
    return dailyPicksFromArray(pool) || pool[0]
  } catch {
    return null
  }
}

export default async function HomePage() {
  const [articles, useCases, topSkills, dailyUC, dailySkill] = await Promise.all([
    getArticles(20).catch(() => [] as any[]),
    getUseCases(),
    getTopSkills(),
    getDailyPickUseCase(),
    getDailyPickSkill(),
  ])

  const useCaseItems = useCases.length > 0
    ? useCases.map(uc => ({
        icon: uc.icon || USE_CASE_ICONS[uc.slug] || '🔗',
        title: uc.title || uc.slug,
        href: `/use-case/${uc.slug}`,
      }))
    // Fallback to static list if DB unavailable
    : [
        { icon: '🚀', title: 'Build SaaS', href: '/use-case/build-saas' },
        { icon: '✍️', title: 'Content Creator', href: '/use-case/content-creator' },
        { icon: '📊', title: 'Data Analysis', href: '/use-case/data-analysis' },
        { icon: '💰', title: 'Crypto Research', href: '/use-case/crypto-research' },
        { icon: '🎓', title: 'Learn Programming', href: '/use-case/learn-programming' },
        { icon: '🔍', title: 'SEO & GEO', href: '/use-case/seo-geo' },
        { icon: '📋', title: 'Meeting Notes', href: '/use-case/meeting-notes-actions' },
        { icon: '🧠', title: 'Knowledge Base', href: '/use-case/knowledge-base-rag' },
        { icon: '💼', title: 'Job Hunting', href: '/use-case/job-hunting' },
        { icon: '📈', title: 'Stock Investor', href: '/use-case/stock-investor' },
        { icon: '🛒', title: 'E-commerce Seller', href: '/use-case/product-listing-optimization' },
        { icon: '📈', title: 'BI Dashboards', href: '/use-case/bi-dashboard-builder' },
      ]

  return (
    <>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>

        {/* ── HERO */}
        <section style={{ textAlign: 'center', padding: '52px 0 36px' }}>
          <h1 style={{
            fontSize: 'clamp(2em, 5vw, 3.2em)',
            fontWeight: 900,
            margin: '0 0 12px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            Find Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #667eea, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              AI Skill Stack
            </span>
          </h1>
          <p style={{ color: '#4b5563', fontSize: '1em', margin: '0 auto 28px', maxWidth: 440, lineHeight: 1.6 }}>
            Search 60,000+ verified AI agent skills by use case, role, or tool.
          </p>
          <IntentSearch />
        </section>

        {/* ── 3列特色入口 */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ display: 'none' }}>Browse AI Agent Skills, Use Cases, and MCP API</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { icon: '⚡', title: 'AI Agent Skills', desc: 'Search 60,000+ verified skills for Claude, Cursor, OpenClaw & more', href: '/skills', color: '#818cf8' },
              { icon: '🗺️', title: 'Use Case Guides', desc: '367 curated workflows — from SaaS to ecommerce to content', href: '/use-case', color: '#34d399' },
              { icon: '🔌', title: 'Free MCP API', desc: 'Connect your AI agent directly — no auth, no setup', href: '/mcp', color: '#00d4ff' },
            ].map(item => (
              <a key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div className="feature-card" style={{ background: '#0d0d1f', border: '1px solid #1e1e3f', borderRadius: 14, padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: 16, transition: 'border-color .15s' }}>
                  <span style={{ fontSize: '1.6em', lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: item.color, fontSize: '.95em', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ color: '#4b5563', fontSize: '.83em', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── 每日推荐：Use Case + Skill ── */}
        <section style={{ marginBottom: 48 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
          }}>
            {dailyUC && (
              <a href={`/use-case/${dailyUC.slug}`} style={{ textDecoration: 'none' }}>
                <div className="feature-card" style={{
                  background: 'linear-gradient(135deg, #0d0d1f, #1a1030)',
                  border: '1px solid #667eea44',
                  borderRadius: 14,
                  padding: '20px 24px',
                  transition: 'border-color .15s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: '.72em', background: '#667eea', color: '#fff',
                      borderRadius: 20, padding: '3px 10px', fontWeight: 700 }}>
                      🔥 推荐 Use Case
                    </span>
                    <span style={{ fontSize: '1.3em' }}>{dailyUC.icon || USE_CASE_ICONS[dailyUC.slug] || '🔗'}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: '#e0e0e0', fontSize: '1em', marginBottom: 4 }}>
                    {dailyUC.title || dailyUC.slug}
                  </div>
                  <div style={{ fontSize: '.82em', color: '#888' }}>
                    Daily hand-picked workflow
                  </div>
                </div>
              </a>
            )}
            {dailySkill && (
              <a href={`/skill/${dailySkill.slug}`} style={{ textDecoration: 'none' }}>
                <div className="feature-card" style={{
                  background: 'linear-gradient(135deg, #0d0d1f, #103020)',
                  border: '1px solid #00d4ff44',
                  borderRadius: 14,
                  padding: '20px 24px',
                  transition: 'border-color .15s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: '.72em', background: '#00d4ff', color: '#000',
                      borderRadius: 20, padding: '3px 10px', fontWeight: 700 }}>
                      ⭐ 推荐 Skill
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, color: '#e0e0e0', fontSize: '1em', marginBottom: 4 }}>
                    {dailySkill.name || dailySkill.slug}
                  </div>
                  {dailySkill.description && (
                    <div style={{ fontSize: '.82em', color: '#888', lineHeight: 1.4, marginBottom: 6 }}>
                      {dailySkill.description.slice(0, 100)}
                    </div>
                  )}
                  {(dailySkill.downloads || 0) > 0 && (
                    <div style={{ fontSize: '.76em', color: '#00d4ff' }}>
                      {Number(dailySkill.downloads) >= 1000
                        ? `${(Number(dailySkill.downloads)/1000).toFixed(1)}k`
                        : dailySkill.downloads} dl
                    </div>
                  )}
                </div>
              </a>
            )}
          </div>
        </section>

        {/* ── RECOMMENDED USE CASES 横向滚动 */}
        <section style={{ marginBottom: 64, margin: '0 -20px 64px' }}>
          <UcScroll items={useCaseItems} />
        </section>

        {/* ── TOP SKILLS 网格 */}
        {topSkills.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: '1em', fontWeight: 600, color: '#888', marginBottom: 12 }}>
              🔥 Top Skills Today
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {topSkills.map((s: any) => (
                <Link key={s.slug} href={`/skill/${s.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: '#0d0d1f', border: '1px solid #1e1e3f', borderRadius: 12,
                    padding: '16px 20px', transition: 'border-color .15s',
                  }} className="feature-card">
                    <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.93em', marginBottom: 6 }}>
                      {s.name || s.slug}
                    </div>
                    {s.description && (
                      <div style={{ color: '#4b5563', fontSize: '.81em', lineHeight: 1.4, marginBottom: 6 }}>
                        {s.description.slice(0, 120)}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 12, fontSize: '.76em', color: '#667eea' }}>
                      {(s.downloads > 0) && <span>⬇ {s.downloads.toLocaleString()}</span>}
                      {s.category && <span>📁 {s.category}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── 最新文章 */}
        {articles.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: '1em', fontWeight: 600, color: '#888', marginBottom: 12 }}>
              📝 Latest Articles
            </h2>
            <div style={{
              maxHeight: 320,
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#2a2a4e transparent',
            }}>
              {articles.map((a: any, i: number) => (
                <Link key={a.slug} href={`/article/${a.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '13px 0',
                    borderTop: i === 0 ? '1px solid #1a1a3e' : undefined,
                    borderBottom: '1px solid #1a1a3e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }} className="article-row">
                    {a.category && (
                      <span style={{
                        fontSize: '.7em', fontWeight: 700, color: '#667eea',
                        background: '#667eea15', border: '1px solid #667eea30',
                        borderRadius: 6, padding: '2px 8px',
                        whiteSpace: 'nowrap', flexShrink: 0, textTransform: 'uppercase',
                      }}>{a.category}</span>
                    )}
                    <span style={{ color: '#e0e0e0', fontSize: '.9em', fontWeight: 500, lineHeight: 1.4, flex: 1 }}>{a.title}</span>
                    <span style={{ color: '#667eea', fontSize: '.8em', flexShrink: 0 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  )
}
