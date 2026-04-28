'use client'

import { useEffect, useState, useRef } from 'react'

interface Props {
  slug: string
  owner: string
}

function renderMarkdown(text: string): string {
  let html = text
    // Code blocks — do first before inline code
    .replace(/```(\w*)\n([\s\S]*?)```/g,
      '<pre style="background:#0a0a1c;border:1px solid #1e1e3f;border-radius:6px;padding:10px 12px;overflow-x:auto;font-size:.88em;margin:8px 0"><code style="color:#a5f3fc;background:none;padding:0;font-size:1em">$2</code></pre>')
    // Horizontal rules  
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #1e1e3f;margin:12px 0">')
    // Headers
    .replace(/^### (.+)$/gm, '<h4 style="color:#d1d5db;margin:12px 0 6px;font-size:.95em">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 style="color:#e5e7eb;margin:16px 0 8px;font-size:1.05em">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 style="color:#f3f4f6;margin:18px 0 10px;font-size:1.15em">$1</h2>')
    // Bold / italic
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e5e7eb">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code style="background:#0d0d1e;color:#a5f3fc;padding:1px 5px;border-radius:3px;font-size:.88em">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#6366f1">$1</a>')
    // Unordered lists
    .replace(/^- /gm, '• ')
    // Paragraphs (double newline)
    .replace(/\n\n/g, '</p><p style="margin:6px 0">')

  return `<p style="margin:6px 0">${html}</p>`
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

    const loadFromAPI = async () => {
      try {
        // 1. Try our API (GitHub raw for our skills)
        const apiRes = await fetch(
          `/api/skill-desc?slug=${encodeURIComponent(slug)}&source=clawhub&full=1`
        )
        if (apiRes.ok) {
          const data = await apiRes.json()
          if (data.full_description && data.full_description.length > 200) {
            setFullDesc(data.full_description)
            setLoading(false)
            return
          }
        }
      } catch {}

      // 2. Fallback: Jina Reader on ClawHub page
      try {
        const rRes = await fetch(
          `https://r.jina.ai/https://clawhub.ai/${owner}/${slug}`,
          { headers: { 'Accept': 'text/markdown', 'x-return-format': 'markdown' } }
        )
        if (rRes.ok) {
          const rawText = await rRes.text()
          // Extract real content — skip "Markdown Content:" header and security scan
          let content = ''
          const mcIdx = rawText.indexOf('Markdown Content:')
          if (mcIdx > 0) {
            content = rawText.slice(mcIdx + 18)
          }
          // Skip ClawHub security scan section if present
          const scanIdx = content.indexOf('## Purpose & Capability')
          if (scanIdx >= 0 && scanIdx < 500) {
            // Find where the actual skill documentation starts (first ## header that isn't security)
            const lines = content.split('\n')
            const docStart = lines.findIndex(l => 
              l.startsWith('## ') && !l.includes('Purpose') && !l.includes('Assessment') && 
              !l.includes('Findings') && !l.includes('Scope') && !l.includes('Mechanism') &&
              !l.includes('Persistence') && !l.includes('Credentials')
            )
            if (docStart > 0) {
              content = lines.slice(docStart).join('\n')
            } else {
              // Fallback: skip past security assessment
              const endIdx = content.indexOf('Like a lobster shell')
              if (endIdx > 100) content = content.slice(endIdx + 22)
            }
          }

          if (content.length > 200) {
            setFullDesc(content.trim())
          }
        }
      } catch {}

      setLoading(false)
    }

    loadFromAPI()
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
