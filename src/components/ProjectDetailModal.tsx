"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ChevronRight, ArrowLeft, ArrowRight, MapPin, Ruler } from 'lucide-react';
import { Project, styleLabels } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export default function ProjectDetailModal({ project, onClose, onOpenConsultation }: ProjectDetailModalProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  // Reset photo index when project changes
  useEffect(() => {
    setActivePhotoIndex(0);
    setDirection(1);
    setIsPaused(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

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

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
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
  }, [project, onClose]);

  // Autoplay slideshow
  useEffect(() => {
    if (!project || !project.gallery || project.gallery.length <= 1 || isPaused || reduceMotion) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActivePhotoIndex((prev) => (prev + 1) % project.gallery.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [project, isPaused, reduceMotion]);

  useEffect(() => {
    const activeThumbnail = thumbnailStripRef.current?.querySelector<HTMLElement>(`[data-thumbnail-index="${activePhotoIndex}"]`);
    activeThumbnail?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
  }, [activePhotoIndex, reduceMotion]);

  const showPreviousPhoto = () => {
    if (!project) return;
    setDirection(-1);
    setIsPaused(true);
    setActivePhotoIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  };

  const showNextPhoto = () => {
    if (!project) return;
    setDirection(1);
    setIsPaused(true);
    setActivePhotoIndex((prev) => (prev + 1) % project.gallery.length);
  };

  return (
    <AnimatePresence>
      {project && (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-sm"
      >
        {/* Backdrop overlay click to close */}
        <div className="absolute inset-0" onClick={onClose} />
        
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          tabIndex={-1}
          initial={reduceMotion ? false : { scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-background w-full max-w-5xl h-[90vh] md:h-[80vh] flex flex-col md:flex-row shadow-2xl relative rounded-sm overflow-hidden z-10"
          id="project-detail-dialog"
        >
          {/* Left Segment: Huge Photo Gallery & Navigation selector */}
          <div className="md:w-3/5 h-[45vh] md:h-auto bg-neutral-950 flex flex-col justify-between relative order-1 shrink-0">
            {/* Active display photo */}
            <div
              className="flex-1 w-full relative overflow-hidden group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null) return;
                const distance = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
                if (Math.abs(distance) > 48) {
                  if (distance > 0) showPreviousPhoto();
                  else showNextPhoto();
                }
                touchStartX.current = null;
              }}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={project.gallery[activePhotoIndex]}
                  custom={direction}
                  initial={reduceMotion ? false : { opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: direction * -24 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.gallery[activePhotoIndex]}
                    alt={`Gallery angle ${activePhotoIndex + 1} of ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                    referrerPolicy="no-referrer" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

              {/* Mobile-only close button floating over the photo */}
              <button
                onClick={onClose}
                aria-label="Đóng"
                className="md:hidden absolute top-3 right-3 z-30 w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Left / Right arrows */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showPreviousPhoto();
                    }}
                    aria-label="Ảnh trước"
                    className="absolute left-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showNextPhoto();
                    }}
                    aria-label="Ảnh sau"
                    className="absolute right-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}

              {/* Photo tag index counter */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-[10px] text-white tracking-widest border border-white/15 uppercase font-sans z-20">
                Góc chụp 0{activePhotoIndex + 1}
              </div>
            </div>

            {/* Clickable thumbnail selector row  */}
            <div ref={thumbnailStripRef} className="h-20 bg-neutral-900 border-t border-neutral-800 p-2.5 flex gap-2.5 overflow-x-auto items-center shrink-0">
              {project.gallery.map((thumb, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => {
                    setDirection(tIdx >= activePhotoIndex ? 1 : -1);
                    setIsPaused(true);
                    setActivePhotoIndex(tIdx);
                  }}
                  data-thumbnail-index={tIdx}
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
                    referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Segment: High-end Specs Metadata panel */}
          <div className="md:w-2/5 p-6 md:p-10 flex flex-col justify-between overflow-y-auto order-2 md:order-2 flex-1">
            <div className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] tracking-widest font-sans font-bold text-neutral-400 dark:text-neutral-300 block">ARCHITECTURAL LOGS</span>
                  <h4 id="project-dialog-title" className="text-xl font-serif text-neutral-900 dark:text-neutral-100 font-semibold">{project.title}</h4>
                </div>
                {/* Close action - desktop only */}
                <button
                  onClick={onClose}
                  aria-label="Đóng chi tiết dự án"
                  className="hidden md:flex min-w-[48px] min-h-[48px] items-center justify-center hover:bg-neutral-150 rounded-full transition-all text-neutral-500 dark:text-neutral-400 hover:text-black cursor-pointer"
                  id="close-project-modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Metadata Row */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans border-b border-neutral-100 dark:border-neutral-800 pb-5">
                <div className="space-y-0.5">
                  <span className="text-neutral-400 dark:text-neutral-300 block uppercase tracking-wider text-[9px] font-bold">VỊ TRÍ CHI PHỐI</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-semibold flex items-center gap-1.5">
                    <MapPin size={13} className="text-neutral-600 dark:text-neutral-300" /> {project.location}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-neutral-400 dark:text-neutral-300 block uppercase tracking-wider text-[9px] font-bold">DIỆN TÍCH BÀN GIAO</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-semibold flex items-center gap-1.5">
                    <Ruler size={13} className="text-neutral-600 dark:text-neutral-300" /> {project.area}
                  </span>
                </div>
                <div className="space-y-1.5 pt-2">
                  <span className="text-neutral-400 dark:text-neutral-300 block uppercase tracking-wider text-[9px] font-bold">PHONG CÁCH ĐỊNH VỊ</span>
                  <span className="inline-block text-[10px] font-sans font-medium tracking-widest text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 px-3 py-1.5 uppercase rounded-[2px]">{styleLabels[project.style] || project.style}</span>
                </div>
                <div className="space-y-0.5 pt-2">
                  <span className="text-neutral-400 dark:text-neutral-300 block uppercase tracking-wider text-[9px] font-bold">PHÒNG ĐIỀU CHỈNH</span>
                  <span className="text-neutral-800 dark:text-neutral-200 font-semibold">Phòng khách, Phòng ngủ, Bếp</span>
                </div>
              </div>

              {/* Description written in pristine prose */}
              <div className="space-y-3">
                <h5 className="text-[10px] tracking-widest font-sans font-bold text-neutral-400 dark:text-neutral-300 uppercase">Thuyết minh thiết kế</h5>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                  {project.description} Mẫu thiết kế {project.title} giải quyết triệt để bài toán thông khí và luân chuyển phân bố dòng sáng tự nhiên. Hệ thống vách ngăn gỗ sồi (Japandi) đan chéo giúp bảo vệ không gian sinh tư của phòng thờ, phòng ngủ mà không bóp nghẹt diện tích giao tiếp chung. Các tủ bếp âm tường đúc lì bê-tông miết phẳng đảm bảo tính gọn gàng tối mật.
                </p>
              </div>
            </div>

            {/* Consult Call-to-Action for this project scope */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 mt-6 space-y-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="w-full bg-[#1a1a1a] hover:bg-neutral-850 text-white font-bold text-xs tracking-widest py-3.5 rounded-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                id="pop-consult-trigger"
              >
                <span>NHẬN TƯ VẤN</span>
                <ChevronRight size={14} />
              </button>
              <p className="text-[10px] text-center text-neutral-500 dark:text-neutral-400 font-sans">
                * Được tư vấn trực tiếp cùng Kiến trúc sư trưởng của NOU.Design.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
