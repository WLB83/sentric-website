const Jimp = require('jimp');

async function processImage() {
    console.log("Loading image...");
    const img = await Jimp.read('assets/rocket_banner.png');
    console.log(`Dimensions: ${img.bitmap.width}x${img.bitmap.height}`);
}

processImage().catch(console.error);
