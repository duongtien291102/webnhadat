import HomePageClient from '@/components/HomePageClient';
import { getProjectsData, getSiteSettingsData } from '@/lib/siteData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [projects, siteSettings] = await Promise.all([
    getProjectsData(),
    getSiteSettingsData(),
  ]);

  return <HomePageClient projects={projects} siteSettings={siteSettings} />;
}
