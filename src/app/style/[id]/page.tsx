"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ContactModal from '../../../components/ContactModal';
import ProjectDetailModal from '../../../components/ProjectDetailModal';
import { projects } from '../../../lib/projectsData';
import { Project } from '../../../types';

function CustomSelect({ label, value, options, onChange }: { label: string, value: string, options: {value: string, label: string}[], onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find(o => o.value === value)?.label || options[0].label;

  return (
    <div className="relative flex flex-col gap-2" onMouseLeave={() => setIsOpen(false)}>
      <label className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">{label}</label>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 border-b border-neutral-300 bg-transparent py-2 text-sm font-medium text-neutral-800 hover:border-neutral-900 focus:outline-none transition-colors cursor-pointer"
      >
        <span>{selectedLabel}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 text-neutral-400 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full bg-white shadow-xl border border-neutral-100 z-30 flex flex-col overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${value === opt.value ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'}`}
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
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const [filterStyle, setFilterStyle] = useState(isAll ? 'ALL' : styleFromUrl);
  const [filterArea, setFilterArea] = useState('ALL');

  const toggleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper to parse complex area strings like "8.7x9.5m", "66m2/ sàn", "270 m²" to numbers
  const getAreaNumber = (areaStr: string): number => {
    const cleanStr = areaStr.toLowerCase().replace(/\s/g, '');
    if (cleanStr.includes('x')) {
      const parts = cleanStr.replace(/[^\d.x]/g, '').split('x');
      if (parts.length === 2) {
        return parseFloat(parts[0]) * parseFloat(parts[1]);
      }
    }
    return parseFloat(cleanStr.replace(/[^\d.]/g, '')) || 0;
  };

  const filteredProjects = projects.filter(p => {
    const matchStyle = filterStyle === 'ALL' || p.style === filterStyle;
    
    let matchArea = true;
    const areaNum = getAreaNumber(p.area);
    if (filterArea === '<200') matchArea = areaNum < 200;
    else if (filterArea === '200-300') matchArea = areaNum >= 200 && areaNum <= 300;
    else if (filterArea === '>300') matchArea = areaNum > 300;

    return matchStyle && matchArea;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9]">
      <Navbar onOpenContact={() => setIsContactOpen(true)} alwaysSolid />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Header and Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-neutral-100 pb-12">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">Bộ Sưu Tập</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 font-normal leading-tight tracking-tight">
              {isAll ? 'Tất cả không gian.' : 'Không gian tối giản.'}
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <CustomSelect 
              label="Phong cách"
              value={filterStyle}
              onChange={setFilterStyle}
              options={[
                { value: "ALL", label: "Tất cả phong cách" },
                { value: "MINIMALISM", label: "Minimalism" },
                { value: "JAPANDI", label: "Japandi" },
                { value: "SANTORINI", label: "Santorini" },
                { value: "WABISABI", label: "Wabi-Sabi" }
              ]}
            />
            <CustomSelect 
              label="Diện tích"
              value={filterArea}
              onChange={setFilterArea}
              options={[
                { value: "ALL", label: "Tất cả diện tích" },
                { value: "<200", label: "Dưới 200 m²" },
                { value: "200-300", label: "200 - 300 m²" },
                { value: ">300", label: "Trên 300 m²" }
              ]}
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
                    src={project.mainImage} 
                    alt={project.title} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 filter brightness-95 group-hover:brightness-90"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Heart Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(project.id);
                    }}
                    className="absolute top-5 right-5 w-10 h-10 bg-white/95 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-white hover:scale-105 transition-all z-20"
                  >
                    <Heart size={16} fill={liked[project.id] ? "currentColor" : "none"} className={liked[project.id] ? "text-red-500" : ""} />
                  </button>

                  {/* Minimalist Hover Indicator overlay */}
                  <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2.5 bg-white/95 backdrop-blur-sm text-[10px] tracking-widest uppercase font-bold text-neutral-900 border border-neutral-200">
                      Xem Chi Tiết Dự Án
                    </span>
                  </div>
                </div>

                {/* Caption / Project Info */}
                <div className="flex justify-between items-start pt-1 font-sans">
                  <div className="space-y-1">
                    <h4 className="text-base font-serif font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-none">
                      {project.location} • {project.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 bg-neutral-100 px-2.5 py-1 uppercase rounded-sm border border-neutral-200/50">
                      {project.style}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4">
            <p className="text-lg text-neutral-500 font-serif">Không tìm thấy không gian phù hợp với bộ lọc.</p>
            <button 
              onClick={() => { setFilterStyle('ALL'); setFilterArea('ALL'); }}
              className="text-xs font-mono font-bold tracking-widest text-neutral-900 hover:underline uppercase"
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
