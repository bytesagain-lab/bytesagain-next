'use client'
import { useState } from 'react'
import { USE_CASES } from '@/lib/use-cases'

interface Skill {
  slug: string
  name: string
  reason: string
}

interface UseCase {
  slug: string
  title: string
  description: string
  icon: string
  skills: Skill[]
  searchLink?: string
}

interface SkillCardProps {
  skill: Skill
  index: number
  description?: string
}

function SkillCard({ skill, index, description }: SkillCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={`/skill/${skill.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', gap: 16, padding: '18px 20px',
        background: hovered ? '#13132e' : '#0f0f23',
        border: `1px solid ${hovered ? '#667eea' : '#1a1a3e'}`,
        borderRadius: 12, textDecoration: 'none', alignItems: 'flex-start',
        transition: 'all 0.15s ease', cursor: 'pointer',
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2,
        background: 'linear-gradient(135deg,#667eea,#00d4ff)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '.8em', fontWeight: 800, color: '#fff',
      }}>{index + 1}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, color: '#e0e0e0', marginBottom: 4 }}>{skill.name}</div>
        <div style={{ color: '#778', fontSize: '.88em', lineHeight: 1.5 }}>{skill.reason}</div>
        {hovered && description && (
          <div style={{
            marginTop: 10, padding: '10px 14px',
            background: '#0a0a1e', borderRadius: 8, border: '1px solid #2a2a4e',
            color: '#aaa', fontSize: '.83em', lineHeight: 1.6,
            animation: 'fadeIn 0.15s ease',
          }}>
            {description}
          </div>
        )}
      </div>
      <div style={{ marginLeft: 'auto', color: hovered ? '#667eea' : '#333', fontSize: '1.2em', flexShrink: 0, transition: 'color 0.15s' }}>→</div>
    </a>
  )
}

export default function UseCaseClient({ uc, slug }: { uc: UseCase; slug: string }) {
  const [showMore, setShowMore] = useState(false)
  const [extraSkills, setExtraSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(false)

  const searchQ = uc.searchLink?.replace('/skills?q=', '') || encodeURIComponent(uc.title)

  async function handleShowMore() {
    if (showMore) { setShowMore(false); return }
    if (extraSkills.length > 0) { setShowMore(true); return }

    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${searchQ}&limit=12`)
      const data = await res.json()
      const existingSlugs = new Set(uc.skills.map(s => s.slug))
      const extra = data
        .filter((s: any) => !existingSlugs.has(s.slug))
        .slice(0, 6)
        .map((s: any) => ({
          slug: s.slug,
          name: s.name,
          reason: (s.description || '').slice(0, 80),
        }))
      setExtraSkills(extra)
      setShowMore(true)
    } catch {
      setShowMore(true)
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-4px) } to { opacity:1; transform:none } }`}</style>

      {/* skill 列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {uc.skills.map((skill, i) => (
          <SkillCard key={skill.slug} skill={skill} index={i} description={skill.reason} />
        ))}
      </div>

      {/* 展开更多 */}
      {showMore && extraSkills.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {extraSkills.map((skill, i) => (
            <SkillCard key={skill.slug} skill={skill} index={uc.skills.length + i} description={skill.reason} />
          ))}
        </div>
      )}

      {/* 按钮 */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <button
          onClick={handleShowMore}
          disabled={loading}
          style={{
            padding: '12px 32px',
            background: 'linear-gradient(135deg,#667eea,#00d4ff)',
            borderRadius: 10, color: '#fff', fontWeight: 700,
            border: 'none', fontSize: '.95em', cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Loading...' : showMore ? 'Show less ↑' : `Show more ${uc.title} skills ↓`}
        </button>
      </div>
    </>
  )
}
