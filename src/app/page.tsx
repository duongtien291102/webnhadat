"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import BentoPhilosophy from '../components/BentoPhilosophy';
import ProjectsShowcase from '../components/ProjectsShowcase';
import Services from '../components/Services';
import InteractiveCalculator from '../components/InteractiveCalculator';
import ContactForm from '../components/ContactForm';
import ProjectDetailModal from '../components/ProjectDetailModal';
import ClientRequestsInbox from '../components/ClientRequestsInbox';
import { Project, Inquiry } from '../types';

export default function Home() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  // Form custom pre-populates
  const [formProjectType, setFormProjectType] = useState('Thiết kế nội thất');
  const [formMessage, setFormMessage] = useState('');

  // Hydrate inquiries from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nou_design_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu yêu cầu từ máy:', err);
      }
    } else {
      const dummyInquiry: Inquiry = {
        id: 'inq-seed-1',
        clientName: 'Nguyễn Minh Anh',
        email: 'minhanh.nguyen@gmail.com',
        projectType: 'Dự án kiến trúc',
        message: 'Tôi muốn cải tạo biệt thự song lập 240m² bàn giao thô tại Vinhomes Ocean Park, mong muốn thiết kế theo phong cách tối giản ấm áp của NOU DESIGN.',
        status: 'Chờ xử lý',
        createdAt: new Date().toLocaleDateString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      };
      setInquiries([dummyInquiry]);
      localStorage.setItem('nou_design_inquiries', JSON.stringify([dummyInquiry]));
    }
  }, []);

  const saveInquiriesToStorage = (updatedList: Inquiry[]) => {
    setInquiries(updatedList);
    localStorage.setItem('nou_design_inquiries', JSON.stringify(updatedList));
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleApplyEstimate = (data: {
    roomType: string;
    area: number;
    material: string;
    price: number;
    timeline: string;
  }) => {
    setFormProjectType(
      data.roomType.includes('Tư vấn') ? 'Tư vấn không gian' : 'Thiết kế nội thất'
    );

    const formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(data.price);

    const builtMsg = `Tôi muốn yêu cầu tư vấn thiết kế cho công trình: ${data.roomType}.
Diện tích mặt sàn ước tính: ${data.area} m².
Chất liệu đề xuất mong muốn: ${data.material}.
Thời gian thiết kế mong muốn: ${data.timeline}.
Chi phí đầu tư thiết kế tạm tính: ${formattedPrice}.

Rất mong nhận được phản hồi sớm từ quý công ty!`;

    setFormMessage(builtMsg);
    handleScrollToSection('contact');
  };

  const handleSelectService = (serviceTitle: string) => {
    setFormProjectType(serviceTitle);
    setFormMessage(`Tôi đặc biệt quan tâm tới gói dịch vụ "${serviceTitle}" của NOU DESIGN. Mong muốn nhận được phản hồi tư vấn chi tiết từ kiến trúc sư chủ trì.`);
    handleScrollToSection('contact');
  };

  const handleInquirySubmitted = (newInq: Inquiry) => {
    const updated = [newInq, ...inquiries];
    saveInquiriesToStorage(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    saveInquiriesToStorage(updated);
    localStorage.removeItem(`note-${id}`);
  };

  const handleToggleStatus = (id: string) => {
    const updated = inquiries.map(i => {
      if (i.id === id) {
        return {
          ...i,
          status: i.status === 'Chờ xử lý' ? 'Đã liên hệ' : 'Chờ xử lý' as any
        };
      }
      return i;
    });
    saveInquiriesToStorage(updated);
  };

  const handleAddPrivateNote = (id: string, note: string) => {
    localStorage.setItem(`note-${id}`, note);
    setInquiries([...inquiries]);
  };

  return (
    <div className="min-h-screen bg-brand-surface selection:bg-brand-secondary selection:text-white relative">
      <div className="grain-overlay" />

      <Header
        onNavClick={handleScrollToSection}
        onOpenInbox={() => setIsInboxOpen(true)}
        inboxCount={inquiries.filter(i => i.status === 'Chờ xử lý').length}
      />

      <main>
        <Hero onScrollToProjects={() => handleScrollToSection('projects')} />
        <About />
        <BentoPhilosophy />
        <ProjectsShowcase onSelectProject={(p) => setSelectedProject(p)} />
        <Services onSelectService={handleSelectService} />
        <InteractiveCalculator onApplyEstimate={handleApplyEstimate} />
        <ContactForm
          initialProjectType={formProjectType}
          initialMessage={formMessage}
          onInquirySubmitted={handleInquirySubmitted}
        />
      </main>

      <footer className="bg-brand-surface-low text-brand-on-surface border-t border-brand-concrete-grey grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-20 py-24 w-full">
        <div className="space-y-8">
          <h3 className="text-xl font-bold tracking-[0.25em] uppercase text-brand-primary">NOU DESIGN</h3>
          <p className="text-sm text-brand-on-surface-variant font-light max-w-sm leading-relaxed">
            Kiến tạo không gian tinh giản, chân thật bằng cách tối ưu luồng ánh sáng và vật liệu mộc bền vững cùng thời gian.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant hover:text-brand-primary transition-colors">Instagram</a>
            <a href="#" className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant hover:text-brand-primary transition-colors">LinkedIn</a>
          </div>
        </div>

        <div className="flex flex-col md:items-end justify-between mt-12 md:mt-0 space-y-12 md:space-y-0">
          <div className="grid grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-4">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-primary">SITEMAP</p>
              <ul className="space-y-2.5">
                <li><button onClick={() => handleScrollToSection('projects')} className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant hover:text-brand-primary transition-colors">Dự án</button></li>
                <li><button onClick={() => handleScrollToSection('services')} className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant hover:text-brand-primary transition-colors">Dịch vụ</button></li>
                <li><button onClick={() => handleScrollToSection('about')} className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant hover:text-brand-primary transition-colors">Về chúng tôi</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-primary">LIÊN HỆ</p>
              <ul className="space-y-2.5">
                <li><span className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant">Hồ Chí Minh</span></li>
                <li><a href="mailto:hello@noudesign.vn" className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant hover:text-brand-primary transition-colors">Hỗ trợ</a></li>
              </ul>
            </div>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] opacity-75">
            © {new Date().getFullYear()} NOU DESIGN. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInboxOpen && (
          <ClientRequestsInbox
            inquiries={inquiries}
            isOpen={isInboxOpen}
            onClose={() => setIsInboxOpen(false)}
            onDeleteInquiry={handleDeleteInquiry}
            onToggleStatus={handleToggleStatus}
            onAddNote={handleAddPrivateNote}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
