'use client'

import { useState } from 'react'

export default function SubscribeBox() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f0f2f, #1a1a4e)',
      border: '1px solid #667eea44',
      borderRadius: 16,
      padding: '32px 40px',
      textAlign: 'center',
      margin: '0 0 48px',
    }}>
      <h2 style={{ margin: '0 0 8px', fontSize: '1.3em', fontWeight: 700 }}>
        Get the best AI skills weekly
      </h2>
      <p style={{ color: '#888', margin: '0 0 24px', fontSize: '.9em' }}>
        Curated picks, new releases, and tips — delivered every week. No spam.
      </p>

      {state === 'done' ? (
        <div style={{ color: '#3ecf8e', fontWeight: 600, fontSize: '1em' }}>
          ✓ You're on the list! Check your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              minWidth: 200,
              padding: '10px 16px',
              background: '#0a0a1a',
              border: '1px solid #1a1a3e',
              borderRadius: 8,
              color: '#e0e0e0',
              fontSize: '.9em',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            style={{
              padding: '10px 22px',
              background: 'linear-gradient(135deg,#667eea,#00d4ff)',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              fontWeight: 700,
              fontSize: '.9em',
              cursor: state === 'loading' ? 'not-allowed' : 'pointer',
              opacity: state === 'loading' ? 0.7 : 1,
            }}
          >
            {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
          {state === 'error' && (
            <p style={{ color: '#fc8181', fontSize: '.85em', width: '100%', margin: '8px 0 0' }}>
              Something went wrong. Try again.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
