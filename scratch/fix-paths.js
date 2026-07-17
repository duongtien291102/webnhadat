const fs = require('fs');
const path = require('path');

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/đ/g, "d")
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

const baseDir = path.join(__dirname, '../public/asset/anhweb');
let pathMap = {};

function processDirectory(dir, currentPathUrl) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        let newItemName = item;
        if (stat.isDirectory()) {
            newItemName = slugify(item);
            const newFullPath = path.join(dir, newItemName);
            if (fullPath !== newFullPath) {
                fs.renameSync(fullPath, newFullPath);
            }
            processDirectory(newFullPath, currentPathUrl + '/' + item);
        } else {
            // It's a file
            const ext = path.extname(item);
            const name = path.basename(item, ext);
            newItemName = slugify(name) + ext;
            const newFullPath = path.join(dir, newItemName);
            if (fullPath !== newFullPath) {
                fs.renameSync(fullPath, newFullPath);
            }
            // Add mapping
            const oldUrl = currentPathUrl + '/' + item;
            const newUrl = currentPathUrl.split('/').map(p => slugify(p)).join('/') + '/' + newItemName;
            pathMap[oldUrl] = newUrl;
        }
    }
}

console.log('Renaming files and directories...');
processDirectory(baseDir, '/asset/anhweb');

console.log('Updating projectsData.ts...');
let projectsData = fs.readFileSync(path.join(__dirname, '../src/lib/projectsData.ts'), 'utf8');

// Sort by length descending to replace longer paths first
const sortedOldUrls = Object.keys(pathMap).sort((a, b) => b.length - a.length);

for (const oldUrl of sortedOldUrls) {
    const newUrl = pathMap[oldUrl];
    // Use string replacement
    projectsData = projectsData.split(oldUrl).join(newUrl);
}

fs.writeFileSync(path.join(__dirname, '../src/lib/projectsData.ts'), projectsData);
console.log('Done! Files renamed and projectsData.ts updated.');
