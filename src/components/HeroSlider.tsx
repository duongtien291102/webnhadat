"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { defaultSiteSettings } from '../lib/defaultSiteSettings';
import { isUploadedImageUrl } from '../lib/projectImages';
import type { HeroSlide } from '../types';

interface HeroSliderProps {
  onOpenContact: () => void;
  slides?: HeroSlide[];
}

export default function HeroSlider({ onOpenContact, slides }: HeroSliderProps) {
  const activeSlides = slides && slides.length > 0 ? slides : defaultSiteSettings.heroSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeIndex = currentIndex < activeSlides.length ? currentIndex : 0;
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const nextSlide = activeSlides[(safeIndex + 1) % activeSlides.length];
    if (!nextSlide?.image) return;
    const preload = new window.Image();
    preload.src = nextSlide.image;
  }, [safeIndex, activeSlides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
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

  const activeSlide = activeSlides[safeIndex];

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
          key={`${activeSlide.id}-${activeSlide.image}`}
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
            src={activeSlide.image}
            alt={activeSlide.title}
            fill
            unoptimized={isUploadedImageUrl(activeSlide.image)}
            priority={safeIndex === 0}
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
            <div
              key={`title-${safeIndex}`}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-none">
                {activeSlide.title}
              </h1>
            </div>

            {/* Sub-tagline */}
            <div
              key={`tagline-${safeIndex}`}
            >
              <p className="text-sm md:text-lg text-neutral-300 font-sans tracking-wide leading-relaxed font-light">
                {activeSlide.tagline}
              </p>
            </div>

            {/* Buttons Row */}
            <div
              key={`buttons-${safeIndex}`}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href={activeSlide.href}
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
            </div>
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
          {activeSlides.map((slide, index) => (
            <button
              key={slide.id}
              aria-label={`Chuyển đến slide ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer min-h-[16px] min-w-[16px] ${
                index === safeIndex ? 'w-10 bg-white dark:bg-[#121212]' : 'w-2 bg-white dark:bg-[#121212]/40'
              }`}
              id={`hero-dot-${slide.id}`}
            />
          ))}
        </div>
        <div className="text-neutral-300/80 tracking-widest font-sans">
          {String(safeIndex + 1).padStart(2, '0')} <span className="opacity-40">/</span> {String(activeSlides.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}
