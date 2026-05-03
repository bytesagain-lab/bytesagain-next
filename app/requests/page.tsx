'use client'

import { useEffect, useState } from 'react'

interface Request {
  id: number
  request: string
  contact: string
  created_at: string
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [formReq, setFormReq] = useState('')
  const [formContact, setFormContact] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/requests').then(r => r.json()).then(data => {
      setRequests(data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request: formReq, contact: formContact || null }),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed')
      setDone(true)
      setFormReq(''); setFormContact('')
      // refresh list
      const r2 = await fetch('/api/requests').then(r => r.json())
      setRequests(r2 || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 8, boxSizing: 'border-box',
    background: '#0a0a18', border: '1px solid #2a2a4e', color: '#e0e0e0',
    fontSize: '1em', outline: 'none',
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050611', color: '#e5e7eb', padding: '60px 20px 80px' }}>
      <style>{`
        .req-input:focus, .req-textarea:focus { border-color: #667eea; }
        @media (min-width: 768px) {
          .req-layout { display: grid; grid-template-columns: 380px 1fr; gap: 32px; align-items: start; }
        }
      `}</style>

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: '2em', fontWeight: 800, marginBottom: 8 }}>📋 Skill 需求墙</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            写下你需要的 AI Skill，也许有人能帮你。也可能 Creators 看到后会主动联系你。
          </p>
        </div>

        <div className="req-layout">
          {/* 提交表单 */}
          <div style={{
            background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 18, padding: 28,
            position: 'sticky', top: 20,
          }}>
            <h2 style={{ margin: '0 0 20px', fontSize: '1.05em', fontWeight: 700, color: '#ccc' }}>
              发布需求
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '.85em', fontWeight: 600, color: '#ccc' }}>
                  你需要什么 Skill？ *
                </label>
                <textarea
                  value={formReq}
                  onChange={e => { setFormReq(e.target.value); setDone(false); setError('') }}
                  required
                  placeholder='例如：我需要一个能自动生成周报的 skill，或者帮我做股票技术分析的...'
                  className="req-textarea"
                  style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '.85em', fontWeight: 600, color: '#ccc' }}>
                  联系方式（选填）
                </label>
                <input
                  type="text"
                  value={formContact}
                  onChange={e => setFormContact(e.target.value)}
                  placeholder='TG / Email / Discord（创作者会通过这个联系你）'
                  className="req-input"
                  style={inputStyle}
                />
              </div>

              {done && (
                <div style={{ color: '#86efac', fontSize: '.85em', marginBottom: 14, padding: '10px', background: '#34d39910', borderRadius: 8, border: '1px solid #34d39922' }}>
                  ✅ 需求已发布
                </div>
              )}
              {error && (
                <div style={{ color: '#f87171', fontSize: '.85em', marginBottom: 14, padding: '10px', background: '#3a1a1a10', borderRadius: 8, border: '1px solid #3a1a1a22' }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting} style={{
                width: '100%', padding: '12px 0', borderRadius: 10, border: 'none',
                background: submitting ? '#333' : 'linear-gradient(135deg,#667eea,#00d4ff)',
                color: '#fff', fontWeight: 700, fontSize: '.95em',
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}>
                {submitting ? 'Publishing...' : 'Publish Request →'}
              </button>
            </form>
          </div>

          {/* 需求列表 */}
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#555' }}>Loading…</div>
            ) : requests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 18 }}>
                <div style={{ fontSize: '2.5em', marginBottom: 12 }}>📭</div>
                <p style={{ color: '#555' }}>还没有需求。成为第一个发布的！</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {requests.map(r => (
                  <div key={r.id} style={{
                    background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 14, padding: 20,
                  }}>
                    <div style={{ fontSize: '.95em', color: '#e0e0e0', lineHeight: 1.7, marginBottom: 10 }}>
                      {r.request}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '.78em', color: '#444' }}>
                        {new Date(r.created_at).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                      </span>
                      {r.contact ? (
                        <span style={{ fontSize: '.8em', color: '#667eea' }}>
                          📬 {r.contact}
                        </span>
                      ) : (
                        <span style={{ fontSize: '.75em', color: '#555' }}>未留联系方式</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
