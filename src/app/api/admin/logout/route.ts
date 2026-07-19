import { NextResponse } from 'next/server';
import { isSameOriginAdminRequest } from '@/lib/admin/host';
import { deleteAdminSession } from '@/lib/admin/session';

export async function POST(request: Request) {
  if (!isSameOriginAdminRequest(request)) {
    return NextResponse.json(
      { error: 'Yêu cầu không hợp lệ.' },
      { status: 403, headers: { 'Cache-Control': 'no-store, private' } },
    );
  }

  await deleteAdminSession();
  return NextResponse.json(
    { success: true },
    { status: 200, headers: { 'Cache-Control': 'no-store, private' } },
  );
}
