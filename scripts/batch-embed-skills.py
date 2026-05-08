#!/usr/bin/env python3 -u
"""
batch-embed-skills.py — 批量向量化补全脚本

为 Supabase 中 skills 和 github_skill_index 表里 embedding IS NULL 的记录
调用 DashScope text-embedding-v3 生成 1024 维向量并写回。

用法: python3 batch-embed-skills.py [--table skills|github_skill_index|all] [--batch 100] [--limit N] [--dry-run]
"""

import os
import re
import sys
import time
import json
import sqlite3
import argparse
import requests
from typing import Optional

# ── 配置读取 ──────────────────────────────────────────────────

ENV_PATH = os.path.expanduser('~/bytesagain-next/.env.local')
SB_URL = None
SB_KEY = None
DASHSCOPE_KEY = None


def load_env(path: str = ENV_PATH):
    global SB_URL, SB_KEY, DASHSCOPE_KEY
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line.startswith('DASHSCOPE_EMBEDDING_KEY='):
                DASHSCOPE_KEY = line.split('=', 1)[1].strip().strip("'\"")
            elif line.startswith('NEXT_PUBLIC_SUPABASE_URL='):
                SB_URL = line.split('=', 1)[1].strip().strip("'\"")
            elif line.startswith('SUPABASE_SERVICE_ROLE_KEY='):
                SB_KEY = line.split('=', 1)[1].strip().strip("'\"")
    if not SB_URL or not SB_KEY:
        print('ERROR: Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL in .env.local')
        sys.exit(1)
    if not DASHSCOPE_KEY:
        print('ERROR: Missing DASHSCOPE_EMBEDDING_KEY in .env.local')
        sys.exit(1)


# ── DashScope API ──────────────────────────────────────────────

DASHSCOPE_URL = 'https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/text-embedding'
DASHSCOPE_MODEL = 'text-embedding-v3'
EMBEDDING_DIM = 1024


def call_dashscope(texts: list[str]) -> Optional[list[list[float]]]:
    """返回与 texts 等长的 embedding 列表，失败返回 None"""
    try:
        resp = requests.post(
            DASHSCOPE_URL,
            headers={
                'Authorization': f'Bearer {DASHSCOPE_KEY}',
                'Content-Type': 'application/json',
            },
            json={
                'model': DASHSCOPE_MODEL,
                'input': {'texts': texts},
                'parameters': {'dimension': EMBEDDING_DIM},
            },
            timeout=60,
        )
        if not resp.ok:
            print(f'  DashScope HTTP {resp.status_code}: {resp.text[:200]}')
            return None
        data = resp.json()
        emb_list = data.get('output', {}).get('embeddings', [])
        # 按 text_index 排序
        emb_list.sort(key=lambda e: e.get('text_index', 0))
        result = [e['embedding'] for e in emb_list]
        if len(result) != len(texts):
            print(f'  DashScope returned {len(result)} embeddings for {len(texts)} texts — mismatch!')
            return None
        return result
    except Exception as e:
        print(f'  DashScope exception: {e}')
        return None


# ── Supabase REST helpers ──────────────────────────────────────

def sb_headers() -> dict:
    return {
        'apikey': SB_KEY,
        'Authorization': f'Bearer {SB_KEY}',
        'Content-Type': 'application/json',
    }


def sb_get(path: str) -> list:
    """GET from Supabase REST, returns JSON list"""
    try:
        resp = requests.get(f'{SB_URL}/rest/v1/{path}', headers=sb_headers(), timeout=60)
        if resp.ok:
            return resp.json() or []
        print(f'  GET {path} → HTTP {resp.status_code}: {resp.text[:200]}')
        return []
    except Exception as e:
        print(f'  GET exception: {e}')
        return []


