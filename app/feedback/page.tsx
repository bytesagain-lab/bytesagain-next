'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const TYPES = [
  { id: 'skill', label: '🔍 Missing Skill', desc: 'A skill you wish existed' },
  { id: 'usecase', label: '🗂️ Missing Use Case', desc: 'A workflow or scenario not covered' },
  { id: 'role', label: '🧑‍💼 My Role Isn\'t Here', desc: 'Your job or persona isn\'t listed' },
  { id: 'bug', label: '🐛 Bug Report', desc: 'Something is broken' },
  { id: 'idea', label: '💡 Feature Idea', desc: 'Make BytesAgain better' },
  { id: 'general', label: '💬 General', desc: 'Anything else' },
]

export default function FeedbackPage() {
  const [type, setType] = useState('skill')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [showBanner, setShowBanner] = useState(true)

  // 5秒后自动隐藏 banner
  useEffect(() => {
    const t = setTimeout(() => setShowBanner(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const submit = async () => {
    if (!message.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message, email, page: window.location.href }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px' }}>

      {/* 价值引导 Banner */}
      {showBanner && (
        <div style={{
          background: 'linear-gradient(135deg, #0f0f23, #1a1a3e)',
          border: '1px solid #667eea44',
          borderRadius: 16, padding: '24px 28px', marginBottom: 32,
          position: 'relative',
        }}>
          <div style={{ fontSize: '1.1em', fontWeight: 700, color: '#e0e0e0', marginBottom: 8 }}>
            👋 Welcome to BytesAgain
          </div>
          <p style={{ color: '#888', fontSize: '.9em', marginBottom: 16, lineHeight: 1.6 }}>
            We're building the most comprehensive AI agent skill directory — 50,000+ skills from ClawHub, GitHub, LobeHub and more.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/skills" style={{
              padding: '8px 18px', borderRadius: 8, fontSize: '.85em', fontWeight: 600,
              background: 'linear-gradient(135deg,#667eea,#00d4ff)', color: '#fff',
              textDecoration: 'none',
            }}>
              Browse Skills →
            </Link>
            <button onClick={() => setShowBanner(false)} style={{
              padding: '8px 18px', borderRadius: 8, fontSize: '.85em',
              background: 'transparent', border: '1px solid #333', color: '#888',
              cursor: 'pointer',
            }}>
              Leave Feedback
            </button>
          </div>
          <div style={{ position: 'absolute', top: 12, right: 16, color: '#444', fontSize: '.75em' }}>
            auto-close in 5s
          </div>
        </div>
      )}

      <h1 style={{ fontSize: '1.8em', fontWeight: 800, marginBottom: 8 }}>Share Feedback</h1>
      <p style={{ color: '#666', marginBottom: 40 }}>
        Tell us what skills you need, what's broken, or how to make BytesAgain better.
      </p>

      {status === 'done' ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ fontSize: '3em', marginBottom: 16 }}>🙏</div>
          <h2 style={{ color: '#e0e0e0', marginBottom: 8 }}>Thanks for your feedback!</h2>
          <p style={{ color: '#666' }}>We read every message and use it to improve.</p>
          <button onClick={() => { setStatus('idle'); setMessage(''); setEmail('') }}
            style={{ marginTop: 24, padding: '10px 24px', background: 'linear-gradient(135deg,#667eea,#00d4ff)', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
            Send Another →
          </button>
        </div>
      ) : (
        <>
          {/* Type selector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 28 }}>
            {TYPES.map(t => (
              <button key={t.id} onClick={() => setType(t.id)}
                style={{
                  padding: '14px 16px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                  background: type === t.id ? 'linear-gradient(135deg,#667eea22,#00d4ff22)' : '#0f0f23',
                  border: type === t.id ? '1px solid #667eea' : '1px solid #1a1a3e',
                  color: type === t.id ? '#e0e0e0' : '#888',
                  transition: 'all .15s',
                }}>
                <div style={{ fontWeight: 700, fontSize: '.9em', marginBottom: 4 }}>{t.label}</div>
                <div style={{ fontSize: '.78em', color: '#555' }}>{t.desc}</div>
              </button>
            ))}
          </div>

          {/* Message */}
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={
              type === 'skill' ? 'Describe the skill you need. What should it do?' :
              type === 'usecase' ? 'What workflow or scenario are you trying to automate? What\'s the end goal?' :
              type === 'role' ? 'What\'s your role or job title? What kind of tasks do you need help with?' :
              type === 'bug' ? 'What happened? What did you expect?' :
              type === 'idea' ? 'What feature would make BytesAgain better?' :
              'What\'s on your mind?'
            }
            rows={5}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '14px 16px',
              background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 12,
              color: '#e0e0e0', fontSize: '.95em', resize: 'vertical',
              outline: 'none', marginBottom: 14, fontFamily: 'inherit',
            }}
          />

          {/* Email (optional) */}
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email (optional — we'll reply if you leave one)"
            style={{
              width: '100%', boxSizing: 'border-box', padding: '12px 16px',
              background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 12,
              color: '#e0e0e0', fontSize: '.9em', outline: 'none', marginBottom: 20,
              fontFamily: 'inherit',
            }}
          />

          {status === 'error' && (
            <p style={{ color: '#f87171', marginBottom: 12, fontSize: '.88em' }}>
              Something went wrong. Please try again.
            </p>
          )}

          <button onClick={submit} disabled={status === 'sending' || !message.trim()}
            style={{
              width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: message.trim() ? 'linear-gradient(135deg,#667eea,#00d4ff)' : '#1a1a3e',
              color: '#fff', fontWeight: 700, fontSize: '1em',
              opacity: status === 'sending' ? 0.7 : 1, transition: 'all .2s',
            }}>
            {status === 'sending' ? 'Sending...' : 'Send Feedback →'}
          </button>
        </>
      )}
    </div>
  )
}
