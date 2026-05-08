#!/usr/bin/env python3 -u
"""
upload-skill-md-to-storage.py

Upload all SKILL.md files from the extracted archive to Supabase Storage.
Bucket: skill-md (public)
Path: skill-md/{slug}.md

Usage:
    python3 scripts/upload-skill-md-to-storage.py [--limit N] [--dry-run]
"""

import os
import sys
import json
import time
import argparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

SKILLS_DIR = '/tmp/skills-archive'
ENV_FILE = os.path.expanduser('~/bytesagain-next/.env.local')

def load_env():
    sb_url = sb_key = None
    with open(ENV_FILE) as f:
        for line in f:
            line = line.strip()
            if line.startswith('NEXT_PUBLIC_SUPABASE_URL='):
                sb_url = line.split('=', 1)[1].strip().strip("'\"")
            elif line.startswith('SUPABASE_SERVICE_ROLE_KEY='):
                sb_key = line.split('=', 1)[1].strip().strip("'\"")
    if not sb_url or not sb_key:
        print("ERROR: missing config", file=sys.stderr)
        sys.exit(1)
    return sb_url.rstrip('/'), sb_key

def upload_md(sb_url, sb_key, slug, content, dry_run=False):
    """Upload SKILL.md content to Supabase Storage. Returns True on success."""
    path = f'{slug}.md'
    url = f'{sb_url}/storage/v1/object/skill-md/{path}'
    headers = {
        'apikey': sb_key,
        'Authorization': f'Bearer {sb_key}',
        'Content-Type': 'text/markdown',
        'x-upsert': 'true',
    }
    if dry_run:
        print(f'  DRY: would upload {slug}.md ({len(content)} bytes)')
        return True
    try:
        req = Request(url, data=content.encode('utf-8'), headers=headers, method='POST')
        resp = urlopen(req, timeout=30)
        status = resp.status
        body = resp.read().decode()
        if status in (200, 201):
            return True
        print(f'  Upload {slug}.md → HTTP {status}: {body[:100]}')
        return False
    except HTTPError as e:
        body = e.read().decode()
        if e.code == 409:
            # File exists, try PUT (update)
            req2 = Request(url, data=content.encode('utf-8'), headers=headers, method='PUT')
            try:
                resp2 = urlopen(req2, timeout=30)
                return True
            except HTTPError:
                pass
        print(f'  Upload {slug}.md → HTTP {e.code}: {body[:100]}')
        return False
    except Exception as e:
        print(f'  Upload {slug}.md → Error: {e}')
        return False

def main():
    parser = argparse.ArgumentParser(description='Upload SKILL.md files to Supabase Storage')
    parser.add_argument('--limit', type=int, default=0, help='Limit number of files to upload')
    parser.add_argument('--dry-run', action='store_true', help='Dry run, no uploads')
    args = parser.parse_args()

    sb_url, sb_key = load_env()
    print(f'Supabase: {sb_url}')
    print(f'Bucket: skill-md')
    print(f'SKILLs dir: {SKILLS_DIR}')
    print(f'Dry run: {args.dry_run}')
    print()

    if not os.path.isdir(SKILLS_DIR):
        print(f'ERROR: {SKILLS_DIR} not found', file=sys.stderr)
        sys.exit(1)

    # List all skill directories with SKILL.md
    all_skills = []
    for slug in sorted(os.listdir(SKILLS_DIR)):
        skill_dir = os.path.join(SKILLS_DIR, slug)
        md_path = os.path.join(skill_dir, 'SKILL.md')
        if os.path.isdir(skill_dir) and os.path.isfile(md_path):
            with open(md_path, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            all_skills.append((slug, content))

    total = len(all_skills)
    print(f'Found {total} skills with SKILL.md')

    if args.limit:
        all_skills = all_skills[:args.limit]
        print(f'Limited to {args.limit}')

    uploaded = 0
    failed = 0
    skipped = 0

    for i, (slug, content) in enumerate(all_skills, 1):
        if len(content) < 50:
            print(f'  [{i}/{len(all_skills)}] SKIP {slug}: content too short ({len(content)}b)')
            skipped += 1
            continue
        
        ok = upload_md(sb_url, sb_key, slug, content, args.dry_run)
        if ok:
            uploaded += 1
        else:
            failed += 1

        if i % 500 == 0:
            print(f'  [{i}/{len(all_skills)}] progress: {uploaded} uploaded, {failed} failed, {skipped} skipped')
        
        # Small delay between uploads to avoid rate limits
        time.sleep(0.1)

    print()
    print('=' * 50)
    print(f'Total: {total}')
    print(f'Uploaded: {uploaded}')
    print(f'Failed: {failed}')
    print(f'Skipped (too short): {skipped}')
    print('UPLOAD_SKILL_MD_DONE')

if __name__ == '__main__':
    main()
