import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { getUploadRootDir } from '@/lib/admin/uploadStorage';

export const runtime = 'nodejs';

const SAFE_SEGMENT = /^[a-zA-Z0-9._-]+$/;

function getContentType(filePath: string) {
  switch (path.extname(filePath).toLowerCase()) {
    case '.webp':
      return 'image/webp';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.avif':
      return 'image/avif';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;

  if (!Array.isArray(segments) || segments.length === 0 || segments.length > 4) {
    return new NextResponse('Not Found', { status: 404 });
  }

  for (const segment of segments) {
    if (!segment || segment === '.' || segment === '..' || !SAFE_SEGMENT.test(segment)) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  const rootDir = path.resolve(/*turbopackIgnore: true*/ getUploadRootDir());
  const resolvedPath = path.resolve(/*turbopackIgnore: true*/ rootDir, ...segments);
  if (resolvedPath !== rootDir && !resolvedPath.startsWith(`${rootDir}${path.sep}`)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  try {
    const fileBuffer = await fs.readFile(/*turbopackIgnore: true*/ resolvedPath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': getContentType(resolvedPath),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === 'ENOENT' || code === 'ENOTDIR' || code === 'EISDIR') {
      return new NextResponse('Not Found', { status: 404 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
