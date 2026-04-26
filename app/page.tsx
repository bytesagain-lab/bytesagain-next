export const revalidate = 60
import IntentSearch from './components/IntentSearch'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/supabase'
import UcScroll from './components/UcScroll'

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

const POPULAR_USE_CASES = [
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

const HOT_TAGS = ['Ecommerce Seller', 'Video Creation', 'SEO & GEO']

export default async function HomePage() {
  let articles: Awaited<ReturnType<typeof getArticles>> = []
  try { articles = await getArticles(20) } catch { articles = [] }

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

          {/* 搜索框 + 两个tab按钮 */}
          <IntentSearch />

        </section>

        {/* ── 3列特色入口 */}
        <section style={{ marginBottom: 56 }}>
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

        {/* ── USE CASES 横向滚动 */}
        <section style={{ marginBottom: 64, margin: '0 -20px 64px' }}>
          <UcScroll items={POPULAR_USE_CASES} />
        </section>

        {/* ── 最新文章 */}
        {articles.length > 0 && (
          <section style={{ marginBottom: 64 }}>
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
