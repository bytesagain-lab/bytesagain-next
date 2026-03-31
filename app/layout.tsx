import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import NavBar from './components/NavBar'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'BytesAgain — AI Agent Skills', template: '%s | BytesAgain' },
  description: 'Discover 900+ AI agent skills for Claude, ChatGPT, Cursor, and every AI agent. Curated daily.',
  metadataBase: new URL('https://bytesagain.com'),
  alternates: {
    canonical: 'https://bytesagain.com',
    types: {
      'text/plain': 'https://bytesagain.com/llms.txt',
    },
  },
  openGraph: {
    siteName: 'BytesAgain',
    type: 'website',
    url: 'https://bytesagain.com',
    title: 'BytesAgain — Find Your AI Skill Stack',
    description: 'Curated AI agent skills for developers, creators, traders and more. Personalized recommendations from 100,000+ skills worldwide.',
    images: [{ url: 'https://bytesagain.com/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bytesagain',
    title: 'BytesAgain — Find Your AI Skill Stack',
    description: 'Personalized AI skill recommendations. Tell us what you do, we tell you what to install.',
  },
  other: {
    'llms-txt': 'https://bytesagain.com/llms.txt',
    'llms-full-txt': 'https://bytesagain.com/llms-full.txt',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="llms" href="/llms.txt" />
        <link rel="llms-full" href="/llms-full.txt" />
      </head>
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
        <footer style={{ background: '#0a0a1a', borderTop: '1px solid #1a1a2e', marginTop: 60 }}>
          {/* Subscribe bar */}
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontWeight: 600, fontSize: '.95em' }}>📬 Weekly AI Skills Digest — Free</span>
              <span style={{ color: '#555', fontSize: '.85em', marginLeft: 10 }}>No spam, unsubscribe anytime.</span>
            </div>
            <a href="/register" style={{ padding: '8px 22px', background: 'linear-gradient(135deg,#667eea,#00d4ff)', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: '.9em', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Subscribe Free →
            </a>
          </div>
          {/* Footer links */}
          <div style={{ borderTop: '1px solid #111', maxWidth: 1200, margin: '0 auto', padding: '16px 20px', textAlign: 'center' }}>
            <p style={{ color: '#888', fontSize: '.85em', margin: 0 }}>
              <strong style={{ color: '#ccc' }}>BytesAgain</strong> — Discover the best AI agent skills
              {' · '}
              <a href="/privacy-policy" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</a>
              {' · '}
              <a href="/terms" style={{ color: '#666', textDecoration: 'none' }}>Terms</a>
              {' · '}
              <a href="mailto:hello@bytesagain.com" style={{ color: '#666', textDecoration: 'none' }}>Contact</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
