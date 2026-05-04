const fs = require('fs');

let js = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\script.js', 'utf8');

const newLogic = `
// ==========================================
// BATTERY FINDER (API SIMULATION & CUSTOM SEARCHABLE DROPDOWNS)
// ==========================================
let db = {};
let currentSelections = { make: null, model: null, year: null, engine: null };

async function fetchCarData() {
    const makeInput = document.querySelector('.custom-select[data-step="make"] input');
    if (!makeInput) return; // not on index page
    
    makeInput.placeholder = "Veritabanı Yükleniyor...";
    
    try {
        const response = await fetch('data/cars_db.json');
        if (!response.ok) throw new Error('Veritabanı okunamadı!');
        
        db = await response.json();
        
        makeInput.placeholder = "Marka Seçin...";
        makeInput.disabled = false; // enable after load
        setupCustomSelects(); // Initialize UI only after data is ready
        
    } catch (error) {
        console.error("API Error:", error);
        makeInput.placeholder = "Veri Yüklenemedi!";
    }
}
`;

// Replace from `// ==========================================` down to `let currentSelections = ...;`
js = js.replace(/\/\/ ==========================================\s*\n\/\/ BATTERY FINDER.*[\s\S]*?let currentSelections = { make: null, model: null, year: null, engine: null };/, newLogic);

// Then change the DOMContentLoaded to call fetchCarData
js = js.replace(/document\.addEventListener\('DOMContentLoaded', \(\) => \{\n    setupCustomSelects\(\);/, `document.addEventListener('DOMContentLoaded', () => {
    fetchCarData(); // Async load from JSON`);

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\script.js', js);
console.log('script.js updated to use fetch() and JSON DB.');
