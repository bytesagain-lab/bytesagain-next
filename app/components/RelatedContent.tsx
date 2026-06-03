'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface RelatedSkill {
  slug: string
  name: string
  description: string
  downloads?: number
}

interface RelatedUseCase {
  use_case_slug: string
  use_case_title: string
  use_case_description: string
  use_case_icon: string
  relevance: number
}

interface Props {
  category: string
  currentSlug: string
  name?: string
  tags?: string[]
}

export default function RelatedContent({ category, currentSlug, name, tags = [] }: Props) {
  const [skills, setSkills] = useState<RelatedSkill[]>([])
  const [useCases, setUseCases] = useState<RelatedUseCase[]>([])

  useEffect(() => {
    if (!currentSlug) return
    const params = new URLSearchParams({ slug: currentSlug })
    if (name) params.set('name', name)
    if (category) params.set('category', category)
    fetch(`/api/related?${params.toString()}`)
      .then(r => r.json())
      .then(setSkills)
      .catch(() => {})

    // Fetch use cases from bridge table (Phase 2)
    fetch(`/api/related-usecases?slug=${encodeURIComponent(currentSlug)}&limit=6`)
      .then(r => r.json())
      .then(setUseCases)
      .catch(() => {})
  }, [category, currentSlug, name])

  const hasSkills = skills.length > 0
  const hasCases = useCases.length > 0

  if (!hasSkills && !hasCases) return null

  return (
    <div style={{ marginTop: 0 }}>
      {/* 🔧 Related Skills */}
      {hasSkills && (
        <div style={{ marginBottom: 28 }}>
          <h4 style={{ color: '#94a3b8', fontSize: '.82em', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            🔧 Related Skills <span style={{ color: '#4b5563', fontWeight: 400 }}>({skills.length})</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {skills.slice(0, 5).map(skill => (
              <a key={skill.slug} href={`/skill/${skill.slug}`}
                style={{ display: 'block', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: 10, textDecoration: 'none' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '.88em', marginBottom: 4 }}>
                  {skill.name}
                  {(skill.downloads ?? 0) > 0 && <span style={{ color: 'var(--text-muted3)', fontWeight: 400, fontSize: '.78em', marginLeft: 8 }}>{skill.downloads!.toLocaleString()} dl</span>}
                </div>
                <div style={{ color: 'var(--text-muted2)', fontSize: '.78em', lineHeight: 1.4 }}>{skill.description?.slice(0, 80)}{skill.description?.length > 80 ? '…' : ''}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 🎯 Use Cases — from bridge table */}
      {hasCases && (
        <div>
          <h4 style={{ color: '#94a3b8', fontSize: '.82em', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            🎯 Use Cases <span style={{ color: '#4b5563', fontWeight: 400 }}>({useCases.length})</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {useCases.map(uc => (
              <Link key={uc.use_case_slug} href={`/use-case/${uc.use_case_slug}`}
                style={{ display: 'block', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-secondary)', borderRadius: 10, textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: '1.1em' }}>{uc.use_case_icon || '🗺️'}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '.88em' }}>{uc.use_case_title}</span>
                </div>
                <div style={{ color: 'var(--text-muted2)', fontSize: '.78em', lineHeight: 1.5 }}>
                  {(uc.use_case_description || '').slice(0, 70)}{(uc.use_case_description || '').length > 70 ? '…' : ''}
                </div>
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
