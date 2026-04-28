'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { USE_CASES } from '@/lib/use-cases'

interface RelatedSkill {
  slug: string
  name: string
  description: string
  downloads?: number
}

interface Props {
  category: string
  currentSlug: string
  name?: string
  tags?: string[]
}

export default function RelatedContent({ category, currentSlug, name, tags = [] }: Props) {
  const [skills, setSkills] = useState<RelatedSkill[]>([])

  useEffect(() => {
    if (!currentSlug) return
    const params = new URLSearchParams({ slug: currentSlug })
    if (name) params.set('name', name)
    if (category) params.set('category', category)
    fetch(`/api/related?${params.toString()}`)
      .then(r => r.json())
      .then(setSkills)
      .catch(() => {})
  }, [category, currentSlug, name])

  // 匹配 use cases
  const matchedCases = USE_CASES.filter(uc => {
    const ucText = (uc.title + ' ' + uc.description).toLowerCase()
    return tags.some(tag => {
      const t = tag.toLowerCase().replace(/-/g, ' ')
      return ucText.includes(t)
    })
  }).slice(0, 6)

  const hasSkills = skills.length > 0
  const hasCases = matchedCases.length > 0

  if (!hasSkills && !hasCases) return null

  return (
    <div style={{ marginTop: 0 }}>
      {/* 🔧 Related Skills — 无tab切换，直接显示 */}
      {hasSkills && (
        <div style={{ marginBottom: 28 }}>
          <h4 style={{ color: '#94a3b8', fontSize: '.82em', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            🔧 Related Skills <span style={{ color: '#4b5563', fontWeight: 400 }}>({skills.length})</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {skills.slice(0, 5).map(skill => (
              <a key={skill.slug} href={`/skill/${skill.slug}`}
                style={{ display: 'block', padding: '12px 14px', background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 10, textDecoration: 'none' }}>
                <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.88em', marginBottom: 4 }}>
                  {skill.name}
                  {(skill.downloads ?? 0) > 0 && <span style={{ color: '#555', fontWeight: 400, fontSize: '.78em', marginLeft: 8 }}>{skill.downloads!.toLocaleString()} dl</span>}
                </div>
                <div style={{ color: '#666', fontSize: '.78em', lineHeight: 1.4 }}>{skill.description?.slice(0, 80)}{skill.description?.length > 80 ? '…' : ''}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 🎯 Use Cases — 无tab切换，直接显示 */}
      {hasCases && (
        <div>
          <h4 style={{ color: '#94a3b8', fontSize: '.82em', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            🎯 Use Cases <span style={{ color: '#4b5563', fontWeight: 400 }}>({matchedCases.length})</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {matchedCases.map(uc => (
              <Link key={uc.slug} href={`/use-case/${uc.slug}`}
                style={{ display: 'block', padding: '12px 14px', background: '#0f0f23', border: '1px solid #1a1a2e', borderRadius: 10, textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: '1.1em' }}>{uc.icon}</span>
                  <span style={{ color: '#e0e0e0', fontWeight: 600, fontSize: '.88em' }}>{uc.title}</span>
                </div>
                <div style={{ color: '#666', fontSize: '.78em', lineHeight: 1.5 }}>{uc.description.slice(0, 70)}…</div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            <Link href="/use-case" style={{ color: '#667eea', fontSize: '.82em', textDecoration: 'none' }}>
              Browse all use cases →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
