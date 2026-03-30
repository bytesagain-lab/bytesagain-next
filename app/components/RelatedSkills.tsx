'use client'

import { useEffect, useState } from 'react'

interface RelatedSkill {
  slug: string
  name: string
  description: string
  downloads?: number
}

export default function RelatedSkills({ category, currentSlug }: { category: string; currentSlug: string }) {
  const [skills, setSkills] = useState<RelatedSkill[]>([])

  useEffect(() => {
    if (!category) return
    fetch(`/api/related?category=${encodeURIComponent(category)}&slug=${currentSlug}`)
      .then(r => r.json())
      .then(setSkills)
      .catch(() => {})
  }, [category, currentSlug])

  if (skills.length === 0) return null

  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ fontSize: '1.1em', color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
        Related Skills
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {skills.map(skill => (
          <a key={skill.slug} href={`/skill/${skill.slug}`}
            style={{ display: 'block', padding: '14px 16px', background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 10, textDecoration: 'none' }}>
            <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.95em', marginBottom: 4 }}>
              {skill.name}
              {skill.downloads > 0 && <span style={{ color: '#555', fontWeight: 400, fontSize: '.8em', marginLeft: 8 }}>{skill.downloads.toLocaleString()} dl</span>}
            </div>
            <div style={{ color: '#666', fontSize: '.82em', lineHeight: 1.4 }}>{skill.description?.slice(0, 90)}{skill.description?.length > 90 ? '…' : ''}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
