export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'bytesagain-admin-2026'
const BATCH = 50

function sanitize(str: string): string {
  // 移除 Supabase/PostgreSQL 不接受的 Unicode 转义和控制字符
  return str
    .replace(/\\u0000/g, '')           // null字节
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // 控制字符
    .replace(/\\/g, '\\\\')            // 反斜杠转义（避免JSON问题）
    .slice(0, 500)
}

function itemToRow(item: any) {
  const name = item.name || ''
  const owner = item.ownerHandle || ''
  const slug = name.includes('/') ? name.split('/').pop() : name
  if (!slug) return null

  const capTags: string[] = item.capabilityTags || []
  const category = capTags[0] || 'clawhub'
  const tags = Array.from(new Set([...capTags, 'clawhub']))
  const summary = sanitize(item.summary || '')
  const displayName = sanitize(item.displayName || slug).slice(0, 200)

  return {
    slug: slug.toLowerCase(),  // source 字段区分来源，不需要前缀
    name: displayName,
    description: summary,
    category,
    tags,
    downloads: 0,
    stars: 0,
    source: 'clawhub',
    source_url: `https://clawhub.ai/${owner}/${slug}`,
    owner,
    version: item.latestVersion || '1.0.0',
    is_ours: false,
  }
}

export async function GET(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const cursor = req.nextUrl.searchParams.get('cursor') || undefined

  // 从 ClawHub 拉一页
  const params = new URLSearchParams({ family: 'skill', limit: String(BATCH) })
  if (cursor) params.set('cursor', cursor)

  const res = await fetch(`https://clawhub.ai/api/v1/packages?${params}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
    next: { revalidate: 0 },
  })

  if (!res.ok) {
    return NextResponse.json({ error: `clawhub ${res.status}`, retry: true }, { status: 200 })
  }

  const data = await res.json()
  const items: any[] = data.items || []
  const nextCursor: string | null = data.nextCursor || null

  const rows = items.map(itemToRow).filter(Boolean)

  if (rows.length > 0) {
    const { error } = await supabase
      .from('skills')
      .upsert(rows, { onConflict: 'slug', ignoreDuplicates: false })
    if (error) {
      // 返回nextCursor让调度器能继续推进
      return NextResponse.json({ error: error.message, nextCursor, inserted: 0 }, { status: 500 })
    }
  }

  return NextResponse.json({
    inserted: rows.length,
    nextCursor,
    done: !nextCursor,
  })
}
