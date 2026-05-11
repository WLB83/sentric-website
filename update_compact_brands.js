const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', 'utf8');

const targetSectionRegex = /<div class="brand-grid">[\s\S]*?<\/section>/;

const newCarouselHtml = `<div class="brand-carousel-wrapper">
                <div class="brand-carousel">
                    <!-- ROCKET -->
                    <div class="compact-brand-card">
                        <div class="compact-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                        <div class="css-label label-rocket">
                            <span class="label-subtitle">THE ULTIMATE POWER</span>
                            <h3>ROCKET</h3>
                            <span class="label-type">EFB</span>
                        </div>
                    </div>
                    <!-- GLOBAL -->
                    <div class="compact-brand-card">
                        <div class="compact-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                        <div class="css-label label-global">
                            <span class="label-subtitle">HIGH PERFORMANCE</span>
                            <h3>GLOBAL</h3>
                            <span class="label-type">AGM</span>
                        </div>
                    </div>
                    <!-- MAXTORM -->
                    <div class="compact-brand-card">
                        <div class="compact-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                        <div class="css-label label-maxtorm">
                            <span class="label-subtitle">EXTREME DURABILITY</span>
                            <h3>MAXTORM</h3>
                            <span class="label-type">SMF</span>
                        </div>
                    </div>
                    <!-- SUPREME -->
                    <div class="compact-brand-card">
                        <div class="compact-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                        <div class="css-label label-supreme">
                            <span class="label-subtitle">PREMIUM QUALITY</span>
                            <h3>SUPREME</h3>
                            <span class="label-type">PRO</span>
                        </div>
                    </div>
                    <!-- COLOSSUS -->
                    <div class="compact-brand-card">
                        <div class="compact-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                        <div class="css-label label-colossus">
                            <span class="label-subtitle">HEAVY DUTY POWER</span>
                            <h3>COLOSSUS</h3>
                            <span class="label-type">SHD</span>
                        </div>
                    </div>
                    <!-- SENTRIC -->
                    <div class="compact-brand-card">
                        <div class="compact-bg" style="background-image: url('assets/premium_battery_base.png');"></div>
                        <div class="css-label label-sentric">
                            <span class="label-subtitle">RELIABLE ENERGY</span>
                            <h3>SENTRIC</h3>
                            <span class="label-type">EV</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

html = html.replace(targetSectionRegex, newCarouselHtml);

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', html);

// 2. Update style.css
let css = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', 'utf8');

// Remove old grid CSS if exists to avoid clutter
css = css.replace(/\/\* Brand Grid Layout \*\/[\s\S]*?(?=\/\*|\Z)/, '');

const newCardCss = `
/* Compact Brand Carousel Layout */
.brand-carousel-wrapper {
    width: 100%;
    overflow-x: auto;
    padding: 1rem 0 3rem 0;
    scrollbar-width: thin;
    scrollbar-color: var(--primary) rgba(255,255,255,0.05);
}

.brand-carousel-wrapper::-webkit-scrollbar {
    height: 8px;
}
.brand-carousel-wrapper::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
    border-radius: 4px;
}
.brand-carousel-wrapper::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 4px;
}

.brand-carousel {
    display: flex;
    gap: 1.5rem;
    width: max-content;
    padding: 0 1rem;
}

.compact-brand-card {
    position: relative;
    width: 260px;
    height: 220px;
    border-radius: 12px;
    background: #0a0a0c;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
    transition: transform 0.3s ease, border-color 0.3s ease;
}

.compact-brand-card:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
}

.compact-bg {
    position: absolute;
    width: 80%;
    height: 80%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
    transition: transform 0.4s ease;
    filter: drop-shadow(0 10px 10px rgba(0,0,0,0.8));
}

.compact-brand-card:hover .compact-bg {
    transform: scale(1.05);
}

/* 3D CSS Label Overlays */
.css-label {
    position: absolute;
    z-index: 2;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%) rotateY(-15deg) rotateZ(-2deg);
    width: 65%;
    height: 40%;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 5px;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.5), 0 2px 5px rgba(0,0,0,0.8);
    opacity: 0.95;
}

.css-label h3 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: 1px;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
    font-style: italic;
}

.label-subtitle {
    font-size: 0.45rem;
    text-transform: uppercase;
    color: rgba(255,255,255,0.8);
    margin-bottom: 2px;
}

.label-type {
    font-size: 0.7rem;
    font-weight: 700;
    color: #fff;
    margin-top: 2px;
    background: rgba(0,0,0,0.3);
    padding: 2px 6px;
    border-radius: 2px;
}

/* Brand Specific Label Colors (Inspired by user attachments) */
.label-rocket { background: linear-gradient(135deg, #0a4d2e, #137547); } /* Green EFB */
.label-global { background: linear-gradient(135deg, #003366, #00509e); } /* Blue AGM */
.label-maxtorm { background: linear-gradient(135deg, #8b0000, #c41e3a); } /* Red/Black HD */
.label-supreme { background: linear-gradient(135deg, #b8860b, #daa520); } /* Gold */
.label-colossus { background: linear-gradient(135deg, #333333, #555555); } /* Silver/Gray */
.label-sentric { background: linear-gradient(135deg, #008080, #00d2ff); } /* Cyan */

`;

css += '\\n' + newCardCss;
fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', css);

console.log("Compact Layout and CSS Labels updated successfully.");
