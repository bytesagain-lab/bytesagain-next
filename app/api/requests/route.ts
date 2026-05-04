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
  const { data: inserted, error } = await sb.from('skill_requests').insert(r).select('id').single()
  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 })

  // 异步通知
  const notifBody = { title: title?.trim(), request: request.trim(), platform: platform?.trim(), budget: budget?.trim(), contact: contact?.trim() }
  const from = contact?.trim() || '匿名'
  const titleStr = title?.trim() ? `—— ${title.trim()}` : ''
  fetch('https://api.telegram.org/bot8726371875:AAEjWVW7udg4QlE1QGAOtnwrER8PIcs3GyM/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: '1517831092', text: `📮 新需求提交${titleStr}\n来自: ${from}\n描述: ${request.trim().slice(0, 100)}${request.trim().length > 100 ? '…' : ''}` })
  }).catch(() => {})

  try {
    const nodemailer = require('nodemailer')
    const t = nodemailer.createTransport({ host: 'smtp.zoho.com', port: 587, secure: false, auth: { user: 'hello@bytesagain.com', pass: process.env.ZOHO_PASS! } })
    await t.sendMail({
      from: '"BytesAgain" <hello@bytesagain.com>',
      to: 'ckchzh@gmail.com',
      subject: `📮 新 Skill 需求${titleStr}`,
      html: `<div style="font-family:sans-serif;max-width:480px;padding:24px">
        <h2 style="margin:0 0 16px">📮 新需求提交</h2>
        <table style="border-collapse:collapse;width:100%">
          ${title?.trim() ? `<tr><td style="padding:8px 0;color:#888">标题</td><td style="padding:8px 0;font-weight:bold">${title.trim()}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#888">描述</td><td style="padding:8px 0">${request.trim()}</td></tr>
          ${platform?.trim() ? `<tr><td style="padding:8px 0;color:#888">平台</td><td style="padding:8px 0">${platform.trim()}</td></tr>` : ''}
          ${budget?.trim() ? `<tr><td style="padding:8px 0;color:#888">预算</td><td style="padding:8px 0">${budget.trim()}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#888">联系方式</td><td style="padding:8px 0">${contact?.trim() || '未提供'}</td></tr>
        </table>
        <p style="margin-top:20px"><a href="https://bytesagain.com/requests">查看全部需求 →</a></p>
      </div>`
    })
  } catch (e) {}

  return NextResponse.json({ ok: true, id: inserted.id })
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
