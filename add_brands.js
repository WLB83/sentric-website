const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', 'utf8');

// 1. Add Markalar to Navbar
const navbarTarget = `</div>
                </div>`;
const navbarReplacement = `</div>
                </div>
                <a href="#brands" class="nav-link">Markalar</a>`;

if (!html.includes('<a href="#brands" class="nav-link">Markalar</a>')) {
    html = html.replace(navbarTarget, navbarReplacement);
}

// 2. Add Brands Section before Products Section
const sectionTarget = `<!-- Products Section -->`;
const sectionContent = `<!-- Brands Section -->
    <section id="brands" class="brands section" style="padding-bottom: 2rem;">
        <div class="container">
            <h2 class="section-title text-center" style="margin-bottom: 3rem;">Uyumluluk Sağladığımız <span style="color: var(--primary);">Markalar</span></h2>
            
            <div class="marquee-wrapper">
                <div class="marquee-track">
                    <!-- Set 1 -->
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Mercedes-Benz</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> BMW</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Audi</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Volkswagen</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Porsche</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Land Rover</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Volvo</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Toyota</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Honda</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Ford</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Renault</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Fiat</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Hyundai</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Kia</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Peugeot</div>
                    <!-- Set 2 (Duplicate for infinite scroll) -->
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Mercedes-Benz</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> BMW</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Audi</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Volkswagen</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Porsche</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Land Rover</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Volvo</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Toyota</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Honda</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Ford</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Renault</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Fiat</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Hyundai</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Kia</div>
                    <div class="brand-item"><i class="fa-solid fa-car-side"></i> Peugeot</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Products Section -->`;

if (!html.includes('<section id="brands"')) {
    html = html.replace(sectionTarget, sectionContent);
}

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', html);

// 3. Add CSS
let css = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', 'utf8');

const brandCss = `
/* Brands Section */
.marquee-wrapper {
    overflow: hidden;
    position: relative;
    width: 100%;
    padding: 2rem 0;
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-track {
    display: flex;
    width: fit-content;
    animation: scroll-marquee 40s linear infinite;
}

.marquee-track:hover {
    animation-play-state: paused;
}

.brand-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 1.5rem 3rem;
    margin: 0 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-main);
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    transition: all 0.3s ease;
}

.brand-item i {
    color: var(--primary);
    font-size: 1.4rem;
}

.brand-item:hover {
    background: rgba(0, 210, 255, 0.1);
    border-color: var(--primary);
    transform: translateY(-5px);
    color: #fff;
}

@keyframes scroll-marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
`;

if (!css.includes('.marquee-wrapper')) {
    css += '\\n' + brandCss;
    fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', css);
}

console.log("Brands section added successfully.");
