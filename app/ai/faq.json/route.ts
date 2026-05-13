import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET() {
  return NextResponse.json({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is BytesAgain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BytesAgain is a free, curated directory of 60,000+ AI agent skills for Claude, ChatGPT, Cursor, OpenClaw, and more. Users search, browse by role, or explore use cases to find the right skills for their workflow."
        }
      },
      {
        "@type": "Question",
        "name": "How do I search for AI agent skills on BytesAgain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Search by natural language on bytesagain.com in 7 languages. You can also browse by role (developer, creator, trader, marketer) or by use case (build a SaaS, crypto research, data analysis)."
        }
      },
      {
        "@type": "Question",
        "name": "Is BytesAgain free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, access to skils, use cases, articles, and the MCP API is completely free. No registration required for searching."
        }
      },
      {
        "@type": "Question",
        "name": "Does BytesAgain have an API for AI agents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. BytesAgain provides a free MCP-compatible API via SSE at /api/mcp/sse, plus a REST search endpoint at /api/mcp?action=search&q=<query>. No authentication required."
        }
      },
      {
        "@type": "Question",
        "name": "What is the MCP protocol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MCP (Model Context Protocol) is an open standard by Anthropic that lets AI agents connect to external tools and data sources. BytesAgain's MCP endpoint lets agents search skills, get skill details, and list popular skills directly."
        }
      },
      {
        "@type": "Question",
        "name": "What types of AI agent skills are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Skills cover development (coding, debugging, API tools), content creation (writing, image generation, video), data analysis (spreadsheets, databases, visualization), trading (crypto, stocks), automation (workflows, scheduling), research, and more."
        }
      },
      {
        "@type": "Question",
        "name": "Where do BytesAgain skills come from?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Skills are sourced from ClawHub (official registry), GitHub (open-source agent skills), LobeHub, Dify, and other major AI agent platforms. All skills are verified and tracked for downloads and quality."
        }
      },
      {
        "@type": "Question",
        "name": "Can AI LLMs read my content from BytesAgain?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. BytesAgain explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) via robots.txt. The site also provides llms.txt, llms-full.txt, and structured JSON endpoints designed for LLM consumption."
        }
      },
      {
        "@type": "Question",
        "name": "How many use cases does BytesAgain have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BytesAgain has over 1,000 curated use cases, each with 3-5 recommended skills plus a rationale. Use cases span SaaS, ecommerce, content creation, crypto, data science, education, health, travel, and more."
        }
      },
      {
        "@type": "Question",
        "name": "Does BytesAgain offer GEO optimization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. BytesAgain is designed for Generative Engine Optimization (GEO), with AI-friendly robots.txt, llms.txt, llms-full.txt, well-known/ai.txt, structured JSON endpoints, and comprehensive JSON-LD schema markup."
        }
      }
    ]
  }, {
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
