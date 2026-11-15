import { z } from 'zod';
import { adminJsonResponse, guardAdminApiRequest } from '@/lib/admin/apiAuth';
import { normalizeProjectGallery, ProjectBaseSchema } from '@/lib/admin/projectSchema';
import { revalidatePublicSite } from '@/lib/admin/revalidateSite';
import { ensureProjectsSeeded, getProjectsData, toPlainProject } from '@/lib/siteData';
import ProjectModel from '@/models/ProjectModel';

export const runtime = 'nodejs';

const CreateProjectSchema = ProjectBaseSchema.extend({
  id: z.string().trim().max(150).optional(),
});

function slugifyTitle(value: string) {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);

  return normalized || `du-an-${Date.now()}`;
}

async function generateUniqueProjectId(baseSlug: string) {
  const cleanBase = slugifyTitle(baseSlug);
  const existing = await ProjectModel.findOne({ id: cleanBase }).select('_id').lean();
  if (!existing) return cleanBase;

  for (let suffix = 2; suffix < 100; suffix += 1) {
    const candidate = `${cleanBase}-${suffix}`;
    const conflict = await ProjectModel.findOne({ id: candidate }).select('_id').lean();
    if (!conflict) return candidate;
  }

  return `${cleanBase}-${Date.now()}`;
}

export async function GET(request: Request) {
  const authError = await guardAdminApiRequest(request, false);
  if (authError) return authError;

  try {
    const projects = await getProjectsData({ throwOnError: true });
    return adminJsonResponse({ success: true, projects }, 200);
  } catch (error) {
    console.error('Lỗi tải danh sách dự án:', (error as { name?: string }).name || 'UnknownError');
    return adminJsonResponse({ error: 'Không thể kết nối cơ sở dữ liệu dự án.' }, 500);
  }
}

export async function POST(request: Request) {
  const authError = await guardAdminApiRequest(request, true);
  if (authError) return authError;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return adminJsonResponse({ error: 'Dữ liệu dự án không hợp lệ.' }, 400);
  }

  const parsed = CreateProjectSchema.safeParse(payload);
  if (!parsed.success) {
    const firstMessage = parsed.error.issues[0]?.message || 'Vui lòng kiểm tra thông tin dự án.';
    return adminJsonResponse({ error: firstMessage }, 400);
  }

  try {
    await ensureProjectsSeeded();

    const data = parsed.data;
    const projectId = await generateUniqueProjectId(data.id || data.title);
    const [topProject, totalCount] = await Promise.all([
      ProjectModel.findOne({}).sort({ sortOrder: 1 }).select('sortOrder').lean(),
      ProjectModel.countDocuments({}),
    ]);

    const gallery = normalizeProjectGallery(data.gallery, data.mainImage);
    const area = data.area || 'Liên hệ';
    const location = data.location || 'Hà Nội';

    const created = await ProjectModel.create({
      id: projectId,
      sortOrder: typeof topProject?.sortOrder === 'number' ? topProject.sortOrder - 1 : 0,
      index: data.index || String(totalCount + 1).padStart(2, '0'),
      title: data.title,
      tagline: data.tagline || `Dự án • Diện tích: ${area}`,
      description: data.description,
      bullets: data.bullets.filter(Boolean),
      highlightsHeader: data.highlightsHeader || 'THÔNG TIN DỰ ÁN:',
      highlights: data.highlights.length > 0
        ? data.highlights.filter(Boolean)
        : [
            `Địa điểm: ${location}`,
            `Diện tích: ${area}`,
            'Thiết kế & thi công: NOU.Design',
          ],
      mainImage: data.mainImage,
      cardImage: data.cardImage || data.mainImage,
      gallery,
      area,
      location,
      style: data.style,
      featuredOnHome: data.featuredOnHome,
    });

    revalidatePublicSite(projectId);

    return adminJsonResponse(
      {
        success: true,
        project: toPlainProject(created.toObject() as unknown as Record<string, unknown>),
      },
      201,
    );
  } catch (error) {
    console.error('Lỗi tạo dự án:', (error as { name?: string }).name || 'UnknownError');
    return adminJsonResponse({ error: 'Không thể tạo dự án mới. Vui lòng thử lại.' }, 500);
  }
}
