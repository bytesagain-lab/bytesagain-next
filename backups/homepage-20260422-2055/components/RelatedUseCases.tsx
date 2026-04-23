import Link from 'next/link'
import { USE_CASES } from '@/lib/use-cases'

interface Props {
  tags: string[]
  skillName: string
}

export default function RelatedUseCases({ tags, skillName }: Props) {
  if (!tags || tags.length === 0) return null

  // 匹配：use-case的skills里包含当前tags的任意一个
  // 或者use-case title/description里含有tags关键词
  const matched = USE_CASES.filter(uc => {
    const ucText = (uc.title + ' ' + uc.description).toLowerCase()
    return tags.some(tag => {
      const t = tag.toLowerCase().replace(/-/g, ' ')
      return ucText.includes(t)
    })
  }).slice(0, 4)

  if (matched.length === 0) return null

  return (
    <div style={{ margin: '32px 0' }}>
      <h3 style={{ color: '#e0e0e0', fontSize: '1.1em', marginBottom: 16, fontWeight: 600 }}>
        🎯 Use Cases for {skillName}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {matched.map(uc => (
          <Link key={uc.slug} href={`/use-case/${uc.slug}`}
            style={{
              display: 'block', padding: '14px 16px',
              background: '#0f0f23', border: '1px solid #1a1a2e',
              borderRadius: 10, textDecoration: 'none',
              transition: 'border-color .2s',
            }}
          >
            <div style={{ fontSize: '1.3em', marginBottom: 6 }}>{uc.icon}</div>
            <div style={{ color: '#e0e0e0', fontWeight: 600, fontSize: '.9em', marginBottom: 4 }}>{uc.title}</div>
            <div style={{ color: '#666', fontSize: '.8em', lineHeight: 1.5 }}>
              {uc.description.slice(0, 70)}…
            </div>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: 12, textAlign: 'right' }}>
        <Link href="/use-case" style={{ color: '#667eea', fontSize: '.85em', textDecoration: 'none' }}>
          Browse all use cases →
        </Link>
      </div>
    </div>
  )
}
