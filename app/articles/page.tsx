import { getArticles } from '@/lib/supabase'
import type { Metadata } from 'next'

export const revalidate = 3600


export const metadata: Metadata = {
  title: 'Articles & Guides',
  description: 'Guides, comparisons, and tutorials about AI agent skills for developers and teams.',
  alternates: { canonical: 'https://bytesagain.com/articles' },
}

export default async function ArticlesPage() {
  const articles = await getArticles(50)

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2em', marginBottom: 8 }}>Articles & Guides</h1>
      <p style={{ color: '#888', marginBottom: 40 }}>Comparisons, tutorials, and skill recommendations. Updated daily.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {articles.map(a => {
          const date = a.published_at
            ? new Date(a.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : ''
          const catColors: Record<string, string> = {
            comparison: '#38b2ac', recommendation: '#667eea', tutorial: '#48bb78',
            news: '#ed8936', usecase: '#9f7aea',
          }
          const clr = catColors[a.category] || '#667eea'
          return (
            <a key={a.slug} href={`/article/${a.slug}`} style={{ display: 'block', padding: 20, background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 12, textDecoration: 'none' }}>
              <span style={{ fontSize: '.75em', background: `${clr}22`, color: clr, border: `1px solid ${clr}55`, borderRadius: 20, padding: '3px 10px', marginBottom: 8, display: 'inline-block' }}>
                {a.category}
              </span>
              <h2 style={{ margin: '8px 0 4px', fontSize: '1.1em', color: '#e0e0e0', fontWeight: 600 }}>{a.title}</h2>
              <span style={{ fontSize: '.8em', color: '#555' }}>{date}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
