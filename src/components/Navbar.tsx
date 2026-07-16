"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AlignRight, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onOpenContact: () => void;
  alwaysSolid?: boolean;
}

export default function Navbar({ onOpenContact, alwaysSolid = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollSentinelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sentinel = scrollSentinelRef.current;
    if (!sentinel || alwaysSolid) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [alwaysSolid]);

  const navLinks = [
    { name: 'TRANG CHỦ', href: '/' },
    { name: 'GIỚI THIỆU', href: '/about' },
    { name: 'PHONG CÁCH', href: '/style/all' },
  ];

  const isScrolledActive = isScrolled || alwaysSolid;

  return (
    <>
      <div ref={scrollSentinelRef} className="pointer-events-none absolute top-20 h-px w-px" aria-hidden="true" />
      <header
        className={`select-text fixed top-0 left-0 w-full z-40 transition-[background-color,border-color,box-shadow,padding,backdrop-filter] duration-300 ease-out ${isScrolledActive
          ? 'bg-background/95 backdrop-blur-md py-4 shadow-sm border-b border-neutral-100 dark:border-neutral-800'
          : 'bg-gradient-to-b from-black/50 to-transparent py-6 text-white'
          }`}
        id="app-navbar"
        data-allow-copy="true"
        style={{ WebkitUserSelect: 'text', userSelect: 'text' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            aria-label="Trang chủ NOU.Design" 
            className="flex items-center gap-3 group"
            onClick={() => {
              if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="relative w-10 h-10 transition-transform hover:scale-105">
              <Image
                src="/logoNOU.jpg"
                alt="NOU.Design Logo"
                fill
                className={`object-contain transition-all duration-300 ${isScrolledActive ? 'invert mix-blend-multiply dark:invert-0 dark:mix-blend-screen' : 'mix-blend-screen'}`}
              />
            </div>
            <div>
              <h1
                className={`text-sm tracking-[0.25em] font-medium transition-colors ${isScrolledActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-white'
                  }`}
              >
                NOU.Design
              </h1>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group py-2">
                <Link
                  href={link.href}
                  onClick={() => {
                    if (window.location.pathname === link.href) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`text-xs tracking-widest font-semibold hover:opacity-100 transition-opacity relative py-2 ${isScrolledActive ? 'text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white opacity-80' : 'text-[#f5f1ea] hover:text-white opacity-85'
                    }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className={`px-6 py-2.5 text-xs font-bold tracking-widest border transition-all cursor-pointer hover:scale-105 active:scale-95 ${isScrolledActive
                ? 'border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black'
                : 'border-[#f5f1ea] text-[#f5f1ea] hover:bg-white hover:text-black'
                }`}
              id="desktop-contact-btn"
            >
              LIÊN HỆ
            </button>
            <ThemeToggle isScrolledActive={isScrolledActive} />
          </div>

          {/* Mobile: Dark mode toggle + Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle isScrolledActive={isScrolledActive} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded focus:outline-none cursor-pointer"
              id="mobile-menu-toggle"
              aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {isMobileMenuOpen ? (
                <X size={24} className={isScrolledActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-white'} />
              ) : (
                <AlignRight size={24} className={isScrolledActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-white'} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="select-text fixed inset-0 z-30 pt-24 pb-12 px-6 bg-[#f7f5f0] dark:bg-[#1a1a1a] flex flex-col justify-between overflow-y-auto"
            id="mobile-navigation-overlay"
            data-allow-copy="true"
            style={{ WebkitUserSelect: 'text', userSelect: 'text' }}
          >
            <div className="flex flex-col space-y-6 text-center pt-8">
              {navLinks.map((link, idx) => (
                <div key={link.name} className="flex flex-col border-b border-neutral-200 dark:border-neutral-800/50">
                  <Link
                    href={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (window.location.pathname === link.href) {
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className="text-lg tracking-widest font-serif font-medium text-neutral-800 dark:text-neutral-200 hover:text-black py-3"
                  >
                    <motion.span
                      initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-12 items-center">
              <ThemeToggle isScrolledActive={true} />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full max-w-sm bg-neutral-900 text-white font-semibold py-4 text-xs tracking-widest hover:bg-neutral-850 transition-all cursor-pointer shadow-lg shadow-neutral-950/10"
                id="mobile-contact-btn"
              >
                LIÊN HỆ THỦ CÔNG
              </button>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-300 mt-2 font-sans">
                NOU.Design • Cảm hứng sáng tạo là đam mê tuyệt đối
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
