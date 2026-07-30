import type { Project } from '../types';
import generatedImages from './generated/newProjectImages.json';

type Style = 'HIEN_DAI' | 'WABISABI';

type ProjectMetadata = {
  id: string;
  index: string;
  title: string;
  area: string;
  location: string;
  style: Style;
  assetStyle: 'hien-dai' | 'wabi-sabi';
  folder: string;
  cover?: string;
};

const imageManifest = generatedImages as Record<string, string[]>;

const metadata: ProjectMetadata[] = [
  {
    id: '49-nha-pho-lang-son-4-5x15',
    index: '45',
    title: 'NHÀ PHỐ LẠNG SƠN 4.5×15',
    area: '4.5×15 m',
    location: 'Lạng Sơn',
    style: 'WABISABI',
    assetStyle: 'wabi-sabi',
    folder: '49-nha-pho-lang-son-4-5x15',
    cover: '2a.webp',
  },
  {
    id: '38-nha-dat-bac-giang',
    index: '33',
    title: 'NHÀ ĐẤT BẮC GIANG',
    area: 'Liên hệ',
    location: 'Bắc Giang',
    style: 'HIEN_DAI',
    assetStyle: 'hien-dai',
    folder: '38. Nhà đất - Bắc Giang',
  },
  {
    id: '39-chung-cu-masteri-35m2',
    index: '34',
    title: 'CHUNG CƯ MASTERI 35m²',
    area: '35 m²',
    location: 'Hà Nội',
    style: 'HIEN_DAI',
    assetStyle: 'hien-dai',
    folder: '39. Chung cư Masteri 35m2',
  },
  {
    id: '40-chung-cu-golden-river-160m2',
    index: '35',
    title: 'CHUNG CƯ GOLDEN RIVER 160m²',
    area: '160 m²',
    location: 'TP. Hồ Chí Minh',
    style: 'HIEN_DAI',
    assetStyle: 'hien-dai',
    folder: '40. Chung cư Golden river 160m2',
  },
  {
    id: '42-chung-cu-the-sky-54-7m2',
    index: '36',
    title: 'CHUNG CƯ THE SKY 54.7m²',
    area: '54.7 m²',
    location: 'Hà Nội',
    style: 'HIEN_DAI',
    assetStyle: 'hien-dai',
    folder: '42. Chung cư The Sky 54.7m2',
    cover: 'z6095881948539_fe6ab59bf9af2d6d35bd940f5b5a55b6.webp',
  },
  {
    id: '45-nha-dat-thanh-hoa-5x17-4-tang',
    index: '37',
    title: 'NHÀ ĐẤT THANH HÓA 5×17 – 4 TẦNG',
    area: '5×17 m',
    location: 'Thanh Hóa',
    style: 'HIEN_DAI',
    assetStyle: 'hien-dai',
    folder: '45. Nhà đất thanh hóa 5x17 x 4 tầng',
    cover: 'T1 (5)a.webp',
  },
  {
    id: '47-nha-dat-thanh-hoa-5x15-4-tang',
    index: '38',
    title: 'NHÀ ĐẤT THANH HÓA 5×15 – 4 TẦNG',
    area: '5×15 m',
    location: 'Thanh Hóa',
    style: 'HIEN_DAI',
    assetStyle: 'hien-dai',
    folder: '47. Nhà đất thanh hóa 5x15 x4',
  },
  {
    id: '28-chung-cu-masterise-vinsmart-65m2',
    index: '39',
    title: 'CHUNG CƯ MASTERISE – VINSMART 65m²',
    area: '65 m²',
    location: 'Hà Nội',
    style: 'WABISABI',
    assetStyle: 'wabi-sabi',
    folder: '28. Chung cư Masterise - Vinsmart 65m2',
  },
  {
    id: '31-nha-dat-hai-phong-13x14',
    index: '40',
    title: 'NHÀ ĐẤT HẢI PHÒNG 13×14',
    area: '13×14 m',
    location: 'Hải Phòng',
    style: 'WABISABI',
    assetStyle: 'wabi-sabi',
    folder: '31. Nhà đất - Hải Phòng 13x14',
    cover: 'kb (5).webp',
  },
  {
    id: '32-homestay-thanh-cong-7-2x9-5',
    index: '41',
    title: 'HOMESTAY THÀNH CÔNG 7.2×9.5',
    area: '7.2×9.5 m',
    location: 'Hà Nội',
    style: 'WABISABI',
    assetStyle: 'wabi-sabi',
    folder: '32. Nhà đất - Thành Công HN - Homestay kết hợp ở 7.2x9.5',
    cover: 'Nhà ở/1.webp',
  },
  {
    id: '33-nha-dat-vinh',
    index: '42',
    title: 'NHÀ ĐẤT VINH',
    area: 'Liên hệ',
    location: 'Vinh',
    style: 'WABISABI',
    assetStyle: 'wabi-sabi',
    folder: '33. Nhà đất Vinh',
    cover: '12.webp',
  },
  {
    id: '37-chung-cu-hh2c-linh-dam-75m2',
    index: '43',
    title: 'CHUNG CƯ HH2C LINH ĐÀM 75m²',
    area: '75 m²',
    location: 'Hà Nội',
    style: 'WABISABI',
    assetStyle: 'wabi-sabi',
    folder: '37. Chung cư HH2C Linh Đàm - 75m2',
  },
  {
    id: '46-chung-cu-the-90-lang',
    index: '44',
    title: 'CHUNG CƯ THE 90 – LÁNG',
    area: 'Liên hệ',
    location: 'Hà Nội',
    style: 'WABISABI',
    assetStyle: 'wabi-sabi',
    folder: '46. Chung cư The 90 - Láng',
    cover: 'z7155419972792_36c526e4b5a94036b73d10f7d3649e3e.webp',
  },
];

