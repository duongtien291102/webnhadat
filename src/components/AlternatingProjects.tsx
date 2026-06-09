"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, ArrowLeft, X, Calendar, MapPin, Ruler, Check, Maximize2 } from 'lucide-react';
import { Project } from '../types';

interface AlternatingProjectsProps {
  onOpenConsultation: () => void;
}

const projects: Project[] = [
  {
    id: 'gamuda-36',
    index: '01',
    title: 'MILIMALISM',
    tagline: 'Villa • Diện tích: 270 m²',
    description: 'Một không gian sống đủ kín để riêng tư, nhưng cũng đủ mở để được chạm vào thiên nhiên.',
    mainImage: '/asset/du_an1/anh1_duan1.png',
    bullets: [
      'KHI KIẾN TRÚC LÀ SỰ CÂN BẰNG GIỮA TĨNH VÀ ĐỘNG.',
      'Không cần phô trương, căn Villa này là sự kết hợp giữa khối kiến trúc dứt khoát và những khoảng thở đầy ý đồ.',
      'Điểm nhấn tới từ vách đá xuyên sáng cùng hệ cầu thang điêu khắc tạo nên dòng chảy thị giác xuyên suốt.',
      'Chúng tôi không chỉ xây những bức tường, mà còn kiến tạo những trải nghiệm sống khác biệt để đưa thiên nhiên vào từng nhịp sống.',
    ],
    highlightsHeader: 'THÔNG TIN DỰ ÁN:',
    highlights: [
      'Loại hình: Villa',
      'Địa điểm: Hà Nội',
      'Diện tích: 270m2',
      'Thiết kế & thi công: NOU.Architects',
    ],
    location: 'Hà Nội',
    area: '270 m²',
    gallery: [
      '/asset/du_an1/anh1_duan1.png',
      '/asset/du_an1/anh2_duan1.png',
      '/asset/du_an1/anh3_duan1.png',
      '/asset/du_an1/anh4_duan1.png',
      '/asset/du_an1/anh5_duan1.png',
      '/asset/du_an1/anh6_duan1.png',
      '/asset/du_an1/anh7_duan1.png',
      '/asset/du_an1/anh8_duan1.png',
      '/asset/du_an1/anh9_duan1.png',
      '/asset/du_an1/anh10_duan1.png',
      '/asset/du_an1/anh11_duan1.png',
    ]
  },
  {
    id: 'hillside-villa',
    index: '02',
    title: 'NHẸ NHÀNG NHƯNG ĐỦ KHÁC BIỆT',
    tagline: 'Nhà đất • Diện tích: 66m2/ sàn',
    description: 'Kiến trúc mang hơi thở Địa Trung Hải đương đại, gây ấn tượng bằng những đường cong mềm mại.',
    mainImage: '/asset/du_an2/anh1_duan2.png',
    bullets: [
      'Kiến trúc mang hơi thở Địa Trung Hải đương đại, gây ấn tượng bằng những đường cong mềm mại, hình khối tối giản và tỷ lệ tinh tế.',
      'Màu trắng kem chủ đạo tạo nền cho những mảng bo tròn uyển chuyển, điểm xuyết sắc nâu đất ấm áp, gợi cảm giác gần gũi và an yên.',
      'Kiến trúc không chỉ để nhìn, mà là để cảm nhận và sử dụng mỗi ngày.',
    ],
    highlightsHeader: 'THÔNG TIN DỰ ÁN: Nhà đất',
    highlights: [
      'Địa điểm: TP Lạng Sơn',
      'Diện tích: 66m2/ sàn',
      'Thiết kế & thi công: NOU.Architects',
    ],
    location: 'TP Lạng Sơn',
    area: '66m2/ sàn',
    gallery: [
      '/asset/du_an2/anh1_duan2.png',
      '/asset/du_an2/anh2_duan2.png',
      '/asset/du_an2/anh3_duan2.png',
      '/asset/du_an2/anh4_duan2.png',
      '/asset/du_an2/anh5_duan2.png',
      '/asset/du_an2/anh6_duan2.png',
    ]
  },
  {
    id: 'duplex-horizon',
    index: '03',
    title: 'NGÔI NHÀ 3 TẦNG – CHUẨN MỰC CHO SỐNG ĐẸP & SỐNG XANH',
    tagline: 'Nhà phố • Diện tích: 100 m2',
    description: 'Một thiết kế dung hòa giữa đường cong mềm mại, ánh sáng tự nhiên và mảng xanh len lỏi ở mọi tầng.',
    mainImage: '/asset/du_an3/anh1_duan3.png',
    bullets: [
      'Một thiết kế dung hòa giữa đường cong mềm mại, ánh sáng tự nhiên và mảng xanh len lỏi ở mọi tầng, mang đến không gian sống tinh tế giữa phố thị.',
      'Một thiết kế không chỉ để ở — mà để tận hưởng, để tìm lại sự cân bằng trong nhịp sống bận rộn.',
    ],
    highlightsHeader: 'THÔNG TIN DỰ ÁN: Nhà phố',
    highlights: [
      'Địa điểm: Hà Nội',
      'Diện tích: 100 m2',
      'Thiết kế & thi công: NOUDesign',
    ],
    location: 'Hà Nội',
    area: '100 m2',
    gallery: [
      '/asset/du_an3/anh1_duan3.png',
      '/asset/du_an3/anh2_duan3.png',
      '/asset/du_an3/anh3_duan3.png',
      '/asset/du_an3/anh4_duan3.png',
      '/asset/du_an3/anh5_duan3.png',
      '/asset/du_an3/anh6_duan3.png',
    ]
  },
  {
    id: 'penthouse-zen',
    index: '04',
    title: '"Tháo bỏ" định kiến về nhà ống chật hẹp',
    tagline: 'Nhà ống • Diện tích: 8.7x9.5m',
    description: 'Giống như số đông gia chủ sở hữu nhà ống thường khá e ngại việc thiết kế và sử dụng không gian với thực trạng hẹp dài, vị khách lần này tìm đến Nou với mong muốn tối ưu hóa công trình trên diện tích xây dựng 8.7x9.5m.',
    mainImage: '/asset/du_an4/anh1_duan4.png',
    bullets: [
      'Đứng trước một thử thách thú vị như vậy luôn là niềm khao khát được thử nghiệm, khám phá những khía cạnh mới, những cách tiếp cận sáng tạo của đội ngũ nhà Nou.',
      'Từ việc khai thác cá tính và sở thích của chủ nhân căn hộ, các kiến trúc sư đã giữ lại phần "xương sống" của căn nhà, nhưng "biến tấu" mặt tiền bằng cách đưa không gian tiểu cảnh, khu sân vườn ngập sắc xanh tươi mát.',
      'Thiết kế cửa kính to xử lý triệt để việc thiếu sáng, xóa bỏ định kiến về mô típ nhà ống xưa. Tone màu trung tính, kết hợp với phong cách, vật liệu hiện đại vừa vẹn toàn về mặt thẩm mỹ mà còn tạo cảm giác thoải mái, thư thái cho mỗi thành viên trong gia đình.',
      'Nhắn Nou nếu muốn khẳng định phong cách sống bắt đầu từ chính trong căn nhà của mình, bạn nhé!',
    ],
    highlightsHeader: 'THÔNG TIN DỰ ÁN:',
    highlights: [
      'Loại hình: Nhà ống',
      'Diện tích: 8.7x9.5m',
      'Thiết kế & thi công: Nou.Architects',
    ],
    location: 'Hà Nội',
    area: '8.7x9.5m',
    gallery: [
      '/asset/du_an4/anh1_duan4.png',
      '/asset/du_an4/anh2_duan4.png',
      '/asset/du_an4/anh3_duan4.png',
      '/asset/du_an4/anh4_duan4.png',
      '/asset/du_an4/anh5_duan4.png',
    ]
  }
];

