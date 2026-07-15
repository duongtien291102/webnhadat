import fs from 'fs';
import path from 'path';

function updateExtensions(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Thay thế đuôi file thành .webp, chỉ áp dụng cho file nội bộ (/asset/anhweb/...)
  content = content.replace(/(\/asset\/anhweb\/.*?)\.(jpg|jpeg|png|JPG|JPEG|PNG)/g, '$1.webp');
  fs.writeFileSync(filePath, content);
  console.log(`Đã cập nhật đuôi file trong: ${filePath}`);
}

const projectsDataPath = path.resolve('src/lib/projectsData.ts');
updateExtensions(projectsDataPath);
