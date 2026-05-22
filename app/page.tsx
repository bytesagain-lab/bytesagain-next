export const revalidate = 86400
import IntentSearch from './components/IntentSearch'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/supabase'

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

// ── 每日推荐 — 每天自动轮换一个 Use Case + 一个 Skill ──

function dailyPick<T>(arr: T[]): T | null {
  if (!arr.length) return null
  const ms = new Date().getTime() + 8 * 60 * 60 * 1000
  const dayNum = parseInt(new Date(ms).toISOString().slice(0, 10).replace(/-/g, ''), 10)
  return arr[dayNum % arr.length]
}

async function getDailyUseCase(): Promise<{ slug: string; title: string; icon?: string } | null> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/use_cases?select=slug,title,icon&limit=500`, {
      headers: { apikey: SB_KEY },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const data = await res.json() as { slug: string; title: string; icon?: string }[]
    return dailyPick(data) || data[0]
  } catch { return null }
}

async function getDailySkill(): Promise<{ slug: string; name: string; description: string; downloads: number } | null> {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/skills_list?select=slug,name,description,downloads&order=downloads.desc&limit=100`, {
      headers: { apikey: SB_KEY },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const data = await res.json() as { slug: string; name: string; description: string; downloads: number }[]
    const pool = data.filter(s => (s.downloads || 0) > 0)
    return dailyPick(pool.length >= 20 ? pool : data) || data[0]
  } catch { return null }
}

export default async function HomePage() {
  const [articles, dailyUC, dailySkill] = await Promise.all([
    getArticles(20).catch(() => [] as any[]),
    getDailyUseCase(),
    getDailySkill(),
  ])

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
        <section style={{ marginBottom: 48 }}>
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

        {/* ── 每日推荐 — 每天一个 Use Case + 一个 Skill */}
        <section style={{ marginBottom: 56 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
          }}>
            {dailyUC && (
              <a href={`/use-case/${dailyUC.slug}`} style={{ textDecoration: 'none' }}>
                <div className="feature-card" style={{
                  background: 'linear-gradient(135deg, #0d0d1f, #1a1030)',
                  border: '1px solid #818cf844',
                  borderRadius: 14,
                  padding: '20px 24px',
                  transition: 'border-color .15s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: '.72em', background: '#818cf8', color: '#fff',
                      borderRadius: 20, padding: '3px 10px', fontWeight: 700 }}>
                      🗺️ 推荐 Use Case
                    </span>
                    <span style={{ fontSize: '1.3em' }}>{dailyUC.icon || '🔗'}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: '#e0e0e0', fontSize: '1em', marginBottom: 4 }}>
                    {dailyUC.title || dailyUC.slug}
                  </div>
                  <div style={{ fontSize: '.82em', color: '#888' }}>
                    今日推荐工作流程
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
