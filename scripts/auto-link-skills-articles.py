#!/usr/bin/env python3
"""
auto-link-skills-articles.py

Scans all published posts for skill slugs mentioned in content,
then writes associations into the skill_articles table.

Usage:
    python3 scripts/auto-link-skills-articles.py
"""

import os
import re
import sys
import time
from collections import Counter
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
from urllib.parse import quote

# ── Stoplist ─────────────────────────────────────────────────────────
COMMON_WORDS = {
    'a','an','the','and','or','but','for','nor','yet','so',  # conjunctions
    'is','are','was','were','been','being','be','have','has','had','do','does','did',
    'can','could','will','would','shall','should','may','might','must',
    'in','on','at','to','of','by','with','from','into','through','during',
    'it','its','i','my','me','we','our','us','you','your','he','him','his',
    'she','her','they','them','their','this','that','these','those',
    'up','down','out','off','over','under','again','further','then','once',
    'if','because','as','until','while','after','before','when','where','why','how',
    'all','each','every','both','few','more','most','other','some','such',
    'no','nor','not','only','own','same','too','very','just','also',
    'get','got','use','used','using','set','put','make','made','take','took',
    'work','works','worked','working','need','needs','needed',
    'new','old','good','bad','big','small','high','low','long','short',
    'way','side','part','place','top','bottom','back','front','left','right',
    'one','two','three','four','five','six','seven','eight','nine','ten',
    'first','second','third','last','next','previous','best','better',
    'here','there','now','then','today','yesterday','tomorrow',
    'much','many','some','any','none','nothing','everything',
    'people','thing','things','time','year','day','week','month',
    'analyze','analysis','optimize','optimization','create','generate',
    'manage','monitor','track','report','guide','manual','docs','doc',
    'help','support','build','run','deploy','test','check','view',
    'edit','find','search','add','remove','delete','update',
    'media','social','data','info','news','blog','chat','mail','email',
    'code','app','web','site','page','file','text','image','video','audio',
    'order','reading','events','english','chinese','japanese',
    'menu','list','post','link','share','like','love','care','call',
    'easy','hard','quick','fast','slow','safe','secure','free','paid',
    'auto','manual','simple','complex','basic','advanced',
    'ai','api','url','cli','gui','sdk','ide','html','css','js','json','xml','yaml',
    'ui','ux','db','sql','git','aws','gcp','azure','ssl','tcp','http','dns',
    'mac','pc','ios','android','linux','windows','unix',
}

# ── Config ──────────────────────────────────────────────────────────

ENV_FILE = os.path.expanduser("~/bytesagain-next/.env.local")

def load_env(path=ENV_FILE):
    """Read Supabase config from .env.local."""
    sb_url = None
    sb_key = None
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line.startswith("NEXT_PUBLIC_SUPABASE_URL="):
                sb_url = line.split("=", 1)[1].strip().strip("'\"")
            elif line.startswith("SUPABASE_SERVICE_ROLE_KEY="):
                sb_key = line.split("=", 1)[1].strip().strip("'\"")
    if not sb_url or not sb_key:
        print("ERROR: missing SUPABASE config in .env.local", file=sys.stderr)
        sys.exit(1)
    return sb_url.rstrip("/"), sb_key


def supabase_get(base_url, api_key, table, select="*", limit=1000, offset=0):
    """GET rows from a Supabase table via REST API with pagination."""
    url = (f"{base_url}/rest/v1/{table}"
           f"?select={quote(select, safe='')}"
           f"&limit={limit}&offset={offset}")
    req = Request(url, headers={
        "apikey": api_key,
        "Authorization": f"Bearer {api_key}",
    })
    resp = urlopen(req, timeout=30)
    return resp  # caller reads JSON


