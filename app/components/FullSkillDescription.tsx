'use client'

import { useEffect, useState } from 'react'

interface Props {
  slug: string
  source: string
}

export default function FullSkillDescription({ slug, source }: Props) {
  const [fullDesc, setFullDesc] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!expanded || fullDesc !== null || loading) return
    if (source !== 'clawhub') return
    setLoading(true)
    // ClawHub SKILL.md endpoint (via our proxy to avoid CORS)
    fetch(`/api/skill-desc?slug=${encodeURIComponent(slug)}`)
      .then(r => r.ok ? r.json() : {})
      .then((d: any) => {
        setFullDesc(d.full_description || d.summary || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [expanded, slug, source, fullDesc, loading])

  if (source !== 'clawhub') return null

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
          maxHeight: 320, overflowY: 'auto',
        }}>
          {fullDesc.split('\n').map((line, i) => (
            <p key={i} style={{ margin: '0 0 6px' }}>{line || <br />}</p>
          ))}
        </div>
      )}
      {expanded && !loading && !fullDesc && (
        <div style={{ color: '#4b5563', fontSize: '.82em', padding: '8px 0' }}>
          Full description not available. <a href={`https://clawhub.ai/${slug}`} target="_blank" rel="noopener" style={{ color: '#6366f1' }}>View on ClawHub →</a>
        </div>
      )}
    </div>
  )
}
