const fs = require('fs');
let text = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\pdf_output.txt', 'utf8');
// remove excessive spaces
text = text.replace(/ {2,}/g, ' ');
// remove excessive newlines
text = text.replace(/\n{2,}/g, '\n');
fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\pdf_clean.txt', text);
console.log('Cleaned text saved to pdf_clean.txt');
