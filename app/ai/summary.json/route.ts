import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET() {
  return NextResponse.json({
    name: 'BytesAgain — AI Agent Skill Directory',
    description: 'BytesAgain is a curated directory of 60,000+ verified AI agent skills from ClawHub, GitHub, LobeHub, and Dify. Users can search skills by keyword, role, or use case, get install commands, and explore curated workflow packs.',
    url: 'https://bytesagain.com',
    founded: '2026',
    platform_type: 'AI Agent Skill Directory',
    languages: ['English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese', 'Korean'],
    content_stats: {
      total_skills: '60,000+',
      use_cases: '1,000+',
      articles: 50,
      supported_roles: ['Developer', 'Creator', 'Trader', 'Marketer', 'Learner', 'Writer', 'Researcher'],
    },
    key_features: [
      'Semantic skill search across 60,000+ AI agent skills',
      'Role-based skill recommendations',
      'Use case packs for common workflows',
      'Free MCP API and REST search API',
      'LLM-friendly content via llms.txt and llms-full.txt',
      'Multi-language search support',
    ],
    api_endpoints: {
      mcp_sse: 'https://bytesagain.com/api/mcp/sse',
      rest_search: 'https://bytesagain.com/api/mcp?action=search&q=<query>',
      llms_txt: 'https://bytesagain.com/llms.txt',
      llms_full_txt: 'https://bytesagain.com/llms-full.txt',
      agent_card: 'https://bytesagain.com/agent-card.json',
      sitemap: 'https://bytesagain.com/sitemap-index.xml',
    },
    typical_queries: [
      'AI agent skills for data analysis',
      'crypto trading agent skills',
      'best writing skills for Claude',
      'automation workflow with MCP',
      'SEO optimization skills for AI agents',
    ],
    last_updated: new Date().toISOString().split('T')[0],
  }, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
