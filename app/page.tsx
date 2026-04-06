import { getArticles } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'
import HomeClient from './components/HomeClient'
import IntentSearch from './components/IntentSearch'
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

export const revalidate = 86400

export default async function HomePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [articles, { count }] = await Promise.all([
    getArticles(20),
    supabase.from('skills').select('*', { count: 'exact', head: true }),
  ])

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '64px 0 16px' }}>
        <h1 style={{ fontSize: 'clamp(2em,5vw,3.2em)', fontWeight: 900, margin: '0 0 12px', lineHeight: 1.15 }}>
          Find Your<br />
          <span style={{ background: 'linear-gradient(135deg,#667eea,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI Skill Stack
          </span>
        </h1>
        <p style={{ color: '#777', fontSize: '1em', margin: '0 0 12px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          Pick your role, get the right skills.
        </p>

        {/* Live stats bar */}
        <p style={{ color: '#555', fontSize: '.8em', margin: '0 0 20px' }}>
          <span style={{ color: '#667eea', fontWeight: 700 }}>{(count || 628).toLocaleString()}</span> curated
          {' · '}
          <span style={{ color: '#667eea', fontWeight: 700 }}>107,264</span> indexed
          {' · '}
          Updated {today}
        </p>

        {/* Intent search */}
        <div style={{ marginBottom: 24 }}>
          <IntentSearch />
        </div>

        {/* Role selector + search */}
        <HomeClient articles={articles} searchAbove />
      </section>

      {/* Popular Use Cases */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: '1.4em', color: '#e0e0e0', margin: 0, fontWeight: 700 }}>Popular Use Cases</h2>
            <p style={{ color: '#555', fontSize: '.85em', margin: '4px 0 0' }}>Real workflows, ready-to-use skill stacks</p>
          </div>
          <a href="/use-case" style={{ color: '#667eea', fontSize: '.88em', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            View all →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
          {[
            { icon: '📋', title: 'Meeting Notes & Actions', desc: 'Auto-capture action items from any meeting', href: '/use-case/meeting-notes-actions' },
            { icon: '📰', title: 'Daily Reddit Digest', desc: 'Top posts from your subreddits, summarized', href: '/use-case/daily-reddit-digest' },
            { icon: '🧠', title: 'Personal Knowledge Base', desc: 'Build a searchable second brain with RAG', href: '/use-case/knowledge-base-rag' },
            { icon: '💰', title: 'Quant Trading', desc: 'Backtesting, signals, and portfolio tools', href: '/use-case/quant-finance' },
            { icon: '📧', title: 'Inbox Declutter', desc: 'Triage and summarize your email backlog', href: '/use-case/inbox-declutter' },
            { icon: '🎙️', title: 'Podcast Production', desc: 'From recording to show notes, automated', href: '/use-case/podcast-production' },
          ].map(uc => (
            <a key={uc.href} href={uc.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 12, padding: '18px 20px', cursor: 'pointer' }}>
                <div style={{ fontSize: '1.6em', marginBottom: 8 }}>{uc.icon}</div>
                <div style={{ fontWeight: 700, color: '#e0e0e0', fontSize: '.95em', marginBottom: 6 }}>{uc.title}</div>
                <div style={{ fontSize: '.82em', color: '#555', lineHeight: 1.5 }}>{uc.desc}</div>
              </div>
            </a>
          ))}
        </div>
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

    </div>
  )
}
