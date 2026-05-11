const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', 'utf8');

const newHeroHtml = `<header id="home" class="hero">
        <div class="hero-overlay"></div>
        <div class="hero-container">
            <div class="hero-content fade-in">
                <h1>Her Yolculukta <span>Güvenilir Güç</span></h1>
                <p>Sentric, zorlu iklim ve sürüş koşullarında bile aracınızın her zaman en iyi performansı göstermesini sağlar. Gücünüz hiç tükenmesin.</p>
                <div class="hero-buttons">
                    <a href="#products" class="btn-primary">Ürünleri İncele <i class="fa-solid fa-arrow-right"></i></a>
                    <a href="#about" class="btn-secondary">Daha Fazla Bilgi</a>
                </div>

                <!-- Battery Finder Widget -->
                <div class="battery-finder glassmorphism fade-in-up" style="margin-top: 3rem; padding: 2rem; text-align: left; max-width: 100%; border: 1px solid var(--primary);">
                    <h3 style="margin-bottom: 1.5rem; font-size: 1.3rem; text-align: center;"><i class="fa-solid fa-magnifying-glass" style="color: var(--primary);"></i> Aracınıza Uygun Aküyü Bulun</h3>
                    
                    <div class="finder-controls">
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; align-items: end; margin-bottom: 1.5rem;">
                            <!-- Step 1: Make -->
                            <div class="custom-select-wrapper" id="wrapper-make">
                                <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.3rem;">1. Marka</label>
                                <div class="custom-select" data-step="make">
                                    <input type="text" class="select-search" placeholder="Veritabanı Yükleniyor..." readonly disabled>
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
                            
                            <!-- Step 4: Hardware -->
                            <div class="custom-select-wrapper disabled" id="wrapper-engine">
                                <label style="display: block; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.3rem;">4. Araç Donanımı</label>
                                <div class="custom-select" data-step="engine">
                                    <input type="text" class="select-search" placeholder="Önce Yıl Seçin" readonly disabled>
                                    <i class="fa-solid fa-chevron-down select-arrow"></i>
                                    <ul class="select-options"></ul>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <button id="finder-btn" class="btn-primary" style="padding: 0.8rem; border-radius: 8px; width: 100%; height: 45px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; font-weight: 600;" disabled><i class="fa-solid fa-magnifying-glass" style="margin-right: 10px;"></i> Akümü Bul</button>
                        </div>
                    </div>

                    <div id="finder-result" style="display: none; margin-top: 1.5rem; padding: 1.5rem; background: rgba(0, 210, 255, 0.1); border-radius: 8px; border-left: 4px solid var(--primary);">
                        <h4 style="margin-bottom: 0.5rem; color: #fff;">Önerilen Akü Tipi: <span id="result-type" style="color: var(--primary);">JIS (Asya) Standart SMF</span></h4>
                        <p id="result-desc" style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">Aracınızın fabrika çıkış standartlarına göre Asya tipi dar kasa akü kullanmanız önerilmektedir.</p>
                        <a id="result-link" href="smf.html" class="btn-secondary" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">Ürünü İncele</a>
                    </div>
                </div>
            </div>
            
            <div class="hero-visual fade-in-up">
                <div class="hero-glow"></div>
                <img src="assets/hero_batteries.png" alt="Sentric Professional Batteries" class="hero-batteries-img">
            </div>
        </div>

        <div class="hero-stats-bar glassmorphism fade-in-up">`;

// I need to replace from `<header id="home" class="hero">` down to `<div class="hero-stats-bar`
html = html.replace(/<header id="home" class="hero">[\s\S]*?<div class="hero-stats-bar glassmorphism fade-in-up">/, newHeroHtml);
fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', html);

// 2. Update style.css
let css = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', 'utf8');

const newCssRules = `.hero-batteries-img {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 600px;
    border-radius: 20px;
    filter: drop-shadow(0 25px 40px rgba(0, 0, 0, 0.8));
    animation: float 6s ease-in-out infinite;
    mix-blend-mode: normal;
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
}

@media (max-width: 992px) {
    .hero-container {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
    }
    .hero-content {
        margin: 0 auto;
    }
    .battery-finder {
        text-align: left;
    }
    .hero-batteries-img {
        max-width: 100%;
    }
}`;

// Append new CSS rules if not exists
if(!css.includes('.hero-batteries-img')) {
    css += '\\n\\n' + newCssRules;
    fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', css);
}

console.log("Layout updated successfully.");
