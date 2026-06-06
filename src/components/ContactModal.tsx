"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Sliders, Home, Layers } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMaterial?: string;
}

export default function ContactModal({ isOpen, onClose, initialMaterial = "" }: ContactModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState(85);
  const [material, setMaterial] = useState(initialMaterial || 'nordic-oak');
  const [style, setStyle] = useState('minimalist');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync initial material if changed
  React.useEffect(() => {
    if (initialMaterial) {
      setMaterial(initialMaterial);
    }
  }, [initialMaterial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setArea(85);
    setMessage('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative z-10 w-full max-w-xl bg-[#fcfbf9] shadow-2xl h-full flex flex-col border-l border-neutral-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-[#f7f5f0]">
              <div>
                <span className="mono-tag text-xs text-neutral-500 uppercase">Nou Architects</span>
                <h3 className="text-2xl font-serif text-neutral-900 font-medium">Đặt Lịch Tư Vấn</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-200 rounded-full transition-colors duration-200 text-neutral-500 hover:text-neutral-900"
                id="close-modal-btn"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Client Info */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                      <Home size={16} /> Thông tin khách hàng
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1">Họ và tên của bạn *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-md focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1">Số điện thoại liên lạc *</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10,11}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Số điện thoại (ví dụ: 0912345678)"
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-md focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Configurator Details */}
                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                      <Sliders size={16} /> Quy mô & Phong cách
                    </h4>

                    {/* Area Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-medium text-neutral-600">Diện tích ước lượng (m²)</label>
                        <span className="text-sm font-bold text-neutral-800">{area} m²</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="500"
                        value={area}
                        onChange={(e) => setArea(Number(e.target.value))}
                        className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-950"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                        <span>Chung cư (30m²)</span>
                        <span>Biệt thự (500m²+)</span>
                      </div>
                    </div>

                    {/* Preferred Style */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-2">Định hướng phong cách</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'minimalist', label: 'Tối Giản Japandi' },
                          { id: 'modern', label: 'Hiện Đại Tinh Tế' },
                          { id: 'cozy', label: 'Ấm Cúng Độc Bản' },
                        ].map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setStyle(s.id)}
                            className={`py-2 px-1 text-center rounded text-xs border transition-all ${
                              style === s.id
                                ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-400'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Material Swatch Choice */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-2">Vật liệu chủ đạo quan tâm</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'nordic-oak', label: 'Gỗ Sồi Nordic Oak' },
                          { id: 'micro-cement', label: 'Bê-tông Micro-cement' },
                          { id: 'raw-linen', label: 'Vải Linen Tự Nhiên' },
                          { id: 'oxidized-steel', label: 'Thép Độc Bản Oxidized' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setMaterial(m.id)}
                            className={`py-3 px-3 text-left rounded-md border flex items-center justify-between text-xs transition-all ${
                              material === m.id
                                ? 'bg-neutral-950 border-neutral-950 text-white'
                                : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400'
                            }`}
                          >
                            <span>{m.label}</span>
                            <div className={`w-3 h-3 rounded-full border ${
                              material === m.id ? 'bg-white border-neutral-950' : 'bg-neutral-200 border-transparent'
                            }`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2 pt-4 border-t border-neutral-100">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                      <Layers size={16} /> Ghi chú thêm
                    </h4>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1">Mô tả định hướng thiết kế (tùy chọn)</label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Hãy chia sẻ thêm về những mong muốn và ý tưởng cho ngôi nhà tương lai của bạn..."
                        className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-md focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-neutral-950 text-white hover:bg-neutral-850 py-4 px-6 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-neutral-950/10 active:scale-98 disabled:opacity-55"
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
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
                >
                  <div className="w-16 h-16 bg-neutral-900 text-[#e9dcce] rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 size={36} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-serif font-medium text-neutral-900">Gửi Yêu Cầu Thành Công</h4>
                  <p className="text-sm text-neutral-600 max-w-sm leading-relaxed">
                    Chào <strong className="text-neutral-900">{name}</strong>, chúng tôi đã ghi nhận yêu cầu tư vấn thiết kế căn hộ rộng <strong className="text-neutral-900">{area} m²</strong> theo phong cách <strong className="text-neutral-900">{style === 'minimalist' ? 'Tối Giản Japandi' : style === 'modern' ? 'Hiện Đại Cân Bằng' : 'Độc Bản Ấm Cúng'}</strong>.
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Kiến trúc sư của <strong className="text-neutral-900">Nou Architects</strong> sẽ trực tiếp kết nối với bạn qua số điện thoại <span className="text-neutral-900 font-mono font-medium">{phone}</span> trong vòng 1-2 giờ làm việc tới.
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
            </div>

            {/* Footer */}
            <div className="p-4 bg-neutral-50 text-center border-t border-neutral-100">
              <p className="text-[10px] text-neutral-400">
                Sản phẩm trí tuệ thuộc về © 2026 Nou Architects. Đã đăng ký bản quyền.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
