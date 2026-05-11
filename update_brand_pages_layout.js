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
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .brand-image-col img {
            width: 50%; /* Image reduced by 50% */
            max-width: 400px;
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
        
        /* Grid swap for mobile responsiveness */
        .brand-hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        @media (max-width: 992px) {
            .brand-hero-grid {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 2rem;
            }
            .brand-desc {
                margin: 0 auto 3rem auto;
            }
            .brand-image-col {
                order: -1; /* Image stays on top for mobile */
            }
            .brand-image-col img {
                width: 70%;
            }
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
            <div class="brand-hero-grid">
                <!-- Image now on the LEFT -->
                <div class="brand-image-col">
                    <img src="${brand.image}" alt="${brand.name} Battery">
                </div>
                
                <!-- Text now on the RIGHT -->
                <div class="brand-header-text">
                    <a href="index.html#brands" class="back-link"><i class="fa-solid fa-arrow-left"></i> Markalara Dön</a>
                    <h1>${brand.name}</h1>
                    <h2>${brand.slogan}</h2>
                    <p class="brand-desc">${brand.desc}</p>
                    <a href="${brand.pdf}" target="_blank" class="btn-download">
                        <i class="fa-solid fa-file-pdf"></i> Resmi Kataloğu İndir
                    </a>
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
    console.log("Updated Layout for " + filePath);
});

