#!/bin/bash

# Nhận tham số môi trường từ người dùng (test hoặc prod)
ENV=$1

if [ "$ENV" != "prod" ] && [ "$ENV" != "test" ]; then
    echo "❌ Lỗi: Vui lòng cung cấp môi trường (test hoặc prod)!"
    echo "Ví dụ: ./deploy.sh test"
    exit 1
fi

echo "🚀 Bắt đầu quá trình Deploy cho môi trường: $ENV..."

# Thiết lập biến dựa theo môi trường
if [ "$ENV" == "prod" ]; then
    BRANCH="main"
    APP_NAME="webnhadat-prod"
else
    BRANCH="test"  # Hoặc bạn có thể dùng nhánh 'dev'
    APP_NAME="webnhadat-test"
fi

if [ ! -f "package.json" ]; then
    echo "❌ Lỗi: Bạn đang không ở trong thư mục dự án (chưa thấy file package.json)!"
    exit 1
fi

echo "📦 1. Đang tải code mới nhất từ nhánh $BRANCH..."
# git fetch origin
# git checkout $BRANCH
# git pull origin $BRANCH
# Tạm thời dùng pull thông thường nếu bạn test trên cùng 1 máy
git pull

echo "📦 2. Đang cài đặt/cập nhật các thư viện..."
npm install

echo "🔨 3. Đang Build dự án Next.js..."
npm run build

echo "🔄 4. Khởi động lại ứng dụng với PM2 ($APP_NAME)..."
pm2 restart $APP_NAME || pm2 start ecosystem.config.js --only $APP_NAME

echo "✅ Đã lưu PM2 khởi động cùng hệ thống."
pm2 save

echo "🎉 DEPLOY $ENV THÀNH CÔNG! Website đã sẵn sàng."
