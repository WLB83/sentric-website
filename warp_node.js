const Jimp = require('jimp');

function getAdjugateMatrix(m) {
  return [
    m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4],
    m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5],
    m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]
  ];
}

function multiplyMatrixVector(m, v) {
  return [
    m[0]*v[0] + m[1]*v[1] + m[2]*v[2],
    m[3]*v[0] + m[4]*v[1] + m[5]*v[2],
    m[6]*v[0] + m[7]*v[1] + m[8]*v[2]
  ];
}

function basisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
  let m = [
    x1, x2, x3,
    y1, y2, y3,
     1,  1,  1
  ];
  let v = multiplyMatrixVector(getAdjugateMatrix(m), [x4, y4, 1]);
  return [
    v[0]*x1, v[1]*x2, v[2]*x3,
    v[0]*y1, v[1]*y2, v[2]*y3,
    v[0],    v[1],    v[2]
  ];
}

function general2DProjection(
  x1s, y1s, x1d, y1d,
  x2s, y2s, x2d, y2d,
  x3s, y3s, x3d, y3d,
  x4s, y4s, x4d, y4d
) {
  let s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s);
  let d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d);
  let m = [
    d[0], d[1], d[2],
    d[3], d[4], d[5],
    d[6], d[7], d[8]
  ];
  let adj_s = getAdjugateMatrix(s);
  return [
    m[0]*adj_s[0] + m[1]*adj_s[3] + m[2]*adj_s[6],
    m[0]*adj_s[1] + m[1]*adj_s[4] + m[2]*adj_s[7],
    m[0]*adj_s[2] + m[1]*adj_s[5] + m[2]*adj_s[8],
    m[3]*adj_s[0] + m[4]*adj_s[3] + m[5]*adj_s[6],
    m[3]*adj_s[1] + m[4]*adj_s[4] + m[5]*adj_s[7],
    m[3]*adj_s[2] + m[4]*adj_s[5] + m[5]*adj_s[8],
    m[6]*adj_s[0] + m[7]*adj_s[3] + m[8]*adj_s[6],
    m[6]*adj_s[1] + m[7]*adj_s[4] + m[8]*adj_s[7],
    m[6]*adj_s[2] + m[7]*adj_s[5] + m[8]*adj_s[8]
  ];
}

function project(m, x, y) {
  let v = [x, y, 1];
  let v2 = [
    m[0]*v[0] + m[1]*v[1] + m[2]*v[2],
    m[3]*v[0] + m[4]*v[1] + m[5]*v[2],
    m[6]*v[0] + m[7]*v[1] + m[8]*v[2]
  ];
  return [v2[0]/v2[2], v2[1]/v2[2]];
}

function getPixel(img, x, y) {
    if (x < 0) x = 0; if (y < 0) y = 0;
    if (x >= img.bitmap.width) x = img.bitmap.width - 1;
    if (y >= img.bitmap.height) y = img.bitmap.height - 1;
    let idx = (Math.floor(y) * img.bitmap.width + Math.floor(x)) << 2;
    return {
        r: img.bitmap.data[idx],
        g: img.bitmap.data[idx+1],
        b: img.bitmap.data[idx+2],
        a: img.bitmap.data[idx+3]
    };
}

function bilinear(img, x, y) {
    let x1 = Math.floor(x), y1 = Math.floor(y);
    let x2 = x1 + 1, y2 = y1 + 1;
    let dx = x - x1, dy = y - y1;
    
    let p11 = getPixel(img, x1, y1);
    let p21 = getPixel(img, x2, y1);
    let p12 = getPixel(img, x1, y2);
    let p22 = getPixel(img, x2, y2);
    
    let r = p11.r*(1-dx)*(1-dy) + p21.r*dx*(1-dy) + p12.r*(1-dx)*dy + p22.r*dx*dy;
    let g = p11.g*(1-dx)*(1-dy) + p21.g*dx*(1-dy) + p12.g*(1-dx)*dy + p22.g*dx*dy;
    let b = p11.b*(1-dx)*(1-dy) + p21.b*dx*(1-dy) + p12.b*(1-dx)*dy + p22.b*dx*dy;
    let a = p11.a*(1-dx)*(1-dy) + p21.a*dx*(1-dy) + p12.a*(1-dx)*dy + p22.a*dx*dy;
    
    return {r, g, b, a};
}

async function run() {
    const brands = ['global', 'rocket', 'colossus', 'maxtorm'];
    const basePath = 'assets/premium_battery_base.png';
    const baseImg = await Jimp.read(basePath);
    
    // Check if base has alpha channel and correctly interpret it.
    // Jimp inherently handles RGBA.

    for (let brand of brands) {
        const labelImg = await Jimp.read(`assets/labels/${brand}.png`);
        const lw = labelImg.bitmap.width;
        const lh = labelImg.bitmap.height;

        let invM = general2DProjection(
            390, 465, 0, 0,
            855, 385, lw, 0,
            855, 625, lw, lh,
            390, 755, 0, lh
        );

        let outImg = baseImg.clone();

        const minX = 390; const maxX = 855;
        const minY = 385; const maxY = 755;

        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                let [sx, sy] = project(invM, x, y);
                if (sx >= 0 && sx < lw && sy >= 0 && sy < lh) {
                    let {r, g, b, a} = bilinear(labelImg, sx, sy);
                    if (a > 0) {
                        let bg = Jimp.intToRGBA(baseImg.getPixelColor(x, y));
                        let alpha = a / 255;
                        
                        // Because the destination polygon edge might have jaggies, we can do some simple anti-aliasing
                        // For pure math mapping, if the pixel is inside it just applies.
                        
                        let outR = Math.round(r * alpha + bg.r * (1 - alpha));
                        let outG = Math.round(g * alpha + bg.g * (1 - alpha));
                        let outB = Math.round(b * alpha + bg.b * (1 - alpha));
                        let outA = Math.round(a + bg.a * (1 - alpha));
                        if(outA > 255) outA = 255;
                        
                        let color = Jimp.rgbaToInt(outR, outG, outB, outA);
                        outImg.setPixelColor(color, x, y);
                    }
                }
            }
        }
        
        await outImg.writeAsync(`assets/battery_${brand}_trans.png`);
        console.log(`Generated battery_${brand}_trans.png`);
    }
}
run().catch(console.error);
