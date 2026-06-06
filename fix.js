const fs = require('fs');
const path = require('path');

const srcDir = 'd:/nhatminh/nou-architects_extracted/src';
const destDir = 'd:/nhatminh/webnhadat/src';

// 1. Copy components
const compSrc = path.join(srcDir, 'components');
const compDest = path.join(destDir, 'components');

const files = fs.readdirSync(compSrc);
for (const file of files) {
  if (file.endsWith('.tsx')) {
    const content = fs.readFileSync(path.join(compSrc, file), 'utf-8');
    fs.writeFileSync(path.join(compDest, file), '"use client";\n' + content, 'utf-8');
  }
}

// 2. Fix page.tsx (copy from App.tsx)
const appContent = fs.readFileSync(path.join(srcDir, 'App.tsx'), 'utf-8');
let newAppContent = appContent.replace(/from '\.\/components\//g, "from '../components/");
fs.writeFileSync(path.join(destDir, 'app/page.tsx'), '"use client";\n' + newAppContent, 'utf-8');

// 3. Fix types.ts
const typesContent = fs.readFileSync(path.join(srcDir, 'types.ts'), 'utf-8');
fs.writeFileSync(path.join(destDir, 'types.ts'), typesContent, 'utf-8');

console.log('Fixed encoding successfully!');
