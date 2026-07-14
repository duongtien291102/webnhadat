"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ArrowLeft, ArrowRight, MapPin, Ruler } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export default function ProjectDetailModal({ project, onClose, onOpenConsultation }: ProjectDetailModalProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // Reset photo index when project changes
  useEffect(() => {
    setActivePhotoIndex(0);
  }, [project?.id]);

  // Autoplay slideshow
  useEffect(() => {
    if (!project || !project.gallery || project.gallery.length <= 1) return;
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % project.gallery.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-sm">
        {/* Backdrop overlay click to close */}
        <div className="absolute inset-0" onClick={onClose} />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#fcfbf9] w-full max-w-5xl h-[90vh] md:h-[80vh] flex flex-col md:flex-row shadow-2xl relative rounded-sm overflow-hidden z-10"
          id="project-detail-dialog"
        >
          {/* Left Segment: Huge Photo Gallery & Navigation selector */}
          <div className="md:w-3/5 bg-neutral-950 flex flex-col justify-between relative order-1">
            {/* Active display photo */}
            <div className="flex-1 w-full relative overflow-hidden group">
              {project.gallery.map((src, idx) => (
                <Image
                  key={idx}
                  src={src}
                  alt={`Gallery angle ${idx + 1} of ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={`object-cover transition-opacity duration-500 ${
                    idx === activePhotoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

              {/* Left / Right arrows */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
                    }}
                    aria-label="Ảnh trước"
                    className="absolute left-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePhotoIndex((prev) => (prev + 1) % project.gallery.length);
                    }}
                    aria-label="Ảnh sau"
                    className="absolute right-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}

              {/* Photo tag index counter */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-[10px] text-white tracking-widest border border-white/15 uppercase font-mono z-20">
                Góc chụp 0{activePhotoIndex + 1}
              </div>
            </div>

            {/* Clickable thumbnail selector row  */}
            <div className="h-20 bg-neutral-900 border-t border-neutral-800 p-2.5 flex gap-2.5 overflow-x-auto items-center shrink-0">
              {project.gallery.map((thumb, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => setActivePhotoIndex(tIdx)}
                  aria-label={`Xem ảnh nhỏ ${tIdx + 1}`}
                  className={`relative w-20 h-full overflow-hidden border cursor-pointer hover:border-white transition-all shrink-0 rounded-sm ${
                    activePhotoIndex === tIdx ? 'border-white ring-2 ring-white/10 scale-95' : 'border-neutral-700/60'
                  }`}
                >
                  <Image
                    src={thumb}
                    alt="thumbnail"
                    fill
                    sizes="80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Segment: High-end Specs Metadata panel */}
          <div className="md:w-2/5 p-6 md:p-10 flex flex-col justify-between overflow-y-auto order-2">
            <div className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <span className="text-[10px] tracking-widest font-mono font-bold text-neutral-400 block">ARCHITECTURAL LOGS</span>
                  <h4 className="text-xl font-serif text-neutral-900 font-semibold">{project.title}</h4>
                </div>
                {/* Close action */}
                <button
                  onClick={onClose}
                  aria-label="Đóng chi tiết dự án"
                  className="min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-neutral-150 rounded-full transition-all text-neutral-500 hover:text-black cursor-pointer"
                  id="close-project-modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Metadata Row */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans border-b border-neutral-100 pb-5">
                <div className="space-y-0.5">
                  <span className="text-neutral-400 block uppercase tracking-wider text-[9px] font-bold">VỊ TRÍ CHI PHỐI</span>
                  <span className="text-neutral-800 font-semibold flex items-center gap-1.5">
                    <MapPin size={13} className="text-neutral-600" /> {project.location}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-neutral-400 block uppercase tracking-wider text-[9px] font-bold">DIỆN TÍCH BÀN GIAO</span>
                  <span className="text-neutral-800 font-semibold flex items-center gap-1.5">
                    <Ruler size={13} className="text-neutral-600" /> {project.area}
                  </span>
                </div>
                <div className="space-y-0.5 pt-2">
                  <span className="text-neutral-400 block uppercase tracking-wider text-[9px] font-bold">PHONG CÁCH ĐỊNH VỊ</span>
                  <span className="text-neutral-800 font-semibold">{project.style}</span>
                </div>
                <div className="space-y-0.5 pt-2">
                  <span className="text-neutral-400 block uppercase tracking-wider text-[9px] font-bold">PHÒNG ĐIỀU CHỈNH</span>
                  <span className="text-neutral-800 font-semibold">Phòng khách, Phòng ngủ, Bếp</span>
                </div>
              </div>

              {/* Description written in pristine prose */}
              <div className="space-y-3">
                <h5 className="text-[10px] tracking-widest font-mono font-bold text-neutral-400 uppercase">Thuyết minh thiết kế</h5>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {project.description} Mẫu thiết kế {project.title} giải quyết triệt để bài toán thông khí và luân chuyển phân bố dòng sáng tự nhiên. Hệ thống vách ngăn gỗ sồi (Japandi) đan chéo giúp bảo vệ không gian sinh tư của phòng thờ, phòng ngủ mà không bóp nghẹt diện tích giao tiếp chung. Các tủ bếp âm tường đúc lì bê-tông miết phẳng đảm bảo tính gọn gàng tối mật.
                </p>
              </div>
            </div>

            {/* Consult Call-to-Action for this project scope */}
            <div className="pt-6 border-t border-neutral-100 mt-6 space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="w-full bg-[#1a1a1a] hover:bg-neutral-850 text-white font-bold text-xs tracking-widest py-3.5 rounded-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                id="pop-consult-trigger"
              >
                <span>LÊN DỰ TOÁN THEO CĂN HỘ NÀY</span>
                <ChevronRight size={14} />
              </button>
              <p className="text-[10px] text-center text-neutral-500 font-sans">
                * Được tư vấn trực tiếp cùng Kiến trúc sư trưởng của Nou Architects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
