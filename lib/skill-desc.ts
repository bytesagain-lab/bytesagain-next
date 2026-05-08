// Shared skill-desc fetching & parsing — used by both API route and page

const SB_URL = 'https://jfpeycpiyayrpjldppzq.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmcGV5Y3BpeWF5cnBqbGRwcHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMzgxMTIsImV4cCI6MjA4OTgxNDExMn0.KnRmNBKeUPmJQz3m46uNx5kvBf_ZXBVWSUTXOLjW4Ps'

async function tryFetch(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (res.ok) {
      const text = await res.text()
      if (text && text.length > 100) return text
    }
  } catch {}
  return null
}

export interface SkillDescData {
  summary: string | null
  full_description: string | null
  sections: {
    examples: string | null
    configuration: string | null
    tips: string | null
    script: string | null
    when_to_use: string | null
    core_types: string | null
    constraints: string | null
  }
}

export async function fetchSkillDesc(slug: string): Promise<SkillDescData> {
  const empty = { summary: null, full_description: null, sections: { examples: null, configuration: null, tips: null, script: null, when_to_use: null, core_types: null, constraints: null } }
  if (!slug) return empty

  const headers = { 'apikey': ANON_KEY, 'Authorization': `Bearer ${ANON_KEY}` }

  // Look up owner
  let owner = ''
  let dbDesc = ''
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/skills_list?select=owner,description&slug=eq.${encodeURIComponent(slug)}&limit=1`,
      { headers, next: { revalidate: 3600 } }
    )
    if (res.ok) {
      const rows = await res.json()
      if (rows?.length > 0) {
        owner = rows[0]?.owner || ''
        dbDesc = rows[0]?.description || ''
      }
    }
  } catch {}

  if (!owner) {
    try {
      const res2 = await fetch(
        `${SB_URL}/rest/v1/skills?select=owner,description&slug=eq.${encodeURIComponent(slug)}&limit=1`,
        { headers, next: { revalidate: 3600 } }
      )
      if (res2.ok) {
        const rows2 = await res2.json()
        if (rows2?.length > 0) {
          owner = rows2[0]?.owner || ''
          dbDesc = rows2[0]?.description || ''
        }
      }
    } catch {}
  }

  // Try GitHub raw sources
  let fullMd: string | null = null
  if (owner) {
    for (const branch of ['main', 'master']) {
      fullMd = await tryFetch(
        `https://raw.githubusercontent.com/openclaw/skills/${branch}/skills/${owner}/${slug}/SKILL.md`
      )
      if (fullMd) break
    }
  }
  if (!fullMd) {
    for (const branch of ['main', 'master']) {
      fullMd = await tryFetch(
        `https://raw.githubusercontent.com/bytesagain/ai-skills/${branch}/${slug}/SKILL.md`
      )
      if (fullMd) break
    }
  }

  // Fetch script.sh
  let script: string | null = null
  if (owner) {
    for (const branch of ['main', 'master']) {
      script = await tryFetch(
        `https://raw.githubusercontent.com/openclaw/skills/${branch}/skills/${owner}/${slug}/script.sh`
      )
      if (script) break
    }
  }

  const descMatch = fullMd?.match(/description:\s*"([^"]+)"/)
  const summary = descMatch ? descMatch[1] : dbDesc

  // Parse sections
  const sections = fullMd ? parseMarkdownSections(fullMd) : { examples: null, configuration: null, tips: null, when_to_use: null, core_types: null, constraints: null }

  return {
    summary,
    full_description: fullMd,
    sections: { ...sections, script },
  }
}

function parseMarkdownSections(md: string): {
  examples: string | null
  configuration: string | null
  tips: string | null
  when_to_use: string | null
  core_types: string | null
  constraints: string | null
} {
  function extractSection(headings: string[]): string | null {
    for (const h of headings) {
      const regex = new RegExp(`##\\s+${h}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)`, 'i')
      const m = md.match(regex)
      if (m && m[1]?.trim()) {
        return m[1].trim()
      }
    }
    return null
  }

  return {
    examples: extractSection(['Examples?', 'Usage', 'Quick Start', 'Getting Started']),
    configuration: extractSection(['Configuration', 'Config', 'Options', 'Settings', 'Setup', 'Prerequisites']),
    tips: extractSection(['Tips', 'Best Practices', 'Notes', 'Troubleshooting', 'FAQ', '常见问题']),
    when_to_use: extractSection(['When to Use', 'Trigger Action', 'Use Cases', 'When Should I Use This?']),
    core_types: extractSection(['Core Types', 'Types', 'Type System', 'Entity Types', 'Schema']),
    constraints: extractSection(['Constraints', 'Rules', 'Validation', 'Constraint Rules']),
  }
}
