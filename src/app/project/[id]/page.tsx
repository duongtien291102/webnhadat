import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProjectPageShell from '@/components/ProjectPageShell';
import { projects } from '@/lib/projectsData';
import { styleLabels } from '@/types';

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const canonical = `/project/${project.id}`;
  const description = project.description.slice(0, 155);

  return {
    title: project.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} - NOU Design`,
      description,
      url: canonical,
      type: 'article',
      images: [{ url: project.mainImage, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const gallery = Array.from(new Set(project.gallery.length ? project.gallery : [project.mainImage]));

  return (
    <ProjectPageShell>
      <main className="pt-28 md:pt-32 pb-24">
        <article>
          <header className="max-w-7xl mx-auto px-6 md:px-12 pb-10 md:pb-14">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-500 dark:text-neutral-400 mb-4">
              {styleLabels[project.style] || project.style}
            </p>
            <h1 className="max-w-5xl text-4xl md:text-6xl font-serif font-normal tracking-tight leading-tight text-neutral-950 dark:text-neutral-50">
              {project.title}
            </h1>
            <p className="mt-5 text-sm text-neutral-600 dark:text-neutral-300">
              {project.location} · {project.area}
            </p>
          </header>

          <div className="relative w-full aspect-[16/9] max-h-[78vh] bg-neutral-900">
            <Image
              src={project.mainImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <section className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-serif text-neutral-950 dark:text-neutral-50 mb-6">
                Câu chuyện thiết kế
              </h2>
              <p className="text-sm md:text-base leading-8 text-neutral-600 dark:text-neutral-300">
                {project.description}
              </p>
            </section>

            <aside className="lg:col-span-5 border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <dl className="space-y-5 text-sm">
                <div className="flex justify-between gap-6">
                  <dt className="text-neutral-500 dark:text-neutral-400">Địa điểm</dt>
                  <dd className="text-right text-neutral-900 dark:text-neutral-100">{project.location}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-neutral-500 dark:text-neutral-400">Diện tích</dt>
                  <dd className="text-right text-neutral-900 dark:text-neutral-100">{project.area}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-neutral-500 dark:text-neutral-400">Phong cách</dt>
                  <dd className="text-right text-neutral-900 dark:text-neutral-100">{styleLabels[project.style] || project.style}</dd>
                </div>
              </dl>
            </aside>
          </div>

          <section aria-labelledby="project-gallery-title" className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 id="project-gallery-title" className="text-3xl md:text-4xl font-serif text-neutral-950 dark:text-neutral-50 mb-10">
              Hình ảnh dự án
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              {gallery.map((image, index) => (
                <div key={image} className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    src={image}
                    alt={`${project.title} - hình ảnh ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </ProjectPageShell>
  );
}
