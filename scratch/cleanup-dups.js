const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const all = walk('public/asset/anhweb');
let deletedCount = 0;
let deletedBytes = 0;

all.forEach(f => {
  if (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')) {
    const webp = f.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    if (all.includes(webp)) {
      // It's a duplicate, delete the original
      deletedBytes += fs.statSync(f).size;
      fs.unlinkSync(f);
      deletedCount++;
    }
  }
});

console.log(`Deleted ${deletedCount} duplicate JPG/PNG files.`);
console.log(`Freed ${(deletedBytes / 1024 / 1024).toFixed(2)} MB of disk space.`);

// Now clean up projectsData.ts
let c = fs.readFileSync('src/lib/projectsData.ts', 'utf8');

// The original file was deleted, so we just remove any gallery entries that end with .jpg/.png 
// IF there is a corresponding .webp in the same array, OR just remove them and let the gallery only have .webp
// The easiest way is to just rebuild projectsData.ts by running our fix-all.js or just regex replace.
// Actually, since we deleted the physical files, we can just remove lines containing .jpg if they have a .webp next to them,
// but it's easier to just run our existing `scratch/fix-gallery.js` which re-reads the directories!

console.log('Now run `node scratch/fix-all.js` or `node scratch/fix-gallery.js` to regenerate projectsData.ts');
