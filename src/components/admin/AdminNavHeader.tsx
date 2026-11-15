'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-components';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import AdminLogoutButton from './AdminLogoutButton';
import { ADMIN_UPLOAD_ERROR_EVENT, type AdminUploadErrorDetail } from './uploadClient';

const navItems = [
  { href: '/admin/lien-he', label: 'Khách hàng liên hệ' },
  { href: '/admin/du-an', label: 'Dự án & Hình ảnh' },
  { href: '/admin/giao-dien', label: 'Ảnh Trang chủ & Giới thiệu' },
];

export default function AdminNavHeader() {
  const pathname = usePathname();
  const [uploadAlert, setUploadAlert] = useState<AdminUploadErrorDetail | null>(null);

  useEffect(() => {
    function handleUploadError(event: Event) {
      const detail = (event as CustomEvent<AdminUploadErrorDetail>).detail;
      if (detail?.message) {
        setUploadAlert(detail);
      }
    }

    window.addEventListener(ADMIN_UPLOAD_ERROR_EVENT, handleUploadError);
    return () => window.removeEventListener(ADMIN_UPLOAD_ERROR_EVENT, handleUploadError);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <Link href="/admin/lien-he" className="flex min-w-0 items-center gap-3">
            <Image src="/logoNOU.jpg" alt="NOU.Design" width={40} height={40} className="h-10 w-10 object-contain" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-[0.14em] text-neutral-950">NOU.Design</p>
              <p className="truncate text-xs text-neutral-500">Hệ thống quản trị</p>
            </div>
          </Link>

          <nav aria-label="Điều hướng quản trị" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#20201f] text-white'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://noudesign.vn"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
          >
            <span>Xem website</span>
            <ExternalLink size={13} />
          </a>
          <AdminLogoutButton />
        </div>
      </div>

      <nav aria-label="Điều hướng quản trị di động" className="flex gap-1 overflow-x-auto border-t border-neutral-100 px-4 py-2 md:hidden">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? 'bg-[#20201f] text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Dialog open={Boolean(uploadAlert)} onOpenChange={(_, data) => { if (!data.open) setUploadAlert(null); }}>
        <DialogSurface className="!max-w-md !rounded-2xl !p-6">
          <DialogBody>
            <DialogTitle className="!flex !items-center !gap-2.5 !text-base !font-semibold !text-red-700">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" aria-hidden />
              <span>{uploadAlert?.title || 'Không thể tải ảnh lên'}</span>
            </DialogTitle>
            <DialogContent className="!pt-2 !text-sm !leading-6 !text-neutral-700">
              {uploadAlert?.message}
            </DialogContent>
            <DialogActions className="!pt-4">
              <Button appearance="primary" onClick={() => setUploadAlert(null)}>
                Đã hiểu
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </header>
  );
}
