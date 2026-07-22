import { createHash } from 'crypto';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '@/lib/db';
import { isSameOriginAdminRequest } from '@/lib/admin/host';
import { createAdminSession } from '@/lib/admin/session';
import AdminLoginAttempt from '@/models/AdminLoginAttempt';

const MAX_BODY_BYTES = 4_000;
const MAX_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const BLOCK_DURATION_MS = 30 * 60 * 1000;
const ATTEMPT_TTL_MS = 24 * 60 * 60 * 1000;

const LoginSchema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});

function json(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store, private',
      ...headers,
    },
  });
}

function getClientIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')?.trim()
    || 'unknown';
}

function getAttemptKey(request: Request, username: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || 'nou-admin-login';
  return createHash('sha256')
    .update(`${secret}:${getClientIp(request)}:${username.toLowerCase()}`)
    .digest('hex');
}

async function registerFailedAttempt(key: string, now: Date) {
  const windowStart = new Date(now.getTime() - ATTEMPT_WINDOW_MS);
  const current = await AdminLoginAttempt.findOne({ key });

  if (!current || current.windowStartedAt < windowStart) {
    await AdminLoginAttempt.updateOne(
      { key },
      {
        $set: {
          attempts: 1,
          windowStartedAt: now,
          expiresAt: new Date(now.getTime() + ATTEMPT_TTL_MS),
        },
        $unset: { blockedUntil: 1 },
      },
      { upsert: true },
    );
    return false;
  }

  current.attempts += 1;
  current.expiresAt = new Date(now.getTime() + ATTEMPT_TTL_MS);
  if (current.attempts >= MAX_ATTEMPTS) {
    current.blockedUntil = new Date(now.getTime() + BLOCK_DURATION_MS);
  }
  await current.save();
  return Boolean(current.blockedUntil && current.blockedUntil > now);
}

export async function POST(request: Request) {
  if (!isSameOriginAdminRequest(request)) {
    return json({ error: 'Yêu cầu đăng nhập không hợp lệ.' }, 403);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: 'Nội dung yêu cầu quá lớn.' }, 413);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Dữ liệu đăng nhập không hợp lệ.' }, 400);
  }

  const parsed = LoginSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu.' }, 400);
  }

  const configuredUsername = process.env.ADMIN_USERNAME?.trim();
  const configuredPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (!configuredUsername || !configuredPasswordHash || !process.env.ADMIN_SESSION_SECRET) {
    return json({ error: 'Tài khoản quản trị chưa được cấu hình.' }, 503);
  }

  try {
    await connectToDatabase();
    const now = new Date();
    const attemptKey = getAttemptKey(request, parsed.data.username);
    const currentAttempt = await AdminLoginAttempt.findOne({ key: attemptKey }).lean();

    if (currentAttempt?.blockedUntil && currentAttempt.blockedUntil > now) {
      const retryAfter = Math.max(1, Math.ceil((currentAttempt.blockedUntil.getTime() - now.getTime()) / 1000));
      return json(
        { error: 'Đăng nhập tạm thời bị khóa. Vui lòng thử lại sau.' },
        429,
        { 'Retry-After': String(retryAfter) },
      );
    }

    const passwordMatches = await bcrypt.compare(parsed.data.password, configuredPasswordHash);
    const usernameMatches = parsed.data.username.toLocaleLowerCase('vi')
      === configuredUsername.toLocaleLowerCase('vi');

    if (!usernameMatches || !passwordMatches) {
      const isBlocked = await registerFailedAttempt(attemptKey, now);
      return json(
        {
          error: isBlocked
            ? 'Đăng nhập tạm thời bị khóa. Vui lòng thử lại sau.'
            : 'Tài khoản hoặc mật khẩu không đúng.',
        },
        isBlocked ? 429 : 401,
        isBlocked ? { 'Retry-After': String(BLOCK_DURATION_MS / 1000) } : undefined,
      );
    }

    await Promise.all([
      AdminLoginAttempt.deleteOne({ key: attemptKey }),
      createAdminSession(),
    ]);

    return json({ success: true }, 200);
  } catch (error) {
    console.error('Không thể xử lý đăng nhập quản trị:', (error as { name?: string }).name || 'UnknownError');
    return json({ error: 'Hệ thống quản trị đang bận. Vui lòng thử lại.' }, 500);
  }
}
