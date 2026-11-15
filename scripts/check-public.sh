#!/usr/bin/env bash
# Scan staged diff (default) or all tracked files (--all) for private patterns.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
mode="staged"; [ "${1:-}" = "--all" ] && mode="all"
generic=(
  '(^|[^0-9])10\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'
  '(^|[^0-9])172\.(1[6-9]|2[0-9]|3[01])\.[0-9]{1,3}\.[0-9]{1,3}'
  '(^|[^0-9])192\.168\.[0-9]{1,3}\.[0-9]{1,3}'
  '(^|[^0-9])100\.(6[4-9]|[7-9][0-9]|1[01][0-9]|12[0-7])\.[0-9]{1,3}\.[0-9]{1,3}'
  'ts\.net'
  '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
  'ghp_|gho_|glpat-|sk-[A-Za-z0-9]|xox[bp]-|AKIA[0-9A-Z]'
  'eyJ[A-Za-z0-9_-]*\.'
  '/home/[a-z]+/'
)
pats=("${generic[@]}")
patterns_file="${PRIVATE_PATTERNS_FILE:-$HOME/.config/private-patterns/patterns.txt}"
if [ ! -f "$patterns_file" ] || [ ! -r "$patterns_file" ]; then
  echo "private patterns file missing: set it up first (see .claude/CLAUDE.md)" >&2
  exit 2
fi
while IFS= read -r l || [ -n "$l" ]; do [ -n "$l" ] && pats+=("$l"); done < "$patterns_file"
fail=0
scan() { # label, file to read
  local f="$1" n
  for p in "${pats[@]}"; do
    while IFS= read -r n; do
      echo "$f:$n matches a private pattern"; fail=1
    done < <(grep -nE -e "$p" "$2" 2>/dev/null | cut -d: -f1 || true)
  done
}
if [ "$mode" = "all" ]; then
  while IFS= read -r f; do
    [ -f "$f" ] || continue
    case "$f" in scripts/check-public.sh) continue;; esac
    scan "$f" "$f"
  done < <(git ls-files)
else
  while IFS= read -r f; do
    case "$f" in scripts/check-public.sh) continue;; esac
    tmp=$(mktemp); git show ":$f" > "$tmp" 2>/dev/null || { rm -f "$tmp"; continue; }
    scan "$f" "$tmp"; rm -f "$tmp"
  done < <(git diff --cached --name-only --diff-filter=ACM)
fi
exit $fail
