import fs from 'fs';
import path from 'path';

const rootDir = path.resolve(import.meta.dirname, '..');
const projectFolders = [
  ['hien-dai', '38. Nhà đất - Bắc Giang'],
  ['hien-dai', '39. Chung cư Masteri 35m2'],
  ['hien-dai', '40. Chung cư Golden river 160m2'],
  ['hien-dai', '42. Chung cư The Sky 54.7m2'],
  ['hien-dai', '45. Nhà đất thanh hóa 5x17 x 4 tầng'],
  ['hien-dai', '47. Nhà đất thanh hóa 5x15 x4'],
  ['wabi-sabi', '28. Chung cư Masterise - Vinsmart 65m2'],
  ['wabi-sabi', '31. Nhà đất - Hải Phòng 13x14'],
  ['wabi-sabi', '32. Nhà đất - Thành Công HN - Homestay kết hợp ở 7.2x9.5'],
  ['wabi-sabi', '33. Nhà đất Vinh'],
  ['wabi-sabi', '37. Chung cư HH2C Linh Đàm - 75m2'],
  ['wabi-sabi', '46. Chung cư The 90 - Láng'],
];

function walk(directory, baseDirectory = directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(fullPath, baseDirectory);
    if (path.extname(entry.name).toLowerCase() !== '.webp') return [];
    return [path.relative(baseDirectory, fullPath).split(path.sep).join('/')];
  });
}

const collator = new Intl.Collator('vi', { numeric: true, sensitivity: 'base' });
const manifest = Object.fromEntries(projectFolders.map(([style, folder]) => {
  const directory = path.join(rootDir, 'public', 'asset', 'anhweb', style, folder);
  return [`${style}/${folder}`, walk(directory).sort(collator.compare)];
}));

const outputPath = path.join(rootDir, 'src', 'lib', 'generated', 'newProjectImages.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${outputPath} with ${Object.values(manifest).flat().length} WebP images.`);
