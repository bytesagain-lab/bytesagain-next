'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/login'
      } else {
        setUser(data.user)
        setLoading(false)
      }
    })
  }, [])

  const handleSignOut = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#555' }}>Loading…</div>
  )

  const isPro = false // TODO: check after webhook implemented
  const joinedAt = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''
  const provider = user?.app_metadata?.provider || 'email'

  return (
    <div style={{ maxWidth: 700, margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2em', fontWeight: 800, marginBottom: 32 }}>My Account</h1>

      {/* Profile card */}
      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg,#667eea,#00d4ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4em', fontWeight: 800, color: '#fff',
            flexShrink: 0,
          }}>
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1em' }}>{user?.email}</div>
            <div style={{ color: '#555', fontSize: '.85em', marginTop: 4 }}>
              Joined {joinedAt} · via {provider}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{
            padding: '4px 12px', borderRadius: 20, fontSize: '.8em', fontWeight: 600,
            background: isPro ? 'linear-gradient(135deg,#667eea,#00d4ff)' : '#1a1a2e',
            color: isPro ? '#fff' : '#555',
            border: isPro ? 'none' : '1px solid #333',
          }}>
            {isPro ? '⚡ Pro' : 'Free Plan'}
          </span>
        </div>
      </div>

      {/* Upgrade CTA (only for free users) */}
      {!isPro && (
        <div style={{ background: 'linear-gradient(135deg,#0f0f2f,#1a1a4e)', border: '1px solid #667eea44', borderRadius: 16, padding: 24, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Upgrade to Pro</div>
            <div style={{ color: '#888', fontSize: '.85em' }}>Early access, API, priority support — $9.9/mo</div>
          </div>
          <a href="/pro" style={{ padding: '10px 22px', background: 'linear-gradient(135deg,#667eea,#00d4ff)', borderRadius: 8, color: '#fff', fontWeight: 700, fontSize: '.9em', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Upgrade →
          </a>
        </div>
      )}

      {/* Account info */}
      <div style={{ background: '#0f0f23', border: '1px solid #1a1a3e', borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: '1.05em', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>Account Info</h2>
        {[
          { label: 'Email', value: user?.email },
          { label: 'User ID', value: user?.id?.slice(0, 8) + '…' },
          { label: 'Login method', value: provider === 'google' ? '🔵 Google' : '✉️ Email' },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1a1a2e' }}>
            <span style={{ color: '#666', fontSize: '.9em' }}>{label}</span>
            <span style={{ color: '#ccc', fontSize: '.9em' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Sign out */}
      <button onClick={handleSignOut} style={{
        width: '100%', padding: '12px 0', borderRadius: 10,
        border: '1px solid #333', background: 'none',
        color: '#888', fontSize: '.95em', cursor: 'pointer',
      }}>
        Sign Out
      </button>
    </div>
  )
}
