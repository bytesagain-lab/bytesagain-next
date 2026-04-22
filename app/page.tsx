export const revalidate = 60
import { getArticles } from '@/lib/supabase'
import HomeClient from './components/HomeClient'
import IntentSearch from './components/IntentSearch'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'BytesAgain — Find Your AI Skill Stack',
  description: 'Curated AI agent skills for developers, creators, traders, and more. Personalized recommendations from 50,000+ AI skills.',
  alternates: { canonical: 'https://bytesagain.com' },
  openGraph: {
    title: 'BytesAgain — Find Your AI Skill Stack',
    description: 'Personalized AI skill recommendations. Tell us what you do, we tell you what to install.',
    url: 'https://bytesagain.com',
    siteName: 'BytesAgain',
    type: 'website',
    images: [{ url: 'https://bytesagain.com/og-image.png', width: 1200, height: 630 }],
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
]

export default async function HomePage() {
  let articles: Awaited<ReturnType<typeof getArticles>> = []
  try { articles = await getArticles(20) } catch { articles = [] }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>

      {/* ── 顶部订阅横幅 ──────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(90deg, #0d0d1f, #13103a)',
        borderBottom: '1px solid #1e1e3f',
        padding: '10px 20px',
        textAlign: 'center',
        fontSize: '.82em',
        color: '#818cf8',
        margin: '0 -20px 0',
      }}>
        🎁 <strong style={{ color: '#e2e8f0' }}>Get the FREE AI Skills Starter Guide</strong>
        {' — '}
        <a href="#subscribe" style={{ color: '#00d4ff', textDecoration: 'underline', cursor: 'pointer' }}>Subscribe →</a>
      </div>

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ textAlign: 'center', padding: '56px 0 40px' }}>
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

        {/* Search */}
        <div style={{ maxWidth: 560, margin: '0 auto 24px' }}>
          <IntentSearch />
        </div>

        {/* 热门场景标签 */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Python 自动化', '拼多多运营', 'Crypto Research', '视频剪辑', 'SEO & GEO', 'Job Hunting'].map(tag => (
            <a key={tag} href={`/?q=${encodeURIComponent(tag)}`} style={{
              fontSize: '.78em', color: '#6366f1', background: '#6366f112',
              border: '1px solid #6366f130', borderRadius: 999,
              padding: '4px 12px', textDecoration: 'none',
            }}>#{tag}</a>
          ))}
        </div>
      </section>

      {/* ── 3列特色入口（Machina风格）────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {[
            {
              icon: '⚡',
              title: 'AI Agent Skills',
              desc: 'Search 60,000+ skills for Claude, Cursor, OpenClaw & more',
              href: '/skills',
              color: '#818cf8',
            },
            {
              icon: '🗺️',
              title: 'Use Case Guides',
              desc: '200+ curated workflows — from SaaS to crypto to content',
              href: '/use-case',
              color: '#34d399',
            },
            {
              icon: '🔌',
              title: 'Free MCP API',
              desc: 'Connect your AI agent directly — no auth, no setup',
              href: '/mcp',
              color: '#00d4ff',
            },
          ].map(item => (
            <a key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#0d0d1f',
                border: '1px solid #1e1e3f',
                borderRadius: 14,
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                transition: 'border-color .15s',
              }}
                className="feature-card"
              >
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



      {/* ── POPULAR USE CASES ────────────────────────── */}
      <section style={{ marginBottom: 80 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 28,
        }}>
          <div>
            <h2 style={{ fontSize: '1.4em', fontWeight: 700, margin: 0, color: '#e0e0e0' }}>
              Popular Use Cases
            </h2>
            <p style={{ color: '#555', fontSize: '.85em', margin: '4px 0 0' }}>
              Real workflows powered by AI agent skills
            </p>
          </div>
          <Link href="/use-case" style={{
            color: '#667eea', fontSize: '.85em', fontWeight: 600,
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            Browse all →
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 14,
        }}>
          {POPULAR_USE_CASES.map(uc => (
            <Link key={uc.href} href={uc.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#0a0a1a',
                border: '1px solid #1a1a3e',
                borderRadius: 12,
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'border-color 0.15s, transform 0.15s',
                cursor: 'pointer',
              }}
                className="use-case-card"
              >
                <span style={{ fontSize: '1.5em', flexShrink: 0 }}>{uc.icon}</span>
                <span style={{ color: '#ccc', fontSize: '.92em', fontWeight: 600, lineHeight: 1.3 }}>
                  {uc.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ROLE SELECTOR + ARTICLES ─────────────────── */}
      <section style={{ marginBottom: 80 }}>
        <HomeClient articles={articles} searchAbove={false} />
      </section>

      {/* ── AI AGENT BANNER ──────────────────────────── */}
      <section style={{
        marginBottom: 64,
        padding: '28px 32px',
        background: 'linear-gradient(135deg, #0a0a1a, #111128)',
        border: '1px solid #1a1a3e',
        borderRadius: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: '#e0e0e0', marginBottom: 6, fontSize: '1em' }}>
            🤖 Built for AI Agents & Developers
          </div>
          <div style={{ color: '#888', fontSize: '.86em', lineHeight: 1.6, marginBottom: 10 }}>
            Two ways to integrate — pick what fits your stack:
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#00d4ff', fontSize: '.82em', fontWeight: 700, marginBottom: 3 }}>MCP SSE (streamable-http)</div>
              <code style={{ color: '#aaa', fontSize: '.78em', background: '#0a0a1a', padding: '3px 8px', borderRadius: 4, display: 'block' }}>
                https://bytesagain.com/api/mcp/sse
              </code>
              <div style={{ color: '#555', fontSize: '.78em', marginTop: 3 }}>Tools: search_skills · get_skill · popular_skills</div>
            </div>
            <div>
              <div style={{ color: '#667eea', fontSize: '.82em', fontWeight: 700, marginBottom: 3 }}>REST API (GET)</div>
              <code style={{ color: '#aaa', fontSize: '.78em', background: '#0a0a1a', padding: '3px 8px', borderRadius: 4, display: 'block' }}>
                /api/mcp?action=search&q=email
              </code>
              <div style={{ color: '#555', fontSize: '.78em', marginTop: 3 }}>7 languages · 60,000+ skills · No auth required</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
          <a href="/mcp" style={{
            padding: '9px 20px', borderRadius: 8,
            background: 'linear-gradient(135deg,#667eea,#00d4ff)',
            color: '#fff', textDecoration: 'none', fontSize: '.85em', fontWeight: 700,
            textAlign: 'center' as const,
          }}>
            Docs & Setup →
          </a>
          <a href="/install" style={{
            padding: '9px 20px', borderRadius: 8,
            background: 'transparent', border: '1px solid #667eea44',
            color: '#667eea', textDecoration: 'none', fontSize: '.85em', fontWeight: 600,
            textAlign: 'center' as const,
          }}>
            Quick Install
          </a>
        </div>
      </section>

    </div>
  )
}
