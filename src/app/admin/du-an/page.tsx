import AdminProjectsManager from '@/components/admin/AdminProjectsManager';
import { requireAdminHost } from '@/lib/admin/host';
import { requireAdminSession } from '@/lib/admin/session';
import { getProjectsData } from '@/lib/siteData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminProjectsPage() {
  await requireAdminHost('/admin/du-an');
  await requireAdminSession();
  const projects = await getProjectsData();

  return <AdminProjectsManager initialProjects={projects} />;
}
