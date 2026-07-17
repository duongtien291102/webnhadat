#!/usr/bin/env bash

set -Eeuo pipefail

APP_NAME="webnhadat"
BRANCH="develop"
HEALTH_URL="http://127.0.0.1:3000/"
PREVIOUS_COMMIT=""
ROLLING_BACK=false

log() {
  printf '\n%s\n' "$1"
}

prepare_standalone() {
  mkdir -p .next/standalone/public .next/standalone/.next/static
  cp -a public/. .next/standalone/public/
  cp -a .next/static/. .next/standalone/.next/static/
}

start_application() {
  pm2 startOrReload ecosystem.config.js --update-env
  pm2 save
}

wait_for_health() {
  local attempt
  for attempt in {1..12}; do
    if curl --fail --silent --show-error --max-time 5 "$HEALTH_URL" > /dev/null; then
      return 0
    fi
    sleep 2
  done
  return 1
}

rollback() {
  local exit_code=${1:-1}
  local line_number=${2:-unknown}

  if [ "$ROLLING_BACK" = true ] || [ -z "$PREVIOUS_COMMIT" ]; then
    exit "$exit_code"
  fi

  ROLLING_BACK=true
  trap - ERR
  log "❌ Deploy lỗi tại dòng ${line_number}. Đang rollback về ${PREVIOUS_COMMIT}..."

  git reset --hard "$PREVIOUS_COMMIT"
  npm ci
  npm run build
  prepare_standalone
  start_application

  if wait_for_health; then
    log "✅ Rollback thành công. Phiên bản cũ đang hoạt động bình thường."
  else
    log "❌ Rollback không vượt qua health check. Kiểm tra: pm2 logs ${APP_NAME}"
  fi

  exit "$exit_code"
}

trap 'rollback $? $LINENO' ERR

log "🚀 Bắt đầu deploy..."

if [ ! -f package.json ] || [ ! -d .git ]; then
  log "❌ Hãy chạy script trong thư mục gốc của dự án."
  exit 1
fi

if ! git diff-index --quiet HEAD --; then
  log "❌ Máy chủ có thay đổi code chưa commit. Dừng deploy để tránh ghi đè dữ liệu."
  git status --short
  exit 1
fi

PREVIOUS_COMMIT=$(git rev-parse HEAD)

log "📦 1. Đồng bộ nhánh ${BRANCH}..."
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git merge --ff-only "origin/${BRANCH}"

log "📦 2. Cài dependency theo package-lock.json..."
npm ci

log "🔨 3. Type-check và build Next.js..."
npm run build
prepare_standalone

log "🔄 4. Reload ứng dụng standalone bằng PM2..."
start_application

log "🩺 5. Kiểm tra ứng dụng..."
wait_for_health

trap - ERR
log "🎉 DEPLOY THÀNH CÔNG! $(git rev-parse --short HEAD) đang phục vụ tại cổng 3000."
