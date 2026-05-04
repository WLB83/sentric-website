const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://raw.githubusercontent.com/matthlavacka/car-list/master/car-list.json';

https.get(url, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        try {
            const data = JSON.parse(body);
            let newDb = {};
            
            const asianBrands = ["Honda", "Toyota", "Nissan", "Mazda", "Subaru", "Mitsubishi", "Lexus", "Suzuki", "Hyundai", "Kia", "Daewoo", "SsangYong", "Chery", "Geely", "MG"];
            const popularBrands = ["Fiat", "Renault", "Volkswagen", "Ford", "Toyota", "Hyundai", "Peugeot", "Opel", "Honda", "Dacia", "Skoda", "Seat", "Mercedes-Benz", "BMW", "Audi", "Nissan", "Kia"];
            
            data.forEach(item => {
                const brand = item.brand;
                const models = item.models;
                
                if(!brand || !models || models.length === 0) return;
                
                let brandObj = {
                    popular: popularBrands.includes(brand),
                    isAsian: asianBrands.includes(brand),
                    models: {}
                };
                
                models.forEach(m => {
                    // Just put generic year brackets
                    brandObj.models[m] = {
                        years: ["2020-2026 (Yeni Nesil)", "2010-2019 (Standart)", "2000-2009 (Eski Nesil)"]
                    };
                });
                
                newDb[brand] = brandObj;
            });
            
            fs.writeFileSync(path.join(__dirname, 'data', 'cars_db.json'), JSON.stringify(newDb, null, 4), 'utf8');
            console.log('Successfully generated cars_db.json with ' + Object.keys(newDb).length + ' brands.');
            
        } catch(e) {
            console.error("Error parsing JSON", e);
        }
    });
}).on('error', e => {
    console.error("Fetch Error", e);
});
