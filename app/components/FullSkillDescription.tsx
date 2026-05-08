'use client'

import { useEffect, useState, useRef } from 'react'

interface Sections {
  examples: string | null
  configuration: string | null
  tips: string | null
  script?: string | null
  when_to_use?: string | null
  core_types?: string | null
  constraints?: string | null
}

interface Props {
  slug: string
  owner: string
  sections?: Sections
  fullDesc?: string | null
}

function renderMarkdown(md: string): string {
  let html = md
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

/** Render ## When to Use (Trigger/Action table) as HTML table */
function renderWhenToUse(raw: string): string {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean)
  if (lines.length < 2) return renderMarkdown(raw)
  // First line is header: "TriggerAction" (no separator)
  const headerMatch = lines[0].match(/^(Trigger|When)\s*(.+?)$/i)
  const headerLabel = headerMatch ? headerMatch[1] : 'Trigger'
  const actionLabel = 'Action'
  let rows = ''
  for (let i = 1; i < lines.length; i++) {
    // Split on any of: 2+ spaces, tab, or | separator
    const parts = lines[i].split(/\t+|  +/).map(s => s.trim()).filter(Boolean)
    if (parts.length >= 2) {
      rows += `<tr><td style="padding:10px 14px;border-bottom:1px solid #1e1e3f;color:#e2e8f0;font-weight:600;vertical-align:top">${parts[0]}</td><td style="padding:10px 14px;border-bottom:1px solid #1e1e3f;color:#94a3b8">${parts.slice(1).join(' ')}</td></tr>`
    } else if (parts.length === 1) {
      // Single value - maybe it's a full line description
      rows += `<tr><td style="padding:10px 14px;border-bottom:1px solid #1e1e3f;color:#94a3b8" colspan="2">${parts[0]}</td></tr>`
    }
  }
  return `<table style="width:100%;border-collapse:collapse;border:1px solid #1e1e3f;border-radius:8px;overflow:hidden;font-size:.88em"><thead><tr style="background:#0a0a1c"><th style="padding:10px 14px;text-align:left;color:#818cf8;font-weight:700;border-bottom:2px solid #6366f130">${headerLabel}</th><th style="padding:10px 14px;text-align:left;color:#818cf8;font-weight:700;border-bottom:2px solid #6366f130">${actionLabel}</th></tr></thead><tbody>${rows}</tbody></table>`
}

/** Render ## Core Types as type definition cards */
function renderCoreTypes(raw: string): string {
  const lines = raw.split('\n')
  let html = ''
  let currentCategory = 'Types'
  for (const line of lines) {
    const catMatch = line.match(/^#\s+(.+)/)
    if (catMatch) {
      if (html) html += '</div>'
      html += `<div style="margin-bottom:16px"><div style="color:#667eea;font-size:.82em;font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">${catMatch[1].trim()}</div>`
      currentCategory = catMatch[1].trim()
    } else if (line.trim()) {
      const typeMatch = line.match(/^([A-Za-z]+):\s*(.+)/)
      if (typeMatch) {
        html += `<div style="background:#0a0a1c;border:1px solid #1e1e3f;border-radius:8px;padding:10px 14px;margin-bottom:8px"><span style="color:#a5f3fc;font-weight:700;font-family:monospace">${typeMatch[1]}</span><span style="color:#64748b;font-family:monospace;font-size:.88em">: ${typeMatch[2]}</span></div>`
      }
    }
  }
  if (html) html += '</div>'
  return html
}

/** Render ## Constraints as constraint rule cards */
function renderConstraints(raw: string): string {
  let html = renderMarkdown(raw)
  // Enhance: make code blocks look like constraint rules
  html = html.replace(/<code([^>]*)>/g, '<code$1 style="background:#0a0a1c;color:#fbbf24;padding:1px 5px;border-radius:3px;font-size:.85em">')
  return html
}

export default function FullSkillDescription({ slug, owner, sections, fullDesc }: Props) {
  const [fetchedDesc, setFetchedDesc] = useState<string | null>(fullDesc || null)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (!expanded || fetchedRef.current || !owner) return
    if (fetchedDesc) { fetchedRef.current = true; return }
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

  const sectionCards: { key: string; icon: string; label: string; color: string; content: string | null; render: (s: string) => string }[] = [
    { key: 'when_to_use', icon: '⚡', label: 'When to Use', color: '#22d3ee', content: sections?.when_to_use || null, render: renderWhenToUse },
    { key: 'core_types', icon: '📦', label: 'Core Types', color: '#a78bfa', content: sections?.core_types || null, render: renderCoreTypes },
    { key: 'examples', icon: '💡', label: 'Examples', color: '#22d3ee', content: sections?.examples || null, render: renderMarkdown },
    { key: 'configuration', icon: '⚙️', label: 'Configuration', color: '#fbbf24', content: sections?.configuration || null, render: renderMarkdown },
    { key: 'tips', icon: '📋', label: 'Tips & Best Practices', color: '#a78bfa', content: sections?.tips || null, render: renderMarkdown },
    { key: 'constraints', icon: '🔒', label: 'Constraints', color: '#f87171', content: sections?.constraints || null, render: renderConstraints },
  ]

  const visibleCards = sectionCards.filter(c => c.content)

  return (
    <div style={{ marginBottom: 14 }}>
      {/* -- Structured Sections -- */}
      {visibleCards.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8, marginBottom: 12 }}>
          {visibleCards.map(card => (
            <div key={card.key} style={{
              background: '#070714', border: '1px solid #1e1e3f', borderRadius: 12,
              padding: '16px 18px',
            }}>
              <div style={{ color: card.color, fontSize: '.82em', fontWeight: 700, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{card.icon}</span> {card.label}
              </div>
              <div style={{
                fontSize: '.85em', lineHeight: 1.65, color: '#94a3b8',
                maxHeight: 500, overflowY: 'auto',
              }}
                dangerouslySetInnerHTML={{ __html: card.render(card.content!) }}
              />
            </div>
          ))}
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
          marginTop: 8, background: '#050510', border: '1px solid #1e1e3f', borderRadius: 10,
          fontSize: '.85em', lineHeight: 1.65, maxHeight: 500, overflowY: 'auto',
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
