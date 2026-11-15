import React from 'react';
import Image from 'next/image';
import { defaultSiteSettings } from '../lib/defaultSiteSettings';
import { isUploadedImageUrl } from '../lib/projectImages';
import { Material } from '../types';
import Reveal from './Reveal';

interface MaterialsSectionProps {
  onSelectMaterial: (materialId: string) => void;
  materials?: Material[];
}

export default function MaterialsSection({ onSelectMaterial, materials }: MaterialsSectionProps) {
  const activeMaterials = materials && materials.length > 0 ? materials : defaultSiteSettings.materials;
  return (
    <section className="py-24 bg-[#f6f4ee] dark:bg-[#1a1a1a] border-y border-neutral-200 dark:border-neutral-800/50" id="materials">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Title */}
        <Reveal className="text-center space-y-4">
          <div className="w-12 h-px bg-neutral-400 mx-auto" />
          <h2 className="text-3xl font-serif text-neutral-900 dark:text-neutral-100 font-normal tracking-wide">
            Vật liệu tuyển chọn
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans tracking-widest max-w-md mx-auto leading-relaxed">
            Hồi đáp xúc giác từ thiên nhiên, tuyển trọn vật liệu thô bản mộc mạc nhất để định nghĩa chiều sâu của thiết kế kiến trúc.
          </p>
        </Reveal>

        {/* Circular Swatches Row - Centered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto items-start">
          {activeMaterials.map((material, index) => (
            <Reveal key={material.id} delay={index * 0.06}>
              <button
                onClick={() => onSelectMaterial(material.id)}
                className="flex w-full flex-col items-center text-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:focus-visible:ring-neutral-300 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-[#1a1a1a]"
                id={`material-swatch-${material.id}`}
              >
              {/* Swatch Circle Wrapper */}
              <div
                className="relative w-28 h-28 rounded-full overflow-hidden mb-4 border border-neutral-300 dark:border-neutral-700 transition-all duration-300 transform group-hover:scale-105 group-hover:border-neutral-900 dark:group-hover:border-neutral-200 group-hover:ring-4 group-hover:ring-neutral-400/10 dark:group-hover:ring-white/10 shadow-sm"
              >
                <Image
                  src={material.image}
                  alt={material.name}
                  fill
                  unoptimized={isUploadedImageUrl(material.image)}
                  sizes="112px"
                  className="object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Circular Mask / Glow */}
                <div className="absolute inset-0 bg-neutral-950/5 group-hover:bg-transparent transition-all" />
              </div>

              {/* Swatch Label */}
              <h3 className="text-xs font-bold font-sans tracking-widest text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                {material.name}
              </h3>
              <p className="text-[10px] text-neutral-600 dark:text-neutral-200 group-hover:text-neutral-700 dark:group-hover:text-white font-sans font-medium mt-1 transition-colors">
                {material.vietnameseName}
              </p>
              </button>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
