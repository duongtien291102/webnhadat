const http = require('http');
const fs = require('fs');
const c = fs.readFileSync('src/lib/projectsData.ts', 'utf8');
const match = c.match(/\"(\/asset\/anhweb\/[^\"]+)\"/);
if(match) {
    const url = 'http://localhost:3000/_next/image?url=' + encodeURIComponent(match[1]) + '&w=384&q=75';
    console.log('Fetching', url);
    http.get(url, res => {
        console.log('Status:', res.statusCode);
        let body='';
        res.on('data', d=>body+=d);
        res.on('end', ()=>console.log('Body:', body.substring(0, 100)));
    });
} else {
    console.log('No match');
}
