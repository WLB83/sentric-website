const https = require('https');
const fs = require('fs');

const url = 'https://sebang-europe.com/img/asset/YXNzZXRzL3Byb2R1Y3RzL2dsb2JhbF9yb2NrZXRfZ2wwMzJ1MV9mLnBuZw/global_rocket_gl032u1_f.png';
const file = fs.createWriteStream('assets/battery_global_rocket.png');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, response => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download Completed');
  });
}).on('error', err => {
  fs.unlink('assets/battery_global_rocket.png', () => {});
  console.error('Error:', err.message);
});
