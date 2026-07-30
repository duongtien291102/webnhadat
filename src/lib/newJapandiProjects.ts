import type { Project } from '../types';

type JapandiProjectInput = {
  id: string;
  index: string;
  title: string;
  area: string;
  folder: string;
  cover: string;
  images: string[];
};

const numbered = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => `${from + index}.webp`);

const oddNumbered = (from: number, to: number) =>
  Array.from(
    { length: Math.floor((to - from) / 2) + 1 },
    (_, index) => `${from + index * 2}.webp`,
  );

const description =
  'Không gian Japandi được tổ chức theo tinh thần tối giản, cân bằng giữa công năng hiện đại và cảm giác ấm áp của vật liệu tự nhiên. Bảng màu trung tính, bề mặt gỗ và ánh sáng dịu tạo nên một nhịp sống thư thái, gọn gàng nhưng vẫn giàu chiều sâu.';

function createJapandiProject({
  id,
  index,
  title,
  area,
  folder,
  cover,
  images,
}: JapandiProjectInput): Project {
  const basePath = `/asset/anhweb/japandi/${folder}`;
  const gallery = images.map((image) => `${basePath}/${image.replaceAll('\\', '/')}`);

  return {
    id,
    index,
    title,
    tagline: `Dự án • Diện tích: ${area}`,
    description,
    bullets: [
      'Tối ưu mặt bằng để giữ không gian thoáng, sáng và thuận tiện cho sinh hoạt.',
      'Kết hợp đường nét Nhật Bản với sự ấm áp, tiện nghi của thiết kế Bắc Âu.',
      'Ưu tiên gỗ, vải thô và bảng màu trung tính để tạo tổng thể hài hòa.',
    ],
    highlightsHeader: 'THÔNG TIN DỰ ÁN:',
    highlights: [
      'Loại hình: Nhà ở',
      'Địa điểm: Hà Nội',
      `Diện tích: ${area}`,
      'Thiết kế & thi công: NOU.Design',
    ],
    location: 'Hà Nội',
    area,
    style: 'JAPANDI',
    mainImage: `${basePath}/${cover}`,
    gallery,
  };
}

export const newJapandiProjects: Project[] = [
  createJapandiProject({
    id: '49-chung-cu-oceanpark-1',
    index: '46',
    title: 'CHUNG CƯ OCEANPARK 1',
    area: 'Liên hệ',
    folder: '49. Oceanpark 1',
    cover: 'ANT_7177 copy.webp',
    images: [
      'ANT_7177 copy.webp',
      'ANT_7186 copy.webp',
      'ANT_7189 copy.webp',
      'ANT_7195 copy.webp',
      'ANT_7198 copy.webp',
      'ANT_7201 copy.webp',
      'ANT_7204 copy.webp',
      'ANT_7207 copy.webp',
      'ANT_7210 copy.webp',
      'ANT_7213 copy.webp',
      'ANT_7216 copy.webp',
      'ANT_7223 copy.webp',
      'ANT_7225 copy.webp',
      'ANT_7235 copy.webp',
      'ANT_7236 copy.webp',
      'ANT_7238 copy.webp',
      'ANT_7243 copy.webp',
      'ANT_7246 copy.webp',
      'ANT_7252 copy.webp',
      'ANT_7255 copy.webp',
      'ANT_7261 copy.webp',
      'ANT_7264 copy.webp',
    ],
  }),
  createJapandiProject({
    id: '24-nha-dat-noi-that-8-2x11-4',
    index: '26',
    title: 'NHÀ ĐẤT – NỘI THẤT 8.2×11.4',
    area: '8.2×11.4 m',
    folder: '24. Nhà đất - nội thất 8.2x11.4',
    cover: '1.webp',
    images: numbered(1, 32),
  }),
  createJapandiProject({
    id: '25-nha-dat-ngoc-thuy-6-8x10',
    index: '27',
    title: 'NHÀ ĐẤT NGỌC THỤY 6.8×10',
    area: '6.8×10 m',
    folder: '25. Nhà đất - Ngọc Thụy - Hà Nội - 6.8x10',
    cover: 'KHACH BEP.webp',
    images: [
      'KHACH BEP.webp',
      ...numbered(1, 9).map((name) => `KHACH BEP (${name.replace('.webp', '')}).webp`),
      ...numbered(1, 5).map((name) => `P MASTER (${name.replace('.webp', '')}).webp`),
      ...numbered(1, 4).map((name) => `P NGU CON (${name.replace('.webp', '')}).webp`),
      ...numbered(1, 4).map((name) => `P WC TANG 2 (${name.replace('.webp', '')}).webp`),
      'PWC TANG 1 (1).webp',
      'PWC TANG 1 (2).webp',
      'z5962704899281_4e0cb911c8143c05cd8cdf921033aa48.webp',
      'z5962704918751_2248d836552e21167695047492e64b90.webp',
      'z5962704918954_bb71b88b630e129371ab18fd836092e2.webp',
      'z5962704936551_386e555b117b7555607f39357bf5f6e8.webp',
    ],
  }),
  createJapandiProject({
    id: '29-chung-cu-ct36-xuan-la',
    index: '28',
    title: 'CHUNG CƯ CT36 XUÂN LA',
    area: 'Liên hệ',
    folder: '29. Chung cư CT36 Xuân La',
    cover: 'hn (1).webp',
    images: oddNumbered(1, 45).map((name) => `hn (${name.replace('.webp', '')}).webp`),
  }),
  createJapandiProject({
    id: '35-chung-cu-ho-guom-plaza-140m2',
    index: '29',
    title: 'CHUNG CƯ HỒ GƯƠM PLAZA 140m²',
    area: '140 m²',
    folder: '35. Chung cư Hồ Gươm Plaza 140m2',
    cover: '1.webp',
    images: numbered(1, 29),
  }),
  createJapandiProject({
    id: '36-chung-cu-282-nguyen-huy-tuong',
    index: '30',
    title: 'CHUNG CƯ 282 NGUYỄN HUY TƯỞNG',
    area: 'Liên hệ',
    folder: '36. Chung cư 282 Nguyễn Huy Tưởng',
    cover: '1.webp',
    images: [...oddNumbered(1, 41), ...numbered(42, 51)],
  }),
  createJapandiProject({
    id: '41-nha-dat-long-bien-4x14',
    index: '31',
    title: 'NHÀ ĐẤT LONG BIÊN 4×14',
    area: '4×14 m',
    folder: '41. Nhà đất Long Biên 4x14',
    cover: 'REN NT/1.webp',
    images: [
      ...numbered(1, 33).map((name) => `REN NT/${name}`),
      'MB.webp',
      'mt1.webp',
      'mt2.webp',
      'mt3.webp',
    ],
  }),
  createJapandiProject({
    id: '44-nha-dat-6x22',
    index: '32',
    title: 'NHÀ ĐẤT 6×22',
    area: '6×22 m',
    folder: '44. Nhà đất 6x22',
    cover: '1.webp',
    images: [
      '1.webp',
      '2.webp',
      '3.webp',
      '4.webp',
      '5-2.webp',
      '6-2.webp',
      ...numbered(7, 18),
    ],
  }),
];
