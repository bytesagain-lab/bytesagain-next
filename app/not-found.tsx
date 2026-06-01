import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found | BytesAgain',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050611', color: '#e5e7eb' }}>
      <style>{`
        .nf-box { text-align: center; padding: 60px 32px; }
        .nf-code { font-size: 6rem; font-weight: 900; color: #22d3ee; line-height: 1; margin: 0; }
        .nf-title { font-size: 1.8rem; font-weight: 800; margin: 12px 0 8px; }
        .nf-desc { color: #64748b; font-size: 1rem; margin-bottom: 32px; max-width: 440px; }
        .nf-link { display: inline-block; padding: 12px 28px; background: linear-gradient(135deg,#34d399,#22d3ee); color: #000; font-weight: 900; border-radius: 12px; text-decoration: none; }
      `}</style>
      <div className="nf-box">
        <p className="nf-code">404</p>
        <h1 className="nf-title">Page Not Found</h1>
        <p className="nf-desc">The skill or page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link className="nf-link" href="/">Back to BytesAgain</Link>
      </div>
    </main>
  )
}
