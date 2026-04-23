'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const SOURCE_BADGE: Record<string, { emoji: string; color: string }> = {
  clawhub:  { emoji: '🦀', color: '#667eea' },
  github:   { emoji: '⭐', color: '#444' },
  lobehub:  { emoji: '🤖', color: '#7c3aed' },
  dify:     { emoji: '🔧', color: '#f59e0b' },
  mcp:      { emoji: '🔌', color: '#00c853' },
}

export default function ForYouSection() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      setIsLoggedIn(true)

      try {
        const res = await fetch(`/api/for-you?user_id=${user.id}`)
        const data = await res.json()
        setSkills(data || [])
      } catch { /* ignore */ }
      setLoading(false)
    }
    init()
  }, [])

  // 未登录或无推荐 → 不显示
  if (!isLoggedIn || loading || skills.length === 0) return null

  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: '1.1em', fontWeight: 700, color: '#e0e0e0' }}>✨ For You</span>
        <span style={{ fontSize: '.8em', color: '#555' }}>based on your history</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
        {skills.map((s: any) => {
          const badge = SOURCE_BADGE[s.source] || SOURCE_BADGE.clawhub
          return (
            <Link key={s.slug} href={`/skill/${s.slug}`} style={{ textDecoration: 'none' }}>
              <div className="skill-card" style={{
                background: 'linear-gradient(135deg, #0f0f23, #1a1a3e)',
                border: '1px solid #667eea44',
                borderRadius: 12, padding: '16px',
                transition: 'border-color .2s', cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '.72em', background: badge.color, color: '#fff',
                    borderRadius: 20, padding: '2px 8px', fontWeight: 600 }}>
                    {badge.emoji}
                  </span>
                  {(s.score || 0) > 0 && (
                    <span style={{ fontSize: '.72em', color: '#667eea' }}>
                      {Math.round(s.similarity * 100)}% match
                    </span>
                  )}
                </div>
                <div style={{ fontWeight: 700, color: '#e0e0e0', fontSize: '.9em',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 4 }}>
                  {s.name || s.slug}
                </div>
                <div style={{ fontSize: '.78em', color: '#555', overflow: 'hidden',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {s.description}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
