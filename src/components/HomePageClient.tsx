"use client";

import React, { useState } from 'react';
import type { Project, SiteSettingsData } from '../types';
import Navbar from './Navbar';
import HeroSlider from './HeroSlider';
import Introduction from './Introduction';
import MaterialsSection from './MaterialsSection';
import ProcessAndCalculator from './ProcessAndCalculator';
import AlternatingProjects from './AlternatingProjects';
import ContactModal from './ContactModal';
import Footer from './Footer';

interface HomePageClientProps {
  projects: Project[];
  siteSettings: SiteSettingsData;
}

export default function HomePageClient({ projects, siteSettings }: HomePageClientProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedArea, setSelectedArea] = useState<number | ''>('');

  const handleOpenContactWithMaterial = (materialId: string) => {
    setSelectedMaterial(materialId);
    setSelectedStyle('');
    setSelectedArea('');
    setIsContactOpen(true);
  };

  const handleOpenContactWithBudget = (details: { area: number; style: string; material: string }) => {
    setSelectedMaterial(details.material);
    setSelectedStyle(details.style);
    setSelectedArea(details.area);
    setIsContactOpen(true);
  };

  const handleOpenGeneralContact = () => {
    setSelectedMaterial('');
    setSelectedStyle('');
    setSelectedArea('');
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background">
      <Navbar onOpenContact={handleOpenGeneralContact} />

      <main className="flex-1">
        <HeroSlider onOpenContact={handleOpenGeneralContact} slides={siteSettings.heroSlides} />

        <Introduction data={siteSettings.introduction} />

        <MaterialsSection
          onSelectMaterial={handleOpenContactWithMaterial}
          materials={siteSettings.materials}
        />

        <AlternatingProjects
          onOpenConsultation={handleOpenGeneralContact}
          projects={projects}
        />

        <ProcessAndCalculator onOpenWithBudget={handleOpenContactWithBudget} />
      </main>

      <Footer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMaterial={selectedMaterial}
        initialStyle={selectedStyle}
        initialArea={selectedArea}
      />
    </div>
  );
}
