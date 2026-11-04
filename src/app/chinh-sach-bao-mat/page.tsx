import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectPageShell from '@/components/ProjectPageShell';
import { ShieldCheck, Lock, Eye, FileText, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chính sách bảo vệ dữ liệu cá nhân',
  description: 'Chính sách bảo vệ dữ liệu cá nhân và bảo mật thông tin khách hàng tại NOU.Design, tuân thủ Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 và Nghị định số 356/2025/NĐ-CP.',
  alternates: {
    canonical: '/chinh-sach-bao-mat',
  },
  openGraph: {
    title: 'Chính sách bảo vệ dữ liệu cá nhân - NOU.Design',
    description: 'Chính sách bảo vệ dữ liệu cá nhân và bảo mật thông tin khách hàng tại NOU.Design tuân thủ pháp luật Việt Nam.',
    url: '/chinh-sach-bao-mat',
    type: 'article',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <ProjectPageShell>
      <main className="pt-28 md:pt-36 pb-20 px-6 md:px-12 max-w-5xl mx-auto w-full font-sans text-neutral-800 dark:text-neutral-200">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-neutral-500 dark:text-neutral-400">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>•</li>
            <li className="text-neutral-800 dark:text-neutral-200 font-medium">Chính sách bảo vệ dữ liệu cá nhân</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="border-b border-neutral-200 dark:border-neutral-800 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium tracking-wide uppercase text-neutral-600 dark:text-neutral-300 mb-4">
            <ShieldCheck size={14} className="text-neutral-900 dark:text-white" />
            <span>Pháp lý & Minh bạch thông tin</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-neutral-900 dark:text-neutral-100 font-normal tracking-tight leading-tight mb-4">
            Chính sách bảo vệ dữ liệu cá nhân
          </h1>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-3xl">
            NOU.Design cam kết tôn trọng và bảo vệ tuyệt đối quyền riêng tư, an toàn thông tin của Quý khách hàng. Chính sách này quy định cách thức chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu cá nhân theo quy định của pháp luật Việt Nam.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-neutral-500 dark:text-neutral-400">
            <span>Căn cứ pháp lý: <strong>Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15</strong> & <strong>Nghị định 356/2025/NĐ-CP</strong></span>
            <span>•</span>
            <span>Cập nhật gần nhất: Năm 2026</span>
          </div>
        </header>

        {/* Content sections */}
        <div className="space-y-12 leading-relaxed text-sm md:text-[15px]">

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">01</span>
              Đơn vị kiểm soát và xử lý dữ liệu
            </h2>
            <div className="bg-neutral-50 dark:bg-[#151515] p-5 rounded-lg border border-neutral-200/80 dark:border-neutral-800 space-y-2 text-xs md:text-sm">
              <p><strong>Tên thương hiệu:</strong> NOU.Design (Kiến trúc & Nội thất cao cấp)</p>
              <p><strong>Mã số doanh nghiệp / MST:</strong> 0110825316</p>
              <p><strong>Địa chỉ trụ sở / Văn phòng:</strong> 65L11 - KĐT Louis City - Hoàng Mai - Hà Nội</p>
              <p><strong>Hotline / Zalo:</strong> 0911.176.222</p>
              <p><strong>Email tiếp nhận & bảo vệ dữ liệu:</strong> nou.design.mkt@gmail.com</p>
              <p><strong>Website chính thức:</strong> https://noudesign.vn</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">02</span>
              Các loại dữ liệu cá nhân được thu thập
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 font-light">
              Khi Quý khách chủ động gửi thông tin tại biểu mẫu đăng ký tư vấn hoặc liên hệ qua kênh hotline/email, chúng tôi thu thập các thông tin tối thiểu cần thiết để phục vụ công việc thiết kế và lập dự toán:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <li className="flex items-start gap-2.5 p-3.5 rounded-md bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800">
                <CheckCircle2 size={16} className="text-neutral-900 dark:text-neutral-200 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 dark:text-neutral-100">Họ và tên:</strong>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">Để thuận tiện xưng hô và cá nhân hóa giải pháp tư vấn.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3.5 rounded-md bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800">
                <CheckCircle2 size={16} className="text-neutral-900 dark:text-neutral-200 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 dark:text-neutral-100">Số điện thoại liên lạc:</strong>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">Để nhân viên tư vấn/kiến trúc sư gọi điện trao đổi và gửi báo giá qua Zalo/tin nhắn.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3.5 rounded-md bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800">
                <CheckCircle2 size={16} className="text-neutral-900 dark:text-neutral-200 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 dark:text-neutral-100">Địa chỉ công trình / Tỉnh thành:</strong>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">Xác định khu vực thi công, khảo sát mặt bằng và tính toán chi phí vận chuyển/thi công.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3.5 rounded-md bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800">
                <CheckCircle2 size={16} className="text-neutral-900 dark:text-neutral-200 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 dark:text-neutral-100">Diện tích & Nhu cầu thiết kế:</strong>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">Diện tích (m²), phong cách kiến trúc, vật liệu quan tâm và ghi chú định hướng không gian.</span>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">03</span>
              Mục đích thu thập và xử lý dữ liệu
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 font-light">
              Mọi dữ liệu cá nhân Quý khách cung cấp chỉ được sử dụng cho các mục đích cụ thể, minh bạch sau:
            </p>
            <div className="space-y-2.5 text-neutral-700 dark:text-neutral-300">
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 mt-1">•</span>
                <span><strong>Liên hệ tư vấn chuyên sâu:</strong> Kết nối trực tiếp giữa kiến trúc sư của NOU.Design và khách hàng để lắng nghe mong muốn, hiện trạng không gian và định hướng phong cách sống.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 mt-1">•</span>
                <span><strong>Lập hồ sơ phương án & Báo giá:</strong> Xây dựng bảng dự toán sơ bộ/chi tiết dựa trên diện tích, vật liệu và phong cách mà khách hàng quan tâm.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 mt-1">•</span>
                <span><strong>Thực hiện hợp đồng dịch vụ:</strong> Khảo sát thực tế hiện trạng, hoàn thiện hồ sơ thiết kế kỹ thuật, bản vẽ 3D và tiến hành thi công hoàn thiện theo thỏa thuận.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-neutral-400 mt-1">•</span>
                <span><strong>Chăm sóc và bảo hành công trình:</strong> Lưu trữ hồ sơ hoàn công để phục vụ công tác bảo hành, bảo trì định kỳ cho gia chủ sau bàn giao.</span>
              </div>
            </div>
            <div className="p-4 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
              <strong>Cam kết không bán hoặc lạm dụng dữ liệu:</strong> NOU.Design cam kết <strong>không bán, không cho thuê, không chia sẻ</strong> thông tin cá nhân của Quý khách cho bên thứ ba vì bất kỳ mục đích quảng cáo rác hay thương mại nào ngoài khuôn khổ dịch vụ thiết kế - thi công đã được Quý khách đồng ý.
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">04</span>
              Cơ chế đồng ý tự nguyện (Consent Flow)
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 font-light">
              Tuân thủ Điều 9 và Điều 13 Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 và Điều 6 Nghị định 356/2025/NĐ-CP:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300 font-light">
              <li>Việc Quý khách cung cấp dữ liệu cá nhân là hoàn toàn <strong>tự nguyện, chủ động và có thể kiểm chứng</strong>.</li>
              <li>Ô checkbox đồng ý tại form đăng ký tư vấn <strong>không được tích chọn sẵn</strong>. Quý khách chủ động đánh dấu xác nhận đồng ý trước khi gửi biểu mẫu.</li>
              <li>Quý khách có quyền từ chối cung cấp thông tin hoặc rút lại sự đồng ý bất kỳ lúc nào bằng cách liên hệ với chúng tôi qua hotline hoặc email.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">05</span>
              Thời gian lưu trữ dữ liệu
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 font-light">
              Dữ liệu cá nhân của Quý khách sẽ được lưu trữ an toàn trong các khoảng thời gian tương ứng với từng giai đoạn:
            </p>
            <div className="space-y-2 text-neutral-700 dark:text-neutral-300 font-light">
              <p>• <strong>Đối với yêu cầu tư vấn chưa ký kết hợp đồng:</strong> Lưu trữ tối đa 12 tháng kể từ lần tương tác gần nhất nhằm phục vụ việc theo dõi nhu cầu hoặc hỗ trợ lại khi khách hàng có nguyện vọng, sau đó sẽ được xóa khỏi hệ thống.</p>
              <p>• <strong>Đối với khách hàng đã ký hợp đồng thiết kế / thi công:</strong> Lưu trữ trong suốt thời gian thực hiện hợp đồng và thời hạn bảo hành công trình (thường từ 2 - 5 năm tùy hạng mục), cùng với thời hạn quy định về kế toán thuế theo pháp luật.</p>
              <p>• <strong>Xóa tức thời theo yêu cầu:</strong> Bất cứ khi nào nhận được yêu cầu hợp lệ từ Quý khách, chúng tôi sẽ tiến hành xóa hoặc ẩn danh dữ liệu trong vòng 48 giờ làm việc.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">06</span>
              Quyền của Quý khách đối với dữ liệu cá nhân
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 font-light">
              Căn cứ Điều 9 Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15, Quý khách với tư cách là chủ thể dữ liệu có đầy đủ các quyền:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-md bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Quyền 01</span>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Quyền được biết & đồng ý</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light">Được thông báo rõ ràng về mục đích, phạm vi, loại dữ liệu được xử lý.</p>
              </div>
              <div className="p-4 rounded-md bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Quyền 02</span>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Quyền truy cập & chỉnh sửa</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light">Yêu cầu xem lại hoặc đính chính thông tin cá nhân chưa chính xác.</p>
              </div>
              <div className="p-4 rounded-md bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Quyền 03</span>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Quyền xóa dữ liệu (Right to Erasure)</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light">Yêu cầu xóa toàn bộ thông tin cá nhân lưu trong hệ thống của chúng tôi.</p>
              </div>
              <div className="p-4 rounded-md bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Quyền 04</span>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">Quyền rút lại sự đồng ý & khiếu nại</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light">Rút lại sự đồng ý xử lý dữ liệu và khiếu nại nếu phát hiện vi phạm bảo mật.</p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">07</span>
              Cách thức gửi yêu cầu tra cứu, chỉnh sửa hoặc xóa dữ liệu
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 font-light">
              Nếu Quý khách muốn thực hiện bất kỳ quyền nào đối với dữ liệu cá nhân của mình, vui lòng gửi yêu cầu qua một trong các hình thức thuận tiện sau:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 space-y-2">
                <Phone size={18} className="text-neutral-900 dark:text-neutral-100" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Gọi Hotline trực tiếp</h4>
                <a href="tel:0911176222" className="text-base font-semibold text-neutral-900 dark:text-neutral-100 hover:underline block">
                  0911.176.222
                </a>
                <p className="text-xs text-neutral-500 font-light">Hỗ trợ từ 8:30 - 18:00 hàng ngày.</p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 space-y-2">
                <Mail size={18} className="text-neutral-900 dark:text-neutral-100" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Gửi Email yêu cầu</h4>
                <a href="mailto:nou.design.mkt@gmail.com" className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:underline block break-all">
                  nou.design.mkt@gmail.com
                </a>
                <p className="text-xs text-neutral-500 font-light">Tiêu đề: [Yêu cầu dữ liệu cá nhân] - Họ tên - SĐT.</p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 space-y-2">
                <MapPin size={18} className="text-neutral-900 dark:text-neutral-100" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Trực tiếp tại văn phòng</h4>
                <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                  65L11 - KĐT Louis City - Hoàng Mai - Hà Nội
                </p>
                <p className="text-xs text-neutral-500 font-light">Đội ngũ luôn sẵn sàng hỗ trợ trực tiếp.</p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light pt-2">
              * Thời hạn phản hồi và giải quyết yêu cầu: Không quá <strong>48 giờ làm việc</strong> kể từ thời điểm nhận được yêu cầu hợp lệ của Quý khách.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">08</span>
              Hiệu lực và cập nhật chính sách
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 font-light">
              Chính sách này có hiệu lực kể từ ngày đăng tải. NOU.Design có thể điều chỉnh nội dung chính sách bất cứ lúc nào để phù hợp với sự thay đổi của quy định pháp luật hoặc hoạt động của đơn vị. Các bản cập nhật sẽ được công bố công khai trên website này cùng ngày tháng sửa đổi gần nhất.
            </p>
          </section>

        </div>

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-xs">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-medium hover:underline">
            ← Quay về trang chủ
          </Link>
          <span className="text-neutral-400">© 2026 NOU.Design</span>
        </div>
      </main>
    </ProjectPageShell>
  );
}
