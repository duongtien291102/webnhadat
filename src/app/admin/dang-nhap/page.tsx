import Image from 'next/image';
import { redirect } from 'next/navigation';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { requireAdminHost } from '@/lib/admin/host';
import { getAdminSession } from '@/lib/admin/session';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  await requireAdminHost('/admin/dang-nhap');
  if (await getAdminSession()) redirect('/admin/lien-he');

  return (
    <main
      className="grid min-h-[100dvh] grid-cols-1 bg-[#f4f4f1] lg:grid-cols-[minmax(0,1.15fr)_minmax(440px,0.85fr)]"
      data-allow-copy="true"
      style={{ WebkitUserSelect: 'text', userSelect: 'text' }}
    >
      <section className="hidden bg-[#20201f] p-12 text-neutral-100 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logoNOU.jpg" alt="NOU.Design" width={52} height={52} className="h-13 w-13 object-contain" priority />
          <p className="text-sm font-bold tracking-[0.18em]">NOU.Design</p>
        </div>
        <div className="max-w-xl pb-6">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">Thông tin liên hệ luôn trong tầm kiểm soát.</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-neutral-300">
            Theo dõi mọi yêu cầu đã lưu trong cơ sở dữ liệu, kể cả khi email thông báo không gửi được.
          </p>
        </div>
        <p className="text-xs text-neutral-400">Khu vực nội bộ dành cho quản trị viên NOU.Design</p>
      </section>

      <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
        <div className="w-full max-w-md">
          <div className="mb-9 flex items-center gap-3 lg:hidden">
            <Image src="/logoNOU.jpg" alt="NOU.Design" width={48} height={48} className="h-12 w-12 object-contain" priority />
            <p className="text-sm font-bold tracking-[0.16em] text-neutral-950">NOU.Design</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_16px_45px_rgba(32,32,31,0.08)] sm:p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">Đăng nhập quản trị</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Nhập tài khoản được cấp để xem danh sách khách hàng.</p>
            </div>
            <AdminLoginForm />
          </div>
          <p className="mt-5 text-center text-xs leading-5 text-neutral-600">
            Dữ liệu trên trang này là thông tin nội bộ và không được chia sẻ ra bên ngoài.
          </p>
        </div>
      </section>
    </main>
  );
}
