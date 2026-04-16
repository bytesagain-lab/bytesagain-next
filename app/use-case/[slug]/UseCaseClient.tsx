'use client'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { USE_CASES } from '@/lib/use-cases'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function UseCaseSaveButton({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  // 用 skill_favorites 表，slug 加 usecase: 前缀区分
  const favKey = `usecase:${slug}`

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { setLoading(false); return }
        setUserId(user.id)
        const { data } = await supabase.from('skill_favorites')
          .select('id').eq('user_id', user.id).eq('skill_slug', favKey).single()
        setSaved(!!data)
      } catch {
        // 静默失败，不影响页面
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [slug])

  const toggle = async () => {
    if (!userId) { window.location.href = '/login'; return }
    if (saved) {
      await supabase.from('skill_favorites').delete().eq('user_id', userId).eq('skill_slug', favKey)
      setSaved(false)
    } else {
      await supabase.from('skill_favorites').insert({ user_id: userId, skill_slug: favKey })
      setSaved(true)
    }
  }

  return (
    <button onClick={toggle} title={saved ? 'Remove from saved' : 'Save this use case'} style={{
      padding: '8px 16px', borderRadius: 8,
      border: saved ? '1px solid #f87171' : '1px solid #1a1a3e',
      background: saved ? '#f8717122' : '#0f0f23',
      color: saved ? '#f87171' : '#888',
      cursor: 'pointer', fontSize: '.9em', fontWeight: 600,
      display: 'flex', alignItems: 'center', gap: 6,
      transition: 'all .2s', opacity: loading ? 0.5 : 1,
    }}>
      {saved ? '❤️ Saved' : '🤍 Save'}
    </button>
  )
}

interface Skill {
  slug: string
  name: string
  reason: string
  description?: string
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
}

function SkillCard({ skill, index }: SkillCardProps) {
  const [hovered, setHovered] = useState(false)
  const [desc, setDesc] = useState<string | null>(skill.description || null)
  const [loaded, setLoaded] = useState(!!skill.description)

  async function handleHover() {
    setHovered(true)
    if (!loaded) {
      // 懒加载：首次 hover 时从 DB 拉取真实描述
      try {
        const res = await fetch(`/api/skill-desc?slug=${encodeURIComponent(skill.slug)}`)
        if (res.ok) {
          const data = await res.json()
          setDesc(data.description || null)
        }
      } catch { /* ignore */ }
      setLoaded(true)
    }
  }

  return (
    <a
      href={`/skill/${skill.slug}`}
      onMouseEnter={handleHover}
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
        {hovered && desc && desc !== skill.reason && (
          <div style={{
            marginTop: 10, padding: '10px 14px',
            background: '#0a0a1e', borderRadius: 8, border: '1px solid #2a2a4e',
            color: '#aaa', fontSize: '.83em', lineHeight: 1.6,
            animation: 'fadeIn 0.15s ease',
          }}>
            {desc}
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

  const searchQ = uc.searchLink?.replace('/skills?q=', '') 
    || encodeURIComponent(uc.description?.slice(0, 60) || uc.title)

  async function handleShowMore() {
    if (showMore) { setShowMore(false); return }
    if (extraSkills.length > 0) { setShowMore(true); return }

    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${searchQ}&limit=20`)
      const data = await res.json()
      const existingSlugs = new Set(uc.skills.map(s => s.slug))
      // 用 use case title 的关键词过滤，排除太泛的词，只保留有实际含义的
      const STOP_WORDS = new Set(['agent', 'tool', 'skill', 'helper', 'assistant', 'builder', 'maker', 'manager', 'generator', 'with', 'your', 'using', 'automation', 'auto', 'from', 'into', 'that', 'this', 'have', 'will'])
      const titleWords = uc.title.toLowerCase().split(/\s+/)
        .filter(w => w.length > 4 && !STOP_WORDS.has(w))
      const extra = data
        .filter((s: any) => !existingSlugs.has(s.slug))
        .filter((s: any) => {
          if (titleWords.length === 0) return false // 全是泛词时不展示
          const text = ((s.name || '') + ' ' + (s.description || '')).toLowerCase()
          return titleWords.some(w => text.includes(w))
        })
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

      {/* 收藏按钮 */}
      <div style={{ marginBottom: 24 }}>
        <UseCaseSaveButton slug={slug} />
      </div>

      {/* skill 列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {uc.skills.map((skill, i) => (
          <SkillCard key={skill.slug} skill={skill} index={i} />
        ))}
      </div>

      {/* 展开更多 */}
      {showMore && extraSkills.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {extraSkills.map((skill, i) => (
            <SkillCard key={skill.slug} skill={skill} index={uc.skills.length + i} />
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
