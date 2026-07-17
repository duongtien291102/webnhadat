"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Compass, Sun, Home, MoveHorizontal } from 'lucide-react';
import { PhilosophyCard } from '../types';
import Reveal from './Reveal';

export default function Introduction() {
  const [sliderValue, setSliderValue] = useState(50);
  const sliderPosition = useMotionValue(50);
  const sliderWidth = useTransform(sliderPosition, (value) => `${value}%`);
  const sliderLeft = useTransform(sliderPosition, (value) => `${value}%`);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const stats = [
    { value: '200+', label: 'Dự án' },
    { value: '10 Năm', label: 'Kinh nghiệm' },
    { value: '3', label: 'Triết lý thiết kế' },
  ];

  const philosophyCards: PhilosophyCard[] = [
    {
      title: 'Vật liệu thật',
      iconName: 'compass',
      description: 'Sử dụng vật liệu tự nhiên để tôn vinh vẻ đẹp nguyên bản của thiết kế.',
      image: '/asset/anhweb/japandi/4. Chung cư Parkhome - 145m2/2.webp',
    },
    {
      title: 'Ánh sáng',
      iconName: 'sun',
      description: 'Tối đa hóa ánh sáng tự nhiên và thông gió, mang lại không gian sống thoáng đãng và trong lành.',
      image: '/asset/anhweb/hiện đại/12. Biệt thự Oceanpark - Hải Âu 230m2/2.webp',
    },
    {
      title: 'Sự sống',
      iconName: 'home',
      description: 'Tạo ra một hệ sinh thái trong không gian, nơi con người và thiên nhiên hòa quyện.',
      image: '/asset/anhweb/wabi-sabi/17. Nhà phố - 5x20 3 tầng - Thanh Hóa/3.webp',
    },
  ];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'compass':
        return <Compass className="w-6 h-6 text-neutral-800 dark:text-neutral-200" strokeWidth={1.5} />;
      case 'sun':
        return <Sun className="w-6 h-6 text-neutral-800 dark:text-neutral-200" strokeWidth={1.5} />;
      case 'home':
        return <Home className="w-6 h-6 text-neutral-800 dark:text-neutral-200" strokeWidth={1.5} />;
      default:
        return null;
    }
  };

  const handleTouchAndMouseMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    sliderPosition.set(position);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    handleTouchAndMouseMove(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current) handleTouchAndMouseMove(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setSliderValue(Math.round(sliderPosition.get()));
  };

  const handleSliderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const nextValue = Math.max(0, Math.min(100, sliderPosition.get() + (event.key === 'ArrowRight' ? 4 : -4)));
    sliderPosition.set(nextValue);
    setSliderValue(Math.round(nextValue));
  };

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden" id="introduction">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Intro Blocks - Two columns */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="mono-tag text-xs font-semibold text-neutral-400 dark:text-neutral-300 tracking-widest block">GIỚI THIỆU</span>
            <h3 className="text-3xl md:text-5xl font-serif text-neutral-900 dark:text-neutral-100 font-normal leading-tight">
              Thiết kế <span className="whitespace-nowrap">không gian</span><br />với sự tĩnh lặng.
            </h3>
          </div>

          <div className="lg:col-span-7 space-y-8 lg:pt-8">
            <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
              <strong className="text-neutral-900 dark:text-neutral-100 font-medium">NOU.Design</strong> là một studio kiến trúc và nội thất theo đuổi phong cách tối giản <strong className="text-neutral-900 dark:text-neutral-100 font-medium">Japandi</strong>. Chúng tôi tin rằng không gian sống nên là một tác phẩm nghệ thuật mang lại sự bình yên.
            </p>

            {/* Horizontal Stats Counter */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-200 dark:border-neutral-800/80">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl md:text-4xl font-serif font-medium text-neutral-900 dark:text-neutral-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-neutral-400 dark:text-neutral-300 tracking-wide font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Before / After Interactive Slider Section */}
        <Reveal className="space-y-6 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="mono-tag text-[10px] text-neutral-400 dark:text-neutral-300 font-bold uppercase">Công cụ tương tác</span>
            <h4 className="text-lg font-serif text-neutral-900 dark:text-neutral-100 font-medium">Từ Bản Vẽ Kỹ Thuật Đến Hiện Thực</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Kéo thanh trượt ngang để so sánh nét vẽ CAD và không gian hoàn thiện thực tế dồi dào sinh lực.</p>
          </div>

          <div 
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleSliderKeyDown}
            role="slider"
            tabIndex={0}
            aria-label="So sánh bản vẽ và không gian hoàn thiện"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={sliderValue}
            className="relative w-full h-[320px] md:h-[480px] lg:h-[550px] bg-neutral-200 overflow-hidden cursor-ew-resize select-none border border-neutral-200 dark:border-neutral-800 rounded-sm touch-pan-y"
          >
            {/* Before Stage (CAD Blueprint) */}
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80" 
                alt="CAD Architectural Draft" 
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute left-6 top-6 bg-black/60 backdrop-blur-md px-3 py-1.5 text-[10px] text-[#f5f1ea] border border-white/10 tracking-widest">
                SKETCH • BẢN VẼ SƠ PHÁC
              </div>
            </div>

            {/* After Stage (Completed Photo render) */}
            <motion.div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ width: sliderWidth }}
            >
              <div className="absolute inset-0 w-full h-full min-w-[320px] md:min-w-[768px] lg:min-w-[1200px]">
                <Image 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Finished Architectural Rendering" 
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute right-6 top-6 bg-neutral-900 px-3 py-1.5 text-[10px] text-[#e9dcce] border border-neutral-700 tracking-widest whitespace-nowrap">
                  REALITY • KHÔNG GIAN BÀN GIAO
                </div>
              </div>
            </motion.div>

            {/* Slider Saparator Bar and Button */}
            <motion.div
              className="absolute top-0 bottom-0 w-0.5 bg-white dark:bg-[#121212]/70 z-20 pointer-events-none"
              style={{ left: sliderLeft }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white dark:bg-[#121212] shadow-xl rounded-full flex items-center justify-center text-neutral-800 dark:text-neutral-200 border-2 border-neutral-200 dark:border-neutral-800 pointer-events-auto cursor-ew-resize">
                <MoveHorizontal size={16} />
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* Philosophy Segment */}
        <div className="space-y-12 pt-12 border-t border-neutral-150" id="philosophy">
          <Reveal className="text-center max-w-lg mx-auto space-y-3">
            <span className="mono-tag text-xs font-semibold text-neutral-400 dark:text-neutral-300 tracking-widest block uppercase">TRIẾT LÝ THIẾT KẾ</span>
            <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 dark:text-neutral-100 font-medium">
              Cân bằng & Tinh tế
            </h3>
          </Reveal>

          {/* 3 cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyCards.map((card, idx) => (
              <Reveal key={idx} delay={idx * 0.07} className="bg-white dark:bg-[#121212] border border-neutral-100 dark:border-neutral-800 flex flex-col justify-between group overflow-hidden hover:shadow-xl hover:shadow-neutral-950/5 hover:-translate-y-1 transition-all duration-300">
                {/* Header card info */}
                <div className="p-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#f7f5f0] dark:bg-[#1a1a1a] flex items-center justify-center border border-neutral-200 dark:border-neutral-800/50">
                    {renderIcon(card.iconName)}
                  </div>
                  <h4 className="text-lg font-serif font-medium text-neutral-900 dark:text-neutral-100">{card.title}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">{card.description}</p>
                </div>

                {/* Card thumbnail image */}
                <div className="relative h-44 w-full overflow-hidden border-t border-neutral-100 dark:border-neutral-800 mt-2">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
