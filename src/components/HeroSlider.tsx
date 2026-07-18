"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
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
    tagline: 'Không gian sống được thiết kế với sự tinh tế và tiện nghi tối đa, mang phong cách hiện đại cùng dấu ấn riêng đầy cuốn hút.',
    image: '/asset/anhweb/hien-dai/12-biet-thu-oceanpark-hai-au-230m2/1.webp',
    meta: 'BIỆT THỰ • 230 M² • HÀ NỘI',
    href: '/project/12-biet-thu-oceanpark-hai-au-230m2',
  },
  {
    id: 'parkhome',
    title: 'CHUNG CƯ PARKHOME',
    tagline: 'Sự dung hòa hoàn hảo giữa phong cách Japandi ấm cúng và sự tối giản thanh lịch.',
    image: '/asset/anhweb/japandi/4-chung-cu-parkhome-145m2/1.webp',
    meta: 'CHUNG CƯ • 145 M² • HÀ NỘI',
    href: '/project/4-chung-cu-parkhome-145m2',
  },
  {
    id: 'ecopark-duplex',
    title: 'CHUNG CƯ ECOPARK DUPLEX',
    tagline: 'Không gian duplex thoáng rộng, tinh giản và giàu ánh sáng với các lớp vật liệu hiện đại.',
    image: '/asset/hero/chung-cu-ecopark-duplex.webp',
    meta: 'CHUNG CƯ DUPLEX • ECOPARK',
    href: '/style/HIEN_DAI',
  },
  {
    id: 'matrix-one',
    title: 'CHUNG CƯ MATRIX ONE',
    tagline: 'Không gian hiện đại với vật liệu đá, ánh sáng ấm và những đường nét kiến trúc dứt khoát.',
    image: '/asset/hero/chung-cu-matrix-one.webp',
    meta: 'CHUNG CƯ • MATRIX ONE • HÀ NỘI',
    href: '/project/8-chung-cu-matrix-one-125m2',
  },
  {
    id: 'chungcu-giaiphong',
    title: 'CHUNG CƯ 1277 GIẢI PHÓNG',
    tagline: 'Sự giao thoa hoàn hảo giữa phong cách Japandi ấm áp, hiện đại mang đến không gian sống yên bình.',
    image: '/asset/anhweb/japandi/14-chung-cu-1277-giai-phong-66m2/1.webp',
    meta: 'CHUNG CƯ • 66 M² • HÀ NỘI',
    href: '/project/14-chung-cu-1277-giai-phong-66m2',
  },
];

export default function HeroSlider({ onOpenContact }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const nextSlide = slides[(currentIndex + 1) % slides.length];
    const preload = new window.Image();
    preload.src = nextSlide.image;
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) return;
    const distance = clientX - touchStartX.current;
    if (Math.abs(distance) > 48) {
      if (distance > 0) handlePrev();
      else handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative min-h-[100dvh] w-full bg-black overflow-hidden"
      id="home"
      onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
    >
      {/* Background image crossfade */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slides[currentIndex].id}
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.995 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Overlay Darkener */}
          <div className="absolute inset-0 bg-neutral-950/45 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/20 z-10" />
          
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            fill
            priority={currentIndex === 0}
            sizes="100vw"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide Visual Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-3xl space-y-4 md:space-y-6">


            {/* Giant Heading */}
            <motion.div
              key={`title-${currentIndex}`}
              initial={false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-none">
                {slides[currentIndex].title}
              </h1>
            </motion.div>

            {/* Sub-tagline */}
            <motion.div
              key={`tagline-${currentIndex}`}
              initial={false}
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
              initial={false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href={slides[currentIndex].href}
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
                NHẬN TƯ VẤN
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
