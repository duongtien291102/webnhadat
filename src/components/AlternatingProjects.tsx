"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Project } from '../types';
import { projects } from '../lib/projectsData';
import ProjectDetailModal from './ProjectDetailModal';
import Reveal from './Reveal';

interface AlternatingProjectsProps {
  onOpenConsultation: () => void;
}

const ProjectImageSlider = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const images = useMemo(
    () => project.gallery && project.gallery.length > 0 ? project.gallery : [project.mainImage],
    [project.gallery, project.mainImage]
  );

  useEffect(() => {
    if (images.length <= 1 || !isInView || isPaused || reduceMotion) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [images.length, isInView, isPaused, reduceMotion]);

  useEffect(() => {
    if (images.length <= 1) return;
    const preload = new window.Image();
    preload.src = images[(currentIndex + 1) % images.length];
  }, [currentIndex, images]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) return;
    const distance = clientX - touchStartX.current;
    didSwipe.current = Math.abs(distance) > 48;
    if (didSwipe.current) {
      setDirection(distance > 0 ? -1 : 1);
      setCurrentIndex((prev) => distance > 0 ? (prev === 0 ? images.length - 1 : prev - 1) : (prev + 1) % images.length);
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      onClick={() => {
        if (didSwipe.current) {
          didSwipe.current = false;
          return;
        }
        onClick();
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      className="relative block group overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-800/60 shadow-xl cursor-pointer rounded-sm aspect-[4/3]"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={images[currentIndex]}
          custom={direction}
          initial={reduceMotion ? false : { opacity: 0, x: direction * 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: direction * -18 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${project.title} - ảnh ${currentIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover brightness-95 transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:brightness-90"
            referrerPolicy="no-referrer" />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Ảnh trước"
            className="absolute left-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Ảnh sau"
            className="absolute right-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}

    </div>
  );
};

export default function AlternatingProjects({ onOpenConsultation }: AlternatingProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-24 space-y-24 md:space-y-36 bg-background" id="projects">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20 md:space-y-28">

        {/* Section Header */}
        <Reveal className="text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-px bg-neutral-400 mx-auto" />
          <h3 className="text-3xl font-serif text-neutral-900 dark:text-neutral-100 font-normal tracking-wide">
            Phong cách tiêu biểu
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans tracking-widest leading-relaxed">
            Nơi hiện thực hóa những xúc cảm mộc mạc Japandi qua từng công trình thực vật mang đậm hơi thở bản ngã.
          </p>
        </Reveal>

        {/* Dynamic Alternating Project Blocks */}
        <div className="space-y-28 md:space-y-40">
          {projects.slice(0, 4).map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <Reveal
                key={project.id}
                delay={index * 0.04}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center"
              >
                {/* Text Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 flex flex-col justify-center order-2 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <span className="text-xs font-sans font-medium tracking-[0.25em] text-neutral-400 dark:text-neutral-300 block uppercase">
                    Phong cách
                  </span>

                  <h3 className="text-4xl font-serif text-neutral-950 dark:text-neutral-50 font-medium tracking-tight leading-none">
                    {project.title}
                  </h3>

                  {/* Bullets lists */}
                  <ul className="space-y-3 pt-2">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-light flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-neutral-500 dark:bg-neutral-400 mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlights spec panel */}
                  <div className="bg-[#f7f5f0] dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800/80 p-5 space-y-3 rounded-sm">
                    <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 tracking-wider">
                      {project.highlightsHeader}
                    </h4>
                    <ul className="space-y-2.5">
                      {project.highlights.map((hlt, hIdx) => (
                        <li key={hIdx} className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed flex items-start gap-2">
                          <svg className="w-3 h-3 text-neutral-800 dark:text-neutral-200 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{hlt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View More Trigger */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-900 dark:text-neutral-100 hover:text-black hover:underline underline-offset-4 transition-all uppercase cursor-pointer"
                      id={`view-more-${project.id}`}
                    >
                      <span>CHI TIẾT DỰ ÁN</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Overlaid Image Visual Column */}
                <div
                  className={`lg:col-span-6 order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <ProjectImageSlider
                    project={project}
                    onClick={() => {
                      setSelectedProject(project);
                    }}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Modern Pop-up Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConsultation={onOpenConsultation}
      />
    </section>
  );
}
