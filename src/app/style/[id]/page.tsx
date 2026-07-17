"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ContactModal from '../../../components/ContactModal';
import ProjectDetailModal from '../../../components/ProjectDetailModal';
import { projects } from '../../../lib/projectsData';
import { Project, styleLabels } from '../../../types';

function CustomSelect({ label, value, options, onChange }: { label: string, value: string, options: {value: string, label: string}[], onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find(o => o.value === value)?.label || options[0].label;

  return (
    <div className="relative flex flex-col gap-2">
      <label className="text-[10px] font-sans font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase">{label}</label>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 border-b border-neutral-300 bg-transparent py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:border-neutral-900 focus:outline-none transition-colors cursor-pointer"
      >
        <span>{selectedLabel}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 text-neutral-400 dark:text-neutral-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Nền trong suốt để bấm ra ngoài thì đóng */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[100%] left-0 mt-1 w-full bg-white dark:bg-[#121212] shadow-xl border border-neutral-100 dark:border-neutral-800 z-30 flex flex-col overflow-hidden rounded-sm"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${value === opt.value ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'}`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StyleGalleryPage() {
  const pathname = usePathname();
  const rawId = pathname.split('/').pop() || 'all';
  const isAll = rawId.toLowerCase() === 'all';
  
  // Style mapping for URL parameters
  const styleFromUrl = rawId.toUpperCase();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [filterStyle, setFilterStyle] = useState(isAll ? 'ALL' : styleFromUrl);

  const filteredProjects = projects.filter(p => {
    return filterStyle === 'ALL' || p.style === filterStyle;
  });

  const styleOptions = [
    { value: "ALL", label: "Tất cả phong cách" },
    { value: "HIEN_DAI", label: "Hiện Đại" },
    { value: "JAPANDI", label: "Japandi" },
    { value: "THUONG_MAI", label: "Thương Mại" },
    { value: "WABISABI", label: "Wabi-Sabi" }
  ];

  const currentStyleLabel = styleOptions.find(o => o.value === filterStyle)?.label;
  const pageTitle = filterStyle === 'ALL' 
    ? 'Tất cả không gian.' 
    : `Không gian ${currentStyleLabel}.`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onOpenContact={() => setIsContactOpen(true)} alwaysSolid />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Header and Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-neutral-100 dark:border-neutral-800 pb-12">
          <div className="space-y-4">
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-neutral-400 dark:text-neutral-300 uppercase">Bộ Sưu Tập</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 dark:text-neutral-100 font-normal leading-tight tracking-tight">
              {pageTitle}
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <CustomSelect 
              label="Phong cách"
              value={filterStyle}
              onChange={setFilterStyle}
              options={styleOptions}
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden mb-5 rounded-sm bg-neutral-100 shadow-md">
                  <Image 
                    src={`/asset/project-thumbnails/${project.id}.webp`}
                    alt={project.title} 
                    fill
                    unoptimized
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 filter brightness-95 group-hover:brightness-90"
                    referrerPolicy="no-referrer" />
                  
                  {/* Minimalist Hover Indicator overlay */}
                  <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2.5 bg-white dark:bg-[#121212]/95 backdrop-blur-sm text-[10px] tracking-widest uppercase font-bold text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800">
                      Xem Chi Tiết Dự Án
                    </span>
                  </div>
                </div>

                {/* Caption / Project Info */}
                <div className="flex justify-between items-start pt-1 font-sans">
                  <div className="space-y-1">
                    <h4 className="text-base font-serif font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-neutral-400 dark:text-neutral-300 leading-none">
                      {project.location} • {project.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilterStyle(project.style);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-block text-[10px] font-sans font-medium tracking-widest text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-black dark:hover:bg-neutral-200 px-3 py-1.5 uppercase rounded-[2px] transition-colors cursor-pointer"
                    >
                      {styleLabels[project.style] || project.style}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4">
            <p className="text-lg text-neutral-500 dark:text-neutral-400 font-serif">Không tìm thấy không gian phù hợp với bộ lọc.</p>
            <button 
              onClick={() => { setFilterStyle('ALL'); }}
              className="text-xs font-sans font-bold tracking-widest text-neutral-900 dark:text-neutral-100 hover:underline uppercase"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* Consult Consultation Form dialog */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMaterial=""
      />

      {/* Real Project details slideshow modal */}
      <ProjectDetailModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConsultation={() => setIsContactOpen(true)}
      />
    </div>
  );
}
