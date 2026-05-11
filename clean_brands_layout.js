const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', 'utf8');

const targetSectionRegex = /<section id="brands" class="brands section"[\s\S]*?<\/section>/;

const newBrandsHtml = `<section id="brands" class="brands section" style="padding-bottom: 2rem; background: transparent;">
        <div class="container">
            <h2 class="section-title text-center" style="margin-bottom: 3rem;">Markalarımız</h2>
            
            <div class="global-brands-wrapper">
                <div class="global-brands-scroll">
                    
                    <!-- ROCKET -->
                    <div class="global-brand-card">
                        <div class="gb-typography">ROCKET</div>
                        <div class="gb-product-shot">
                            <img src="assets/premium_battery_base.png" alt="Rocket Battery">
                        </div>
                        <div class="gb-info">
                            <h3>ROCKET</h3>
                            <p>The Ultimate Power</p>
                            <a href="#products" class="gb-link">Seriyi İncele <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <div class="gb-accent" style="background: linear-gradient(90deg, #0a4d2e, #137547);"></div>
                    </div>

                    <!-- GLOBAL -->
                    <div class="global-brand-card">
                        <div class="gb-typography">GLOBAL</div>
                        <div class="gb-product-shot">
                            <img src="assets/premium_battery_base.png" alt="Global Battery">
                        </div>
                        <div class="gb-info">
                            <h3>GLOBAL</h3>
                            <p>High Performance</p>
                            <a href="#products" class="gb-link">Seriyi İncele <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <div class="gb-accent" style="background: linear-gradient(90deg, #003366, #00509e);"></div>
                    </div>

                    <!-- MAXTORM -->
                    <div class="global-brand-card">
                        <div class="gb-typography">MAXTORM</div>
                        <div class="gb-product-shot">
                            <img src="assets/premium_battery_base.png" alt="Maxtorm Battery">
                        </div>
                        <div class="gb-info">
                            <h3>MAXTORM</h3>
                            <p>Extreme Durability</p>
                            <a href="#products" class="gb-link">Seriyi İncele <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <div class="gb-accent" style="background: linear-gradient(90deg, #8b0000, #c41e3a);"></div>
                    </div>

                    <!-- SUPREME -->
                    <div class="global-brand-card">
                        <div class="gb-typography" style="font-size: 3.5rem;">SUPREME</div>
                        <div class="gb-product-shot">
                            <img src="assets/premium_battery_base.png" alt="Supreme Battery">
                        </div>
                        <div class="gb-info">
                            <h3>SUPREME</h3>
                            <p>Premium Quality</p>
                            <a href="#products" class="gb-link">Seriyi İncele <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <div class="gb-accent" style="background: linear-gradient(90deg, #b8860b, #daa520);"></div>
                    </div>

                    <!-- COLOSSUS -->
                    <div class="global-brand-card">
                        <div class="gb-typography" style="font-size: 3.5rem;">COLOSSUS</div>
                        <div class="gb-product-shot">
                            <img src="assets/premium_battery_base.png" alt="Colossus Battery">
                        </div>
                        <div class="gb-info">
                            <h3>COLOSSUS</h3>
                            <p>Heavy Duty Power</p>
                            <a href="#products" class="gb-link">Seriyi İncele <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <div class="gb-accent" style="background: linear-gradient(90deg, #333333, #555555);"></div>
                    </div>

                    <!-- SENTRIC -->
                    <div class="global-brand-card">
                        <div class="gb-typography" style="color: rgba(0, 210, 255, 0.05);">SENTRIC</div>
                        <div class="gb-product-shot">
                            <img src="assets/premium_battery_base.png" alt="Sentric Battery">
                        </div>
                        <div class="gb-info">
                            <h3 style="color: var(--primary);">SENTRIC</h3>
                            <p>Reliable Energy</p>
                            <a href="#products" class="gb-link">Seriyi İncele <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <div class="gb-accent" style="background: linear-gradient(90deg, #008080, #00d2ff);"></div>
                    </div>

                </div>
            </div>
        </div>
    </section>`;

html = html.replace(targetSectionRegex, newBrandsHtml);
fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', html);

// 2. Update style.css
let css = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', 'utf8');

// Remove old compact carousel CSS
css = css.replace(/\/\* Compact Brand Carousel Layout \*\/[\s\S]*?(?=\/\*|\Z)/, '');

const newCardCss = `
/* Global Manufacturer Brand Layout */
.global-brands-wrapper {
    width: 100%;
    overflow-x: auto;
    padding: 1rem 0 3rem 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.2) rgba(0,0,0,0.1);
}

.global-brands-wrapper::-webkit-scrollbar {
    height: 6px;
}
.global-brands-wrapper::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.1);
    border-radius: 4px;
}
.global-brands-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(255,255,255,0.2);
    border-radius: 4px;
}

.global-brands-scroll {
    display: flex;
    gap: 2rem;
    width: max-content;
    padding: 0 1rem;
}

.global-brand-card {
    position: relative;
    width: 320px;
    height: 420px;
    background: linear-gradient(145deg, #111115 0%, #0a0a0c 100%);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transition: all 0.4s ease;
    cursor: pointer;
}

.global-brand-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    border-color: rgba(255, 255, 255, 0.15);
}

/* Devasa Arka Plan Tipografisi */
.gb-typography {
    position: absolute;
    top: 20px;
    left: 10px;
    font-size: 4rem;
    font-weight: 900;
    font-style: italic;
    color: rgba(255, 255, 255, 0.03);
    white-space: nowrap;
    z-index: 1;
    pointer-events: none;
    transition: color 0.4s ease, transform 0.4s ease;
}

.global-brand-card:hover .gb-typography {
    color: rgba(255, 255, 255, 0.07);
    transform: translateX(10px);
}

/* Akü Ürün Görseli (Ortada / Sağda) */
.gb-product-shot {
    position: absolute;
    bottom: 90px;
    right: -30px;
    width: 250px;
    z-index: 2;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    filter: drop-shadow(0 15px 15px rgba(0,0,0,0.6));
}

.gb-product-shot img {
    width: 100%;
    height: auto;
    display: block;
}

.global-brand-card:hover .gb-product-shot {
    transform: scale(1.08) translateX(-15px) translateY(-5px);
}

/* Bilgi ve İncele Alanı */
.gb-info {
    position: relative;
    z-index: 3;
    padding: 25px;
    background: linear-gradient(to top, rgba(10,10,12,1) 0%, rgba(10,10,12,0.8) 60%, transparent 100%);
}

.gb-info h3 {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 0.2rem;
    letter-spacing: 1px;
    color: #fff;
}

.gb-info p {
    color: rgba(255,255,255,0.5);
    font-size: 0.9rem;
    margin-bottom: 1rem;
    font-weight: 300;
    letter-spacing: 0.5px;
}

.gb-link {
    display: inline-flex;
    align-items: center;
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
}

.gb-link i {
    margin-left: 8px;
    transition: transform 0.3s ease;
}

.global-brand-card:hover .gb-link {
    opacity: 1;
    transform: translateX(0);
}

.gb-link:hover i {
    transform: translateX(5px);
}

/* Marka Vurgu Çizgisi */
.gb-accent {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    z-index: 4;
}
`;

css += '\\n' + newCardCss;
fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', css);

console.log("Global Layout updated successfully.");
