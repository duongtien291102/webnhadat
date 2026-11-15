import 'server-only';

import { randomBytes } from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
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

export class UploadValidationError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = 'UploadValidationError';
    this.status = status;
  }
}

export function getUploadRootDir() {
  const configured = process.env.UPLOAD_DIR?.trim();
  if (configured) return path.resolve(/*turbopackIgnore: true*/ configured);

  const cwd = path.resolve(/*turbopackIgnore: true*/ process.cwd());
  if (/[/\\](\.deploy[/\\](current|next)|\.next[/\\]standalone)$/.test(cwd)) {
    return path.resolve(/*turbopackIgnore: true*/ cwd, '../..', 'uploads');
  }

  return path.resolve(/*turbopackIgnore: true*/ cwd, 'uploads');
}

function sanitizeFolder(folder: string) {
  const cleaned = folder
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  return cleaned || 'general';
}

function isSupportedImageFile(file: File) {
  const mime = file.type.trim().toLowerCase();
  if (mime) return ALLOWED_IMAGE_TYPES.has(mime);

  const ext = path.extname(file.name || '').toLowerCase();
  return ALLOWED_IMAGE_EXTENSIONS.has(ext);
}

export async function saveUploadedImage(file: File, folder = 'general'): Promise<string> {
  if (!file || file.size <= 0) {
    throw new UploadValidationError('Tệp ảnh tải lên không hợp lệ hoặc bị rỗng.', 400);
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new UploadValidationError('Mỗi ảnh tải lên không được vượt quá 25 MB.', 413);
  }

  if (!isSupportedImageFile(file)) {
    throw new UploadValidationError('Chỉ hỗ trợ các định dạng ảnh JPG, PNG, WebP, AVIF hoặc GIF.', 400);
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());

  let outputBuffer: Buffer;
  try {
    outputBuffer = await sharp(inputBuffer)
      .rotate()
      .resize({
        width: 2000,
        height: 2000,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    throw new UploadValidationError('Không thể đọc hoặc nén tệp ảnh này. Vui lòng chọn ảnh khác.', 400);
  }

  const safeFolder = sanitizeFolder(folder);
  const targetDir = path.join(getUploadRootDir(), safeFolder);
  await fs.mkdir(targetDir, { recursive: true });

  const filename = `${Date.now()}-${randomBytes(6).toString('hex')}.webp`;
  await fs.writeFile(path.join(targetDir, filename), outputBuffer);

  return `/api/uploads/${safeFolder}/${filename}`;
}
