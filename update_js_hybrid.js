const fs = require('fs');

let js = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\script.js', 'utf8');

const newHybridLogic = `
const hardwareProfiles = [
   { id: "ss_yok_benzin", label: "Benzin / LPG (Start-Stop Yok)" },
   { id: "ss_yok_dizel", label: "Dizel (Start-Stop Yok)" },
   { id: "ss_var_temel", label: "Start-Stop VAR (Standart)" },
   { id: "ss_var_gelismis", label: "Start-Stop VAR (Dizel/Gelişmiş)" },
   { id: "mhev", label: "Yarı Hibrit (MHEV) / Hibrit" }
];

function handleSelectionChange(step) {
    const make = currentSelections.make;
    const model = currentSelections.model;
    const year = currentSelections.year;
    
    const wrapperModel = document.getElementById('wrapper-model');
    const inputModel = wrapperModel.querySelector('input');
    const ulModel = wrapperModel.querySelector('ul');
    
    const wrapperYear = document.getElementById('wrapper-year');
    const inputYear = wrapperYear.querySelector('input');
    const ulYear = wrapperYear.querySelector('ul');
    
    const wrapperEngine = document.getElementById('wrapper-engine');
    const inputEngine = wrapperEngine.querySelector('input');
    const ulEngine = wrapperEngine.querySelector('ul');
    
    const btn = document.getElementById('finder-btn');
    const res = document.getElementById('finder-result');
    
    res.style.display = 'none';

    if (step === 'make') {
        currentSelections.model = null;
        currentSelections.year = null;
        currentSelections.engine = null;
        
        inputModel.value = ''; inputModel.placeholder = 'Model Seçin...';
        inputYear.value = ''; inputYear.placeholder = 'Önce Model Seçin';
        inputEngine.value = ''; inputEngine.placeholder = 'Önce Yıl Seçin';
        
        wrapperModel.classList.remove('disabled');
        inputModel.disabled = false;
        
        wrapperYear.classList.add('disabled'); inputYear.disabled = true;
        wrapperEngine.classList.add('disabled'); inputEngine.disabled = true;
        btn.disabled = true;
        
        // Populate models
        ulModel.innerHTML = '';
        Object.keys(db[make].models).sort().forEach(m => {
            ulModel.innerHTML += \`<li data-value="\${m}">\${m}</li>\`;
        });
    }
    
    if (step === 'model') {
        currentSelections.year = null;
        currentSelections.engine = null;
        
        inputYear.value = ''; inputYear.placeholder = 'Üretim Yılı Seçin...';
        inputEngine.value = ''; inputEngine.placeholder = 'Önce Yıl Seçin';
        
        wrapperYear.classList.remove('disabled');
        inputYear.disabled = false;
        
        wrapperEngine.classList.add('disabled'); inputEngine.disabled = true;
        btn.disabled = true;
        
        // Populate years
        ulYear.innerHTML = '';
        db[make].models[model].years.forEach(y => {
            ulYear.innerHTML += \`<li data-value="\${y}">\${y}</li>\`;
        });
    }
    
    if (step === 'year') {
        currentSelections.engine = null;
        
        inputEngine.value = ''; inputEngine.placeholder = 'Donanım Seçin...';
        
        wrapperEngine.classList.remove('disabled');
        inputEngine.disabled = false;
        btn.disabled = true;
        
        // Populate hardware profiles
        ulEngine.innerHTML = '';
        hardwareProfiles.forEach(hp => {
            ulEngine.innerHTML += \`<li data-value="\${hp.id}">\${hp.label}</li>\`;
        });
    }
    
    if (step === 'engine') {
        btn.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCarData(); // Async load from JSON
    
    const btn = document.getElementById('finder-btn');
    if(btn) {
        btn.addEventListener('click', () => {
            const {make, model, year, engine} = currentSelections;
            const isAsian = db[make].isAsian;
            
            let resultType = "";
            let resultDesc = "";
            let resultLink = "";
            
            if (engine === "ss_yok_benzin") {
                if (isAsian) {
                    resultType = "JIS (Asya) Standart SMF";
                    resultDesc = "Aracınız Asya üretimi olduğu için dar kasa (JIS standardı) tam bakımsız SMF akü gerektirir.";
                    resultLink = "smf.html?filter=jis";
                } else {
                    resultType = "Avrupa (DIN) Standart SMF";
                    resultDesc = "Standart donanımlı aracınız için Avrupa (L2/L3) kasa tam bakımsız SMF akü yeterlidir.";
                    resultLink = "smf.html?filter=din";
                }
            } else if (engine === "ss_yok_dizel") {
                if (isAsian) {
                    resultType = "JIS (Asya) Yüksek Kapasite SMF";
                    resultDesc = "Dizel motor yüksek marş gücü ister. Asya kasa yüksek amperli (D26/D31) SMF akü uygundur.";
                    resultLink = "smf.html?filter=jis";
                } else {
                    resultType = "Avrupa (DIN) Yüksek Kapasite SMF";
                    resultDesc = "Dizel motorun ilk çalışma gücünü karşılamak için büyük (L3/L4) kasa SMF akü gereklidir.";
                    resultLink = "smf.html?filter=din";
                }
            } else if (engine === "ss_var_temel") {
                if (isAsian) {
                    resultType = "JIS (Asya) EFB Akü";
                    resultDesc = "Asya kasa Start-Stoplu araçlar için güçlendirilmiş JIS EFB akü kullanılmalıdır.";
                    resultLink = "efb.html";
                } else {
                    resultType = "Avrupa (DIN) EFB Akü";
                    resultDesc = "Standart Start-Stop donanımı için yüksek çevrim ömürlü Avrupa kasa EFB akü idealdir.";
                    resultLink = "efb.html";
                }
            } else if (engine === "ss_var_gelismis" || engine === "mhev") {
                if (isAsian) {
                    resultType = "AGM veya Gelişmiş EFB (Asya)";
                    resultDesc = "Yoğun elektronik donanım veya yarı hibrit sistem için AGM (Absorbed Glass Mat) teknolojisi şarttır.";
                    resultLink = "agm.html";
                } else {
                    resultType = "AGM (Start-Stop) Akü";
                    resultDesc = "Dizel Start-Stop veya MHEV (Hibrit) sistemlerin yüksek akım ihtiyacı için kesinlikle AGM akü gereklidir.";
                    resultLink = "agm.html";
                }
            }
            
            document.getElementById('result-type').textContent = resultType;
            document.getElementById('result-desc').textContent = resultDesc;
            document.getElementById('result-link').href = resultLink;
            
            const res = document.getElementById('finder-result');
            res.style.display = 'block';
            res.classList.add('fade-in');
        });
    }
});
`;

// Replace from `function handleSelectionChange(step)` down to the end
js = js.replace(/function handleSelectionChange[\s\S]*/, newHybridLogic);

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\script.js', js);
console.log('script.js updated with hybrid logic.');
