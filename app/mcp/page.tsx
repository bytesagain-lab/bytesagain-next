import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agent API & MCP — BytesAgain Developer Docs',
  description: 'Connect AI agents to 60,000+ AI skills via MCP streamable HTTP or REST API. 4 tools: search_skills, get_skill, popular_skills, search_use_cases. 7 languages. Free, no auth.',
}

const CODE = {
  mcpConnect: `# OpenClaw
openclaw mcp set bytesagain '{"url":"https://bytesagain.com/api/mcp","transport":"streamable-http"}'

# Claude Desktop (claude_desktop_config.json)
{
  "mcpServers": {
    "bytesagain": {
      "url": "https://bytesagain.com/api/mcp",
      "transport": "streamable-http"
    }
  }
}`,
  mcpSearch: `curl -X POST https://bytesagain.com/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_skills","arguments":{"query":"email automation","limit":5}}}'`,
  mcpGet: `curl -X POST https://bytesagain.com/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_skill","arguments":{"slug":"chart-generator"}}}'`,
  mcpPopular: `curl -X POST https://bytesagain.com/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"popular_skills","arguments":{"limit":10}}}'`,
  mcpUseCases: `curl -X POST https://bytesagain.com/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_use_cases","arguments":{"query":"write weekly reports","limit":5}}}'`,
  restUseCases: `GET https://bytesagain.com/api/mcp?action=use_cases&q=weekly+report&limit=5`,
  restSearch: `# English
GET https://bytesagain.com/api/mcp?action=search&q=data+analysis&limit=10

# Chinese (中文)
GET https://bytesagain.com/api/mcp?action=search&q=数据分析&limit=10

# Japanese (日本語)
GET https://bytesagain.com/api/mcp?action=search&q=データ分析&limit=10`,
  restGet: `GET https://bytesagain.com/api/mcp?action=get&slug=chart-generator`,
  restPopular: `GET https://bytesagain.com/api/mcp?action=popular&limit=20`,
  searchResponse: `{
  "action": "search",
  "query": "email automation",
  "count": 5,
  "results": [
    {
      "slug": "email-automation",
      "name": "Email Automation",
      "description": "Automate email workflows with AI...",
      "category": "email-marketing",
      "tags": ["email", "automation", "workflow"],
      "downloads": 8750,
      "stars": 42,
      "source": "clawhub",
      "source_url": "https://clawhub.ai/skills/email-automation"
    }
  ]
}`,
  getResponse: `{
  "action": "get",
  "slug": "chart-generator",
  "skill": {
    "slug": "chart-generator",
    "name": "Chart Generator",
    "description": "Generate charts and visualizations from data...",
    "category": "data",
    "tags": ["chart", "visualization", "data"],
    "version": "2.1.0",
    "author": "bytesagain1",
    "downloads": 14200,
    "stars": 87,
    "source": "clawhub",
    "source_url": "https://clawhub.ai/skills/chart-generator",
    "install": "clawhub install chart-generator"
  }
}`,
}

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div style={{ background: '#050510', borderRadius: 8, padding: '16px' }}>
      {label && <div style={{ color: '#555', fontSize: '.75em', marginBottom: 6 }}>{label}</div>}
      <pre style={{ margin: 0, color: '#a0a0c0', fontSize: '.85em', lineHeight: 1.7, overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {children}
      </pre>
    </div>
  )
}

function Section({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} style={{ marginBottom: 56 }}>
      <h2 style={{ fontSize: '1.1em', color: '#667eea', marginBottom: 20, textTransform: 'uppercase', letterSpacing: '.1em' }}>{title}</h2>
      {children}
    </section>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a0a1a', border: '1px solid #1a1a3e', borderRadius: 12, padding: '24px', marginBottom: 16 }}>
      {children}
    </div>
  )
}

