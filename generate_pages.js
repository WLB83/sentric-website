const fs = require('fs');

const pagesData = [
    {
        filename: 'smf.html',
        headTitle: 'Sentric Akü - SMF Serisi',
        navTitle: 'Sentric Akü',
        heroCategory: 'Binek ve Hafif Ticari Araçlar',
        heroTitle: 'SMF Serisi',
        heroDesc: 'Standart araçlar için Avrupa (DIN) ve Asya (JIS) tipi tam kapalı, bakım gerektirmeyen kalsiyum alaşımlı aküler.',
        techTitle: 'SMF Teknolojisi (Sealed Maintenance Free)',
        techDesc: 'Sentric SMF Aküler, su kaybını sıfıra indiren sızdırmaz labirent çift kapak yapısı ve korozyonu engelleyen kurşun-kalsiyum ızgaraları sayesinde ömür boyu tam bakımsız ve güvenilir bir performans sunar.'
    },
    {
        filename: 'smf-heavy.html',
        headTitle: 'Sentric Akü - Ağır Vasıta SMF Serisi',
        navTitle: 'Sentric Akü',
        heroCategory: 'Ağır Vasıta ve Filo',
        heroTitle: 'SMF Ağır Vasıta Serisi',
        heroDesc: 'Kamyon, tır ve otobüsler için sarsıntıya dayanıklı, tam kapalı ve bakımsız uzun ömürlü ticari aküler.',
        techTitle: 'Ağır Vasıta SMF Teknolojisi',
        techDesc: 'Uzun yol ve zorlu çalışma koşulları için tasarlanan SMF ticari serimiz, gelişmiş kalsiyum alaşım teknolojisi ile su ekleme gerektirmeden yıllarca üstün marş gücü ve titreşim direnci sağlar.'
    },
    {
        filename: 'shd.html',
        headTitle: 'Sentric Akü - SHD Serisi',
        navTitle: 'Sentric Akü',
        heroCategory: 'Ağır Vasıta ve Filo',
        heroTitle: 'Super Heavy Duty (SHD)',
        heroDesc: 'En zorlu ticari koşullarda çalışan araçlar için maksimum performans ve ekstra dayanıklılık sağlayan Super Heavy Duty serisi.',
        techTitle: 'SHD (Super Heavy Duty) Teknolojisi',
        techDesc: 'Özel kalın plaka dizaynı ve yüksek sarsıntı (V3) direnci sayesinde, yoğun elektrik tüketen ve sürekli dur-kalk yapan ağır ticari araçlar için mükemmel dayanım ve uzun çevrim ömrü.'
    },
    {
        filename: 'deep-cycle.html',
        headTitle: 'Sentric Akü - Deep Cycle Serisi',
        navTitle: 'Sentric Akü',
        heroCategory: 'Marin ve Karavan',
        heroTitle: 'Deep Cycle Serisi',
        heroDesc: 'Tekne, yat, karavan ve güneş enerjisi sistemleri için derin döngüye ve uzun süreli deşarja tam uyumlu güvenilir enerji.',
        techTitle: 'Deep Cycle Teknolojisi (Derin Döngü)',
        techDesc: 'Kapasitesinin büyük bölümünü kullansa dahi tekrar şarj edilebilen, özel yoğunlaştırılmış aktif materyalleri ile marin ve karavan uygulamalarında kesintisiz yaşam aküsü deneyimi sunan teknoloji.'
    },
    {
        filename: 'golf.html',
        headTitle: 'Sentric Akü - Golf Serisi',
        navTitle: 'Sentric Akü',
        heroCategory: 'Endüstriyel Özel',
        heroTitle: 'Golf Arabası Aküleri',
        heroDesc: 'Golf arabaları ve elektrikli personel taşıyıcılar için özel tasarlanmış derin döngülü kesintisiz güç.',
        techTitle: 'Elektrikli Araç ve Golf Teknolojisi',
        techDesc: 'Genişletilmiş deşarj döngüsü kapasitesi ve sağlam hücre konstrüksiyonu ile golf arabaları, temizlik makinaları ve elektrikli taşıyıcılar için en uzun menzili sağlayan güvenilir aküler.'
    },
    {
        filename: 'garden.html',
        headTitle: 'Sentric Akü - Garden Serisi',
        navTitle: 'Sentric Akü',
        heroCategory: 'Endüstriyel Özel',
        heroTitle: 'Bahçe Ekipmanları Aküleri',
        heroDesc: 'Çim biçme traktörleri ve bahçe ekipmanları için kompakt, sarsıntıya dayanıklı ve güvenilir enerji çözümü.',
        techTitle: 'U Serisi / Bahçe Teknolojisi',
        techDesc: 'Güçlü yapısı ile zorlu arazi koşullarında çalışan çim biçme makinaları ve küçük bahçe traktörlerinde anında marş gücü ve yüksek sarsıntı direnci sunan özel seri.'
    }
];

let template = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\efb.html', 'utf8');

for (const page of pagesData) {
    let content = template;

    // Replace Title
    content = content.replace(/<title>.*?<\/title>/g, `<title>${page.headTitle}</title>`);
    
    // Replace Hero Section Details
    content = content.replace(/<p class="category">.*?<\/p>/, `<p class="category">${page.heroCategory}</p>`);
    content = content.replace(/<h1 class="fade-in-up">.*?<\/h1>/, `<h1 class="fade-in-up">${page.heroTitle}</h1>`);
    content = content.replace(/<p class="hero-desc fade-in-up" style="transition-delay: 0\.1s;">.*?<\/p>/, `<p class="hero-desc fade-in-up" style="transition-delay: 0.1s;">${page.heroDesc}</p>`);

    // Replace Tech Title
    content = content.replace(/<h2 class="section-title">EFB Teknolojisi \(Enhanced Flooded Battery\)<\/h2>/g, `<h2 class="section-title">${page.techTitle}</h2>`);
    
    // Replace Tech Description
    // We'll replace the first p tag under tech section that holds the specific tech desc
    content = content.replace(/<p>Sentric EFB.*?<\/p>/s, `<p>${page.techDesc}</p>`);

    // Clean out the specifics from EFB (like specific icons or features if needed)
    // For now, I will leave the layout the same, but change the title of the table
    content = content.replace(/EFB Binek Akü Özellikleri/g, `${page.heroTitle} Özellikleri`);
    
    fs.writeFileSync(`c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\${page.filename}`, content);
    console.log(`Created ${page.filename}`);
}