const ProjectImageSlider = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.mainImage];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      onClick={onClick}
      className="relative block group overflow-hidden bg-neutral-900 border border-neutral-200/60 shadow-xl cursor-pointer rounded-sm"
    >
      <img
        src={images[currentIndex]}
        alt={project.title}
        className="w-full h-[360px] md:h-[450px] object-cover filter brightness-95 group-hover:scale-104 group-hover:brightness-90 transition-all duration-700"
        referrerPolicy="no-referrer"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-all opacity-0 group-hover:opacity-100"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-all opacity-0 group-hover:opacity-100"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}



      {/* Expand icon in top right */}
      <div className="absolute top-4 right-4 p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white/80 opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-none">
        <Maximize2 size={16} />
      </div>
    </div>
  );
};

export default function AlternatingProjects({ onOpenConsultation }: AlternatingProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  useEffect(() => {
    if (!selectedProject || !selectedProject.gallery || selectedProject.gallery.length <= 1) return;
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % selectedProject.gallery.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [selectedProject]);

  return (
    <section className="py-24 space-y-24 md:space-y-36 bg-[#fcfbf9]" id="projects">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20 md:space-y-28">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-px bg-neutral-400 mx-auto" />
          <h3 className="text-3xl font-serif text-neutral-900 font-normal tracking-wide">
            Phong cách tiêu biểu
          </h3>
          <p className="text-xs text-neutral-500 font-sans tracking-widest leading-relaxed">
            Nơi hiện thực hóa những xúc cảm mộc mạc Japandi qua từng công trình thực vật mang đậm hơi thở bản ngã.
          </p>
        </div>

        {/* Dynamic Alternating Project Blocks */}
        <div className="space-y-28 md:space-y-40">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center`}
              >
                {/* Text Content Column */}
                <div
                  className={`lg:col-span-6 space-y-6 flex flex-col justify-center order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                >
                  <span className="text-xs font-mono font-medium tracking-[0.25em] text-neutral-400 block uppercase">
                    Phong cách
                  </span>

                  <h3 className="text-4xl font-serif text-neutral-950 font-light tracking-tight leading-none uppercase">
                    {project.title}
                  </h3>

                  {/* Bullets lists */}
                  <ul className="space-y-3 pt-2">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-neutral-600 leading-relaxed font-light flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-neutral-500 mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Highlights spec panel */}
                  <div className="bg-[#f7f5f0] border border-neutral-200/80 p-5 space-y-3 rounded-sm">
                    <h4 className="text-xs font-bold text-neutral-800 tracking-wider">
                      {project.highlightsHeader}
                    </h4>
                    <ul className="space-y-2.5">
                      {project.highlights.map((hlt, hIdx) => (
                        <li key={hIdx} className="text-[11px] text-neutral-600 leading-relaxed flex items-start gap-2">
                          <Check size={12} className="text-neutral-800 shrink-0 mt-0.5" />
                          <span>{hlt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View More Trigger */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setActivePhotoIndex(0);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-900 hover:text-black hover:underline underline-offset-4 transition-all uppercase cursor-pointer"
                      id={`view-more-${project.id}`}
                    >
                      <span>CHI TIẾT DỰ ÁN</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Overlaid Image Visual Column */}
                <div
                  className={`lg:col-span-6 order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                >
                  <ProjectImageSlider
                    project={project}
                    onClick={() => {
                      setSelectedProject(project);
                      setActivePhotoIndex(0);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Pop-up Detail Modal (Rich Slide deck) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#fcfbf9] w-full max-w-5xl h-[90vh] md:h-[80vh] flex flex-col md:flex-row shadow-2xl relative rounded-sm overflow-hidden"
              id="project-detail-dialog"
            >
              {/* Left Segment: Huge Photo Gallery & Navigation selector */}
              <div className="md:w-3/5 bg-neutral-950 flex flex-col justify-between relative order-1">
                {/* Active display photo */}
                <div className="flex-1 w-full relative overflow-hidden group">
                  <img
                    src={selectedProject.gallery[activePhotoIndex]}
                    alt={`Gallery angle of ${selectedProject.title}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                  {/* Left / Right arrows */}
                  {selectedProject.gallery.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePhotoIndex((prev) => (prev === 0 ? selectedProject.gallery.length - 1 : prev - 1));
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePhotoIndex((prev) => (prev + 1) % selectedProject.gallery.length);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 text-white flex items-center justify-center rounded-full z-20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Photo tag index counter */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-[10px] text-white tracking-widest border border-white/15 uppercase font-mono z-20">
                    Góc chụp 0{activePhotoIndex + 1}
                  </div>
                </div>

                {/* Clickable thumbnail selector row  */}
                <div className="h-20 bg-neutral-900 border-t border-neutral-800 p-2.5 flex gap-2.5 overflow-x-auto items-center shrink-0">
                  {selectedProject.gallery.map((thumb, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => setActivePhotoIndex(tIdx)}
                      className={`relative w-20 h-full overflow-hidden border cursor-pointer hover:border-white transition-all shrink-0 rounded-sm ${activePhotoIndex === tIdx ? 'border-white ring-2 ring-white/10 scale-95' : 'border-neutral-700/60'
                        }`}
                    >
                      <img
                        src={thumb}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Segment: High-end Specs Metadata panel */}
              <div className="md:w-2/5 p-6 md:p-10 flex flex-col justify-between overflow-y-auto order-2">
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                    <div>
                      <span className="text-[10px] tracking-widest font-mono font-bold text-neutral-400 block">ARCHITECTURAL LOGS</span>
                      <h4 className="text-xl font-serif text-neutral-900 font-semibold">{selectedProject.title}</h4>
                    </div>
                    {/* Close action */}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2.5 hover:bg-neutral-150 rounded-full transition-all text-neutral-500 hover:text-black cursor-pointer "
                      id="close-project-modal"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-sans border-b border-neutral-100 pb-5">
                    <div className="space-y-0.5">
                      <span className="text-neutral-400 block uppercase tracking-wider text-[9px] font-bold">VỊ TRÍ CHI PHỐI</span>
                      <span className="text-neutral-800 font-semibold flex items-center gap-1.5">
                        <MapPin size={13} className="text-neutral-600" /> {selectedProject.location}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-neutral-400 block uppercase tracking-wider text-[9px] font-bold">DIỆN TÍCH BÀN GIAO</span>
                      <span className="text-neutral-800 font-semibold flex items-center gap-1.5">
                        <Ruler size={13} className="text-neutral-600" /> {selectedProject.area}
                      </span>
                    </div>
                    <div className="space-y-0.5 pt-2">
                      <span className="text-neutral-400 block uppercase tracking-wider text-[9px] font-bold">PHONG CÁCH ĐỊNH VỊ</span>
                      <span className="text-neutral-800 font-semibold">Tối Giản Japandi</span>
                    </div>
                    <div className="space-y-0.5 pt-2">
                      <span className="text-neutral-400 block uppercase tracking-wider text-[9px] font-bold">PHÒNG ĐIỀU CHỈNH</span>
                      <span className="text-neutral-800 font-semibold">Phòng khách, Phòng ngủ, Bếp</span>
                    </div>
                  </div>

                  {/* Description written in pristine prose */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] tracking-widest font-mono font-bold text-neutral-400 uppercase">Thuyết minh thiết kế</h5>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light">
                      Mẫu thiết kế {selectedProject.title} giải quyết triệt để bài toán thông khí và luân chuyển phân bố dòng sáng tự nhiên. Hệ thống vách ngăn gỗ sồi (Japandi) đan chéo giúp bảo vệ không gian sinh tư của phòng thờ, phòng ngủ mà không bóp nghẹt diện tích giao tiếp chung. Các tủ bếp âm tường đúc lì bê-tông miết phẳng đảm bảo tính gọn gàng tối mật.
                    </p>
                  </div>
                </div>

                {/* Consult Call-to-Action for this project scope */}
                <div className="pt-6 border-t border-neutral-100 mt-6 space-y-3">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onOpenConsultation();
                    }}
                    className="w-full bg-[#1a1a1a] hover:bg-neutral-850 text-white font-bold text-xs tracking-widest py-3.5 rounded-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    id="pop-consult-trigger"
                  >
                    <span>LÊN DỰ TOÁN THEO CĂN HỘ NÀY</span>
                    <ChevronRight size={14} />
                  </button>
                  <p className="text-[10px] text-center text-neutral-400 font-sans">
                    * Được tư vấn trực tiếp cùng Kiến trúc sư trưởng của Nou Architects.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
