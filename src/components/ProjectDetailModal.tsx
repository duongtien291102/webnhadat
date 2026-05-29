import React from 'react';
import { motion } from 'motion/react';
import { X, Calendar, MapPin, Minimize, Check, Trees } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex justify-end">
      {/* Background close trigger */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose}></div>

      {/* Slide-over Content box */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-2xl md:max-w-3xl bg-brand-surface min-h-screen shadow-2xl z-20 flex flex-col justify-between"
      >
        {/* Core details scroll block */}
        <div className="overflow-y-auto flex-1">
          {/* Header Area */}
          <div className="sticky top-0 bg-brand-surface/90 backdrop-blur-md border-b border-brand-concrete-grey h-20 px-6 md:px-12 flex justify-between items-center z-10">
            <div className="space-y-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-secondary">Chi tiết dự án</span>
              <h3 className="text-sm font-sans font-bold tracking-wider uppercase text-brand-primary">{project.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 border border-brand-concrete-grey rounded-none flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"
            >
              <X size={18} />
            </button>
          </div>

          {/* Interactive photo */}
          <div className="relative aspect-[16/10] bg-brand-surface-container overflow-hidden">
            <img
              className="w-full h-full object-cover select-none"
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
            />
            {/* Visual bottom dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:left-12">
              <span className="bg-white/95 text-brand-primary text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 shadow-sm">
                DIỆN TÍCH: {project.size}
              </span>
            </div>
          </div>

          {/* Core metadata details block */}
          <div className="px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-3 gap-6 border-b border-brand-concrete-grey">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-brand-on-surface-variant flex items-center gap-1.5 font-semibold">
                <MapPin size={12} className="text-brand-secondary" />
                Vị trí
              </span>
              <span className="text-sm font-serif font-bold text-brand-primary">{project.region}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-brand-on-surface-variant flex items-center gap-1.5 font-semibold">
                <Calendar size={12} className="text-brand-secondary" />
                Năm bàn giao
              </span>
              <span className="text-sm font-serif font-bold text-brand-primary">Tháng 12, {project.year}</span>
            </div>
            <div className="space-y-1 col-span-2 md:col-span-1">
              <span className="text-[10px] uppercase tracking-widest text-brand-on-surface-variant flex items-center gap-1.5 font-semibold">
                <Trees size={12} className="text-brand-secondary" />
                Căn hộ / Quy mô
              </span>
              <span className="text-sm font-serif font-bold text-brand-primary">{project.size}</span>
            </div>
          </div>

          {/* Project narrative story content */}
          <div className="px-6 md:px-12 py-12 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-secondary">PHƯƠNG ÁN THIẾT KẾ</span>
              <h4 className="text-2xl font-serif text-brand-primary">Giải pháp lắng nghe chất liệu</h4>
              <p className="text-base font-light text-brand-on-surface-variant leading-relaxed">
                {project.fullStory}
              </p>
            </div>

            {/* Custom materials tags details panel */}
            <div className="space-y-4 pt-6 border-t border-brand-concrete-grey">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-secondary block">
                BẢNG VẬT LIỆU CHỦ ĐẠO
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.materials.map((material, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 border border-brand-concrete-grey/70 bg-white"
                  >
                    <div className="w-5 h-5 bg-brand-surface-low text-brand-secondary rounded-full flex items-center justify-center">
                      <Check size={12} />
                    </div>
                    <span className="text-xs font-semibold text-brand-on-surface tracking-wide uppercase">
                      {material}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Closing actions footer */}
        <div className="border-t border-brand-concrete-grey p-6 md:p-8 bg-brand-surface-low flex justify-between items-center">
          <p className="text-[10px] text-brand-on-surface-variant/60 uppercase tracking-widest">
            © NOU DESIGN • {project.year}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-brand-primary text-brand-primary text-xs font-semibold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            <Minimize size={14} />
            <span>Đóng thông tin</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
