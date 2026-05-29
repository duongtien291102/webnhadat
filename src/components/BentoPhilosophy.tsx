import React from 'react';
import { motion } from 'motion/react';
import { Trees, Sun, Home } from 'lucide-react';

export default function BentoPhilosophy() {
  return (
    <section className="px-6 md:px-20 py-24 bg-brand-surface-low border-b border-brand-concrete-grey overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Vật liệu thật */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white p-10 md:p-12 flex flex-col justify-between border border-brand-concrete-grey group hover:border-brand-primary hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 rounded-none cursor-pointer"
        >
          <div className="space-y-6">
            <div className="w-12 h-12 bg-brand-surface-low flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white group-hover:rotate-6 transition-all duration-500">
              <Trees size={24} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-serif text-brand-primary">Vật liệu thật</h3>
              <p className="text-sm leading-relaxed text-brand-on-surface-variant">
                Gỗ, bê tông, đất sét. Những chất liệu tự nhiên tôi yêu thích và tin dùng để kiến tạo sự vững chãi trường tồn.
              </p>
            </div>
          </div>
          <div className="h-44 overflow-hidden mt-10 relative">
            <img
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 select-none scale-100 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsfaEJU96S-e65Nkz0yYtHKN_1LBx31CXAbI6kBQ222PG1gOr7nhc3lZdeHNkRyrVMtNeV-r9eNKniQykuELWLd7XgIA-M672Bs14wICrraqM5V1iGsK4iC2-9kTy9DkBNSwcL6E30tVYu_6hJPLHnO_7PSF67Vp_shIoo4sPc5EvQSXo4e9nZSGRFyGLS9-jay6IR_CUrQv57ZrcqYsTgIlqhVjWpkUzo1Ej4t--9vC2YQnrXprX56A666d9oiTeJw6gdW8wdWv0f"
              alt="Vật liệu thật"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Card 2: Ánh sáng (Dark contrast panel) */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="bg-brand-primary text-white p-10 md:p-12 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 transition-all duration-500 rounded-none relative overflow-hidden cursor-pointer"
        >
          {/* Subtle ambient light aura */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-200/20 transition-colors duration-700"></div>

          <div className="space-y-6 relative z-10">
            <div className="w-12 h-12 bg-white/10 flex items-center justify-center text-amber-200 group-hover:bg-amber-100 group-hover:text-brand-primary transition-colors duration-500">
              <Sun size={24} className="group-hover:rotate-45 transition-transform duration-700" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-serif text-white">Ánh sáng</h3>
              <p className="text-sm leading-relaxed text-brand-on-primary-container">
                Thiết kế theo nhịp của mặt trời. Sáng dịu dàng, ấm áp qua ngày, mang lại sinh khí trọn vẹn từng ngóc ngách.
              </p>
            </div>
          </div>
          <div className="relative h-44 overflow-hidden mt-10">
            <img
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-700 select-none scale-100 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuApvQ1dSbnDcNCmaceRqG8Ao54zcCTIRpTbiGiYuYAg-UpHPKe7_94ElFYf1futB6EZcDhnTDbfJBn3-30FgRlYPjytCiLNOE1iW7tAijG5zKOgXfnt92OTU-NJFTo0Y_9I3QrwHW-_6gy9xcWtSO68Bh3QHYz2YvsRYc2GnLdpTJpNGWs2TIVjMlwDtNr4bm4x1Aybg5PaO-8osKjXujC61EEDhFy8457ZtNuvVB2eseEYJpRwHMQQ3M1zoGxiahg1mdb9zUZBFv38"
              alt="Ánh sáng tự nhiên"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Card 3: Sự sống */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="bg-white p-10 md:p-12 flex flex-col justify-between border border-brand-concrete-grey group hover:border-brand-primary hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 rounded-none cursor-pointer"
        >
          <div className="space-y-6">
            <div className="w-12 h-12 bg-brand-surface-low flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white group-hover:-rotate-6 transition-all duration-500">
              <Home size={24} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-serif text-brand-primary">Sự sống</h3>
              <p className="text-sm leading-relaxed text-brand-on-surface-variant">
                Không gian được xây dựng cho gia đình thực. Tối giản nhưng vô cùng ấm cúng, là nơi trú ẩn lý tưởng bình yên.
              </p>
            </div>
          </div>
          <div className="h-44 overflow-hidden mt-10 relative">
            <img
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 select-none scale-100 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3-d_u4PSLxWJSJliLfevgAXJmZ-v_VxVypoL3KuwYDz4S1Cyns-hqxq1joZglgRWuOGEE10IetBytBTmQ6VSeuCo_ZnrWTaZUFoD8oAet6bWZn-7_OoO3KoIMhaLI4I6Fkdzw5DPJiTIqWjzPUVgxnLFgH2EyeX6jltgKwCSgzuDLWfvtsF1qgzaJbB0Dt5_nt864YZzPjQNU46Q8lMHf5FUoB-ntGBu-9VarxA95So_i8XQzyd8m2kEiGcBeFCyhIc3txEt6wXz1"
              alt="Sự sống"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
