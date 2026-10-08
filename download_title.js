const https = require('https');
const fs = require('fs');

const url = 'https://sebang-europe.com/img/asset/YXNzZXRzL2ltYWdlcy9hZ203MF90aXRsZV8yLnBuZw/agm70_title_2.png';
const file = fs.createWriteStream('assets/battery_global_rocket.png');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, response => {
  response.pipe(file);
});
