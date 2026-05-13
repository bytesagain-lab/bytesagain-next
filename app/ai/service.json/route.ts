import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET() {
  return NextResponse.json({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BytesAgain AI Skills Search",
    "url": "https://bytesagain.com",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "description": "A curated search engine for AI agent skills. Supports semantic search in 7 languages, role-based recommendations, use case packs, and a free MCP API for agent integration.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Search 60,000+ AI agent skills",
      "Role-based recommendations (Developer, Creator, Trader, Marketer)",
      "1,000+ curated use case packs",
      "Free MCP API and REST API",
      "Multi-language search (EN, ZH, ES, FR, DE, JA, KO)",
      "LLM-friendly content via llms.txt",
      "Install commands for Claude, Cursor, OpenClaw, Continue"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://bytesagain.com/skills?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "provider": {
      "@type": "Organization",
      "name": "BytesAgain",
      "url": "https://bytesagain.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@bytesagain.com",
        "contactType": "customer support"
      }
    },
    "dateModified": new Date().toISOString().split('T')[0]
  }, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
