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
        const skillSlugs = allSlugs.filter(s => !s.startsWith('usecase:') && !s.startsWith('request:'))
        const usecaseSlugs = allSlugs.filter(s => s.startsWith('usecase:'))
        const requestSlugs = allSlugs.filter(s => s.startsWith('request:'))

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

        // 处理 request 收藏
        if (requestSlugs.length > 0) {
          const ids = requestSlugs.map(s => parseInt(s.replace('request:', ''))).filter(n => !isNaN(n))
          if (ids.length > 0) {
            const { data: reqData } = await supabase
              .from('skill_requests')
              .select('id, title, request')
              .in('id', ids)
            if (reqData) results.push(...reqData.map((r: any) => ({ slug: `request:${r.id}`, name: r.title || r.request?.slice(0, 50), description: r.request?.slice(0, 100), _type: 'request' })))
          }
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

  const SkillRow = ({ s, onRemove }: { s: any; onRemove?: () => void }) => {
    const href = s._type === 'usecase' ? `/use-case/${s.slug}` : s._type === 'request' ? `/requests/${s.slug.replace('request:', '')}` : `/skill/${s.slug}`
    return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 0', borderBottom: '1px solid #1a1a2e' }}>
      <Link href={href} style={{ textDecoration: 'none', flex: 1 }}>
        <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.92em' }}>
          {s._type === 'usecase' && <span style={{ fontSize: '.75em', color: '#667eea', marginRight: 6 }}>USE CASE</span>}
          {s._type === 'request' && <span style={{ fontSize: '.75em', color: '#f59e0b', marginRight: 6 }}>REQUEST</span>}
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
  }

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

      {/* 我的需求 */}
      <MyRequestsSection user={user} lang={lang} />

      {/* 创作者登记状态 */}
      <CreatorSection user={user} lang={lang} />

      {/* API Token */}
      <ApiTokenSection user={user} lang={lang} />

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

function MyRequestsSection({ user, lang }: { user: User | null; lang: string }) {
  const [requests, setRequests] = useState<any[]>([])
  const [loaded, setLoaded] = useState(false)
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    if (!user) return
    supabase.from('skill_requests').select('id, title, request, view_count, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => {
      setRequests(data || []); setLoaded(true)
    })
  }, [user])

  const handleDelete = async (id: number) => {
    if (!confirm(lang === 'zh' ? '确定删除？' : 'Delete this request?')) return
    await fetch(`/api/requests?id=${id}`, { method: 'DELETE' })
    setRequests(prev => prev.filter(r => r.id !== id))
  }

  if (!loaded) return null

  return (
    <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28, marginBottom: 20 }}>
      <h2 style={{ margin: '0 0 16px', fontSize: '1.05em', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
        📋 {lang === 'zh' ? '我的需求' : 'My Requests'}
      </h2>
      {requests.length === 0 ? (
        <p style={{ color: '#444', fontSize: '.9em' }}>
          {lang === 'zh' ? '还没有发布需求。' : 'No requests posted yet.'}
          {' '}<Link href="/requests" style={{ color: '#667eea' }}>{lang === 'zh' ? '去需求墙 →' : 'Browse wall →'}</Link>
        </p>
      ) : (
        requests.map(r => (
          <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1a1a2e' }}>
            <Link href={`/requests/${r.id}`} style={{ textDecoration: 'none', flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.92em' }}>{r.title || r.request?.slice(0, 60)}</div>
              <div style={{ color: '#555', fontSize: '.75em', marginTop: 2 }}>👁 {r.view_count || 0} · {new Date(r.created_at).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })}</div>
            </Link>
            <button onClick={() => handleDelete(r.id)} style={{ background: 'none', border: '1px solid #3a1a1a', color: '#f87171', borderRadius: 6, padding: '4px 10px', fontSize: '.75em', cursor: 'pointer', flexShrink: 0, marginLeft: 12 }}>
              {lang === 'zh' ? '删除' : 'Del'}
            </button>
          </div>
        ))
      )}
    </div>
  )
}

