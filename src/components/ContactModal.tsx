"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, Send, CheckCircle2, Layers } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMaterial?: string;
  initialStyle?: string;
  initialArea?: number | string;
}

export default function ContactModal({
  isOpen,
  onClose,
  initialMaterial = '',
  initialStyle = '',
  initialArea = '',
}: ContactModalProps) {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState<string>('');
  const [location, setLocation] = useState('');
  const [material, setMaterial] = useState(initialMaterial);
  const [style, setStyle] = useState(initialStyle);
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const requestControllerRef = React.useRef<AbortController | null>(null);

  // Reset every modal session so a previous success/error cannot leak into the next one.
  React.useEffect(() => {
    if (isOpen) {
      setMaterial(initialMaterial);
      setStyle(initialStyle);
      setArea(initialArea ? String(initialArea) : '');
      setIsSuccess(false);
      setSubmitError('');
      return;
    }

    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    setName('');
    setPhone('');
    setArea('');
    setLocation('');
    setMaterial('');
    setStyle('');
    setMessage('');
    setWebsite('');
    setIsSubmitting(false);
    setIsSuccess(false);
    setSubmitError('');
  }, [initialArea, initialMaterial, initialStyle, isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => dialogRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'))
        .filter((element) => !element.hasAttribute('disabled'));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocus?.focus();
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !area || !location) {
      setSubmitError('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    const controller = new AbortController();
    requestControllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        signal: controller.signal,
        body: JSON.stringify({
          name,
          phone: phone.replace(/\s+/g, ''),
          area,
          location,
          material,
          style,
          message,
          source: window.location.pathname,
          website,
        }),
      });

      const result = await res.json().catch(() => ({})) as { error?: string; success?: boolean };
      if (!res.ok) {
        throw new Error(result.error || 'Chưa thể gửi thông tin.');
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Lỗi khi submit form:', error);
      setSubmitError(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'Kết nối mất quá nhiều thời gian. Vui lòng thử lại.'
          : error instanceof Error
            ? error.message
            : 'Chưa thể gửi yêu cầu. Vui lòng kiểm tra kết nối và thử lại.',
      );
    } finally {
      window.clearTimeout(timeout);
      if (requestControllerRef.current === controller) requestControllerRef.current = null;
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl max-h-[95vh] bg-background shadow-2xl rounded-sm flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-[#f7f5f0] dark:bg-[#1a1a1a]">
              <div>
                <span className="mono-tag text-xs text-neutral-500 dark:text-neutral-400 uppercase">NOU.Design</span>
                <h3 id="contact-dialog-title" className="text-2xl font-serif text-neutral-900 dark:text-neutral-100 font-medium">Để lại thông tin để chúng mình tư vấn nha</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Đóng bảng liên hệ"
                className="p-3 hover:bg-neutral-200 rounded-full transition-colors duration-200 text-neutral-500 hover:text-neutral-900 dark:text-neutral-100 cursor-pointer min-w-[48px] min-h-[48px] flex items-center justify-center"
                id="close-modal-btn"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <AnimatePresence mode="wait" initial={false}>
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-6"
                >
                  {/* Client Info */}
                  <div className="space-y-4">

                    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">Họ và tên của bạn *</label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">Số điện thoại liên lạc *</label>
                      <input
                        type="tel"
                        required
                        pattern="0(3|5|7|8|9)[0-9]{8}"
                        maxLength={10}
                        inputMode="numeric"
                        autoComplete="tel"
                        title="Vui lòng nhập đúng định dạng số điện thoại Việt Nam (10 số, bắt đầu bằng 03, 05, 07, 08, hoặc 09)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Số điện thoại (ví dụ: 0912345678)"
                        className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">Diện tích (m²) *</label>
                        <input
                          type="number"
                          required
                          min={1}
                          max={100000}
                          step="any"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          placeholder="Ví dụ: 80"
                          className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">Tỉnh / Thành phố *</label>
                        <input
                          type="text"
                          required
                          minLength={2}
                          maxLength={120}
                          autoComplete="address-level1"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Hà Nội, TP.HCM..."
                          className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>



                  {/* Message Field */}
                  <div className="space-y-2 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-300 flex items-center gap-2">
                      <Layers size={16} /> Ghi chú thêm
                    </h4>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">Mô tả định hướng thiết kế (tùy chọn)</label>
                      <textarea
                        rows={3}
                        maxLength={2000}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Hãy chia sẻ thêm về những mong muốn và ý tưởng cho ngôi nhà tương lai của bạn..."
                        className="w-full px-4 py-3 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="w-full bg-neutral-950 dark:bg-white text-white dark:text-black hover:bg-neutral-850 dark:hover:bg-neutral-200 py-4 px-6 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-neutral-950/10 active:scale-98 disabled:opacity-55"
                    id="submit-consult-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Đang gửi thông tin...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>GỬI YÊU CẦU ĐĂNG KÝ TƯ VẤN</span>
                      </>
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {submitError && (
                      <motion.p
                        role="alert"
                        initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="text-sm text-red-700 dark:text-red-300"
                      >
                        {submitError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
                >
                  <div className="w-16 h-16 bg-neutral-900 text-[#e9dcce] rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 size={36} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-serif font-medium text-neutral-900 dark:text-neutral-100">Gửi Yêu Cầu Thành Công</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-sm leading-relaxed">
                    Chào <strong className="text-neutral-900 dark:text-neutral-100">{name}</strong>, chúng tôi đã ghi nhận yêu cầu tư vấn của bạn.
                  </p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-300 leading-relaxed">
                    Kiến trúc sư của <strong className="text-neutral-900 dark:text-neutral-100">NOU.Design</strong> sẽ trực tiếp kết nối với bạn qua số điện thoại <span className="text-neutral-900 dark:text-neutral-100 font-sans font-medium">{phone}</span> trong vòng 1-2 giờ làm việc tới.
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-6 px-6 py-2 border border-neutral-300 rounded hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all text-xs"
                    id="close-success-btn"
                  >
                    Đóng cửa sổ
                  </button>
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 bg-neutral-50 dark:bg-[#1a1a1a] text-center border-t border-neutral-100 dark:border-neutral-800">
              <p className="text-[10px] text-neutral-400 dark:text-neutral-300">
                Sản phẩm trí tuệ thuộc về © 2026 NOU.Design. Đã đăng ký bản quyền.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
