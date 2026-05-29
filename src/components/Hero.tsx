import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

interface HeroProps {
  onScrollToProjects: () => void;
}

export default function Hero({ onScrollToProjects }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-[921px] flex flex-col justify-end overflow-hidden px-6 md:px-20 py-20 bg-brand-surface-container">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover select-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPCfbZ8IPLGjTAkgTzJnGAWpxyEeAM1WKz2VFFtKt6Ac7Sz41Glt6vB9L4v1Ui4cw31Z0Xu_sFF-DOvFRQ6v_3sm2OGOgJlxlxC2DtJ-WtjXOQfpZIYxdLbDVv5Byp_FptRMIWLU-_vwxrTxwJ3Zs_JeemnQANZI1ifbEqCP84Nyp6t8O9n5C0iTgCbk5yrHkZP2XFVTABhsXrna533IdDlqi0ijeuzhgQdRIU-JN50UsJ574UR6A7A27zZDbDnjmlhPeczTJSbMiY"
          alt="Kiến trúc NOU DESIGN"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"></div>
      </div>
      
      {/* 3D Abstract Canvas */}
      {/* <ThreeCanvas /> */}

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl space-y-8 text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="space-y-4"
        >
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-brand-bone-white/80 block">
            NOU DESIGNSTUDIO
          </span>
          <h1 className="text-white font-serif text-4xl md:text-7xl leading-[1.12] tracking-tight">
            Kiến trúc nội thất.
            <span className="block mt-2">Không gian sống tự nhiên.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-brand-bone-white/80 font-sans text-base md:text-xl max-w-2xl leading-relaxed font-light"
        >
          Ánh sáng tự nhiên, vật liệu thật, tỷ lệ cân đối. Từng không gian được tạo nên bằng sự lựa chọn cẩn thận toàn vẹn.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <button
            onClick={onScrollToProjects}
            className="group bg-white text-brand-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest hover:bg-brand-bone-white transition-all flex items-center gap-2"
          >
            <span>Xem dự án</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Decorative arrow helper */}
      <div className="absolute bottom-8 right-6 md:right-20 z-10 hidden sm:flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors cursor-pointer" onClick={onScrollToProjects}>
        <span className="text-[10px] tracking-[0.2em] uppercase origin-bottom font-semibold">TẬU PHONG CÁCH</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
