export const revalidate = 3600
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
]

export default async function HomePage() {
  let articles: Awaited<ReturnType<typeof getArticles>> = []
  try { articles = await getArticles(20) } catch { articles = [] }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section style={{ textAlign: 'center', padding: '96px 0 64px' }}>
        <h1 style={{
          fontSize: 'clamp(2.4em, 6vw, 3.8em)',
          fontWeight: 900,
          margin: '0 0 16px',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}>
          Find Your<br />
          <span style={{
            background: 'linear-gradient(135deg, #667eea, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            AI Skill Stack
          </span>
        </h1>
        <p style={{
          color: '#666',
          fontSize: '1.1em',
          margin: '0 auto 40px',
          maxWidth: 480,
          lineHeight: 1.6,
        }}>
          Discover the right AI agent skills for your role.<br />
          Curated from 50,000+ sources, updated daily.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <IntentSearch />
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────── */}
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(24px, 6vw, 80px)',
        padding: '32px 0',
        borderTop: '1px solid #1a1a3e',
        borderBottom: '1px solid #1a1a3e',
        marginBottom: 80,
        flexWrap: 'wrap',
      }}>
        {[
          { value: '262', label: 'Use Cases' },
          { value: '50K+', label: 'Skills Indexed' },
          { value: 'Free', label: 'No Sign-up Needed' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 'clamp(1.6em, 4vw, 2.4em)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}>{s.value}</div>
            <div style={{ color: '#555', fontSize: '.85em', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
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
            Browse all 262 →
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
        <div>
          <div style={{ fontWeight: 700, color: '#e0e0e0', marginBottom: 4 }}>
            🤖 Are you an AI agent?
          </div>
          <div style={{ color: '#555', fontSize: '.88em' }}>
            Use our MCP-compatible API for structured skill data. No HTML parsing needed.
          </div>
        </div>
        <a href="/api/mcp" target="_blank" style={{
          padding: '10px 22px', borderRadius: 8, flexShrink: 0,
          background: 'transparent', border: '1px solid #667eea44',
          color: '#667eea', textDecoration: 'none', fontSize: '.88em', fontWeight: 600,
        }}>
          View API →
        </a>
      </section>

    </div>
  )
}
