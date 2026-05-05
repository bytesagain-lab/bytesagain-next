#!/usr/bin/env bash
# ─── Skill Evaluation Runner ───
# Runs inside Docker container. Args: <slug> [test_input]
# No 'set -e' — we handle errors explicitly

SLUG="${1:-}"
TEST_INPUT="${2:-hello world}"
[ -n "$SLUG" ] || { echo '{"status":"failed","error":"slug required"}'; exit 1; }

OUTPUT='{"slug":"'"$SLUG"'","status":"running"}'

# ── Phase 1: Install ──
INSTALL_START=$(date +%s%3N 2>/dev/null || date +%s000)
INSTALL_OUTPUT=$(clawhub install "$SLUG" 2>&1 || true)
INSTALL_EXIT=$?
INSTALL_END=$(date +%s%3N 2>/dev/null || date +%s000)
INSTALL_MS=$(( INSTALL_END - INSTALL_START ))

# Find script — check common install locations
SKILL_DIR=""
for d in "/skills/$SLUG" "/root/.clawhub/skills/$SLUG" "$(pwd)/skills/$SLUG" "/tmp/skills/$SLUG"; do
  [ -d "$d" ] && SKILL_DIR="$d" && break
done
SCRIPT_PATH=""
[ -n "$SKILL_DIR" ] && SCRIPT_PATH=$(find "$SKILL_DIR" -maxdepth 3 -name "*.sh" -type f 2>/dev/null | head -1)

if [ -z "$SCRIPT_PATH" ] || [ ! -f "$SCRIPT_PATH" ]; then
  echo '{"slug":"'"$SLUG"'","install_success":false,"status":"failed","error":"script not found after install"}'
  exit 1
fi

SCRIPT_SIZE=$(wc -c < "$SCRIPT_PATH" | tr -d ' ')
SCRIPT_LINES=$(wc -l < "$SCRIPT_PATH" | tr -d ' ')
SCRIPT_MD5=$(md5sum "$SCRIPT_PATH" | cut -d' ' -f1)
FILES_CNT=$(find "$SKILL_DIR" -type f 2>/dev/null | wc -l | tr -d ' ')

# ── Phase 2: Run under strace ──
RUN_LOG="/tmp/run-${SLUG}.log"
STRACE_LOG="/tmp/strace-${SLUG}.log"
> "$RUN_LOG"
> "$STRACE_LOG"

RUN_START=$(date +%s%3N 2>/dev/null || date +%s000)
timeout 30 strace -f -y -o "$STRACE_LOG" bash "$SCRIPT_PATH" "$TEST_INPUT" > "$RUN_LOG" 2>&1
RUN_EXIT=$?
RUN_END=$(date +%s%3N 2>/dev/null || date +%s000)
RUN_MS=$(( RUN_END - RUN_START )) 
[ "$RUN_MS" -lt 0 ] && RUN_MS=0

RUN_OUTPUT=$(head -200 "$RUN_LOG" 2>/dev/null | tr '\n' ' ' | sed 's/"/\\"/g' | head -c 3000)

# ── Phase 3: Analyze strace ──
STRACE_LINES=0; FORK_CNT=0; EXECVE_CNT=0; FILE_READS=""; NET_CONNS=""; SENSITIVE_READS=""
if [ -f "$STRACE_LOG" ] && [ -s "$STRACE_LOG" ]; then
  STRACE_LINES=$(wc -l < "$STRACE_LOG" | tr -d ' ')
  # fork/clone/execve counts — grep always outputs number even on exit 1
  FORK_CNT=$(grep -cE '(clone|fork|clone3)\(' "$STRACE_LOG" 2>/dev/null)
  EXECVE_CNT=$(grep -c 'execve' "$STRACE_LOG" 2>/dev/null)

  # File reads
  FILE_READS=$(grep -o 'openat(AT_FDCWD, "[^"]*"' "$STRACE_LOG" 2>/dev/null | \
    sed 's/openat(AT_FDCWD, "//;s/"$//' | \
    grep -vE '^(/dev|/proc|/sys|/etc/ld|/lib/|/usr/lib)' | \
    sort -u | head -20 | \
    awk '{printf "%s\\n", $0}' | sed 's/\\n$//')

  # Network connections
  NET_CONNS=$(grep -o 'connect([^)]*' "$STRACE_LOG" 2>/dev/null | sort -u | head -10 | \
    awk '{printf "%s\\n", $0}' | sed 's/\\n$//')
fi

FILE_READS_JSON=$(echo "$FILE_READS" | sed 's/"/\\"/g')
NET_CONNS_JSON=$(echo "$NET_CONNS" | sed 's/"/\\"/g')

# ── Phase 4: Output JSON ──
ALL_OUTPUT=$(echo "$INSTALL_OUTPUT" | head -3 | tr '\n' ' ' | sed 's/"/\\"/g' | head -c 500)
printf '{
  "slug": "%s",
  "status": "complete",
  "install": {
    "success": %s,
    "duration_ms": %s,
    "output": "%s"
  },
  "script": {
    "path": "%s",
    "size_bytes": %s,
    "lines": %s,
    "md5": "%s",
    "files_in_dir": %s
  },
  "execution": {
    "success": %s,
    "exit_code": %s,
    "duration_ms": %s,
    "output_preview": "%s"
  },
  "syscall_analysis": {
    "total_syscalls": %s,
    "fork_clone_count": %s,
    "execve_count": %s
  }
}' \
"$SLUG" \
$( [ $INSTALL_EXIT -eq 0 ] && echo 'true' || echo 'false') \
"$INSTALL_MS" "$ALL_OUTPUT" \
"$SCRIPT_PATH" "$SCRIPT_SIZE" "$SCRIPT_LINES" "$SCRIPT_MD5" "$FILES_CNT" \
$( [ $RUN_EXIT -eq 0 ] && echo 'true' || echo 'false') \
"$RUN_EXIT" "$RUN_MS" "$RUN_OUTPUT" \
"$STRACE_LINES" "$FORK_CNT" "$EXECVE_CNT"
