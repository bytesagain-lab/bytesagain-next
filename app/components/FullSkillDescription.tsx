'use client'

import { useEffect, useState, useRef } from 'react'

interface Props {
  slug: string
  owner: string
}

function renderMarkdown(md: string): string {
  let html = md
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g,
      '<pre style="background:#0a0a1c;border:1px solid #1e1e3f;border-radius:6px;padding:10px 12px;overflow-x:auto;font-size:.88em;margin:8px 0"><code style="color:#a5f3fc;background:none;padding:0;font-size:1em">$2</code></pre>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #1e1e3f;margin:12px 0">')
    // Headers
    .replace(/^### (.+)$/gm, '<h4 style="color:#d1d5db;margin:14px 0 6px;font-size:.95em">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 style="color:#e5e7eb;margin:18px 0 8px;font-size:1.05em">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 style="color:#f3f4f6;margin:20px 0 10px;font-size:1.15em">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e5e7eb">$1</strong>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code style="background:#0d0d1e;color:#a5f3fc;padding:1px 5px;border-radius:3px;font-size:.88em">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) =>
      `<a href="${u}" target="_blank" rel="noopener" style="color:#6366f1">${t}</a>`)
    // Paragraphs
    .replace(/\n{2,}/g, '</p><p style="margin:8px 0">')

  return `<p style="margin:8px 0">${html}</p>`
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

    // Try API first (fastest for our skills)
    fetch(`/api/skill-desc?slug=${encodeURIComponent(slug)}&source=clawhub&full=1`)
      .then(r => r.json())
      .then(data => {
        if (data.full_description && data.full_description.length > 300) {
          setFullDesc(data.full_description)
          setLoading(false)
          return null
        }
        // Fallback: Jina Reader from ClawHub
        return fetch(
          `https://r.jina.ai/https://clawhub.ai/${owner}/${slug}`,
          { headers: { 'Accept': 'text/markdown', 'x-return-format': 'markdown' } }
        )
      })
      .then(r => {
        if (!r) return
        return r.ok ? r.text() : null
      })
      .then(text => {
        if (!text) { setLoading(false); return }
        // Extract markdown body
        const mcIdx = text.indexOf('Markdown Content:')
        const content = mcIdx > 0 ? text.slice(mcIdx + 18) : text
        // Remove trailing security scan if present
        const scanIdx = content.indexOf('## Security Scan')
        const body = scanIdx > 0 ? content.slice(0, scanIdx) : content
        if (body.trim().length > 200) {
          setFullDesc(body.trim())
        }
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
        {expanded ? '▾ Hide' : '▸ Show full description'}
      </button>
      {expanded && loading && (
        <div style={{ color: '#4b5563', fontSize: '.82em', padding: '8px 0' }}>Loading...</div>
      )}
      {expanded && !loading && fullDesc && (
        <div style={{
          marginTop: 8,
          background: '#050510', border: '1px solid #1e1e3f', borderRadius: 10,
          color: '#94a3b8', fontSize: '.85em', lineHeight: 1.65,
          maxHeight: 500, overflowY: 'auto',
          padding: '14px 16px',
        }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(fullDesc) }}
        />
      )}
      {expanded && !loading && !fullDesc && (
        <div style={{ color: '#4b5563', fontSize: '.82em', padding: '8px 0' }}>
          <a href={`https://clawhub.ai/${owner}/${slug}`} target="_blank" rel="noopener"
             style={{ color: '#6366f1' }}>
            View on ClawHub →
          </a>
        </div>
      )}
    </div>
  )
}
