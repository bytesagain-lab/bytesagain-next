import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// ── In-memory rate limiter (per edge instance, best-effort) ──
const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMITS: Record<string, { max: number; windowMs: number }> = {
  '/skill/':      { max: 60,  windowMs: 60_000 },   // 60 req/min per IP
  '/use-case/':   { max: 40,  windowMs: 60_000 },
  '/github-skill/': { max: 30, windowMs: 60_000 },
  '/api/related': { max: 20,  windowMs: 60_000 },
  '/api/related-usecases': { max: 20, windowMs: 60_000 },
  '/api/related-skills':   { max: 20, windowMs: 60_000 },
  '/article/':    { max: 50,  windowMs: 60_000 },
}

const HIGH_COST_PATHS = Object.keys(RATE_LIMITS)

function getRateLimitKey(request: NextRequest): string | null {
  for (const prefix of HIGH_COST_PATHS) {
    if (request.nextUrl.pathname.startsWith(prefix)) {
      return prefix
    }
  }
  return null
}

function checkRateLimit(request: NextRequest, pathKey: string): boolean {
  const ip = request.headers.get('x-real-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || 'unknown'
  const userAgent = (request.headers.get('user-agent') || '').substring(0, 100)
  
  // Skip verified search engine bots (they respect crawl-delay)
  const verifiedBot = /googlebot|bingbot|duckduckbot|baiduspider|yandexbot|slurp/i.test(userAgent)
  if (verifiedBot) {
    // Still limit, but more generously
    const vKey = `verified:${ip}:${pathKey}`
    const now = Date.now()
    const entry = RATE_LIMIT_MAP.get(vKey)
    if (!entry || now > entry.resetAt) {
      RATE_LIMIT_MAP.set(vKey, { count: 1, resetAt: now + 120_000 })
      return true
    }
    entry.count++
    if (entry.count > 200) return false  // 200/min for verified bots
    return true
  }

  const key = `${ip}:${pathKey}`
  const limit = RATE_LIMITS[pathKey]
  const now = Date.now()

  // Cleanup old entries every 100 checks
  if (Math.random() < 0.01) {
    for (const [k, v] of RATE_LIMIT_MAP) {
      if (now > v.resetAt) RATE_LIMIT_MAP.delete(k)
    }
  }

  const entry = RATE_LIMIT_MAP.get(key)
  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(key, { count: 1, resetAt: now + limit.windowMs })
    return true
  }

  entry.count++
  return entry.count <= limit.max
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // ── Rate limiting for high-cost paths ──
  const rateLimitKey = getRateLimitKey(request)
  if (rateLimitKey) {
    if (!checkRateLimit(request, rateLimitKey)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'Content-Type': 'text/plain',
        },
      })
    }
  }

  // ── Auth for protected routes ──
  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
  if (!isProtected) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (pathname.startsWith('/admin') && user?.email !== 'ckchzh@gmail.com') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Protected routes
    '/dashboard/:path*',
    '/admin/:path*',
    // Rate-limited high-cost routes
    '/skill/:path*',
    '/use-case/:path*',
    '/github-skill/:path*',
    '/article/:path*',
    '/api/related',
    '/api/related-usecases',
    '/api/related-skills',
  ],
}
