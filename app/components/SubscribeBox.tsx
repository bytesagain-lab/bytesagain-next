'use client'

export default function SubscribeBox() {
  return (
    <div style={{
      borderTop: '1px solid #1a1a2e',
      padding: '28px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <div>
        <span style={{ fontWeight: 600, fontSize: '.95em' }}>Get the best AI skills weekly</span>
        <span style={{ color: '#555', fontSize: '.85em', marginLeft: 10 }}>Free. No spam.</span>
      </div>
      <a
        href="/register"
        style={{
          padding: '8px 22px',
          background: 'linear-gradient(135deg,#667eea,#00d4ff)',
          border: 'none',
          borderRadius: 8,
          color: '#fff',
          fontWeight: 700,
          fontSize: '.9em',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Create Free Account →
      </a>
    </div>
  )
}

