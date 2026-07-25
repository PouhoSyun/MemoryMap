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

ssh root@192.3.179.244 'bash -s' <<'REMOTE_SCRIPT'
set -euo pipefail

cd /opt/MemoryMap
git pull origin main

install -m 0644 deploy/memorymap.service /etc/systemd/system/memorymap.service
systemctl daemon-reload
systemctl enable memorymap

PM2_BIN=""
if command -v pm2 >/dev/null 2>&1; then
  PM2_BIN="$(command -v pm2)"
elif [[ -x /root/.nvm/versions/node/v24.16.0/bin/pm2 ]]; then
  PM2_BIN="/root/.nvm/versions/node/v24.16.0/bin/pm2"
fi

if [[ -n "$PM2_BIN" ]]; then
  "$PM2_BIN" delete memory-map >/dev/null 2>&1 || true
  "$PM2_BIN" save >/dev/null 2>&1 || true
fi

systemctl restart memorymap
systemctl status memorymap --no-pager

for attempt in {1..20}; do
  if curl -fsSI http://127.0.0.1:4172/ >/dev/null; then
    curl -I http://127.0.0.1:4172/
    curl -fsS http://127.0.0.1:4172/ | grep -m 1 'version-badge'
    exit 0
  fi
  sleep 1
done

systemctl status memorymap --no-pager
journalctl -u memorymap -n 80 --no-pager
exit 1
REMOTE_SCRIPT
