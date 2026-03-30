import { getSkills, getArticles, getCategories } from '@/lib/supabase'
import SubscribeBox from './components/SubscribeBox'
import SearchBox from './components/SearchBox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BytesAgain — AI Agent Skills',
  description: 'Discover 900+ AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Curated daily.',
}

export default async function HomePage() {
  const [skills, articles, categories] = await Promise.all([
    getSkills(24),
    getArticles(8),
    getCategories(),
  ])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '60px 0 40px' }}>
        <h1 style={{ fontSize: '2.8em', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
          Discover AI Agent Skills
        </h1>
        <p style={{ color: '#888', fontSize: '1.1em', margin: '0 0 32px' }}>
          The best tools for Claude, ChatGPT, Cursor, and every AI agent. Curated daily.
        </p>
        <SearchBox />
      </section>

      {/* Subscribe */}
      <SubscribeBox />

      {/* Categories */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        <a href="/" style={catStyle('#667eea')}>All</a>
        {categories.map(cat => (
          <a key={cat} href={`/category/${cat}`} style={catStyle()}>{cat}</a>
        ))}
      </div>

      {/* Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16, marginBottom: 60 }}>
        {skills.map(skill => (
          <a key={skill.slug} href={`/skill/${skill.slug}`} style={cardStyle}>
            <div style={{ fontSize: '.75em', color: '#667eea', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{skill.category}</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1em', fontWeight: 600, color: '#e0e0e0' }}>{skill.title || skill.slug}</h3>
            <p style={{ margin: '0 0 12px', fontSize: '.85em', color: '#888', lineHeight: 1.5 }}>
              {skill.description?.slice(0, 80)}...
            </p>
            <div style={{ fontSize: '.8em', color: '#555' }}>{skill.downloads?.toLocaleString()} downloads</div>
          </a>
        ))}
      </div>

      {/* Articles */}
      {articles.length > 0 && (
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: '1.5em', marginBottom: 20 }}>Recommended</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
            {articles.map(a => {
              const date = a.published_at ? new Date(a.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''
              return (
                <a key={a.slug} href={`/article/${a.slug}`} style={cardStyle}>
                  <div style={{ fontSize: '.75em', color: '#48bb78', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{a.category}</div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1em', fontWeight: 600, color: '#e0e0e0' }}>{a.title}</h3>
                  <div style={{ fontSize: '.8em', color: '#555' }}>{date}</div>
                </a>
              )
            })}
          </div>
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <a href="/articles" style={{ color: '#667eea', textDecoration: 'none', fontSize: '.9em' }}>View all articles →</a>
          </div>
        </section>
      )}
    </div>
  )
}

const catStyle = (color = '#555') => ({
  padding: '6px 14px',
  background: `${color}22`,
  color,
  border: `1px solid ${color}55`,
  borderRadius: 20,
  fontSize: '.8em',
  textDecoration: 'none',
  whiteSpace: 'nowrap' as const,
})

const cardStyle: React.CSSProperties = {
  display: 'block',
  padding: 20,
  background: '#0f0f23',
  border: '1px solid #1a1a3e',
  borderRadius: 12,
  textDecoration: 'none',
  transition: 'border-color .2s',
}
