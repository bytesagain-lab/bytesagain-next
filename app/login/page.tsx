import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | BytesAgain',
  robots: { index: false },
}

export default function LoginPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <h1 style={{ fontSize: '1.8em', fontWeight: 800, margin: '0 0 8px', textAlign: 'center' }}>Sign In</h1>
        <p style={{ color: '#888', textAlign: 'center', margin: '0 0 32px', fontSize: '.95em' }}>Welcome back to BytesAgain</p>

        <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 32 }}>
          <p style={{ color: '#888', textAlign: 'center', fontSize: '.9em', margin: '0 0 20px' }}>
            Sign in with your BytesAgain account
          </p>
          <a href="https://ingress-earth.easywp.com/wp-login.php"
            style={{ display: 'block', width: '100%', boxSizing: 'border-box', padding: 12, background: 'linear-gradient(135deg,#667eea,#00d4ff)', border: 'none', borderRadius: 8, color: '#fff', fontSize: '1em', fontWeight: 700, cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
            Sign In →
          </a>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '.9em', color: '#666' }}>
          Don&apos;t have an account? <a href="/register" style={{ color: '#667eea', textDecoration: 'none' }}>Create one</a>
        </p>
      </div>
    </div>
  )
}
