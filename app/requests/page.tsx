'use client'

import { useEffect, useState } from 'react'

interface Request {
  id: number
  title: string | null
  request: string
  use_case: string | null
  platform: string | null
  budget: string | null
  contact: string | null
  created_at: string
}

const PLATFORMS = ['OpenClaw', 'Claude Desktop', 'Cursor', 'Codex CLI', 'Copilot', 'Gemini CLI', 'Other']

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', request: '', use_case: '', platform: '', budget: '', contact: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/requests').then(r => r.json()).then(data => {
      setRequests(data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const set = (k: string, v: string) => { setForm(p => ({ ...p, [k]: v })); setDone(false); setError('') }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.request.trim().length < 10) return setError('需求至少描述 10 个字')
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed')
      setDone(true)
      setForm({ title: '', request: '', use_case: '', platform: '', budget: '', contact: '' })
      const r2 = await fetch('/api/requests').then(r => r.json())
      setRequests(r2 || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: 8, boxSizing: 'border-box',
    background: '#0a0a18', border: '1px solid #2a2a4e', color: '#e0e0e0',
    fontSize: '.92em', outline: 'none',
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050611', color: '#e5e7eb', padding: '60px 20px 80px' }}>
      <style>{`
        .req-input:focus, .req-textarea:focus, .req-select:focus { border-color: #667eea; }
        @media (min-width: 768px) {
          .req-layout { display: grid; grid-template-columns: 380px 1fr; gap: 32px; align-items: start; }
        }
      `}</style>

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: '2em', fontWeight: 800, marginBottom: 8 }}>📋 Skill 需求墙</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            写下你需要的 AI Skill，也许有人能帮你。描述得越具体，Creator 越容易匹配。
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
              {/* 标题 */}
              <Field label="一句话标题" hint="如：需要股票技术分析 skill">
                <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
                  placeholder="简短概括你的需求" className="req-input" style={inputStyle} />
              </Field>

              {/* 需求描述 */}
              <Field label="详细描述 *" hint="最少 10 字，越具体越好">
                <textarea value={form.request} onChange={e => set('request', e.target.value)}
                  required
                  placeholder={'需要什么功能？解决什么问题？\n\n例如：我需要一个分析 A 股技术指标的 skill，能看 K 线形态、MACD、RSI，最好还能自动标注买卖信号。'}
                  className="req-textarea"
                  style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} />
              </Field>

              {/* 使用场景 */}
              <Field label="使用场景" hint="这个 skill 用在什么工作流里？">
                <input type="text" value={form.use_case} onChange={e => set('use_case', e.target.value)}
                  placeholder="如：每天收盘后分析 + 生成交易计划" className="req-input" style={inputStyle} />
              </Field>

              {/* 平台 */}
              <Field label="Agent 平台">
                <select value={form.platform} onChange={e => set('platform', e.target.value)}
                  className="req-select" style={inputStyle}>
                  <option value="">不限</option>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>

              {/* 预算 */}
              <Field label="预算" hint="让 Creator 知道你的预期价格">
                <input type="text" value={form.budget} onChange={e => set('budget', e.target.value)}
                  placeholder="如：$50, 议价, 免费最好" className="req-input" style={inputStyle} />
              </Field>

              {/* 联系方式 */}
              <Field label="联系方式（选填）">
                <input type="text" value={form.contact} onChange={e => set('contact', e.target.value)}
                  placeholder='TG / Email（创作者会通过这个联系你）' className="req-input" style={inputStyle} />
              </Field>

              {done && (
                <div style={{ color: '#86efac', fontSize: '.85em', marginBottom: 14, padding: '10px', background: '#34d39910', borderRadius: 8, border: '1px solid #34d39922' }}>
                  ✅ 需求已发布
                </div>
              )}
              {error && (
                <div style={{ color: '#f87171', fontSize: '.85em', marginBottom: 14, padding: '10px', background: '#3a1a1a10', borderRadius: 8, border: '1px solid #3a1a1a22' }}>
                  ⚠️ {error}
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
                    {r.title && (
                      <div style={{ fontWeight: 700, fontSize: '1em', color: '#e0e0e0', marginBottom: 6 }}>
                        {r.title}
                      </div>
                    )}
                    <div style={{ fontSize: '.92em', color: '#cbd5e1', lineHeight: 1.7, marginBottom: r.use_case || r.platform ? 8 : 10 }}>
                      {r.request}
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                      {r.platform && (
                        <Tag label={r.platform} color="#667eea" />
                      )}
                      {r.budget && (
                        <Tag label={r.budget} color="#f59e0b" />
                      )}
                      {r.use_case && (
                        <span style={{ fontSize: '.75em', color: '#555', lineHeight: 1.5, flexBasis: '100%' }}>
                          💡 场景: {r.use_case}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '.78em', color: '#444' }}>
                        {new Date(r.created_at).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                      </span>
                      <span style={{ fontSize: '.8em', color: r.contact ? '#667eea' : '#555' }}>
                        {r.contact ? <>📬 {r.contact}</> : '未留联系方式'}
                      </span>
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

// Internal helpers

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 4, fontSize: '.82em', fontWeight: 600, color: '#ccc' }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ color: '#444', fontSize: '.72em', margin: '4px 0 0' }}>{hint}</p>}
    </div>
  )
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: '.7em', fontWeight: 700,
      background: `${color}18`, color, border: `1px solid ${color}33`,
    }}>
      {label}
    </span>
  )
}
