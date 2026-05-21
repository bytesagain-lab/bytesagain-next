/**
 * SKILL.md Markdown → HTML render helpers (server-safe, no client hooks).
 * Extracted from FullSkillDescription.tsx for server-component use in page.tsx.
 */

export function renderMarkdown(md: string): string {
  let html = md
    .replace(/```(\w*)\n([\s\S]*?)```/g,
      '<pre style="background:#0a0a1c;border:1px solid #1e1e3f;border-radius:6px;padding:10px 12px;overflow-x:auto;font-size:.9em;margin:8px 0"><code style="color:#a5f3fc;background:none;padding:0;font-size:1em">$2</code></pre>')
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

/** ## When to Use / Trigger → Action table */
export function renderWhenToUse(raw: string): string {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean)
  if (lines.length < 2) return renderMarkdown(raw)
  const headerMatch = lines[0].match(/^(Trigger|When)\s*(.+?)$/i)
  const headerLabel = headerMatch ? headerMatch[1] : 'Trigger'
  const actionLabel = 'Action'
  let rows = ''
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(/\t+|  +/).map(s => s.trim()).filter(Boolean)
    if (parts.length >= 2) {
      rows += `<tr><td style="padding:12px 16px;border-bottom:1px solid #1e1e3f;color:#e2e8f0;font-weight:600;vertical-align:top">${parts[0]}</td><td style="padding:12px 16px;border-bottom:1px solid #1e1e3f;color:#94a3b8">${parts.slice(1).join(' ')}</td></tr>`
    } else if (parts.length === 1) {
      rows += `<tr><td style="padding:12px 16px;border-bottom:1px solid #1e1e3f;color:#94a3b8" colspan="2">${parts[0]}</td></tr>`
    }
  }
  return `<table style="width:100%;border-collapse:collapse;border:1px solid #1e1e3f;border-radius:8px;overflow:hidden;font-size:.9em"><thead><tr style="background:#0a0a1c"><th style="padding:12px 16px;text-align:left;color:#818cf8;font-weight:700;border-bottom:2px solid #6366f130">${headerLabel}</th><th style="padding:12px 16px;text-align:left;color:#818cf8;font-weight:700;border-bottom:2px solid #6366f130">${actionLabel}</th></tr></thead><tbody>${rows}</tbody></table>`
}

/** ## Core Types → type definition cards */
export function renderCoreTypes(raw: string): string {
  const lines = raw.split('\n')
  let html = ''
  for (const line of lines) {
    const catMatch = line.match(/^#\s+(.+)/)
    if (catMatch) {
      if (html) html += '</div>'
      html += `<div style="margin-bottom:16px"><div style="color:#667eea;font-size:.82em;font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">${catMatch[1].trim()}</div>`
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

/** ## Constraints → constraint rule cards */
export function renderConstraints(raw: string): string {
  let html = renderMarkdown(raw)
  html = html.replace(/<code([^>]*)>/g, '<code$1 style="background:#0a0a1c;color:#fbbf24;padding:1px 5px;border-radius:3px;font-size:.85em">')
  return html
}
