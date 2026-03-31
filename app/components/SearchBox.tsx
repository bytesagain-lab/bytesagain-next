'use client'

import { useState, useEffect, useRef } from 'react'

interface Skill {
  slug: string
  name: string
  description: string
  category: string
  downloads: number
  _source?: string
  _url?: string
}

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Skill[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); setOpen(false); return }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
        setOpen(true)
      } finally {
        setLoading(false)
      }
    }, 300)
  }, [query])

  return (
    <div ref={ref} style={{ position: 'relative', maxWidth: 520, margin: '0 auto 32px' }}>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '1em' }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search 100,000+ AI skills…"
          style={{
            width: '100%',
            padding: '12px 16px 12px 40px',
            background: '#0f0f23',
            border: '1px solid #1a1a3e',
            borderRadius: 10,
            color: '#e0e0e0',
            fontSize: '1em',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={() => results.length > 0 && setOpen(true)}
        />
        {loading && (
          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: '.8em' }}>…</span>
        )}
      </div>

      {open && results.length > 0 && (
        <div style={{
          position: 'absolute', top: '110%', left: 0, right: 0,
          background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 10,
          zIndex: 100, maxHeight: 360, overflowY: 'auto', boxShadow: '0 8px 32px #00000088',
        }}>
          {results.map(skill => (
            <a key={skill.slug}
              href={skill._source === 'github' ? (skill._url || `https://github.com/search?q=${skill.slug}`) : `/skill/${skill.slug}`}
              target={skill._source === 'github' ? '_blank' : undefined}
              rel={skill._source === 'github' ? 'noopener' : undefined}
              style={{ display: 'block', padding: '12px 16px', borderBottom: '1px solid #1a1a2e', textDecoration: 'none' }}
              onMouseDown={e => e.preventDefault()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e0e0e0', fontWeight: 600, fontSize: '.95em' }}>{skill.name || skill.slug}</span>
                <span style={{ color: '#555', fontSize: '.72em' }}>
                  {skill._source === 'github' ? '⭐ GitHub' : skill._source === 'clawhub' ? '🦀 ClawHub' : `${skill.downloads?.toLocaleString()} dl`}
                </span>
              </div>
              <div style={{ color: '#667eea', fontSize: '.75em', marginTop: 2 }}>{skill.category}</div>
              <div style={{ color: '#666', fontSize: '.8em', marginTop: 4 }}>{skill.description?.slice(0, 70)}…</div>
            </a>
          ))}
        </div>
      )}

      {open && results.length === 0 && !loading && query.trim() && (
        <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 10, padding: 16, color: '#555', fontSize: '.9em', textAlign: 'center' }}>
          No skills found for "{query}"
        </div>
      )}
    </div>
  )
}
