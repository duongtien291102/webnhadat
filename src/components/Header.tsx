import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Inbox } from 'lucide-react';

interface HeaderProps {
  onNavClick: (id: string) => void;
  onOpenInbox: () => void;
  inboxCount: number;
}

export default function Header({ onNavClick, onOpenInbox, inboxCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hiện header khi cuộn xuống quá 100px
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-20 h-20 transition-all duration-500
        ${isScrolled 
          ? 'translate-y-0 opacity-100 bg-brand-surface/90 backdrop-blur-md border-b border-brand-concrete-grey text-brand-primary shadow-sm' 
          : '-translate-y-full opacity-0 pointer-events-none'
        }
      `}
    >
      <div className="flex items-center gap-2 cursor-pointer pointer-events-auto" onClick={() => handleLinkClick('hero')}>
        <span className="text-lg font-bold tracking-[0.2em] uppercase font-sans">NOU DESIGN</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 items-center">
        <button
          onClick={() => handleLinkClick('about')}
          className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant hover:text-brand-primary transition-colors cursor-pointer"
        >
          About Us
        </button>
        <button
          onClick={() => handleLinkClick('projects')}
          className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant hover:text-brand-primary transition-colors cursor-pointer"
        >
          Projects
        </button>
        <button
          onClick={() => handleLinkClick('services')}
          className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant hover:text-brand-primary transition-colors cursor-pointer"
        >
          Services
        </button>
        <button
          onClick={() => handleLinkClick('contact')}
          className="text-xs font-semibold tracking-widest uppercase text-brand-on-surface-variant hover:text-brand-primary transition-colors cursor-pointer"
        >
          Contact
        </button>

        {/* Inbox Indicator */}
        <button
          onClick={onOpenInbox}
          className="relative flex items-center gap-1.5 px-3 py-1.5 border border-brand-concrete-grey text-xs font-semibold uppercase tracking-widest hover:bg-brand-surface-low transition-all"
          title="Xem hộp thư yêu cầu"
        >
          <Inbox size={14} />
          <span>Hộp thư</span>
          {inboxCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-brand-secondary text-brand-on-secondary w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold">
              {inboxCount}
            </span>
          )}
        </button>

        <button
          onClick={() => handleLinkClick('projects')}
          className="bg-brand-primary text-brand-on-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-brand-warm-slate transition-all cursor-pointer flex items-center gap-1"
        >
          <span>Xem dự án</span>
          <ArrowUpRight size={14} />
        </button>
      </nav>

      {/* Mobile Menu Trigger & Inbox button */}
      <div className="flex items-center gap-4 md:hidden">
        <button
          onClick={onOpenInbox}
          className="relative p-2 text-brand-primary hover:bg-brand-surface-low rounded transition-colors"
          title="Xem hộp thư"
        >
          <Inbox size={20} />
          {inboxCount > 0 && (
            <span className="absolute top-1 right-1 bg-brand-secondary text-brand-on-secondary w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold animate-pulse">
              {inboxCount}
            </span>
          )}
        </button>

        <button onClick={toggleMobileMenu} className="p-2 border border-brand-concrete-grey rounded cursor-pointer">
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-brand-surface border-b border-brand-concrete-grey py-8 px-6 flex flex-col gap-6 md:hidden z-45 shadow-sm animate-fade-in">
          <button
            onClick={() => handleLinkClick('about')}
            className="text-left text-sm font-semibold tracking-widest uppercase text-brand-on-surface-variant pb-2 border-b border-brand-surface-low"
          >
            About Us
          </button>
          <button
            onClick={() => handleLinkClick('projects')}
            className="text-left text-sm font-semibold tracking-widest uppercase text-brand-on-surface-variant pb-2 border-b border-brand-surface-low"
          >
            Projects
          </button>
          <button
            onClick={() => handleLinkClick('services')}
            className="text-left text-sm font-semibold tracking-widest uppercase text-brand-on-surface-variant pb-2 border-b border-brand-surface-low"
          >
            Services
          </button>
          <button
            onClick={() => handleLinkClick('contact')}
            className="text-left text-sm font-semibold tracking-widest uppercase text-brand-on-surface-variant pb-2 border-b border-brand-surface-low"
          >
            Contact
          </button>
          <button
            onClick={() => {
              onOpenInbox();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 justify-center w-full py-3 bg-brand-surface-low text-brand-primary text-xs font-semibold uppercase tracking-widest border border-brand-concrete-grey"
          >
            <Inbox size={16} />
            Yêu cầu tư vấn ({inboxCount})
          </button>
          <button
            onClick={() => handleLinkClick('projects')}
            className="bg-brand-primary text-brand-on-primary py-4 text-center text-xs font-semibold uppercase tracking-widest hover:bg-brand-warm-slate transition-all"
          >
            Xem Dự Án
          </button>
        </div>
      )}
    </header>
  );
}
