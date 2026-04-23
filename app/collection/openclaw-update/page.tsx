import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'OpenClaw 2026.4.22 — Ready-to-Run Skills | BytesAgain',
  description: 'Grok Vision, Tencent Hy3, Local TUI — skill packs ready for the latest OpenClaw update. Find the right skill and run it instantly.',
}

const SKILL_PACKS = [
  {
    title: '🖼️ Grok Vision Toolkit',
    desc: 'Skills for image analysis, vision tasks, and Grok-powered workflows',
    skills: [
      { name: 'Grok MCP', slug: 'mcp-grok-mcp' },
      { name: 'Vision', slug: 'vision' },
      { name: 'Fish Audio', slug: 'clawhub-acedatacloud-fish-audio' },
    ],
  },
  {
    title: '🎤 Voice & Audio Pack',
    desc: 'Voice note processing, speech tools, and audio workflows',
    skills: [
      { name: 'mmEasyVoice', slug: 'clawhub-mm-easy-voice' },
      { name: 'Azure AI VoiceLive', slug: 'clawhub-azure-ai-voicelive-py' },
      { name: 'QwenSpeak', slug: 'clawhub-qwenspeak' },
    ],
  },
  {
    title: '🧰 Local TUI Skills',
    desc: 'Offline-capable CLI agents for terminal-heavy workflows',
    skills: [
      { name: 'tmux Terminal', slug: 'clawhub-imbeasting-tmux-terminal' },
      { name: 'Shell', slug: 'shell' },
      { name: 'Agent Browser', slug: 'clawhub-agent-browser-clawdbot' },
    ],
  },
]

export default function OpenClawCollectionPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px', color: '#e0e0e0', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🦞</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>
          OpenClaw 2026.4.22 Skills
        </h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem', margin: 0 }}>
          Ready-to-run skill packs for Grok Vision, Voice Tools & Local TUI
        </p>
      </div>

      {/* Skill Packs */}
      {SKILL_PACKS.map((pack) => (
        <div key={pack.title} style={{ marginBottom: 40, background: '#0d0d1a', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{pack.title}</h2>
          <p style={{ color: '#888', margin: '0 0 20px', fontSize: '.95rem' }}>{pack.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {pack.skills.map((skill) => (
              <Link
                key={skill.slug}
                href={`/skill/${skill.slug}`}
                style={{
                  background: '#1a1a3e',
                  border: '1px solid #2a2a5e',
                  borderRadius: 10,
                  padding: '10px 18px',
                  color: '#00d4ff',
                  textDecoration: 'none',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  transition: 'all .2s',
                }}
              >
                {skill.name} →
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Search CTA */}
      <div style={{ textAlign: 'center', marginTop: 48, padding: 32, background: 'linear-gradient(135deg, #1a1a3e, #0d0d2a)', borderRadius: 20, border: '1px solid #2a2a5e' }}>
        <p style={{ color: '#aaa', marginBottom: 16 }}>Looking for more? Search 60,000+ AI agent skills</p>
        <Link href="/skills" style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: '#fff',
          padding: '12px 28px',
          borderRadius: 10,
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1rem',
        }}>
          Browse All Skills →
        </Link>
      </div>
    </main>
  )
}
