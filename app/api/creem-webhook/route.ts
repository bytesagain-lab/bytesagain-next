import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SB_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const CREEM_WEBHOOK_SECRET = process.env.CREEM_WEBHOOK_SECRET || ''

// Verify Creem webhook signature
function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) return true // skip in dev
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}

async function upsertUserPlan(email: string, data: {
  plan: string
  creem_customer_id?: string
  creem_subscription_id?: string
  plan_started_at?: string
  plan_expires_at?: string
}) {
  const res = await fetch(`${SB_URL}/rest/v1/user_plans`, {
    method: 'POST',
    headers: {
      apikey: SB_SERVICE_KEY,
      Authorization: `Bearer ${SB_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({ email, ...data, updated_at: new Date().toISOString() }),
  })
  return res.ok
}

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const signature = req.headers.get('x-creem-signature') || ''

  if (CREEM_WEBHOOK_SECRET && !verifySignature(payload, signature, CREEM_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(payload)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { type, data } = event
  const email = data?.customer?.email || data?.email
  const customerId = data?.customer?.id
  const subscriptionId = data?.subscription?.id || data?.id

  console.log(`[creem-webhook] event=${type} email=${email}`)

  if (!email) return NextResponse.json({ ok: true }) // ignore events without email

  if (type === 'subscription.active' || type === 'checkout.completed' || type === 'subscription.renewed') {
    // User paid — upgrade to Pro
    const expiresAt = data?.subscription?.current_period_end
      ? new Date(data.subscription.current_period_end * 1000).toISOString()
      : null

    await upsertUserPlan(email, {
      plan: 'pro',
      creem_customer_id: customerId,
      creem_subscription_id: subscriptionId,
      plan_started_at: new Date().toISOString(),
      ...(expiresAt ? { plan_expires_at: expiresAt } : {}),
    })

  } else if (type === 'subscription.cancelled' || type === 'subscription.expired') {
    // User cancelled — downgrade to free
    await upsertUserPlan(email, {
      plan: 'free',
      creem_subscription_id: subscriptionId,
      plan_expires_at: new Date().toISOString(),
    })
  }

  return NextResponse.json({ ok: true })
}
