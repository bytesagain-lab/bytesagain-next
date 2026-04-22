'use client'

type UC = { icon: string; title: string; href: string }

export default function UcScroll({ items }: { items: UC[] }) {
  return (
    <div style={{
      display: 'flex',
      gap: 12,
      overflowX: 'scroll',
      WebkitOverflowScrolling: 'touch' as any,
      paddingBottom: 8,
      scrollbarWidth: 'none' as any,
      msOverflowStyle: 'none' as any,
    }}>
      {items.map(uc => (
        <a key={uc.href} href={uc.href} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            background: '#0a0a1a',
            border: '1px solid #1a1a3e',
            borderRadius: 14,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            minWidth: 180,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ fontSize: '1.6em' }}>{uc.icon}</span>
            <span style={{ color: '#ccc', fontSize: '.88em', fontWeight: 600 }}>{uc.title}</span>
          </div>
        </a>
      ))}
    </div>
  )
}
