import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET() {
  return NextResponse.json({
    name: 'bytesagain',
    title: 'BytesAgain AI Skills Search',
    description: 'Search and retrieve curated AI agent skills through MCP.',
    protocol: 'mcp',
    transports: {
      streamable_http: {
        url: 'https://bytesagain.com/api/mcp/sse',
      },
      http_json: {
        url: 'https://bytesagain.com/api/mcp',
      },
    },
    tools: [
      {
        name: 'search_skills',
        description: 'Search AI agent skills by natural-language query.',
        input_schema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Search query' },
            limit: { type: 'integer', minimum: 1, maximum: 50, default: 10 },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_skill',
        description: 'Get full details for a skill by slug.',
        input_schema: {
          type: 'object',
          properties: { slug: { type: 'string' } },
          required: ['slug'],
        },
      },
      {
        name: 'popular_skills',
        description: 'Return popular skills ranked by downloads.',
        input_schema: {
          type: 'object',
          properties: { limit: { type: 'integer', minimum: 1, maximum: 50, default: 10 } },
        },
      },
    ],
    documentation: 'https://bytesagain.com/mcp',
    openapi: 'https://bytesagain.com/openapi.json',
  }, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
