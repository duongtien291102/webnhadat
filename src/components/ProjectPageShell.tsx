"use client";

import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactModal from './ContactModal';

export default function ProjectPageShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenContact={() => setIsContactOpen(true)} alwaysSolid />
      {children}
      <Footer />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMaterial=""
      />
    </div>
  );
}
