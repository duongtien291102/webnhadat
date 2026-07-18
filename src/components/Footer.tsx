"use client";
import React from 'react';
import Image from 'next/image';
import { Instagram, Facebook, Mail, Phone, MapPin, Globe } from 'lucide-react';

const TiktokIcon = ({ size = 18, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={18} />, href: 'https://instagram.com/NOU.Design', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: <Facebook size={18} />, href: 'https://www.facebook.com/share/1Ap6c5Lu5o/', color: 'hover:text-blue-500' },
    { name: 'TikTok', icon: <TiktokIcon size={18} />, href: 'https://www.tiktok.com/@nou.design?is_from_webapp=1&sender_device=pc', color: 'hover:text-black hover:bg-white dark:hover:bg-neutral-800' },
    { name: 'Website', icon: <Globe size={18} />, href: '#home', color: 'hover:text-[#dfd9ce]' },
  ];

  return (
    <footer
      className="select-text bg-[#121212] dark:bg-[#080808] text-neutral-400 dark:text-neutral-300 py-10 md:py-16 border-t border-neutral-900 dark:border-neutral-800/50"
      id="contact"
      data-allow-copy="true"
      style={{ WebkitUserSelect: "text", userSelect: "text" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">

        {/* Left main brand column */}
        <div className="lg:col-span-5 space-y-4 md:space-y-6">
          <div className="flex justify-between items-start">
            {/* Logo Brand */}
            <a href="#home" aria-label="Trang chủ NOU.Design" className="flex items-center gap-3">
              <div className="relative w-12 h-12 transition-transform hover:scale-105">
                <Image
                  src="/logoNOU.jpg"
                  alt="NOU.Design Logo"
                  fill
                  className="object-contain mix-blend-screen"
                />
              </div>
              <div>
                <h4 className="text-sm tracking-[0.2em] text-[#f5f1ea] font-medium font-sans">
                  NOU.Design
                </h4>
                <p className="text-[9px] tracking-[0.1em] text-neutral-500 dark:text-neutral-400 font-sans uppercase">
                  Est. 2021 | Đơn vị kiến trúc tối mộc
                </p>
              </div>
            </a>

            {/* Mobile Social Icons row (Hidden on Desktop) */}
            <div className="flex lg:hidden gap-3 mt-1">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={`Theo dõi trên ${social.name}`}
                  className={`w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400 dark:text-neutral-300 hover:border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${social.color}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <p className="text-xs text-neutral-400 dark:text-neutral-300 leading-relaxed font-light max-w-sm">
            NOU.Design - Cảm hứng sáng tạo là đam mê tuyệt đối
          </p>

          {/* Desktop Social Icons row (Hidden on Mobile) */}
          <div className="hidden lg:flex gap-4 pt-2">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={`Theo dõi trên ${social.name}`}
                className={`w-9 h-9 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400 dark:text-neutral-300 hover:border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${social.color}`}
                target="_blank"
                rel="noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Info sub-grid: side-by-side on mobile, inline on desktop via lg:contents */}
        <div className="grid grid-cols-2 gap-6 lg:contents">

          {/* Middle Column: Resource links */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs font-bold tracking-widest text-[#f5f1ea] uppercase">
              LIÊN HỆ & TÀI LIỆU
            </h5>
            <ul className="space-y-3 text-xs font-sans">
              <li>
                <a href="#process" className="hover:text-white transition-colors duration-200 block">
                  Hồ sơ năng lực
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Physical address and parameters */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="text-xs font-bold tracking-widest text-[#f5f1ea] uppercase">
              THÔNG TIN LIÊN HỆ
            </h5>
            <ul className="space-y-3.5 text-xs font-light leading-relaxed">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-neutral-500 dark:text-neutral-400 shrink-0 mt-0.5" />
                <span>
                  65L11 - KĐT Louis City - Hoàng Mai - Hà Nội
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="text-neutral-500 dark:text-neutral-400 shrink-0 mt-0.5" />
                <span>
                  0911.176.222
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="text-neutral-500 dark:text-neutral-400 shrink-0 mt-0.5" />
                <span>
                  nou.design.mkt@gmail.com
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <TiktokIcon size={15} className="text-neutral-500 dark:text-neutral-400 shrink-0 mt-0.5" />
                <a href="https://www.tiktok.com/@nou.design?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">
                  tiktok.com/@nou.design
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Underbar footer row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10 md:mt-16 pt-6 md:pt-8 border-t border-neutral-900/60 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400">
        <div>
          <span>Thiết kế bởi đội ngũ thiết kế NOU.Design</span>
        </div>
        <div>
          <span>© 2026 Nou Design. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
