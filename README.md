# BytesAgain — AI Agent Skill Discovery

> Find the right AI agent skill for any job. Browse 43,000+ curated skills from ClawHub, LobeHub, Dify and more.

**🌐 [bytesagain.com](https://bytesagain.com?utm_source=github&utm_medium=readme&utm_campaign=organic)**

---

## What is BytesAgain?

BytesAgain is a curated directory for AI agent skills — think "npm for AI agents". Instead of building from scratch, find and install pre-built skills for your workflow:

- 🤖 **43,000+ skills** from ClawHub, LobeHub, Dify, and GitHub
- 🎯 **Role-based discovery** — pick your role, get the right stack
- 🔍 **Use-case driven search** — describe what you want to do, find the skill
- 🧠 **Vector search** — semantic matching beyond keywords

## Quick Links

| | |
|---|---|
| 🔍 Browse all skills | [bytesagain.com/skills](https://bytesagain.com/skills?utm_source=github&utm_medium=readme&utm_campaign=skills) |
| 🎯 Browse by use case | [bytesagain.com/use-case](https://bytesagain.com/use-case?utm_source=github&utm_medium=readme&utm_campaign=usecase) |
| 🤖 MCP API | [bytesagain.com/api/mcp](https://bytesagain.com/api/mcp?utm_source=github&utm_medium=readme&utm_campaign=mcp) |
| 📦 Install a skill | [bytesagain.com/install](https://bytesagain.com/install?utm_source=github&utm_medium=readme&utm_campaign=install) |

## MCP API

BytesAgain exposes a MCP-compatible API for AI agents and tools:

```bash
# Search skills
GET https://bytesagain.com/api/mcp?action=search&query=code+review

# Get recommendations by role
GET https://bytesagain.com/api/mcp?action=recommend&role=developer

# Get skill details
GET https://bytesagain.com/api/mcp?action=get&slug=code-generator
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL + pgvector)
- **Embeddings**: Dashscope text-embedding-v3 (1024-dim)
- **Hosting**: Vercel + Singapore Caddy proxy
- **Search**: Full-text + vector semantic search

## Data Sources

| Source | Count | Type |
|--------|-------|------|
| ClawHub | ~42,000 | CLI skills |
| GitHub | ~6,000 | Open source skills |
| LobeHub | 500 | AI agents |
| Dify | 148 | Plugins |
| Original | 20+ | BytesAgain originals |

---

Built with ❤️ by [BytesAgain](https://bytesagain.com?utm_source=github&utm_medium=readme&utm_campaign=footer)
