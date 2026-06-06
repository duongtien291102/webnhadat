"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react';

interface HeroSliderProps {
  onOpenContact: () => void;
}

interface SlideData {
  id: string;
  title: string;
  tagline: string;
  image: string;
  meta: string;
  href: string;
}

const slides: SlideData[] = [
  {
    id: 'gamuda-36',
    title: 'MILIMALISM',
    tagline: 'Một không gian sống đủ kín để riêng tư, nhưng cũng đủ mở để được chạm vào thiên nhiên.',
    image: '/asset/du_an1/anh1_duan1.png',
    meta: 'VILLA • 270 M² • HÀ NỘI',
    href: '#projects',
  },
  {
    id: 'hillside-villa',
    title: 'NHẸ NHÀNG NHƯNG ĐỦ KHÁC BIỆT',
    tagline: 'Kiến trúc mang hơi thở Địa Trung Hải đương đại, gây ấn tượng bằng những đường cong mềm mại.',
    image: '/asset/du_an2/anh1_duan2.png',
    meta: 'NHÀ ĐẤT • 66 M²/SÀN • TP LẠNG SƠN',
    href: '#projects',
  },
  {
    id: 'duplex-horizon',
    title: 'NGÔI NHÀ 3 TẦNG',
    tagline: 'Một thiết kế dung hòa giữa đường cong mềm mại, ánh sáng tự nhiên và mảng xanh len lỏi ở mọi tầng.',
    image: '/asset/du_an3/anh1_duan3.png',
    meta: 'NHÀ PHỐ • 100 M² • HÀ NỘI',
    href: '#projects',
  },
];

export default function HeroSlider({ onOpenContact }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-screen min-h-[600px] w-full bg-black overflow-hidden" id="home">
      {/* Slides with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Overlay Darkener */}
          <div className="absolute inset-0 bg-neutral-950/45 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20 z-10" />
          
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide Visual Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-3xl space-y-4 md:space-y-6">
            {/* Meta tag */}
            <motion.div
              key={`meta-${currentIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block"
            >
              <span className="mono-tag text-[10px] md:text-xs tracking-[0.2em] font-bold text-[#e1dfda] bg-white/10 backdrop-blur-md px-3.5 py-1.5 border border-white/20">
                {slides[currentIndex].meta}
              </span>
            </motion.div>

            {/* Giant Heading */}
            <motion.div
              key={`title-${currentIndex}`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-none">
                {slides[currentIndex].title}
              </h2>
            </motion.div>

            {/* Sub-tagline */}
            <motion.div
              key={`tagline-${currentIndex}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="text-sm md:text-lg text-neutral-300 font-sans tracking-wide leading-relaxed font-light">
                {slides[currentIndex].tagline}
              </p>
            </motion.div>

            {/* Buttons Row */}
            <motion.div
              key={`buttons-${currentIndex}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#projects"
                className="bg-white hover:bg-neutral-150 text-neutral-900 px-8 py-4 font-bold text-xs tracking-widest flex items-center gap-2 group transition-all rounded-sm shadow-lg shadow-black/20"
                id="hero-view-project"
              >
                <span>XEM DỰ ÁN</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </a>

              <button
                onClick={onOpenContact}
                className="border border-white/70 hover:border-white hover:bg-white/10 text-white px-8 py-4 font-bold text-xs tracking-widest transition-all rounded-sm cursor-pointer"
                id="hero-request-consult"
              >
                NHÂN TƯ VẤN
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Manual Layout Controllers */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full border border-white/20 bg-black/20 hover:bg-black/50 text-white/75 hover:text-white transition-all cursor-pointer hidden md:block"
        id="hero-prev-arrow"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full border border-white/20 bg-black/20 hover:bg-black/50 text-white/75 hover:text-white transition-all cursor-pointer hidden md:block"
        id="hero-next-arrow"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots and Count Indicators */}
      <div className="absolute right-6 md:right-12 bottom-8 z-30 flex items-center gap-6 text-white text-xs font-semibold">
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                index === currentIndex ? 'w-10 bg-white' : 'w-2 bg-white/40'
              }`}
              id={`hero-dot-${slide.id}`}
            />
          ))}
        </div>
        <div className="text-neutral-300/80 tracking-widest font-mono">
          0{currentIndex + 1} <span className="opacity-40">/</span> 0{slides.length}
        </div>
      </div>
    </section>
  );
}
