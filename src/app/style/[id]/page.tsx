"use client";
import React, { useState } from 'react';
import { Heart, ArrowLeft, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ContactModal from '../../../components/ContactModal';

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
  const rawId = pathname.split('/').pop() || 'minimalism';
  const isAll = rawId.toLowerCase() === 'all';
  const styleName = isAll ? 'TỔNG HỢP' : rawId.toUpperCase();
  const pageTitle = isAll ? 'Tất cả không gian.' : 'Khám phá không gian.';

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const [filterStyle, setFilterStyle] = useState(isAll ? 'ALL' : styleName);
  const [filterArea, setFilterArea] = useState('ALL');

  const toggleLike = (idx: number) => {
    setLiked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const allProjects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      title: "Biệt thự Đồi Sứ",
      area: "350 m²",
      style: isAll ? "MINIMALISM" : styleName
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      title: "Căn hộ Vinhomes",
      area: "125 m²",
      style: isAll ? "JAPANDI" : styleName
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?auto=format&fit=crop&w=1200&q=80",
      title: "Resort Ven Biển",
      area: "500 m²",
      style: isAll ? "SANTORINI" : styleName
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      title: "Nhà phố Wabi",
      area: "180 m²",
      style: isAll ? "WABISABI" : styleName
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      title: "Penthouse The Zei",
      area: "210 m²",
      style: isAll ? "MINIMALISM" : styleName
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
      title: "Studio Nhiếp Ảnh",
      area: "90 m²",
      style: isAll ? "WABISABI" : styleName
    }
  ];

  const displayProjects = isAll ? allProjects : allProjects.slice(0, 4);

  const filteredProjects = displayProjects.filter(p => {
    const matchStyle = filterStyle === 'ALL' || p.style === filterStyle;
    
    let matchArea = true;
    const areaNum = parseInt(p.area);
    if (filterArea === '<200') matchArea = areaNum < 200;
    else if (filterArea === '200-300') matchArea = areaNum >= 200 && areaNum <= 300;
    else if (filterArea === '>300') matchArea = areaNum > 300;

    return matchStyle && matchArea;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9]">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Header and Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 font-normal leading-tight tracking-tight">
              {pageTitle}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-sm">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Heart Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(idx);
                  }}
                  className="absolute top-6 left-6 w-10 h-10 bg-white/95 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-white transition-colors z-20"
                >
                  <Heart size={16} fill={liked[idx] ? "currentColor" : "none"} className={liked[idx] ? "text-red-500" : ""} />
                </button>

                {/* Dark Overlay Box */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/70 backdrop-blur-sm px-10 py-6 text-center w-3/4 max-w-sm border border-white/10 group-hover:bg-black/80 transition-colors duration-500 shadow-xl">
                    <p className="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase mb-3">NOU DESIGN</p>
                    <h3 className="text-lg md:text-xl font-serif text-white mb-2">{project.title}</h3>
                    <p className="text-[10px] font-mono text-neutral-400 tracking-[0.1em] uppercase">DIỆN TÍCH: {project.area}</p>
                    <p className="text-[10px] font-mono text-neutral-400 tracking-[0.1em] uppercase mt-1">PHONG CÁCH: {project.style}</p>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="text-center mt-6">
                <h4 className="text-base font-serif text-neutral-600 group-hover:text-black transition-colors">{project.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMaterial=""
      />
    </div>
  );
}
