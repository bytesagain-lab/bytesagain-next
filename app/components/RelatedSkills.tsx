'use client'

import { useEffect, useState } from 'react'

interface RelatedSkill {
  slug: string
  name: string
  description: string
  downloads?: number
}

export default function RelatedSkills({ category, currentSlug, name }: { category: string; currentSlug: string; name?: string }) {
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

  if (skills.length === 0) return null

  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ fontSize: '1.1em', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
        Related Skills
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {skills.map(skill => (
          <a key={skill.slug} href={`/skill/${skill.slug}`}
            style={{ display: 'block', padding: '14px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: 10, textDecoration: 'none' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '.95em', marginBottom: 4 }}>
              {skill.name}
              {(skill.downloads ?? 0) > 0 && <span style={{ color: 'var(--text-muted3)', fontWeight: 400, fontSize: '.8em', marginLeft: 8 }}>{skill.downloads!.toLocaleString()} dl</span>}
            </div>
            <div style={{ color: 'var(--text-muted2)', fontSize: '.82em', lineHeight: 1.4 }}>{skill.description?.slice(0, 90)}{skill.description?.length > 90 ? '…' : ''}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
