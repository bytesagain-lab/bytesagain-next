import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'BytesAgain — AI Agent Skills', template: '%s | BytesAgain' },
  description: 'Discover 900+ AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Curated daily.',
  metadataBase: new URL('https://bytesagain.com'),
  openGraph: {
    siteName: 'BytesAgain',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className} style={{ background: '#0a0a1a', color: '#e0e0e0', margin: 0 }}>
        <header style={{ padding: '14px 0', background: '#0a0a1a', borderBottom: '1px solid #1a1a2e' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" style={{ fontSize: '1.5em', fontWeight: 800, textDecoration: 'none', background: 'linear-gradient(135deg,#667eea,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              BytesAgain
            </a>
            <nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <a href="/articles" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>Articles</a>
              <a href="/about" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>About</a>
              <a href="https://bytesagain.com/wp-login.php" style={{ color: '#ccc', textDecoration: 'none', fontSize: '.9em' }}>Sign In</a>
              <a href="https://bytesagain.com/pricing" style={{ color: '#00d4ff', textDecoration: 'none', fontSize: '.9em', fontWeight: 600 }}>Pro</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer style={{ padding: '30px 0', background: '#0a0a1a', borderTop: '1px solid #1a1a2e', marginTop: 60 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
            <p style={{ color: '#888', fontSize: '.85em', margin: 0 }}>
              <strong style={{ color: '#ccc' }}>BytesAgain</strong> — Discover the best AI agent skills
            </p>
            <p style={{ color: '#666', fontSize: '.8em', margin: '8px 0 0' }}>
              <a href="/privacy-policy" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</a> ·{' '}
              <a href="/terms" style={{ color: '#666', textDecoration: 'none' }}>Terms</a> ·{' '}
              <a href="mailto:hello@bytesagain.com" style={{ color: '#666', textDecoration: 'none' }}>Contact</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
