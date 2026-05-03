import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { data, error } = await sb
    .from('skill_requests')
    .select('id, title, request, use_case, platform, budget, contact, created_at')
    .order('created_at', { ascending: false })
    .limit(50)
  if (error) return NextResponse.json([], { status: 500 })
  return NextResponse.json(data || [])
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, request, use_case, platform, budget, contact } = body

  if (!request || request.trim().length < 10) {
    return NextResponse.json({ error: '需求描述太短，至少10个字' }, { status: 400 })
  }
  if (request.length > 800) {
    return NextResponse.json({ error: '需求太长，请控制在800字以内' }, { status: 400 })
  }

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { error } = await sb.from('skill_requests').insert({
    title: title?.trim() || null,
    request: request.trim(),
    use_case: use_case?.trim() || null,
    platform: platform?.trim() || null,
    budget: budget?.trim() || null,
    contact: contact?.trim() || null,
  })
  if (error) {
    console.error('[skill_requests] insert failed:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
