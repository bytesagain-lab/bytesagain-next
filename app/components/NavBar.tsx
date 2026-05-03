'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useLang, T } from './LangContext'

export default function NavBar() {
  const { lang, setLang } = useLang()
  const t = T[lang]
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const navLinkStyle = { color: '#ccc', textDecoration: 'none', fontSize: '.9em' }

  return (
    <header style={{ padding: '14px 0', background: '#0a0a1a', borderBottom: '1px solid #1a1a2e' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
          <img src="/avatar-x.jpg" alt="BytesAgain" style={{ width: 32, height: 32, borderRadius: '50%' }} />
          <span style={{ fontSize: '1.2em', fontWeight: 800, background: 'linear-gradient(135deg,#667eea,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            BytesAgain
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }} className="desktop-nav">
          <a href="/articles" style={navLinkStyle}>📝 {t.nav_articles}</a>
          <a href="/skills" style={navLinkStyle}>🧩 {t.nav_skills}</a>
          <a href="/use-case" style={navLinkStyle}>💼 {t.nav_cases}</a>
          <a href="/requests" style={{ color: '#fbbf24', textDecoration: 'none', fontSize: '.9em', fontWeight: 600 }}>📋 Requests</a>
          {!loading && (
            email ? (
              <>
                <a href="/dashboard" style={{ color: '#667eea', fontSize: '.85em', textDecoration: 'none' }}>{email.split('@')[0]}</a>
                <button onClick={handleSignOut} style={{ background: 'none', border: '1px solid #333', color: '#888', borderRadius: 6, padding: '4px 10px', fontSize: '.85em', cursor: 'pointer' }}>
                  {lang === 'zh' ? '退出' : 'Out'}
                </button>
              </>
            ) : (
              <a href="/login" style={navLinkStyle}>{lang === 'zh' ? '登录' : 'Sign In'}</a>
            )
          )}
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            style={{ background: 'none', border: '1px solid #333', borderRadius: 6, color: '#888', fontSize: '.8em', cursor: 'pointer', padding: '3px 8px' }}
          >
            {lang === 'en' ? '🇨🇳 中文' : '🇺🇸 EN'}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: '1px solid #333', borderRadius: 6, color: '#888', cursor: 'pointer', padding: '6px 10px', fontSize: '1.2em', display: 'none' }}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-nav" style={{ background: '#0d0d20', borderTop: '1px solid #1a1a2e', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <a href="/articles" style={navLinkStyle} onClick={() => setMenuOpen(false)}>📝 {t.nav_articles}</a>
          <a href="/skills" style={navLinkStyle} onClick={() => setMenuOpen(false)}>🧩 {t.nav_skills}</a>
          <a href="/use-case" style={navLinkStyle} onClick={() => setMenuOpen(false)}>💼 {t.nav_cases}</a>
          <a href="/requests" style={{ color: '#fbbf24', textDecoration: 'none', fontSize: '.9em', fontWeight: 600 }} onClick={() => setMenuOpen(false)}>📋 Requests</a>
          {!loading && (
            email ? (
              <>
                <a href="/dashboard" style={{ color: '#667eea', fontSize: '.85em', textDecoration: 'none' }}>{email.split('@')[0]}</a>
                <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: '#888', fontSize: '.85em', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  {lang === 'zh' ? '退出' : 'Sign Out'}
                </button>
              </>
            ) : (
              <a href="/login" style={navLinkStyle} onClick={() => setMenuOpen(false)}>{lang === 'zh' ? '登录' : 'Sign In'}</a>
            )
          )}
          <button
            onClick={() => { setLang(lang === 'en' ? 'zh' : 'en'); setMenuOpen(false) }}
            style={{ background: 'none', border: '1px solid #333', borderRadius: 6, color: '#888', fontSize: '.8em', cursor: 'pointer', padding: '4px 10px', alignSelf: 'flex-start' }}
          >
            {lang === 'en' ? '🇨🇳 中文' : '🇺🇸 EN'}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
