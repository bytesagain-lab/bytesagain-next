import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Terms of Service | BytesAgain',
  alternates: { canonical: 'https://bytesagain.com/terms' },
}
export default function TermsPage() {
  return (
    <div style={{ maxWidth: 750, margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 800, marginBottom: 8 }}>Terms of Service</h1>
      <p style={{ color: '#555', marginBottom: 32 }}>Last updated: March 30, 2026</p>
      {[
        { title: 'Acceptance', body: 'By using BytesAgain, you agree to these terms. If you do not agree, please do not use the service.' },
        { title: 'Use of Service', body: 'BytesAgain provides a directory of AI agent skills for informational and personal use. You may not use the service for unlawful purposes or to redistribute our data at scale without permission.' },
        { title: 'Accounts', body: 'You are responsible for keeping your account credentials secure. We may suspend accounts that violate these terms.' },
        { title: 'Content', body: 'Skill content is provided as-is. BytesAgain does not guarantee accuracy or fitness for any particular purpose. Use skills at your own discretion.' },
        { title: 'Limitation of Liability', body: 'BytesAgain is not liable for any damages arising from use of this service or third-party skills listed on the platform.' },
        { title: 'Changes', body: 'We may update these terms at any time. Continued use of the service after changes constitutes acceptance.' },
        { title: 'Contact', body: 'Questions? Email hello@bytesagain.com.' },
      ].map(({ title, body }) => (
        <div key={title} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: '1.1em', marginBottom: 8 }}>{title}</h2>
          <p style={{ color: '#888', lineHeight: 1.8 }}>{body}</p>
        </div>
      ))}
    </div>
  )
}
