const Jimp = require('jimp');

async function fixAlpha() {
    console.log('Reading images...');
    const orig = await Jimp.read('assets/rocket_banner.png');
    const clean = await Jimp.read('assets/rocket_banner_clean.png');
    
    console.log('Resizing clean image if necessary...');
    if (orig.bitmap.width !== clean.bitmap.width || orig.bitmap.height !== clean.bitmap.height) {
        clean.resize(orig.bitmap.width, orig.bitmap.height);
    }
    
    console.log('Transferring alpha channel...');
    orig.scan(0, 0, orig.bitmap.width, orig.bitmap.height, function(x, y, idx) {
        // orig.bitmap.data is a Buffer
        // idx+3 is alpha
        clean.bitmap.data[idx + 3] = orig.bitmap.data[idx + 3];
    });
    
    console.log('Saving result...');
    await clean.writeAsync('assets/rocket_banner_final.png');
    console.log('Success');
}

fixAlpha().catch(console.error);
