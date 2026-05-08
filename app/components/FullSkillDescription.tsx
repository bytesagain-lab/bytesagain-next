'use client'

import { useEffect, useState, useRef } from 'react'

interface Sections {
  examples: string | null
  configuration: string | null
  tips: string | null
  script?: string | null
}

interface Props {
  slug: string
  owner: string
  sections?: Sections
  fullDesc?: string | null
}

function renderMarkdown(md: string): string {
  let html = md
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g,
      '<pre style="background:#0a0a1c;border:1px solid #1e1e3f;border-radius:6px;padding:10px 12px;overflow-x:auto;font-size:.88em;margin:8px 0"><code style="color:#a5f3fc;background:none;padding:0;font-size:1em">$2</code></pre>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #1e1e3f;margin:12px 0">')
    .replace(/^### (.+)$/gm, '<h4 style="color:#d1d5db;margin:14px 0 6px;font-size:.95em">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 style="color:#e5e7eb;margin:18px 0 8px;font-size:1.05em">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 style="color:#f3f4f6;margin:20px 0 10px;font-size:1.15em">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e5e7eb">$1</strong>')
    .replace(/`([^`]+)`/g, '<code style="background:#0d0d1e;color:#a5f3fc;padding:1px 5px;border-radius:3px;font-size:.88em">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${u}" target="_blank" rel="noopener" style="color:#6366f1">${t}</a>`)
    .replace(/^- (.+)$/gm, '<li style="color:#94a3b8;margin:3px 0">$1</li>')
    .replace(/\n{2,}/g, '</p><p style="margin:8px 0">')

  return `<p style="margin:8px 0">${html}</p>`
}

export default function FullSkillDescription({ slug, owner, sections, fullDesc }: Props) {
  const [fetchedDesc, setFetchedDesc] = useState<string | null>(fullDesc || null)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (!expanded || fetchedRef.current || !owner) return
    if (fetchedDesc) { fetchedRef.current = true; return } // already have it from props
    fetchedRef.current = true
    setLoading(true)

    fetch(`/api/skill-desc?slug=${encodeURIComponent(slug)}&source=clawhub&full=1`)
      .then(r => r.json())
      .then(data => {
        if (data.full_description && data.full_description.length > 200) {
          setFetchedDesc(data.full_description)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [expanded, slug, owner, fetchedDesc])

  if (!owner) return null

  const showSections = sections && (sections.examples || sections.configuration || sections.tips)

  return (
    <div style={{ marginBottom: 14 }}>
      {/* -- Structured Sections (if available from props) -- */}
      {showSections && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8, marginBottom: 12 }}>
          {sections!.examples && (
            <div style={{
              background: '#070714', border: '1px solid #1e1e3f', borderRadius: 12,
              padding: '16px 18px',
            }}>
              <div style={{ color: '#22d3ee', fontSize: '.82em', fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>💡</span> Examples
              </div>
              <div style={{
                fontSize: '.85em', lineHeight: 1.65, color: '#94a3b8',
                maxHeight: 400, overflowY: 'auto',
              }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(sections!.examples!) }}
              />
            </div>
          )}

          {sections!.configuration && (
            <div style={{
              background: '#070714', border: '1px solid #1e1e3f', borderRadius: 12,
              padding: '16px 18px',
            }}>
              <div style={{ color: '#fbbf24', fontSize: '.82em', fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>⚙️</span> Configuration
              </div>
              <div style={{
                fontSize: '.85em', lineHeight: 1.65, color: '#94a3b8',
                maxHeight: 400, overflowY: 'auto',
              }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(sections!.configuration!) }}
              />
            </div>
          )}

          {sections!.tips && (
            <div style={{
              background: '#070714', border: '1px solid #1e1e3f', borderRadius: 12,
              padding: '16px 18px',
            }}>
              <div style={{ color: '#a78bfa', fontSize: '.82em', fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>📋</span> Tips &amp; Best Practices
              </div>
              <div style={{
                fontSize: '.85em', lineHeight: 1.65, color: '#94a3b8',
                maxHeight: 400, overflowY: 'auto',
              }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(sections!.tips!) }}
              />
            </div>
          )}
        </div>
      )}

      {/* -- Full MD Toggle -- */}
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
      {expanded && !loading && fetchedDesc && (
        <div style={{
          marginTop: 8,
          background: '#050510', border: '1px solid #1e1e3f', borderRadius: 10,
          fontSize: '.85em', lineHeight: 1.65,
          maxHeight: 500, overflowY: 'auto',
          padding: '14px 16px',
        }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(fetchedDesc) }}
        />
      )}
      {expanded && !loading && !fetchedDesc && (
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
