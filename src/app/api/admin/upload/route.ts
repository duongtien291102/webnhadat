import { NextResponse } from 'next/server';
import { guardAdminApiRequest, adminJsonResponse } from '@/lib/admin/apiAuth';
import { saveUploadedImage, UploadValidationError } from '@/lib/admin/uploadStorage';

export const runtime = 'nodejs';

const MAX_FILES_PER_REQUEST = 30;

export async function POST(request: Request) {
  const authError = await guardAdminApiRequest(request, true);
  if (authError) return authError;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return adminJsonResponse({ error: 'Dữ liệu tải ảnh không hợp lệ.' }, 400);
  }

  const rawFiles = formData.getAll('files');
  const singleFile = formData.get('file');
  const files = (rawFiles.length > 0 ? rawFiles : singleFile ? [singleFile] : [])
    .filter((entry): entry is File => entry instanceof File);

  if (files.length === 0) {
    return adminJsonResponse({ error: 'Vui lòng chọn ít nhất một tệp ảnh để tải lên.' }, 400);
  }

  if (files.length > MAX_FILES_PER_REQUEST) {
    return adminJsonResponse(
      { error: `Chỉ có thể tải lên tối đa ${MAX_FILES_PER_REQUEST} ảnh mỗi lần.` },
      400,
    );
  }

  const folder = String(formData.get('folder') || 'projects');

  try {
    const urls = await Promise.all(files.map((file) => saveUploadedImage(file, folder)));
    return NextResponse.json(
      { success: true, urls },
      { status: 200, headers: { 'Cache-Control': 'no-store, private' } },
    );
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return adminJsonResponse({ error: error.message }, error.status);
    }
    console.error('Lỗi tải ảnh quản trị:', (error as { name?: string }).name || 'UnknownError');
    return adminJsonResponse({ error: 'Không thể xử lý ảnh tải lên. Vui lòng thử lại.' }, 500);
  }
}
