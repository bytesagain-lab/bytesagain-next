import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: { user: 'hello@bytesagain.com', pass: process.env.ZOHO_PASS },
})

export async function POST(req: NextRequest) {
  try {
    const { type, message, email, page } = await req.json()
    if (!message || message.trim().length < 3) {
      return NextResponse.json({ error: 'Message too short' }, { status: 400 })
    }

    // 存DB
    await supabase.from('feedback').insert({
      type: type || 'general',
      message: message.trim(),
      email: email || null,
      page: page || null,
    })

    // 发邮件通知Kelly
    await transporter.sendMail({
      from: 'hello@bytesagain.com',
      to: 'ckchzh@gmail.com',
      subject: `[BytesAgain Feedback] ${type || 'General'} — ${new Date().toLocaleDateString()}`,
      text: `Type: ${type || 'general'}\nPage: ${page || '-'}\nEmail: ${email || '-'}\n\n${message}`,
    }).catch(() => {}) // 邮件失败不影响用户

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
