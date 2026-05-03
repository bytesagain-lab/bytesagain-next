'use client'

import { useState } from 'react'

const FORM_FIELDS = [
  { key: 'github', label: 'GitHub Username', type: 'text', required: true, placeholder: '如: abdur-rahmaanj', hint: 'ClawHub 用 GitHub 登录，这个用来核实你的 skill 所有权' },
  { key: 'name', label: 'Display Name', type: 'text', required: true, placeholder: '如: 张三 / Alice' },
  { key: 'contact', label: 'Contact Method', type: 'select', required: true, options: ['Telegram', 'Discord', 'Email', 'X/Twitter', 'WeChat'] },
  { key: 'contact_value', label: 'Contact Detail', type: 'text', required: true, placeholder: '@yourhandle / your@email.com', hint: '买家会通过这个联系你' },
  { key: 'skills', label: 'Skills You Offer', type: 'textarea', required: true, placeholder: '列出你想出售的 skill 名称，一行一个', hint: '例如: shell, crypto-trading-bot, data-analysis' },
  { key: 'pricing', label: 'Pricing', type: 'text', placeholder: '如: $50/个, $200/定制', hint: '让买家有个心理预期' },
  { key: 'bio', label: 'Creator Bio', type: 'textarea', placeholder: '简短介绍自己，展示专业度（选填）' },
]

export default function CreatorRegisterPage() {
  const [form, setForm] = useState<Record<string,string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError('')

    try {
      const res = await fetch('/api/creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as any).error || 'Failed')
      }
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050611', color: '#e5e7eb' }}>
        <div style={{ textAlign: 'center', maxWidth: 440, padding: '0 20px' }}>
          <div style={{ fontSize: '3em', marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontSize: '1.5em', fontWeight: 800, marginBottom: 12 }}>登记成功！</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            我们会在 1-2 个工作日内核实你的 GitHub 账号，通过后你的 Skill 会在 BytesAgain Creator 集市展示。
          </p>
          <a href="/" style={{ display: 'inline-block', marginTop: 24, color: '#667eea', textDecoration: 'none' }}>← 返回首页</a>
        </div>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 8, boxSizing: 'border-box',
    background: '#0a0a18', border: '1px solid #2a2a4e', color: '#e0e0e0',
    fontSize: '1em', outline: 'none',
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050611', color: '#e5e7eb', padding: '60px 20px 80px' }}>
      <style>{`
        .register-form input:focus, .register-form textarea:focus, .register-form select:focus { border-color: #667eea; }
        .register-form textarea { resize: vertical; min-height: 80px; }
      `}</style>

      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.2em', fontWeight: 800, marginBottom: 8 }}>🎨 Creator Registration</h1>
        <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>
          登记者可出现在 BytesAgain Creator 集市，买家直接联系你。我们不收费，不抽成，不碰交易。
        </p>

        <form onSubmit={handleSubmit} className="register-form" style={{
          background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 18, padding: 36,
        }}>
          {FORM_FIELDS.map(f => (
            <div key={f.key} style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '.88em', fontWeight: 600, color: '#ccc' }}>
                {f.label}{f.required && <span style={{ color: '#f87171' }}> *</span>}
              </label>
              {f.type === 'select' ? (
                <select
                  value={form[f.key] || ''}
                  onChange={e => handleChange(f.key, e.target.value)}
                  required={f.required}
                  style={inputStyle}
                >
                  <option value="" disabled>Select...</option>
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea
                  value={form[f.key] || ''}
                  onChange={e => handleChange(f.key, e.target.value)}
                  required={f.required}
                  placeholder={f.placeholder}
                  style={inputStyle}
                />
              ) : (
                <input
                  type={f.type}
                  value={form[f.key] || ''}
                  onChange={e => handleChange(f.key, e.target.value)}
                  required={f.required}
                  placeholder={f.placeholder}
                  style={inputStyle}
                />
              )}
              {f.hint && <p style={{ color: '#444', fontSize: '.75em', margin: '6px 0 0' }}>{f.hint}</p>}
            </div>
          ))}

          {error && (
            <div style={{ color: '#f87171', fontSize: '.85em', marginBottom: 16, padding: '10px', background: '#3a1a1a20', borderRadius: 8, border: '1px solid #3a1a1a44' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={saving} style={{
            width: '100%', padding: '14px 0', borderRadius: 10, border: 'none',
            background: saving ? '#333' : 'linear-gradient(135deg,#667eea,#00d4ff)',
            color: '#fff', fontWeight: 700, fontSize: '1em',
            cursor: saving ? 'not-allowed' : 'pointer',
          }}>
            {saving ? 'Submitting...' : 'Submit Registration →'}
          </button>
        </form>
      </div>
    </main>
  )
}
