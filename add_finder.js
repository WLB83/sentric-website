const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', 'utf8');

const finderHtml = `
            <!-- Battery Finder Widget -->
            <div class="battery-finder glassmorphism fade-in-up" style="margin-top: 3rem; padding: 2rem; text-align: left; max-width: 900px; margin-left: auto; margin-right: auto; border: 1px solid var(--primary);">
                <h3 style="margin-bottom: 1.5rem; font-size: 1.3rem; text-align: center;"><i class="fa-solid fa-magnifying-glass" style="color: var(--primary);"></i> Aracınıza Uygun Aküyü Bulun</h3>
                <div class="finder-controls" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <select id="finder-make" class="finder-select">
                        <option value="">1. Marka Seçin</option>
                        <option value="honda">Honda (Japon)</option>
                        <option value="toyota">Toyota (Japon)</option>
                        <option value="vw">Volkswagen (Avrupa)</option>
                        <option value="mercedes">Mercedes-Benz (Avrupa)</option>
                        <option value="ford">Ford (Amerikan/Avrupa)</option>
                    </select>
                    <select id="finder-model" class="finder-select" disabled>
                        <option value="">2. Model Seçin</option>
                    </select>
                    <select id="finder-year" class="finder-select" disabled>
                        <option value="">3. Üretim Yılı</option>
                    </select>
                    <button id="finder-btn" class="btn-primary" style="padding: 0.8rem; border-radius: 8px; width: 100%;" disabled>Akümü Bul</button>
                </div>
                <div id="finder-result" style="display: none; margin-top: 1.5rem; padding: 1.5rem; background: rgba(0, 210, 255, 0.1); border-radius: 8px; border-left: 4px solid var(--primary);">
                    <h4 style="margin-bottom: 0.5rem; color: #fff;">Önerilen Akü Tipi: <span id="result-type" style="color: var(--primary);">JIS (Asya) Standart SMF</span></h4>
                    <p id="result-desc" style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">Aracınızın fabrika çıkış standartlarına göre Asya tipi dar kasa akü kullanmanız önerilmektedir.</p>
                    <a id="result-link" href="smf.html" class="btn-secondary" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Ürünü İncele</a>
                </div>
            </div>`;

// Insert the finder widget after the hero buttons
html = html.replace(/(<div class="hero-buttons">[\s\S]*?<\/div>)/, `$1\n${finderHtml}`);

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', html);
console.log('Finder widget HTML added.');
