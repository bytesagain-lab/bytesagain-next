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
  const [activeTab, setActiveTab] = useState<'skills' | 'cases'>('skills')

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
    <div style={{ marginTop: 40 }}>
      {/* Tab 切换 */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid #1a1a2e' }}>
        {hasSkills && (
          <button
            onClick={() => setActiveTab('skills')}
            style={{
              padding: '10px 20px', background: 'none', border: 'none',
              borderBottom: activeTab === 'skills' ? '2px solid #667eea' : '2px solid transparent',
              color: activeTab === 'skills' ? '#667eea' : '#555',
              cursor: 'pointer', fontSize: '.9em', fontWeight: 600,
              marginBottom: -1, transition: 'all .15s',
            }}
          >
            🔧 Related Skills {skills.length > 0 && <span style={{ opacity: .6 }}>({skills.length})</span>}
          </button>
        )}
        {hasCases && (
          <button
            onClick={() => setActiveTab('cases')}
            style={{
              padding: '10px 20px', background: 'none', border: 'none',
              borderBottom: activeTab === 'cases' ? '2px solid #00d4ff' : '2px solid transparent',
              color: activeTab === 'cases' ? '#00d4ff' : '#555',
              cursor: 'pointer', fontSize: '.9em', fontWeight: 600,
              marginBottom: -1, transition: 'all .15s',
            }}
          >
            🎯 Use Cases {matchedCases.length > 0 && <span style={{ opacity: .6 }}>({matchedCases.length})</span>}
          </button>
        )}
      </div>

      {/* Skills 列表 */}
      {activeTab === 'skills' && hasSkills && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {skills.map(skill => (
            <a key={skill.slug} href={`/skill/${skill.slug}`}
              style={{ display: 'block', padding: '14px 16px', background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 10, textDecoration: 'none' }}>
              <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.95em', marginBottom: 4 }}>
                {skill.name}
                {(skill.downloads ?? 0) > 0 && <span style={{ color: '#555', fontWeight: 400, fontSize: '.8em', marginLeft: 8 }}>{skill.downloads!.toLocaleString()} dl</span>}
              </div>
              <div style={{ color: '#666', fontSize: '.82em', lineHeight: 1.4 }}>{skill.description?.slice(0, 90)}{skill.description?.length > 90 ? '…' : ''}</div>
            </a>
          ))}
        </div>
      )}

      {/* Use Cases 列表 */}
      {activeTab === 'cases' && hasCases && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {matchedCases.map(uc => (
              <Link key={uc.slug} href={`/use-case/${uc.slug}`}
                style={{
                  display: 'block', padding: '14px 16px',
                  background: '#0f0f23', border: '1px solid #1a1a2e',
                  borderRadius: 10, textDecoration: 'none',
                }}
              >
                <div style={{ fontSize: '1.3em', marginBottom: 6 }}>{uc.icon}</div>
                <div style={{ color: '#e0e0e0', fontWeight: 600, fontSize: '.9em', marginBottom: 4 }}>{uc.title}</div>
                <div style={{ color: '#666', fontSize: '.8em', lineHeight: 1.5 }}>{uc.description.slice(0, 70)}…</div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <Link href="/use-case" style={{ color: '#667eea', fontSize: '.85em', textDecoration: 'none' }}>
              Browse all use cases →
            </Link>
          </div>
        </div>
      )}

      {/* 只有一种内容时不显示 tab，自动展示另一种 */}
      {!hasSkills && hasCases && activeTab === 'skills' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {matchedCases.map(uc => (
              <Link key={uc.slug} href={`/use-case/${uc.slug}`}
                style={{ display: 'block', padding: '14px 16px', background: '#0f0f23', border: '1px solid #1a1a2e', borderRadius: 10, textDecoration: 'none' }}>
                <div style={{ fontSize: '1.3em', marginBottom: 6 }}>{uc.icon}</div>
                <div style={{ color: '#e0e0e0', fontWeight: 600, fontSize: '.9em', marginBottom: 4 }}>{uc.title}</div>
                <div style={{ color: '#666', fontSize: '.8em', lineHeight: 1.5 }}>{uc.description.slice(0, 70)}…</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
