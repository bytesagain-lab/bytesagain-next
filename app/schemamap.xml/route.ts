import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<schemamap xmlns="https://nlweb.ai/schemamap">
  <feed>
    <name>BytesAgain Skills API</name>
    <url>https://bytesagain.com/api/search?q=*&amp;limit=50</url>
    <format>application/json</format>
    <schema>https://schema.org/SoftwareApplication</schema>
    <description>Search 60,000+ verified AI agent skills from BytesAgain, ClawHub, LobeHub, Dify, MCP, and official sources.</description>
  </feed>
  <feed>
    <name>BytesAgain Use Cases API</name>
    <url>https://bytesagain.com/api/mcp?action=use_cases&amp;q=*&amp;limit=50</url>
    <format>application/json</format>
    <schema>https://schema.org/HowTo</schema>
    <description>Search curated workflow/use-case pages that map tasks to recommended AI agent skills.</description>
  </feed>
  <feed>
    <name>BytesAgain GitHub Indexed Skills API</name>
    <url>https://bytesagain.com/api/github-skills?q=*&amp;limit=50</url>
    <format>application/json</format>
    <schema>https://schema.org/SoftwareSourceCode</schema>
    <description>Lower-trust GitHub-indexed SKILL.md metadata for long-tail discovery. Entries are labeled as GitHub indexed and not verified by BytesAgain.</description>
  </feed>
  <feed>
    <name>BytesAgain OpenAPI Specification</name>
    <url>https://bytesagain.com/openapi.json</url>
    <format>application/json</format>
    <schema>https://spec.openapis.org/oas/3.0</schema>
    <description>OpenAPI specification for BytesAgain public search and discovery APIs.</description>
  </feed>
  <feed>
    <name>BytesAgain MCP Server Manifest</name>
    <url>https://bytesagain.com/.well-known/mcp</url>
    <format>application/json</format>
    <description>Model Context Protocol manifest for AI agents that want to search skills and use cases.</description>
  </feed>
</schemamap>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
