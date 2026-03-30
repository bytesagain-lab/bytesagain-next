import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact | BytesAgain',
  alternates: { canonical: 'https://bytesagain.com/contact' },
}
export default function ContactPage() {
  return (
    <div style={{ maxWidth: 600, margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 800, marginBottom: 12 }}>Contact Us</h1>
      <p style={{ color: '#888', marginBottom: 40, lineHeight: 1.8 }}>Have a question, suggestion, or partnership inquiry? We'd love to hear from you.</p>
      {[
        { icon: '✉️', label: 'General', email: 'hello@bytesagain.com' },
        { icon: '🛠️', label: 'Support', email: 'support@bytesagain.com' },
        { icon: '📰', label: 'Press', email: 'press@bytesagain.com' },
      ].map(({ icon, label, email }) => (
        <div key={label} style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 14, padding: '20px 24px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left' }}>
          <span style={{ fontSize: '1.5em' }}>{icon}</span>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>{label}</div>
            <a href={`mailto:${email}`} style={{ color: '#667eea', textDecoration: 'none', fontSize: '.95em' }}>{email}</a>
          </div>
        </div>
      ))}
    </div>
  )
}
