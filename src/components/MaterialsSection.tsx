import React from 'react';
import { Material } from '../types';

interface MaterialsSectionProps {
  onSelectMaterial: (materialId: string) => void;
}

const materials: Material[] = [
  {
    id: 'nordic-oak',
    name: 'NORDIC OAK',
    vietnameseName: 'Gỗ Sồi Bắc Âu',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80',
    description: 'Dùng cho sàn nhà và hệ tủ đóng đo ni đóng giày (joinery) để tạo nên sự ấm áp, mộc mạc nguyên bản.',
    details: 'Được nhập khẩu từ vùng ôn đới Bắc Âu ôn hòa, có vân gỗ thẳng tinh lọc, xử lý dầu sáp xước mờ đặc trưng không bóng loáng. Mang lại xúc cảm ấm áp chân thật khi chạm gót chân trần.',
    highlights: ['Kháng ẩm tốt', 'Xử lý sáp thực vật tự nhiên', 'Vân mờ mộc mạc', 'Không chứa formaldehyde'],
  },
  {
    id: 'micro-cement',
    name: 'MICRO-CEMENT',
    vietnameseName: 'Bê-tông Đúc Trải',
    image: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&w=600&q=80',
    description: 'Tạo các bề mặt đúc liền mạch, bền bỉ tại khu vực ẩm ướt, sảnh đón và hành lang chuyển tiếp.',
    details: 'Được chế tác thủ công bằng kỹ thuật miết phẳng liên tục nhiều lớp hạt siêu mịn. Loại bỏ hoàn toàn đường ron gạch truyền thống, kiến tạo nên dòng chảy thị giác liền mạch, yên tĩnh như sương khói.',
    highlights: ['Liền mạch tuyệt đối', 'Chống thấm nước 100%', 'Bề mặt lì mịn màng', 'Chịu lực cao'],
  },
  {
    id: 'raw-linen',
    name: 'RAW LINEN',
    vietnameseName: 'Vải Linen Mộc',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    description: 'Làm mềm mại các đường ranh giới kiến trúc thô cứng thông qua hệ rèm rủ và bọc nệm thủ công.',
    details: 'Được dệt thưa hoàn toàn tự nhiên từ sợi lanh sinh học thô mộc. Rèm rủ linen đón gió mát, lọc ánh nắng gắt thành dải sáng dịu vàng, lay động nhẹ dịu làm sống động bầu không khí tối giản.',
    highlights: ['Sợi tự nhiên 100%', 'Thoáng khí dột phá', 'Chống bám bụi tối ưu', 'Tone màu mộc mạc'],
  },
  {
    id: 'oxidized-steel',
    name: 'OXIDIZED STEEL',
    vietnameseName: 'Thép Độc Bản Oxidized',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    description: 'Sử dụng cho hệ khung kính siêu mảnh Slimline và các chi tiết định hình góc cạnh sắc sảo.',
    details: 'Thép được ô-xy hóa bề mặt một cách có kiểm soát tạo nên sắc đen ám khói thẫm không đều màu độc bản. Độ phản chiếu cực thấp, làm tôn vinh những nét vẽ hình học vuông vức của ngôi nhà.',
    highlights: ['Khung viền siêu mảnh', 'Chống rỉ sét vĩnh cửu', 'Ánh kim ám khói độc bản', 'Góc cạnh hoàn hảo'],
  },
];

export default function MaterialsSection({ onSelectMaterial }: MaterialsSectionProps) {
  return (
    <section className="py-24 bg-[#f6f4ee] border-y border-neutral-200/50" id="materials">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Title */}
        <div className="text-center space-y-4">
          <div className="w-12 h-px bg-neutral-400 mx-auto" />
          <h3 className="text-3xl font-serif text-neutral-900 font-normal tracking-wide">
            Vật liệu tuyển chọn
          </h3>
          <p className="text-xs text-neutral-500 font-sans tracking-widest max-w-md mx-auto leading-relaxed">
            Hồi đáp xúc giác từ thiên nhiên, tuyển trọn vật liệu thô bản mộc mạc nhất để định nghĩa chiều sâu của thiết kế kiến trúc.
          </p>
        </div>

        {/* Circular Swatches Row - Centered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto items-start">
          {materials.map((material) => (
            <button
              key={material.id}
              onClick={() => onSelectMaterial(material.id)}
              className="flex flex-col items-center text-center cursor-pointer group focus:outline-none focus:ring-0"
              id={`material-swatch-${material.id}`}
            >
              {/* Swatch Circle Wrapper */}
              <div
                className="relative w-28 h-28 rounded-full overflow-hidden mb-4 border border-neutral-300 transition-all duration-300 transform group-hover:scale-105 group-hover:border-neutral-900 group-hover:ring-4 group-hover:ring-neutral-400/10 shadow-sm"
              >
                <img
                  src={material.image}
                  alt={material.name}
                  className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Circular Mask / Glow */}
                <div className="absolute inset-0 bg-neutral-950/5 group-hover:bg-transparent transition-all" />
              </div>

              {/* Swatch Label */}
              <h4 className="text-xs font-bold font-sans tracking-widest text-neutral-900 group-hover:text-black">
                {material.name}
              </h4>
              <p className="text-[10px] text-neutral-400 font-sans font-medium mt-1">
                {material.vietnameseName}
              </p>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
