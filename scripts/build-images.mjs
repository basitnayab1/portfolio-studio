// Builds Cinetrio brand images into public/assets:
//   og-image.jpg            social share card (1200x630) from cinetrio-logo.png
// Run: npm run images
import sharp from 'sharp';

const OUT = 'public/assets';

// ---- Social share image ----
const logo = await sharp(`${OUT}/cinetrio-logo.png`).resize(630, 630).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#07070a' } })
  .composite([
    { input: logo, left: 0, top: 0 },
    {
      input: Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#07070a" stop-opacity="0"/><stop offset="1" stop-color="#07070a"/></linearGradient></defs>
        <rect x="470" y="0" width="160" height="630" fill="url(#fade)"/>
        <text x="680" y="270" font-family="Impact, 'Arial Narrow', sans-serif" font-size="96" fill="#f4f1ec" letter-spacing="4">CINETRIO</text>
        <text x="686" y="322" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="24" fill="#ff3d5a" letter-spacing="12">STUDIOS • THE SERIES</text>
        <text x="686" y="396" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="17" fill="#a7a6ad" letter-spacing="3">AI &amp; FULL-STACK • VIDEO &amp; MOTION</text>
        <text x="686" y="426" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="17" fill="#a7a6ad" letter-spacing="3">E-COMMERCE GROWTH</text>
      </svg>`),
      left: 0,
      top: 0,
    },
  ])
  .jpeg({ quality: 86 })
  .toFile(`${OUT}/og-image.jpg`);

console.log('images built');
