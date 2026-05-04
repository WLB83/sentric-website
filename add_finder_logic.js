const fs = require('fs');

let css = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', 'utf8');

const finderCss = `
/* Battery Finder Selects */
.finder-select {
    padding: 0.8rem 1rem;
    border-radius: 8px;
    border: 1px solid var(--glass-border);
    background: rgba(0,0,0,0.4);
    color: #fff;
    font-family: var(--font-body);
    font-size: 0.95rem;
    outline: none;
    transition: var(--transition);
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
}
.finder-select:focus {
    border-color: var(--primary);
    box-shadow: 0 0 10px rgba(0, 210, 255, 0.2);
}
.finder-select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.finder-select option {
    background: var(--bg-darker);
    color: #fff;
}
`;

css += '\n' + finderCss;
fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', css);

let js = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\script.js', 'utf8');
const finderJs = `
// Battery Finder Logic
const makeSelect = document.getElementById('finder-make');
const modelSelect = document.getElementById('finder-model');
const yearSelect = document.getElementById('finder-year');
const findBtn = document.getElementById('finder-btn');
const resultDiv = document.getElementById('finder-result');
const resultType = document.getElementById('result-type');
const resultDesc = document.getElementById('result-desc');
const resultLink = document.getElementById('result-link');

const cars = {
    honda: {
        models: ['Civic', 'Accord', 'CR-V'],
        type: 'JIS (Asya) Standart',
        desc: 'Japon menşeli aracınız için JIS standartlarında (Dar Kasa) üretilmiş, yüksek marş basma gücüne sahip Asya tipi akü kullanmanız önerilmektedir.',
        link: 'smf.html?filter=jis'
    },
    toyota: {
        models: ['Corolla', 'Yaris', 'Hilux'],
        type: 'JIS (Asya) Standart / EFB',
        desc: 'Aracınızın donanımına göre Standart JIS kasa veya yeni nesil Start-Stop sistemleri için EFB (Asya Kasa) serisi uygundur.',
        link: 'efb.html'
    },
    vw: {
        models: ['Golf', 'Passat', 'Polo'],
        type: 'DIN (Avrupa) Standart / AGM',
        desc: 'Avrupa standartlarına uygun DIN tipi (Alçak/Geniş Kasa) aküler. Start-Stop özelliğiniz varsa AGM serisini inceleyin.',
        link: 'agm.html'
    },
    mercedes: {
        models: ['C-Class', 'E-Class', 'GLC'],
        type: 'AGM (Premium Start-Stop)',
        desc: 'Üst segment Avrupa aracınızın yüksek enerji gereksinimi ve akıllı şarj yönetimi için kesinlikle AGM tipi akü kullanılmalıdır.',
        link: 'agm.html'
    },
    ford: {
        models: ['Focus', 'Fiesta', 'Ranger'],
        type: 'DIN (Avrupa) / BCI (Amerikan)',
        desc: 'Ford araçlar genel olarak DIN (Avrupa) standardı aküler kullanır. Bazı ithal kasalarda BCI normu da görülebilir.',
        link: 'smf.html?filter=din'
    }
};

if (makeSelect) {
    makeSelect.addEventListener('change', function() {
        const make = this.value;
        modelSelect.innerHTML = '<option value="">2. Model Seçin</option>';
        yearSelect.innerHTML = '<option value="">3. Üretim Yılı</option>';
        yearSelect.disabled = true;
        findBtn.disabled = true;
        resultDiv.style.display = 'none';

        if (make && cars[make]) {
            cars[make].models.forEach(model => {
                const opt = document.createElement('option');
                opt.value = model.toLowerCase();
                opt.textContent = model;
                modelSelect.appendChild(opt);
            });
            modelSelect.disabled = false;
        } else {
            modelSelect.disabled = true;
        }
    });

    modelSelect.addEventListener('change', function() {
        if (this.value) {
            yearSelect.disabled = false;
            // Populate years 2010-2025
            yearSelect.innerHTML = '<option value="">3. Üretim Yılı</option>';
            for(let y = 2025; y >= 2010; y--) {
                const opt = document.createElement('option');
                opt.value = y;
                opt.textContent = y;
                yearSelect.appendChild(opt);
            }
        } else {
            yearSelect.disabled = true;
            findBtn.disabled = true;
        }
    });

    yearSelect.addEventListener('change', function() {
        findBtn.disabled = !this.value;
    });

    findBtn.addEventListener('click', function() {
        const make = makeSelect.value;
        if (make && cars[make]) {
            resultType.textContent = cars[make].type;
            resultDesc.textContent = cars[make].desc;
            resultLink.href = cars[make].link;
            
            resultDiv.style.display = 'block';
            resultDiv.classList.add('fade-in');
        }
    });
}
`;

js += '\n' + finderJs;
fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\script.js', js);
console.log('Finder widget CSS and JS added.');
