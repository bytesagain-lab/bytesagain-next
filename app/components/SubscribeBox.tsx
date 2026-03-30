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
      borderTop: '1px solid #1a1a2e',
      padding: '28px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 0,
    }}>
      <div>
        <span style={{ fontWeight: 600, fontSize: '.95em' }}>Get the best AI skills weekly</span>
        <span style={{ color: '#555', fontSize: '.85em', marginLeft: 10 }}>No spam.</span>
      </div>

      {state === 'done' ? (
        <div style={{ color: '#3ecf8e', fontWeight: 600, fontSize: '.9em' }}>✓ You're on the list!</div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              width: 220,
              padding: '8px 14px',
              background: '#0f0f23',
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
              padding: '8px 18px',
              background: 'linear-gradient(135deg,#667eea,#00d4ff)',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
              fontWeight: 700,
              fontSize: '.85em',
              cursor: state === 'loading' ? 'not-allowed' : 'pointer',
              opacity: state === 'loading' ? 0.7 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {state === 'loading' ? '…' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  )
}
