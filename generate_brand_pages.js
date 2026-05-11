const fs = require('fs');

const brands = [
    {
        id: 'rocket',
        name: 'ROCKET',
        slogan: 'The Ultimate Power',
        desc: 'Rocket aküleri, yüksek CCA (Soğuk Marş Amperi) değerleri ve üstün korozyon direnci sayesinde en zorlu iklim koşullarında bile aracınıza anında güç sağlar. Uzun ömürlü ve bakım gerektirmeyen kapalı sistem yapısıyla güvenli sürüş deneyimi sunar.',
        image: 'assets/brand_rocket.png',
        pdf: 'assets/catalogs/rocket.pdf',
        color: '#137547'
    },
    {
        id: 'global',
        name: 'GLOBAL',
        slogan: 'High Performance',
        desc: 'Global aküler, standartların ötesindeki rezerv kapasitesiyle aracınızın tüm elektronik donanımlarını besler. Start-Stop ve AGM teknolojisine sahip modelleriyle hem çevreci hem de uzun ömürlü bir enerji çözümü sunar.',
        image: 'assets/brand_global.png',
        pdf: 'assets/catalogs/global.pdf',
        color: '#00509e'
    },
    {
        id: 'maxtorm',
        name: 'MAXTORM',
        slogan: 'Extreme Durability',
        desc: 'Sınırları zorlamak için tasarlandı. Maxtorm, titreşime karşı yüksek dirençli iç yapısı sayesinde ağır şartlar altında bile maksimum performans gösterir. Spor otomobiller ve yüksek enerji ihtiyacı olan araçlar için idealdir.',
        image: 'assets/brand_maxtorm.png',
        pdf: 'assets/catalogs/maxtorm.pdf',
        color: '#c41e3a'
    },
    {
        id: 'supreme',
        name: 'SUPREME',
        slogan: 'Premium Quality',
        desc: 'Lüks araçlar ve üst segment donanımlar için özel olarak geliştirilmiş Supreme aküler, kusursuz güç iletimi sağlar. Ekstra kalın plakaları ve saf kurşun teknolojisiyle uzun ömrün ve asaletin simgesidir.',
        image: 'assets/brand_supreme.png',
        pdf: 'assets/catalogs/supreme.pdf',
        color: '#daa520'
    },
    {
        id: 'colossus',
        name: 'COLOSSUS',
        slogan: 'Heavy Duty Power',
        desc: 'Ticari araçlar, kamyonlar ve ağır vasıtalar için devasa güç! Colossus, uzun yollarda yarı yolda bırakmayan ağır hizmet (Heavy Duty) tipi yapısıyla işletmelerin gücüne güç katar. Sarsıntıya ve zorlu arazi şartlarına tam dayanıklıdır.',
        image: 'assets/brand_colossus.png',
        pdf: 'assets/catalogs/colossus.pdf',
        color: '#555555'
    },
    {
        id: 'sentric',
        name: 'SENTRIC',
        slogan: 'Reliable Energy',
        desc: 'Sentric, yeni nesil araçların tüm enerji ihtiyaçlarını karşılarken güvenilirlikten ödün vermez. Modern teknolojisiyle şarj kabulünü maksimize eder ve şehir içi kısa mesafe kullanımlarında bile akünün daima dolu kalmasını sağlar.',
        image: 'assets/brand_sentric.png',
        pdf: 'assets/catalogs/sentric.pdf',
        color: '#00d2ff'
    }
];

const template = (brand) => `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.name} Akü | SENTRIC</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <style>
        .brand-hero {
            padding: 8rem 0 4rem 0;
            min-height: 70vh;
            display: flex;
            align-items: center;
            background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, #0a0a0c 70%);
        }
        .brand-header-text h1 {
            font-size: 5rem;
            font-weight: 900;
            font-style: italic;
            margin-bottom: 0;
            line-height: 1;
            text-transform: uppercase;
        }
        .brand-header-text h2 {
            color: ${brand.color};
            font-size: 1.5rem;
            margin-bottom: 2rem;
            font-weight: 600;
        }
        .brand-desc {
            font-size: 1.1rem;
            color: var(--text-muted);
            line-height: 1.8;
            margin-bottom: 3rem;
            max-width: 600px;
        }
        .btn-download {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 1rem 2.5rem;
            background: linear-gradient(135deg, ${brand.color}, #0a0a0c);
            color: #fff;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.1);
        }
        .btn-download:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.8);
            border-color: rgba(255,255,255,0.3);
        }
        .brand-image-col {
            position: relative;
        }
        .brand-image-col img {
            width: 120%;
            max-width: 800px;
            margin-left: -10%;
            filter: drop-shadow(0 30px 40px rgba(0,0,0,0.8));
            animation: float 6s ease-in-out infinite;
        }
        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--text-muted);
            text-decoration: none;
            margin-bottom: 2rem;
            transition: color 0.3s ease;
        }
        .back-link:hover {
            color: #fff;
        }
    </style>
</head>
<body>

    <!-- Header / Navbar -->
    <header class="navbar">
        <div class="container">
            <a href="index.html" class="logo">
                <i class="fa-solid fa-car-battery"></i>
                SENTRIC<span>.</span>
            </a>
            <nav class="nav-menu">
                <a href="index.html" class="nav-link">Ana Sayfa</a>
                <a href="index.html#brands" class="nav-link active">Markalar</a>
                <a href="index.html#contact" class="nav-link">İletişim</a>
            </nav>
        </div>
    </header>

    <!-- Brand Hero Section -->
    <section class="brand-hero">
        <div class="container">
            <div class="grid" style="align-items: center;">
                <div class="brand-header-text">
                    <a href="index.html#brands" class="back-link"><i class="fa-solid fa-arrow-left"></i> Markalara Dön</a>
                    <h1>${brand.name}</h1>
                    <h2>${brand.slogan}</h2>
                    <p class="brand-desc">${brand.desc}</p>
                    <a href="${brand.pdf}" target="_blank" class="btn-download">
                        <i class="fa-solid fa-file-pdf"></i> Resmi Kataloğu İndir
                    </a>
                </div>
                <div class="brand-image-col">
                    <img src="${brand.image}" alt="${brand.name} Battery">
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container text-center">
            <p>&copy; 2026 SENTRIC Automotive Batteries. Tüm hakları saklıdır.</p>
        </div>
    </footer>

</body>
</html>
`;

