import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent API — BytesAgain Developer Docs',
  description: 'BytesAgain AI-readable REST API for agents. Search, recommend, and retrieve 55,000+ AI skills programmatically.',
}

export default function McpDocsPage() {
  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px', color: '#e0e0e0', fontFamily: 'monospace' }}>
      <div style={{ marginBottom: 40 }}>
        <span style={{ fontSize: '.8em', color: '#667eea', background: '#667eea18', border: '1px solid #667eea44', borderRadius: 20, padding: '3px 12px' }}>
          Developer Docs
        </span>
        <h1 style={{ fontSize: 'clamp(1.6em,4vw,2.2em)', fontWeight: 900, margin: '16px 0 8px', color: '#fff' }}>
          BytesAgain Agent API
        </h1>
        <p style={{ color: '#888', fontSize: '1em', lineHeight: 1.7, maxWidth: 620 }}>
          AI-readable REST API for agents. Search and retrieve structured skill data from 55,000+ curated AI skills — no scraping required.
        </p>
        <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <code style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 8, padding: '8px 16px', fontSize: '.9em', color: '#00d4ff' }}>
            https://bytesagain.com/api/mcp
          </code>
          <span style={{ padding: '8px 14px', background: '#00d4ff18', border: '1px solid #00d4ff44', borderRadius: 8, fontSize: '.8em', color: '#00d4ff' }}>
            ✦ Free · No auth required · CORS enabled
          </span>
        </div>
      </div>

      {/* Actions */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.1em', color: '#667eea', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '.1em' }}>Endpoints</h2>

        {[
          {
            action: 'search',
            desc: 'Search skills by keyword. Returns local DB results + ClawHub + GitHub.',
            params: [
              { name: 'q', desc: 'Search query (required)' },
              { name: 'limit', desc: 'Max results, default 10, max 50' },
            ],
            example: '?action=search&q=data+analysis&limit=10',
          },
          {
            action: 'recommend',
            desc: 'Get skill recommendations by user role.',
            params: [
              { name: 'role', desc: 'developer · creator · trader · marketer · student · ecommerce · analyst' },
              { name: 'limit', desc: 'Max results, default 10' },
            ],
            example: '?action=recommend&role=developer&limit=10',
          },
          {
            action: 'get',
            desc: 'Get full details for a single skill by slug.',
            params: [
              { name: 'slug', desc: 'Skill slug (e.g. chart-generator)' },
            ],
            example: '?action=get&slug=chart-generator',
          },
          {
            action: 'popular',
            desc: 'Get top skills ranked by download count.',
            params: [
              { name: 'limit', desc: 'Max results, default 10, max 50' },
            ],
            example: '?action=popular&limit=20',
          },
        ].map(ep => (
          <div key={ep.action} style={{ background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 12, padding: '24px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ background: '#667eea', color: '#fff', borderRadius: 6, padding: '2px 10px', fontSize: '.8em', fontWeight: 700 }}>GET</span>
              <code style={{ color: '#00d4ff', fontSize: '.95em' }}>action={ep.action}</code>
            </div>
            <p style={{ color: '#888', fontSize: '.9em', margin: '0 0 16px' }}>{ep.desc}</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85em', marginBottom: 16 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a3e' }}>
                  <th style={{ textAlign: 'left', color: '#555', padding: '4px 8px 8px 0', width: 100 }}>Param</th>
                  <th style={{ textAlign: 'left', color: '#555', padding: '4px 0 8px' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {ep.params.map(p => (
                  <tr key={p.name} style={{ borderBottom: '1px solid #0f0f23' }}>
                    <td style={{ padding: '8px 8px 8px 0', color: '#00d4ff' }}>{p.name}</td>
                    <td style={{ padding: '8px 0', color: '#888' }}>{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ background: '#050510', borderRadius: 8, padding: '12px 16px' }}>
              <span style={{ color: '#555', fontSize: '.75em' }}>Example</span>
              <pre style={{ margin: '4px 0 0', color: '#a0a0c0', fontSize: '.85em', overflowX: 'auto' }}>
                {`GET https://bytesagain.com/api/mcp${ep.example}`}
              </pre>
            </div>
          </div>
        ))}
      </section>

      {/* Response format */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.1em', color: '#667eea', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.1em' }}>Response Format</h2>
        <div style={{ background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 12, padding: '24px' }}>
          <pre style={{ margin: 0, color: '#a0a0c0', fontSize: '.85em', lineHeight: 1.7, overflowX: 'auto' }}>{`{
  "action": "search",
  "query": "data analysis",
  "count": 5,
  "results": [
    {
      "slug": "data-analysis",
      "name": "Data Analysis",
      "description": "Analyze datasets with AI...",
      "category": "data",
      "tags": ["data", "analytics"],
      "downloads": 12400,
      "owner": "bytesagain1"
    }
  ]
}`}</pre>
        </div>
      </section>

      {/* OpenClaw config */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.1em', color: '#667eea', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.1em' }}>Example Usage</h2>
        <div style={{ background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 12, padding: '24px' }}>
          <pre style={{ margin: 0, color: '#a0a0c0', fontSize: '.85em', lineHeight: 1.7, overflowX: 'auto' }}>{`curl "https://bytesagain.com/api/mcp?action=search&q=data+analysis"`}</pre>
        </div>
        <p style={{ color: '#555', fontSize: '.85em', marginTop: 12 }}>
          Returns structured JSON — no HTML parsing, no scraping needed.
        </p>
      </section>

      {/* llms.txt */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.1em', color: '#667eea', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.1em' }}>LLMs.txt</h2>
        <p style={{ color: '#888', fontSize: '.9em', marginBottom: 12 }}>
          For LLM context injection, use our machine-readable skill index:
        </p>
        <div style={{ background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 12, padding: '16px 24px' }}>
          <a href="/llms-full.txt" style={{ color: '#00d4ff', textDecoration: 'none', fontSize: '.9em' }}>
            https://bytesagain.com/llms-full.txt →
          </a>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #1a1a3e', paddingTop: 32, color: '#444', fontSize: '.85em' }}>
        <p>Built by <a href="https://bytesagain.com" style={{ color: '#667eea', textDecoration: 'none' }}>BytesAgain</a> · Powered by 55,000+ skills from ClawHub, GitHub, LobeHub and more.</p>
      </div>
    </main>
  )
}
