'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'
import { useLang } from '../../components/LangContext'

interface RequestData {
  id: number; title: string | null; request: string; platform: string | null; budget: string | null
  show_contact: boolean; contact: string | null; allow_contact: boolean
  image_url: string | null; view_count: number; nickname: string | null
  profile_name: string | null; user_id: string; created_at: string
}
interface Comment { id: number; comment: string; user_id: string; display_name: string; created_at: string }

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { lang } = useLang(); const zh = lang === 'zh'
  const t = (en: string, zhStr: string) => zh ? zhStr : en

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const [user, setUser] = useState<User | null>(null)
  const [data, setData] = useState<RequestData | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: d }) => setUser(d.user ?? null))
    loadData()
    loadComments()
  }, [id])

  const loadData = async () => {
    const r = await fetch(`/api/requests/${id}`)
    setData(r.ok ? await r.json() : null)
    setLoading(false)
  }

  const loadComments = async () => {
    const r = await fetch(`/api/requests/${id}/comments`)
    setComments(r.ok ? await r.json() : [])
  }

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    setPosting(true)
    await fetch(`/api/requests/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: comment.trim() }),
    })
    setComment('')
    setPosting(false)
    loadComments()
  }

  if (loading) return <div style={{ textAlign: 'center', padding: 80, color: '#555', background: '#050611', minHeight: '100vh' }}>{t('Loading…', '加载中…')}</div>
  if (!data) return <div style={{ textAlign: 'center', padding: 80, color: '#555', background: '#050611', minHeight: '100vh' }}>{t('Not found', '未找到')}</div>

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 8, boxSizing: 'border-box',
    background: '#0a0a18', border: '1px solid #2a2a4e', color: '#e0e0e0', fontSize: '.92em', outline: 'none',
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050611', color: '#e5e7eb', padding: '40px 20px 80px' }}>
      <style>{`@media (min-width: 768px) { .detail-layout { display: grid; grid-template-columns: 1fr 380px; gap: 32px; align-items: start; } }`}</style>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <a href="/requests" style={{ color: '#667eea', textDecoration: 'none', fontSize: '.85em', display: 'inline-block', marginBottom: 20 }}>
          ← {t('Back to Wall', '返回需求墙')}
        </a>

        <div className="detail-layout">
          <div>
            {/* Main card */}
            <div style={{ background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 18, padding: 28, marginBottom: 20 }}>
              {data.title && <h1 style={{ fontSize: '1.4em', fontWeight: 800, marginBottom: 12 }}>{data.title} <RequestDetailFav requestId={data.id} /></h1>}
              <div style={{ fontSize: '1em', color: '#cbd5e1', lineHeight: 1.8, marginBottom: 16, whiteSpace: 'pre-wrap' }}>
                {data.request}
              </div>
              {data.image_url && (
                <img src={data.image_url} alt="" style={{ width: '100%', borderRadius: 12, marginBottom: 16, border: '1px solid #1a1a3e' }} />
              )}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
                {data.platform && <Tag label={data.platform} color="#667eea" />}
                {data.budget && <Tag label={data.budget} color="#f59e0b" />}
                {data.allow_contact && <Tag label={t('Open to contact', '可联系')} color="#34d399" />}
              </div>
              {data.show_contact && data.contact && (
                <div style={{ fontSize: '.88em', color: '#667eea', marginBottom: 12 }}>
                  📬 {t('Contact:', '联系方式：')} {data.contact}
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.8em', color: '#555' }}>
                <span>👤 {data.profile_name || data.nickname || data.user_id?.slice(0, 8) || 'Anonymous'} · {new Date(data.created_at).toLocaleDateString(zh ? 'zh-CN' : 'en-US', { month: 'long', day: 'numeric' })}</span>
                <span>👁 {data.view_count || 0}</span>
              </div>
            </div>

            {/* Comments */}
            <div style={{ background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 18, padding: 28 }}>
              <h2 style={{ margin: '0 0 20px', fontSize: '1.05em', fontWeight: 700 }}>
                💬 {t('Comments', '留言')} ({comments.length})
              </h2>
              {comments.map(c => (
                <div key={c.id} style={{ padding: '12px 0', borderBottom: '1px solid #1a1a2e' }}>
                  <div style={{ fontSize: '.85em', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 4, whiteSpace: 'pre-wrap' }}>{c.comment}</div>
                  <div style={{ fontSize: '.75em', color: '#555' }}>
                    {c.display_name} · {new Date(c.created_at).toLocaleDateString(zh ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
              {comments.length === 0 && <p style={{ color: '#555', fontSize: '.88em' }}>{t('No comments yet.', '还没有留言。')}</p>}

              {user ? (
                <form onSubmit={postComment} style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                  <input type="text" value={comment} onChange={e => setComment(e.target.value)} required
                    placeholder={t('Write a comment…', '写留言…')} style={{ ...inputStyle, flex: 1, fontSize: '.88em' }} />
                  <button type="submit" disabled={posting} style={{
                    padding: '8px 20px', borderRadius: 8, border: 'none',
                    background: posting ? '#333' : '#667eea', color: '#fff',
                    fontWeight: 700, fontSize: '.85em', cursor: posting ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
                  }}>{posting ? '…' : t('Send', '发送')}</button>
                </form>
              ) : (
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                  <a href={`/login?redirect=/requests/${id}`} style={{ color: '#667eea', fontSize: '.88em' }}>
                    {t('Sign in to comment →', '登录后留言 →')}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 20 }}>
            <div style={{ background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 18, padding: 24 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '.95em', color: '#888' }}>{t('Stats', '统计')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Stat label={t('Views', '浏览')} value={String(data.view_count || 0)} />
                <Stat label={t('Comments', '留言')} value={String(comments.length)} />
                <Stat label={t('Posted', '发布')} value={new Date(data.created_at).toLocaleDateString(zh ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function Tag({ label, color }: { label: string; color: string }) {
  return <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: '.7em', fontWeight: 700, background: `${color}18`, color, border: `1px solid ${color}33` }}>{label}</span>
}
function Stat({ label, value }: { label: string; value: string }) {
  return <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#666' }}>{label}</span><span style={{ color: '#ccc', fontWeight: 600 }}>{value}</span></div>
}

function RequestDetailFav({ requestId }: { requestId: number }) {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { setLoading(false); return }
      supabase.from('skill_favorites').select('id').eq('user_id', data.user.id).eq('skill_slug', `request:${requestId}`).single().then(({ data: fav }) => {
        setSaved(!!fav); setLoading(false)
      })
    }).catch(() => setLoading(false))
  }, [requestId])
  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }
    if (saved) {
      await supabase.from('skill_favorites').delete().eq('user_id', user.id).eq('skill_slug', `request:${requestId}`)
      setSaved(false)
    } else {
      await supabase.from('skill_favorites').insert({ user_id: user.id, skill_slug: `request:${requestId}` })
      setSaved(true)
    }
  }
  if (loading) return null
  return <span onClick={toggle} style={{ cursor: 'pointer', fontSize: '.7em', marginLeft: 8, verticalAlign: 'middle' }}>{saved ? '❤️' : '🤍'}</span>
}
