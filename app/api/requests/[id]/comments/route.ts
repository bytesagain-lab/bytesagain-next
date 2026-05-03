import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { data } = await sb
    .from('skill_request_comments')
    .select('id, comment, user_id, created_at')
    .eq('request_id', parseInt(id))
    .order('created_at', { ascending: true })
    .limit(50)

  // 查每个人的昵称
  const userIds = [...new Set((data || []).map((c: any) => c.user_id))]
  const profiles: Record<string, string> = {}
  if (userIds.length) {
    const { data: p } = await sb.from('profiles').select('user_id, display_name').in('user_id', userIds)
    ;(p || []).forEach((r: any) => { profiles[r.user_id] = r.display_name })
  }

  const comments = (data || []).map((c: any) => ({
    ...c,
    display_name: profiles[c.user_id] || c.user_id?.slice(0, 8) || 'Anonymous',
  }))
  return NextResponse.json(comments)
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return req.cookies.getAll() }, setAll() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  if (!body.comment?.trim()) return NextResponse.json({ error: 'Empty comment' }, { status: 400 })

  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const { error, data: inserted } = await sb.from('skill_request_comments')
    .insert({ request_id: parseInt(id), user_id: user.id, comment: body.comment.trim() })
    .select('id, created_at').single()

  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 })

  // 异步发邮件通知发布人（不阻塞响应）
  const { data: reqData } = await sb.from('skill_requests').select('user_id, title, contact').eq('id', parseInt(id)).single()
  if (reqData?.user_id && reqData.user_id !== user.id) {
    const { data: profile } = await sb.from('profiles').select('display_name').eq('user_id', reqData.user_id).single()
    const displayName = profile?.display_name || 'User'
    notifyEmail(reqData, displayName, user.email || 'Someone', body.comment.trim()).catch(() => {})
  }

  return NextResponse.json({ ok: true, id: inserted?.id })
}

async function notifyEmail(reqData: any, posterName: string, commenterEmail: string, comment: string) {
  try {
    await fetch('https://jfpeycpiyayrpjldppzq.supabase.co/rest/v1/skill_requests', {
      method: 'PATCH',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
    })
  } catch {}
  // Email via Supabase Edge Function or external service
  // For now, log to console
  console.log(`[notify] Comment on request "${reqData.title}" by ${commenterEmail}: ${comment.slice(0, 100)}`)
}
