const fs = require('fs');

// 1. Update index.html images
let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', 'utf8');

html = html.replace(/<img src="assets\/premium_battery_base\.png" alt="Maxtorm Battery">/, '<img src="assets/brand_maxtorm.png" alt="Maxtorm Battery" style="width: 120%; margin-left: -10%;">');
html = html.replace(/<img src="assets\/premium_battery_base\.png" alt="Supreme Battery">/, '<img src="assets/brand_supreme.png" alt="Supreme Battery" style="width: 120%; margin-left: -10%;">');
html = html.replace(/<img src="assets\/premium_battery_base\.png" alt="Colossus Battery">/, '<img src="assets/brand_colossus.png" alt="Colossus Battery" style="width: 120%; margin-left: -10%;">');
html = html.replace(/<img src="assets\/premium_battery_base\.png" alt="Sentric Battery">/, '<img src="assets/brand_sentric.png" alt="Sentric Battery" style="width: 120%; margin-left: -10%;">');

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', html);

// 2. Update style.css
let css = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', 'utf8');

// Replace the wrapper and scroll classes to be a 3x2 Grid
const newCss = `
/* Global Manufacturer Brand Layout */
.global-brands-wrapper {
    width: 100%;
    padding: 1rem 0 3rem 0;
}

.global-brands-scroll {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    width: 100%;
}

.global-brand-card {
    position: relative;
    width: 100%;
    height: 380px;
`;

css = css.replace(/\/\* Global Manufacturer Brand Layout \*\/[\s\S]*?\.global-brand-card\s*\{[\s\S]*?height:\s*420px;/m, newCss);

// Remove the webkit scrollbar and grabbing classes if they are hanging
css = css.replace(/\.global-brands-wrapper::-webkit-scrollbar[\s\S]*?cursor: grabbing;\s*\}/m, '');


// Make responsive for mobile
const responsiveCss = `
@media (max-width: 992px) {
    .global-brands-scroll {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 768px) {
    .global-brands-scroll {
        grid-template-columns: 1fr;
    }
}
`;
if(!css.includes('@media (max-width: 992px) {\\n    .global-brands-scroll')) {
   css += "\\n" + responsiveCss;
}

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', css);

console.log("3x2 Grid and Images applied successfully.");
