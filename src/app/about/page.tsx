import AboutPageClient from '@/components/AboutPageClient';
import { getSiteSettingsData } from '@/lib/siteData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AboutPage() {
  const siteSettings = await getSiteSettingsData();
  return <AboutPageClient about={siteSettings.about} />;
}
