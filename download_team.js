const https = require('https');
const fs = require('fs');

const url = 'https://sebang-europe.com/img/asset/YXNzZXRzL2ltYWdlcy90ZWFtLmpwZw/team.jpg';
const file = fs.createWriteStream('assets/team.jpg');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, response => {
  response.pipe(file);
});