function createProject(item: ProjectMetadata): Project {
  const manifestKey = `${item.assetStyle}/${item.folder}`;
  const filenames = imageManifest[manifestKey] ?? [];
  const basePath = `/asset/anhweb/${manifestKey}`;
  const gallery = filenames.map((filename) => `${basePath}/${filename}`);
  const isWabiSabi = item.style === 'WABISABI';
  const cover = item.cover ? `${basePath}/${item.cover}` : gallery[0];

  if (gallery.length === 0 || !cover) {
    throw new Error(`Không tìm thấy ảnh WebP cho dự án: ${item.title}`);
  }

  return {
    id: item.id,
    index: item.index,
    title: item.title,
    tagline: `Dự án • Diện tích: ${item.area}`,
    description: isWabiSabi
      ? 'Không gian được phát triển theo tinh thần Wabi-sabi, tôn trọng vẻ đẹp tự nhiên và những bề mặt giàu dấu vết vật liệu. Ánh sáng dịu, hình khối mềm và bảng màu trầm tạo nên một nơi ở tĩnh lặng, mộc mạc nhưng vẫn đáp ứng trọn vẹn nhu cầu sinh hoạt.'
      : 'Thiết kế hiện đại tập trung vào mặt bằng mạch lạc, đường nét gọn và khả năng sử dụng linh hoạt. Vật liệu, ánh sáng và hệ nội thất được phối hợp đồng bộ để tạo nên không gian tiện nghi, thoáng sáng và có chiều sâu.',
    bullets: isWabiSabi
      ? [
          'Tôn trọng bề mặt vật liệu tự nhiên và vẻ đẹp không hoàn hảo.',
          'Sử dụng ánh sáng dịu, hình khối mềm và bảng màu trầm ấm.',
          'Giữ không gian thông thoáng, tĩnh tại và gần gũi.',
        ]
      : [
          'Tối ưu mặt bằng theo nhu cầu sinh hoạt thực tế.',
          'Kết hợp vật liệu hiện đại với hệ ánh sáng có chủ đích.',
          'Giữ tổng thể gọn gàng, tiện nghi và đồng nhất.',
        ],
    highlightsHeader: 'THÔNG TIN DỰ ÁN:',
    highlights: [
      'Loại hình: Nhà ở',
      `Địa điểm: ${item.location}`,
      `Diện tích: ${item.area}`,
      'Thiết kế & thi công: NOU.Design',
    ],
    location: item.location,
    area: item.area,
    style: item.style,
    mainImage: cover,
    gallery,
  };
}

export const newModernAndWabiProjects = metadata.map(createProject);
export const newModernAndWabiProjectIds = new Set(metadata.map(({ id }) => id));
