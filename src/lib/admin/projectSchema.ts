import 'server-only';

import { z } from 'zod';

export const PROJECT_STYLES = ['HIEN_DAI', 'JAPANDI', 'WABISABI', 'THUONG_MAI'] as const;

export const ProjectBaseSchema = z.object({
  index: z.string().trim().max(20).optional(),
  title: z.string().trim().min(1, 'Tên dự án không được để trống.').max(200),
  tagline: z.string().trim().max(250).optional(),
  description: z.string().trim().max(5000).default(''),
  bullets: z.array(z.string().trim().max(500)).max(20).default([]),
  highlightsHeader: z.string().trim().max(150).default('THÔNG TIN DỰ ÁN:'),
  highlights: z.array(z.string().trim().max(500)).max(20).default([]),
  mainImage: z.string().trim().min(1, 'Vui lòng chọn ảnh bìa dự án.').max(500),
  cardImage: z.string().trim().max(500).optional(),
  gallery: z.array(z.string().trim().min(1).max(500)).max(200).default([]),
  area: z.string().trim().max(80).default('Liên hệ'),
  location: z.string().trim().max(120).default('Hà Nội'),
  style: z.enum(PROJECT_STYLES).default('HIEN_DAI'),
  featuredOnHome: z.boolean().default(false),
});

export function normalizeProjectGallery(gallery: string[], mainImage: string) {
  return Array.from(new Set((gallery.length > 0 ? gallery : [mainImage]).filter(Boolean)));
}
