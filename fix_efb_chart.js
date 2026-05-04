const fs = require('fs');
let content = fs.readFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\efb.html', 'utf8');

// The charts currently say SENTRIC AGM serisi. We change to SENTRIC EFB serisi.
content = content.replace(/SENTRIC AGM serisi/g, 'SENTRIC EFB serisi');
content = content.replace(/AGM Teknik Spesifikasyonları/g, 'EFB Teknik Spesifikasyonları');

// Adjust the chart values for EFB. It should still be better than standard but maybe slightly less than AGM.
// Chart 1: AGM has 45 weeks. Let's give EFB 35 weeks.
content = content.replace(/<div class="bar sentric" style="height: 90%;">\s*<span class="bar-value" style="color: var\(--primary\);">45<\/span>/, '<div class="bar sentric" style="height: 70%;">\n                                <span class="bar-value" style="color: var(--primary);">35</span>');

// Chart 2: AGM has 486 cycles. Let's give EFB 380 cycles.
content = content.replace(/<div class="bar sentric" style="height: 81%;">\s*<span class="bar-value" style="color: var\(--primary\);">486<\/span>/, '<div class="bar sentric" style="height: 63%;">\n                                <span class="bar-value" style="color: var(--primary);">380</span>');

fs.writeFileSync('c:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\efb.html', content);
console.log('EFB charts fixed.');
