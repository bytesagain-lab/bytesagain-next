'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-auth'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
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
      setSuccess(true)
    }
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
        <p style={{ color: '#888', textAlign: 'center', margin: '0 0 32px', fontSize: '.95em' }}>Join 900+ AI agent skills. Free forever.</p>

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
          <form onSubmit={handleRegister} style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 32 }}>
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
        )}

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '.9em', color: '#666' }}>
          Already have an account? <a href="/login" style={{ color: '#667eea', textDecoration: 'none' }}>Sign In</a>
        </p>
      </div>
    </div>
  )
}
