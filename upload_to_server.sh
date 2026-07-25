#!/usr/bin/env bash
set -euo pipefail

GIT_MESSAGE="${1:-}"

if [[ -z "$GIT_MESSAGE" ]]; then
  read -r -p "Git commit message: " GIT_MESSAGE
fi

if [[ -z "$GIT_MESSAGE" ]]; then
  echo "Missing git commit message."
  exit 1
fi

git add .

if git diff --cached --quiet; then
  echo "No local changes to commit."
else
  git commit -m "$GIT_MESSAGE"
  git push origin main
fi

ssh root@192.3.179.244 'cd /opt/MemoryMap && git pull origin main && if pm2 describe memory-map >/dev/null 2>&1; then pm2 restart memory-map --update-env; else pm2 start ecosystem.config.js; fi && pm2 save && pm2 status && curl -I http://127.0.0.1:4172/'
