import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account | BytesAgain',
  robots: { index: false },
}

export default function RegisterPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <h1 style={{ fontSize: '1.8em', fontWeight: 800, margin: '0 0 8px', textAlign: 'center' }}>Create Account</h1>
        <p style={{ color: '#888', textAlign: 'center', margin: '0 0 32px', fontSize: '.95em' }}>Join 900+ AI agent skills. Free forever.</p>

        <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 32 }}>
          <p style={{ color: '#888', textAlign: 'center', fontSize: '.9em', margin: '0 0 20px' }}>
            Register your free BytesAgain account
          </p>
          <a href="https://ingress-earth.easywp.com/register/"
            style={{ display: 'block', width: '100%', boxSizing: 'border-box' as const, padding: 12, background: 'linear-gradient(135deg,#667eea,#00d4ff)', border: 'none', borderRadius: 8, color: '#fff', fontSize: '1em', fontWeight: 700, cursor: 'pointer', textAlign: 'center' as const, textDecoration: 'none' }}>
            Create Account →
          </a>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '.9em', color: '#666' }}>
          Already have an account? <a href="/login" style={{ color: '#667eea', textDecoration: 'none' }}>Sign In</a>
        </p>
      </div>
    </div>
  )
}
