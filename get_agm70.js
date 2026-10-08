const https = require('https');
const fs = require('fs');
const url = 'https://sebang-europe.com/assets/images/agm70_title_2.png';
const file = fs.createWriteStream('assets/battery_agm70_title.png');
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, response => {
  response.pipe(file);
});
