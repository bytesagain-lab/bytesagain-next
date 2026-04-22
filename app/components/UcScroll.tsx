'use client'

type UC = { icon: string; title: string; href: string }

export default function UcScroll({ items }: { items: UC[] }) {
  // 复制两遍实现无缝循环
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <style>{`
        @keyframes uc-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .uc-marquee-inner {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: uc-marquee 22s linear infinite;
        }
        .uc-marquee-inner:hover {
          animation-play-state: paused;
        }
        .uc-item {
          background: #0a0a1a;
          border: 1px solid #1a1a3e;
          border-radius: 14px;
          padding: 16px 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          cursor: pointer;
          transition: border-color .15s;
          text-decoration: none;
        }
        .uc-item:hover { border-color: #667eea88; }
      `}</style>
      <div className="uc-marquee-inner">
        {doubled.map((uc, i) => (
          <a key={`${uc.href}-${i}`} href={uc.href} className="uc-item">
            <span style={{ fontSize: '1.5em' }}>{uc.icon}</span>
            <span style={{ color: '#ccc', fontSize: '.88em', fontWeight: 600 }}>{uc.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
