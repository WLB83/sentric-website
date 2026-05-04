const fs = require('fs');

let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', 'utf8');

const newFinderHTML = `
                <div class="finder-controls" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; align-items: end;">
                    <!-- Step 1: Make -->
                    <div class="custom-select-wrapper" id="wrapper-make">
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.3rem;">1. Marka</label>
                        <div class="custom-select" data-step="make">
                            <input type="text" class="select-search" placeholder="Marka Seçin..." readonly>
                            <i class="fa-solid fa-chevron-down select-arrow"></i>
                            <ul class="select-options"></ul>
                        </div>
                    </div>
                    
                    <!-- Step 2: Model -->
                    <div class="custom-select-wrapper disabled" id="wrapper-model">
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.3rem;">2. Model</label>
                        <div class="custom-select" data-step="model">
                            <input type="text" class="select-search" placeholder="Önce Marka Seçin" readonly disabled>
                            <i class="fa-solid fa-chevron-down select-arrow"></i>
                            <ul class="select-options"></ul>
                        </div>
                    </div>
                    
                    <!-- Step 3: Year -->
                    <div class="custom-select-wrapper disabled" id="wrapper-year">
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.3rem;">3. Üretim Yılı</label>
                        <div class="custom-select" data-step="year">
                            <input type="text" class="select-search" placeholder="Önce Model Seçin" readonly disabled>
                            <i class="fa-solid fa-chevron-down select-arrow"></i>
                            <ul class="select-options"></ul>
                        </div>
                    </div>
                    
                    <!-- Step 4: Engine -->
                    <div class="custom-select-wrapper disabled" id="wrapper-engine">
                        <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.3rem;">4. Motor / Yakıt</label>
                        <div class="custom-select" data-step="engine">
                            <input type="text" class="select-search" placeholder="Önce Yıl Seçin" readonly disabled>
                            <i class="fa-solid fa-chevron-down select-arrow"></i>
                            <ul class="select-options"></ul>
                        </div>
                    </div>

                    <button id="finder-btn" class="btn-primary" style="padding: 0.8rem; border-radius: 8px; width: 100%; height: 45px; display: flex; align-items: center; justify-content: center; font-size: 1rem;" disabled>Akümü Bul</button>
                </div>
`;

// Replace the old finder-controls
html = html.replace(/<div class="finder-controls"[^>]*>[\s\S]*?<\/button>\s*<\/div>/, newFinderHTML);

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', html);
console.log('HTML updated.');
