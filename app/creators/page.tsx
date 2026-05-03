'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'
import { useLang } from '../components/LangContext'

const FIELDS = [
  { key: 'github', type: 'text', required: true },
  { key: 'name', type: 'text', required: true },
  { key: 'contact', type: 'select', required: true, options: ['Telegram', 'Discord', 'Email', 'X/Twitter', 'WeChat'] },
  { key: 'contact_value', type: 'text', required: true },
  { key: 'skills', type: 'textarea', required: true },
  { key: 'pricing', type: 'text' },
  { key: 'bio', type: 'textarea' },
]

export default function CreatorRegisterPage() {
  const { lang } = useLang()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const zh = lang === 'zh'

  const t = {
    title: zh ? '创作者登记' : 'Creator Registration',
    sub: zh ? '登记后出现在 BytesAgain Creator 集市。不收费，不抽成，不碰交易。' : 'Get listed on BytesAgain Creator Marketplace. No fees, no commission, no middleman.',
    labelGithub: zh ? 'GitHub 用户名 *' : 'GitHub Username *',
    hintGithub: zh ? 'ClawHub 用 GitHub 登录，这个用来核实你的 skill 所有权' : 'ClawHub uses GitHub login. We verify skill ownership via GitHub.',
    phGithub: zh ? '如：abdur-rahmaanj' : 'e.g. abdur-rahmaanj',
    labelName: zh ? '展示名称 *' : 'Display Name *',
    labelContactMethod: zh ? '联系方式 *' : 'Contact Method *',
    labelContactValue: zh ? '联系方式详情 *' : 'Contact Detail *',
    hintContact: zh ? '买家会通过这个联系你' : 'Buyers will reach you here',
    phContact: zh ? '@你的账号 / 邮箱' : '@yourhandle / your@email.com',
    labelSkills: zh ? '你能提供的 Skill *' : 'Skills You Offer *',
    hintSkills: zh ? '列出 skill 名称，一行一个' : 'List skill names, one per line',
    phSkills: zh ? '如：shell, crypto-trading-bot, data-analysis' : 'e.g. shell, crypto-trading-bot, data-analysis',
    labelPricing: zh ? '定价' : 'Pricing',
    hintPricing: zh ? '让买家有个心理预期' : 'Give buyers a ballpark',
    phPricing: zh ? '如：$50/个, $200/定制' : 'e.g. $50/skill, $200/custom',
    labelBio: zh ? '创作者介绍' : 'Creator Bio',
    phBio: zh ? '简短介绍自己，展示专业度（选填）' : 'Short intro to show your expertise (optional)',
    submit: zh ? '提交登记 →' : 'Submit Registration →',
    submitting: zh ? '提交中…' : 'Submitting…',
    doneTitle: zh ? '登记成功！' : 'Registration Submitted!',
    doneText: zh ? '我们会在 1-2 个工作日内核实你的 GitHub 账号，通过后你的 Skill 会在 BytesAgain Creator 集市展示。' : 'We will verify your GitHub account within 1-2 business days. Once approved, your skills will appear on the BytesAgain Creator Marketplace.',
    backHome: zh ? '← 返回首页' : '← Back to Home',
    loginPrompt: zh ? '请先登录后再登记' : 'Sign in to register',
    loginBtn: zh ? '去登录 →' : 'Sign In →',
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      setAuthLoading(false)
    })
  }, [])

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
          <h1 style={{ fontSize: '1.5em', fontWeight: 800, marginBottom: 12 }}>{t.doneTitle}</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{t.doneText}</p>
          <a href="/" style={{ display: 'inline-block', marginTop: 24, color: '#667eea', textDecoration: 'none' }}>{t.backHome}</a>
        </div>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 8, boxSizing: 'border-box',
    background: '#0a0a18', border: '1px solid #2a2a4e', color: '#e0e0e0',
    fontSize: '1em', outline: 'none',
  }

  const fieldLabel = (f: typeof FIELDS[0]) => {
    const map: Record<string, string> = {
      github: t.labelGithub,
      name: t.labelName,
      contact: t.labelContactMethod,
      contact_value: t.labelContactValue,
      skills: t.labelSkills,
      pricing: t.labelPricing,
      bio: t.labelBio,
    }
    return map[f.key] || f.key
  }

  const fieldHint = (f: typeof FIELDS[0]) => {
    const map: Record<string, string> = {
      github: t.hintGithub,
      contact_value: t.hintContact,
      skills: t.hintSkills,
      pricing: t.hintPricing,
    }
    return map[f.key] || undefined
  }

  const fieldPh = (f: typeof FIELDS[0]) => {
    const map: Record<string, string> = {
      github: t.phGithub,
      contact_value: t.phContact,
      skills: t.phSkills,
      pricing: t.phPricing,
      bio: t.phBio,
    }
    return map[f.key] || ''
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050611', color: '#e5e7eb', padding: '60px 20px 80px' }}>
      <style>{`
        .register-form input:focus, .register-form textarea:focus, .register-form select:focus { border-color: #667eea; }
        .register-form textarea { resize: vertical; min-height: 80px; }
      `}</style>

      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.2em', fontWeight: 800, marginBottom: 8 }}>🎨 {t.title}</h1>
        <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>{t.sub}</p>

        <form onSubmit={handleSubmit} className="register-form" style={{
          background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 18, padding: 36,
        }}>
          {authLoading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#555' }}>{zh ? '加载中…' : 'Loading…'}</div>
          ) : !user ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '2em', marginBottom: 12 }}>🔐</div>
              <p style={{ color: '#94a3b8', fontSize: '.9em', marginBottom: 16 }}>{t.loginPrompt}</p>
              <a href="/login" style={{
                display: 'inline-block', padding: '10px 28px', borderRadius: 8,
                background: 'linear-gradient(135deg,#667eea,#00d4ff)',
                color: '#fff', fontWeight: 700, fontSize: '.9em', textDecoration: 'none',
              }}>{t.loginBtn}</a>
            </div>
          ) : (
          <>
          {FIELDS.map(f => (
            <div key={f.key} style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: '.88em', fontWeight: 600, color: '#ccc' }}>
                {fieldLabel(f)}{f.required && <span style={{ color: '#f87171' }}> *</span>}
              </label>
              {f.type === 'select' ? (
                <select value={form[f.key] || ''} onChange={e => handleChange(f.key, e.target.value)} required={f.required} style={inputStyle}>
                  <option value="" disabled>{zh ? '请选择…' : 'Select…'}</option>
                  {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea value={form[f.key] || ''} onChange={e => handleChange(f.key, e.target.value)} required={f.required}
                  placeholder={fieldPh(f)} style={inputStyle} />
              ) : (
                <input type={f.type} value={form[f.key] || ''} onChange={e => handleChange(f.key, e.target.value)}
                  required={f.required} placeholder={fieldPh(f)} style={inputStyle} />
              )}
              {fieldHint(f) && <p style={{ color: '#444', fontSize: '.75em', margin: '6px 0 0' }}>{fieldHint(f)}</p>}
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
            {saving ? t.submitting : t.submit}
          </button>
          </>
          )}
        </form>
      </div>
    </main>
  )
}
