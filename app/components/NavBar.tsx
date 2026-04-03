'use client'

import { useLang, T } from './LangContext'

export default function NavBar() {
  const { lang, setLang } = useLang()
  const t = T[lang]

  return (
    <header style={{ padding: '14px 0', background: '#0a0a1a', borderBottom: '1px solid #1a1a2e' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontSize: '1.5em', fontWeight: 800, textDecoration: 'none', background: 'linear-gradient(135deg,#667eea,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          BytesAgain
        </a>
        <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/articles" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>{t.nav_articles}</a>
          <a href="/skills" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>{t.nav_skills}</a>
          <a href="/use-case" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>{t.nav_cases}</a>
          {/* 语言切换 */}
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            style={{
              background: 'none', border: '1px solid #333', borderRadius: 6,
              color: '#888', fontSize: '.8em', cursor: 'pointer',
              padding: '3px 8px', letterSpacing: 0.5,
            }}
            title="切换语言 / Switch Language"
          >
            {lang === 'en' ? '🇨🇳 中文' : '🇺🇸 EN'}
          </button>
        </nav>
      </div>
    </header>
  )
}