def supabase_post(base_url, api_key, table, rows, merge=False):
    """POST rows to a Supabase table. Returns parsed JSON body or None."""
    url = f"{base_url}/rest/v1/{table}"
    headers = {
        "apikey": api_key,
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    if merge:
        headers["Prefer"] = "resolution=merge-duplicates"
    import json
    body = json.dumps(rows).encode("utf-8")
    req = Request(url, data=body, headers=headers, method="POST")
    resp = urlopen(req, timeout=60)
    data = resp.read()
    return json.loads(data) if data else None


def fetch_all_posts(base_url, api_key):
    """Yield (slug, title, content) for every published post."""
    import json
    offset = 0
    limit = 1000
    total = 0
    while True:
        print(f"  ├─ fetching posts offset={offset} …", flush=True)
        resp = supabase_get(base_url, api_key, "posts",
                            select="slug,title,content",
                            limit=limit, offset=offset)
        rows = json.loads(resp.read())
        if not rows:
            break
        for r in rows:
            total += 1
            yield r.get("slug"), r.get("title"), r.get("content") or ""
        if len(rows) < limit:
            break
        offset += limit
    print(f"  └─ total posts fetched: {total}")


def fetch_all_skill_slugs(base_url, api_key):
    """Return a set of active skill slugs (source != banned)."""
    import json
    slugs = set()
    offset = 0
    limit = 10000
    while True:
        print(f"  ├─ fetching skills offset={offset} …", flush=True)
        try:
            resp = supabase_get(base_url, api_key, "skills",
                                select="slug,source",
                                limit=limit, offset=offset)
        except HTTPError as e:
            print(f"ERROR: {e}", file=sys.stderr)
            sys.exit(1)
        rows = json.loads(resp.read())
        if not rows:
            break
        for r in rows:
            if r.get("source") != "banned":
                slugs.add(r["slug"])
        print(f"     batch: {len(rows)} rows, cumulative slugs: {len(slugs)}", flush=True)
        if len(rows) < limit:
            break
        offset += limit
    print(f"  └─ total skill slugs: {len(slugs)}")
    return slugs


def build_search_patterns(slugs_set):
    """
    Sort slugs longest-first to avoid short-slug false matches.
    Build a single compiled regex that matches slugs in URL paths
    OR slugs >= 5 chars that aren't common English words.
    Strategy:
      - URL paths: /skill/<slug> always match
      - Word matches: only match if slug >= 5 chars AND not in stoplist
    """
    # Filter: only slugs that are long enough or not common words
    filtered = set()
    for s in slugs_set:
        slug = s.lower()
        if slug in COMMON_WORDS:
            continue
        if len(slug) >= 5:
            filtered.add(s)
        elif len(slug) >= 4 and '-' in slug:
            # 4-char slugs with hyphens are likely real compound names
            filtered.add(s)
        # < 4 char slugs without hyphens are too risky

    sorted_slugs = sorted(filtered, key=len, reverse=True)
    if not sorted_slugs:
        return [], re.compile(r'(?!)')  # never-match regex

    escaped = [re.escape(s) for s in sorted_slugs]
    patterns = []
    # URL paths: /skill/<slug> or /skills/<slug>
    patterns.append(r'/skills?/(?:' + '|'.join(escaped) + r')\b')
    # Whole word for filtered slugs
    patterns.append(r'\b(?:' + '|'.join(escaped) + r')\b')
    combined = '|'.join(patterns)
    return sorted_slugs, re.compile(combined, re.IGNORECASE)


def find_matching_slugs(content, sorted_slugs, regex):
    """Return set of slugs that appear in content."""
    matches = set(regex.findall(content))
    slugs = set()
    for m in matches:
        m = m.lower()
        if m.startswith('/skill'):
            # Extract slug from URL path: /skill/xxx or /skills/xxx
            slug = m.split('/', 2)[-1]
            slugs.add(slug)
        else:
            slugs.add(m.lower())
    return slugs & set(s.lower() for s in sorted_slugs)


def main():
    base_url, api_key = load_env()
    import json

    print("=" * 60)
    print("auto-link-skills-articles")
    print("=" * 60)

    # ── Step 1: posts ──
    print("\n[1] Fetching published posts …")
    posts = list(fetch_all_posts(base_url, api_key))
    print(f"  → {len(posts)} published posts")

    if not posts:
        print("No published posts found. Exiting.")
        sys.exit(0)

    # ── Step 2: skill slugs ──
    print("\n[2] Fetching skill slugs …")
    slugs_set = fetch_all_skill_slugs(base_url, api_key)
    if not slugs_set:
        print("No skill slugs found. Exiting.")
        sys.exit(0)

    sorted_slugs, search_regex = build_search_patterns(slugs_set)
    print(f"  → regex built with {len(sorted_slugs)} patterns")

    # ── Step 3: scan posts for skill mentions ──
    print("\n[3] Scanning posts for skill mentions …")
    associations = []  # list of (post_slug, skill_slug)
    matched_post_count = 0
    skill_counter = Counter()

    for post_slug, title, content in posts:
        found = find_matching_slugs(content, sorted_slugs, search_regex)
        if found:
            matched_post_count += 1
            for skill_slug in found:
                associations.append({"article_slug": post_slug, "skill_slug": skill_slug})
                skill_counter[skill_slug] += 1

    print(f"  → matched posts: {matched_post_count}/{len(posts)}")
    print(f"  → total associations: {len(associations)}")

    # ── Step 4: write to skill_articles ──
    if not associations:
        print("\n[4] No associations to write. Done.")
        print("AUTO_LINK_DONE")
        return

    print("\n[4] Writing associations to skill_articles …")
    chunk_size = 500
    written = 0
    for i in range(0, len(associations), chunk_size):
        chunk = associations[i:i + chunk_size]
        try:
            supabase_post(base_url, api_key, "skill_articles", chunk, merge=True)
            written += len(chunk)
            print(f"  ├─ wrote {written}/{len(associations)}", flush=True)
        except HTTPError as e:
            if e.code in (404, 400, 406):
                print(f"  ⚠ skill_articles table not found (HTTP {e.code}), skipping writes.")
                break
            else:
                raise
        except Exception as e:
            print(f"  ⚠ error writing chunk: {e}")
            time.sleep(2)

    # ── Step 5: stats ──
    print("\n" + "=" * 60)
    print("STATISTICS")
    print("=" * 60)
    print(f"  Total published posts:       {len(posts)}")
    print(f"  Posts with skill mentions:   {matched_post_count}")
    print(f"  Total associations created:  {len(associations)}")
    print(f"  Unique skills matched:       {len(skill_counter)}")
    print()

    top = skill_counter.most_common(10)
    if top:
        print("  Top 10 most-referenced skills:")
        for i, (slug, count) in enumerate(top, 1):
            print(f"    {i:2d}. {slug} ({count} posts)")

    print("\nAUTO_LINK_DONE")


if __name__ == "__main__":
    try:
        main()
    except HTTPError as e:
        body = ""
        try:
            body = e.read().decode()[:500]
        except Exception:
            pass
        print(f"ERROR: HTTP {e.code} - {body}", file=sys.stderr)
        sys.exit(1)
    except URLError as e:
        print(f"ERROR: network issue - {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
