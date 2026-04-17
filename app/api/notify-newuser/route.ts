import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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
  // 验证来源（Supabase Webhook 或内部调用）
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== 'ba-newuser-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: any = {}
  try {
    body = await req.json()
  } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }) }

  const email = body?.record?.email || body?.email || 'unknown'
  const provider = body?.record?.raw_app_meta_data?.provider || body?.provider || 'email'
  const createdAt = body?.record?.created_at || body?.created_at || new Date().toISOString()
  const time = new Date(createdAt).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })

  // TG 通知
  try {
    await fetch(`https://api.telegram.org/bot8726371875:AAEjWVW7udg4QlE1QGAOtnwrER8PIcs3GyM/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '1517831092',
        text: `🎉 新用户注册\n邮箱: ${email}\n方式: ${provider}\n时间: ${time}`
      })
    })
  } catch (e) { console.error('TG通知失败:', e) }

  try {
    await transporter.sendMail({
      from: '"BytesAgain" <hello@bytesagain.com>',
      to: 'ckchzh@gmail.com',
      subject: `🎉 新用户注册 — ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;padding:24px">
          <h2 style="margin:0 0 16px">🎉 BytesAgain 新用户注册</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px 0;color:#888">邮箱</td><td style="padding:8px 0;font-weight:bold">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#888">注册方式</td><td style="padding:8px 0">${provider}</td></tr>
            <tr><td style="padding:8px 0;color:#888">时间</td><td style="padding:8px 0">${time}</td></tr>
          </table>
          <p style="margin-top:20px"><a href="https://bytesagain.com">bytesagain.com</a></p>
        </div>
      `,
    })
    console.log('新用户通知已发送:', email)
  } catch (e) {
    console.error('邮件发送失败:', e)
    return NextResponse.json({ error: 'Mail failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
