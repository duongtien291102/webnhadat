import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';

interface ProjectsShowcaseProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectsShowcase({ onSelectProject }: ProjectsShowcaseProps) {
  const [filter, setFilter] = useState<'A' | 'HCM' | 'C' | 'S'>('A'); // A: Tất cả, HCM: Đô thị/Sài Gòn, C: Ven biển, S: Di sản / Khác

  const getFilteredProjects = () => {
    switch (filter) {
      case 'HCM':
        return PROJECTS.filter(p => p.region.includes('HỒ CHÍ MINH') || p.region.includes('HÀ NỘI'));
      case 'C':
        return PROJECTS.filter(p => p.region.includes('ĐÀ NẴNG') || p.region.includes('NHA TRANG'));
      case 'S':
        return PROJECTS.filter(p => p.region.includes('HỘI AN'));
      default:
        return PROJECTS;
    }
  };

  const filtered = getFilteredProjects();

  // Featured are defined as key items
  const featured = filtered.filter(p => p.id === 'contemp-living' || p.id === 'bright-space');
  const others = filtered.filter(p => p.id !== 'contemp-living' && p.id !== 'bright-space');

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-20 bg-brand-surface border-b border-brand-concrete-grey">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl space-y-6">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-brand-secondary block">
            Dự án tiêu biểu
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-primary leading-tight tracking-tight">
            Những câu chuyện không gian
          </h2>
          <p className="text-base md:text-lg text-brand-on-surface-variant font-light leading-relaxed">
            Mỗi ngôi nhà là một cuốn sách mở kể về sự lắng nghe, sự thấu hiểu nếp hoạt động của gia chủ bên chất liệu ấm cúng chân thật.
          </p>
        </div>

        {/* Dynamic Category Selector Tool */}
        <div className="flex flex-wrap items-center gap-2 border-b border-brand-concrete-grey/60 pb-2 w-full md:w-auto">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-secondary flex items-center gap-1.5 mr-2">
            <SlidersHorizontal size={12} />
            <span>Bộ lọc:</span>
          </span>
          {[
            { id: 'A', label: 'Tất cả' },
            { id: 'HCM', label: 'Đô thị' },
            { id: 'C', label: 'Ven biển' },
            { id: 'S', label: 'Di sản' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-widest transition-all ${
                filter === btn.id
                  ? 'border-b-2 border-brand-primary text-brand-primary'
                  : 'text-brand-on-surface-variant/70 hover:text-brand-primary pb-1'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Grid Layout (Matches Mock layout precisely with the asymmetric column alignment) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 min-h-[400px]">
        {/* Project 1 */}
        {PROJECTS.map((p) => {
          if (p.id !== 'contemp-living') return null;
          // Only show if matches current filters list
          const matchesFilter = filtered.some(fp => fp.id === p.id);
          if (!matchesFilter) return null;

          return (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => onSelectProject(p)}
              className="group cursor-pointer space-y-6"
            >
              <div className="aspect-[4/5] overflow-hidden bg-brand-surface-container relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  src={p.image}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h4 className="text-2xl font-serif text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
                    {p.title}
                  </h4>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-on-surface-variant">
                    {p.region} ({p.year})
                  </p>
                </div>
                <div className="bg-white border border-brand-concrete-grey w-10 h-10 flex items-center justify-center rounded-none group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all duration-300">
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Project 2 (Note the md:mt-40 matching the visual design grid offset for high-end feel!) */}
        {PROJECTS.map((p) => {
          if (p.id !== 'bright-space') return null;
          const matchesFilter = filtered.some(fp => fp.id === p.id);
          if (!matchesFilter) return null;

          return (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              onClick={() => onSelectProject(p)}
              className="group cursor-pointer space-y-6 md:mt-40"
            >
              <div className="aspect-[4/5] overflow-hidden bg-brand-surface-container relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  src={p.image}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h4 className="text-2xl font-serif text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
                    {p.title}
                  </h4>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-brand-on-surface-variant">
                    {p.region} ({p.year})
                  </p>
                </div>
                <div className="bg-white border border-brand-concrete-grey w-10 h-10 flex items-center justify-center rounded-none group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all duration-300">
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Extended list-style projects matching the list items in the bottom of the design sheet */}
      <div className="border-t border-brand-concrete-grey mt-28">
        <AnimatePresence mode="popLayout">
          {others.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onClick={() => onSelectProject(p)}
              className="py-10 border-b border-brand-concrete-grey flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer hover:bg-brand-surface-low transition-all duration-300 px-4 md:px-6 relative"
            >
              {/* Quick image preview overlay on hover (desktop only) */}
              <div className="absolute left-1/3 top-[-30px] w-48 h-32 bg-brand-surface-container opacity-0 pointer-events-none group-hover:opacity-100 hidden lg:block transition-all duration-300 z-10 border border-brand-concrete-grey pointer-events-none shadow-lg">
                <img className="w-full h-full object-cover" src={p.image} alt={p.title} referrerPolicy="no-referrer" />
              </div>

              <div className="space-y-1 mb-4 md:mb-0">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-secondary block">
                  {p.region} / {p.year}
                </span>
                <span className="text-[11px] font-sans text-brand-on-surface-variant font-light block">
                  Diện tích: {p.size}
                </span>
              </div>

              <h4 className="text-xl md:text-2xl font-serif text-brand-primary group-hover:text-brand-secondary group-hover:translate-x-1.5 transition-all duration-300">
                {p.title}
              </h4>

              <div className="flex items-center gap-2 text-brand-secondary group-hover:text-brand-primary transition-colors">
                <span className="text-xs font-semibold tracking-widest uppercase hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity">Chi tiết</span>
                <ArrowUpRight size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-brand-on-surface-variant font-light">
            Không có dự án nào phù hợp với bộ lọc này.
          </div>
        )}
      </div>
    </section>
  );
}
