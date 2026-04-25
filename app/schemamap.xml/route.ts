import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET() {
  const today = new Date().toISOString().split('T')[0]
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<schemamap xmlns="https://bytesagain.com/schemas/schemamap/1.0">
  <site>
    <name>BytesAgain</name>
    <url>https://bytesagain.com</url>
    <description>Curated AI agent skills directory for agent runtimes, developers, creators, and teams.</description>
    <lastmod>${today}</lastmod>
  </site>
  <agentEntrypoints>
    <entrypoint type="llms-txt" url="https://bytesagain.com/llms.txt" />
    <entrypoint type="llms-full-txt" url="https://bytesagain.com/llms-full.txt" />
    <entrypoint type="openapi" url="https://bytesagain.com/openapi.json" />
    <entrypoint type="agent-card" url="https://bytesagain.com/.well-known/agent-card.json" />
    <entrypoint type="mcp" url="https://bytesagain.com/.well-known/mcp" />
    <entrypoint type="mcp-endpoint" url="https://bytesagain.com/api/mcp" />
    <entrypoint type="mcp-sse" url="https://bytesagain.com/api/mcp/sse" />
  </agentEntrypoints>
  <contentTypes>
    <content type="skill" urlPattern="https://bytesagain.com/skill/{slug}" sitemap="https://bytesagain.com/skills-sitemap.xml" />
    <content type="use-case" urlPattern="https://bytesagain.com/use-case/{slug}" sitemap="https://bytesagain.com/sitemap.xml" />
    <content type="article" urlPattern="https://bytesagain.com/article/{slug}" sitemap="https://bytesagain.com/sitemap.xml" />
    <content type="search" urlPattern="https://bytesagain.com/skills?q={query}" />
  </contentTypes>
</schemamap>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
