const https = require('https');
const fs = require('fs');

const url = 'https://sebang-europe.com/img/asset/YXNzZXRzL2ltYWdlcy90aW1lbGluZV9ncm91cC5wbmc/timeline_group.png';
const file = fs.createWriteStream('assets/hero_batteries.png');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, response => {
  response.pipe(file);
  file.on('finish', () => file.close());
});
