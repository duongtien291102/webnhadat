import { z } from 'zod';
import { adminJsonResponse, guardAdminApiRequest } from '@/lib/admin/apiAuth';
import { normalizeProjectGallery, ProjectBaseSchema } from '@/lib/admin/projectSchema';
import { revalidatePublicSite } from '@/lib/admin/revalidateSite';
import { ensureProjectsSeeded, toPlainProject } from '@/lib/siteData';
import ProjectModel from '@/models/ProjectModel';

export const runtime = 'nodejs';

const UpdateProjectSchema = ProjectBaseSchema.extend({
  sortOrder: z.number().int().optional(),
});

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const authError = await guardAdminApiRequest(request, true);
  if (authError) return authError;

  const { id } = await context.params;
  if (!id) {
    return adminJsonResponse({ error: 'Thiếu mã dự án.' }, 400);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return adminJsonResponse({ error: 'Dữ liệu cập nhật dự án không hợp lệ.' }, 400);
  }

  const parsed = UpdateProjectSchema.safeParse(payload);
  if (!parsed.success) {
    const firstMessage = parsed.error.issues[0]?.message || 'Vui lòng kiểm tra thông tin dự án.';
    return adminJsonResponse({ error: firstMessage }, 400);
  }

  try {
    await ensureProjectsSeeded();

    const data = parsed.data;
    const gallery = normalizeProjectGallery(data.gallery, data.mainImage);
    const updateFields: Record<string, unknown> = {
      title: data.title,
      tagline: data.tagline || `Dự án • Diện tích: ${data.area || 'Liên hệ'}`,
      description: data.description,
      bullets: data.bullets.filter(Boolean),
      highlightsHeader: data.highlightsHeader || 'THÔNG TIN DỰ ÁN:',
      highlights: data.highlights.filter(Boolean),
      mainImage: data.mainImage,
      cardImage: data.cardImage || data.mainImage,
      gallery,
      area: data.area || 'Liên hệ',
      location: data.location || 'Hà Nội',
      style: data.style,
      featuredOnHome: data.featuredOnHome,
    };

    if (data.index !== undefined) updateFields.index = data.index;
    if (data.sortOrder !== undefined) updateFields.sortOrder = data.sortOrder;

    const updated = await ProjectModel.findOneAndUpdate(
      { id },
      { $set: updateFields },
      { new: true, runValidators: true },
    ).lean();

    if (!updated) {
      return adminJsonResponse({ error: 'Không tìm thấy dự án cần cập nhật.' }, 404);
    }

    revalidatePublicSite(id);

    return adminJsonResponse(
      {
        success: true,
        project: toPlainProject(updated as unknown as Record<string, unknown>),
      },
      200,
    );
  } catch (error) {
    console.error('Lỗi cập nhật dự án:', (error as { name?: string }).name || 'UnknownError');
    return adminJsonResponse({ error: 'Không thể lưu thay đổi dự án. Vui lòng thử lại.' }, 500);
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const authError = await guardAdminApiRequest(request, true);
  if (authError) return authError;

  const { id } = await context.params;
  if (!id) {
    return adminJsonResponse({ error: 'Thiếu mã dự án.' }, 400);
  }

  try {
    await ensureProjectsSeeded();
    const deleted = await ProjectModel.findOneAndDelete({ id }).lean();
    if (!deleted) {
      return adminJsonResponse({ error: 'Không tìm thấy dự án để xóa.' }, 404);
    }

    revalidatePublicSite(id);

    return adminJsonResponse({ success: true, id }, 200);
  } catch (error) {
    console.error('Lỗi xóa dự án:', (error as { name?: string }).name || 'UnknownError');
    return adminJsonResponse({ error: 'Không thể xóa dự án. Vui lòng thử lại.' }, 500);
  }
}
