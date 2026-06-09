# HƯỚNG DẪN CẬP NHẬT CODE LÊN MÁY CHỦ (DEPLOY PROD)

Mỗi khi bạn sửa code xong ở máy tính cá nhân và muốn đưa lên mạng, bạn chỉ cần làm theo đúng 2 bước sau:

## Bước 1: Đẩy code mới lên Github
Mở Terminal trong VS Code và gõ lần lượt:
```bash
git add .
git commit -m "Update tinh nang moi"
git push origin develop
```

## Bước 2: Kéo code về máy chủ VPS
Bạn mở PowerShell, đăng nhập vào máy chủ:
```bash
ssh root@103.82.194.210
```
*(Nếu nó hỏi mật khẩu thì bạn copy và dán mã Token `ghp_...` hoặc mật khẩu máy chủ tùy vào việc bạn dùng kho Public hay Private nhé).*

Sau khi vào được máy chủ (hiện `root@nouarchitects:~#`), bạn chỉ việc di chuyển vào thư mục code và chạy lệnh deploy:
```bash
cd webnhadat
./deploy.sh prod
```

Thế là xong! Bạn chỉ việc đợi khoảng 1 phút để máy tự động kéo code mới nhất từ Github về, build lại giao diện và F5 làm mới trang web. Trang web của bạn trên mạng sẽ ngay lập tức được cập nhật!
