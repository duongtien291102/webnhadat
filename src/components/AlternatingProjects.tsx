"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import { Project } from '../types';
import { projects } from '../lib/projectsData';
import ProjectDetailModal from './ProjectDetailModal';

interface AlternatingProjectsProps {
  onOpenConsultation: () => void;
}

const ProjectImageSlider = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.mainImage];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      onClick={onClick}
      className="relative block group overflow-hidden bg-neutral-900 border border-neutral-200/60 shadow-xl cursor-pointer rounded-sm aspect-[4/3]"
    >
      {images.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt={`${project.title} - ảnh ${idx + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover filter transition-all duration-700 ${
            idx === currentIndex 
              ? 'opacity-100 brightness-95 group-hover:scale-105 group-hover:brightness-90 z-10' 
              : 'opacity-0 z-0'
          }`}
          referrerPolicy="no-referrer"
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Ảnh trước"
            className="absolute left-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Ảnh sau"
            className="absolute right-4 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}

      {/* Interactive Heart Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        aria-label={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
        className="absolute top-4 right-4 z-20 min-w-[48px] min-h-[48px] bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg"
      >
        <Heart size={18} fill={isFavorite ? "#ef4444" : "transparent"} className={isFavorite ? "text-red-500" : "text-white"} />
      </button>
    </div>
  );
};

export default function AlternatingProjects({ onOpenConsultation }: AlternatingProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="py-24 space-y-24 md:space-y-36 bg-[#fcfbf9]" id="projects">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20 md:space-y-28">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-px bg-neutral-400 mx-auto" />
          <h3 className="text-3xl font-serif text-neutral-900 font-normal tracking-wide">
            Phong cách tiêu biểu
          </h3>
          <p className="text-xs text-neutral-500 font-sans tracking-widest leading-relaxed">
            Nơi hiện thực hóa những xúc cảm mộc mạc Japandi qua từng công trình thực vật mang đậm hơi thở bản ngã.
          </p>
        </div>

        {/* Dynamic Alternating Project Blocks */}
        <div className="space-y-28 md:space-y-40">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center"
              >
                {/* Text Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 flex flex-col justify-center order-2 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <span className="text-xs font-mono font-medium tracking-[0.25em] text-neutral-400 block uppercase">
                    Phong cách
                  </span>

                  <h3 className="text-4xl font-serif text-neutral-950 font-medium tracking-tight leading-none uppercase">
                    {project.title}
                  </h3>

                  {/* Bullets lists */}
                  <ul className="space-y-3 pt-2">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-neutral-600 leading-relaxed font-light flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-neutral-500 mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlights spec panel */}
                  <div className="bg-[#f7f5f0] border border-neutral-200/80 p-5 space-y-3 rounded-sm">
                    <h4 className="text-xs font-bold text-neutral-800 tracking-wider">
                      {project.highlightsHeader}
                    </h4>
                    <ul className="space-y-2.5">
                      {project.highlights.map((hlt, hIdx) => (
                        <li key={hIdx} className="text-[11px] text-neutral-600 leading-relaxed flex items-start gap-2">
                          <svg className="w-3 h-3 text-neutral-800 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-900 hover:text-black hover:underline underline-offset-4 transition-all uppercase cursor-pointer"
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
              </div>
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
