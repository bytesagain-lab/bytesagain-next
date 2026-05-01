export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import SkillSearchResults from '../components/SkillSearchResults'

type Props = {
  searchParams: Promise<{ q?: string }>
}

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jfpeycpiyayrpjldppzq.supabase.co'
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const INTERNAL_API = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  const query = q?.trim() || ''
  return {
    title: query ? `"${query}" — Search | BytesAgain` : 'Search Skills | BytesAgain',
    description: query
      ? `Search results for "${query}" on BytesAgain — find AI agent skills from ClawHub, GitHub, and more.`
      : 'Search for AI agent skills by keyword, use case, or category.',

    alternates: { canonical: query ? `https://bytesagain.com/search?q=${encodeURIComponent(query)}` : 'https://bytesagain.com/search' },
    openGraph: {
      title: query ? `"${query}" — Search | BytesAgain` : 'Search Skills | BytesAgain',
      description: query
        ? `Search results for "${query}" on BytesAgain.`
        : 'Search for AI agent skills by keyword, use case, or category.',
      url: query ? `https://bytesagain.com/search?q=${encodeURIComponent(query)}` : 'https://bytesagain.com/search',
      type: 'website',
      siteName: 'BytesAgain',
    },
    robots: { index: false, follow: true },
  }
}

async function searchSkills(query: string) {
  if (!query.trim()) return []
  try {
    const url = `${INTERNAL_API}/api/vsearch?q=${encodeURIComponent(query.trim())}`
    const res = await fetch(url, {
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error('searchSkills failed:', res.status)
      return []
    }
    return res.json()
  } catch (err) {
    console.error('searchSkills error:', err)
    return []
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q?.trim() || ''
  const results = query ? await searchSkills(query) : []

  return (
    <main style={{
      minHeight: '100vh',
      background: '#050611',
      color: '#e5e7eb',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 90px' }}>
        {/* Search form */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: '1.5em', fontWeight: 800, marginBottom: 4 }}>
            {query ? `Results for "${query}"` : 'Search Skills'}
          </h1>
          <p style={{ color: '#64748b', fontSize: '.9em', margin: 0 }}>
            {results.length > 0
              ? `${results.length} skill${results.length === 1 ? '' : 's'} found`
              : query
                ? 'No results found. Try different keywords.'
                : 'Enter a keyword, use case, or skill name to search.'}
          </p>
        </div>

        {/* Search input */}
        <form action="/search" method="GET" style={{ marginBottom: 32 }}>
          <div style={{ position: 'relative', maxWidth: 640 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '1em' }}>🔍</span>
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search skills by keyword, use case, or slug…"
              style={{
                width: '100%',
                padding: '14px 16px 14px 42px',
                background: '#0f0f23',
                border: '1px solid #1a1a3e',
                borderRadius: 10,
                color: '#e0e0e0',
                fontSize: '1em',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              style={{
                position: 'absolute',
                right: 6, top: '50%',
                transform: 'translateY(-50%)',
                background: 'linear-gradient(135deg,#667eea,#00d4ff)',
                border: 'none',
                borderRadius: 8,
                color: '#fff',
                fontWeight: 700,
                padding: '8px 18px',
                cursor: 'pointer',
                fontSize: '.88em',
              }}
            >
              Search
            </button>
          </div>
        </form>

        {/* Results */}
        {query && results.length > 0 ? (
          <SkillSearchResults initialSkills={results} query={query} />
        ) : query ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#0d0d1f', border: '1px solid #1a1a3e', borderRadius: 16,
          }}>
            <div style={{ fontSize: '3em', marginBottom: 12 }}>🔍</div>
            <h2 style={{ color: '#888', fontSize: '1.2em', fontWeight: 600, marginBottom: 8 }}>No skills found for &ldquo;{query}&rdquo;</h2>
            <p style={{ color: '#555', fontSize: '.9em', marginBottom: 20 }}>
              Try different keywords, browse <a href="/skills" style={{ color: '#667eea' }}>all skills</a>,
              or check <a href="/use-case" style={{ color: '#667eea' }}>use cases</a>.
            </p>
          </div>
        ) : (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: '#0d0d1f', border: '1px solid #1a1a3e', borderRadius: 16,
          }}>
            <div style={{ fontSize: '3em', marginBottom: 12 }}>🔍</div>
            <h2 style={{ color: '#888', fontSize: '1.2em', fontWeight: 600, marginBottom: 8 }}>Ready to find skills?</h2>
            <p style={{ color: '#555', fontSize: '.9em', marginBottom: 12 }}>
              Type what you need — AI agent, tool, or workflow — and hit Search.
            </p>
            <div style={{ color: '#555', fontSize: '.82em' }}>
              Or browse <a href="/skills" style={{ color: '#667eea' }}>all skills</a> ·{' '}
              <a href="/use-case" style={{ color: '#667eea' }}>use cases</a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
