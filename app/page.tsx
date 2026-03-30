import { getSkills, getArticles } from '@/lib/supabase'
import SubscribeBox from './components/SubscribeBox'
import SearchBox from './components/SearchBox'
import RoleSelector from './components/RoleSelector'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BytesAgain — Find Your AI Skill Stack',
  description: 'Curated AI agent skills for developers, creators, traders, and more. Personalized recommendations from 100,000+ skills worldwide.',
  alternates: { canonical: 'https://bytesagain.com' },
  openGraph: {
    title: 'BytesAgain — Find Your AI Skill Stack',
    description: 'Personalized AI skill recommendations. Tell us what you do, we tell you what to install.',
    url: 'https://bytesagain.com',
    siteName: 'BytesAgain',
    type: 'website',
  },
}

export default async function HomePage() {
  const [skills, articles] = await Promise.all([
    getSkills(6),
    getArticles(4),
  ])

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '64px 0 48px' }}>
        <div style={{
          display: 'inline-block', padding: '4px 14px', borderRadius: 20,
          background: '#667eea18', border: '1px solid #667eea44',
          color: '#667eea', fontSize: '.8em', fontWeight: 600, marginBottom: 20, letterSpacing: 1,
        }}>
          CURATED FROM 100,000+ SKILLS WORLDWIDE
        </div>
        <h1 style={{ fontSize: 'clamp(2em,5vw,3.2em)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15 }}>
          Find Your<br />
          <span style={{ background: 'linear-gradient(135deg,#667eea,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI Skill Stack
          </span>
        </h1>
        <p style={{ color: '#777', fontSize: '1.1em', margin: '0 0 36px', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
          Tell us what you do. We tell you exactly what to install.
          No searching. No guessing. Just the right skills.
        </p>
        <SearchBox />
      </section>

      {/* Role selector — the core feature */}
      <section style={{ marginBottom: 64 }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 700, marginBottom: 24, color: '#ccc' }}>
          What do you do?
        </h2>
        <RoleSelector />
      </section>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #1a1a3e', marginBottom: 48 }} />

      {/* Top Skills */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: '1.2em', fontWeight: 700 }}>🔥 Top Skills</h2>
          <a href="/skills" style={{ color: '#667eea', textDecoration: 'none', fontSize: '.85em' }}>View all →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 12 }}>
          {skills.map(skill => (
            <a key={skill.slug} href={`/skill/${skill.slug}`} style={{
              display: 'flex', gap: 14, padding: '16px 18px',
              background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 12,
              textDecoration: 'none', alignItems: 'flex-start',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: 'linear-gradient(135deg,#667eea33,#00d4ff33)',
                border: '1px solid #667eea44',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '.75em', fontWeight: 800, color: '#667eea',
              }}>
                {skill.title?.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.92em', marginBottom: 3 }}>
                  {skill.title || skill.slug}
                </div>
                <div style={{ color: '#666', fontSize: '.8em', lineHeight: 1.4, marginBottom: 6 }}>
                  {skill.description?.slice(0, 70)}…
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: '.72em', color: '#667eea', background: '#667eea11', padding: '2px 8px', borderRadius: 10 }}>
                    {skill.category}
                  </span>
                  <span style={{ fontSize: '.72em', color: '#444' }}>
                    {skill.downloads?.toLocaleString()} dl
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Articles */}
      {articles.length > 0 && (
        <section style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: '1.2em', fontWeight: 700 }}>📖 Latest Articles</h2>
            <a href="/articles" style={{ color: '#667eea', textDecoration: 'none', fontSize: '.85em' }}>View all →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 12 }}>
            {articles.map(a => (
              <a key={a.slug} href={`/article/${a.slug}`} style={{
                display: 'block', padding: '18px 20px',
                background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 12,
                textDecoration: 'none',
              }}>
                <div style={{ fontSize: '.72em', color: '#48bb78', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                  {a.category}
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '.92em', fontWeight: 600, color: '#e0e0e0', lineHeight: 1.4 }}>
                  {a.title}
                </h3>
                <div style={{ fontSize: '.75em', color: '#444' }}>
                  {a.published_at ? new Date(a.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

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
