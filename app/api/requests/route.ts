import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// 公开读取：不暴露联系方式
export async function GET() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data } = await sb
    .from('skill_requests')
    .select('id, title, request, platform, budget, allow_contact, show_contact, image_url, view_count, nickname, user_id, created_at')
    .order('created_at', { ascending: false })
    .limit(50)
  return NextResponse.json(data || [])
}

// 提交需求：需要登录
export async function POST(req: NextRequest) {
  // 鉴权
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return req.cookies.getAll() }, setAll() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, request, platform, budget, contact, allow_contact, show_contact, image_url, nickname } = body
  if (!request || request.trim().length < 10)
    return NextResponse.json({ error: 'Request too short' }, { status: 400 })
  if (request.length > 800)
    return NextResponse.json({ error: 'Request too long' }, { status: 400 })

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const r: Record<string, any> = {
    user_id: user.id,
    title: title?.trim() || null,
    request: request.trim(),
    platform: platform?.trim() || null,
    budget: budget?.trim() || null,
    contact: contact?.trim() || null,
    allow_contact: allow_contact === true,
  }
  // optional columns — table might not have them yet
  if (show_contact !== undefined) r.show_contact = show_contact === true
  if (image_url?.trim()) r.image_url = image_url.trim()
  if (nickname?.trim()) r.nickname = nickname.trim()
  const { error } = await sb.from('skill_requests').insert(r)
  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// 编辑/删除：只能操作自己的
export async function PATCH(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return req.cookies.getAll() }, setAll() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { id } = body
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const ru: Record<string, any> = {
    title: body.title?.trim() || null,
    request: body.request?.trim(),
    platform: body.platform?.trim() || null,
    budget: body.budget?.trim() || null,
    contact: body.contact?.trim() || null,
    allow_contact: body.allow_contact,
  }
  if (body.show_contact !== undefined) ru.show_contact = body.show_contact
  if (body.image_url?.trim()) ru.image_url = body.image_url.trim()
  if (body.nickname?.trim()) ru.nickname = body.nickname.trim()
  const { error } = await sb.from('skill_requests').update(ru)
    .eq('id', id)
    .eq('user_id', user.id)
  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return req.cookies.getAll() }, setAll() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { error } = await sb.from('skill_requests')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)
  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
