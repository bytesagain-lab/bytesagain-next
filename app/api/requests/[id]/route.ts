import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  // 浏览量 +1
  const { data: cur } = await sb.from('skill_requests').select('view_count').eq('id', parseInt(id)).single()
  await sb.from('skill_requests').update({ view_count: (cur?.view_count || 0) + 1 }).eq('id', parseInt(id))

  const { data, error } = await sb
    .from('skill_requests')
    .select('id, title, request, platform, budget, show_contact, contact, allow_contact, image_url, view_count, nickname, user_id, created_at')
    .eq('id', parseInt(id))
    .single()
  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // 查找用户昵称
  let profileName: string | null = null
  if (data.user_id) {
    const { data: p } = await sb.from('profiles').select('display_name').eq('user_id', data.user_id).single()
    profileName = p?.display_name || null
  }

  return NextResponse.json({ ...data, profile_name: profileName || data.nickname || null })
}