function ToolCard({ name, badge, desc, when, params, returns, example, response }: {
  name: string; badge: string; desc: string; when: string;
  params: { name: string; type: string; required: boolean; desc: string }[];
  returns: string; example: string; response: string;
}) {
  const badgeColor = badge === 'A' ? '#22c55e' : badge === 'B' ? '#3b82f6' : '#f59e0b'
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <code style={{ color: '#00d4ff', fontSize: '1em', fontWeight: 700 }}>{name}</code>
        <span style={{ background: badgeColor + '22', border: `1px solid ${badgeColor}44`, color: badgeColor, borderRadius: 6, padding: '1px 10px', fontSize: '.8em', fontWeight: 700 }}>{badge}</span>
      </div>
      <p style={{ color: '#888', fontSize: '.9em', lineHeight: 1.7, margin: '0 0 16px' }}>{desc}</p>
      <p style={{ color: '#555', fontSize: '.85em', margin: '0 0 16px' }}>
        <span style={{ color: '#667eea' }}>When to use:</span> {when}
      </p>
      <div style={{ marginBottom: 16 }}>
        <div style={{ color: '#555', fontSize: '.8em', marginBottom: 8 }}>Parameters</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82em' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1a1a3e' }}>
              {['Name', 'Type', 'Required', 'Description'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '4px 8px', color: '#555', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {params.map(p => (
              <tr key={p.name} style={{ borderBottom: '1px solid #0f0f23' }}>
                <td style={{ padding: '6px 8px', color: '#a0a0c0', fontFamily: 'monospace' }}>{p.name}</td>
                <td style={{ padding: '6px 8px', color: '#667eea' }}>{p.type}</td>
                <td style={{ padding: '6px 8px', color: p.required ? '#f59e0b' : '#555' }}>{p.required ? 'Yes' : 'No'}</td>
                <td style={{ padding: '6px 8px', color: '#666' }}>{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ color: '#555', fontSize: '.85em', margin: '0 0 12px' }}>
        <span style={{ color: '#667eea' }}>Returns:</span> {returns}
      </p>
      <CodeBlock label="Example (MCP)">{example}</CodeBlock>
      <div style={{ marginTop: 8 }}>
        <CodeBlock label="Response">{response}</CodeBlock>
      </div>
    </Card>
  )
}

export default function McpDocsPage() {
  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px', color: '#e0e0e0', fontFamily: 'monospace' }}>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <span style={{ fontSize: '.8em', color: '#667eea', background: '#667eea18', border: '1px solid #667eea44', borderRadius: 20, padding: '3px 12px' }}>
          Developer Docs
        </span>
        <h1 style={{ fontSize: 'clamp(1.6em,4vw,2.2em)', fontWeight: 900, margin: '16px 0 8px', color: '#fff' }}>
          BytesAgain Agent API
        </h1>
        <p style={{ color: '#888', fontSize: '1em', lineHeight: 1.7, maxWidth: 640 }}>
          Connect your AI agent to 60,000+ indexed skills via MCP streamable HTTP or REST API.
          4 tools: <code style={{ color: '#00d4ff' }}>search_skills</code>, <code style={{ color: '#00d4ff' }}>get_skill</code>, <code style={{ color: '#00d4ff' }}>popular_skills</code>, <code style={{ color: '#00d4ff' }}>search_use_cases</code>.
          Supports 7 languages. Free, no auth required.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ padding: '6px 14px', background: '#00d4ff18', border: '1px solid #00d4ff44', borderRadius: 8, fontSize: '.8em', color: '#00d4ff' }}>✦ Free</span>
          <span style={{ padding: '6px 14px', background: '#00d4ff18', border: '1px solid #00d4ff44', borderRadius: 8, fontSize: '.8em', color: '#00d4ff' }}>No auth required</span>
          <span style={{ padding: '6px 14px', background: '#00d4ff18', border: '1px solid #00d4ff44', borderRadius: 8, fontSize: '.8em', color: '#00d4ff' }}>CORS enabled</span>
          <span style={{ padding: '6px 14px', background: '#667eea18', border: '1px solid #667eea44', borderRadius: 8, fontSize: '.8em', color: '#667eea' }}>MCP 2024-11-05</span>
          <span style={{ padding: '6px 14px', background: '#22c55e18', border: '1px solid #22c55e44', borderRadius: 8, fontSize: '.8em', color: '#22c55e' }}>✓ Glama Verified</span>
        </div>
      </div>

      {/* Quick Connect */}
      <Section title="Quick Connect" id="connect">
        <Card>
          <p style={{ color: '#888', fontSize: '.9em', margin: '0 0 16px' }}>
            MCP endpoint (streamable HTTP, works with all MCP 2024-11-05 clients):
          </p>
          <div style={{ marginBottom: 16, padding: '12px 16px', background: '#050510', borderRadius: 8 }}>
            <code style={{ color: '#00d4ff', fontSize: '.95em' }}>https://bytesagain.com/api/mcp</code>
          </div>
          <CodeBlock label="OpenClaw / Claude Desktop">{CODE.mcpConnect}</CodeBlock>
          <div style={{ marginTop: 12, padding: '10px 16px', background: '#1a1000', border: '1px solid #f59e0b33', borderRadius: 8, fontSize: '.83em', color: '#888' }}>
            ⚠️ In sandboxed environments, use the <a href="#rest" style={{ color: '#f59e0b', textDecoration: 'none' }}>REST API</a> instead.
          </div>
        </Card>
      </Section>

      {/* Tools */}
      <Section title="Available Tools" id="tools">
        <ToolCard
          name="search_skills"
          badge="A"
          desc="Search 60,000+ AI agent skills by keyword or natural language query. Supports 7 languages: English, Chinese (中文), Japanese (日本語), Korean (한국어), German, French, Portuguese/Spanish. Results are ranked by relevance then download count."
          when="User wants to find or discover skills for a specific task. Start here before using get_skill."
          params={[
            { name: 'query', type: 'string', required: false, desc: 'Keyword in any supported language. E.g. "email automation" or "邮件自动化"' },
            { name: 'limit', type: 'number', required: false, desc: 'Results to return. Default: 10. Max: 50.' },
          ]}
          returns="Array of skills with: slug, name, description, category, tags, downloads, stars, source, source_url."
          example={CODE.mcpSearch}
          response={CODE.searchResponse}
        />
        <ToolCard
          name="get_skill"
          badge="B"
          desc="Fetch complete details for a single skill by its unique slug. Returns full metadata including version, author, install command, and source URL. Use after search_skills when the user wants more info about a specific skill."
          when="User has a specific skill slug (from search results) and wants full details or install instructions."
          params={[
            { name: 'slug', type: 'string', required: true, desc: 'Unique skill identifier from search results. E.g. "chart-generator"' },
          ]}
          returns="Full skill object: slug, name, description, category, tags, version, author, downloads, stars, source, source_url, install command. Returns error if slug not found."
          example={CODE.mcpGet}
          response={CODE.getResponse}
        />
        <ToolCard
          name="popular_skills"
          badge="B"
          desc="Get the most popular AI agent skills ranked by total download count. Ideal for onboarding users or showing what skills others are using most — without needing a specific search term."
          when="User wants to discover trending or widely-used skills without a specific topic in mind. Great for first-time users."
          params={[
            { name: 'limit', type: 'number', required: false, desc: 'Number of top skills to return. Default: 20. Max: 50.' },
          ]}
          returns="Array of top skills with: slug, name, description, category, downloads, stars, source. Sorted by download count descending."
          example={CODE.mcpPopular}
          response={`{"action":"popular","count":3,"results":[{"slug":"chart-generator","name":"Chart Generator","downloads":14200},...]}`}
        />
        <ToolCard
          name="search_use_cases"
          badge="NEW"
          desc="Search 342 real-world AI use-cases by task or goal. Each use-case links to a curated page of the best skills for that workflow. Use when the user describes what they want to accomplish rather than naming a specific tool."
          when="User says 'how do I use AI to write weekly reports' or 'what can AI do for my workflow'. Use BEFORE search_skills when the goal is unclear."
          params={[
            { name: 'query', type: 'string', required: true, desc: 'Task or goal in natural language. Example: \"write job descriptions\", \"analyze sales data\".' },
            { name: 'limit', type: 'number', required: false, desc: 'Number of use-cases to return. Default: 10. Max: 30.' },
          ]}
          returns="Array of matching use-cases with: slug, title, description, url (bytesagain.com/use-case/slug). Combine with search_skills to find tools for each use-case."
          example={CODE.mcpUseCases}
          response={`{"action":"use_cases","count":3,"results":[{"slug":"weekly-report","title":"Write Weekly Reports","url":"https://bytesagain.com/use-case/weekly-report"},...]}`}
        />
      </Section>

      {/* REST API */}
      <Section title="REST API (Sandbox-friendly)" id="rest">
        <p style={{ color: '#888', fontSize: '.9em', marginBottom: 16 }}>
          Simple GET requests. No client library, no streaming. Works in any environment including sandboxed agents.
          Same 7-language support as MCP tools.
        </p>
        <Card>
          <div style={{ marginBottom: 8, color: '#555', fontSize: '.8em' }}>Search (action=search)</div>
          <CodeBlock>{CODE.restSearch}</CodeBlock>
        </Card>
        <Card>
          <div style={{ marginBottom: 8, color: '#555', fontSize: '.8em' }}>Get skill details (action=get)</div>
          <CodeBlock>{CODE.restGet}</CodeBlock>
        </Card>
        <Card>
          <div style={{ marginBottom: 8, color: '#555', fontSize: '.8em' }}>Popular skills (action=popular)</div>
          <CodeBlock>{CODE.restPopular}</CodeBlock>
        </Card>
        <Card>
          <div style={{ marginBottom: 8, color: '#555', fontSize: '.8em' }}>Recommendations by role (action=recommend)</div>
          <CodeBlock>{'GET https://bytesagain.com/api/mcp?action=recommend&role=developer&limit=10\n# role options: developer | creator | trader | marketer | student'}</CodeBlock>
        </Card>
      </Section>

      {/* Languages */}
      <Section title="Language Support">
        <Card>
          <p style={{ color: '#888', fontSize: '.9em', margin: '0 0 16px' }}>
            Search queries are automatically detected and translated to English internally. You can search in any of these languages:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {[
              { flag: '🇺🇸', lang: 'English', example: 'email automation' },
              { flag: '🇨🇳', lang: 'Chinese 中文', example: '邮件自动化' },
              { flag: '🇯🇵', lang: 'Japanese 日本語', example: 'メール自動化' },
              { flag: '🇰🇷', lang: 'Korean 한국어', example: '이메일 자동화' },
              { flag: '🇩🇪', lang: 'German', example: 'E-Mail-Automatisierung' },
              { flag: '🇫🇷', lang: 'French', example: 'automatisation email' },
              { flag: '🇪🇸', lang: 'Portuguese/Spanish', example: 'automatización email' },
            ].map(l => (
              <div key={l.lang} style={{ background: '#050510', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: '.85em', color: '#a0a0c0', marginBottom: 4 }}>{l.flag} {l.lang}</div>
                <code style={{ fontSize: '.78em', color: '#667eea' }}>{l.example}</code>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* llms.txt */}
      <Section title="LLMs.txt">
        <Card>
          <p style={{ color: '#888', fontSize: '.9em', margin: '0 0 12px' }}>Machine-readable skill index for LLM context injection:</p>
          <a href="/llms-full.txt" style={{ color: '#00d4ff', textDecoration: 'none', fontSize: '.9em' }}>
            https://bytesagain.com/llms-full.txt →
          </a>
        </Card>
      </Section>

      <div style={{ borderTop: '1px solid #1a1a3e', paddingTop: 32, color: '#444', fontSize: '.85em' }}>
        Built by <a href="https://bytesagain.com" style={{ color: '#667eea', textDecoration: 'none' }}>BytesAgain</a> · 60,000+ indexed skills · 7 languages · Free forever ·{' '}
        <a href="https://glama.ai/mcp/connectors/com.bytesagain/bytes-again-ai-skills-search" target="_blank" rel="noopener noreferrer" style={{ color: '#22c55e', textDecoration: 'none' }}>Glama Verified ✓</a>
      </div>
    </main>
  )
}
