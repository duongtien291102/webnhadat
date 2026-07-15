import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Lấy tham số thư mục từ dòng lệnh, mặc định là public/asset/anhweb
const targetDir = process.argv[2] || 'public/asset/anhweb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const absoluteTargetDir = path.resolve(rootDir, targetDir);

async function convertToWebp(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Thư mục không tồn tại: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);
  let convertedCount = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      convertedCount += await convertToWebp(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const newPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
        
        // Nếu file webp đã tồn tại thì bỏ qua
        if (fs.existsSync(newPath)) {
          console.log(`⏭️ Bỏ qua (đã có webp): ${file}`);
          continue;
        }

        console.log(`⏳ Đang chuyển đổi: ${file} -> .webp`);
        try {
          await sharp(fullPath)
            .webp({ quality: 80 }) // Nén 80% để giữ chất lượng tốt nhưng giảm dung lượng mạnh
            .toFile(newPath);
          
          console.log(`✅ Thành công: ${path.basename(newPath)}`);
          convertedCount++;
          
          // Mở comment dòng dưới nếu muốn tự động xóa file ảnh gốc sau khi convert thành công
          // fs.unlinkSync(fullPath); 
        } catch (err) {
          console.error(`❌ Lỗi khi convert ${fullPath}:`, err);
        }
      }
    }
  }
  return convertedCount;
}

console.log(`\n======================================`);
console.log(`🚀 BẮT ĐẦU TỐI ƯU HÓA ẢNH WEBP`);
console.log(`📁 Thư mục: ${absoluteTargetDir}`);
console.log(`======================================\n`);

convertToWebp(absoluteTargetDir).then((count) => {
  console.log(`\n🎉 HOÀN THÀNH! Đã chuyển đổi thành công ${count} ảnh.`);
  console.log(`💡 Mẹo: Đừng quên sửa đường dẫn trong code từ .jpg/.png sang .webp nhé!\n`);
});
