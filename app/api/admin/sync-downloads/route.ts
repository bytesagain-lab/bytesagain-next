export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'bytesagain-admin-2026'

export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0')
  const limit  = parseInt(req.nextUrl.searchParams.get('limit')  || '50')

  // 拉一批 clawhub slug
  const { data: skills } = await supabase
    .from('skills')
    .select('slug')
    .eq('source', 'clawhub')
    .order('slug')
    .range(offset, offset + limit - 1)

  if (!skills || skills.length === 0) {
    return NextResponse.json({ done: true, offset, updated: 0 })
  }

  const results: { slug: string; downloads: number; status: string }[] = []

  for (const { slug } of skills) {
    try {
      const r = await fetch(`https://clawhub.ai/api/v1/skills/${slug}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BytesAgain/1.0)' },
        signal: AbortSignal.timeout(8000),
      })
      if (r.status === 404) {
        results.push({ slug, downloads: 0, status: '404' })
        continue
      }
      if (r.status === 429) {
        results.push({ slug, downloads: -1, status: '429' })
        continue
      }
      if (r.ok) {
        const d = await r.json()
        const dl = d?.downloads || d?.download_count || 0
        if (dl > 0) {
          await supabase.from('skills').update({ downloads: dl }).eq('slug', slug)
        }
        results.push({ slug, downloads: dl, status: 'ok' })
      }
    } catch {
      results.push({ slug, downloads: -1, status: 'error' })
    }
    // 每个请求间隔 200ms
    await new Promise(r => setTimeout(r, 200))
  }

  const updated = results.filter(r => r.status === 'ok' && r.downloads > 0).length
  const rate_limited = results.filter(r => r.status === '429').length

  return NextResponse.json({
    offset,
    limit,
    count: skills.length,
    updated,
    rate_limited,
    done: skills.length < limit,
  })
}
