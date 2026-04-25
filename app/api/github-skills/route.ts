import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function sanitize(raw: string, maxLen = 120) {
  return (raw || '')
    .slice(0, maxLen)
    .replace(/[\x00-\x1f\x7f]/g, ' ')
    .replace(/[<>`;{}\[\]\\]/g, '')
    .replace(/  +/g, ' ')
    .trim()
}

export async function GET(req: NextRequest) {
  const q = sanitize(req.nextUrl.searchParams.get('q') || '')
  const limit = Math.max(1, Math.min(Number(req.nextUrl.searchParams.get('limit') || 20), 50))

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'GitHub skill index is not configured' }, { status: 503 })
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  if (q) {
    const { data, error } = await supabase.rpc('search_github_skill_index', {
      query_text: q,
      match_count: limit,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ source: 'github_skill_index', query: q, count: data?.length || 0, results: data || [] }, {
      headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
    })
  }

  const { data, error } = await supabase
    .from('github_skill_index')
    .select('id, github_owner, repo, path, name, description, github_url, skillsmp_url, stars, updated_at, quality_score, tags')
    .order('quality_score', { ascending: false })
    .order('stars', { ascending: false })
    .limit(limit)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ source: 'github_skill_index', query: null, count: data?.length || 0, results: data || [] }, {
    headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
  })
}
