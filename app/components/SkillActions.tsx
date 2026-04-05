'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
export default function SkillActions({ slug }: { slug: string }) {
  const [favorited, setFavorited] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      setUserId(user.id)

      // 记录浏览（去重：同一用户同一 skill 1小时内只记一次）
      const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
      const { data: recent } = await supabase
        .from('skill_views')
        .select('id')
        .eq('user_id', user.id)
        .eq('skill_slug', slug)
        .gte('viewed_at', oneHourAgo)
        .limit(1)

      if (!recent || recent.length === 0) {
        await supabase.from('skill_views').insert({ user_id: user.id, skill_slug: slug })
      }

      // 查收藏状态
      const { data: fav } = await supabase
        .from('skill_favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('skill_slug', slug)
        .single()

      setFavorited(!!fav)
      setLoading(false)
    }
    init()
  }, [slug])

  const toggleFavorite = async () => {
    if (!userId) {
      window.location.href = '/login'
      return
    }
    if (favorited) {
      await supabase.from('skill_favorites').delete()
        .eq('user_id', userId).eq('skill_slug', slug)
      setFavorited(false)
    } else {
      await supabase.from('skill_favorites').insert({ user_id: userId, skill_slug: slug })
      setFavorited(true)
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      title={favorited ? 'Remove from favorites' : 'Save to favorites'}
      style={{
        padding: '8px 16px',
        borderRadius: 8,
        border: favorited ? '1px solid #f87171' : '1px solid #1a1a3e',
        background: favorited ? '#f8717122' : '#0f0f23',
        color: favorited ? '#f87171' : '#888',
        cursor: 'pointer',
        fontSize: '.9em',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        transition: 'all .2s',
        opacity: loading ? 0.5 : 1,
      }}
    >
      {favorited ? '❤️ Saved' : '🤍 Save'}
    </button>
  )
}
