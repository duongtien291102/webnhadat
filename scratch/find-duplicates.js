const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const allImages = walk('public/asset/anhweb').filter(f => f.match(/\.(webp|jpg|jpeg|png)$/i));

const hashToFiles = {};

console.log(`Scanning ${allImages.length} images...`);

allImages.forEach(file => {
  const content = fs.readFileSync(file);
  const hash = crypto.createHash('md5').update(content).digest('hex');
  
  if (!hashToFiles[hash]) {
    hashToFiles[hash] = [];
  }
  hashToFiles[hash].push(file);
});

let duplicateCount = 0;
let totalWastedBytes = 0;

console.log("\n--- TRÙNG LẶP NỘI BỘ TỪNG DỰ ÁN ---");
for (const hash in hashToFiles) {
  const files = hashToFiles[hash];
  if (files.length > 1) {
    duplicateCount++;
    const size = fs.statSync(files[0]).size;
    totalWastedBytes += size * (files.length - 1);
    console.log(`\nNhóm trùng lặp (Kích thước: ${(size / 1024).toFixed(1)} KB)`);
    files.forEach(f => console.log(`- ${f.replace(/\\/g, '/')}`));
  }
}

console.log(`\nTổng số nhóm trùng lặp: ${duplicateCount}`);
console.log(`Tổng dung lượng lãng phí: ${(totalWastedBytes / 1024 / 1024).toFixed(2)} MB`);
