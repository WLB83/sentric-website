const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', 'utf8');

const targetSectionRegex = /<div class="marquee-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;

const newGridHtml = `<div class="brand-grid">
                <!-- ROCKET -->
                <div class="brand-card">
                    <div class="brand-card-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                    <div class="brand-card-content">
                        <h3>ROCKET</h3>
                        <p>The Ultimate Power</p>
                    </div>
                </div>
                <!-- GLOBAL -->
                <div class="brand-card">
                    <div class="brand-card-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                    <div class="brand-card-content">
                        <h3>GLOBAL</h3>
                        <p>High Performance</p>
                    </div>
                </div>
                <!-- MAXTORM -->
                <div class="brand-card">
                    <div class="brand-card-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                    <div class="brand-card-content">
                        <h3>MAXTORM</h3>
                        <p>Extreme Durability</p>
                    </div>
                </div>
                <!-- SUPREME -->
                <div class="brand-card">
                    <div class="brand-card-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                    <div class="brand-card-content">
                        <h3>SUPREME</h3>
                        <p>Premium Quality</p>
                    </div>
                </div>
                <!-- COLOSSUS -->
                <div class="brand-card">
                    <div class="brand-card-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                    <div class="brand-card-content">
                        <h3>COLOSSUS</h3>
                        <p>Heavy Duty Power</p>
                    </div>
                </div>
                <!-- SENTRIC -->
                <div class="brand-card">
                    <div class="brand-card-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                    <div class="brand-card-content">
                        <h3 style="color: var(--primary);">SENTRIC</h3>
                        <p>Reliable Energy</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

html = html.replace(targetSectionRegex, newGridHtml);

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', html);

// 2. Update style.css
let css = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', 'utf8');

const brandCardCss = `
/* Brand Grid Layout */
.brand-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 1rem 0;
}

.brand-card {
    position: relative;
    height: 300px;
    border-radius: 16px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.brand-card-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.6;
    transition: transform 0.6s ease, opacity 0.4s ease;
    mix-blend-mode: screen;
}

.brand-card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
    z-index: 2;
    transform: translateY(20px);
    transition: transform 0.4s ease;
}

.brand-card-content h3 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-shadow: 0 4px 10px rgba(0,0,0,0.8);
}

.brand-card-content p {
    color: var(--text-muted);
    font-size: 1rem;
    opacity: 0;
    transition: opacity 0.4s ease;
    transform: translateY(10px);
}

/* Hover Effects */
.brand-card:hover {
    transform: translateY(-10px);
    border-color: rgba(0, 210, 255, 0.4);
    box-shadow: 0 20px 40px rgba(0, 210, 255, 0.15);
}

.brand-card:hover .brand-card-bg {
    transform: scale(1.1);
    opacity: 0.9;
}

.brand-card:hover .brand-card-content {
    transform: translateY(0);
}

.brand-card:hover .brand-card-content p {
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 992px) {
    .brand-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 576px) {
    .brand-grid {
        grid-template-columns: 1fr;
    }
}
`;

if (!css.includes('.brand-grid')) {
    css += '\\n' + brandCardCss;
    fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', css);
}

console.log("Brands grid layout added successfully.");
