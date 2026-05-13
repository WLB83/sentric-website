const Jimp = require('jimp');

async function cleanText() {
    console.log("Loading image...");
    const img = await Jimp.read('assets/rocket_banner.png');
    
    // Helper to get rgba
    const getRgba = (color) => {
        return {
            r: (color >> 24) & 255,
            g: (color >> 16) & 255,
            b: (color >> 8) & 255,
            a: color & 255
        };
    };

    // Left Battery (Blue Label)
    const colorLeft = img.getPixelColor(200, 330);
    for (let y = 330; y < 410; y++) {
        for (let x = 120; x < 360; x++) {
            const p = getRgba(img.getPixelColor(x, y));
            // If it's not predominantly dark blue (i.e. it's yellow text or logo)
            if (p.r > 120 || p.g > 120) {
                img.setPixelColor(colorLeft, x, y);
            }
        }
    }
    
    // Middle Battery (Red Label)
    const colorMid = img.getPixelColor(550, 330);
    for (let y = 330; y < 410; y++) {
        for (let x = 430; x < 700; x++) {
            const p = getRgba(img.getPixelColor(x, y));
            // If it has significant green or blue (yellow text, blue logo parts)
            if (p.g > 100 || p.b > 100) {
                img.setPixelColor(colorMid, x, y);
            }
        }
    }
    
    // Right Battery (Green Label)
    const colorRight = img.getPixelColor(880, 330);
    for (let y = 330; y < 410; y++) {
        for (let x = 760; x < 1010; x++) {
            const p = getRgba(img.getPixelColor(x, y));
            // If it has significant red or blue (yellow text, red/blue logo parts)
            if (p.r > 130 || p.b > 130) {
                img.setPixelColor(colorRight, x, y);
            }
        }
    }
    
    console.log("Saving image...");
    await img.write('assets/rocket_banner.png');
    console.log("Done!");
}

cleanText().catch(console.error);
