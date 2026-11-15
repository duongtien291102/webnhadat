import StyleGalleryClient from '@/components/StyleGalleryClient';
import { getProjectsData } from '@/lib/siteData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function StyleGalleryPage() {
  const projects = await getProjectsData();
  return <StyleGalleryClient projects={projects} />;
}
