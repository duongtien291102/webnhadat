import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Tìm hiểu câu chuyện, đội ngũ và quy trình thiết kế nội thất của NOU Design tại Hà Nội.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Giới thiệu NOU Design',
    description: 'Câu chuyện, đội ngũ và quy trình thiết kế nội thất của NOU Design.',
    url: '/about',
    images: ['/asset/anhweb/hien-dai/8-chung-cu-matrix-one-125m2/11.webp'],
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