def sb_patch(table: str, id_col: str, id_val: str, embedding: list[float]) -> bool:
    """PATCH a single row, return True on success"""
    try:
        url = f'{SB_URL}/rest/v1/{table}?{id_col}=eq.{requests.utils.quote(id_val, safe="")}'
        resp = requests.patch(
            url,
            headers={**sb_headers(), 'Prefer': 'return=minimal'},
            json={'embedding': embedding},
            timeout=30,
        )
        if resp.ok or resp.status_code == 204:
            return True
        print(f'  PATCH {table} {id_val} → HTTP {resp.status_code}: {resp.text[:200]}')
        return False
    except Exception as e:
        print(f'  PATCH exception: {e}')
        return False


# ── 文本构建 ───────────────────────────────────────────────────

def build_skill_text(row: dict) -> str:
    """用 name + description + tags 构造待向量化文本"""
    parts = []
    name = (row.get('name') or '').strip()
    desc = (row.get('description') or '').strip()
    tags = row.get('tags') or []
    if isinstance(tags, str):
        try:
            tags = json.loads(tags)
        except Exception:
            tags = [tags]
    tag_str = ', '.join(tags) if tags else ''
    if name:
        parts.append(f'Name: {name}')
    if desc:
        parts.append(f'Description: {desc}')
    if tag_str:
        parts.append(f'Tags: {tag_str}')
    return '\n'.join(parts)


def build_gh_text(row: dict) -> str:
    """用 name + description + tags + owner + repo 构造文本"""
    parts = []
    name = (row.get('name') or '').strip()
    desc = (row.get('description') or '').strip()
    owner = (row.get('github_owner') or '').strip()
    repo = (row.get('repo') or '').strip()
    tags = row.get('tags') or []
    if isinstance(tags, str):
        try:
            tags = json.loads(tags)
        except Exception:
            tags = [tags]
    tag_str = ', '.join(tags) if tags else ''
    if name:
        parts.append(f'Name: {name}')
    if desc:
        parts.append(f'Description: {desc}')
    if tag_str:
        parts.append(f'Tags: {tag_str}')
    if owner:
        parts.append(f'Owner: {owner}')
    if repo:
        parts.append(f'Repo: {repo}')
    return '\n'.join(parts)


# ── 主流程 ─────────────────────────────────────────────────────

def fetch_null_ids(table: str, id_col: str, fields: str, limit: int = 0) -> list[dict]:
    """获取 embedding IS NULL 的记录，分页取回"""
    all_rows = []
    page_size = 1000
    offset = 0
    select = f'{table}?select={id_col},{fields}&embedding=is.null&limit={page_size}'
    while True:
        path = f'{select}&offset={offset}'
        rows = sb_get(path)
        if not rows:
            break
        all_rows.extend(rows)
        print(f'  Fetched {len(all_rows)} null-embedding rows from {table}...', end='\r')
        if len(rows) < page_size:
            break
        offset += page_size
        if limit and len(all_rows) >= limit:
            all_rows = all_rows[:limit]
            break
    print(f'  Fetched {len(all_rows)} null-embedding rows from {table} (total)')
    return all_rows


