import { getArticles } from '@/lib/supabase'
import SubscribeBox from './components/SubscribeBox'
import SearchBox from './components/SearchBox'
import HomeClient from './components/HomeClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BytesAgain — Find Your AI Skill Stack',
  description: 'Curated AI agent skills for developers, creators, traders, and more. Personalized recommendations from 100,000+ open-source AI skills.',
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

export default async function HomePage() {
  const articles = await getArticles(20)

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '64px 0 32px' }}>
        <div style={{
          display: 'inline-block', padding: '4px 14px', borderRadius: 20,
          background: '#667eea18', border: '1px solid #667eea44',
          color: '#667eea', fontSize: '.8em', fontWeight: 600, marginBottom: 20, letterSpacing: 1,
        }}>
          100,000+ OPEN-SOURCE AI SKILLS
        </div>
        <h1 style={{ fontSize: 'clamp(2em,5vw,3.2em)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15 }}>
          Find Your<br />
          <span style={{ background: 'linear-gradient(135deg,#667eea,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI Skill Stack
          </span>
        </h1>
        <p style={{ color: '#777', fontSize: '1em', margin: '0 0 28px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          Pick your role, get the right skills.
        </p>

        {/* Role selector — above search */}
        <HomeClient articles={articles} searchAbove />
      </section>

      {/* AI Mode banner */}
      <section style={{
        marginBottom: 48, padding: '24px 28px',
        background: 'linear-gradient(135deg,#0f0f23,#1a1a3e)',
        border: '1px solid #667eea33', borderRadius: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontWeight: 700, color: '#e0e0e0', marginBottom: 4 }}>🤖 Are you an AI agent?</div>
          <div style={{ color: '#666', fontSize: '.88em' }}>
            Use our MCP-compatible API for structured skill data. No HTML parsing needed.
          </div>
        </div>
        <a href="/api/mcp" target="_blank" style={{
          padding: '10px 20px', borderRadius: 8, flexShrink: 0,
          background: 'transparent', border: '1px solid #667eea',
          color: '#667eea', textDecoration: 'none', fontSize: '.88em', fontWeight: 600,
        }}>
          View API →
        </a>
      </section>

      <SubscribeBox />
    </div>
  )
}
