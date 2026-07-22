# HƯỚNG DẪN CẬP NHẬT CODE LÊN MÁY CHỦ MỚI (103.82.26.60)

Mỗi khi bạn sửa code xong ở máy tính cá nhân và muốn đưa lên mạng, bạn chỉ cần làm theo đúng 2 bước sau:

## Bước 1: Đẩy code mới lên Github
Mở Terminal trong VS Code và gõ lần lượt:
```bash
git add .
git commit -m "Update tinh nang moi"
git push origin develop
```

## Bước 2: Kéo code về máy chủ VPS
Bạn mở PowerShell, đăng nhập vào máy chủ (sử dụng khóa bảo mật đã tạo, không cần nhập mật khẩu):
```bash
ssh -i "$HOME/.ssh/noudesign_vps_2026" root@103.82.26.60
```

Sau khi vào được máy chủ (hiện `root@ubuntu:~#`), bạn chỉ việc di chuyển vào thư mục code và chạy lệnh deploy:
```bash
cd /var/www/webnhadat
bash ./deploy.sh
```

Thế là xong! Bạn chỉ việc đợi khoảng 1 phút để máy tự động kéo code mới nhất từ Github về, build lại giao diện và F5 làm mới trang web.
