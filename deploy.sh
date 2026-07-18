#!/usr/bin/env bash

set -Eeuo pipefail

APP_NAME="webnhadat"
BRANCH="develop"
HEALTH_URL="http://127.0.0.1:3000/"
PREVIOUS_COMMIT=""
ROLLING_BACK=false
APP_ROOT=$(pwd -P)
RELEASE_ROOT="${APP_ROOT}/.deploy"
CURRENT_RELEASE="${RELEASE_ROOT}/current"
PREVIOUS_RELEASE="${RELEASE_ROOT}/previous"
NEXT_RELEASE="${RELEASE_ROOT}/next"
RELEASE_ACTIVATED=false
ENV_FILE="${APP_ROOT}/.env.production.local"

log() {
  printf '\n%s\n' "$1"
}

load_runtime_environment() {
  if [ -f "$ENV_FILE" ]; then
    set -a
    # shellcheck disable=SC1090
    . "$ENV_FILE"
    set +a
  else
    log "⚠️ Chưa có ${ENV_FILE}; email và các dịch vụ cần biến môi trường có thể không hoạt động."
  fi
}

prepare_release() {
  test -f .next/standalone/server.js

  rm -rf "$NEXT_RELEASE"
  mkdir -p "$NEXT_RELEASE/public" "$NEXT_RELEASE/.next/static"
  cp -a .next/standalone/. "$NEXT_RELEASE/"
  cp -a public/. "$NEXT_RELEASE/public/"
  cp -a .next/static/. "$NEXT_RELEASE/.next/static/"
}

start_application() {
  APP_RELEASE_PATH="$CURRENT_RELEASE" pm2 start ecosystem.config.js --update-env
  pm2 save
}

activate_release() {
  pm2 delete "$APP_NAME" > /dev/null 2>&1 || true
  rm -rf "$PREVIOUS_RELEASE"

  if [ -d "$CURRENT_RELEASE" ]; then
    mv "$CURRENT_RELEASE" "$PREVIOUS_RELEASE"
  fi

  mv "$NEXT_RELEASE" "$CURRENT_RELEASE"
  RELEASE_ACTIVATED=true
  start_application
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

  rm -rf "$NEXT_RELEASE"

  if [ "$RELEASE_ACTIVATED" = true ] && [ -d "$PREVIOUS_RELEASE" ]; then
    pm2 delete "$APP_NAME" > /dev/null 2>&1 || true
    rm -rf "$CURRENT_RELEASE"
    mv "$PREVIOUS_RELEASE" "$CURRENT_RELEASE"
    start_application
  fi

  git reset --hard "$PREVIOUS_COMMIT"
  npm ci --include=dev

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

load_runtime_environment
export NODE_ENV=production

log "📦 2. Cài dependency theo package-lock.json..."
npm ci --include=dev

log "🔨 3. Type-check và build Next.js..."
export DEPLOYMENT_VERSION
DEPLOYMENT_VERSION=$(git rev-parse --short HEAD)
npm run build
prepare_release

log "🔄 4. Kích hoạt bản standalone mới bằng PM2..."
activate_release

log "🩺 5. Kiểm tra ứng dụng..."
wait_for_health

trap - ERR
log "🎉 DEPLOY THÀNH CÔNG! $(git rev-parse --short HEAD) đang phục vụ tại cổng 3000."
