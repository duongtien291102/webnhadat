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

function processUrl(oldUrl) {
    // Decode first in case it's url encoded like in layout.tsx
    let decoded = oldUrl;
    try {
        decoded = decodeURI(oldUrl);
    } catch(e){}
    
    const parts = decoded.split('/');
    const newParts = parts.map((part, index) => {
        // don't slugify '/asset/anhweb'
        if (index < 3) return part;
        
        if (index === parts.length - 1) {
            // It's a file
            const ext = path.extname(part);
            const name = path.basename(part, ext);
            return slugify(name) + ext;
        }
        return slugify(part);
    });
    return newParts.join('/');
}

const filesToFix = [
    'src/components/MaterialsSection.tsx',
    'src/components/Introduction.tsx',
    'src/components/HeroSlider.tsx',
    'src/app/layout.tsx'
];

for (const file of filesToFix) {
    const filePath = path.join(__dirname, '..', file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find all strings like "/asset/anhweb/..."
    const regex = /(["'])((\/asset\/anhweb\/)[^"']+)(["'])/g;
    
    content = content.replace(regex, (match, p1, p2, p3, p4) => {
        const newUrl = processUrl(p2);
        // Special case for layout.tsx: replace .jpg with .webp if needed, but wait, 
        // the actual file on disk is .webp now since we deleted .jpg!
        // Let's force .webp for everything in /asset/anhweb/ just to be safe.
        const extReplaced = newUrl.replace(/\.jpe?g$/i, '.webp').replace(/\.png$/i, '.webp');
        console.log(`Replaced: \n  ${p2}\n  ${extReplaced}`);
        return p1 + extReplaced + p4;
    });
    
    fs.writeFileSync(filePath, content);
}

console.log('Done fixing TSX files!');
