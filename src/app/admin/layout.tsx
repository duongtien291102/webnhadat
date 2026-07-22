import type { Metadata } from 'next';
import AdminProvider from '@/components/admin/AdminProvider';

export const metadata: Metadata = {
  title: 'Quản trị liên hệ',
  description: 'Khu vực quản trị nội bộ của NOU.Design.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AdminProvider>{children}</AdminProvider>;
}