function CreatorSection({ user, lang }: { user: User | null; lang: string }) {
  const [reg, setReg] = useState<any>(null)
  const [loaded, setLoaded] = useState(false)
  const zh = lang === 'zh'

  useEffect(() => {
    if (!user) return
    fetch('/api/creators/check').then(r => r.json()).then(d => {
      setReg(d?.data || null); setLoaded(true)
    }).catch(() => setLoaded(true))
  }, [user])

  if (!loaded) return null

  const statusLabel = (s: string) => {
    if (s === 'pending') return zh ? '审核中' : 'Pending'
    if (s === 'approved') return zh ? '已通过' : 'Approved'
    return s || '—'
  }

  return (
    <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28, marginBottom: 20 }}>
      <h2 style={{ margin: '0 0 16px', fontSize: '1.05em', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
        🎨 {zh ? '创作者登记' : 'Creator Registration'}
      </h2>
      {!reg ? (
        <p style={{ color: '#444', fontSize: '.9em' }}>
          {zh ? '还没有登记为创作者。' : 'Not registered as a creator.'}
          {' '}<Link href="/creators" style={{ color: '#667eea' }}>{zh ? '去登记 →' : 'Register →'}</Link>
        </p>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 12 }}>
            <span style={{ fontSize: '.85em', color: '#666' }}>{zh ? '状态' : 'Status'}: <strong style={{ color: reg.status === 'approved' ? '#34d399' : '#f59e0b' }}>{statusLabel(reg.status)}</strong></span>
            <span style={{ fontSize: '.85em', color: '#666' }}>GitHub: <strong style={{ color: '#ccc' }}>{reg.github}</strong></span>
          </div>
          {reg.skills && <p style={{ fontSize: '.82em', color: '#555' }}>{zh ? 'Skills' : 'Skills'}: {reg.skills}</p>}
          {reg.pricing && <p style={{ fontSize: '.82em', color: '#555', marginTop: 4 }}>{zh ? '定价' : 'Pricing'}: {reg.pricing}</p>}
        </div>
      )}
    </div>
  )
}

function ApiTokenSection({ user, lang }: { user: User | null; lang: string }) {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    if (!user) return
    supabase.from('profiles').select('api_key').eq('user_id', user.id).single().then(({ data }) => {
      setToken(data?.api_key || null); setLoaded(true)
    })
  }, [user])

  const generate = async () => {
    setLoading(true)
    const newToken = 'ba_' + crypto.randomUUID().replace(/-/g, '')
    await supabase.from('profiles').upsert({ user_id: user!.id, api_key: newToken }, { onConflict: 'user_id' })
    setToken(newToken)
    setLoading(false)
  }

  const handleCopy = () => {
    if (!token) return
    navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!loaded) return null
  const zh = lang === 'zh'

  return (
    <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28, marginBottom: 20 }}>
      <h2 style={{ margin: '0 0 16px', fontSize: '1.05em', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
        🔑 API Token
      </h2>
      {token ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <code style={{ flex: 1, padding: '10px 14px', borderRadius: 8, background: '#0a0a18', border: '1px solid #1a1a2e', color: '#34d399', fontSize: '.8em', wordBreak: 'break-all', userSelect: 'all' }}>{token}</code>
            <button onClick={handleCopy} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: copied ? '#34d399' : '#667eea', color: '#fff', fontWeight: 700, fontSize: '.8em', whiteSpace: 'nowrap' }}>{copied ? 'Copied!' : zh ? '复制' : 'Copy'}</button>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: '.75em', color: '#555', marginTop: 8 }}>
            <button onClick={generate} disabled={loading} style={{ background: 'none', border: '1px solid #333', borderRadius: 6, color: '#888', padding: '4px 10px', cursor: 'pointer', fontSize: '.8em' }}>{loading ? '...' : zh ? '重新生成' : 'Regen'}</button>
            <span>{zh ? '⚠️ 重新生成后旧 Token 立即失效' : '⚠️ Regenerating invalidates old key'}</span>
          </div>
        </>
      ) : (
        <div>
          <p style={{ color: '#444', fontSize: '.9em', marginBottom: 12 }}>{zh ? '生成 API Token 以程序化访问你的数据。' : 'Generate API Token for programmatic access.'}</p>
          <button onClick={generate} disabled={loading} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', background: '#667eea', color: '#fff', fontWeight: 700, fontSize: '.88em' }}>{loading ? '...' : zh ? '生成 Token' : 'Generate'}</button>
        </div>
      )}
    </div>
  )
}
