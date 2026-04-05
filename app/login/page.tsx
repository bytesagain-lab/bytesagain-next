'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useLang } from '../components/LangContext'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Mode = 'signin' | 'signup' | 'magic'

export default function LoginPage() {
  const { lang } = useLang()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState('')

  const zh = lang === 'zh'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(''); setDone('')

    if (mode === 'magic') {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: 'https://bytesagain.com/dashboard' },
      })
      if (error) setError(zh ? '发送失败，请重试' : 'Failed to send. Please try again.')
      else setDone(zh ? `登录链接已发送到 ${email}，请查收邮件。` : `Magic link sent to ${email}. Check your inbox.`)
      setLoading(false); return
    }

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: 'https://bytesagain.com/dashboard' },
      })
      if (error) setError(zh ? '注册失败：' + error.message : 'Sign up failed: ' + error.message)
      else setDone(zh ? '注册成功！请查收验证邮件后登录。' : 'Account created! Check your email to verify, then sign in.')
      setLoading(false); return
    }

    // signin
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(zh ? '邮箱或密码错误' : 'Invalid email or password')
    } else {
      window.location.href = '/dashboard'
    }
    setLoading(false)
  }

  const googleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://bytesagain.com/dashboard' },
    })
  }

  const tabs: { key: Mode; label: string }[] = [
    { key: 'signin', label: zh ? '密码登录' : 'Sign In' },
    { key: 'signup', label: zh ? '注册' : 'Register' },
    { key: 'magic', label: zh ? '邮件链接' : 'Magic Link' },
  ]

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: '0 20px' }}>
      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 36 }}>
        <h1 style={{ fontSize: '1.6em', fontWeight: 800, marginBottom: 24 }}>
          {zh ? '欢迎回来' : 'Welcome back'}
        </h1>

        {/* Google 登录 */}
        <button onClick={googleLogin} style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: '11px 0', borderRadius: 8, border: '1px solid #2a2a4e',
          color: '#ccc', fontSize: '.9em', background: '#0a0a18', cursor: 'pointer', marginBottom: 20,
        }}>
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.4 30.2 0 24 0 14.7 0 6.7 5.5 2.8 13.5l7.8 6C12.4 13 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"/><path fill="#FBBC05" d="M10.6 28.5A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.8-4.5l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8.1-6.3z"/><path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.9l-8.1 6.3C6.7 42.5 14.7 48 24 48z"/></svg>
          {zh ? '用 Google 登录' : 'Continue with Google'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: '#1a1a3e' }} />
          <span style={{ color: '#444', fontSize: '.8em' }}>{zh ? '或' : 'or'}</span>
          <div style={{ flex: 1, height: 1, background: '#1a1a3e' }} />
        </div>

        {/* 模式切换 tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#0a0a18', borderRadius: 8, padding: 4 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => { setMode(t.key); setError(''); setDone('') }}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 6, border: 'none', cursor: 'pointer',
                fontSize: '.85em', fontWeight: 600,
                background: mode === t.key ? '#667eea' : 'transparent',
                color: mode === t.key ? '#fff' : '#555',
                transition: 'all .15s',
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '2em', marginBottom: 10 }}>✅</div>
            <div style={{ color: '#a0e0a0', fontSize: '.9em', lineHeight: 1.6 }}>{done}</div>
            <button onClick={() => { setDone(''); setMode('signin') }}
              style={{ marginTop: 16, color: '#667eea', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.88em' }}>
              {zh ? '← 返回登录' : '← Back to sign in'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder={zh ? '邮箱地址' : 'your@email.com'} required
              style={{ width: '100%', padding: '12px 14px', borderRadius: 8, boxSizing: 'border-box',
                background: '#0a0a18', border: '1px solid #2a2a4e', color: '#e0e0e0',
                fontSize: '1em', marginBottom: 10 }} />

            {mode !== 'magic' && (
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder={zh ? '密码' : 'Password'} required minLength={6}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 8, boxSizing: 'border-box',
                  background: '#0a0a18', border: '1px solid #2a2a4e', color: '#e0e0e0',
                  fontSize: '1em', marginBottom: 10 }} />
            )}

            {error && <div style={{ color: '#f87171', fontSize: '.85em', marginBottom: 10 }}>{error}</div>}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '12px 0', borderRadius: 8, border: 'none',
              background: loading ? '#333' : 'linear-gradient(135deg,#667eea,#00d4ff)',
              color: '#fff', fontWeight: 700, fontSize: '1em',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}>
              {loading ? '...' : mode === 'signin' ? (zh ? '登录 →' : 'Sign In →')
                : mode === 'signup' ? (zh ? '注册账号 →' : 'Create Account →')
                : (zh ? '发送登录链接 →' : 'Send Magic Link →')}
            </button>
            {(mode === 'signup' || mode === 'magic') && (
              <p style={{ fontSize: '.75em', color: '#556', textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
                {zh
                  ? <>注册即表示您同意我们的 <a href="/terms" style={{ color: '#667eea' }}>服务条款</a> 和 <a href="/privacy" style={{ color: '#667eea' }}>隐私政策</a>。BytesAgain 是 AI skill 导航目录，不对第三方 skill 内容承担责任。</>
                  : <>By creating an account, you agree to our <a href="/terms" style={{ color: '#667eea' }}>Terms of Service</a> and <a href="/privacy" style={{ color: '#667eea' }}>Privacy Policy</a>. BytesAgain is an independent AI skill directory and does not endorse or guarantee third-party skill content.</>
                }
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
