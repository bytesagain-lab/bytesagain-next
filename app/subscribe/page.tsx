'use client'
import { useState } from 'react'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) setStatus('done')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5em', marginBottom: 16 }}>🎁</div>
      <h1 style={{ fontSize: '1.8em', fontWeight: 800, margin: '0 0 12px', color: '#e0e0e0' }}>
        Get the FREE AI Skills Starter Guide
      </h1>
      <p style={{ color: '#555', fontSize: '.95em', lineHeight: 1.7, marginBottom: 32 }}>
        Weekly digest of the best AI agent skills, use case guides, and tips.<br />
        No spam. Unsubscribe anytime.
      </p>

      {status === 'done' ? (
        <div style={{
          background: '#0d1f0d', border: '1px solid #1a4a1a',
          borderRadius: 14, padding: '28px 24px',
          color: '#4ade80', fontWeight: 600, fontSize: '1em',
        }}>
          ✅ You're in! Check your inbox for a confirmation.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                flex: 1, minWidth: 220,
                padding: '13px 18px',
                background: '#0f0f23', border: '1px solid #2a2a4e',
                borderRadius: 10, color: '#e0e0e0', fontSize: '1em',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '13px 24px', borderRadius: 10, border: 'none',
                background: 'linear-gradient(135deg, #667eea, #00d4ff)',
                color: '#fff', fontWeight: 700, fontSize: '1em',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                flexShrink: 0,
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Subscribe →'}
            </button>
          </div>
          {status === 'error' && (
            <div style={{ color: '#f87171', fontSize: '.85em', marginTop: 12 }}>
              Something went wrong. Please try again.
            </div>
          )}
        </form>
      )}
    </div>
  )
}
