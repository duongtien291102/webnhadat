export const ADMIN_UPLOAD_MAX_FILE_BYTES = 25 * 1024 * 1024;
export const ADMIN_UPLOAD_ERROR_EVENT = 'nou-admin-upload-error';

const MAX_CHUNK_FILES = 8;
const MAX_CHUNK_BYTES = 25 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
]);

const ALLOWED_IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.gif',
]);

export type AdminUploadErrorDetail = {
  title: string;
  message: string;
};

function formatFileSizeMb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isSupportedImageFile(file: File): boolean {
  const mime = file.type.trim().toLowerCase();
  if (mime) return ALLOWED_IMAGE_TYPES.has(mime);

  const dotIndex = file.name.lastIndexOf('.');
  const ext = dotIndex >= 0 ? file.name.slice(dotIndex).toLowerCase() : '';
  return ALLOWED_IMAGE_EXTENSIONS.has(ext);
}

function notifyUploadError(title: string, message: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<AdminUploadErrorDetail>(ADMIN_UPLOAD_ERROR_EVENT, {
      detail: { title, message },
    }),
  );
}

function validateFilesBeforeUpload(files: File[]) {
  const emptyFiles = files.filter((file) => file.size <= 0);
  if (emptyFiles.length > 0) {
    const names = emptyFiles.slice(0, 3).map((file) => `"${file.name}"`).join(', ');
    const message = `Tệp ảnh ${names} bị rỗng hoặc không hợp lệ. Vui lòng chọn ảnh khác.`;
    notifyUploadError('Tệp ảnh không hợp lệ', message);
    throw new Error(message);
  }

  const unsupportedFiles = files.filter((file) => !isSupportedImageFile(file));
  if (unsupportedFiles.length > 0) {
    const names = unsupportedFiles.slice(0, 3).map((file) => `"${file.name}"`).join(', ');
    const message = `Tệp ${names} không đúng định dạng ảnh được hỗ trợ (chỉ nhận JPG, PNG, WebP, AVIF, GIF).`;
    notifyUploadError('Định dạng ảnh không được hỗ trợ', message);
    throw new Error(message);
  }

  const oversizedFiles = files.filter((file) => file.size > ADMIN_UPLOAD_MAX_FILE_BYTES);
  if (oversizedFiles.length > 0) {
    const summary = oversizedFiles
      .slice(0, 3)
      .map((file) => `"${file.name}" (${formatFileSizeMb(file.size)})`)
      .join(', ');
    const extraCount = oversizedFiles.length > 3 ? ` và ${oversizedFiles.length - 3} ảnh khác` : '';
    const message = `Ảnh ${summary}${extraCount} vượt quá giới hạn tối đa 25 MB mỗi ảnh. Vui lòng nén nhỏ lại trước khi tải lên.`;
    notifyUploadError('Ảnh vượt quá dung lượng cho phép', message);
    throw new Error(message);
  }
}

function buildUploadChunks(files: File[]): File[][] {
  const chunks: File[][] = [];
  let currentChunk: File[] = [];
  let currentBytes = 0;

  for (const file of files) {
    const wouldExceedCount = currentChunk.length >= MAX_CHUNK_FILES;
    const wouldExceedBytes = currentChunk.length > 0 && currentBytes + file.size > MAX_CHUNK_BYTES;

    if (wouldExceedCount || wouldExceedBytes) {
      chunks.push(currentChunk);
      currentChunk = [];
      currentBytes = 0;
    }

    currentChunk.push(file);
    currentBytes += file.size;
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

export async function uploadAdminImages(
  files: FileList | File[],
  folder: string,
): Promise<string[]> {
  const fileArray = Array.from(files);
  if (fileArray.length === 0) return [];

  validateFilesBeforeUpload(fileArray);

  const chunks = buildUploadChunks(fileArray);
  const uploadedUrls: string[] = [];

  for (const chunk of chunks) {
    const formData = new FormData();
    formData.append('folder', folder);
    for (const file of chunk) {
      formData.append('files', file);
    }

    let response: Response;
    try {
      response = await fetch('/api/admin/upload', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData,
      });
    } catch {
      const message = 'Không thể kết nối tới máy chủ để tải ảnh lên. Vui lòng kiểm tra mạng và thử lại.';
      notifyUploadError('Lỗi kết nối tải ảnh', message);
      throw new Error(message);
    }

    const result = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      urls?: string[];
      error?: string;
    };

    if (!response.ok || !result.success || !Array.isArray(result.urls)) {
      const message = response.status === 413
        ? 'Dung lượng ảnh tải lên vượt quá giới hạn cho phép (tối đa 25 MB mỗi ảnh).'
        : (result.error || 'Không thể tải ảnh lên máy chủ. Vui lòng thử lại.');
      notifyUploadError('Không thể tải ảnh lên', message);
      throw new Error(message);
    }

    uploadedUrls.push(...result.urls);
  }

  return uploadedUrls;
}
