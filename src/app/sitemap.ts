import { MetadataRoute } from 'next';
import { getProjectsData } from '@/lib/siteData';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://noudesign.vn';
  const projects = await getProjectsData();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/style/all`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/style/HIEN_DAI`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/style/JAPANDI`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/style/WABISABI`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/style/THUONG_MAI`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => {
    const imageUrl = project.mainImage.startsWith('http')
      ? project.mainImage
      : `${baseUrl}${project.mainImage}`;

    return {
      url: `${baseUrl}/project/${project.id}`,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [imageUrl],
    };
  });

  return [...staticRoutes, ...projectRoutes];
}
