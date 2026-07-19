import AdminDashboard from '@/components/admin/AdminDashboard';
import { getAdminContacts, normalizeContactFilters } from '@/lib/admin/contacts';
import { requireAdminHost } from '@/lib/admin/host';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type AdminContactsPageProps = {
  searchParams: Promise<{
    page?: string | string[];
    q?: string | string[];
    status?: string | string[];
  }>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminContactsPage({ searchParams }: AdminContactsPageProps) {
  await requireAdminHost('/admin/lien-he');
  const params = await searchParams;
  const filters = normalizeContactFilters({
    page: first(params.page),
    q: first(params.q),
    status: first(params.status),
  });
  const data = await getAdminContacts(filters);

  return <AdminDashboard {...data} filters={filters} />;
}
