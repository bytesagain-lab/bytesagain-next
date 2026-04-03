'use client'

import { useLang, T } from './LangContext'

export default function FooterClient() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <footer style={{ background: '#0a0a1a', borderTop: '1px solid #1a1a2e', marginTop: 60 }}>
      <div style={{ borderTop: '1px solid #111', maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 24 }}>
          {/* Brand */}
          <div>
            <div style={{ fontWeight: 700, color: '#ccc', marginBottom: 8 }}>BytesAgain</div>
            <div style={{ color: '#555', fontSize: '.82em', maxWidth: 200 }}>
              {lang === 'zh' ? '发现最好用的 AI 智能体 Skill。' : 'Discover the best AI agent skills for your workflow.'}
            </div>
          </div>
          {/* Explore */}
          <div>
            <div style={{ color: '#888', fontSize: '.75em', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{t.footer_explore}</div>
            {[
              [t.nav_skills, '/skills'],
              [t.nav_articles, '/articles'],
              [t.nav_cases, '/use-case'],
            ].map(([label, href]) => (
              <div key={href} style={{ marginBottom: 6 }}>
                <a href={href} style={{ color: '#666', textDecoration: 'none', fontSize: '.85em' }}>{label}</a>
              </div>
            ))}
          </div>
          {/* Company */}
          <div>
            <div style={{ color: '#888', fontSize: '.75em', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{t.footer_company}</div>
            {[
              [t.footer_about, '/about'],
              [t.footer_contact, '/contact'],
              [t.footer_privacy, '/privacy-policy'],
              [t.footer_terms, '/terms'],
              [t.footer_feedback, '/feedback'],
            ].map(([label, href]) => (
              <div key={href} style={{ marginBottom: 6 }}>
                <a href={href} style={{ color: '#666', textDecoration: 'none', fontSize: '.85em' }}>{label}</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #111', paddingTop: 16 }}>
          <div style={{ color: '#444', fontSize: '.8em', marginBottom: 8 }}>
            © {new Date().getFullYear()} BytesAgain. All rights reserved.
          </div>
          <div style={{ color: '#333', fontSize: '.75em', lineHeight: 1.6, maxWidth: 720 }}>
            {t.footer_disclaimer}
          </div>
        </div>
      </div>
    </footer>
  )
}
