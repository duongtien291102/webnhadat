import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, ArrowRight, Sparkles } from 'lucide-react';

interface InteractiveCalculatorProps {
  onApplyEstimate: (data: {
    roomType: string;
    area: number;
    material: string;
    price: number;
    timeline: string;
  }) => void;
}

const MATERIAL_PRESETS = [
  { id: 'rustic', label: 'Gỗ tự nhiên & Đá nguyên khối', multiplier: 1.25 },
  { id: 'industrial', label: 'Bê tông mài & Thép đen liền mạch', multiplier: 1.1 },
  { id: 'warm', label: 'Thạch cao mờ & Sợi dệt tự nhiên', multiplier: 1.0 }
];

const ROOM_PRESETS = [
  { id: 'apartment', label: 'Căn hộ chung cư / Penthouse', basePrice: 450000 },
  { id: 'villa', label: 'Biệt thự phố / Ven biển', basePrice: 650000 },
  { id: 'townhouse', label: 'Nhà phố đương đại', basePrice: 500000 },
  { id: 'livingroom', label: 'Không gian đơn lẻ (Phòng khách/ngủ)', basePrice: 400000 }
];

export default function InteractiveCalculator({ onApplyEstimate }: InteractiveCalculatorProps) {
  const [roomType, setRoomType] = useState('villa');
  const [area, setArea] = useState(120);
  const [material, setMaterial] = useState('warm');
  const [price, setPrice] = useState(0);
  const [timeline, setTimeline] = useState('');

  // Calculate whenever state changes
  useEffect(() => {
    const selectedRoom = ROOM_PRESETS.find(r => r.id === roomType) || ROOM_PRESETS[0];
    const selectedMaterial = MATERIAL_PRESETS.find(m => m.id === material) || MATERIAL_PRESETS[0];

    // Simple estimation math
    // Price = basePrice_per_m2 * m2 * material_multiplier
    const calculatedPrice = selectedRoom.basePrice * area * selectedMaterial.multiplier;

    // Timeline estimation
    let calculatedWeeks = 4;
    if (area > 80) calculatedWeeks = 6;
    if (area > 150) calculatedWeeks = 8;
    if (area > 250) calculatedWeeks = 12;
    if (roomType === 'villa') calculatedWeeks += 2;

    setPrice(Math.round(calculatedPrice));
    setTimeline(`${calculatedWeeks} - ${calculatedWeeks + 2} tuần`);
  }, [roomType, area, material]);

  const handleApply = () => {
    const selectedRoomLabel = ROOM_PRESETS.find(r => r.id === roomType)?.label || '';
    const selectedMaterialLabel = MATERIAL_PRESETS.find(m => m.id === material)?.label || '';

    onApplyEstimate({
      roomType: selectedRoomLabel,
      area,
      material: selectedMaterialLabel,
      price,
      timeline
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-brand-surface-low border-b border-brand-concrete-grey">
      <div className="max-w-5xl mx-auto border border-brand-concrete-grey bg-white p-8 md:p-14 relative overflow-hidden">
        {/* Subtle grid accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Input Form controls */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-secondary flex items-center gap-1.5">
                <Calculator size={14} />
                <span>CÔNG CỤ THIẾT KẾ</span>
              </span>
              <h2 className="text-3xl font-serif text-brand-primary leading-tight">
                Ước tính ngân sách thiết kế
              </h2>
              <p className="text-sm font-light text-brand-on-surface-variant max-w-lg">
                Chọn các tùy chọn phù hợp nhất với dự án của bạn để nhận báo giá thiết kế ước tính sơ bộ và khung thời gian thực hiện.
              </p>
            </div>

            {/* Room type selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-brand-on-surface-variant">
                1. Loại hình công trình
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROOM_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => setRoomType(preset.id)}
                    className={`p-4 text-left text-xs font-semibold uppercase tracking-wider border transition-all ${
                      roomType === preset.id
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-brand-concrete-grey hover:border-brand-primary text-brand-on-surface bg-transparent'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area slide selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-brand-on-surface-variant">
                  2. Diện tích mặt sàn
                </label>
                <span className="text-sm font-serif font-semibold text-brand-primary">
                  {area} m²
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="450"
                step="5"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-brand-secondary cursor-pointer h-1.5 bg-brand-surface-container rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-brand-on-surface-variant/60 uppercase tracking-widest">
                <span>30 m²</span>
                <span>200 m²</span>
                <span>450 m²</span>
              </div>
            </div>

            {/* Materials choice options */}
            <div className="space-y-3">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-brand-on-surface-variant">
                3. Chất liệu chủ đạo đề xuất
              </label>
              <div className="flex flex-col gap-2">
                {MATERIAL_PRESETS.map(m => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-3 p-3.5 border cursor-pointer transition-all ${
                      material === m.id
                        ? 'border-brand-primary bg-brand-surface-low'
                        : 'border-brand-concrete-grey/60 hover:border-brand-concrete-grey'
                    }`}
                  >
                    <input
                      type="radio"
                      name="material_selection"
                      checked={material === m.id}
                      onChange={() => setMaterial(m.id)}
                      className="accent-brand-primary w-4 h-4"
                    />
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                      {m.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Calculation Outcome */}
          <div className="lg:col-span-5 bg-brand-surface-low p-8 border border-brand-concrete-grey flex flex-col justify-between h-full space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-brand-secondary border-b border-brand-concrete-grey pb-4">
                <Sparkles size={16} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">BẢN TÓM TẮT DỰ ÁN</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-on-surface-variant block">Chi phí thiết kế dự kiến</span>
                <span className="text-2xl md:text-3xl font-serif text-brand-primary font-bold block mt-1">
                  {formatCurrency(price)}
                </span>
                <span className="text-[10px] font-light text-brand-on-surface-variant block mt-1">
                  *Bao gồm 3D, bản vẽ kỹ thuật chi tiết & giám sát lựa chọn vật liệu.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-brand-concrete-grey pt-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-on-surface-variant block">Thời gian thiết kế</span>
                  <span className="text-sm font-semibold text-brand-primary font-serif block mt-1">
                    {timeline}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-on-surface-variant block">Diện tích</span>
                  <span className="text-sm font-semibold text-brand-primary font-serif block mt-1">
                    {area} m²
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-full bg-brand-primary text-brand-on-primary py-4 px-6 text-xs font-semibold uppercase tracking-widest hover:bg-brand-warm-slate transition-all flex justify-between items-center group cursor-pointer"
            >
              <span>Áp dụng vào thư liên hệ</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
