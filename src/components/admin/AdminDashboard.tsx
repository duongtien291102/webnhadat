'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Badge,
  Button,
  Card,
  Input,
  Select,
} from '@fluentui/react-components';
import {
  ArrowClockwise24Regular,
  ChevronLeft24Regular,
  ChevronRight24Regular,
  Mail24Regular,
  Search24Regular,
} from '@fluentui/react-icons';
import type { AdminContact, AdminContactFilters } from '@/lib/admin/contacts';
import AdminLogoutButton from './AdminLogoutButton';

type DashboardProps = {
  contacts: AdminContact[];
  summary: {
    totalAll: number;
    sent: number;
    failed: number;
    pending: number;
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  filters: AdminContactFilters;
};

const statusConfig = {
  sent: { label: 'Đã gửi email', color: 'success' as const },
  failed: { label: 'Gửi email thất bại', color: 'danger' as const },
  pending: { label: 'Đang chờ', color: 'warning' as const },
  skipped: { label: 'Chưa gửi email', color: 'informative' as const },
};

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

function formatArea(area: string) {
  return area?.trim() ? `${area} m²` : 'Chưa cung cấp';
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Chưa xác định' : dateFormatter.format(date);
}

function buildPageHref(page: number, filters: AdminContactFilters) {
  const params = new URLSearchParams();
  if (filters.query) params.set('q', filters.query);
  if (filters.emailStatus !== 'all') params.set('status', filters.emailStatus);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return `/admin/lien-he${query ? `?${query}` : ''}`;
}

function ContactStatus({ contact }: { contact: AdminContact }) {
  const status = statusConfig[contact.emailStatus] || statusConfig.pending;
  return (
    <div className="space-y-1.5">
      <Badge appearance="tint" color={status.color}>{status.label}</Badge>
      {contact.emailErrorCode && (
        <p className="max-w-40 break-words text-[11px] text-red-700">{contact.emailErrorCode}</p>
      )}
    </div>
  );
}

function ContactDetails({ contact }: { contact: AdminContact }) {
  return (
    <div className="space-y-2 text-sm leading-6 text-neutral-700">
      <p><span className="font-semibold text-neutral-950">Diện tích:</span> {formatArea(contact.area)}</p>
      <p><span className="font-semibold text-neutral-950">Vật liệu:</span> {contact.material || 'Chưa lựa chọn'}</p>
      <p><span className="font-semibold text-neutral-950">Phong cách:</span> {contact.style || 'Chưa lựa chọn'}</p>
      <p><span className="font-semibold text-neutral-950">Nguồn gửi:</span> {contact.source}</p>
      <p className="whitespace-pre-wrap"><span className="font-semibold text-neutral-950">Ghi chú:</span> {contact.message || 'Không có'}</p>
    </div>
  );
}

export default function AdminDashboard({ contacts, summary, pagination, filters }: DashboardProps) {
  return (
    <main
      className="min-h-[100dvh] bg-[#f4f4f1] text-[#20201f]"
      data-allow-copy="true"
      style={{ WebkitUserSelect: 'text', userSelect: 'text' }}
    >
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex min-h-18 max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Image src="/logoNOU.jpg" alt="NOU.Design" width={44} height={44} className="h-11 w-11 object-contain" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-[0.14em] text-neutral-950">NOU.Design</p>
              <p className="truncate text-xs text-neutral-500">Quản trị liên hệ</p>
            </div>
          </div>
          <AdminLogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] space-y-6 px-4 py-6 md:px-8 md:py-9">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 md:text-3xl">Danh sách liên hệ</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Mọi yêu cầu đã lưu trong cơ sở dữ liệu đều xuất hiện tại đây, kể cả khi Gmail gửi thất bại.
            </p>
          </div>
          <Button
            appearance="secondary"
            icon={<ArrowClockwise24Regular />}
            onClick={() => window.location.reload()}
          >
            Làm mới
          </Button>
        </div>

        <section aria-label="Tổng quan liên hệ" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: 'Tổng liên hệ', value: summary.totalAll },
            { label: 'Email đã gửi', value: summary.sent },
            { label: 'Email thất bại', value: summary.failed },
            { label: 'Đang chờ hoặc chưa gửi', value: summary.pending },
          ].map((item) => (
            <Card key={item.label} appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-4 md:!p-5">
              <p className="text-xs font-medium text-neutral-500">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold tabular-nums text-neutral-950 md:text-3xl">{item.value}</p>
            </Card>
          ))}
        </section>

        <Card appearance="outline" className="!rounded-xl !border-neutral-200 !bg-white !p-4 md:!p-5">
          <form method="get" className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(260px,1fr)_220px_auto_auto] md:items-end">
            <label className="space-y-2 text-sm font-semibold text-neutral-800">
              <span className="block">Tìm kiếm</span>
              <Input
                name="q"
                defaultValue={filters.query}
                placeholder="Tên, số điện thoại hoặc địa điểm"
                contentBefore={<Search24Regular aria-hidden />}
                size="large"
                className="!w-full"
              />
            </label>

            <label className="space-y-2 text-sm font-semibold text-neutral-800">
              <span className="block">Trạng thái email</span>
              <Select name="status" defaultValue={filters.emailStatus} size="large" className="!w-full">
                <option value="all">Tất cả trạng thái</option>
                <option value="sent">Đã gửi email</option>
                <option value="failed">Gửi email thất bại</option>
                <option value="pending">Đang chờ</option>
                <option value="skipped">Chưa gửi email</option>
              </Select>
            </label>

            <Button type="submit" appearance="primary" size="large">Lọc dữ liệu</Button>
            <Link href="/admin/lien-he" className="inline-flex min-h-10 items-center justify-center text-sm font-semibold text-neutral-600 underline-offset-4 hover:text-neutral-950 hover:underline">
              Xóa bộ lọc
            </Link>
          </form>
        </Card>

        <section aria-labelledby="contact-table-title" className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-4 py-4 md:px-5">
            <div>
              <h2 id="contact-table-title" className="font-semibold text-neutral-950">Thông tin khách hàng</h2>
              <p className="mt-1 text-xs text-neutral-500">{pagination.total} kết quả phù hợp</p>
            </div>
            <Mail24Regular aria-hidden className="text-neutral-500" />
          </div>

          {contacts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-neutral-900">Chưa có liên hệ phù hợp</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-600">
                Thử thay đổi từ khóa hoặc trạng thái email để xem các liên hệ khác.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
                  <thead className="bg-neutral-50 text-xs text-neutral-600">
                    <tr>
                      <th scope="col" className="px-5 py-3 font-semibold">Khách hàng</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Dự án</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Nhu cầu</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Thời gian</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="align-top hover:bg-neutral-50/70">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-neutral-950">{contact.name}</p>
                          {contact.phone ? (
                            <a href={`tel:${contact.phone}`} className="mt-1 inline-block text-neutral-700 underline-offset-4 hover:underline">{contact.phone}</a>
                          ) : (
                            <p className="mt-1 text-neutral-500">Chưa cung cấp</p>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium text-neutral-900">{contact.location}</p>
                          <p className="mt-1 text-neutral-500">{formatArea(contact.area)}</p>
                        </td>
                        <td className="max-w-[360px] px-5 py-4">
                          <p className="text-neutral-800">{contact.style || 'Chưa chọn phong cách'}</p>
                          <p className="mt-1 text-neutral-500">{contact.material || 'Chưa chọn vật liệu'}</p>
                          {contact.message && <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-600">{contact.message}</p>}
                          <p className="mt-2 text-[11px] text-neutral-500">Nguồn: {contact.source}</p>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-neutral-700">{formatDate(contact.createdAt)}</td>
                        <td className="px-5 py-4"><ContactStatus contact={contact} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-neutral-100 lg:hidden">
                {contacts.map((contact) => (
                  <article key={contact.id} className="space-y-4 p-4 md:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-neutral-950">{contact.name}</h3>
                        {contact.phone ? (
                          <a href={`tel:${contact.phone}`} className="mt-1 inline-block text-sm text-neutral-700 underline-offset-4 hover:underline">{contact.phone}</a>
                        ) : (
                          <p className="mt-1 text-sm text-neutral-500">Chưa cung cấp</p>
                        )}
                      </div>
                      <ContactStatus contact={contact} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-neutral-500">Địa điểm</p>
                        <p className="mt-1 font-medium text-neutral-900">{contact.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Thời gian</p>
                        <p className="mt-1 font-medium text-neutral-900">{formatDate(contact.createdAt)}</p>
                      </div>
                    </div>
                    <details className="rounded-lg bg-neutral-50 px-4 py-3">
                      <summary className="cursor-pointer text-sm font-semibold text-neutral-800">Xem đầy đủ thông tin</summary>
                      <div className="pt-3"><ContactDetails contact={contact} /></div>
                    </details>
                  </article>
                ))}
              </div>
            </>
          )}

          <nav aria-label="Phân trang" className="flex items-center justify-between gap-4 border-t border-neutral-200 px-4 py-4 md:px-5">
            <p className="text-xs text-neutral-500">
              Trang {pagination.page} / {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              {pagination.page > 1 ? (
                <Link href={buildPageHref(pagination.page - 1, filters)} className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-neutral-300 px-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50">
                  <ChevronLeft24Regular aria-hidden /> Trước
                </Link>
              ) : (
                <span className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-neutral-200 px-3 text-sm font-semibold text-neutral-400" aria-disabled="true">
                  <ChevronLeft24Regular aria-hidden /> Trước
                </span>
              )}
              {pagination.page < pagination.totalPages ? (
                <Link href={buildPageHref(pagination.page + 1, filters)} className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-neutral-300 px-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50">
                  Sau <ChevronRight24Regular aria-hidden />
                </Link>
              ) : (
                <span className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-neutral-200 px-3 text-sm font-semibold text-neutral-400" aria-disabled="true">
                  Sau <ChevronRight24Regular aria-hidden />
                </span>
              )}
            </div>
          </nav>
        </section>
      </div>
    </main>
  );
}
