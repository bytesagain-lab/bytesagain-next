'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'
import { useLang } from '../components/LangContext'

interface Request {
  id: number
  title: string | null
  request: string
  platform: string | null
  budget: string | null
  allow_contact: boolean
  show_contact: boolean
  image_url: string | null
  view_count: number
  nickname: string | null
  user_id: string
  created_at: string
  contact?: string | null
}

const PLATFORMS = ['OpenClaw', 'Claude Desktop', 'Cursor', 'Codex CLI', 'Copilot', 'Gemini CLI', 'Other']

export default function RequestsPage() {
  const { lang } = useLang()
  const router = useRouter()
  const zh = lang === 'zh'
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [requests, setRequests] = useState<Request[]>([])
  const [myRequests, setMyRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: '', request: '', platform: '', budget: '', contact: '', allow_contact: false, show_contact: false, image_url: '', nickname: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'wall' | 'mine'>('wall')

  const t = (en: string, zhStr: string) => zh ? zhStr : en

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      setAuthLoading(false)
      if (data.user) loadMyRequests()
    })
    loadRequests()
  }, [])

  const loadRequests = () => {
    fetch('/api/requests').then(r => r.json()).then(d => { setRequests(d || []); setLoading(false) }).catch(() => setLoading(false))
  }

  const loadMyRequests = async () => {
    const { data: { user: u } } = await supabase.auth.getUser()
    if (!u) return
    const sb2 = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { data } = await sb2.from('skill_requests').select('*').eq('user_id', u.id).order('created_at', { ascending: false })
    setMyRequests((data || []) as Request[])
  }

  const openNew = () => {
    setEditId(null)
    setForm({ title: '', request: '', platform: '', budget: '', contact: '', allow_contact: false, show_contact: false, image_url: '', nickname: '' })
    setError('')
    setShowForm(true)
  }

  const openEdit = (r: Request) => {
    setEditId(r.id)
    setForm({ title: r.title || '', request: r.request, platform: r.platform || '', budget: r.budget || '', contact: r.contact || '', allow_contact: r.allow_contact, show_contact: r.show_contact, image_url: r.image_url || '', nickname: r.nickname || '' })
    setError('')
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm(zh ? '确定删除？' : 'Delete this request?')) return
    await fetch(`/api/requests?id=${id}`, { method: 'DELETE' })
    loadRequests(); loadMyRequests()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.request.trim().length < 10) return setError(t('Min 10 chars', '最少 10 个字'))
    setSubmitting(true); setError('')
    try {
      const url = '/api/requests'
      const method = editId ? 'PATCH' : 'POST'
      const body = editId ? { id: editId, ...form } : form
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed')
      setShowForm(false)
      loadRequests(); loadMyRequests()
    } catch (err: any) {
      setError(err.message)
    } finally { setSubmitting(false) }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: 8, boxSizing: 'border-box',
    background: '#0a0a18', border: '1px solid #2a2a4e', color: '#e0e0e0',
    fontSize: '.92em', outline: 'none',
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050611', color: '#e5e7eb', padding: '60px 20px 80px' }}>
      <style>{`
        .req-input:focus, .req-textarea:focus, .req-select:focus { border-color: #667eea; }
        .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        @media (max-width: 640px) { .card-grid { grid-template-columns: 1fr; } }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.7); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal-box { background: #0d0d20; border: 1px solid #1a1a3e; border-radius: 18px; padding: 32px; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: '2em', fontWeight: 800, marginBottom: 8 }}>📋 {t('Skill Request Wall', 'Skill 需求墙')}</h1>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
              {t('What AI skill do people need? Browse requests from the community.', '大家都在找什么 AI Skill？浏览社区需求。')}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {user && (
              <button onClick={openNew} style={{
                padding: '10px 22px', borderRadius: 10, border: 'none',
                background: 'linear-gradient(135deg,#667eea,#00d4ff)', color: '#fff',
                fontWeight: 700, fontSize: '.9em', cursor: 'pointer',
              }}>
                + {t('Post Request', '发布需求')}
              </button>
            )}
            {!authLoading && !user && (
              <a href="/login" style={{ color: '#667eea', fontSize: '.9em', textDecoration: 'none' }}>
                {t('Sign in to post →', '登录后发布 →')}
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          <button onClick={() => setTab('wall')} style={{
            padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontWeight: 600, fontSize: '.88em',
            background: tab === 'wall' ? '#667eea' : '#0d0d20', color: tab === 'wall' ? '#fff' : '#888',
          }}>📋 {t('All Requests', '所有需求')}</button>
          {user && (
            <button onClick={() => setTab('mine')} style={{
              padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '.88em',
              background: tab === 'mine' ? '#667eea' : '#0d0d20', color: tab === 'mine' ? '#fff' : '#888',
            }}>👤 {t('My Requests', '我的需求')} ({myRequests.length})</button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#555' }}>{t('Loading…', '加载中…')}</div>
        ) : tab === 'wall' ? (
          requests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 18 }}>
              <div style={{ fontSize: '2.5em', marginBottom: 12 }}>📭</div>
              <p style={{ color: '#555' }}>{t('No requests yet.', '还没有需求。')}</p>
            </div>
          ) : (
            <div className="card-grid">
              {requests.map(r => (
                <div key={r.id} onClick={() => router.push(`/requests/${r.id}`)} style={{
                  background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 14, padding: 20,
                  display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  transition: 'border-color .15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#667eea44')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a3e')}
                >
                  {r.title && (
                    <div style={{ fontWeight: 700, fontSize: '1em', color: '#e0e0e0', marginBottom: 8 }}>
                      {r.title}
                    </div>
                  )}
                  <div style={{ fontSize: '.9em', color: '#cbd5e1', lineHeight: 1.7, flex: 1, marginBottom: 12 }}>
                    {r.request}
                  </div>
                  {r.image_url && <img src={r.image_url} alt="" style={{ width: '100%', borderRadius: 8, marginBottom: 10, maxHeight: 160, objectFit: 'cover', border: '1px solid #1a1a3e' }} />}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                    {r.platform && <Tag label={r.platform} color="#667eea" />}
                    {r.budget && <Tag label={r.budget} color="#f59e0b" />}
                    {r.allow_contact && <Tag label={t('Open to contact', '可联系')} color="#34d399" />}
                  </div>
                  <div style={{ fontSize: '.75em', color: '#444', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{r.nickname || t('Anonymous', '匿名')} · {new Date(r.created_at).toLocaleDateString(zh ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>👁 {r.view_count || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* My Requests */
          myRequests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 18 }}>
              <div style={{ fontSize: '2.5em', marginBottom: 12 }}>📭</div>
              <p style={{ color: '#555', marginBottom: 16 }}>{t('You have not posted any requests.', '你还没有发布需求。')}</p>
              <button onClick={openNew} style={{
                padding: '10px 22px', borderRadius: 8, border: 'none',
                background: 'linear-gradient(135deg,#667eea,#00d4ff)', color: '#fff',
                fontWeight: 700, cursor: 'pointer',
              }}>+ {t('Post Request', '发布需求')}</button>
            </div>
          ) : (
            <div className="card-grid">
              {myRequests.map(r => (
                <div key={r.id} onClick={() => router.push(`/requests/${r.id}`)} style={{
                  background: '#0d0d20', border: '1px solid #1a1a3e', borderRadius: 14, padding: 20,
                  display: 'flex', flexDirection: 'column', cursor: 'pointer',
                  transition: 'border-color .15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#667eea44')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a3e')}
                >
                  {r.title && (
                    <div style={{ fontWeight: 700, fontSize: '1em', color: '#e0e0e0', marginBottom: 8 }}>{r.title}</div>
                  )}
                  <div style={{ fontSize: '.9em', color: '#cbd5e1', lineHeight: 1.7, flex: 1, marginBottom: 12 }}>{r.request}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                    {r.platform && <Tag label={r.platform} color="#667eea" />}
                    {r.budget && <Tag label={r.budget} color="#f59e0b" />}
                    {r.allow_contact && <Tag label={t('Open to contact', '可联系')} color="#34d399" />}
                    {r.contact && <span style={{ fontSize: '.75em', color: '#667eea' }}>📬 {r.contact}</span>}
                    <span style={{ fontSize: '.75em', color: '#555' }}>👁 {r.view_count || 0}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '.75em', color: '#444' }}>
                      {new Date(r.created_at).toLocaleDateString(zh ? 'zh-CN' : 'en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => openEdit(r)} style={{
                        background: 'none', border: '1px solid #333', color: '#888', borderRadius: 6,
                        padding: '4px 10px', fontSize: '.78em', cursor: 'pointer',
                      }}>{t('Edit', '编辑')}</button>
                      <button onClick={() => handleDelete(r.id)} style={{
                        background: 'none', border: '1px solid #3a1a1a', color: '#f87171', borderRadius: 6,
                        padding: '4px 10px', fontSize: '.78em', cursor: 'pointer',
                      }}>{t('Delete', '删除')}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 20px', fontSize: '1.1em', fontWeight: 700 }}>
              {editId ? t('Edit Request', '编辑需求') : t('Post a Request', '发布需求')}
            </h2>
            <form onSubmit={handleSubmit}>
              <F label={t('Title', '标题')}>
                <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder={t('One-line summary', '一句话概括')} className="req-input" style={inputStyle} />
              </F>
              <F label={`${t('Description', '描述')} *`}>
                <textarea value={form.request} onChange={e => setForm(p => ({ ...p, request: e.target.value }))} required
                  placeholder={t('What features? What problem?', '需要什么功能？解决什么问题？')}
                  className="req-textarea" style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} />
              </F>
              <F label={t('Platform', '平台')}>
                <select value={form.platform} onChange={e => setForm(p => ({ ...p, platform: e.target.value }))}
                  className="req-select" style={inputStyle}>
                  <option value="">{t('Any', '不限')}</option>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </F>
              <F label={t('Budget', '预算')}>
                <input type="text" value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                  placeholder={t('e.g. $50, negotiable', '如：$50, 议价')} className="req-input" style={inputStyle} />
              </F>
              <F label={t('Contact', '联系方式')}>
                <input type="text" value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                  placeholder={t('TG / Email (private)', 'TG / 邮箱（不公开）')} className="req-input" style={inputStyle} />
              </F>
              <F label={t('Image URL', '图片链接')}>
                <input type="text" value={form.image_url} onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))}
                  placeholder={t('Paste image URL (optional)', '粘贴图片链接（选填）')} className="req-input" style={inputStyle} />
                {form.image_url && (
                  <img src={form.image_url} alt="preview" style={{ marginTop: 8, maxWidth: '100%', maxHeight: 120, borderRadius: 8, border: '1px solid #1a1a3e' }} />
                )}
              </F>
              <F label={t('Display Nickname', '显示昵称')}>
                <input type="text" value={form.nickname} onChange={e => setForm(p => ({ ...p, nickname: e.target.value }))}
                  placeholder={t('How others see you', '别人看到的称呼')} className="req-input" style={inputStyle} />
              </F>
              <CheckBox checked={form.show_contact} onChange={v => setForm(p => ({ ...p, show_contact: v }))}
                label={t('Show my contact info publicly', '公开显示我的联系方式')} />
              <CheckBox checked={form.allow_contact} onChange={v => setForm(p => ({ ...p, allow_contact: v }))}
                label={t('Allow BytesAgain to contact me if needed', '允许必要时联系我')} />

              {error && <div style={{ color: '#f87171', fontSize: '.85em', marginBottom: 14, padding: '10px', background: '#3a1a1a10', borderRadius: 8 }}>⚠️ {error}</div>}

              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" disabled={submitting} style={{
                  flex: 1, padding: '12px 0', borderRadius: 10, border: 'none',
                  background: submitting ? '#333' : 'linear-gradient(135deg,#667eea,#00d4ff)',
                  color: '#fff', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer',
                }}>{submitting ? '...' : editId ? t('Save', '保存') : t('Publish', '发布')}</button>
                <button type="button" onClick={() => setShowForm(false)} style={{
                  padding: '12px 20px', borderRadius: 10, border: '1px solid #333',
                  background: 'none', color: '#888', cursor: 'pointer',
                }}>{t('Cancel', '取消')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 4, fontSize: '.82em', fontWeight: 600, color: '#ccc' }}>{label}</label>
      {children}
    </div>
  )
}

function CheckBox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '.88em', color: '#ccc' }}>
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
          style={{ width: 18, height: 18, accentColor: '#667eea' }} />
        {label}
      </label>
    </div>
  )
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: '.7em', fontWeight: 700, background: `${color}18`, color, border: `1px solid ${color}33` }}>
      {label}
    </span>
  )
}
