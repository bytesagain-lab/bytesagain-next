import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SB_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: {
    user: 'hello@bytesagain.com',
    pass: process.env.ZOHO_PASS!,
  },
})

export async function POST(req: NextRequest) {
  const { email, source } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const res = await fetch(`${SB_URL}/rest/v1/subscribers`, {
    method: 'POST',
    headers: {
      apikey: SB_SERVICE_KEY,
      Authorization: `Bearer ${SB_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=ignore-duplicates',
    },
    body: JSON.stringify({ email, source: source || 'homepage', status: 'pending' }),
  })

  if (!res.ok && res.status !== 409) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  // 新用户注册时发通知邮件给Kelly
  if (source === 'register') {
    try {
      await transporter.sendMail({
        from: '"BytesAgain" <hello@bytesagain.com>',
        to: 'ckchzh@gmail.com',
        subject: `🎉 新用户注册 — ${email}`,
        text: `BytesAgain 新用户注册\n\n邮箱: ${email}\n时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}\n\nhttps://bytesagain.com`,
        html: `<p><b>BytesAgain 新用户注册 🎉</b></p><p>邮箱: <b>${email}</b><br>时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p><p><a href="https://bytesagain.com">bytesagain.com</a></p>`,
      })
    } catch (e) {
      console.error('注册通知邮件失败:', e)
    }
  }

  return NextResponse.json({ ok: true })
}
