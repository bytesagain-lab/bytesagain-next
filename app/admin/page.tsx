'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ADMIN_EMAIL = 'ckchzh@gmail.com'

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setLoading(false)
      if (!data.user) {
        window.location.href = '/login'
        return
      }
      setUser(data.user)
      if (data.user.email === ADMIN_EMAIL) {
        setAuthorized(true)
      }
    })
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: '#555' }}>
        Loading…
      </div>
    )
  }

  if (!authorized) {
    return (
      <div style={{ maxWidth: 500, margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{
          background: '#0f0f23', border: '1px solid #3a1a1a', borderRadius: 16, padding: 48,
        }}>
          <div style={{ fontSize: '3em', marginBottom: 16 }}>⛔</div>
          <h1 style={{ fontSize: '1.5em', fontWeight: 700, marginBottom: 12, color: '#f87171' }}>
            Access Denied
          </h1>
          <p style={{ color: '#666', lineHeight: 1.6 }}>
            This admin area is restricted. Only authorized users can access this page.
          </p>
          <p style={{ color: '#444', fontSize: '.85em', marginTop: 20 }}>
            Signed in as: {user?.email}
          </p>
          <button onClick={() => window.location.href = '/'}
            style={{
              marginTop: 20, padding: '10px 28px', borderRadius: 8,
              border: '1px solid #333', background: 'none',
              color: '#888', cursor: 'pointer', fontSize: '.9em',
            }}>
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  const tools = [
    {
      title: 'Fetch ClawHub Stats',
      path: '/api/admin/fetch-clawhub',
      desc: '同步最新 ClawHub 技能数据到 Supabase',
      method: 'POST',
    },
    {
      title: 'Sync Downloads',
      path: '/api/admin/sync-downloads',
      desc: '更新下载量统计',
      method: 'POST',
    },
    {
      title: 'Generate Use Cases (Google)',
      path: '/api/admin/google-usecases',
      desc: '通过 Google API 生成 use cases',
      method: 'POST',
    },
    {
      title: 'Generate Use Cases (n8n)',
      path: '/api/admin/n8n-usecases',
      desc: '通过 n8n 生成 use cases',
      method: 'POST',
    },
    {
      title: 'Scrape Use Cases',
      path: '/api/admin/scrape-usecases',
      desc: '爬取外站 use cases',
      method: 'POST',
    },
  ]

  const stats = [
    { label: 'Skills in DB', value: '—' },
    { label: 'Active Users', value: '—' },
    { label: 'Use Cases', value: '—' },
  ]

  return (
    <div style={{ maxWidth: 800, margin: '60px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <h1 style={{ fontSize: '2em', fontWeight: 800 }}>
          🏯 Admin Panel
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#555', fontSize: '.85em' }}>{user?.email}</span>
          <span style={{
            padding: '2px 8px', borderRadius: 4, fontSize: '.7em', fontWeight: 700,
            background: '#00d4ff20', color: '#00d4ff', border: '1px solid #00d4ff40',
          }}>ADMIN</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 12,
            padding: '20px 16px', textAlign: 'center',
          }}>
            <div style={{ color: '#888', fontSize: '.8em', marginBottom: 8 }}>{s.label}</div>
            <div style={{ color: '#e0e0e0', fontSize: '1.8em', fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Admin Tools */}
      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: '1.05em', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
          🛠 Tools
        </h2>

        {tools.map(tool => (
          <div key={tool.path} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 0', borderBottom: '1px solid #1a1a2e',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: '.92em' }}>{tool.title}</div>
              <div style={{ color: '#555', fontSize: '.78em', marginTop: 2 }}>{tool.desc}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 16 }}>
              <span style={{
                padding: '2px 6px', borderRadius: 4, fontSize: '.7em', fontWeight: 700,
                color: '#667eea', background: '#667eea15',
              }}>{tool.method}</span>
              <button onClick={async () => {
                try {
                  const res = await fetch(tool.path, { method: tool.method })
                  const data = await res.json()
                  alert(JSON.stringify(data, null, 2))
                } catch (e: any) {
                  alert('Error: ' + e.message)
                }
              }} style={{
                padding: '4px 14px', borderRadius: 6,
                background: '#667eea', border: 'none', color: '#fff',
                fontSize: '.8em', cursor: 'pointer', fontWeight: 600,
              }}>
                Run
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button onClick={() => window.location.href = '/dashboard'}
          style={{
            padding: '10px 20px', borderRadius: 8,
            border: '1px solid #333', background: 'none',
            color: '#666', cursor: 'pointer', fontSize: '.88em', marginRight: 10,
          }}>
          ← My Account
        </button>
        <button onClick={() => window.location.href = '/'}
          style={{
            padding: '10px 20px', borderRadius: 8,
            border: '1px solid #333', background: 'none',
            color: '#666', cursor: 'pointer', fontSize: '.88em',
          }}>
          ← Home
        </button>
      </div>
    </div>
  )
}
