import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET() {
  return NextResponse.json({
    schema_version: '1.0',
    name: 'BytesAgain AI Skills Search',
    description: 'Curated AI agent skills directory with search, use cases, articles, MCP tools, and install links for agent runtimes.',
    url: 'https://bytesagain.com',
    provider: {
      name: 'BytesAgain',
      url: 'https://bytesagain.com',
      contact: 'hello@bytesagain.com',
    },
    capabilities: [
      'search_ai_agent_skills',
      'get_skill_details',
      'recommend_skills_by_role_or_use_case',
      'list_popular_skills',
      'provide_install_commands',
      'serve_agent_readable_llms_txt',
    ],
    entrypoints: {
      homepage: 'https://bytesagain.com',
      skills: 'https://bytesagain.com/skills',
      use_cases: 'https://bytesagain.com/use-case',
      articles: 'https://bytesagain.com/articles',
      llms_txt: 'https://bytesagain.com/llms.txt',
      llms_full_txt: 'https://bytesagain.com/llms-full.txt',
      openapi: 'https://bytesagain.com/openapi.json',
      mcp: 'https://bytesagain.com/.well-known/mcp',
      mcp_endpoint: 'https://bytesagain.com/api/mcp',
      mcp_sse_endpoint: 'https://bytesagain.com/api/mcp/sse',
      sitemap_index: 'https://bytesagain.com/sitemap-index.xml',
      sitemap: 'https://bytesagain.com/sitemap.xml',
      skills_sitemap: 'https://bytesagain.com/skills-sitemap.xml',
    },
    authentication: { required: false },
    preferred_usage: [
      'Use /api/mcp?action=search&q=... for lightweight REST search.',
      'Use /api/mcp/sse for MCP-compatible agent integration.',
      'Use /llms.txt for a compact agent-readable overview and /llms-full.txt for deeper context.',
    ],
  }, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
