const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('c:\\Users\\LENOVO\\Downloads\\Battery_Sebang.pdf');

pdf(dataBuffer).then(function(data) {
    // number of pages
    console.log("Pages:", data.numpages);
    // PDF info
    console.log("Info:", data.info);
    // PDF text
    fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\pdf_output.txt', data.text);
    console.log("Extracted text to pdf_output.txt");
}).catch(function(error) {
    console.error("Error reading PDF:", error);
});
