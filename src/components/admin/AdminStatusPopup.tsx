'use client';

import { useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export interface AdminStatusMessage {
  type: 'success' | 'error';
  text: string;
}

interface AdminStatusPopupProps {
  status: AdminStatusMessage | null;
  onClose: () => void;
  durationMs?: number;
}

export default function AdminStatusPopup({
  status,
  onClose,
  durationMs = 5000,
}: AdminStatusPopupProps) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => onCloseRef.current(), durationMs);
    return () => window.clearTimeout(timer);
  }, [status, durationMs]);

  if (!status) return null;

  const isSuccess = status.type === 'success';

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 w-[min(92vw,420px)] animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div
        className={`flex items-start gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-sm ${
          isSuccess
            ? 'border-emerald-300 bg-emerald-50/95 text-emerald-950'
            : 'border-red-300 bg-red-50/95 text-red-950'
        }`}
      >
        <div className="mt-0.5 shrink-0">
          {isSuccess ? (
            <CheckCircle2 size={20} className="text-emerald-600" />
          ) : (
            <AlertCircle size={20} className="text-red-600" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">
            {isSuccess ? 'Thành công' : 'Thất bại'}
          </p>
          <p className="mt-0.5 text-xs leading-5 opacity-90">{status.text}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng thông báo"
          className="shrink-0 rounded-md p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100 cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