def process_table(
    table: str,
    id_col: str,
    fields: str,
    text_builder,
    batch_size: int,
    limit: int,
    dry_run: bool,
) -> dict:
    """处理一个表：取 null 记录 → 生成 embedding → 写回。返回统计"""
    stats = {'table': table, 'total_null': 0, 'processed': 0, 'failed': 0, 'skipped': 0}

    rows = fetch_null_ids(table, id_col, fields, limit)
    stats['total_null'] = len(rows)
    if not rows:
        print(f'\n[{table}] ✅ No records to process (all embeddings present)')
        return stats

    EMBED_BATCH = 10  # DashScope batch limit
    total = len(rows)
    for batch_start in range(0, total, batch_size):
        batch = rows[batch_start:batch_start + batch_size]
        batch_num = batch_start // batch_size + 1
        total_batches = (total + batch_size - 1) // batch_size

        # 构建文本列表
        texts = []
        for row in batch:
            t = text_builder(row)
            if not t.strip():
                t = 'No content'
            texts.append(t)

        batch_id = f'[{table}] batch {batch_num}/{total_batches} ({len(batch)} rows)'
        print(f'\n{batch_id}')

        if dry_run:
            print(f'  DRY RUN: would embed {len(texts)} texts')
            for i, row in enumerate(batch[:3]):
                rid = row.get(id_col, '?')
                print(f'  [{rid}] {texts[i][:120]}...')
            stats['skipped'] += len(batch)
            continue

        # 调用 DashScope — 按 EMBED_BATCH 分批（API 限制最多10条/次）
        all_embeddings: list[list[float]] = []
        sub_failed = False
        for sub_start in range(0, len(texts), EMBED_BATCH):
            sub_texts = texts[sub_start:sub_start + EMBED_BATCH]
            sub_embeddings = call_dashscope(sub_texts)
            if sub_embeddings is None:
                sub_failed = True
                break
            all_embeddings.extend(sub_embeddings)
            time.sleep(0.3)  # DashScope QPS limit

        if sub_failed:
            # 逐条重试
            print(f'  Sub-batch failed, retrying one-by-one...')
            for i, row in enumerate(batch):
                single = call_dashscope([texts[i]])
                if single:
                    ok = sb_patch(table, id_col, row[id_col], single[0])
                    if ok:
                        stats['processed'] += 1
                    else:
                        stats['failed'] += 1
                else:
                    stats['failed'] += 1
                if (i + 1) % 50 == 0:
                    print(f'  ... {i+1}/{len(batch)} done')
            continue

        # 批量写回
        for i, row in enumerate(batch):
            rid = row[id_col]
            ok = sb_patch(table, id_col, rid, all_embeddings[i])
            if ok:
                stats['processed'] += 1
            else:
                stats['failed'] += 1

        # 进度
        progress = batch_start + len(batch)
        print(f'  Progress: {progress}/{total} | ✅ {stats["processed"]} | ❌ {stats["failed"]} | ⏭ {stats["skipped"]}')
        # 小睡防止 Supabase rate limit
        time.sleep(0.5)

    print(f'\n[{table}] Done: {stats["processed"]} processed, {stats["failed"]} failed, {stats["skipped"]} skipped (of {stats["total_null"]} null)')
    return stats


# ── 入口 ───────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='Batch embed skills in Supabase via DashScope')
    parser.add_argument('--table', choices=['skills', 'github_skill_index', 'all'], default='all',
                        help='Which table to process (default: all)')
    parser.add_argument('--batch', type=int, default=100, help='Batch size for DashScope calls (default: 100)')
    parser.add_argument('--limit', type=int, default=0, help='Max rows to process per table (0 = all)')
    parser.add_argument('--dry-run', action='store_true', help='Fetch rows but do not call API or write')
    args = parser.parse_args()

    load_env()

    print(f'=== batch-embed-skills.py ===')
    print(f'Supabase: {SB_URL}')
    print(f'DashScope model: {DASHSCOPE_MODEL} (dim={EMBEDDING_DIM})')
    print(f'Tables: {args.table} | Batch: {args.batch} | Limit: {args.limit or "∞"} | Dry-run: {args.dry_run}')
    print()

    all_stats = []

    if args.table in ('skills', 'all'):
        stats = process_table(
            table='skills',
            id_col='slug',
            fields='name,description,tags',
            text_builder=build_skill_text,
            batch_size=args.batch,
            limit=args.limit,
            dry_run=args.dry_run,
        )
        all_stats.append(stats)

    if args.table in ('github_skill_index', 'all'):
        stats = process_table(
            table='github_skill_index',
            id_col='id',
            fields='name,description,tags,github_owner,repo',
            text_builder=build_gh_text,
            batch_size=args.batch,
            limit=args.limit,
            dry_run=args.dry_run,
        )
        all_stats.append(stats)

    print()
    print('=== Summary ===')
    for s in all_stats:
        print(f'  {s["table"]}: ✅={s["processed"]} ❌={s["failed"]} ⏭={s["skipped"]} / null={s["total_null"]}')
    print('\nBATCH_EMBED_DONE')


if __name__ == '__main__':
    main()
