const fs = require('fs');
const path = require('path');

const files = [
    'brand-colossus.html',
    'brand-global.html',
    'brand-maxtorm.html',
    'brand-sentric.html',
    'brand-supreme.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Extract the specific contents
    const brandNameMatch = content.match(/<h1>(.*?)<\/h1>/);
    const brandName = brandNameMatch ? brandNameMatch[1] : '';
    
    // H2 is sometimes there, sometimes not?
    // Let's just capture everything inside .brand-header-text except the back link
    const headerTextMatch = content.match(/<div class="brand-header-text">([\s\S]*?)<\/div>/);
    if (!headerTextMatch) return;
    
    let headerText = headerTextMatch[1];
    
    // Remove the back link from header text since we place it above
    headerText = headerText.replace(/<a href="index\.html#brands" class="back-link">.*?<\/a>/s, '').trim();
    
    // Extract the image name
    const imgMatch = content.match(/<img src="(assets\/brand_[^"]+)"/);
    const imgSrc = imgMatch ? imgMatch[1] : '';
    
    const newStyle = `
    <style>
        .brand-banner-section {
            padding: 120px 0 40px 0;
            text-align: center;
        }
        .brand-banner-img {
            width: 40%;
            max-width: 480px;
            height: auto;
            border-radius: 16px;
            filter: drop-shadow(0 25px 50px rgba(0,0,0,0.8));
            margin: 0 auto 3rem auto;
            display: block;
        }
        .brand-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        .brand-content h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
            color: #fff;
        }
        .brand-content p {
            font-size: 1.1rem;
            color: var(--text-muted);
            line-height: 1.8;
            margin-bottom: 2rem;
        }
        .brand-content h2 {
            color: #137547;
            font-size: 1.5rem;
            margin-bottom: 2rem;
            font-weight: 600;
        }
    </style>
`;

    const newSection = `
    <!-- Brand Hero Section -->
    <section class="brand-banner-section">
        <div class="container">
            <a href="index.html#brands" class="back-link" style="justify-content: center; margin-bottom: 2rem;"><i class="fa-solid fa-arrow-left"></i> Markalara Dön</a>
            
            <!-- Yeni Geniş Görsel Alanı -->
            <img src="${imgSrc}" alt="${brandName} Battery" class="brand-banner-img">
            
            <div class="brand-content">
                ${headerText}
            </div>
        </div>
    </section>
`;

    // Replace the old style block
    content = content.replace(/<style>[\s\S]*?<\/style>/, newStyle.trim());
    
    // Replace the old hero section
    content = content.replace(/<!-- Brand Hero Section -->[\s\S]*?<\/section>/, newSection.trim());
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
