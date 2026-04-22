export const revalidate = 60
import IntentSearch from './components/IntentSearch'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'BytesAgain — Find Your AI Skill Stack',
  description: 'Search 60,000+ AI agent skills by use case, role, or tool. Free, no login needed.',
  alternates: { canonical: 'https://bytesagain.com' },
  openGraph: {
    title: 'BytesAgain — Find Your AI Skill Stack',
    description: 'Search 60,000+ AI agent skills by use case, role, or tool.',
    url: 'https://bytesagain.com',
    siteName: 'BytesAgain',
    type: 'website',
    images: [{ url: 'https://bytesagain.com/social-preview.png', width: 1200, height: 630 }],
  },
}

const POPULAR_USE_CASES = [
  { icon: '🚀', title: 'Build SaaS', href: '/use-case/build-saas' },
  { icon: '✍️', title: 'Content Creator', href: '/use-case/content-creator' },
  { icon: '📊', title: 'Data Analysis', href: '/use-case/data-analysis' },
  { icon: '💰', title: 'Crypto Research', href: '/use-case/crypto-research' },
  { icon: '🎓', title: 'Learn Programming', href: '/use-case/learn-programming' },
  { icon: '🔍', title: 'SEO & GEO', href: '/use-case/seo-geo' },
  { icon: '📋', title: 'Meeting Notes', href: '/use-case/meeting-notes-actions' },
  { icon: '🧠', title: 'Knowledge Base', href: '/use-case/knowledge-base-rag' },
]

const HOT_TAGS = ['Python 自动化', '拼多多运营', 'Crypto Research', '视频剪辑', 'SEO & GEO', 'Job Hunting']

export default async function HomePage() {
  let articles: Awaited<ReturnType<typeof getArticles>> = []
  try { articles = await getArticles(6) } catch { articles = [] }

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
            Search 60,000+ AI agent skills by use case, role, or tool.
          </p>

          {/* 搜索框 + 两个tab按钮 */}
          <IntentSearch />

          {/* 热门标签 — 直接跳搜索结果 */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
            {HOT_TAGS.map(tag => (
              <a key={tag} href={`/skills?q=${encodeURIComponent(tag)}`} style={{
                fontSize: '.78em', color: '#6366f1', background: '#6366f112',
                border: '1px solid #6366f130', borderRadius: 999,
                padding: '4px 12px', textDecoration: 'none',
              }}>#{tag}</a>
            ))}
          </div>
        </section>

        {/* ── 3列特色入口 */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { icon: '⚡', title: 'AI Agent Skills', desc: 'Search 60,000+ skills for Claude, Cursor, OpenClaw & more', href: '/skills', color: '#818cf8' },
              { icon: '🗺️', title: 'Use Case Guides', desc: '200+ curated workflows — from SaaS to crypto to content', href: '/use-case', color: '#34d399' },
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

        {/* ── USE CASES 横向滚动 */}
        <section style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
            <Link href="/use-case" style={{ color: '#667eea', fontSize: '.85em', fontWeight: 600, textDecoration: 'none' }}>
              Browse all use cases →
            </Link>
          </div>
          <div className="uc-scroll-track">
            {POPULAR_USE_CASES.map(uc => (
              <Link key={uc.href} href={uc.href} style={{ textDecoration: 'none', flexShrink: 0 }}>
                <div className="uc-scroll-card use-case-card">
                  <span style={{ fontSize: '1.8em' }}>{uc.icon}</span>
                  <span style={{ color: '#ccc', fontSize: '.9em', fontWeight: 600, whiteSpace: 'nowrap' }}>{uc.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 最新文章 */}
        {articles.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {articles.map((a: any) => (
                <Link key={a.slug} href={`/article/${a.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="feature-card" style={{ background: '#0d0d1f', border: '1px solid #1e1e3f', borderRadius: 12, padding: '20px 22px', height: '100%', boxSizing: 'border-box' }}>
                    <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.92em', lineHeight: 1.4 }}>{a.title}</div>
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
