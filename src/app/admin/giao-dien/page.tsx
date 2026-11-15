import AdminSiteSettingsManager from '@/components/admin/AdminSiteSettingsManager';
import { requireAdminHost } from '@/lib/admin/host';
import { requireAdminSession } from '@/lib/admin/session';
import { getSiteSettingsData } from '@/lib/siteData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminSiteSettingsPage() {
  await requireAdminHost('/admin/giao-dien');
  await requireAdminSession();
  const settings = await getSiteSettingsData();

  return <AdminSiteSettingsManager initialSettings={settings} />;
}
