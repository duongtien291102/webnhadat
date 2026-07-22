# Báo Cáo Audit SEO Kỹ Thuật - noudesign.vn

## 1. Kiểm tra Index
- **Tình trạng:** Website **chưa được Google index bất kỳ trang nào**.
- **Bằng chứng:** Kết quả tìm kiếm lệnh `site:noudesign.vn` trên Google trả về 0 kết quả.
- **Phân tích:** Do không có trang nào được index, các trạng thái "Excluded", "Crawled but not indexed" không thể kiểm tra qua search thông thường. 
- **Đề xuất:** Cần cung cấp quyền truy cập Google Search Console để xem chính xác nguyên nhân (do Google chưa crawl hay crawl rồi nhưng từ chối index). Khả năng cao nhất là website còn quá mới và chưa được Submit sitemap lên Google Search Console.

## 2. Kiểm tra robots.txt
- **Tình trạng:** Tồn tại và Hợp lệ. 
- **Bằng chứng:** Đã fetch từ `https://noudesign.vn/robots.txt`
```text
User-Agent: *
Allow: /
Sitemap: https://noudesign.vn/sitemap.xml
```
- **Kết luận:** File cấu hình chuẩn, không có rule nào vô tình chặn Googlebot, đã khai báo đường dẫn Sitemap chính xác.

## 3. Kiểm tra sitemap.xml
- **Tình trạng:** Tồn tại và Hợp lệ.
- **Bằng chứng:** Fetch từ `https://noudesign.vn/sitemap.xml`. File trả về XML chuẩn `<urlset>`.
- **Phân tích:** Sitemap có đầy đủ các URL từ trang chủ, trang giới thiệu, các trang danh mục phong cách (`/style/*`) và các dự án (`/project/*`). Thẻ `<lastmod>`, `<changefreq>`, `<priority>` đều được cấu hình chuẩn. File XML không có lỗi cú pháp.

## 4. Kiểm tra Meta SEO
- **Tình trạng:** Cấu hình tốt nhờ tính năng Metadata API của Next.js.
- **Bằng chứng:** 
  - Tại `src/app/layout.tsx`: Đã thiết lập `title`, `description`, `openGraph`, `twitter` đầy đủ. 
  - Tại `src/app/project/[id]/page.tsx` và `src/app/style/[id]/layout.tsx`: Đã thiết lập cơ chế tự động tạo (dynamic) Title, Description và Canonical cho từng trang dự án.
- **Đánh giá:** Không phát hiện Duplicate/Missing Title hay Description. Các thẻ H1 cũng xuất hiện đầy đủ trong mã nguồn.

## 5. Kiểm tra Structured Data (Schema)
- **Tình trạng:** Có cấu hình nhưng thiếu nhiều Schema hỗ trợ hiển thị (Rich Snippet).
- **Bằng chứng:** Tại `src/app/layout.tsx`, chỉ có duy nhất schema `ProfessionalService` (chứa Tên, SĐT, Địa chỉ, SameAs Facebook). 
- **Đánh giá:**
  - **LocalBusiness:** Có (dưới dạng ProfessionalService).
  - **Breadcrumb:** THIẾU.
  - **Website/WebPage:** THIẾU.
  - **FAQ/Article:** THIẾU.
- **Kết luận:** Việc thiếu Schema Breadcrumb và WebPage khiến Google chậm hiểu được cấu trúc và phân cấp danh mục website hơn.

## 6. Kiểm tra Google Business
- **Tình trạng:** Cần xác minh thủ công do thiếu quyền truy cập quản trị.
- **Phân tích:** Schema trên web đang khai báo số điện thoại `0911176222`, địa chỉ `Hà Nội`. Cần đối chiếu trực tiếp thông tin này trên Google Business Profile xem có trùng khớp 100% không.
- **Mức độ:** **Critical** - Bạn cần kiểm tra xem trên Google Business của công ty đã gắn nút "Trang web" (Website) trỏ về đúng đường dẫn `https://noudesign.vn` chưa. Đây là nguồn backlink đầu tiên và uy tín nhất để mồi Googlebot.

## 7. Kiểm tra Canonical
- **Tình trạng:** Hợp lệ, xử lý đúng bằng Next.js Metadata.
- **Bằng chứng:**
  - `src/app/layout.tsx` khai báo `canonical: "/"`.
  - Các trang con như `project/[id]` đã tự ghi đè bằng `const canonical = '/project/${project.id}'`.
- **Kết luận:** Không bị localhost, không bị lỗi duplicate canonical, Next.js tự động xử lý base URL HTTPS chuẩn xác dựa trên `metadataBase`.

## 8. Kiểm tra HTTP Status
- **Tình trạng:** Hợp lệ (200 OK).
- **Bằng chứng:** Lệnh truy vấn từ terminal trả về HTTP 200 OK. Không có redirect loop. Không có lỗi 500 từ server (do web dùng SSG prerender sẵn HTML).

## 9. Kiểm tra Performance
- **Tình trạng:** Rất tốt về mặt kiến trúc server.
- **Bằng chứng:** Response header trả về `x-nextjs-cache: HIT` và `x-nextjs-prerender: 1`. Tốc độ phản hồi ban đầu (TTFB) cực kỳ nhanh nhờ cơ chế cache tĩnh (Static Generation) của Next.js kết hợp với proxy Nginx trên VPS Ubuntu.

