'use client'

import { useSearchParams } from 'next/navigation'
import { CreemCheckout } from '@creem_io/nextjs'
import { Suspense } from 'react'

// ─── Product Config ───
// 在 Creem Dashboard (creem.io/dashboard/products) 创建产品后
// 把 productId 填到这里
const PRODUCTS = [
  {
    id: 'prod_REPLACE_ME_1',
    name: 'Articulated Crystal Dragon',
    price: '$25.00',
    emoji: '🐉',
    desc: 'Multi-color 3D printed articulated dragon. Perfect fidget toy, desk decoration, or gift for dragon lovers. Available in rainbow, emerald, and obsidian.',
    size: '~16cm (6.3 in)',
    printTime: '~4h',
    material: 'PLA+ Silk',
  },
  {
    id: 'prod_REPLACE_ME_2',
    name: 'Geometric Planter Pot',
    price: '$18.00',
    emoji: '🪴',
    desc: 'Modern geometric planter with drainage holes. Fits standard 4\" nursery pots. Perfect for succulents, cacti, and small houseplants.',
    size: '~12cm (4.7 in)',
    printTime: '~5h',
    material: 'PLA Matte',
  },
  {
    id: 'prod_REPLACE_ME_3',
    name: 'Custom Keychain Set (3 pcs)',
    price: '$12.00',
    emoji: '🔑',
    desc: 'Personalized 3D printed keychains. Add your name, logo, or custom text. Lightweight, durable, and available in 10+ colors.',
    size: '~5cm each (2 in)',
    printTime: '~1h total',
    material: 'PLA',
  },
  {
    id: 'prod_REPLACE_ME_4',
    name: 'Mini Desk Organizer',
    price: '$20.00',
    emoji: '🗂️',
    desc: 'Sleek 3D printed desk organizer with phone stand, pen holder, and cable management. Clean up your workspace in style.',
    size: '~18×10×8cm',
    printTime: '~6h',
    material: 'PLA Matte',
  },
  {
    id: 'prod_REPLACE_ME_5',
    name: 'D20 Dice Tower',
    price: '$30.00',
    emoji: '🎲',
    desc: 'Tabletop RPG dice tower. Rolls D20 with style. Great gift for D&D players and board game enthusiasts.',
    size: '~15cm tall (6 in)',
    printTime: '~7h',
    material: 'PLA+ Silk',
  },
  {
    id: 'prod_REPLACE_ME_6',
    name: 'Wholesale Mix Pack (10 pcs)',
    price: '$85.00',
    emoji: '📦',
    desc: 'Mixed pack of 10 bestselling 3D printed items at wholesale price. Perfect for resellers, event favors, or bulk gifting. Includes 2 dragons, 3 keychains, 2 planters, 3 desk items.',
    size: 'Assorted',
    printTime: '~20h total',
    material: 'PLA + PLA Silk mix',
  },
]

function StoreContent() {
  const params = useSearchParams()
  const success = params.get('success')

  return (
    <main style={{ minHeight: '100vh', background: '#050611', color: '#e5e7eb' }}>
      <style>{`
        .store-hero { text-align: center; padding: clamp(40px,8vw,80px) 20px 30px; }
        .store-hero h1 { font-size: clamp(2.2rem,5vw,3.5rem); letter-spacing: -.04em; margin: 0 0 12px; }
        .store-hero p { color: #94a3b8; font-size: 1.05rem; max-width: 560px; margin: 0 auto; line-height: 1.7; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; padding: 0 20px 80px; }
        .product-card { background: #0d0d20; border: 1px solid #1a1a3e; border-radius: 18px; padding: 24px; display: flex; flex-direction: column; transition: border-color .2s; }
        .product-card:hover { border-color: #34d39944; }
        .product-emoji { font-size: 2.5em; margin-bottom: 8px; }
        .product-name { font-size: 1.2em; font-weight: 800; margin-bottom: 6px; }
        .product-price { font-size: 1.6em; font-weight: 900; color: #34d399; margin-bottom: 12px; }
        .product-desc { color: #94a3b8; font-size: .88em; line-height: 1.65; margin-bottom: 14px; flex: 1; }
        .product-meta { display: flex; gap: 16px; margin-bottom: 16px; font-size: .78em; color: #64748b; }
        .product-meta span { display: flex; align-items: center; gap: 4px; }
        .checkout-btn { width: 100%; padding: 12px; border-radius: 10px; border: none; font-size: .95em; font-weight: 700; cursor: pointer; color: #fff; background: linear-gradient(135deg,#34d399,#22d3ee); transition: opacity .2s; }
        .checkout-btn:hover { opacity: .9; }
        .success-banner { background: #34d39918; border: 1px solid #34d39944; border-radius: 14px; padding: 20px 28px; text-align: center; max-width: 500px; margin: 0 auto 20px; color: #86efac; }
        .footer-note { text-align: center; color: #444; font-size: .82em; padding: 0 20px 60px; line-height: 1.8; }
        @media (max-width: 400px) { .product-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="store-hero">
        <h1>🛒 3D Print Store</h1>
        <p>Hand-printed designs. Each piece made to order on Bambu Lab P1S printers. Ships worldwide.</p>
      </div>

      {success && (
        <Suspense><div className="success-banner">
          ✅ Order received! Check your email for confirmation. Ships in 3-5 business days.
        </div></Suspense>
      )}

      <div className="product-grid">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-emoji">{p.emoji}</div>
            <div className="product-name">{p.name}</div>
            <div className="product-price">{p.price}</div>
            <div className="product-desc">{p.desc}</div>
            <div className="product-meta">
              <span>📐 {p.size}</span>
              <span>⏱️ {p.printTime}</span>
              <span>🧵 {p.material}</span>
            </div>
            <CreemCheckout productId={p.id}>
              <button className="checkout-btn">Buy Now →</button>
            </CreemCheckout>
          </div>
        ))}
      </div>

      <div className="footer-note">
        All products are 3D printed to order with eco-friendly PLA filament.<br />
        Processing time: 3-5 business days. Questions? <a href="/contact" style={{ color: '#667eea' }}>Contact us</a>.
      </div>
    </main>
  )
}

export default function StorePage() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: 'center', color: '#555' }}>Loading store…</div>}>
      <StoreContent />
    </Suspense>
  )
}
