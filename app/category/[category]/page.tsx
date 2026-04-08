export const dynamic = 'force-dynamic'
export const revalidate = 3600

import { getSkills, getCategories } from '@/lib/supabase'
import type { Metadata } from 'next'

type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = decodeURIComponent(category)
  return {
    title: `${cat} Skills | BytesAgain`,
    description: `Browse the best ${cat} AI agent skills on BytesAgain.`,
    alternates: { canonical: `https://bytesagain.com/category/${category}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = decodeURIComponent(category)
  const [skills, categories] = await Promise.all([
    getSkills(50, cat),
    getCategories(),
  ])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        <a href="/" style={catStyle('#555')}>All</a>
        {categories.map(c => (
          <a key={c} href={`/category/${c}`} style={catStyle(c === cat ? '#667eea' : '#555')}>{c}</a>
        ))}
      </div>

      <h1 style={{ fontSize: '1.8em', fontWeight: 800, marginBottom: 8 }}>{cat}</h1>
      <p style={{ color: '#555', marginBottom: 24 }}>{skills.length} skills found</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {skills.length === 0 ? (
          <p style={{ color: '#555' }}>No skills in this category yet.</p>
        ) : skills.map(skill => (
          <a key={skill.slug} href={`/skill/${skill.slug}`} style={cardStyle}>
            <div style={{ fontSize: '.75em', color: '#667eea', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{skill.category}</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1em', fontWeight: 600, color: '#e0e0e0' }}>{skill.name || skill.slug}</h3>
            <p style={{ margin: '0 0 12px', fontSize: '.85em', color: '#888', lineHeight: 1.5 }}>
              {skill.description?.slice(0, 80)}...
            </p>
            <div style={{ fontSize: '.8em', color: '#555' }}>{skill.downloads?.toLocaleString()} downloads</div>
          </a>
        ))}
      </div>
    </div>
  )
}

const catStyle = (color: string) => ({
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
