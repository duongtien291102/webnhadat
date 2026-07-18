import React from 'react';
import { Step } from '../types';
import Reveal from './Reveal';

interface ProcessSectionProps {
  onOpenWithBudget?: (details: { area: number; style: string; material: string }) => void;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Khám phá & Lắng nghe',
    description: 'Mỗi dự án được khởi đầu bằng việc nghiên cứu sâu sắc nhu cầu, thói quen sinh hoạt của gia chủ cùng vị trí đồi đất tự nhiên để định vị và phát thảo các phương án ý tưởng phù hợp nhất.',
  },
  {
    number: '02',
    title: 'Thiết kế ý tưởng',
    description: 'Giai đoạn này biến các ý tưởng sơ khai thành mô hình không gian 3D trực quan sinh động, chú trọng giải phóng bức tường ngăn, sắp đặt hợp lý lối di chuyển tự do và tối ưu ánh mặt trời.',
  },
  {
    number: '03',
    title: 'Triển khai chi tiết',
    description: 'Giai đoạn này hoàn thiện bản vẽ mặt bằng kỹ thuật thi công chuẩn xác, lựa chọn chất liệu tinh chọn tận tay và sắp đặt đèn chiếu sâu tối giản tạo nét đặc trưng linh hồn cho công trình.',
  },
];

export default function ProcessAndCalculator({ onOpenWithBudget }: ProcessSectionProps) {
  return (
    <section className="py-24 bg-background" id="process">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Step-by-Step Quy Trình matching Image layout */}
        <div className="space-y-12">
          <Reveal className="text-center space-y-3">
            <span className="mono-tag text-xs font-semibold text-neutral-600 dark:text-neutral-300 tracking-widest block uppercase">QUY TRÌNH</span>
            <h2 className="text-2xl md:text-3xl font-serif text-neutral-900 dark:text-neutral-100 font-medium">
              Cách chúng tôi làm việc.
            </h2>
          </Reveal>

          {/* Bordered box wrapping process slides */}
          <Reveal className="border border-neutral-200 dark:border-neutral-800/80 bg-[#fbfaf8] dark:bg-[#151515] p-8 md:p-12 lg:p-16 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="space-y-6 relative group">
                  
                  {/* Step Header Ring badge */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#dfd9ce] dark:bg-[#2a2a2a] font-sans text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center justify-center border border-neutral-300 dark:border-neutral-700">
                      {step.number}
                    </div>
                    <h3 className="text-sm font-semibold tracking-wider text-neutral-700 dark:text-neutral-300 uppercase">Giai Đoạn {step.number}</h3>
                  </div>

                  {/* Step Content */}
                  <div className="space-y-2">
                    <h4 className="text-md font-bold text-neutral-900 dark:text-neutral-100 font-sans group-hover:text-black transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>

                  {/* Horizontal Connector lines for desktop */}
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-5 -right-8 lg:-right-12 w-10 lg:w-12 h-px bg-neutral-200 dark:bg-neutral-800" />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
