import React from 'react';
import Image from 'next/image';
import { Material } from '../types';
import Reveal from './Reveal';

interface MaterialsSectionProps {
  onSelectMaterial: (materialId: string) => void;
}

const materials: Material[] = [
  {
    id: 'nordic-oak',
    name: 'NORDIC OAK',
    vietnameseName: 'Gỗ Sồi Bắc Âu',
    image: '/asset/anhweb/japandi/4-chung-cu-parkhome-145m2/4.webp',
    description: 'Dùng cho sàn nhà và hệ tủ đóng đo ni đóng giày (joinery) để tạo nên sự ấm áp, mộc mạc nguyên bản.',
    details: 'Được nhập khẩu từ vùng ôn đới Bắc Âu ôn hòa, có vân gỗ thẳng tinh lọc, xử lý dầu sáp xước mờ đặc trưng không bóng loáng. Mang lại xúc cảm ấm áp chân thật khi chạm gót chân trần.',
    highlights: ['Kháng ẩm tốt', 'Xử lý sáp thực vật tự nhiên', 'Vân mờ mộc mạc', 'Không chứa formaldehyde'],
  },
  {
    id: 'micro-cement',
    name: 'MICRO-CEMENT',
    vietnameseName: 'Bê-tông Đúc Trải',
    image: '/asset/anhweb/wabi-sabi/3-chung-cu-115-m2/14.webp',
    description: 'Tạo các bề mặt đúc liền mạch, bền bỉ tại khu vực ẩm ướt, sảnh đón và hành lang chuyển tiếp.',
    details: 'Được chế tác thủ công bằng kỹ thuật miết phẳng liên tục nhiều lớp hạt siêu mịn. Loại bỏ hoàn toàn đường ron gạch truyền thống, kiến tạo nên dòng chảy thị giác liền mạch, yên tĩnh như sương khói.',
    highlights: ['Liền mạch tuyệt đối', 'Chống thấm nước 100%', 'Bề mặt lì mịn màng', 'Chịu lực cao'],
  },
  {
    id: 'raw-linen',
    name: 'RAW LINEN',
    vietnameseName: 'Vải Linen Mộc',
    image: '/asset/anhweb/japandi/20-chung-cu-kim-van-kim-lu-70m2/2-master-2.webp',
    description: 'Làm mềm mại các đường ranh giới kiến trúc thô cứng thông qua hệ rèm rủ và bọc nệm thủ công.',
    details: 'Được dệt thưa hoàn toàn tự nhiên từ sợi lanh sinh học thô mộc. Rèm rủ linen đón gió mát, lọc ánh nắng gắt thành dải sáng dịu vàng, lay động nhẹ dịu làm sống động bầu không khí tối giản.',
    highlights: ['Sợi tự nhiên 100%', 'Thoáng khí dột phá', 'Chống bám bụi tối ưu', 'Tone màu mộc mạc'],
  },
  {
    id: 'oxidized-steel',
    name: 'OXIDIZED STEEL',
    vietnameseName: 'Thép Độc Bản Oxidized',
    image: '/asset/anhweb/hien-dai/9-chung-cu-oceanpark-118m2/bep-4.webp',
    description: 'Sử dụng cho hệ khung kính siêu mảnh Slimline và các chi tiết định hình góc cạnh sắc sảo.',
    details: 'Thép được ô-xy hóa bề mặt một cách có kiểm soát tạo nên sắc đen ám khói thẫm không đều màu độc bản. Độ phản chiếu cực thấp, làm tôn vinh những nét vẽ hình học vuông vức của ngôi nhà.',
    highlights: ['Khung viền siêu mảnh', 'Chống rỉ sét vĩnh cửu', 'Ánh kim ám khói độc bản', 'Góc cạnh hoàn hảo'],
  },
];

export default function MaterialsSection({ onSelectMaterial }: MaterialsSectionProps) {
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
          {materials.map((material, index) => (
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
