import fs from 'fs';
import path from 'path';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Thay thế các biến thể sai hoặc cũ thành NOU.Design
  content = content.replace(/NOU\.Architects/gi, 'NOU.Design');
  content = content.replace(/Nou\.Architects/g, 'NOU.Design');
  content = content.replace(/NOU\.desgin/gi, 'NOU.Design');
  content = content.replace(/NOU DESIGN/g, 'NOU.Design');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir(path.resolve('src'));
