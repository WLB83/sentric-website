const https = require('https');
const fs = require('fs');

const url = 'https://sebang-europe.com/assets/products/global_rocket_gl032u1_f.png';
const file = fs.createWriteStream('assets/battery_global_rocket.png');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, response => {
  response.pipe(file);
});
