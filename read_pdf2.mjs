import fs from 'fs';
import PDFParser from 'pdf2json';

const pdfParser = new PDFParser(this, 1); // 1 = returns text

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\pdf_output.txt', pdfParser.getRawTextContent());
    console.log("PDF parsed and saved to pdf_output.txt");
});

pdfParser.loadPDF('c:\\Users\\LENOVO\\Downloads\\Battery_Sebang.pdf');
