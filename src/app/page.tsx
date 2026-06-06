"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import Introduction from '../components/Introduction';
import MaterialsSection from '../components/MaterialsSection';
import ProcessAndCalculator from '../components/ProcessAndCalculator';
import AlternatingProjects from '../components/AlternatingProjects';
import ContactModal from '../components/ContactModal';
import Footer from '../components/Footer';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('');

  const handleOpenContactWithMaterial = (materialId: string) => {
    setSelectedMaterial(materialId);
    setIsContactOpen(true);
  };

  const handleOpenContactWithBudget = (details: { area: number; style: string; material: string }) => {
    // We could pre-configure other things if needed. For now, set material preference
    setSelectedMaterial(details.material);
    setIsContactOpen(true);
  };

  const handleOpenGeneralContact = () => {
    setSelectedMaterial('');
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfbf9]">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenContact={handleOpenGeneralContact} />

      {/* Main Structural Layout */}
      <main className="flex-1">
        {/* Cinematic Hero Slider Section */}
        <HeroSlider onOpenContact={handleOpenGeneralContact} />

        {/* Intros and Before/After Slider */}
        <Introduction />

        {/* Material Selection Center */}
        <MaterialsSection onSelectMaterial={handleOpenContactWithMaterial} />

        {/* Alternating Projects (01 MILIMALISM Gamuda and others) */}
        <AlternatingProjects onOpenConsultation={handleOpenGeneralContact} />

        {/* Process Flow & Dynamic Budget Planner Widget */}
        <ProcessAndCalculator onOpenWithBudget={handleOpenContactWithBudget} />
      </main>

      {/* Footer Branding & Address */}
      <Footer />

      {/* Dialog consultation module */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMaterial={selectedMaterial}
      />
    </div>
  );
}
