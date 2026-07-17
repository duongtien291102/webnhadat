#!/bin/bash
# Script Deploy tự động cho VPS mới

echo "🚀 Bắt đầu quá trình Deploy..."

if [ ! -f "package.json" ]; then
    echo "❌ Lỗi: Bạn đang không ở trong thư mục dự án (chưa thấy package.json)!"
    exit 1
fi

echo "📦 1. Đang tải code mới nhất từ Github (nhánh develop)..."
git reset --hard
git pull origin develop

echo "📦 2. Đang cài đặt/cập nhật các thư viện..."
npm install

echo "🔨 3. Đang Build dự án Next.js..."
npm run build

echo "🔄 4. Khởi động lại ứng dụng với PM2..."
pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js

echo "✅ Đã lưu cấu hình PM2."
pm2 save

echo "🎉 DEPLOY THÀNH CÔNG! Website đã cập nhật."
