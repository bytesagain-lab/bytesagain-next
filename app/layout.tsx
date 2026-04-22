import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import NavBar from './components/NavBar'
import FeedbackButton from './components/FeedbackButton'
import { LangProvider } from './components/LangContext'
import FooterClient from './components/FooterClient'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'BytesAgain — AI Agent Skills', template: '%s | BytesAgain' },
  description: 'Discover the best AI agent skills from ClawHub, GitHub, LobeHub, MCP and more.',
  metadataBase: new URL('https://bytesagain.com'),
  alternates: {
    canonical: 'https://bytesagain.com',
    types: { 'text/plain': 'https://bytesagain.com/llms.txt' },
  },
  verification: {
    other: { 'baidu-site-verification': 'codeva-0evUqX1TFs' },
  },
  openGraph: {
    siteName: 'BytesAgain',
    type: 'website',
    url: 'https://bytesagain.com',
    title: 'BytesAgain — Find Your AI Skill Stack',
    description: 'Curated AI agent skills for developers, creators, traders and more.',
    images: [{ url: 'https://bytesagain.com/og-image-v2.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bytesagain',
    title: 'BytesAgain — Find Your AI Skill Stack',
    description: 'Personalized AI skill recommendations.',
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3C1MM9FWYF" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3C1MM9FWYF');
        `}} />
      </head>
      <body className={geist.className} style={{ background: '#0a0a1a', color: '#e0e0e0', margin: 0 }}>
        <LangProvider>
          <NavBar />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BytesAgain",
            "url": "https://bytesagain.com",
            "logo": { "@type": "ImageObject", "url": "https://bytesagain.com/og-image.png" },
            "description": "Search 60,000+ AI agent skills via MCP API or REST. Supports 7 languages. Free, no auth required.",
            "foundingDate": "2026",
            "sameAs": ["https://x.com/bytesagain", "https://github.com/bytesagain/ai-skills"],
            "contactPoint": { "@type": "ContactPoint", "email": "hello@bytesagain.com", "contactType": "customer support" }
          }) }} />
          <main>{children}</main>
          <FooterClient />
          <FeedbackButton />
        </LangProvider>
      </body>
    </html>
  )
}
