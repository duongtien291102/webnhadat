"use client";
import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={18} />, href: 'https://instagram.com/nou.architects', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: <Facebook size={18} />, href: 'https://facebook.com/nou.architects', color: 'hover:text-blue-500' },
    { name: 'Website', icon: <Globe size={18} />, href: '#home', color: 'hover:text-[#dfd9ce]' },
  ];

  return (
    <footer className="bg-[#121212] text-neutral-400 py-16 border-t border-neutral-900" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left main brand column */}
        <div className="lg:col-span-5 space-y-6">
          <a href="#home" aria-label="Trang chủ NOU Architects" className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center font-serif text-sm font-bold border border-neutral-700 bg-neutral-900 text-white">
              NOU
            </div>
            <div>
              <h4 className="text-sm tracking-[0.2em] text-[#f5f1ea] font-medium font-sans">
                NOU ARCHITECTS
              </h4>
              <p className="text-[9px] tracking-[0.1em] text-neutral-500 font-sans uppercase">
                Est. 2021 | Studio kiến trúc tối mộc
              </p>
            </div>
          </a>

          <p className="text-xs text-neutral-400 leading-relaxed font-light max-w-sm">
            Nou.Architects - Cảm hứng sáng tạo là đam mê tuyệt đối
          </p>

          {/* Social Icons row */}
          <div className="flex gap-4 pt-2">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={`Theo dõi trên ${social.name}`}
                className={`w-9 h-9 border border-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:border-neutral-200 transition-all duration-300 ${social.color}`}
                target="_blank"
                rel="noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Column: Resource links */}
        <div className="lg:col-span-3 space-y-4">
          <h5 className="text-xs font-bold tracking-widest text-[#f5f1ea] uppercase">
            LIÊN HỆ & TÀI LIỆU
          </h5>
          <ul className="space-y-3 text-xs font-sans">
            <li>
              <a href="#introduction" className="hover:text-white transition-colors duration-200 block">
                Băng thông thiết kế Japandi
              </a>
            </li>
            <li>
              <a href="#materials" className="hover:text-white transition-colors duration-200 block">
                Tài liệu kỹ thuật vật liệu (PDF)
              </a>
            </li>
            <li>
              <a href="#process" className="hover:text-white transition-colors duration-200 block">
                Hồ sơ năng lực thi công
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-white transition-colors duration-200 block">
                Danh sách dự án đã bàn giao
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
              <MapPin size={15} className="text-neutral-500 shrink-0 mt-0.5" />
              <span>
                30L3 - KĐT Louis City - Hoàng Mai - Hà Nội
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={15} className="text-neutral-500 shrink-0 mt-0.5" />
              <span>
                0911.176.222
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={15} className="text-neutral-500 shrink-0 mt-0.5" />
              <span>
                Noudesign.interior@gmail.com
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Underbar footer row */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-neutral-900/60 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-neutral-500">
        <div>
          <span>Thiết kế bởi Nou Studio • Hỗ trợ hoàn thiện kỹ thuật số bởi AI Studio</span>
        </div>
        <div>
          <span>© 2026 Nou Design. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
