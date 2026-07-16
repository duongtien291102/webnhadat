"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
    id: 'oceanpark-haiau',
    title: 'BIỆT THỰ OCEANPARK',
    tagline: 'Không gian sống được thiết kế với sự tinh tế và tiện nghi tối đa mang phong cách hiện đại.',
    image: '/asset/anhweb/hiện đại/12. Biệt thự Oceanpark - Hải Âu 230m2/1.webp',
    meta: 'BIỆT THỰ • 230 M² • HÀ NỘI',
    href: '/project/12-biet-thu-oceanpark-hai-au-230m2',
  },
  {
    id: 'parkhome',
    title: 'CHUNG CƯ PARKHOME',
    tagline: 'Sự dung hòa hoàn hảo giữa phong cách Japandi ấm cúng và sự tối giản thanh lịch.',
    image: '/asset/anhweb/japandi/4. Chung cư Parkhome - 145m2/1.webp',
    meta: 'CHUNG CƯ • 145 M² • HÀ NỘI',
    href: '/project/4-chung-cu-parkhome-145m2',
  },
  {
    id: 'oceanpark-r1',
    title: 'OCEANPARK R1',
    tagline: 'Tối ưu hóa công năng sinh hoạt trong một tổng thể hài hòa, nhẹ nhàng và ngập tràn ánh sáng.',
    image: '/asset/anhweb/hiện đại/13. Oceanpark R1 87m2/1.webp',
    meta: 'CHUNG CƯ • 87 M² • HÀ NỘI',
    href: '/project/13-oceanpark-r1-87m2',
  },
  {
    id: 'nhapho-thanhhoa',
    title: 'NHÀ PHỐ THANH HÓA',
    tagline: 'Thiết kế tinh giản, vật liệu tự nhiên kết hợp cùng ánh sáng để tạo nên không gian Wabi-sabi thanh tịnh.',
    image: '/asset/anhweb/wabi-sabi/17. Nhà phố - 5x20 3 tầng - Thanh Hóa/1.webp',
    meta: 'NHÀ PHỐ • 5X20 • THANH HÓA',
    href: '/project/17-nha-pho-5x20-3-tang-thanh-hoa',
  },
  {
    id: 'chungcu-giaiphong',
    title: 'CHUNG CƯ 1277 GIẢI PHÓNG',
    tagline: 'Sự giao thoa hoàn hảo giữa phong cách Japandi ấm áp, hiện đại mang đến không gian sống yên bình.',
    image: '/asset/anhweb/japandi/14. Chung cư 1277 Giải Phóng - 66m2/1.webp',
    meta: 'CHUNG CƯ • 66 M² • HÀ NỘI',
    href: '/project/14-chung-cu-1277-giai-phong-66m2',
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
      {/* Background Images - Render all to prevent loading flash */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={false}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0, 
            scale: index === currentIndex ? 1 : (index > currentIndex ? 1.05 : 0.98),
            zIndex: index === currentIndex ? 1 : 0
          }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Overlay Darkener */}
          <div className="absolute inset-0 bg-neutral-950/45 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20 z-10" />
          
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      ))}

      {/* Slide Visual Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-3xl space-y-4 md:space-y-6">


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
                className="bg-white dark:bg-[#121212] hover:bg-neutral-150 text-neutral-900 dark:text-neutral-100 px-8 py-4 font-bold text-xs tracking-widest flex items-center gap-2 group transition-all rounded-sm shadow-lg shadow-black/20"
                id="hero-view-project"
              >
                <span>XEM DỰ ÁN</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </a>

              <button
                onClick={onOpenContact}
                className="border border-white/70 hover:border-white hover:bg-white dark:hover:bg-neutral-800/10 text-white px-8 py-4 font-bold text-xs tracking-widest transition-all rounded-sm cursor-pointer"
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
        aria-label="Slide trước"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/20 bg-black/20 hover:bg-black/50 text-white/75 hover:text-white transition-all cursor-pointer hidden md:block"
        id="hero-prev-arrow"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        aria-label="Slide sau"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-white/20 bg-black/20 hover:bg-black/50 text-white/75 hover:text-white transition-all cursor-pointer hidden md:block"
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
              aria-label={`Chuyển đến slide ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer min-h-[16px] min-w-[16px] ${
                index === currentIndex ? 'w-10 bg-white dark:bg-[#121212]' : 'w-2 bg-white dark:bg-[#121212]/40'
              }`}
              id={`hero-dot-${slide.id}`}
            />
          ))}
        </div>
        <div className="text-neutral-300/80 tracking-widest font-sans">
          0{currentIndex + 1} <span className="opacity-40">/</span> 0{slides.length}
        </div>
      </div>
    </section>
  );
}
