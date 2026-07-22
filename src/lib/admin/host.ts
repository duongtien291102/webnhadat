import 'server-only';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const DEFAULT_ADMIN_HOST = 'admin.noudesign.vn';

function normalizeHost(value: string | null | undefined) {
  return value?.split(',')[0]?.trim().toLowerCase().replace(/:\d+$/, '') || '';
}

export function getAdminHost() {
  return normalizeHost(process.env.ADMIN_HOST) || DEFAULT_ADMIN_HOST;
}

export function isAdminRequestHost(value: string | null | undefined) {
  if (process.env.NODE_ENV !== 'production') return true;
  return normalizeHost(value) === getAdminHost();
}

export function hasAdminRequestHost(request: Request) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const requestHost = forwardedHost || request.headers.get('host') || new URL(request.url).host;
  return isAdminRequestHost(requestHost);
}

export async function requireAdminHost(pathname: string) {
  const headerStore = await headers();
  const host = headerStore.get('x-forwarded-host') || headerStore.get('host');

  if (!isAdminRequestHost(host)) {
    redirect(`https://${getAdminHost()}${pathname}`);
  }
}

export function isSameOriginAdminRequest(request: Request) {
  if (!hasAdminRequestHost(request)) return false;
  if (request.headers.get('sec-fetch-site') === 'cross-site') return false;

  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    return normalizeHost(new URL(origin).host) === getAdminHost()
      || process.env.NODE_ENV !== 'production';
  } catch {
    return false;
  }
}
