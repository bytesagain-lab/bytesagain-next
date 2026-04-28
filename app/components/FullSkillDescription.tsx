'use client'

import { useEffect, useState, useRef } from 'react'

interface Props {
  slug: string
  owner: string
}

export default function FullSkillDescription({ slug, owner }: Props) {
  const [fullDesc, setFullDesc] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (!expanded || fetchedRef.current || !owner) return
    fetchedRef.current = true
    setLoading(true)

    // Fetch full SKILL.md from ClawHub via Jina Reader (client-side)
    fetch(
      `https://r.jina.ai/https://clawhub.ai/${owner}/${slug}`,
      { headers: { 'Accept': 'text/markdown', 'x-return-format': 'markdown' } }
    )
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(text => {
        const bodyMatch = text.match(/\n---\n([\s\S]*)/)
        const content = bodyMatch ? bodyMatch[1].trim() : text
        setFullDesc(content || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [expanded, slug, owner])

  if (!owner) return null

  return (
    <div style={{ marginBottom: 14 }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none', border: 'none', color: '#6366f1',
          cursor: 'pointer', fontSize: '.82em', padding: '4px 0',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}
      >
        {expanded ? '▾ Hide full description' : '▸ Show full description'}
      </button>
      {expanded && loading && (
        <div style={{ color: '#4b5563', fontSize: '.82em', padding: '8px 0' }}>Loading...</div>
      )}
      {expanded && !loading && fullDesc && (
        <div style={{
          marginTop: 8, padding: '12px 14px',
          background: '#050510', border: '1px solid #1e1e3f', borderRadius: 10,
          color: '#94a3b8', fontSize: '.85em', lineHeight: 1.65,
          maxHeight: 400, overflowY: 'auto',
        }}>
          <pre style={{
            fontFamily: 'inherit', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            margin: 0, lineHeight: 1.65,
          }}>{fullDesc}</pre>
        </div>
      )}
      {expanded && !loading && !fullDesc && (
        <div style={{ color: '#4b5563', fontSize: '.82em', padding: '8px 0' }}>
          Full description not available.{' '}
          <a href={`https://clawhub.ai/${owner}/${slug}`} target="_blank" rel="noopener"
             style={{ color: '#6366f1' }}>
            View on ClawHub →
          </a>
        </div>
      )}
    </div>
  )
}
