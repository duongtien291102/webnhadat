import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface ServicesProps {
  onSelectService: (serviceType: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-20 bg-brand-bone-white border-b border-brand-concrete-grey">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left column info */}
        <div className="md:col-span-4 space-y-6">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-brand-secondary block">
            Dịch vụ
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-primary leading-tight tracking-tight">
            Những gì chúng tôi làm.
          </h2>
          <p className="text-sm leading-relaxed text-brand-on-surface-variant font-light max-w-sm">
            Tận tâm xây dựng chuẩn mực sống tinh khiết, tỉ mỉ trong từng đường nét tiếp giáp, đảm bảo chất lượng hoàn thiện đẳng cấp nhất.
          </p>
        </div>

        {/* Right column: Accordion service list */}
        <div className="md:col-span-8 space-y-2">
          {SERVICES.map((s, index) => {
            const isExpanded = expandedId === s.id;
            return (
              <div
                key={s.id}
                className="group border-b border-brand-concrete-grey py-8 flex flex-col hover:bg-brand-surface-low/30 hover:px-4 transition-all duration-300 relative"
              >
                {/* Accordion header click wrapper */}
                <div
                  onClick={() => toggleExpand(s.id)}
                  className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start cursor-pointer w-full"
                >
                  <span className="font-serif text-2xl md:text-3xl text-brand-secondary/35 group-hover:text-brand-secondary transition-colors duration-300">
                    {s.index}
                  </span>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl md:text-2xl font-serif text-brand-primary group-hover:text-brand-secondary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-on-surface-variant max-w-xl font-light">
                      {s.description}
                    </p>
                  </div>

                  {/* Expand Indicators */}
                  <div className="flex items-center gap-3 pt-1 self-end sm:self-start">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isExpanded ? 'Thu lại' : 'Xem thêm'}
                    </span>
                    <button className="w-8 h-8 rounded-full border border-brand-concrete-grey flex items-center justify-center text-brand-secondary hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300">
                      {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                    </button>
                  </div>
                </div>

                {/* Smooth Height Expansion Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pl-0 sm:pl-14 pt-6 pb-2 space-y-6">
                        <p className="text-sm text-brand-on-surface-variant/90 leading-relaxed font-light max-w-xl border-l border-brand-concrete-grey pl-4">
                          {s.fullDetail}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                          <button
                            onClick={() => onSelectService(s.title)}
                            className="text-xs font-semibold uppercase tracking-widest text-brand-primary border-b border-brand-primary pb-1 group-hover:border-brand-secondary hover:text-brand-secondary hover:border-brand-secondary transition-colors inline-flex items-center gap-2"
                          >
                            <span>Yêu cầu tư vấn dịch vụ này</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
