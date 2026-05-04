const fs = require('fs');

const files = [
    { file: 'smf.html', series: 'SMF Serisi' },
    { file: 'smf-heavy.html', series: 'Ağır Vasıta SMF Serisi' },
    { file: 'shd.html', series: 'SHD Serisi' },
    { file: 'deep-cycle.html', series: 'Deep Cycle Serisi' },
    { file: 'golf.html', series: 'Golf Arabası Aküleri' },
    { file: 'garden.html', series: 'Bahçe Ekipmanı Aküleri' }
];

files.forEach(({ file, series }) => {
    let content = fs.readFileSync(`c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\${file}`, 'utf8');
    
    // Fix meta description
    content = content.replace(/content="SENTRIC EFB Serisi aküler ile tanışın. Küçük ve orta ölçekli start-stop araçlar için üstün dayanıklılık ve performans."/g, `content="SENTRIC ${series} aküler ile üstün performans ve dayanıklılık."`);
    
    // Fix DOD Test text
    content = content.replace(/DOD \(Depth of Discharge\) %50 Döngü Testi sonuçlarına göre SENTRIC EFB serisi/g, `Dayanıklılık testleri sonuçlarına göre SENTRIC ${series}`);
    
    fs.writeFileSync(`c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\${file}`, content);
});
console.log('Fixed leftovers.');
