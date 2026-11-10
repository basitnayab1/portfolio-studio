// Builds Cinetrio brand images into public/assets:
//   og-image.jpg            social share card (1200x630) from cinetrio-logo.png
//   ahram-portrait.webp     monogram placeholder until Ahram's photo is added
//   faraz-portrait.webp     monogram placeholder until Faraz's photo is added
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

// ---- Monogram placeholders (transparent, bottom-anchored like a cutout) ----
const monogram = (initials, color, label) =>
  Buffer.from(`<svg width="900" height="1150" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="50%" cy="45%" r="50%">
        <stop offset="0" stop-color="${color}" stop-opacity="0.55"/>
        <stop offset="1" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#0b0b10" stop-opacity="0.9"/>
      </linearGradient>
    </defs>
    <circle cx="450" cy="520" r="430" fill="url(#glow)"/>
    <circle cx="450" cy="430" r="190" fill="url(#body)" stroke="${color}" stroke-opacity="0.8" stroke-width="4"/>
    <path d="M90 1150 C 110 830, 260 700, 450 700 C 640 700, 790 830, 810 1150 Z" fill="url(#body)" stroke="${color}" stroke-opacity="0.8" stroke-width="4"/>
    <text x="450" y="482" text-anchor="middle" font-family="Impact, 'Arial Narrow', sans-serif" font-size="150" fill="#f4f1ec" letter-spacing="6">${initials}</text>
    <text x="450" y="960" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="30" fill="#f4f1ec" fill-opacity="0.85" letter-spacing="10">${label}</text>
  </svg>`);

await sharp(monogram('AA', '#8b5cf6', 'VIDEO • MOTION')).webp({ quality: 88 }).toFile(`${OUT}/ahram-portrait.webp`);
await sharp(monogram('MF', '#10b981', 'E-COMMERCE')).webp({ quality: 88 }).toFile(`${OUT}/faraz-portrait.webp`);

console.log('images built');
