'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useLang, T } from '../components/LangContext'

export default function LoginPage() {
  const { lang } = useLang()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: 'https://bytesagain.com/dashboard' },
    })

    if (error) {
      setError(lang === 'zh' ? '发送失败，请重试' : 'Failed to send. Please try again.')
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: '0 20px' }}>
      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 36 }}>
        <h1 style={{ fontSize: '1.6em', fontWeight: 800, marginBottom: 8 }}>
          {lang === 'zh' ? '登录 / 注册' : 'Sign In / Register'}
        </h1>
        <p style={{ color: '#666', fontSize: '.9em', marginBottom: 28 }}>
          {lang === 'zh'
            ? '输入邮箱，我们发一个登录链接给你，无需密码。'
            : 'Enter your email and we\'ll send you a magic link. No password needed.'}
        </p>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '2em', marginBottom: 12 }}>📬</div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              {lang === 'zh' ? '邮件已发送！' : 'Check your email!'}
            </div>
            <div style={{ color: '#666', fontSize: '.88em' }}>
              {lang === 'zh'
                ? `我们发了一封登录邮件到 ${email}，点击邮件中的链接即可登录。`
                : `We sent a login link to ${email}. Click the link to sign in.`}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={lang === 'zh' ? '你的邮箱' : 'your@email.com'}
              required
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 8,
                background: '#0a0a18', border: '1px solid #2a2a4e',
                color: '#e0e0e0', fontSize: '1em', marginBottom: 12,
                boxSizing: 'border-box',
              }}
            />
            {error && <div style={{ color: '#f87171', fontSize: '.85em', marginBottom: 10 }}>{error}</div>}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px 0',
                background: loading ? '#333' : 'linear-gradient(135deg,#667eea,#00d4ff)',
                border: 'none', borderRadius: 8, color: '#fff',
                fontWeight: 700, fontSize: '1em', cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading
                ? (lang === 'zh' ? '发送中...' : 'Sending...')
                : (lang === 'zh' ? '发送登录链接 →' : 'Send Magic Link →')}
            </button>
          </form>
        )}

        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #1a1a2e', textAlign: 'center' }}>
          <a
            href={`/api/auth/google`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '11px 0', borderRadius: 8, border: '1px solid #2a2a4e',
              color: '#ccc', textDecoration: 'none', fontSize: '.9em',
              background: '#0a0a18',
            }}
            onClick={async (e) => {
              e.preventDefault()
              const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
              )
              await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: 'https://bytesagain.com/dashboard' },
              })
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.4 30.2 0 24 0 14.7 0 6.7 5.5 2.8 13.5l7.8 6C12.4 13 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"/><path fill="#FBBC05" d="M10.6 28.5A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.8-4.5l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8.1-6.3z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.9l-8.1 6.3C6.7 42.5 14.7 48 24 48z"/></svg>
            {lang === 'zh' ? '用 Google 账号登录' : 'Continue with Google'}
          </a>
        </div>
      </div>
    </div>
  )
}
