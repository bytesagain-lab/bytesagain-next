'use client'
import { useState } from 'react'
import Link from 'next/link'

const MCP_URL = 'https://bytesagain.com/api/mcp/sse'
const OPENCLAW_CMD = `openclaw mcp set bytesagain '{"url":"${MCP_URL}","transport":"streamable-http"}'`
const CLAUDE_CONFIG = `{
  "mcpServers": {
    "bytesagain": {
      "url": "${MCP_URL}",
      "transport": "streamable-http"
    }
  }
}`

function CopyBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{ background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid #1a1a3e' }}>
        <span style={{ color: '#555', fontSize: '.8em' }}>{label}</span>
        <button onClick={copy} style={{ background: copied ? '#00d4ff22' : 'transparent', border: '1px solid #333', borderRadius: 6, color: copied ? '#00d4ff' : '#666', cursor: 'pointer', fontSize: '.75em', padding: '3px 12px' }}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{ margin: 0, padding: '14px 16px', color: '#a0a0c0', fontSize: '.85em', lineHeight: 1.7, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {code}
      </pre>
    </div>
  )
}

export default function InstallPage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px', color: '#e0e0e0', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
        <h1 style={{ fontSize: 'clamp(1.6em,4vw,2.2em)', fontWeight: 900, margin: '0 0 16px', color: '#fff' }}>
          Let your AI agent find skills for you
        </h1>
        <p style={{ color: '#888', fontSize: '1.05em', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
          Connect BytesAgain to your AI agent via MCP. Once connected, just ask — your agent will search, recommend, and install skills automatically.
        </p>
      </div>

      {/* Step 1 */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ background: '#667eea', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.85em', fontWeight: 700, flexShrink: 0 }}>1</span>
          <h2 style={{ margin: 0, fontSize: '1.1em', color: '#fff' }}>Connect via OpenClaw</h2>
        </div>
        <CopyBlock label="Terminal" code={OPENCLAW_CMD} />
        <p style={{ color: '#555', fontSize: '.85em', margin: '8px 0 0' }}>
          Don't have OpenClaw? <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none' }}>Get it here →</a>
        </p>
        <div style={{ marginTop: 12, padding: '12px 16px', background: '#1a1000', border: '1px solid #f59e0b44', borderRadius: 8, fontSize: '.83em', color: '#888' }}>
          ⚠️ <strong style={{ color: '#f59e0b' }}>SSE not working?</strong> If you're in a sandboxed environment (restricted network), use the REST API instead:
          <div style={{ marginTop: 8, color: '#a0a0c0', fontFamily: 'monospace', background: '#0a0a1a', padding: '8px 12px', borderRadius: 6 }}>
            curl "https://bytesagain.com/api/mcp?action=search&q=email+automation"
          </div>
          <div style={{ marginTop: 6 }}>See <a href="/mcp#rest" style={{ color: '#667eea', textDecoration: 'none' }}>REST API docs →</a></div>
        </div>
      </div>

      {/* Step 2 */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ background: '#667eea', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.85em', fontWeight: 700, flexShrink: 0 }}>2</span>
          <h2 style={{ margin: 0, fontSize: '1.1em', color: '#fff' }}>Or connect via Claude Desktop</h2>
        </div>
        <CopyBlock label="claude_desktop_config.json" code={CLAUDE_CONFIG} />
      </div>

      {/* Step 3 */}
      <div style={{ marginBottom: 56, background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 12, padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ background: '#667eea', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.85em', fontWeight: 700, flexShrink: 0 }}>3</span>
          <h2 style={{ margin: 0, fontSize: '1.1em', color: '#fff' }}>Ask your agent anything</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            '"Find me a skill for data analysis"',
            '"What are the most popular AI skills right now?"',
            '"邮件自动化工具有哪些？"  (Chinese)',
            '"データ分析スキルを探して"  (Japanese)',
            '"Get me the chart-generator skill details"',
          ].map(q => (
            <div key={q} style={{ background: '#050510', borderRadius: 8, padding: '12px 16px', color: '#888', fontSize: '.9em', fontStyle: 'italic' }}>
              {q}
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/mcp" style={{ padding: '12px 24px', background: '#667eea', borderRadius: 10, color: '#fff', textDecoration: 'none', fontSize: '.9em', fontWeight: 600 }}>
          View full API docs →
        </Link>
        <Link href="/skills" style={{ padding: '12px 24px', background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 10, color: '#888', textDecoration: 'none', fontSize: '.9em' }}>
          Browse skills manually
        </Link>
      </div>

    </main>
  )
}
