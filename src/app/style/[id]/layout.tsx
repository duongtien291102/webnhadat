import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const styleNames: Record<string, string> = {
  ALL: 'Tất cả phong cách',
  HIEN_DAI: 'Nội thất hiện đại',
  JAPANDI: 'Nội thất Japandi',
  WABISABI: 'Nội thất Wabi-sabi',
  THUONG_MAI: 'Không gian thương mại',
};

type StyleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>;

function resolveStyle(id: string) {
  const key = id.toUpperCase();
  if (!(key in styleNames)) notFound();
  return key;
}

export async function generateMetadata({ params }: StyleLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const style = resolveStyle(id);
  const name = styleNames[style];
  const canonicalId = style === 'ALL' ? 'all' : style;
  const canonical = `/style/${canonicalId}`;

  return {
    title: name,
    description: `Khám phá các dự án ${name.toLowerCase()} được thiết kế và thi công bởi NOU Design.`,
    alternates: { canonical },
    openGraph: {
      title: `${name} - NOU Design`,
      description: `Bộ sưu tập dự án ${name.toLowerCase()} của NOU Design.`,
      url: canonical,
      images: ['/asset/anhweb/hien-dai/12-biet-thu-oceanpark-hai-au-230m2/1.webp'],
    },
  };
}

export default async function StyleLayout({ children, params }: StyleLayoutProps) {
  const { id } = await params;
  resolveStyle(id);
  return children;
}
