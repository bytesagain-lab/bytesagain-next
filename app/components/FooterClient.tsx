'use client'

import { useLang, T } from './LangContext'

export default function FooterClient() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <footer style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border-secondary)', marginTop: 60 }}>
      <div style={{ borderTop: '1px solid var(--border-light)', maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 24 }}>
          {/* Brand */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>BytesAgain</div>
            <div style={{ color: 'var(--text-muted3)', fontSize: '.82em', maxWidth: 200 }}>
              {lang === 'zh' ? '发现最好用的 AI 智能体 Skill。' : 'Discover the best AI agent skills for your workflow.'}
            </div>
          </div>
          {/* Explore */}
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '.75em', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{t.footer_explore}</div>
            {[
              [t.nav_skills, '/skills'],
              [t.nav_articles, '/articles'],
              [t.nav_cases, '/use-case'],
            ].map(([label, href]) => (
              <div key={href} style={{ marginBottom: 6 }}>
                <a href={href} style={{ color: 'var(--text-muted2)', textDecoration: 'none', fontSize: '.85em' }}>{label}</a>
              </div>
            ))}
          </div>
          {/* Company */}
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '.75em', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{t.footer_company}</div>
            {[
              [t.footer_about, '/about'],
              [t.footer_contact, '/contact'],
              [t.footer_privacy, '/privacy-policy'],
              [t.footer_terms, '/terms'],
              [t.footer_feedback, '/feedback'],
            ].map(([label, href]) => (
              <div key={href} style={{ marginBottom: 6 }}>
                <a href={href} style={{ color: 'var(--text-muted2)', textDecoration: 'none', fontSize: '.85em' }}>{label}</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
          <div style={{ color: 'var(--text-muted4)', fontSize: '.8em', marginBottom: 8 }}>
            © {new Date().getFullYear()} BytesAgain. All rights reserved.
          </div>
          <div style={{ color: 'var(--text-muted5)', fontSize: '.75em', lineHeight: 1.6, maxWidth: 720 }}>
            {t.footer_disclaimer}
          </div>
        </div>
      </div>
    </footer>
  )
}
