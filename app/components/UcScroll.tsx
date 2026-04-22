'use client'

type UC = { icon: string; title: string; href: string }

export default function UcScroll({ items }: { items: UC[] }) {
  return (
    <div style={{
      overflowX: 'scroll',
      WebkitOverflowScrolling: 'touch' as any,
      paddingBottom: 8,
      scrollbarWidth: 'none' as any,
      msOverflowStyle: 'none' as any,
      cursor: 'grab',
    }}>
      <div style={{
        display: 'flex',
        gap: 12,
        width: 'max-content',  /* 关键：不压缩，让内容自然撑开 */
      }}>
        {items.map(uc => (
          <a key={uc.href} href={uc.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#0a0a1a',
              border: '1px solid #1a1a3e',
              borderRadius: 14,
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: 180,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'border-color .15s',
            }}>
              <span style={{ fontSize: '1.6em' }}>{uc.icon}</span>
              <span style={{ color: '#ccc', fontSize: '.88em', fontWeight: 600 }}>{uc.title}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
