import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET() {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'BytesAgain AI Skills API',
      version: '1.0.0',
      description: 'Search and retrieve curated AI agent skills from BytesAgain. Optimized for AI agents, MCP clients, and developer tools.',
      contact: { email: 'hello@bytesagain.com', url: 'https://bytesagain.com/contact' },
    },
    servers: [{ url: 'https://bytesagain.com', description: 'Production' }],
    paths: {
      '/api/search': {
        get: {
          operationId: 'searchSkillsWebsite',
          summary: 'Search skills for the website UI',
          description: 'Returns relevant AI agent skills for natural-language queries, including multilingual query expansion.',
          parameters: [
            { name: 'q', in: 'query', required: true, schema: { type: 'string' }, description: 'Search query, e.g. product listing, Superset, 商品描述' },
            { name: 'limit', in: 'query', required: false, schema: { type: 'integer', minimum: 1, maximum: 50, default: 10 } },
          ],
          responses: { '200': { description: 'Search results' } },
        },
      },
      '/api/mcp': {
        get: {
          operationId: 'bytesagainMcpRest',
          summary: 'REST-compatible MCP endpoint',
          description: 'Use action=search|get|popular|recommend to discover or retrieve AI agent skills.',
          parameters: [
            { name: 'action', in: 'query', required: false, schema: { type: 'string', enum: ['search', 'get', 'popular', 'recommend'], default: 'search' } },
            { name: 'q', in: 'query', required: false, schema: { type: 'string' }, description: 'Search query for action=search or recommend' },
            { name: 'slug', in: 'query', required: false, schema: { type: 'string' }, description: 'Skill slug for action=get' },
            { name: 'role', in: 'query', required: false, schema: { type: 'string' }, description: 'Role name for recommendations' },
            { name: 'limit', in: 'query', required: false, schema: { type: 'integer', minimum: 1, maximum: 50, default: 10 } },
          ],
          responses: { '200': { description: 'MCP-compatible JSON response' }, '429': { description: 'Rate limit exceeded' } },
        },
        post: {
          operationId: 'bytesagainMcpJsonRpc',
          summary: 'MCP JSON-RPC endpoint',
          description: 'JSON-RPC compatible MCP endpoint exposing search_skills, get_skill, and popular_skills tools.',
          responses: { '200': { description: 'JSON-RPC response' } },
        },
      },
      '/api/mcp/sse': {
        get: {
          operationId: 'bytesagainMcpSse',
          summary: 'MCP streamable HTTP/SSE endpoint',
          description: 'Streamable HTTP transport for MCP clients such as OpenClaw and other agent runtimes.',
          responses: { '200': { description: 'MCP SSE stream' } },
        },
      },
      '/api/related': {
        get: {
          operationId: 'relatedSkills',
          summary: 'Find related skills',
          parameters: [
            { name: 'slug', in: 'query', required: true, schema: { type: 'string' } },
            { name: 'limit', in: 'query', required: false, schema: { type: 'integer', minimum: 1, maximum: 20, default: 6 } },
          ],
          responses: { '200': { description: 'Related skills' } },
        },
      },
    },
    'x-ai-agent': {
      name: 'BytesAgain',
      llmsTxt: 'https://bytesagain.com/llms.txt',
      llmsFullTxt: 'https://bytesagain.com/llms-full.txt',
      agentCard: 'https://bytesagain.com/.well-known/agent-card.json',
      mcp: 'https://bytesagain.com/.well-known/mcp',
    },
  }

  return NextResponse.json(spec, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
