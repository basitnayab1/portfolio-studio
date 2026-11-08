const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const logos = [
  {
    name: 'cinetrio-concept-1-prism',
    w: 1200,
    h: 360,
    svg: `<svg width="1200" height="360" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="c1-red" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff3355"/>
          <stop offset="100%" stop-color="#990022"/>
        </linearGradient>
        <linearGradient id="c1-violet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#581c87"/>
        </linearGradient>
        <linearGradient id="c1-teal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#064e3b"/>
        </linearGradient>
        <filter id="c1-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="1200" height="360" fill="#08080c"/>
      <g transform="translate(100, 75)" filter="url(#c1-glow)">
        <polygon points="100,10 190,170 100,120" fill="url(#c1-red)" opacity="0.95"/>
        <polygon points="100,120 190,170 10,170" fill="url(#c1-violet)" opacity="0.9"/>
        <polygon points="100,10 100,120 10,170" fill="url(#c1-teal)" opacity="0.88"/>
        <polygon points="100,60 140,135 60,135" fill="#ffffff" opacity="0.25"/>
        <polygon points="92,85 118,100 92,115" fill="#ffffff"/>
      </g>
      <g transform="translate(370, 130)">
        <text x="0" y="70" font-family="'Segoe UI', Inter, sans-serif" font-size="82" font-weight="900" letter-spacing="4" fill="#ffffff">
          CINE<tspan fill="#ff3355">TRIO</tspan>
        </text>
        <text x="5" y="112" font-family="'Segoe UI', Inter, sans-serif" font-size="16" font-weight="700" letter-spacing="10" fill="#94a3b8">
          STUDIOS • AI • MEDIA • COMMERCE
        </text>
      </g>
    </svg>`
  },
  {
    name: 'cinetrio-concept-2-ribbon',
    w: 1200,
    h: 360,
    svg: `<svg width="1200" height="360" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="c2-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff1a3c"/>
          <stop offset="60%" stop-color="#e50914"/>
          <stop offset="100%" stop-color="#7a000b"/>
        </linearGradient>
        <filter id="c2-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="16" flood-color="#e50914" flood-opacity="0.6"/>
        </filter>
      </defs>
      <rect width="1200" height="360" fill="#08080c"/>
      <g transform="translate(100, 75)" filter="url(#c2-glow)">
        <path d="M140 20 C 65 20, 20 65, 20 105 C 20 145, 65 190, 140 190 C 160 190, 175 182, 180 170 L 150 148 C 142 155, 130 160, 120 160 C 76 160, 56 132, 56 105 C 56 78, 76 50, 120 50 C 135 50, 148 55, 155 62 L 180 40 C 170 30, 155 20, 140 20 Z" fill="url(#c2-grad)"/>
        <path d="M44 75 L 82 58" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" opacity="0.85"/>
        <path d="M30 105 L 72 105" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round" opacity="0.95"/>
        <path d="M44 135 L 82 152" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" opacity="0.85"/>
      </g>
      <g transform="translate(370, 130)">
        <text x="0" y="72" font-family="'Impact', 'Segoe UI', sans-serif" font-size="94" font-weight="900" letter-spacing="6" fill="#f8fafc">
          CINETRIO
        </text>
        <text x="6" y="112" font-family="'Segoe UI', Inter, sans-serif" font-size="15" font-weight="800" letter-spacing="12" fill="#e50914">
          THE CREATIVE AGENCY
        </text>
      </g>
    </svg>`
  },
  {
    name: 'cinetrio-concept-3-aperture',
    w: 1200,
    h: 360,
    svg: `<svg width="1200" height="360" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="c3-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff3355" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ff3355" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="360" fill="#08080c"/>
      <g transform="translate(200, 180)">
        <circle cx="0" cy="0" r="75" fill="none" stroke="#252536" stroke-width="5"/>
        <circle cx="0" cy="0" r="55" fill="url(#c3-glow)"/>
        <path d="M-16 -60 Q 45 -52, 32 0 Q 24 45, -35 32 Z" fill="#e50914" opacity="0.95"/>
        <path d="M45 -14 Q 48 42, 0 42 Q -42 32, -24 -30 Z" fill="#8b5cf6" opacity="0.9" transform="rotate(120)"/>
        <path d="M-30 32 Q -48 -16, 0 -38 Q 38 -24, 20 42 Z" fill="#10b981" opacity="0.9" transform="rotate(240)"/>
        <circle cx="0" cy="0" r="16" fill="#ffffff"/>
      </g>
      <g transform="translate(370, 130)">
        <text x="0" y="70" font-family="'Segoe UI', Inter, sans-serif" font-size="82" font-weight="900" letter-spacing="4" fill="#ffffff">
          CINE<tspan fill="#e50914">TRIO</tspan>
        </text>
        <text x="5" y="112" font-family="'Segoe UI', Inter, sans-serif" font-size="16" font-weight="700" letter-spacing="9" fill="#94a3b8">
          DIGITAL PRODUCTION &amp; TECH
        </text>
      </g>
    </svg>`
  },
  {
    name: 'cinetrio-concept-4-icon',
    w: 600,
    h: 600,
    svg: `<svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sq-red" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff3355"/>
          <stop offset="100%" stop-color="#990022"/>
        </linearGradient>
        <linearGradient id="sq-violet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#581c87"/>
        </linearGradient>
        <linearGradient id="sq-teal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#064e3b"/>
        </linearGradient>
        <filter id="sq-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="600" height="600" rx="80" fill="#08080c"/>
      <rect width="600" height="600" rx="80" fill="none" stroke="#222230" stroke-width="4"/>
      <g transform="translate(160, 100)" filter="url(#sq-glow)">
        <polygon points="140,20 270,240 140,170" fill="url(#sq-red)" opacity="0.95"/>
        <polygon points="140,170 270,240 10,240" fill="url(#sq-violet)" opacity="0.9"/>
        <polygon points="140,20 140,170 10,240" fill="url(#sq-teal)" opacity="0.88"/>
        <polygon points="140,90 195,190 85,190" fill="#ffffff" opacity="0.25"/>
        <polygon points="128,125 168,148 128,170" fill="#ffffff"/>
      </g>
      <text x="300" y="460" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="56" font-weight="900" letter-spacing="6" fill="#ffffff">
        CINE<tspan fill="#ff3355">TRIO</tspan>
      </text>
      <text x="300" y="505" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="16" font-weight="700" letter-spacing="10" fill="#94a3b8">
        AGENCY STUDIOS
      </text>
    </svg>`
  }
];

const outDir = path.resolve('public/assets/logos');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const logo of logos) {
  const htmlPath = path.join(outDir, `${logo.name}.html`);
  const pngPath = path.join(outDir, `${logo.name}.png`);

  const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;overflow:hidden;background:#08080c;">${logo.svg}</body></html>`;
  fs.writeFileSync(htmlPath, html, 'utf8');

  try {
    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
    const cmd = `"${edgePath}" --headless --disable-gpu --screenshot="${pngPath}" --window-size=${logo.w},${logo.h} "${fileUrl}"`;
    execSync(cmd, { stdio: 'ignore' });
    console.log(`Success: ${logo.name}.png (${fs.statSync(pngPath).size} bytes)`);
  } catch (err) {
    console.error(`Error ${logo.name}:`, err.message);
  }
}