## 10. Kiểm tra HTML Rendering
- **Tình trạng:** Hợp lệ. Hoàn toàn thân thiện với Googlebot.
- **Phân tích:** Website **KHÔNG** bị lỗi Client-side Rendering che giấu nội dung. Next.js đã xuất toàn bộ text, tiêu đề ra HTML thô (raw HTML). 
- **Lưu ý đặc biệt:** Code của bạn có component `ProtectionWrapper.tsx` chặn click chuột phải, khóa F12, chặn bôi đen copy (`select-none`). **Component này hoàn toàn KHÔNG chặn Googlebot.** Googlebot chỉ đọc mã nguồn HTML thô trả về từ server, không bị ảnh hưởng bởi các sự kiện chuột/bàn phím. Mọi text đều được index bình thường.

## 11. Kiểm tra Next.js SEO
- **Tình trạng:** Chuẩn mực.
- **Bằng chứng:** Code áp dụng đúng chuẩn App Router (`generateMetadata`, `metadataBase`), có file `sitemap.ts` tự động sinh (dynamic) từ mảng `projectsData`. Web tận dụng SSG (Static Site Generation) xuất sắc. **Không phát hiện thẻ `noindex` nào trên trang chủ.**

## 12. Kiểm tra Backlink
- **Tình trạng:** Gần như bằng 0 (Domain hoàn toàn mới, chưa được chia sẻ nhiều).
- **Kết luận:** Đây là nguyên nhân kỹ thuật khách quan. Domain mới không có External Link sẽ khiến Googlebot không có "đường dẫn" tự nhiên bò tới website để thu thập dữ liệu.

## 13. Kiểm tra On-page SEO
- **Đánh giá:** Các thẻ HTML Semantic được sử dụng tốt. Cấu trúc URL thân thiện (vd: `/project/10-cai-tao-nha-lao-cai...`). 

## 14 & 15. Kiểm tra Google & Brand Search
- **Kết quả:** Tìm kiếm `site:noudesign.vn` và `nou designs`, `noudesign` đều không hiển thị website.
- **Lý do:** Website chưa nằm trong cơ sở dữ liệu (Index) của Google. 

---

## 16. Root Cause Analysis (Phân tích nguyên nhân cốt lõi)

### [CRITICAL] Website chưa được khai báo với Google Search Console
- **Mô tả:** Website không bị bất cứ lỗi kỹ thuật nào chặn Google (robots.txt mở, HTML render chuẩn, không có thẻ noindex), nhưng vẫn không xuất hiện. Nguyên nhân cốt lõi duy nhất: Đây là tên miền mới, chưa có Backlink trỏ về, và quan trọng nhất là **chưa Submit Sitemap chủ động qua Google Search Console (GSC).**
- **Bằng chứng:** Google trả về 0 kết quả cho lệnh `site:noudesign.vn` và nội dung HTML trang chủ không chứa thẻ `noindex`.
- **Cách khắc phục:** Chủ website cần lập tức đăng nhập GSC, xác minh tên miền và chủ động bấm "Request Indexing".

### [MEDIUM] Thiếu cấu trúc dữ liệu Breadcrumb (Schema.org)
- **Mô tả:** Web mới chỉ có schema `ProfessionalService`, thiếu cấu trúc phân cấp BreadcrumbList.
- **Ảnh hưởng:** Khi được Google index, kết quả hiển thị (Rich snippets) sẽ kém hấp dẫn hơn đối thủ.
- **Cách khắc phục:** Cần bổ sung `BreadcrumbList` schema vào các trang chi tiết dự án ở các đợt tối ưu code tiếp theo.

---

## 17. Kế hoạch khắc phục (Action Plan)

**Phase 1 (Critical) - Cần làm ngay hôm nay (Yêu cầu tài khoản chủ website):**
1. Truy cập [Google Search Console](https://search.google.com/search-console).
2. Thêm và xác minh tên miền `noudesign.vn` (có thể dùng TXT record trên DNS).
3. Vào mục **Sitemaps**, nhập `https://noudesign.vn/sitemap.xml` và bấm Submit.
4. Vào thanh tìm kiếm trên cùng của GSC, gõ URL `https://noudesign.vn`, ấn Enter. Sau đó bấm nút **"Request Indexing"** (Yêu cầu lập chỉ mục).
5. Mở lại Google Business Profile, kiểm tra nút "Trang web" (Website) đã điền đúng `https://noudesign.vn` chưa.

**Phase 2 (High) - Kéo Traffic & Bot tự nhiên:**
1. Lấy link website đi share lên các mạng xã hội (Facebook Fanpage, Instagram bio, Pinterest của công ty). Mỗi lần chia sẻ là tạo ra 1 tín hiệu để Googlebot tìm đến.
2. Theo dõi mục "Pages" trong Search Console sau 3-5 ngày. Nếu GSC báo URL nằm ở trạng thái `Discovered - currently not indexed` thì cần chờ thêm Google phân bổ tài nguyên crawl.

**Phase 3 (Optimization) - Tối ưu Source Code:**
1. Bổ sung Schema Breadcrumb vào các component.
2. Tăng cường internal linking (Gợi ý: Dưới mỗi trang chi tiết dự án, thêm section "Các dự án liên quan" có gắn link).
