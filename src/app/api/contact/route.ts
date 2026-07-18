import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/db';
import Contact from '@/models/Contact';

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 5;
const MAX_REQUESTS_PER_PHONE = 3;

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  area?: unknown;
  location?: unknown;
  material?: unknown;
  style?: unknown;
  message?: unknown;
  source?: unknown;
  website?: unknown;
};

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] ?? character);
}

function hash(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

function getClientIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')?.trim()
    || 'unknown';
}

function isSameOrigin(request: Request) {
  if (request.headers.get('sec-fetch-site') === 'cross-site') return false;

  const origin = request.headers.get('origin');
  if (!origin) return true;

  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function json(body: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json({ error: 'Yêu cầu không hợp lệ.' }, 403);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: 'Nội dung yêu cầu quá lớn.' }, 413);
  }

  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return json({ error: 'Dữ liệu gửi lên không hợp lệ.' }, 400);
  }

  // Honeypot: trình duyệt thật không nhìn thấy và không điền trường này.
  if (text(payload.website, 200)) {
    return json({ success: true, emailSent: false }, 201);
  }

  const name = text(payload.name, 100);
  const phone = text(payload.phone, 30).replace(/\s+/g, '');
  const areaInput = text(payload.area, 20);
  const location = text(payload.location, 120);
  const material = text(payload.material, 80);
  const style = text(payload.style, 80);
  const message = text(payload.message, 2_000);
  const source = text(payload.source, 200) || '/';
  const areaNumber = Number(areaInput);

  if (name.length < 2 || location.length < 2 || !areaInput) {
    return json({ error: 'Vui lòng cung cấp đầy đủ họ tên, diện tích và tỉnh/thành phố.' }, 400);
  }

  if (!/^0(3|5|7|8|9)[0-9]{8}$/.test(phone)) {
    return json({ error: 'Số điện thoại không hợp lệ. Vui lòng nhập đúng số Việt Nam.' }, 400);
  }

  if (!Number.isFinite(areaNumber) || areaNumber <= 0 || areaNumber > 100_000) {
    return json({ error: 'Diện tích phải lớn hơn 0 và nhỏ hơn 100.000 m².' }, 400);
  }

  try {
    await connectToDatabase();

    const now = Date.now();
    const secret = process.env.CONTACT_HASH_SECRET || process.env.DATABASE_URL || 'nou-contact';
    const ipHash = hash(`${secret}:${getClientIp(request)}`);
    const normalizedArea = String(areaNumber);
    const duplicateBucket = Math.floor(now / DUPLICATE_WINDOW_MS);
    const submissionKey = hash(JSON.stringify([
      phone,
      name.toLocaleLowerCase('vi'),
      normalizedArea,
      location.toLocaleLowerCase('vi'),
      material,
      style,
      message,
      duplicateBucket,
    ]));

    const duplicate = await Contact.findOne({ submissionKey }).select('emailSent').lean();
    if (duplicate) {
      return json({ success: true, emailSent: Boolean(duplicate.emailSent), duplicate: true }, 200);
    }

    const windowStart = new Date(now - RATE_LIMIT_WINDOW_MS);
    const [ipRequestCount, phoneRequestCount] = await Promise.all([
      Contact.countDocuments({ ipHash, createdAt: { $gte: windowStart } }),
      Contact.countDocuments({ phone, createdAt: { $gte: windowStart } }),
    ]);

    if (ipRequestCount >= MAX_REQUESTS_PER_IP || phoneRequestCount >= MAX_REQUESTS_PER_PHONE) {
      return json(
        { error: 'Bạn đã gửi nhiều yêu cầu trong thời gian ngắn. Vui lòng thử lại sau 15 phút.' },
        429,
        { 'Retry-After': '900' },
      );
    }

    let newContact;
    try {
      newContact = await Contact.create({
        name,
        phone,
        area: normalizedArea,
        location,
        material,
        style,
        message,
        source,
        ipHash,
        submissionKey,
        emailSent: false,
        emailStatus: 'pending',
      });
    } catch (error) {
      if ((error as { code?: number }).code === 11000) {
        const existing = await Contact.findOne({ submissionKey }).select('emailSent').lean();
        return json({ success: true, emailSent: Boolean(existing?.emailSent), duplicate: true }, 200);
      }
      throw error;
    }

    let emailSent = false;
    let emailStatus: 'sent' | 'failed' | 'skipped' = 'skipped';
    let emailErrorCode = '';

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const port = Number(process.env.SMTP_PORT) || 587;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port,
        secure: port === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        connectionTimeout: 8_000,
        greetingTimeout: 8_000,
        socketTimeout: 12_000,
        disableFileAccess: true,
        disableUrlAccess: true,
      });

      const safeName = escapeHtml(name);
      const safePhone = escapeHtml(phone);
      const safeArea = escapeHtml(normalizedArea);
      const safeLocation = escapeHtml(location);
      const safeMaterial = escapeHtml(material || 'Chưa lựa chọn');
      const safeStyle = escapeHtml(style || 'Chưa lựa chọn');
      const safeMessage = escapeHtml(message || 'Không có').replace(/\n/g, '<br/>');
      const safeSource = escapeHtml(source);

      try {
        await transporter.sendMail({
          from: `"NOU System" <${process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
          subject: `[NOU] Khách hàng mới: ${name.replace(/[\r\n]/g, ' ')} - ${phone}`,
          disableFileAccess: true,
          disableUrlAccess: true,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
              <div style="background:#0a0a0a;color:#fff;padding:24px;text-align:center">
                <h2 style="margin:0;font-weight:500;letter-spacing:2px">NOU.Design</h2>
                <p style="margin:8px 0 0;color:#a3a3a3;font-size:14px">YÊU CẦU TƯ VẤN MỚI</p>
              </div>
              <div style="padding:32px 24px;background:#fcfbf9;color:#171717">
                <p>Hệ thống vừa ghi nhận một yêu cầu tư vấn mới:</p>
                <div style="background:#fff;border:1px solid #e5e7eb;border-radius:4px;padding:16px;margin:24px 0">
                  <p><strong>Họ và tên:</strong> ${safeName}</p>
                  <p><strong>Số điện thoại:</strong> ${safePhone}</p>
                  <p><strong>Diện tích:</strong> ${safeArea} m²</p>
                  <p><strong>Vị trí:</strong> ${safeLocation}</p>
                  <p><strong>Vật liệu quan tâm:</strong> ${safeMaterial}</p>
                  <p><strong>Phong cách:</strong> ${safeStyle}</p>
                  <p><strong>Nguồn gửi:</strong> ${safeSource}</p>
                  <p><strong>Ghi chú:</strong> ${safeMessage}</p>
                </div>
                <p style="font-size:14px;color:#525252">Vui lòng liên hệ khách hàng trong thời gian sớm nhất.</p>
              </div>
            </div>
          `,
        });
        emailSent = true;
        emailStatus = 'sent';
      } catch (error) {
        emailStatus = 'failed';
        emailErrorCode = text((error as { code?: unknown }).code, 80) || 'SMTP_ERROR';
        console.error('Không thể gửi email liên hệ:', emailErrorCode);
      } finally {
        transporter.close();
      }
    }

    await Contact.updateOne(
      { _id: newContact._id },
      {
        $set: {
          emailSent,
          emailStatus,
          emailErrorCode,
          emailLastAttemptAt: new Date(),
        },
      },
    );

    return json({ success: true, emailSent }, 201);
  } catch (error) {
    console.error('Không thể xử lý yêu cầu liên hệ:', (error as { name?: string }).name || 'UnknownError');
    return json({ error: 'Hệ thống chưa thể ghi nhận yêu cầu. Vui lòng thử lại sau.' }, 500);
  }
}
