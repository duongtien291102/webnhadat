import 'server-only';

import { NextResponse } from 'next/server';
import { hasAdminRequestHost, isSameOriginAdminRequest } from '@/lib/admin/host';
import { getAdminSession } from '@/lib/admin/session';

export function adminJsonResponse(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store, private' },
  });
}

export async function guardAdminApiRequest(request: Request, requireSameOrigin: boolean) {
  const validHost = requireSameOrigin
    ? isSameOriginAdminRequest(request)
    : hasAdminRequestHost(request);

  if (!validHost) {
    return adminJsonResponse({ error: 'Yêu cầu quản trị không hợp lệ.' }, 403);
  }

  const session = await getAdminSession();
  if (!session) {
    return adminJsonResponse(
      { error: 'Phiên đăng nhập quản trị đã hết hạn. Vui lòng đăng nhập lại.' },
      401,
    );
  }

  return null;
}
