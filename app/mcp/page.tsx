import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent API & MCP — BytesAgain Developer Docs',
  description: 'Connect AI agents to 788+ curated skills via MCP SSE or REST API. Compatible with OpenClaw, Claude Desktop, and any MCP client.',
}

const CODE = {
  mcpConnect: `# OpenClaw
openclaw mcp set bytesagain '{"url":"https://bytesagain.com/api/mcp/sse","transport":"streamable-http"}'

# Claude Desktop (claude_desktop_config.json)
{
  "mcpServers": {
    "bytesagain": {
      "url": "https://bytesagain.com/api/mcp/sse",
      "transport": "streamable-http"
    }
  }
}`,
  mcpSearch: `curl -X POST https://bytesagain.com/api/mcp/sse \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_skills","arguments":{"query":"data analysis"}}}'`,
  restSearch: `GET https://bytesagain.com/api/mcp?action=search&q=data+analysis`,
  response: `{
  "action": "search",
  "query": "data analysis",
  "count": 5,
  "results": [
    {
      "slug": "data-analysis",
      "name": "Data Analysis",
      "description": "Analyze datasets with AI...",
      "category": "data",
      "downloads": 12400
    }
  ]
}`,
}

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div style={{ background: '#050510', borderRadius: 8, padding: '16px' }}>
      {label && <div style={{ color: '#555', fontSize: '.75em', marginBottom: 6 }}>{label}</div>}
      <pre style={{ margin: 0, color: '#a0a0c0', fontSize: '.85em', lineHeight: 1.7, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {children}
      </pre>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: '1.1em', color: '#667eea', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '.1em' }}>{title}</h2>
      {children}
    </section>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 12, padding: '24px', marginBottom: 16 }}>
      {children}
    </div>
  )
}

export default function McpDocsPage() {
  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px', color: '#e0e0e0', fontFamily: 'monospace' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <span style={{ fontSize: '.8em', color: '#667eea', background: '#667eea18', border: '1px solid #667eea44', borderRadius: 20, padding: '3px 12px' }}>
          Developer Docs
        </span>
        <h1 style={{ fontSize: 'clamp(1.6em,4vw,2.2em)', fontWeight: 900, margin: '16px 0 8px', color: '#fff' }}>
          BytesAgain Agent API
        </h1>
        <p style={{ color: '#888', fontSize: '1em', lineHeight: 1.7, maxWidth: 640 }}>
          Connect your AI agent to 788+ curated skills via MCP SSE protocol or plain REST API.
          Returns skills published by BytesAgain authors. Search also indexes ClawHub and GitHub skill repos.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ padding: '6px 14px', background: '#00d4ff18', border: '1px solid #00d4ff44', borderRadius: 8, fontSize: '.8em', color: '#00d4ff' }}>✦ Free</span>
          <span style={{ padding: '6px 14px', background: '#00d4ff18', border: '1px solid #00d4ff44', borderRadius: 8, fontSize: '.8em', color: '#00d4ff' }}>No auth required</span>
          <span style={{ padding: '6px 14px', background: '#00d4ff18', border: '1px solid #00d4ff44', borderRadius: 8, fontSize: '.8em', color: '#00d4ff' }}>CORS enabled</span>
          <span style={{ padding: '6px 14px', background: '#667eea18', border: '1px solid #667eea44', borderRadius: 8, fontSize: '.8em', color: '#667eea' }}>MCP 2024-11-05</span>
        </div>
      </div>

      {/* MCP SSE */}
      <Section title="MCP SSE Server (Recommended)">
        <p style={{ color: '#888', fontSize: '.9em', marginBottom: 16 }}>
          Standard MCP protocol over SSE. Compatible with OpenClaw, Claude Desktop, Cursor, and any MCP client.
        </p>
        <Card>
          <div style={{ marginBottom: 16 }}>
            <span style={{ color: '#555', fontSize: '.8em' }}>Endpoint</span>
            <div style={{ marginTop: 6 }}>
              <code style={{ color: '#00d4ff', fontSize: '.95em' }}>https://bytesagain.com/api/mcp/sse</code>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ color: '#555', fontSize: '.8em' }}>Available Tools</span>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['search_skills', 'get_skill', 'popular_skills'].map(t => (
                <code key={t} style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 6, padding: '3px 10px', fontSize: '.8em', color: '#a0a0c0' }}>{t}</code>
              ))}
            </div>
          </div>
          <CodeBlock label="OpenClaw">{CODE.mcpConnect}</CodeBlock>
          <div style={{ marginTop: 12 }}>
            <CodeBlock label="curl (JSON-RPC)">{CODE.mcpSearch}</CodeBlock>
          </div>
        </Card>
      </Section>

      {/* REST API */}
      <Section title="REST API">
        <p style={{ color: '#888', fontSize: '.9em', marginBottom: 16 }}>
          Simple GET requests returning JSON. No client library needed.
        </p>
        {[
          { action: 'search', desc: 'Search skills by keyword.', params: 'q=<query>&limit=10', },
          { action: 'recommend', desc: 'Get recommendations by role.', params: 'role=developer|creator|trader|marketer|student&limit=10', },
          { action: 'get', desc: 'Get full details for a single skill.', params: 'slug=<slug>', },
          { action: 'popular', desc: 'Top skills by download count.', params: 'limit=20', },
        ].map(ep => (
          <Card key={ep.action}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ background: '#667eea', color: '#fff', borderRadius: 6, padding: '2px 10px', fontSize: '.8em', fontWeight: 700 }}>GET</span>
              <code style={{ color: '#00d4ff', fontSize: '.9em' }}>action={ep.action}</code>
              <span style={{ color: '#555', fontSize: '.85em' }}>— {ep.desc}</span>
            </div>
            <CodeBlock>{`https://bytesagain.com/api/mcp?action=${ep.action}&${ep.params}`}</CodeBlock>
          </Card>
        ))}
      </Section>

      {/* Response */}
      <Section title="Response Format">
        <Card>
          <CodeBlock>{CODE.response}</CodeBlock>
        </Card>
      </Section>

      {/* llms.txt */}
      <Section title="LLMs.txt">
        <Card>
          <p style={{ color: '#888', fontSize: '.9em', margin: '0 0 12px' }}>Machine-readable skill index for LLM context injection:</p>
          <a href="/llms-full.txt" style={{ color: '#00d4ff', textDecoration: 'none', fontSize: '.9em' }}>
            https://bytesagain.com/llms-full.txt →
          </a>
        </Card>
      </Section>

      <div style={{ borderTop: '1px solid #1a1a3e', paddingTop: 32, color: '#444', fontSize: '.85em' }}>
        Built by <a href="https://bytesagain.com" style={{ color: '#667eea', textDecoration: 'none' }}>BytesAgain</a> · 788+ BytesAgain skills · Also indexes ClawHub & GitHub.
      </div>
    </main>
  )
}
