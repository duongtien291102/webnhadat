"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactModal from '../../components/ContactModal';

export default function AboutPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Animation variants
  const fadeInUp = {
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" as const }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15
      }
    },
    viewport: { once: true, margin: "-100px" }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background">
      <Navbar onOpenContact={() => setIsContactOpen(true)} alwaysSolid />

      <main className="flex-1 pt-24 md:pt-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Top Header Section */}
        <motion.div 
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-16 border-b border-neutral-100 dark:border-neutral-800 pb-16"
        >
          <div className="lg:pr-12">
            <h1 className="text-5xl lg:text-6xl font-serif text-neutral-900 dark:text-neutral-100 font-normal leading-tight tracking-tight">
              Thiết kế <span className="whitespace-nowrap">không gian</span><br />với sự tĩnh lặng.
            </h1>
          </div>
          <div className="lg:pt-4">
            <p className="text-base text-neutral-600 dark:text-neutral-300 font-light leading-relaxed max-w-lg">
              <strong className="font-normal text-neutral-900 dark:text-neutral-100">NOU.Design</strong> là đơn vị thiết kế kiến trúc và nội thất, theo đuổi triết lý tối giản Japandi. Chúng tôi tin rằng không gian sống nên là một tác phẩm nghệ thuật mang lại sự bình yên.
            </p>
          </div>
        </motion.div>

        {/* Story and Warm Minimalism Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mt-12 lg:mt-24">
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="space-y-12">
              {/* Story */}
              <div className="space-y-6 border-b border-neutral-200 dark:border-neutral-800 pb-12">
                <span className="text-xs font-sans font-bold tracking-[0.2em] text-neutral-600 dark:text-neutral-300 uppercase">Câu chuyện của chúng tôi</span>
                <h2 className="text-2xl lg:text-3xl font-serif text-neutral-900 dark:text-neutral-100 font-semibold">Khởi nguồn từ sự trân trọng những điều giản đơn.</h2>
                <div className="text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed space-y-4">
                  <p>Thành lập vào năm 2018, NOU bắt đầu từ một nhóm nhỏ các kiến trúc sư cùng chung một niềm đam mê với vật liệu tự nhiên và ánh sáng tự nhiên. Chúng tôi không chạy theo xu hướng, mà tập trung vào việc tạo ra những không gian vượt thời gian.</p>
                  <p>Mỗi dự án tại NOU đều là một quá trình gạn lọc tinh tế, loại bỏ những chi tiết thừa thãi để giữ lại cốt lõi của không gian: sự cân bằng, công năng và xúc cảm.</p>
                </div>
              </div>
              
              {/* Warm minimalism */}
              <div className="space-y-4 border-b border-neutral-200 dark:border-neutral-800 pb-12">
                <h2 className="text-2xl lg:text-3xl font-serif text-neutral-900 dark:text-neutral-100 font-semibold italic">Tối giản ấm áp</h2>
                <p className="text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">Những không gian được tạo nên bằng những lựa chọn cẩn thận. Từng vật liệu, từng tia sáng đều có ý nghĩa. Kiến trúc là sự lắng nghe về cuộc sống của gia đình, đất đai và ánh sáng tự nhiên.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12 pb-4">
              <div className="space-y-1 text-left">
                <div className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">200+</div>
                <div className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-300 tracking-widest font-sans uppercase font-semibold">Dự án</div>
              </div>
              <div className="space-y-1 text-left">
                <div className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">10 năm</div>
                <div className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-300 tracking-widest font-sans uppercase font-semibold">Kinh nghiệm</div>
              </div>
              <div className="space-y-1 text-left">
                <div className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">3</div>
                <div className="text-[10px] md:text-xs text-neutral-600 dark:text-neutral-300 tracking-widest font-sans uppercase font-semibold">Triết lý thiết kế</div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:col-span-5 aspect-[4/5] lg:aspect-auto h-full w-full overflow-hidden"
          >
            <Image 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" 
              alt="Không gian nội thất NOU.Design"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-sm scale-100 hover:scale-105 transition-all duration-700 shadow-lg" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Process Section */}
        <div className="pt-24 lg:pt-32 pb-16">
          <div className="border-t border-b border-neutral-200 dark:border-neutral-800 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <motion.div 
              {...fadeInUp}
              className="lg:col-span-4 space-y-4"
            >
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-neutral-600 dark:text-neutral-300 uppercase">Quy trình</span>
              <h2 className="text-3xl lg:text-4xl font-serif text-neutral-900 dark:text-neutral-100 font-normal leading-tight">
                Cách chúng tôi<br />làm việc.
              </h2>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-8 space-y-12"
            >
              {/* Step 1 */}
              <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-neutral-100 dark:border-neutral-800 pb-12">
                <span className="text-xs font-sans font-bold text-neutral-600 dark:text-neutral-300">01</span>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif text-neutral-900 dark:text-neutral-100 font-semibold">Khám phá & Lắng nghe</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">Mọi dự án bắt đầu bằng việc hiểu rõ phong cách sống, thói quen sinh hoạt và bối cảnh tâm hồn của gia chủ. Chúng tôi dành trọn vẹn thời gian đầu để phân tích sâu, đồng điệu nhịp đập và phác thảo những giải pháp định vị đầu tiên.</p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-neutral-100 dark:border-neutral-800 pb-12">
                <span className="text-xs font-sans font-bold text-neutral-600 dark:text-neutral-300">02</span>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif text-neutral-900 dark:text-neutral-100 font-semibold">Thiết kế ý tưởng</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">Chuyển hóa nhu cầu vô hình thành bố cục không gian ba chiều rõ nét. Giai đoạn này đặt nặng trọng tâm vào nghiên cứu luồng di chuyển, sự hợp lý của mặt bằng và khả năng tối ưu hóa vùng tương tác của ánh sáng.</p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-6 md:gap-12">
                <span className="text-xs font-sans font-bold text-neutral-600 dark:text-neutral-300">03</span>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif text-neutral-900 dark:text-neutral-100 font-semibold">Triển khai chi tiết</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">Hoàn thiện các hệ thống bản vẽ kỹ thuật chuyên sâu bằng độ chính xác tuyệt đối. Chọn lựa kỹ mộc chi tiết thiết bị, loại thảm thô bản, ánh sáng và quản lý cấu kiện thi công thực địa để bảo thạch linh hồn dự án được lưu giữ trọn vẹn.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            {...fadeInUp}
            className="pt-16 flex justify-center"
          >
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-[#0f0f0f] hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all shadow-xl hover:shadow-2xl cursor-pointer rounded-sm"
            >
              BẮT ĐẦU DỰ ÁN KIẾN TRÚC CỦA BẠN CHỈ VỚI Nou.Design
            </button>
          </motion.div>
        </div>

        {/* Founders Section */}
        <div className="pt-16 pb-32">
          <motion.div 
            {...fadeInUp}
            className="space-y-4 mb-16"
          >
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-neutral-600 dark:text-neutral-300 uppercase">Đội ngũ sáng lập</span>
            <h2 className="text-3xl lg:text-4xl font-serif text-neutral-900 dark:text-neutral-100 font-normal leading-tight">
              Những Người Sáng Tạo
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-2xl">
              "Nou" được lấy cảm hứng từ "Nouveau" (mới mẻ, tiên phong). Tại NOU.Design, chúng tôi tin rằng mỗi ngôi nhà đều sở hữu một câu chuyện và vẻ đẹp hoàn hảo riêng, chờ đợi được đánh thức bởi những khối óc sáng tạo.
            </p>
          </motion.div>

          <div className="flex flex-col gap-16 lg:gap-24">
            {/* Founder 1 */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center group"
            >
              <div className="md:col-span-5 relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm shadow-md">
                <Image 
                  src="/asset/team/dang-minh-duc.webp"
                  alt="Đặng Minh Đức - CEO, Thiết kế trưởng"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="md:col-span-7 space-y-4 border-l-2 border-neutral-900 pl-6">
                <h3 className="text-3xl font-serif text-neutral-900 dark:text-neutral-100">Đặng Minh Đức</h3>
                <p className="text-xs tracking-widest text-neutral-500 dark:text-neutral-400 uppercase font-semibold">CEO / Thiết kế trưởng</p>
                <p className="text-base text-neutral-600 dark:text-neutral-300 font-light pt-2 leading-relaxed">Với nhiều năm kinh nghiệm trong lĩnh vực kiến trúc, tôi mang đến những góc nhìn đa chiều, hiện đại và tối giản nhưng vẫn đậm nét tinh tế, sang trọng cho từng ngôi nhà.</p>
              </div>
            </motion.div>

            {/* Founder 2 */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center group"
            >
              <div className="md:col-span-5 md:order-2 relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm shadow-md">
                <Image 
                  src="/asset/team/nguyen-phuong-thao.webp"
                  alt="Nguyễn Phương Thảo - Quản lý thiết kế"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="md:col-span-7 md:order-1 space-y-4 border-l-2 md:border-l-0 md:border-r-2 border-neutral-900 pl-6 md:pl-0 md:pr-6 md:text-right">
                <h3 className="text-3xl font-serif text-neutral-900 dark:text-neutral-100">Nguyễn Phương Thảo</h3>
                <p className="text-xs tracking-widest text-neutral-500 dark:text-neutral-400 uppercase font-semibold">Quản lý thiết kế</p>
                <p className="text-base text-neutral-600 dark:text-neutral-300 font-light pt-2 leading-relaxed">Với niềm đam mê và tình yêu dành cho vẻ đẹp tinh tế, tôi mang đến cho ngôi nhà của mỗi gia chủ sự hài hòa, nhẹ nhàng ngay từ khâu lựa chọn vật liệu, kết hợp ánh sáng và phối màu cho từng không gian, nhằm bảo đảm sự đồng nhất xuyên suốt toàn bộ ngôi nhà.</p>
              </div>
            </motion.div>
          </div>

          {/* Team Note */}
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 pt-12 border-t border-neutral-200 dark:border-neutral-800 text-center space-y-4"
          >
            <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 dark:text-neutral-100">Và hơn 20 cộng sự tài năng khác.</h3>
            <p className="text-base text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
              Phía sau mỗi không gian tĩnh lặng là sự cống hiến không ngừng nghỉ của đội ngũ hơn 20 kiến trúc sư, kỹ thuật và đội ngũ chăm sóc khách hàng mang trong mình ngọn lửa nhiệt huyết. Chúng tôi đồng hành cùng nhau để biến mọi ý tưởng thành hiện thực.
            </p>
            <div className="pt-8 md:pt-10">
              <Image
                src="/asset/team/nou-design-team.webp"
                alt="Đội ngũ kiến trúc sư và cộng sự của NOU.Design"
                width={1920}
                height={1047}
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="h-auto w-full rounded-sm shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMaterial=""
      />
    </div>
  );
}
