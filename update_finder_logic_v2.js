const fs = require('fs');

let js = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\script.js', 'utf8');

const newFinderJs = `
// ==========================================
// BATTERY FINDER (CUSTOM SEARCHABLE DROPDOWNS)
// ==========================================
const db = {
    "Fiat": {
        popular: true,
        models: {
            "Egea": {
                years: ["2015-2026"],
                engines: {
                    "1.3 Multijet": { type: "AGM (Start-Stop)", desc: "Dizel ve Start-Stop donanımı için yüksek kapasiteli Avrupa (DIN) tipi AGM akü zorunludur.", link: "agm.html" },
                    "1.4 Fire": { type: "EFB (Start-Stop) veya SMF", desc: "Start-Stop aktifse EFB, donanım düşükse Standart DIN (Avrupa) SMF akü yeterlidir.", link: "efb.html" },
                    "1.6 Multijet": { type: "AGM (Start-Stop)", desc: "1.6 Dizel motorun yüksek deşarj gereksinimi için AGM kullanılmalıdır.", link: "agm.html" }
                }
            },
            "Fiorino": {
                years: ["2007-2026"],
                engines: {
                    "1.3 Multijet": { type: "SMF Standart (DIN)", desc: "Ticari kullanım için Standart Avrupa tipi (DIN L2/L3) tam bakımsız akü önerilir.", link: "smf.html?filter=din" }
                }
            }
        }
    },
    "Renault": {
        popular: true,
        models: {
            "Clio": {
                years: ["2012-2019 (Clio 4)", "2019-2026 (Clio 5)"],
                engines: {
                    "1.0 TCe": { type: "EFB (Start-Stop)", desc: "Yeni nesil turbo benzinli araçlar için EFB serisi uygundur.", link: "efb.html" },
                    "1.5 dCi": { type: "AGM (Start-Stop) veya EFB", desc: "Dizel motorlarda yoğun kullanım için AGM veya standart kullanım için EFB tercih edilmelidir.", link: "agm.html" }
                }
            },
            "Megane": {
                years: ["2016-2026 (Megane 4)"],
                engines: {
                    "1.3 TCe": { type: "EFB (Start-Stop)", desc: "Standart Start-Stop donanımı için EFB idealdir.", link: "efb.html" },
                    "1.5 Blue dCi": { type: "AGM (Start-Stop)", desc: "Dizel Megane serisi için AGM akü kullanımı gereklidir.", link: "agm.html" }
                }
            }
        }
    },
    "Volkswagen": {
        popular: true,
        models: {
            "Golf": {
                years: ["2012-2020 (Golf 7)", "2020-2026 (Golf 8)"],
                engines: {
                    "1.0 eTSI": { type: "AGM (MHEV Start-Stop)", desc: "Hafif hibrit (Mild-Hybrid) sistemli Golf için kesinlikle AGM akü gereklidir.", link: "agm.html" },
                    "1.5 TSI": { type: "EFB (Start-Stop)", desc: "Avrupa DIN kasalı EFB akü standart olarak yeterlidir.", link: "efb.html" },
                    "1.6 TDI": { type: "AGM (Start-Stop)", desc: "Dizel motorun yüksek güç ihtiyacı için AGM gereklidir.", link: "agm.html" }
                }
            },
            "Passat": {
                years: ["2015-2026 (B8)"],
                engines: {
                    "1.5 TSI": { type: "EFB (Start-Stop)", desc: "EFB serisi araç elektroniğini desteklemek için uygundur.", link: "efb.html" },
                    "1.6 / 2.0 TDI": { type: "AGM (Start-Stop)", desc: "Passat Dizel serilerinde AGM akü (L3/L4 kasa) kullanımı mecburidir.", link: "agm.html" }
                }
            }
        }
    },
    "Ford": {
        popular: true,
        models: {
            "Focus": {
                years: ["2011-2018", "2018-2026"],
                engines: {
                    "1.0 EcoBoost": { type: "EFB (Start-Stop)", desc: "EcoBoost motorlarda EFB (Alçak DIN kasa) yaygın olarak kullanılır.", link: "efb.html" },
                    "1.5 TDCi": { type: "AGM (Start-Stop)", desc: "Dizel versiyonlar AGM veya Yüksek Kapasiteli EFB gerektirir.", link: "agm.html" }
                }
            },
            "Transit / Tourneo Courier": {
                years: ["2014-2026"],
                engines: {
                    "1.5 / 1.6 TDCi": { type: "SMF Standart veya EFB", desc: "Ticari seri Start-Stoplu ise EFB, değilse Standart DIN tipi akü yeterlidir.", link: "smf.html?filter=din" }
                }
            }
        }
    },
    "Toyota": {
        popular: true,
        models: {
            "Corolla": {
                years: ["2013-2019", "2019-2026"],
                engines: {
                    "1.6 Valvematic": { type: "JIS (Asya) Standart SMF", desc: "Japon tipi ince uzun (JIS) standart akü (Örn: NS40/NS60) kullanılır.", link: "smf.html?filter=jis" },
                    "1.8 Hybrid": { type: "JIS (Asya) Özel Hibrit", desc: "Hibrit sistemin 12V yardımcı aküsü (JIS) bagajda veya motor içi özel yerleşimdedir.", link: "smf.html?filter=jis" }
                }
            }
        }
    },
    "Hyundai": {
        popular: true,
        models: {
            "Tucson": {
                years: ["2015-2021", "2021-2026"],
                engines: {
                    "1.6 T-GDI": { type: "AGM (Start-Stop)", desc: "Yeni nesil Tucson'larda Avrupa kasalı AGM akü kullanılmaktadır.", link: "agm.html" },
                    "1.6 CRDi": { type: "AGM (Start-Stop)", desc: "Dizel motorlar için AGM akü yüksek performans sağlar.", link: "agm.html" }
                }
            },
            "i20": {
                years: ["2014-2020", "2020-2026"],
                engines: {
                    "1.2 / 1.4 MPI": { type: "JIS (Asya) Standart SMF", desc: "Asya tipi dar kasa standart akü gerektirir.", link: "smf.html?filter=jis" }
                }
            }
        }
    },
    "Peugeot": {
        popular: true,
        models: {
            "3008": {
                years: ["2016-2026"],
                engines: {
                    "1.2 PureTech": { type: "EFB (Start-Stop)", desc: "Standart Start-Stop donanımı için Avrupa EFB akü idealdir.", link: "efb.html" },
                    "1.5 / 1.6 BlueHDi": { type: "AGM (Start-Stop)", desc: "Peugeot dizellerinde kesinlikle AGM akü kullanılmalıdır.", link: "agm.html" }
                }
            }
        }
    },
    "Chery": {
        popular: true, // Büyüyen Asya Pazarı
        models: {
            "Tiggo 8 Pro": {
                years: ["2022-2026"],
                engines: {
                    "1.6 TGDI": { type: "AGM veya EFB (Asya Tipi)", desc: "Çin pazarından gelen araçların elektroniğini desteklemek için Start-Stop akü (Asya/Avrupa karma kasalar görülebilir).", link: "efb.html" }
                }
            },
            "Omoda 5": {
                years: ["2023-2026"],
                engines: {
                    "1.6 TGDI": { type: "EFB (Start-Stop)", desc: "Yeni nesil sistemler için EFB yeterli olmaktadır.", link: "efb.html" }
                }
            }
        }
    },
    "Honda": {
        popular: false,
        models: {
            "Civic": {
                years: ["2012-2016 (FB7)", "2016-2021 (FC5)", "2021-2026 (FE)"],
                engines: {
                    "1.6 i-VTEC (LPG/Benzin)": { type: "JIS (Asya) Standart SMF", desc: "Klasik JIS (Dar Kasa) Asya tipi akü. (Örn: NS40ZL veya 45Ah JIS).", link: "smf.html?filter=jis" },
                    "1.5 VTEC Turbo": { type: "EFB (Start-Stop) JIS", desc: "Turbo modellerde kapasitesi artırılmış Asya tipi EFB gereklidir.", link: "efb.html" }
                }
            }
        }
    }
};

let currentSelections = { make: null, model: null, year: null, engine: null };

function setupCustomSelects() {
    const selects = document.querySelectorAll('.custom-select');
    if(selects.length === 0) return;

    // Build the "Make" list
    const makeSelect = document.querySelector('.custom-select[data-step="make"]');
    if(makeSelect) {
        const ul = makeSelect.querySelector('ul');
        ul.innerHTML = '';
        
        let popHtml = '<li class="category-header">Popüler Markalar</li>';
        let otherHtml = '<li class="category-header">Diğer Markalar</li>';
        
        Object.keys(db).sort().forEach(make => {
            const li = \`<li data-value="\${make}">\${make}</li>\`;
            if(db[make].popular) popHtml += li;
            else otherHtml += li;
        });
        
        ul.innerHTML = popHtml + otherHtml;
    }

    // Attach events
    selects.forEach(select => {
        const input = select.querySelector('input.select-search');
        const ul = select.querySelector('ul');
        const step = select.dataset.step;

        // Open/close logic
        input.addEventListener('click', (e) => {
            if(input.disabled) return;
            e.stopPropagation();
            
            // Close others
            selects.forEach(s => { if(s !== select) s.classList.remove('open'); });
            
            select.classList.toggle('open');
            if(select.classList.contains('open')) {
                input.readOnly = false;
                input.value = ''; // clear to search
                input.focus();
                filterList(ul, ''); // show all
            } else {
                input.readOnly = true;
                input.value = currentSelections[step] || '';
            }
        });

        // Type to search
        input.addEventListener('input', (e) => {
            filterList(ul, e.target.value);
        });

        // Click on item
        ul.addEventListener('click', (e) => {
            e.stopPropagation();
            if(e.target.tagName === 'LI' && !e.target.classList.contains('category-header')) {
                const val = e.target.dataset.value;
                input.value = val;
                input.readOnly = true;
                currentSelections[step] = val;
                select.classList.remove('open');
                
                // Highlight selected
                ul.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
                e.target.classList.add('selected');
                
                handleSelectionChange(step);
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', () => {
        selects.forEach(s => {
            s.classList.remove('open');
            const input = s.querySelector('input.select-search');
            const step = s.dataset.step;
            input.readOnly = true;
            if(!input.value || !currentSelections[step] || input.value !== currentSelections[step]) {
                 input.value = currentSelections[step] || ''; // restore text
            }
        });
    });
}

function filterList(ul, query) {
    const items = ul.querySelectorAll('li');
    query = query.toLowerCase();
    let hasVisible = false;
    
    items.forEach(li => {
        if(li.classList.contains('category-header')) {
            // headers are handled later if needed, just show them for now
            li.style.display = 'block';
        } else {
            const text = li.textContent.toLowerCase();
            if(text.includes(query)) {
                li.style.display = 'block';
                hasVisible = true;
            } else {
                li.style.display = 'none';
            }
        }
    });
}

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
        
        inputEngine.value = ''; inputEngine.placeholder = 'Motor Tipi Seçin...';
        
        wrapperEngine.classList.remove('disabled');
        inputEngine.disabled = false;
        btn.disabled = true;
        
        // Populate engines
        ulEngine.innerHTML = '';
        Object.keys(db[make].models[model].engines).sort().forEach(eng => {
            ulEngine.innerHTML += \`<li data-value="\${eng}">\${eng}</li>\`;
        });
    }
    
    if (step === 'engine') {
        btn.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupCustomSelects();
    
    const btn = document.getElementById('finder-btn');
    if(btn) {
        btn.addEventListener('click', () => {
            const {make, model, year, engine} = currentSelections;
            const data = db[make].models[model].engines[engine];
            
            document.getElementById('result-type').textContent = data.type;
            document.getElementById('result-desc').textContent = data.desc;
            document.getElementById('result-link').href = data.link;
            
            const res = document.getElementById('finder-result');
            res.style.display = 'block';
            res.classList.add('fade-in');
        });
    }
});
`;

// Remove the old finder logic from script.js and append the new one.
js = js.replace(/\/\/ Battery Finder Logic[\s\S]*/, '');
js += newFinderJs;

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\script.js', js);
console.log('Script updated.');
