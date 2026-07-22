import { redirect } from 'next/navigation';
import { requireAdminHost } from '@/lib/admin/host';

export default async function AdminPage() {
  await requireAdminHost('/admin');
  redirect('/admin/lien-he');
}
