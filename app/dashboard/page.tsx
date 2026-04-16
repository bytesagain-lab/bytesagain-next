'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'
import { useLang } from '../components/LangContext'
import Link from 'next/link'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DashboardPage() {
  const { lang } = useLang()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<any[]>([])
  const [recentViews, setRecentViews] = useState<any[]>([])

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { window.location.href = '/login'; return }
      setUser(data.user)
      setLoading(false) // 先渲染用户信息，不等收藏

      // 并行拉收藏 + 最近浏览
      const [favRes, viewRes] = await Promise.all([
        supabase.from('skill_favorites')
          .select('skill_slug, created_at')
          .eq('user_id', data.user.id)
          .order('created_at', { ascending: false })
          .limit(30),
        supabase.from('skill_views')
          .select('skill_slug, viewed_at')
          .eq('user_id', data.user.id)
          .order('viewed_at', { ascending: false })
          .limit(30)
      ])

      // 处理收藏：区分 skill 和 use-case
      if (favRes.data && favRes.data.length > 0) {
        const allSlugs: string[] = favRes.data.map((f: any) => f.skill_slug)
        const skillSlugs = allSlugs.filter(s => !s.startsWith('usecase:'))
        const usecaseSlugs = allSlugs.filter(s => s.startsWith('usecase:'))

        const results: any[] = []

        // 查 skill 收藏
        if (skillSlugs.length > 0) {
          const { data: skillData } = await supabase
            .from('skills')
            .select('slug, name, description, source, downloads')
            .in('slug', skillSlugs)
          if (skillData) results.push(...skillData.map((s: any) => ({ ...s, _type: 'skill' })))
        }

        // 处理 use-case 收藏（直接用 slug 构造显示数据，不查DB）
        for (const uc of usecaseSlugs) {
          const ucSlug = uc.replace('usecase:', '')
          const ucName = ucSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
          results.push({ slug: ucSlug, name: ucName, description: 'Use Case', _type: 'usecase' })
        }

        setFavorites(results)
      }

      // 处理最近浏览（只显示 skill，去重取前10）
      if (viewRes.data && viewRes.data.length > 0) {
        const seen = new Set<string>()
        const unique = viewRes.data.filter((v: any) => {
          if (seen.has(v.skill_slug)) return false
          seen.add(v.skill_slug); return true
        }).slice(0, 10)
        const { data: skillData } = await supabase
          .from('skills')
          .select('slug, name, description, source, downloads')
          .in('slug', unique.map((v: any) => v.skill_slug))
        setRecentViews(skillData || [])
      }
    })
  }, [])

  const removeFavorite = async (s: any) => {
    const favKey = s._type === 'usecase' ? `usecase:${s.slug}` : s.slug
    await supabase.from('skill_favorites').delete()
      .eq('user_id', user!.id).eq('skill_slug', favKey)
    setFavorites(prev => prev.filter(f => f.slug !== s.slug || f._type !== s._type))
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '80px 20px', color: '#555' }}>Loading…</div>

  const joinedAt = user?.created_at ? new Date(user.created_at).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''
  const provider = user?.app_metadata?.provider || 'email'

  const SkillRow = ({ s, onRemove }: { s: any; onRemove?: () => void }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0', borderBottom: '1px solid #1a1a2e' }}>
      <Link href={s._type === 'usecase' ? `/use-case/${s.slug}` : `/skill/${s.slug}`} style={{ textDecoration: 'none', flex: 1 }}>
        <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.92em' }}>
          {s._type === 'usecase' && <span style={{ fontSize: '.75em', color: '#667eea', marginRight: 6 }}>USE CASE</span>}
          {s.name || s.slug}
        </div>
        <div style={{ color: '#555', fontSize: '.78em', marginTop: 2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 400 }}>
          {s.description}
        </div>
      </Link>
      {onRemove && (
        <button onClick={onRemove} title="Remove" style={{
          background: 'none', border: 'none', color: '#444', cursor: 'pointer',
          fontSize: '1.1em', padding: '4px 8px', flexShrink: 0,
        }}>✕</button>
      )}
    </div>
  )

  return (
    <div style={{ maxWidth: 700, margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 800, marginBottom: 32 }}>
        {lang === 'zh' ? '我的账号' : 'My Account'}
      </h1>

      {/* 用户信息卡 */}
      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg,#667eea,#00d4ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4em', fontWeight: 800, color: '#fff', flexShrink: 0,
          }}>
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1em' }}>{user?.email}</div>
            <div style={{ color: '#555', fontSize: '.85em', marginTop: 4 }}>
              {lang === 'zh' ? `加入于 ${joinedAt} · 通过 ${provider === 'google' ? 'Google' : '邮件'}` : `Joined ${joinedAt} · via ${provider}`}
            </div>
          </div>
        </div>
      </div>

      {/* 收藏列表 */}
      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '1.05em', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
          {lang === 'zh' ? '❤️ 我的收藏' : '❤️ Saved'}
        </h2>
        {favorites.length === 0 ? (
          <p style={{ color: '#444', fontSize: '.9em' }}>
            {lang === 'zh' ? '还没有收藏。浏览 skill 时点 Save 加入收藏。' : 'Nothing saved yet. Hit Save on any skill or use case page.'}
            {' '}<Link href="/skills" style={{ color: '#667eea' }}>{lang === 'zh' ? '去探索 →' : 'Browse →'}</Link>
          </p>
        ) : (
          favorites.map(s => <SkillRow key={`${s._type}:${s.slug}`} s={s} onRemove={() => removeFavorite(s)} />)
        )}
      </div>

      {/* 最近浏览 */}
      {recentViews.length > 0 && (
        <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28, marginBottom: 20 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '1.05em', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
            {lang === 'zh' ? '🕐 最近浏览' : '🕐 Recently Viewed'}
          </h2>
          {recentViews.map(s => <SkillRow key={s.slug} s={s} />)}
        </div>
      )}

      {/* 账号信息 */}
      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: '1.05em', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
          {lang === 'zh' ? '账号信息' : 'Account Info'}
        </h2>
        {[
          { label: lang === 'zh' ? '邮箱' : 'Email', value: user?.email },
          { label: 'ID', value: user?.id?.slice(0, 8) + '…' },
          { label: lang === 'zh' ? '登录方式' : 'Login method', value: provider === 'google' ? '🔵 Google' : '✉️ Email' },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1a1a2e' }}>
            <span style={{ color: '#666', fontSize: '.9em' }}>{label}</span>
            <span style={{ color: '#ccc', fontSize: '.9em' }}>{value}</span>
          </div>
        ))}
      </div>

      <button onClick={handleSignOut} style={{
        width: '100%', padding: '12px 0', borderRadius: 10,
        border: '1px solid #333', background: 'none',
        color: '#888', fontSize: '.95em', cursor: 'pointer',
      }}>
        {lang === 'zh' ? '退出登录' : 'Sign Out'}
      </button>
    </div>
  )
}
