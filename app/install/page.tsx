import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Install BytesAgain Skill Finder — Find 43,000+ AI Agent Skills',
  description: 'Add the BytesAgain Skill Finder to your AI agent. Search 43,000+ curated skills from ClawHub, LobeHub, and Dify — directly from your agent.',
  openGraph: {
    title: 'BytesAgain Skill Finder — For AI Agents',
    description: 'Search 43,000+ AI agent skills without leaving your agent. Free OpenClaw skill.',
  },
}

const SKILL_MD = `---
name: bytesagain-finder
version: 1.0.0
description: >
  Search and discover AI agent skills from BytesAgain.com — a curated index of
  43,000+ skills from ClawHub, LobeHub, Dify, and GitHub. Find the right skill
  for any task: automation, writing, coding, data analysis, CRM, and more.
author: bytesagain
homepage: https://bytesagain.com
---

# BytesAgain Skill Finder

Search 43,000+ curated AI agent skills from BytesAgain.com.

## Commands

### search — Find skills by keyword or task description
\`\`\`bash
bash script.sh search "write weekly report"
bash script.sh search "email automation"
bash script.sh search "数据分析"
\`\`\`

### popular — Browse top downloaded skills
\`\`\`bash
bash script.sh popular
bash script.sh popular devtools
\`\`\`

### get — Get details and install command for a specific skill
\`\`\`bash
bash script.sh get chart-generator
bash script.sh get email-assistant
\`\`\`

### recommend — Get skill recommendations for a role
\`\`\`bash
bash script.sh recommend "project manager"
bash script.sh recommend "content creator"
\`\`\`

## Privacy
- Only your search query is sent to bytesagain.com/api/mcp
- No agent identity or personal data is transmitted
- Install and use is completely free

## Requirements
- curl, python3, internet connection
`

export default function InstallPage() {
  return (
    <div style={{
      maxWidth: 760, margin: '0 auto', padding: '48px 24px',
      fontFamily: 'system-ui, sans-serif', color: '#e0e0e0',
    }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: '3em', marginBottom: 16 }}>🔍</div>
        <h1 style={{ fontSize: '2.2em', fontWeight: 800, margin: '0 0 16px', color: '#fff' }}>
          BytesAgain Skill Finder
        </h1>
        <p style={{ fontSize: '1.1em', color: '#888', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
          Give your AI agent the ability to search 43,000+ skills — directly from your agent,
          without switching tabs.
        </p>
      </div>

      {/* How it works */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
        gap: 16, marginBottom: 48,
      }}>
        {[
          { icon: '💬', title: 'Ask your agent', desc: '"Find me a skill for writing SQL queries"' },
          { icon: '🔍', title: 'Agent searches', desc: 'Calls BytesAgain API, returns top matches' },
          { icon: '⚡', title: 'Install instantly', desc: 'One-command install from the results' },
        ].map(item => (
          <div key={item.title} style={{
            background: '#0f0f23', border: '1px solid #1a1a3e',
            borderRadius: 12, padding: '20px 16px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2em', marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontWeight: 700, marginBottom: 6, color: '#fff' }}>{item.title}</div>
            <div style={{ color: '#666', fontSize: '.88em' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Install steps */}
      <div style={{
        background: '#0f0f23', border: '1px solid #1a1a3e',
        borderRadius: 16, padding: '32px', marginBottom: 32,
      }}>
        <h2 style={{ margin: '0 0 24px', fontSize: '1.2em', color: '#fff' }}>
          Quick Install (2 steps)
        </h2>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#667eea', fontWeight: 700, marginBottom: 8, fontSize: '.9em' }}>
            STEP 1 — Download the skill files
          </div>
          <div style={{
            background: '#060614', borderRadius: 8, padding: '14px 16px',
            fontFamily: 'monospace', fontSize: '.9em', color: '#00d4ff',
          }}>
            {'curl -L https://bytesagain.com/api/download-skill | bash'}
          </div>
        </div>

        <div>
          <div style={{ color: '#667eea', fontWeight: 700, marginBottom: 8, fontSize: '.9em' }}>
            STEP 2 — Try it
          </div>
          <div style={{
            background: '#060614', borderRadius: 8, padding: '14px 16px',
            fontFamily: 'monospace', fontSize: '.9em', color: '#00d4ff',
          }}>
            {'bash ~/.openclaw/skills/bytesagain-finder/scripts/script.sh search "email automation"'}
          </div>
        </div>
      </div>

      {/* Manual download */}
      <div style={{
        background: '#0f0f23', border: '1px solid #1a1a3e',
        borderRadius: 16, padding: '32px', marginBottom: 32,
      }}>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.2em', color: '#fff' }}>
          Manual Install
        </h2>
        <p style={{ color: '#666', fontSize: '.9em', marginBottom: 20 }}>
          Download the SKILL.md and add to your agent config manually.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="/api/download-skill?file=SKILL.md"
            style={{
              display: 'inline-block', padding: '10px 24px',
              background: 'linear-gradient(135deg,#667eea,#00d4ff)',
              borderRadius: 8, color: '#fff', fontWeight: 700,
              textDecoration: 'none', fontSize: '.9em',
            }}
          >
            ↓ Download SKILL.md
          </a>
          <a
            href="/api/download-skill?file=script.sh"
            style={{
              display: 'inline-block', padding: '10px 24px',
              background: '#1a1a3e', border: '1px solid #333',
              borderRadius: 8, color: '#ccc', fontWeight: 700,
              textDecoration: 'none', fontSize: '.9em',
            }}
          >
            ↓ Download script.sh
          </a>
        </div>
      </div>

      {/* SKILL.md preview */}
      <div style={{
        background: '#0f0f23', border: '1px solid #1a1a3e',
        borderRadius: 16, padding: '32px', marginBottom: 48,
      }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '1.2em', color: '#fff' }}>
          SKILL.md Preview
        </h2>
        <pre style={{
          background: '#060614', borderRadius: 8, padding: '16px',
          fontSize: '.82em', color: '#aaa', overflowX: 'auto',
          lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap',
        }}>
          {SKILL_MD}
        </pre>
      </div>

      {/* Privacy note */}
      <div style={{ textAlign: 'center', color: '#555', fontSize: '.85em' }}>
        🔒 Privacy-first — only your search query is sent to our API.
        No agent identity or personal data collected.
        <br />
        <a href="/privacy-policy" style={{ color: '#667eea' }}>Read our privacy policy</a>
      </div>
    </div>
  )
}
