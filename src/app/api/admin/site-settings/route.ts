import { z } from 'zod';
import { adminJsonResponse, guardAdminApiRequest } from '@/lib/admin/apiAuth';
import { revalidatePublicSite } from '@/lib/admin/revalidateSite';
import { ensureSiteSettingsSeeded, getSiteSettingsData, toPlainSiteSettings } from '@/lib/siteData';
import SiteSettingsModel from '@/models/SiteSettingsModel';

export const runtime = 'nodejs';

const HeroSlideSchema = z.object({
  id: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1, 'Tiêu đề slide không được để trống.').max(200),
  tagline: z.string().trim().max(500).default(''),
  image: z.string().trim().min(1, 'Vui lòng chọn ảnh cho slide.').max(500),
  meta: z.string().trim().max(200).default(''),
  href: z.string().trim().min(1).max(300).default('/style/all'),
});

const PhilosophyCardSchema = z.object({
  title: z.string().trim().min(1).max(120),
  iconName: z.string().trim().min(1).max(40).default('compass'),
  description: z.string().trim().max(600).default(''),
  image: z.string().trim().min(1, 'Vui lòng chọn ảnh cho thẻ triết lý.').max(500),
});

const MaterialSchema = z.object({
  id: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1, 'Tên vật liệu không được để trống.').max(120),
  vietnameseName: z.string().trim().min(1).max(120),
  image: z.string().trim().min(1, 'Vui lòng chọn ảnh cho vật liệu.').max(500),
  description: z.string().trim().max(800).default(''),
  details: z.string().trim().max(2000).default(''),
  highlights: z.array(z.string().trim().max(200)).max(15).default([]),
});

const FounderMemberSchema = z.object({
  id: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1, 'Tên thành viên không được để trống.').max(150),
  role: z.string().trim().min(1, 'Chức vụ không được để trống.').max(150),
  bio: z.string().trim().max(2000).default(''),
  image: z.string().trim().min(1, 'Vui lòng chọn ảnh cho thành viên.').max(500),
});

const SiteSettingsSchema = z.object({
  heroSlides: z.array(HeroSlideSchema).min(1, 'Cần ít nhất 1 slide banner trang chủ.').max(20),
  introduction: z.object({
    beforeImage: z.string().trim().min(1, 'Vui lòng chọn ảnh Trước (Sketch).').max(500),
    beforeLabel: z.string().trim().max(150).default('SKETCH • BẢN VẼ SƠ PHÁC'),
    afterImage: z.string().trim().min(1, 'Vui lòng chọn ảnh Sau (Thực tế).').max(500),
    afterLabel: z.string().trim().max(150).default('REALITY • KHÔNG GIAN BÀN GIAO'),
    philosophyCards: z.array(PhilosophyCardSchema).min(1).max(6),
  }),
  materials: z.array(MaterialSchema).min(1, 'Cần ít nhất 1 vật liệu.').max(12),
  about: z.object({
    storyImage: z.string().trim().min(1, 'Vui lòng chọn ảnh câu chuyện thương hiệu.').max(500),
    founders: z.array(FounderMemberSchema).min(1, 'Cần ít nhất 1 thành viên đội ngũ.').max(20),
    teamGroupTitle: z.string().trim().max(200).default('Và hơn 20 cộng sự tài năng khác.'),
    teamGroupDescription: z.string().trim().max(2000).default(''),
    teamGroupImage: z.string().trim().min(1, 'Vui lòng chọn ảnh tập thể đội ngũ.').max(500),
  }),
});

export async function GET(request: Request) {
  const authError = await guardAdminApiRequest(request, false);
  if (authError) return authError;

  try {
    const settings = await getSiteSettingsData({ throwOnError: true });
    return adminJsonResponse({ success: true, settings }, 200);
  } catch (error) {
    console.error('Lỗi tải cấu hình giao diện:', (error as { name?: string }).name || 'UnknownError');
    return adminJsonResponse({ error: 'Không thể kết nối cơ sở dữ liệu cấu hình.' }, 500);
  }
}

export async function PUT(request: Request) {
  const authError = await guardAdminApiRequest(request, true);
  if (authError) return authError;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return adminJsonResponse({ error: 'Dữ liệu cấu hình không hợp lệ.' }, 400);
  }

  const parsed = SiteSettingsSchema.safeParse(payload);
  if (!parsed.success) {
    const firstMessage = parsed.error.issues[0]?.message || 'Vui lòng kiểm tra đầy đủ thông tin.';
    return adminJsonResponse({ error: firstMessage }, 400);
  }

  try {
    await ensureSiteSettingsSeeded();
    const updated = await SiteSettingsModel.findOneAndUpdate(
      { key: 'main' },
      { $set: parsed.data },
      { new: true, upsert: true, runValidators: true },
    ).lean();

    revalidatePublicSite();

    return adminJsonResponse(
      {
        success: true,
        settings: toPlainSiteSettings(updated as unknown as Record<string, unknown> | null),
      },
      200,
    );
  } catch (error) {
    console.error('Lỗi lưu cấu hình giao diện:', (error as { name?: string }).name || 'UnknownError');
    return adminJsonResponse({ error: 'Không thể lưu cấu hình giao diện. Vui lòng thử lại.' }, 500);
  }
}
