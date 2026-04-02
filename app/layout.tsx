import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import NavBar from './components/NavBar'
import FeedbackButton from './components/FeedbackButton'
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
        {/* Google Analytics GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3C1MM9FWYF" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3C1MM9FWYF');
        `}} />
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
          {/* Footer nav + copyright */}
          <div style={{ borderTop: '1px solid #111', maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 24 }}>
              {/* Brand */}
              <div>
                <div style={{ fontWeight: 700, color: '#ccc', marginBottom: 8 }}>BytesAgain</div>
                <div style={{ color: '#555', fontSize: '.82em', maxWidth: 200 }}>Discover the best AI agent skills for your workflow.</div>
              </div>
              {/* Explore */}
              <div>
                <div style={{ color: '#888', fontSize: '.75em', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Explore</div>
                {[['Skills', '/skills'], ['Articles', '/articles'], ['Use Cases', '/use-case'], ['Install', '/install'], ['Pro', '/pro']].map(([label, href]) => (
                  <div key={href} style={{ marginBottom: 6 }}>
                    <a href={href} style={{ color: '#666', textDecoration: 'none', fontSize: '.85em' }}>{label}</a>
                  </div>
                ))}
              </div>
              {/* Company */}
              <div>
                <div style={{ color: '#888', fontSize: '.75em', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Company</div>
                {[['About', '/about'], ['Contact', '/contact'], ['Privacy Policy', '/privacy-policy'], ['Terms', '/terms']].map(([label, href]) => (
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
                BytesAgain is an independent skill directory. We index and link to third-party content (ClawHub, GitHub, LobeHub, Dify, etc.) for informational purposes only. All trademarks, skill names, and content are the property of their respective owners. BytesAgain does not claim ownership of any indexed content. Indexed content is available under its original license (MIT, Apache, CC, etc.).
              </div>
            </div>
          </div>
        </footer>
      <FeedbackButton />
      </body>
    </html>
  )
}
