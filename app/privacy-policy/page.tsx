import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Privacy Policy | BytesAgain',
  alternates: { canonical: 'https://bytesagain.com/privacy-policy' },
}
export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 750, margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: '#555', marginBottom: 32 }}>Last updated: March 30, 2026</p>
      {[
        { title: 'Information We Collect', body: 'We collect your email address when you register, and usage data such as pages visited and skills downloaded. We do not sell your personal data.' },
        { title: 'How We Use Your Data', body: 'We use your data to provide the BytesAgain service, send product updates (only if you opt in), and improve our skill recommendations.' },
        { title: 'Third-Party Services', body: 'We use Supabase for authentication and data storage, Vercel for hosting, and Google Analytics (GA4) for anonymous traffic analytics.' },
        { title: 'Cookies', body: 'We use session cookies for authentication. No advertising cookies are used.' },
        { title: 'Your Rights', body: 'You may request deletion of your account and data at any time by emailing hello@bytesagain.com.' },
        { title: 'Contact', body: 'Questions? Email us at hello@bytesagain.com.' },
      ].map(({ title, body }) => (
        <div key={title} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: '1.1em', marginBottom: 8 }}>{title}</h2>
          <p style={{ color: '#888', lineHeight: 1.8 }}>{body}</p>
        </div>
      ))}
    </div>
  )
}
