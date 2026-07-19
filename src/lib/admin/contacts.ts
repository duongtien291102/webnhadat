import 'server-only';

import connectToDatabase from '@/lib/db';
import Contact from '@/models/Contact';
import { requireAdminSession } from './session';

const PAGE_SIZE = 20;
const EMAIL_STATUSES = ['all', 'sent', 'failed', 'pending', 'skipped'] as const;

export type AdminEmailStatus = (typeof EMAIL_STATUSES)[number];

export type AdminContact = {
  id: string;
  name: string;
  phone: string;
  area: string;
  location: string;
  material: string;
  style: string;
  message: string;
  source: string;
  emailSent: boolean;
  emailStatus: Exclude<AdminEmailStatus, 'all'>;
  emailErrorCode: string;
  createdAt: string;
};

export type AdminContactFilters = {
  page: number;
  query: string;
  emailStatus: AdminEmailStatus;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normalizeContactFilters(input: {
  page?: string;
  q?: string;
  status?: string;
}): AdminContactFilters {
  const parsedPage = Number(input.page);
  const emailStatus = EMAIL_STATUSES.includes(input.status as AdminEmailStatus)
    ? input.status as AdminEmailStatus
    : 'all';

  return {
    page: Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1,
    query: input.q?.trim().slice(0, 100) || '',
    emailStatus,
  };
}

export async function getAdminContacts(filters: AdminContactFilters) {
  await requireAdminSession();
  await connectToDatabase();

  const conditions: Record<string, unknown>[] = [];

  if (filters.emailStatus === 'sent') {
    conditions.push({
      $or: [
        { emailStatus: 'sent' },
        { emailStatus: { $exists: false }, emailSent: true },
      ],
    });
  } else if (filters.emailStatus === 'pending') {
    conditions.push({
      $or: [
        { emailStatus: 'pending' },
        { emailStatus: { $exists: false }, emailSent: { $ne: true } },
      ],
    });
  } else if (filters.emailStatus !== 'all') {
    conditions.push({ emailStatus: filters.emailStatus });
  }

  if (filters.query) {
    const safeQuery = escapeRegExp(filters.query);
    conditions.push({
      $or: [
        { name: { $regex: safeQuery, $options: 'i' } },
        { phone: { $regex: safeQuery, $options: 'i' } },
        { location: { $regex: safeQuery, $options: 'i' } },
      ],
    });
  }

  const query = conditions.length ? { $and: conditions } : {};

  const [records, total, totalAll, sent, failed] = await Promise.all([
    Contact.find(query)
      .select('name phone area location material style message source emailSent emailStatus emailErrorCode createdAt')
      .sort({ createdAt: -1, _id: -1 })
      .skip((filters.page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    Contact.countDocuments(query),
    Contact.countDocuments({}),
    Contact.countDocuments({
      $or: [
        { emailStatus: 'sent' },
        { emailStatus: { $exists: false }, emailSent: true },
      ],
    }),
    Contact.countDocuments({ emailStatus: 'failed' }),
  ]);

  const contacts: AdminContact[] = records.map((record) => {
    const knownStatus = ['sent', 'failed', 'pending', 'skipped'].includes(record.emailStatus)
      ? record.emailStatus as AdminContact['emailStatus']
      : record.emailSent ? 'sent' : 'pending';

    return {
      id: String(record._id),
      name: record.name || 'Chưa cung cấp',
      phone: record.phone || '',
      area: record.area || '',
      location: record.location || 'Chưa cung cấp',
      material: record.material || '',
      style: record.style || '',
      message: record.message || '',
      source: record.source || '/',
      emailSent: Boolean(record.emailSent),
      emailStatus: knownStatus,
      emailErrorCode: record.emailErrorCode || '',
      createdAt: record.createdAt ? new Date(record.createdAt).toISOString() : '',
    };
  });

  return {
    contacts,
    summary: {
      totalAll,
      sent,
      failed,
      pending: Math.max(0, totalAll - sent - failed),
    },
    pagination: {
      page: filters.page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    },
  };
}
