import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pro | BytesAgain',
  description: 'Unlock unlimited AI skill access, early previews, and API access with BytesAgain Pro.',
  alternates: { canonical: 'https://bytesagain.com/pro' },
}

export default function ProPage() {
  return (
    <div style={{ maxWidth: 800, margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#667eea,#00d4ff)', borderRadius: 8, padding: '4px 14px', fontSize: '.85em', fontWeight: 700, marginBottom: 20 }}>PRO</div>
      <h1 style={{ fontSize: '2.4em', fontWeight: 800, marginBottom: 12 }}>Upgrade to BytesAgain Pro</h1>
      <p style={{ color: '#888', fontSize: '1.1em', marginBottom: 48 }}>Everything in Free, plus early access, API, and more.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, textAlign: 'left', marginBottom: 48 }}>
        {/* Free */}
        <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 20, padding: 32 }}>
          <h2 style={{ margin: '0 0 8px' }}>Free</h2>
          <p style={{ color: '#667eea', fontSize: '2em', fontWeight: 800, margin: '0 0 24px' }}>$0<span style={{ fontSize: '.4em', color: '#888' }}>/mo</span></p>
          {['Browse all skills', 'Download & install', 'Weekly digest email', 'Community support'].map(f => (
            <div key={f} style={{ color: '#888', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#3ecf8e' }}>✓</span>{f}
            </div>
          ))}
          <a href="/register" style={{ display: 'block', marginTop: 28, padding: '12px 0', borderRadius: 10, border: '1px solid #1a1a3e', textAlign: 'center', color: '#888', textDecoration: 'none', fontSize: '.95em' }}>Get started free</a>
        </div>

        {/* Pro */}
        <div style={{ background: 'linear-gradient(135deg, #0f0f2f, #1a1a4e)', border: '1px solid #667eea', borderRadius: 20, padding: 32, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#667eea,#00d4ff)', borderRadius: 6, padding: '3px 12px', fontSize: '.75em', fontWeight: 700, whiteSpace: 'nowrap' }}>COMING SOON</div>
          <h2 style={{ margin: '0 0 8px' }}>Pro</h2>
          <p style={{ color: '#667eea', fontSize: '2em', fontWeight: 800, margin: '0 0 8px' }}>$9.9<span style={{ fontSize: '.4em', color: '#888' }}>/mo</span></p>
          <p style={{ color: '#3ecf8e', fontSize: '.9em', margin: '0 0 24px' }}>or <strong>$99</strong> / year <span style={{ color: '#555' }}>(save 17%)</span></p>
          {['Everything in Free', 'Early skill previews', 'API access', 'Priority support', 'Advanced analytics'].map(f => (
            <div key={f} style={{ color: '#ccc', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#667eea' }}>✓</span>{f}
            </div>
          ))}
          <button disabled style={{ display: 'block', width: '100%', marginTop: 28, padding: '12px 0', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#667eea,#00d4ff)', color: '#fff', fontWeight: 700, fontSize: '.95em', cursor: 'not-allowed', opacity: 0.7 }}>Notify me</button>
        </div>
      </div>

      <p style={{ color: '#555', fontSize: '.9em' }}>Questions? <a href="mailto:hello@bytesagain.com" style={{ color: '#667eea', textDecoration: 'none' }}>hello@bytesagain.com</a></p>
    </div>
  )
}
