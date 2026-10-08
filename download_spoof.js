const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

const agent = new https.Agent({
  ciphers: 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384',
});

const url = 'https://sebang-europe.com/img/asset/YXNzZXRzL2ltYWdlcy9hZ203MF90aXRsZV8yLnBuZw/agm70_title_2.png';
const file = fs.createWriteStream('assets/battery_global_rocket.png');

https.get(url, {
  agent: agent,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://sebang-europe.com/',
    'Sec-Fetch-Dest': 'image',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'same-origin',
  }
}, response => {
  response.pipe(file);
  file.on('finish', () => console.log('Done'));
});
