import { NextRequest, NextResponse } from 'next/server'

const SKILL_MD = `---
name: bytesagain-finder
version: 1.0.0
description: >
  Search and discover AI agent skills from BytesAgain.com — a curated index of
  43,000+ skills from ClawHub, LobeHub, Dify, and GitHub. Find the right skill
  for any task: automation, writing, coding, data analysis, CRM, and more.
author: bytesagain
homepage: https://bytesagain.com
---

# BytesAgain Skill Finder

Search 43,000+ curated AI agent skills from BytesAgain.com.

## Commands

### search — Find skills by keyword or task description
\`\`\`bash
bash script.sh search "write weekly report"
bash script.sh search "email automation"
bash script.sh search "数据分析"
\`\`\`

### popular — Browse top downloaded skills
\`\`\`bash
bash script.sh popular
bash script.sh popular devtools
\`\`\`

### get — Get details and install command for a specific skill
\`\`\`bash
bash script.sh get chart-generator
\`\`\`

### recommend — Get skill recommendations for a role
\`\`\`bash
bash script.sh recommend "project manager"
\`\`\`

## Privacy
- Only your search query is sent to bytesagain.com/api/mcp
- No agent identity or personal data is transmitted
- Free to use

## Requirements
- curl, python3, internet connection
`

const SCRIPT_SH = `#!/usr/bin/env bash
# BytesAgain Skill Finder — search 43,000+ AI agent skills
# Usage: script.sh <command> [args]
# API: https://bytesagain.com/api/mcp

set -euo pipefail

API="https://bytesagain.com/api/mcp"

usage() {
  echo "BytesAgain Skill Finder — 43,000+ AI agent skills"
  echo ""
  echo "Usage:"
  echo "  script.sh search <query>          Search skills by keyword or task"
  echo "  script.sh popular [category]      Browse popular skills"
  echo "  script.sh get <slug>              Get skill details + install command"
  echo "  script.sh recommend <role>        Get skills for a role or use case"
}

format_results() {
  local json_input="$1"
  python3 -u -c "
import sys, json
raw = sys.argv[1]
try:
    data = json.loads(raw)
except:
    print('Error parsing response')
    sys.exit(1)
results = data.get('results', data.get('skills', []))
if not results:
    print('No skills found. Visit: https://bytesagain.com/skills')
    sys.exit(0)
print(f'Found {len(results)} skill(s):\\n')
for i, s in enumerate(results, 1):
    slug = s.get('slug', '')
    name = s.get('name', slug)
    desc = s.get('description', '')
    downloads = s.get('downloads', 0)
    source = s.get('source', s.get('_source', 'clawhub'))
    if len(desc) > 120:
        desc = desc[:117] + '...'
    print(f'{i}. {name}')
    if desc:
        print(f'   {desc}')
    if downloads:
        print(f'   📥 {downloads:,} downloads')
    print(f'   🔗 https://bytesagain.com/skill/{slug}')
    if source == 'clawhub':
        print(f'   ⚡ Install: clawhub install {slug}')
    print()
" "$json_input"
}

encode_url() {
  python3 -c "import urllib.parse, sys; print(urllib.parse.quote(sys.argv[1]))" "$1"
}

cmd="\${1:-help}"
shift || true

case "$cmd" in
  search)
    query="\${*:-}"
    if [[ -z "$query" ]]; then echo "Error: provide a search query"; exit 1; fi
    echo "🔍 Searching BytesAgain for: $query"; echo ""
    encoded=$(encode_url "$query")
    result=$(curl -sf "\${API}?action=search&q=\${encoded}&limit=6" -H "User-Agent: bytesagain-finder/1.0.0")
    format_results "$result"
    ;;
  popular)
    category="\${*:-}"
    echo "🌟 Popular skills on BytesAgain\${category:+ — $category}"; echo ""
    if [[ -n "$category" ]]; then
      encoded=$(encode_url "$category")
      result=$(curl -sf "\${API}?action=popular&category=\${encoded}&limit=8" -H "User-Agent: bytesagain-finder/1.0.0")
    else
      result=$(curl -sf "\${API}?action=popular&limit=8" -H "User-Agent: bytesagain-finder/1.0.0")
    fi
    format_results "$result"
    ;;
  get)
    slug="\${*:-}"
    if [[ -z "$slug" ]]; then echo "Error: provide a skill slug"; exit 1; fi
    echo "📦 Skill details: $slug"; echo ""
    result=$(curl -sf "\${API}?action=get&slug=\${slug}" -H "User-Agent: bytesagain-finder/1.0.0")
    python3 -u -c "
import sys, json
raw = sys.argv[1]
try:
    data = json.loads(raw)
except:
    print('Error'); sys.exit(1)
if 'error' in data:
    print('Skill not found. Try: script.sh search <keyword>')
    sys.exit(0)
skill = data.get('skill', data)
print(f'Name:      {skill.get(\"name\", \"\")}')
print(f'Slug:      {skill.get(\"slug\", \"\")}')
print(f'URL:       https://bytesagain.com/skill/{skill.get(\"slug\", \"\")}')
desc = skill.get('description', '')
if desc:
    print(f'\\nDescription:\\n  {desc[:300]}')
install = data.get('install', '')
if install:
    print(f'\\nInstall:\\n  {install}')
elif skill.get('source', 'clawhub') == 'clawhub':
    print(f'\\nInstall:\\n  clawhub install {skill.get(\"slug\", \"\")}')
" "$result"
    ;;
  recommend)
    role="\${*:-}"
    if [[ -z "$role" ]]; then echo "Error: provide a role"; exit 1; fi
    echo "💡 Recommendations for: $role"; echo ""
    encoded=$(encode_url "$role")
    result=$(curl -sf "\${API}?action=recommend&role=\${encoded}&limit=6" -H "User-Agent: bytesagain-finder/1.0.0")
    format_results "$result"
    ;;
  *)
    usage
    ;;
esac
`

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get('file') || 'SKILL.md'

  if (file === 'script.sh') {
    return new NextResponse(SCRIPT_SH, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename="script.sh"',
      },
    })
  }

  return new NextResponse(SKILL_MD, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="SKILL.md"',
    },
  })
}
