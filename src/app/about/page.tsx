"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactModal from '../../components/ContactModal';

export default function AboutPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfbf9]">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      <main className="flex-1 pt-24 md:pt-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Top Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-16 border-b border-transparent pb-16">
          <div className="lg:pr-12">
            <h1 className="text-5xl lg:text-6xl font-serif text-neutral-900 font-normal leading-tight tracking-tight">
              Thiết kế không gian<br />với sự tĩnh lặng.
            </h1>
          </div>
          <div className="lg:pt-4">
            <p className="text-base text-neutral-600 font-light leading-relaxed max-w-lg">
              <strong className="font-normal text-neutral-900">NOU DESIGN STUDIO</strong> là một studio thiết kế kiến trúc và nội thất, theo đuổi triết lý tối giản Japandi. Chúng tôi tin rằng không gian sống nên là một tác phẩm nghệ thuật mang lại sự bình yên.
            </p>
          </div>
        </div>

        {/* Story and Warm Minimalism Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mt-12 lg:mt-24">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-12">
              {/* Story */}
              <div className="space-y-6 border-b border-neutral-800 pb-12">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">Câu chuyện của chúng tôi</span>
                <h3 className="text-2xl lg:text-3xl font-serif text-neutral-900 font-semibold">Khởi nguồn từ sự trân trọng những điều giản đơn.</h3>
                <div className="text-base text-neutral-500 font-light leading-relaxed space-y-4">
                  <p>Thành lập vào năm 2018, NOU bắt đầu từ một nhóm nhỏ các kiến trúc sư cùng chung một niềm đam mê với vật liệu tự nhiên và ánh sáng tự nhiên. Chúng tôi không chạy theo xu hướng, mà tập trung vào việc tạo ra những không gian vượt thời gian.</p>
                  <p>Mỗi dự án tại NOU đều là một quá trình gạn lọc tinh tế, loại bỏ những chi tiết thừa thãi để giữ lại cốt lõi của không gian: sự cân bằng, công năng và xúc cảm.</p>
                </div>
              </div>
              
              {/* Warm minimalism */}
              <div className="space-y-4 border-b border-neutral-800 pb-12">
                <h3 className="text-2xl lg:text-3xl font-serif text-neutral-900 font-semibold italic">Tối giản ấm áp</h3>
                <p className="text-base text-neutral-500 font-light leading-relaxed">Những không gian được tạo nên bằng những lựa chọn cẩn thận. Từng vật liệu, từng tia sáng đều có ý nghĩa. Kiến trúc là sự lắng nghe – sự sống của gia đình, đất đai, ánh sáng tự nhiên.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12 pb-4">
              <div className="space-y-1 text-left">
                <div className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">12+</div>
                <div className="text-[10px] md:text-xs text-neutral-400 tracking-widest font-sans uppercase font-semibold">Dự án</div>
              </div>
              <div className="space-y-1 text-left">
                <div className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">5 năm</div>
                <div className="text-[10px] md:text-xs text-neutral-400 tracking-widest font-sans uppercase font-semibold">Kinh nghiệm</div>
              </div>
              <div className="space-y-1 text-left">
                <div className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">1</div>
                <div className="text-[10px] md:text-xs text-neutral-400 tracking-widest font-sans uppercase font-semibold">Thành phố</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 aspect-[4/5] lg:aspect-auto h-full w-full">
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" 
              alt="Studio interior" 
              className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Process Section */}
        <div className="pt-24 lg:pt-32 pb-16">
          <div className="border-t border-b border-neutral-300 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">Quy trình</span>
              <h3 className="text-3xl lg:text-4xl font-serif text-neutral-900 font-normal leading-tight">
                Cách chúng tôi<br />làm việc.
              </h3>
            </div>
            
            <div className="lg:col-span-8 space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-neutral-100 pb-12">
                <span className="text-xs font-mono font-bold text-neutral-400">01</span>
                <div className="space-y-3">
                  <h4 className="text-xl font-serif text-neutral-900 font-semibold">Khám phá & Lắng nghe</h4>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">Mọi dự án bắt đầu bằng việc hiểu rõ phong cách sống, thói quen sinh hoạt và bối cảnh tâm hồn của gia chủ. Chúng tôi dành trọn vẹn thời gian đầu để phân tích sâu, đồng điệu nhịp đập và phác thảo những giải pháp định vị đầu tiên.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-neutral-100 pb-12">
                <span className="text-xs font-mono font-bold text-neutral-400">02</span>
                <div className="space-y-3">
                  <h4 className="text-xl font-serif text-neutral-900 font-semibold">Thiết kế ý tưởng</h4>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">Chuyển hóa nhu cầu vô hình thành bố cục không gian ba chiều rõ nét. Giai đoạn này đặt nặng trọng tâm vào nghiên cứu luồng di chuyển, sự hợp lý của mặt bằng và khả năng tối ưu hóa vùng tương tác của ánh sáng.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <span className="text-xs font-mono font-bold text-neutral-400">03</span>
                <div className="space-y-3">
                  <h4 className="text-xl font-serif text-neutral-900 font-semibold">Triển khai chi tiết</h4>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">Hoàn thiện các hệ thống bản vẽ kỹ thuật chuyên sâu bằng độ chính xác tuyệt đối. Chọn lựa kỹ mộc chi tiết thiết bị, loại thảm thô bản, ánh sáng và quản lý cấu kiện thi công thực địa để bảo thạch linh hồn dự án được lưu giữ trọn vẹn.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 flex justify-center">
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-[#0f0f0f] hover:bg-black text-white px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all shadow-xl hover:shadow-2xl cursor-pointer rounded-sm"
            >
              BẮT ĐẦU DỰ ÁN KIẾN TRÚC CỦA BẠN CHỈ VỚI NOU
            </button>
          </div>
        </div>

        {/* Founders Section */}
        <div className="pt-16 pb-32">
          <div className="space-y-4 mb-16">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">Đội ngũ sáng lập</span>
            <h3 className="text-3xl lg:text-4xl font-serif text-neutral-900 font-normal leading-tight">
              Những Người Sáng Tạo
            </h3>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              "Nou" được lấy cảm hứng từ "Nouveau" (mới mẻ, tiên phong). Tại NOU DESIGN, chúng tôi tin rằng mỗi ngôi nhà đều sở hữu một câu chuyện và vẻ đẹp hoàn hảo riêng, chờ đợi được đánh thức bởi những khối óc sáng tạo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Founder 1 */}
            <div className="space-y-6 group">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80" 
                  alt="KTS. Lê Minh Tiến" 
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2 border-l-2 border-neutral-900 pl-4">
                <h4 className="text-2xl font-serif text-neutral-900">Lê Minh Tiến</h4>
                <p className="text-xs tracking-widest text-neutral-500 uppercase font-semibold">Giám đốc / Kiến trúc sư trưởng</p>
                <p className="text-sm text-neutral-600 font-light pt-2 line-clamp-3">Với hơn 10 năm kinh nghiệm trong kiến trúc cảnh quan và không gian, KTS Lê Minh Tiến mang đến góc nhìn hiện đại, tối giản nhưng đậm chất Á Đông trong từng nét phác thảo.</p>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="space-y-6 group md:mt-24">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" 
                  alt="KTS. Trần Mai Linh" 
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2 border-l-2 border-neutral-900 pl-4">
                <h4 className="text-2xl font-serif text-neutral-900">Trần Mai Linh</h4>
                <p className="text-xs tracking-widest text-neutral-500 uppercase font-semibold">Nhà thiết kế Nội thất / Co-founder</p>
                <p className="text-sm text-neutral-600 font-light pt-2 line-clamp-3">Là một người yêu thích cái đẹp tinh tế, KTS Trần Mai Linh thổi hồn vào các công trình qua nghệ thuật xếp đặt vật liệu, ánh sáng và triết lý Wabi-Sabi tự nhiên.</p>
              </div>
            </div>
          </div>
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
