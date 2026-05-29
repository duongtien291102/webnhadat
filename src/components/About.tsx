import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-20 bg-brand-surface border-b border-brand-concrete-grey">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
      >
        {/* Left Column: Headers */}
        <div className="md:col-span-5 space-y-6">
          <motion.span 
            variants={itemVariants}
            className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-brand-secondary block"
          >
            Về chúng tôi
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-serif text-brand-primary leading-tight tracking-tight"
          >
            Tối giản ấm áp
          </motion.h2>
          
          {/* Accent decoration line */}
          <motion.div 
            variants={itemVariants}
            className="w-16 h-[2px] bg-brand-secondary hidden md:block"
          />
        </div>

        {/* Right Column: Narrative and Counters */}
        <div className="md:col-span-7 space-y-12">
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-brand-on-surface-variant leading-relaxed font-light"
          >
            Những không gian được tạo nên bằng những lựa chọn cẩn thận. Từng vật liệu, từng tia sáng đều có ý nghĩa. Kiến trúc là sự lắng nghe—sự sống của gia đình, đất đai, ánh sáng tự nhiên tuyệt mỹ. Nó hướng đến giá trị cốt lõi bền vững thay vì trào lưu chớp nhoáng.
          </motion.p>

          {/* Metrics Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 md:gap-12 border-t border-brand-concrete-grey pt-10"
          >
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-serif text-brand-primary">12+</p>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-brand-secondary">
                Dự án
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-serif text-brand-primary">5 Năm</p>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-brand-secondary">
                Kinh nghiệm
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-serif text-brand-primary">1</p>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-brand-secondary">
                Thành phố
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
