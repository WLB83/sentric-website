const https = require('https');
const fs = require('fs');

const url = 'https://sebang-europe.com/img/asset/YXNzZXRzL2ltYWdlcy90aW1lbGluZV9ncm91cC5wbmc/timeline_group.png';
const file = fs.createWriteStream('assets/battery_group.png');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, response => {
  response.pipe(file);
});
