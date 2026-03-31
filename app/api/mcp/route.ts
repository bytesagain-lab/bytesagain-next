import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// MCP-compatible endpoint for AI agents
// Supports: search, recommend, get, popular
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const action = searchParams.get('action') || 'search'
  const query = searchParams.get('q') || ''
  const role = searchParams.get('role') || ''
  const slug = searchParams.get('slug') || ''
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'X-MCP-Version': '1.0',
    'X-Provider': 'BytesAgain (bytesagain.com)',
  }

  try {
    if (action === 'search') {
      if (!query) {
        // 空query返回热门
        const { data } = await supabase
          .from('skills')
          .select('slug, name, description, category, tags, downloads, owner')
          .order('downloads', { ascending: false })
          .limit(limit)
        return NextResponse.json({ action, query, results: data || [], count: data?.length || 0 }, { headers })
      }

      // 并行：本地精确匹配 + ClawHub语义搜索
      const [localRes, chRes] = await Promise.allSettled([
        supabase
          .from('skills')
          .select('slug, name, description, category, tags, downloads, owner')
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
          .order('downloads', { ascending: false })
          .limit(Math.ceil(limit * 0.6)),
        fetch(`https://clawhub.ai/api/v1/search?q=${encodeURIComponent(query)}&limit=${limit}`,
          { next: { revalidate: 300 } }),
      ])

      const local = localRes.status === 'fulfilled' ? (localRes.value.data || []) : []
      const localSlugs = new Set(local.map((s: any) => s.slug))

      let remote: any[] = []
      if (chRes.status === 'fulfilled' && chRes.value.ok) {
        const chData = await chRes.value.json()
        remote = (chData.results || [])
          .filter((s: any) => !localSlugs.has(s.slug))
          .slice(0, Math.floor(limit * 0.4))
          .map((s: any) => ({
            slug: s.slug,
            name: s.displayName || s.slug,
            description: s.summary || '',
            category: '',
            downloads: 0,
            owner: '',
            _source: 'clawhub',
          }))
      }

      const results = [...local, ...remote].slice(0, limit)
      return NextResponse.json({ action, query, results, count: results.length }, { headers })
    }

    if (action === 'recommend') {
      const ROLE_TAGS: Record<string, string[]> = {
        developer: ['devtools', 'developer', 'api', 'sysops', 'frontend', 'general'],
        creator: ['writing', 'general', 'productivity'],
        trader: ['finance', 'blockchain', 'data', 'general'],
        marketer: ['seo', 'writing', 'productivity', 'general'],
        student: ['devtools', 'developer', 'productivity', 'general'],
        ecommerce: ['general', 'logistics', 'finance', 'productivity'],
        analyst: ['data', 'finance', 'general'],
      }
      const tags = ROLE_TAGS[role] || ROLE_TAGS['developer']
      const { data } = await supabase
        .from('skills')
        .select('slug, name, description, category, tags, downloads, owner')
        .overlaps('tags', tags)
        .order('downloads', { ascending: false })
        .limit(limit)
      return NextResponse.json({
        action, role,
        results: data || [],
        install_hint: `clawhub install ${(data || []).slice(0, 3).map((s: any) => s.slug).join(' ')}`,
        browse_more: `https://bytesagain.com/use-case`,
      }, { headers })
    }

    if (action === 'get') {
      const { data } = await supabase
        .from('skills')
        .select('*')
        .eq('slug', slug)
        .single()
      if (!data) return NextResponse.json({ error: 'Skill not found', slug }, { status: 404, headers })
      return NextResponse.json({
        action, skill: data,
        install: `clawhub install ${slug}`,
        page: `https://bytesagain.com/skill/${slug}`,
      }, { headers })
    }

    if (action === 'popular') {
      const { data } = await supabase
        .from('skills')
        .select('slug, name, description, category, downloads, owner')
        .order('downloads', { ascending: false })
        .limit(limit)
      return NextResponse.json({ action, results: data || [], total_in_db: data?.length }, { headers })
    }

    // Default: API info
    return NextResponse.json({
      name: 'BytesAgain MCP API',
      description: 'AI-readable skill recommendation API. Curated from 100,000+ skills worldwide.',
      version: '1.0',
      actions: {
        search: '?action=search&q=<query>&limit=10',
        recommend: '?action=recommend&role=<developer|creator|trader|marketer|student|ecommerce>&limit=10',
        get: '?action=get&slug=<slug>',
        popular: '?action=popular&limit=20',
      },
      homepage: 'https://bytesagain.com',
      llms_txt: 'https://bytesagain.com/llms.txt',
    }, { headers })
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500, headers })
  }
}
