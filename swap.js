const fs = require('fs');

const path = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\scratch\\index.html';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

let brands_start = -1;
let products_start = -1;
let features_start = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<!-- Brands Section -->')) {
        brands_start = i;
    } else if (lines[i].includes('<!-- Products Section (Sebang Style) -->')) {
        products_start = i;
    } else if (lines[i].includes('<!-- Features Section -->')) {
        features_start = i;
    }
}

if (brands_start !== -1 && products_start !== -1 && features_start !== -1) {
    const before = lines.slice(0, brands_start);
    const brands = lines.slice(brands_start, products_start);
    const products = lines.slice(products_start, features_start);
    const after = lines.slice(features_start);

    const new_lines = [].concat(before, products, brands, after);
    fs.writeFileSync(path, new_lines.join('\n'), 'utf8');
    console.log('Swapped successfully.');
} else {
    console.log(`Error: brands_start=${brands_start}, products_start=${products_start}, features_start=${features_start}`);
}
