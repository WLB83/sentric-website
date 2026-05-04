import fs from 'fs';
import { PDFParse } from 'pdf-parse';

async function readPDF() {
    try {
        const dataBuffer = fs.readFileSync('c:\\Users\\LENOVO\\Downloads\\Battery_Sebang.pdf');
        const pdf = new PDFParse();
        const data = await pdf.parse(dataBuffer);
        fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\pdf_output.txt', data.text);
        console.log('PDF parsed successfully.');
    } catch (error) {
        console.error(error);
    }
}
readPDF();
