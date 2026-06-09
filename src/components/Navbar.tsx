"use client";
import React, { useState, useEffect } from 'react';
import { AlignRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'TRANG CHỦ', href: '#home' },
    { name: 'GIỚI THIỆU', href: '#introduction' },
    { name: 'PHONG CÁCH', href: '#projects' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled
          ? 'bg-[#fcfbf9]/95 backdrop-blur-md py-4 shadow-sm border-b border-neutral-100'
          : 'bg-gradient-to-b from-black/50 to-transparent py-6 text-white'
          }`}
        id="app-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/asset/logo.png"
              alt="NOU Architects Logo"
              className="w-10 h-10 object-contain transition-transform hover:scale-105"
            />
            <div>
              <h1
                className={`text-sm tracking-[0.25em] font-medium transition-colors ${isScrolled ? 'text-neutral-900' : 'text-white'
                  }`}
              >
                NOU ARCHITECTS
              </h1>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs tracking-widest font-semibold hover:opacity-100 transition-opacity relative py-2 ${isScrolled ? 'text-neutral-700 hover:text-black opacity-80' : 'text-[#f5f1ea] hover:text-white opacity-85'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:block">
            <button
              onClick={onOpenContact}
              className={`px-6 py-2.5 text-xs font-bold tracking-widest border transition-all cursor-pointer hover:scale-105 active:scale-95 ${isScrolled
                ? 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'
                : 'border-[#f5f1ea] text-[#f5f1ea] hover:bg-white hover:text-black'
                }`}
              id="desktop-contact-btn"
            >
              LIÊN HỆ
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded focus:outline-none cursor-pointer"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X size={24} className={isScrolled ? 'text-neutral-900' : 'text-white'} />
            ) : (
              <AlignRight size={24} className={isScrolled ? 'text-neutral-900' : 'text-white'} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 pt-24 pb-12 px-6 bg-[#f7f5f0] flex flex-col justify-between overflow-y-auto"
            id="mobile-navigation-overlay"
          >
            <div className="flex flex-col space-y-6 text-center pt-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-lg tracking-widest font-serif font-medium text-neutral-800 hover:text-black py-2 border-b border-neutral-200/50"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-12 items-center">
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
              <p className="text-[10px] text-neutral-400 mt-2 font-sans">
                NOU ARCHITECTS • PHONG CÁCH TỐI GIẢN JAPANDI • © 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
