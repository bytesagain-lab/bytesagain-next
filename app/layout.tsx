import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import NavBar from './components/NavBar'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'BytesAgain — AI Agent Skills', template: '%s | BytesAgain' },
  description: 'Discover 900+ AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Curated daily.',
  metadataBase: new URL('https://bytesagain.com'),
  alternates: { canonical: 'https://bytesagain.com' },
  openGraph: {
    siteName: 'BytesAgain',
    type: 'website',
    url: 'https://bytesagain.com',
    title: 'BytesAgain — AI Agent Skills',
    description: 'Discover 900+ AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Curated daily.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bytesagain',
    title: 'BytesAgain — AI Agent Skills',
    description: 'Discover 900+ AI agent skills for Claude, ChatGPT, Cursor, and every AI agent.',
  },
  other: {
    'llms-txt': 'https://bytesagain.com/llms.txt',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className} style={{ background: '#0a0a1a', color: '#e0e0e0', margin: 0 }}>
        <NavBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BytesAgain",
          "url": "https://bytesagain.com",
          "logo": "https://bytesagain.com/logo.png",
          "sameAs": ["https://x.com/bytesagain"],
          "contactPoint": { "@type": "ContactPoint", "email": "hello@bytesagain.com" }
        }) }} />
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
