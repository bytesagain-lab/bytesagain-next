export const revalidate = 86400
import { getSkill, getSkills } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import RelatedContent from '@/app/components/RelatedContent'
import SkillActions from '@/app/components/SkillActions'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const skill = await getSkill(slug)
  if (!skill) return { title: 'Not Found' }
  const noindex = slug.endsWith('-old')
  const displayName = skill.name || slug
  const title = `${displayName} — AI Agent Skill | BytesAgain`
  const rawDesc = skill.description || ''
  let metaDesc = rawDesc
  if (rawDesc.length > 160) {
    const cutoff = rawDesc.lastIndexOf('.', 158)
    metaDesc = cutoff > 80 ? rawDesc.slice(0, cutoff + 1) : rawDesc.slice(0, 157) + '...'
  }
  const pageUrl = `https://bytesagain.com/skill/${slug}`
  return {
    title,
    description: metaDesc,
    alternates: { canonical: pageUrl },
    openGraph: { title, description: metaDesc, url: pageUrl, type: 'website', siteName: 'BytesAgain', images: [{ url: 'https://bytesagain.com/social-preview.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description: metaDesc },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}

export async function generateStaticParams() {
  return []
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let skill = await getSkill(slug)

  if (!skill) {
    try {
      const res = await fetch(`https://clawhub.ai/api/v1/skills/${slug}`, { next: { revalidate: 3600 } })
      if (res.ok) {
        const d = await res.json()
        const s = d.skill || {}
        skill = {
          slug,
          name: s.displayName || slug,
          title: s.displayName || slug,
          description: s.summary || '',
          category: (s.tags?.[0] || 'General'),
          downloads: s.stats?.downloads || 0,
          version: d.latestVersion?.version || '1.0.0',
          owner: d.owner?.handle || '',
        }
      }
    } catch {}
  }

  if (!skill) notFound()

  const source = (skill as any).source || 'clawhub'
  const sourceUrl = (skill as any).source_url || ''
  const tags: string[] = (skill as any).tags || []

  const sourceMeta: Record<string, { label: string; color: string; bg: string; emoji: string }> = {
    clawhub:  { label: 'ClawHub',  color: '#818cf8', bg: '#818cf822', emoji: '🦀' },
    github:   { label: 'GitHub',   color: '#94a3b8', bg: '#94a3b822', emoji: '⭐' },
    lobehub:  { label: 'LobeHub',  color: '#a78bfa', bg: '#a78bfa22', emoji: '🤖' },
    dify:     { label: 'Dify',     color: '#fbbf24', bg: '#fbbf2422', emoji: '🔧' },
    mcp:      { label: 'MCP',      color: '#34d399', bg: '#34d39922', emoji: '⚡' },
    wechat:   { label: 'WeChat',   color: '#4ade80', bg: '#4ade8022', emoji: '💬' },
  }
  const sm = sourceMeta[source] || sourceMeta.clawhub

  const externalUrl = sourceUrl || (source === 'github'
    ? `https://github.com/${skill.owner}/${slug}`
    : `https://clawhub.ai/${skill.owner}/${slug}`)

  const OUR_ACCOUNTS = ['ckchzh', 'xueyetianya', 'bytesagain3', 'bytesagain-lab', 'loutai0307-prog', 'bytesagain1']
  const isOurs = (skill as any).is_ours === true || OUR_ACCOUNTS.includes(skill.owner || '')

  // Strip clawhub- prefix from slug for install command
  // clawhub-self-improving-agent → self-improving-agent (real ClawHub slug)
  // bytesagain-xxx stays as-is (our own brand slug, original on ClawHub)
  const installSlug = slug.replace(/^clawhub-/, '')
  const installCmd = `clawhub install ${installSlug}`
  const canInstallWithClawHub = source !== 'github'
  const testPrompt = `I just installed the ${skill.name || slug} skill. Please run a quick smoke test: explain what this skill can do, ask me for the minimum input it needs, then produce one small sample output for a realistic task.`
  const agentConfig = `1. Install the skill: ${installCmd}\n2. Restart or reload your agent session if needed.\n3. Ask your agent: \"Use the ${skill.name || slug} skill to help me with [your task].\"`
  const manusInviteUrl = 'https://manus.im/invitation/PAN0HWLUJPLKA?utm_source=bytesagain&utm_medium=skill_page&utm_campaign=agent_cta'
  const agentOptions = [
    { name: 'Manus', desc: 'Task-oriented agent. Great for testing AI skills end-to-end.', href: manusInviteUrl, label: 'Try Manus', sponsored: true },
    { name: 'OpenClaw', desc: 'Local-first agent. Install skills via ClawHub CLI.', href: '/install', label: 'Set up OpenClaw', internal: true },
    { name: 'Claude Code', desc: 'Anthropic\'s coding agent. Paste the prompt or SKILL.md into your session.', href: 'https://code.claude.com/docs', label: 'Claude Code docs' },
    { name: 'Cursor', desc: 'AI-powered IDE. Use the smoke-test prompt in Cursor Agent.', href: 'https://cursor.com', label: 'Open Cursor' },
    { name: 'Continue.dev', desc: 'Open-source AI code assistant. Add SKILL.md as a custom tool.', href: 'https://docs.continue.dev/customize/tools', label: 'Continue docs' },
    { name: 'Windsurf', desc: 'Agentic IDE by Codeium. Paste the prompt into Cascade.', href: 'https://codeium.com/windsurf', label: 'Try Windsurf' },
    { name: 'Cline', desc: 'VS Code extension for autonomous coding with MCP tools.', href: 'https://github.com/cline/cline', label: 'Cline on GitHub' },
    { name: 'Copilot Workspace', desc: 'GitHub\'s AI dev environment. Suitable for code-generation skills.', href: 'https://github.com/features/copilot', label: 'Copilot Workspace' },
  ]

  return (
    <>
      <style>{`
        .skill-page { max-width: 1100px; margin: 0 auto; padding: 32px 20px 80px; }
        .two-col { display: flex; gap: 32px; align-items: flex-start; }
        .two-col-main { flex: 1; min-width: 0; }
        .two-col-side { width: 300px; flex-shrink: 0; }
        @media (max-width: 860px) {
          .two-col { flex-direction: column; }
          .two-col-side { width: 100%; }
        }
        .breadcrumb { font-size: .82em; color: #4b5563; margin-bottom: 28px; }
        .breadcrumb a { color: #818cf8; text-decoration: none; }
        .breadcrumb a:hover { text-decoration: underline; }
        .skill-card { background: #0d0d1f; border: 1px solid #1e1e3f; border-radius: 20px; padding: 28px; margin-bottom: 24px; }
        .skill-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .skill-badges { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .skill-top-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }
        .badge { display: inline-flex; align-items: center; gap: 5px; font-size: .75em; font-weight: 600; padding: 4px 12px; border-radius: 999px; border: 1px solid transparent; }
        .skill-title { font-size: 1.6em; font-weight: 800; color: #f1f5f9; margin: 0 0 4px; line-height: 1.2; }
        .skill-owner { font-size: .82em; color: #4b5563; margin: 0 0 14px; }
        .skill-owner span { color: #818cf8; }
        .skill-desc { font-size: .92em; color: #94a3b8; line-height: 1.65; margin: 0 0 16px; }
        .skill-meta { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px solid #1e1e3f; }
        .meta-item { display: flex; flex-direction: column; gap: 2px; }
        .meta-label { font-size: .7em; color: #374151; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
        .meta-value { font-size: .92em; color: #94a3b8; font-weight: 600; }
        .tags-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .tag { font-size: .75em; color: #6366f1; background: #6366f115; border: 1px solid #6366f130; border-radius: 6px; padding: 3px 10px; text-decoration: none; }
        .tag:hover { background: #6366f125; }
        .install-box { background: #070714; border: 1px solid #1e1e3f; border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
        .install-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid #1e1e3f; }
        .install-dots { display: flex; gap: 6px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .install-label { font-size: .72em; color: #374151; font-family: monospace; letter-spacing: 1px; }
        .install-body { padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .install-cmd { font-family: 'Courier New', monospace; font-size: 1em; color: #a5f3fc; }
        .copy-btn { font-size: .75em; color: #6366f1; background: #6366f115; border: 1px solid #6366f130; border-radius: 6px; padding: 5px 12px; cursor: pointer; white-space: nowrap; transition: all .15s; }
        .copy-btn:hover { background: #6366f125; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 13px 28px; background: linear-gradient(135deg, #6366f1, #818cf8); border-radius: 10px; color: #fff; text-decoration: none; font-weight: 700; font-size: .95em; transition: opacity .15s; }
        .btn-primary:hover { opacity: .88; }
        .btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; background: transparent; border: 1px solid #1e1e3f; border-radius: 10px; color: #6b7280; text-decoration: none; font-weight: 600; font-size: .95em; transition: all .15s; }
        .btn-secondary:hover { border-color: #818cf8; color: #818cf8; }
        .actions-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .disclaimer { margin-top: 20px; padding: 14px 18px; background: #070714; border: 1px solid #1a1a3a; border-radius: 10px; font-size: .78em; color: #374151; line-height: 1.7; }
        .disclaimer a { color: #6366f1; }
        .ours-badge { display: inline-flex; align-items: center; gap: 6px; font-size: .72em; font-weight: 700; color: #22d3ee; background: #22d3ee10; border: 1px solid #22d3ee30; border-radius: 999px; padding: 4px 14px; }
        .next-step-card { background: linear-gradient(135deg, #10102a, #0d0d1f); border: 1px solid #6366f144; border-radius: 16px; padding: 20px; margin: 0 0 20px; }
        .next-step-title { color: #f8fafc; font-size: 1.18em; font-weight: 800; margin: 0 0 8px; }
        .next-step-sub { color: #94a3b8; line-height: 1.65; margin: 0 0 18px; }
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(210px,1fr)); gap: 12px; margin-bottom: 18px; }
        .step-card { background: #070714; border: 1px solid #1e1e3f; border-radius: 14px; padding: 16px; }
        .step-num { width: 26px; height: 26px; border-radius: 999px; display: inline-grid; place-items: center; background: #6366f122; color: #a5b4fc; font-weight: 800; margin-bottom: 10px; }
        .step-card strong { display: block; color: #e2e8f0; margin-bottom: 6px; }
        .step-card span { color: #64748b; font-size: .86em; line-height: 1.55; }
        .prompt-box { background: #050510; border: 1px solid #1e1e3f; border-radius: 12px; padding: 14px 16px; color: #c4b5fd; font-family: 'Courier New', monospace; font-size: .88em; line-height: 1.6; margin: 10px 0 14px; }
        .copy-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .agent-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(210px,1fr)); gap: 12px; margin-top: 14px; }
        .agent-card { display: block; background: #070714; border: 1px solid #1e1e3f; border-radius: 14px; padding: 16px; text-decoration: none; transition: border-color .15s, transform .15s; }
        .agent-card:hover { border-color: #818cf8; transform: translateY(-1px); }
        .agent-name { color: #f8fafc; font-weight: 800; margin-bottom: 6px; display: flex; justify-content: space-between; gap: 8px; }
        .agent-desc { color: #64748b; font-size: .84em; line-height: 1.55; margin-bottom: 12px; }
        .agent-link { color: #a5b4fc; font-size: .82em; font-weight: 800; }
        .sponsored-pill { color: #fbbf24; background: #fbbf2414; border: 1px solid #fbbf2444; border-radius: 999px; padding: 2px 7px; font-size: .7em; white-space: nowrap; }
        .cta-banner { background: linear-gradient(135deg, #0d0d1f, #13103a); border: 1px solid #6366f133; border-radius: 16px; padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 8px; }
        .cta-title { font-weight: 700; color: #e2e8f0; margin: 0 0 4px; }
        .cta-sub { color: #4b5563; font-size: .86em; }
        @media (max-width: 600px) {
          .skill-card { padding: 20px; }
          .skill-title { font-size: 1.5em; }
          .cta-banner { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="skill-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": skill.name || slug,
          "description": skill.description,
          "url": `https://bytesagain.com/skill/${slug}`,
          "applicationCategory": skill.category,
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@type": "Organization", "name": "BytesAgain", "url": "https://bytesagain.com" },
        }) }} />

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="/">BytesAgain</a> › <a href="/skills">Skills</a> › {skill.name || slug}
        </div>

        {/* Main card */}
        <div className="skill-card">
          {/* Header: badge + actions in one row */}
          <div className="skill-header">
            <div className="skill-badges">
              <span className="badge" style={{ color: sm.color, background: sm.bg, borderColor: sm.color + '44' }}>
                {sm.emoji} {sm.label}
              </span>
              {isOurs && (
                <span className="ours-badge">✦ BytesAgain</span>
              )}
            </div>
            <div className="skill-top-actions">
              <SkillActions slug={slug} />
            </div>
          </div>

          {/* Title + owner inline */}
          <h1 className="skill-title">{skill.name || slug}</h1>
          {skill.owner && (
            <p className="skill-owner">by <span>@{skill.owner}</span></p>
          )}

          {/* Description — condensed */}
          <p className="skill-desc">
            {skill.description || `${skill.name || slug} is an AI agent skill. Install it to supercharge your AI workflow.`}
          </p>

          {/* Meta row + tags combined */}
          <div className="skill-meta">
            {skill.version && (
              <div className="meta-item">
                <span className="meta-label">Version</span>
                <span className="meta-value">v{skill.version}</span>
              </div>
            )}
            {(skill.downloads ?? 0) > 0 && (
              <div className="meta-item">
                <span className="meta-label">Downloads</span>
                <span className="meta-value">{skill.downloads?.toLocaleString()}</span>
              </div>
            )}
            {(skill as any).stars > 0 && (
              <div className="meta-item">
                <span className="meta-label">Stars</span>
                <span className="meta-value">⭐ {(skill as any).stars?.toLocaleString()}</span>
              </div>
            )}
            {tags.length > 0 && (
              <div className="meta-item" style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                {tags.slice(0, 5).map(t => (
                  <a key={t} href={`/?q=${encodeURIComponent(t)}`} className="tag">#{t}</a>
                ))}
              </div>
            )}
          </div>

          {/* Install command */}
          {canInstallWithClawHub && (
            <div className="install-box">
              <div className="install-header">
                <div className="install-dots">
                  <div className="dot" style={{ background: '#ff5f57' }} />
                  <div className="dot" style={{ background: '#febc2e' }} />
                  <div className="dot" style={{ background: '#28c840' }} />
                </div>
                <span className="install-label">TERMINAL</span>
                <span style={{ width: 52 }} />
              </div>
              <div className="install-body">
                <code className="install-cmd">$ {installCmd}</code>
                <button className="copy-btn" onClick={undefined}
                  data-cmd={installCmd}>
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Action buttons + disclaimer row */}
          <div className="actions-row" style={{ marginBottom: 12 }}>
            <button className="btn-secondary copy-btn" data-cmd={testPrompt} style={{ cursor: 'pointer' }}>
              Copy test prompt
            </button>
            <a href={`/skills?q=${encodeURIComponent(skill.name || slug)}`} className="btn-secondary">
              Find similar
            </a>
            <a href={externalUrl} target="_blank" rel="noopener" className="btn-secondary">
              Original source
            </a>
          </div>

          <div className="disclaimer" style={{ margin: 0 }}>
            📋 <a href={externalUrl} target="_blank" rel="noopener">{sm.label}</a> indexed summary.{' '}
            BytesAgain keeps discovery on-site. Source ownership remains with the author/platform. Not affiliated.
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT: main content (left) + sidebar (right) */}
        <div className="two-col">
          {/* --- LEFT: Main content --- */}
          <div className="two-col-main">
            <section className="next-step-card">
              <h2 className="next-step-title">Use this skill with your agent</h2>
              <p className="next-step-sub">
                Most visitors already have an agent. Pick your environment, install or copy the workflow, then run the smoke-test prompt above.
              </p>
              <div className="agent-grid">
                {agentOptions.map(agent => (
                  <a
                    key={agent.name}
                    className="agent-card"
                    href={agent.href}
                    target={agent.internal ? undefined : '_blank'}
                    rel={agent.internal ? undefined : agent.sponsored ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
                  >
                    <div className="agent-name">
                      <span>{agent.name}</span>
                      {agent.sponsored && <span className="sponsored-pill">invite</span>}
                    </div>
                    <div className="agent-desc">{agent.desc}</div>
                    <div className="agent-link">{agent.label} →</div>
                  </a>
                ))}
              </div>

              {/* CTA banner inside main content */}
              <div className="cta-banner" style={{ marginTop: 24 }}>
                <div>
                  <p className="cta-title">🔍 Can&apos;t find the right skill?</p>
                  <p className="cta-sub">Search 60,000+ AI agent skills — free, no login needed.</p>
                </div>
                <a href="/" className="btn-primary" style={{ fontSize: '.88em', padding: '10px 22px' }}>
                  Search Skills →
                </a>
              </div>
            </section>

            <section className="next-step-card">
              <h2 className="next-step-title">What to do next</h2>
              <p className="next-step-sub">
                Skills are meant to be used inside your own AI agent. Install it, run a quick smoke test, then ask your agent to apply it to your real task.
              </p>
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-num">1</div>
                  <strong>{canInstallWithClawHub ? 'Install into your agent' : 'Open the source'}</strong>
                  <span>{canInstallWithClawHub ? 'Copy the ClawHub install command and run it where your OpenClaw/agent environment is configured.' : 'This skill is indexed from GitHub. Review the source and copy the SKILL.md into your agent skill folder if compatible.'}</span>
                </div>
                <div className="step-card">
                  <div className="step-num">2</div>
                  <strong>Run a smoke test</strong>
                  <span>Use the test prompt below to confirm the skill loads and understands the workflow before relying on it.</span>
                </div>
                <div className="step-card">
                  <div className="step-num">3</div>
                  <strong>Use it in your own agent</strong>
                  <span>Paste your actual task into Manus, OpenClaw, Claude Code, Cursor, or another agent that supports skills.</span>
                </div>
              </div>
              <div className="prompt-box">{testPrompt}</div>
              <div className="copy-row">
                {canInstallWithClawHub && <button className="copy-btn" data-cmd={installCmd}>Copy install</button>}
                <button className="copy-btn" data-cmd={testPrompt}>Copy test prompt</button>
                <button className="copy-btn" data-cmd={agentConfig}>Copy agent setup</button>
              </div>
            </section>
          </div>

          {/* --- RIGHT: Sidebar --- */}
          <div className="two-col-side">
            <RelatedContent category={skill.category} currentSlug={slug} name={skill.name} tags={tags} />
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        document.querySelectorAll('.copy-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            navigator.clipboard.writeText(cmd).then(() => {
              btn.textContent = 'Copied!';
              setTimeout(() => btn.textContent = 'Copy', 1500);
            });
          });
        });
      `}} />
    </>
  )
}
