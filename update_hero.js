const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', 'utf8');

const targetHtml = `                </div>
            </div>
        </div>
        <div class="hero-stats-bar glassmorphism fade-in-up">`;

const replacementHtml = `                </div>
            </div>

            <!-- Hero Visual Right Side -->
            <div class="hero-visual fade-in-up">
                <div class="hero-glow"></div>
                <img src="assets/rocket_shd_new.png" alt="Rocket Heavy Duty Battery" class="bat-img bat-shd">
                <img src="assets/rocket_efb_new.png" alt="Rocket EFB Battery" class="bat-img bat-efb">
                <img src="assets/rocket_agm_new.png" alt="Rocket AGM Battery" class="bat-img bat-agm">
            </div>
        </div>
        <div class="hero-stats-bar glassmorphism fade-in-up">`;

if (html.includes(targetHtml)) {
    html = html.replace(targetHtml, replacementHtml);
    fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', html, 'utf8');
    console.log("index.html updated successfully!");
} else {
    console.error("Could not find the target HTML to replace.");
}

// 2. Update style.css
let css = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', 'utf8');

const targetCss = `.hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 0 2rem;
    margin-left: 10%;
}`;

const replacementCss = `.hero-container {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 0 5%;
    gap: 4rem;
}

.hero-content {
    flex: 1;
    max-width: 700px;
}

.hero-visual {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    perspective: 1000px;
}

.hero-glow {
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0,210,255,0.3) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(40px);
}

.bat-img {
    position: absolute;
    width: 280px; /* Adjust based on image resolution */
    transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    filter: drop-shadow(0 30px 40px rgba(0,0,0,0.7));
    /* mix-blend-mode: multiply; if the images have white backgrounds, this helps them blend */
}

/* Base positions */
.bat-agm {
    z-index: 3;
    transform: translateY(20px) scale(1.1) rotateY(-5deg);
}

.bat-efb {
    z-index: 2;
    transform: translate(-140px, -20px) scale(0.9) rotateY(10deg);
    opacity: 0.9;
}

.bat-shd {
    z-index: 1;
    transform: translate(160px, -40px) scale(0.85) rotateY(-15deg);
    opacity: 0.8;
}

/* Hover dynamic effect */
.hero-visual:hover .bat-agm {
    transform: translateY(-10px) scale(1.15) rotateY(0deg);
    filter: drop-shadow(0 40px 50px rgba(0,210,255,0.4));
}
.hero-visual:hover .bat-efb {
    transform: translate(-180px, -30px) scale(0.95) rotateY(5deg);
    opacity: 1;
}
.hero-visual:hover .bat-shd {
    transform: translate(200px, -50px) scale(0.9) rotateY(-10deg);
    opacity: 1;
}`;

if (css.includes(targetCss)) {
    css = css.replace(targetCss, replacementCss);
    fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\style.css', css, 'utf8');
    console.log("style.css updated successfully!");
} else {
    console.error("Could not find the target CSS to replace.");
}

