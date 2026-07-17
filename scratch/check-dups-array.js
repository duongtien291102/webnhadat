const fs = require('fs');
const c = fs.readFileSync('src/lib/projectsData.ts', 'utf8');

let dupCount = 0;
[...c.matchAll(/id:\s*"([^"]+)"[\s\S]*?gallery:\s*\[([\s\S]*?)\]/g)].forEach(m => {
  const projId = m[1];
  const items = m[2].split(',').map(s => s.trim().replace(/'|"/g, '')).filter(s => s);
  
  const set = new Set();
  const duplicates = [];
  items.forEach(item => {
      if (set.has(item)) {
          duplicates.push(item);
      } else {
          set.add(item);
      }
  });

  if (duplicates.length > 0) {
    console.log(`\nDự án ID: ${projId} có ${duplicates.length} ảnh bị trùng trong gallery:`);
    duplicates.forEach(d => console.log(` - ${d}`));
    dupCount += duplicates.length;
  }
});

console.log(`\nTổng số ảnh trùng lặp trong mảng: ${dupCount}`);
