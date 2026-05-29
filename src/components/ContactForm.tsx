import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Mail, MapPin, Sparkles } from 'lucide-react';
import { Inquiry } from '../types';

interface ContactFormProps {
  initialProjectType?: string;
  initialMessage?: string;
  onInquirySubmitted: (inquiry: Inquiry) => void;
}

export default function ContactForm({
  initialProjectType = 'Thiết kế nội thất',
  initialMessage = '',
  onInquirySubmitted
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Thiết kế nội thất');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync with calculator estimates or service click triggers
  useEffect(() => {
    if (initialProjectType) {
      setProjectType(initialProjectType);
    }
  }, [initialProjectType]);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Vui lòng nhập tên của bạn.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Vui lòng cung cấp email hợp lệ.');
      return;
    }

    setErrorMsg('');

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      clientName: name,
      email,
      projectType,
      message,
      status: 'Chờ xử lý',
      createdAt: new Date().toLocaleDateString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };

    // Save callback
    onInquirySubmitted(newInquiry);

    // Reset fields except email (convenience)
    setName('');
    setMessage('');
    setSuccess(true);

    // Turn success check off after 4 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 4500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-20 bg-brand-surface border-b border-brand-concrete-grey">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        {/* Left column: Info & Studio Image */}
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-brand-secondary block">
              Liên hệ
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-primary leading-[1.12] tracking-tight">
              Hãy nói chuyện với chúng tôi.
            </h2>
            <p className="text-sm md:text-base font-light text-brand-on-surface-variant leading-relaxed">
              Chúng tôi luôn nỗ lực kiến tạo những ngôi nhà xuất sắc nhất. Hãy gửi thông tin sơ bộ hoặc đặt lịch hẹn để tham quan văn phòng của chúng tôi.
            </p>
          </div>

          {/* Quick contact data lines */}
          <div className="space-y-6 border-l-2 border-brand-concrete-grey pl-6 py-1">
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-secondary flex items-center gap-2">
                <MapPin size={12} />
                <span>CHÚNG TÔI Ở</span>
              </p>
              <p className="text-sm font-semibold text-brand-primary">
                Quận 1, Thành phố Hồ Chí Minh, Việt Nam
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-secondary flex items-center gap-2">
                <Mail size={12} />
                <span>HÒM THƯ</span>
              </p>
              <a
                href="mailto:hello@noudesign.vn"
                className="text-sm font-semibold text-brand-primary border-b border-brand-concrete-grey/80 hover:border-brand-primary hover:text-brand-secondary transition-all"
              >
                hello@noudesign.vn
              </a>
            </div>
          </div>

          {/* Premium workspace photography */}
          <div className="aspect-[4/3] sm:aspect-[16/10] bg-brand-surface-container overflow-hidden">
            <img
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1200ms] select-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8R7GNAvwfXcDXyXDpCd1CuAFCwO4s6XJZtk78ljeslz8KaI5DTTqybRtA8nbmI6tuTdo6R6EP-sJyHc5piboab4ezO4HxgRz8WKtKSILvnSi6me5w6AgEK7pAh4GAqHukJDi0TDjYDryRqlWL88MjT7FwksbYclPqI_Y_RjICNME_KwdpPqxd_E-iihNeyGs7PJZ1rlu09wPv8fHTwTtZ_6mmS8zKc0ouwzmj0wkscLAU3FvXwymHZoIZEPH8_uaxTIZJVGp3Hzvs"
              alt="NOU DESIGN Studio"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Right column: Interactive Message Box with Feedback */}
        <div className="bg-brand-surface-low p-8 md:p-14 border border-brand-concrete-grey flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-16 h-16 bg-brand-primary text-brand-bone-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif text-brand-primary font-bold">Thư đã gửi thành công</h3>
                  <p className="text-sm text-brand-on-surface-variant font-light max-w-sm mx-auto">
                    Kiến trúc sư của chúng tôi đã nhận được thông tin dự án và sẽ liên hệ phản hồi qua email của bạn trong vòng 24 giờ làm việc. Biểu mẫu thiết kế cũng đã được thêm vào hộp thư của bạn!
                  </p>
                </div>

                <div className="border border-brand-concrete-grey p-4 inline-flex items-center gap-2 bg-white text-xs uppercase tracking-widest text-brand-secondary">
                  <Sparkles size={14} />
                  <span>Cảm ơn sự tín nhiệm của bạn</span>
                </div>

                <button
                  onClick={() => setSuccess(false)}
                  className="block mx-auto text-xs font-semibold uppercase tracking-widest text-brand-primary border-b border-brand-primary pb-0.5 hover:text-brand-secondary hover:border-brand-secondary transition-all pt-6"
                >
                  Gửi thêm một phản hồi mới
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Header info inside form */}
                <div className="border-b border-brand-concrete-grey/45 pb-4">
                  <h3 className="text-lg font-serif text-brand-primary uppercase tracking-wider">ĐĂNG KÝ TƯ VẤN</h3>
                  <p className="text-xs text-brand-on-surface-variant/70 font-light mt-1">
                    Cập nhật mong muốn thiết kế của bạn tới văn phòng chúng tôi.
                  </p>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 text-red-600 p-3.5 border border-red-200 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Input Tên */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-brand-on-surface-variant">
                    Tên của bạn *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên của bạn"
                    className="w-full bg-transparent border-0 border-b border-brand-concrete-grey focus:border-brand-primary focus:ring-0 px-0 py-2.5 transition-colors text-sm text-brand-primary placeholder:text-brand-concrete-grey"
                  />
                </div>

                {/* Input Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-brand-on-surface-variant">
                    Địa chỉ Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@vi-du.vn"
                    className="w-full bg-transparent border-0 border-b border-brand-concrete-grey focus:border-brand-primary focus:ring-0 px-0 py-2.5 transition-colors text-sm text-brand-primary placeholder:text-brand-concrete-grey"
                  />
                </div>

                {/* Dropdown Project Type */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-brand-on-surface-variant">
                    Loại dự án yêu cầu
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-brand-concrete-grey focus:border-brand-primary focus:ring-0 px-0 py-2.5 transition-colors text-sm text-brand-primary text-left cursor-pointer"
                  >
                    <option value="Thiết kế nội thất">Thiết kế nội thất (Villa / Căn hộ)</option>
                    <option value="Tư vấn không gian">Tư vấn không gian (Consultant)</option>
                    <option value="Dự án kiến trúc">Dự án kiến trúc trọn gói</option>
                    <option value="Nghiên cứu & Khác">Nghiên cứu & Đối tác phối hợp</option>
                  </select>
                </div>

                {/* Textarea Message */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-brand-on-surface-variant">
                    Nêu sơ bộ mong muốn dự án (nếu có)
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Chia sẻ với chúng tôi về mong muốn tinh chọn thiết kế, diện tích hoặc ý tưởng của bạn..."
                    className="w-full bg-transparent border-0 border-b border-brand-concrete-grey focus:border-brand-primary focus:ring-0 px-0 py-2 transition-colors text-sm text-brand-primary placeholder:text-brand-concrete-grey resize-none"
                  ></textarea>
                </div>

                {/* Submit Trigger Banner */}
                <button
                  type="submit"
                  className="w-full bg-brand-primary text-brand-on-primary py-4 px-8 text-xs font-semibold uppercase tracking-widest hover:bg-brand-warm-slate transition-all flex justify-between items-center group cursor-pointer"
                >
                  <span>Gửi thông tin tư vấn</span>
                  <Send size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
