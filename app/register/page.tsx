'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-auth'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const supabase = createClient()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      setLoading(false)
      return
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: 'https://bytesagain.com/login' }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // Auto-add to newsletter
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'register' }),
      }).catch(() => {})
      setSuccess(true)
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://bytesagain.com/' }
    })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', background: '#1a1a2e',
    border: '1px solid #2a2a4e', borderRadius: 8, padding: '10px 14px',
    color: '#e0e0e0', fontSize: '1em', outline: 'none',
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <h1 style={{ fontSize: '1.8em', fontWeight: 800, margin: '0 0 8px', textAlign: 'center' }}>Create Account</h1>
        <p style={{ color: '#888', textAlign: 'center', margin: '0 0 32px', fontSize: '.95em' }}>Discover AI agent skills curated for your workflow. Free forever.</p>

        {error && (
          <div style={{ background: '#ff6b6b22', border: '1px solid #ff6b6b55', borderRadius: 10, padding: '12px 16px', marginBottom: 20, color: '#ff6b6b', fontSize: '.9em' }}>
            {error}
          </div>
        )}

        {success ? (
          <div style={{ background: '#00c85322', border: '1px solid #00c85355', borderRadius: 16, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: '2em', marginBottom: 12 }}>📧</div>
            <h2 style={{ margin: '0 0 8px', fontSize: '1.2em' }}>Check your email</h2>
            <p style={{ color: '#888', margin: 0, fontSize: '.9em' }}>
              We sent a verification link to <strong style={{ color: '#ccc' }}>{email}</strong>.<br />
              Click the link to activate your account.
            </p>
          </div>
        ) : (
          <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 32 }}>
            {/* Google按钮 */}
            <button onClick={handleGoogle} disabled={googleLoading}
              style={{ width: '100%', padding: '11px 16px', background: '#fff', border: '1px solid #ddd', borderRadius: 8, color: '#333', fontSize: '.95em', fontWeight: 600, cursor: googleLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20, opacity: googleLoading ? 0.7 : 1 }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
              </svg>
              {googleLoading ? 'Redirecting...' : 'Continue with Google'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: '#1a1a3e' }} />
              <span style={{ color: '#555', fontSize: '.8em' }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#1a1a3e' }} />
            </div>

            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '.85em', color: '#aaa', marginBottom: 6 }}>Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  autoComplete="email" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: '.85em', color: '#aaa', marginBottom: 6 }}>Password <span style={{ color: '#555', fontSize: '.85em' }}>(min. 6 characters)</span></label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password" minLength={6} style={inputStyle} />
              </div>
              <button type="submit" disabled={loading}
                style={{ width: '100%', padding: 12, background: 'linear-gradient(135deg,#667eea,#00d4ff)', border: 'none', borderRadius: 8, color: '#fff', fontSize: '1em', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          </div>
        )}

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '.9em', color: '#666' }}>
          Already have an account? <a href="/login" style={{ color: '#667eea', textDecoration: 'none' }}>Sign In</a>
        </p>
      </div>
    </div>
  )
}
