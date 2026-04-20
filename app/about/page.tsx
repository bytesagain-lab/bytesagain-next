import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'BytesAgain curates the best AI agent skills for Claude, ChatGPT, Cursor, and every AI agent.',
  alternates: { canonical: 'https://bytesagain.com/about' },
}

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 750, margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2.2em', fontWeight: 800, marginBottom: 16 }}>About BytesAgain</h1>
      <p style={{ color: '#888', fontSize: '1.1em', lineHeight: 1.8, marginBottom: 24 }}>
        BytesAgain is a curated directory of AI agent skills — the best tools for Claude, ChatGPT, Cursor, and every modern AI agent.
      </p>

      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 32, marginBottom: 24 }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '1.2em' }}>What we do</h2>
        <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
          We track, test, and surface the most useful AI agent skills from ClawHub, GitHub, LobeHub, and beyond.
          Our goal is to help developers, engineers, creators, and teams find the right skill for the job — fast.
        </p>
      </div>

      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 32, marginBottom: 24 }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '1.2em' }}>Our mission</h2>
        <p style={{ color: '#888', lineHeight: 1.8, margin: 0 }}>
          AI agents are only as useful as the skills they have access to. We believe the right skill, in the right hands,
          can unlock capabilities that would otherwise take weeks to build. BytesAgain exists to close that gap —
          making the best agent skills discoverable, comparable, and ready to use.
        </p>
      </div>

      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 32, marginBottom: 24 }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '1.2em' }}>By the numbers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16, marginTop: 16 }}>
          {[
            { n: '50K+', label: 'AI Skills indexed' },
            { n: '500+', label: 'Curated workflows' },
            { n: 'Daily', label: 'Content updates' },
          ].map(({ n, label }) => (
            <div key={label} style={{ textAlign: 'center', padding: 16, background: '#0a0a1a', borderRadius: 10 }}>
              <div style={{ fontSize: '1.8em', fontWeight: 800, background: 'linear-gradient(135deg,#667eea,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
              <div style={{ color: '#666', fontSize: '.85em', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 32 }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '1.2em' }}>Contact</h2>
        <p style={{ color: '#888', lineHeight: 1.8, margin: '0 0 16px' }}>
          Questions, partnerships, or feedback? Reach us at{' '}
          <a href="mailto:hello@bytesagain.com" style={{ color: '#667eea', textDecoration: 'none' }}>hello@bytesagain.com</a>
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="/feedback" style={{
            padding: '9px 20px', borderRadius: 8, fontSize: '.88em', fontWeight: 600,
            background: 'linear-gradient(135deg,#667eea,#00d4ff)', color: '#fff', textDecoration: 'none',
          }}>Share Feedback →</a>
          <a href="/feedback?type=partner" style={{
            padding: '9px 20px', borderRadius: 8, fontSize: '.88em', fontWeight: 600,
            background: 'transparent', border: '1px solid #333', color: '#aaa', textDecoration: 'none',
          }}>Partner with Us</a>
        </div>
      </div>
    </div>
  )
}
