'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Invalid email or password.')
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box', background: '#1a1a2e',
    border: '1px solid #2a2a4e', borderRadius: 8, padding: '10px 14px',
    color: '#e0e0e0', fontSize: '1em', outline: 'none',
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <h1 style={{ fontSize: '1.8em', fontWeight: 800, margin: '0 0 8px', textAlign: 'center' }}>Sign In</h1>
        <p style={{ color: '#888', textAlign: 'center', margin: '0 0 32px', fontSize: '.95em' }}>Welcome back to BytesAgain</p>

        {error && (
          <div style={{ background: '#ff6b6b22', border: '1px solid #ff6b6b55', borderRadius: 10, padding: '12px 16px', marginBottom: 20, color: '#ff6b6b', fontSize: '.9em' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '.85em', color: '#aaa', marginBottom: 6 }}>Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              autoComplete="email" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '.85em', color: '#aaa', marginBottom: 6 }}>Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              autoComplete="current-password" style={inputStyle} />
          </div>
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: 12, background: 'linear-gradient(135deg,#667eea,#00d4ff)', border: 'none', borderRadius: 8, color: '#fff', fontSize: '1em', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '.9em', color: '#666' }}>
          Don&apos;t have an account? <a href="/register" style={{ color: '#667eea', textDecoration: 'none' }}>Create one</a>
        </p>
      </div>
    </div>
  )
}
