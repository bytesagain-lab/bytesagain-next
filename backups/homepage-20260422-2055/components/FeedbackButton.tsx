'use client'

import { useState } from 'react'

export default function FeedbackButton() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  const submit = async () => {
    if (!message.trim()) return
    setStatus('sending')
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'quick', message, page: window.location.pathname }),
    }).catch(() => {})
    setStatus('done')
    setTimeout(() => { setOpen(false); setStatus('idle'); setMessage('') }, 2000)
  }

  return (
    <>
      {/* 悬浮按钮 */}
      <button onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
          width: 48, height: 48, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg,#667eea,#00d4ff)',
          color: '#fff', fontSize: '1.3em', boxShadow: '0 4px 20px #667eea66',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform .2s',
        }}>
        {open ? '✕' : '💬'}
      </button>

      {/* 弹出框 */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 86, right: 28, zIndex: 999,
          width: 300, background: '#0f0f23', border: '1px solid #1a1a3e',
          borderRadius: 16, padding: 20, boxShadow: '0 8px 40px #000a',
        }}>
          {status === 'done' ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: '1.8em' }}>🙏</div>
              <p style={{ color: '#ccc', margin: '8px 0 0', fontSize: '.9em' }}>Thanks!</p>
            </div>
          ) : (
            <>
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: '.95em' }}>Quick Feedback</div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Missing a skill? Found a bug? Tell us..."
                rows={3}
                style={{
                  width: '100%', boxSizing: 'border-box', padding: '10px 12px',
                  background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 8,
                  color: '#e0e0e0', fontSize: '.85em', resize: 'none',
                  outline: 'none', marginBottom: 10, fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={submit} disabled={status === 'sending' || !message.trim()}
                  style={{
                    flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: 'linear-gradient(135deg,#667eea,#00d4ff)',
                    color: '#fff', fontWeight: 600, fontSize: '.85em',
                  }}>
                  {status === 'sending' ? '...' : 'Send'}
                </button>
                <a href="/feedback"
                  style={{
                    padding: '8px 12px', borderRadius: 8, border: '1px solid #1a1a3e',
                    color: '#667eea', fontSize: '.82em', textDecoration: 'none',
                    display: 'flex', alignItems: 'center',
                  }}>
                  More →
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