brands.forEach(brand => {
    const filePath = require('path').join('c:\\\\Users\\\\LENOVO\\\\.gemini\\\\antigravity\\\\scratch', 'brand-' + brand.id + '.html');
    fs.writeFileSync(filePath, template(brand));
    console.log("Created " + filePath);
});

// Update index.html to link to these pages
let html = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', 'utf8');

html = html.replace(/<div class="global-brand-card">[\s\S]*?<div class="gb-typography">ROCKET<\/div>/g, '<a href="brand-rocket.html" class="global-brand-card" style="text-decoration:none;">\n                        <div class="gb-typography">ROCKET</div>');
html = html.replace(/<div class="global-brand-card">[\s\S]*?<div class="gb-typography">GLOBAL<\/div>/g, '<a href="brand-global.html" class="global-brand-card" style="text-decoration:none;">\n                        <div class="gb-typography">GLOBAL</div>');
html = html.replace(/<div class="global-brand-card">[\s\S]*?<div class="gb-typography">MAXTORM<\/div>/g, '<a href="brand-maxtorm.html" class="global-brand-card" style="text-decoration:none;">\n                        <div class="gb-typography">MAXTORM</div>');
html = html.replace(/<div class="global-brand-card">[\s\S]*?<div class="gb-typography" style="font-size: 3.5rem;">SUPREME<\/div>/g, '<a href="brand-supreme.html" class="global-brand-card" style="text-decoration:none;">\n                        <div class="gb-typography" style="font-size: 3.5rem;">SUPREME</div>');
html = html.replace(/<div class="global-brand-card">[\s\S]*?<div class="gb-typography" style="font-size: 3.5rem;">COLOSSUS<\/div>/g, '<a href="brand-colossus.html" class="global-brand-card" style="text-decoration:none;">\n                        <div class="gb-typography" style="font-size: 3.5rem;">COLOSSUS</div>');
html = html.replace(/<div class="global-brand-card">[\s\S]*?<div class="gb-typography" style="color: rgba\(0, 210, 255, 0.05\);">SENTRIC<\/div>/g, '<a href="brand-sentric.html" class="global-brand-card" style="text-decoration:none;">\n                        <div class="gb-typography" style="color: rgba(0, 210, 255, 0.05);">SENTRIC</div>');

// Replace closing divs with closing anchor tags for the cards
html = html.replace(/<div class="gb-accent" style="background: linear-gradient\(90deg, #0a4d2e, #137547\);"><\/div>\s*<\/div>/, '<div class="gb-accent" style="background: linear-gradient(90deg, #0a4d2e, #137547);"></div>\n                    </a>');
html = html.replace(/<div class="gb-accent" style="background: linear-gradient\(90deg, #003366, #00509e\);"><\/div>\s*<\/div>/, '<div class="gb-accent" style="background: linear-gradient(90deg, #003366, #00509e);"></div>\n                    </a>');
html = html.replace(/<div class="gb-accent" style="background: linear-gradient\(90deg, #8b0000, #c41e3a\);"><\/div>\s*<\/div>/, '<div class="gb-accent" style="background: linear-gradient(90deg, #8b0000, #c41e3a);"></div>\n                    </a>');
html = html.replace(/<div class="gb-accent" style="background: linear-gradient\(90deg, #b8860b, #daa520\);"><\/div>\s*<\/div>/, '<div class="gb-accent" style="background: linear-gradient(90deg, #b8860b, #daa520);"></div>\n                    </a>');
html = html.replace(/<div class="gb-accent" style="background: linear-gradient\(90deg, #333333, #555555\);"><\/div>\s*<\/div>/, '<div class="gb-accent" style="background: linear-gradient(90deg, #333333, #555555);"></div>\n                    </a>');
html = html.replace(/<div class="gb-accent" style="background: linear-gradient\(90deg, #008080, #00d2ff\);"><\/div>\s*<\/div>/, '<div class="gb-accent" style="background: linear-gradient(90deg, #008080, #00d2ff);"></div>\n                    </a>');

// Also remove `href="#products"` from inner link to prevent nested links
html = html.replace(/<a href="#products" class="gb-link">Seriyi İncele <i class="fa-solid fa-arrow-right"><\/i><\/a>/g, '<span class="gb-link">İncele <i class="fa-solid fa-arrow-right"></i></span>');


fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html', html);

console.log("6 Brand pages generated and index.html updated.");
