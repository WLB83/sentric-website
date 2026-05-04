const fs = require('fs');

const pagesToClean = [
    'smf.html',
    'smf-heavy.html',
    'shd.html',
    'deep-cycle.html',
    'golf.html',
    'garden.html'
];

pagesToClean.forEach(file => {
    let content = fs.readFileSync(`c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\${file}`, 'utf8');

    // Remove the charts block. The charts are inside <div class="about-grid"> which starts right after <p style="color: var(--text-muted)...</p></div>
    // Let's remove the two <div class="chart-container fade-in-up"> sections.
    
    // We can just use a regex to remove everything from <div class="chart-container fade-in-up"> to the start of the table.
    // Actually, let's just find the <div class="about-grid"> that comes before the <table class="performance-table"> and remove the entire about-grid.
    
    // The structure is:
    // <div class="about-grid">
    //      <div class="chart-container fade-in-up"> ... </div>
    //      <div class="chart-container fade-in-up" ...> ... </div>
    // </div>
    // \s*<table class="performance-table">
    
    content = content.replace(/<div class="about-grid">\s*<!-- Chart 1[\s\S]*?<!-- Chart 2[\s\S]*?<\/div>\s*<\/div>\s*<table class="performance-table">/, '<table class="performance-table">');

    // Also, the <p> text above it might still say "SENTRIC AGM serisi...". Let's fix that too.
    content = content.replace(/<p style="color: var\(--text-muted\); max-width: 700px; margin: 0 auto;">Zorlu EN VDA test koşullarında SENTRIC AGM serisi, standartların ve tüm ana rakiplerin açık ara ötesinde bir yaşam döngüsü sunar.<\/p>/, '');

    fs.writeFileSync(`c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\${file}`, content);
});

console.log('Charts removed from non-AGM pages.');
