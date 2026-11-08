const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const variants = [
  {
    id: 'cinetrio-v1-sunset',
    title: 'Neon Sunset Ribbon (Crimson to Violet & Amber)',
    w: 1200,
    h: 360,
    svg: `<svg width="1200" height="360" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v1-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff0055"/>
          <stop offset="50%" stop-color="#9d00ff"/>
          <stop offset="100%" stop-color="#ff6600"/>
        </linearGradient>
        <linearGradient id="v1-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff0055"/>
          <stop offset="100%" stop-color="#9d00ff"/>
        </linearGradient>
        <filter id="v1-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="1200" height="360" fill="#07070a"/>
      <!-- Glowing C Ribbon -->
      <g transform="translate(100, 75)" filter="url(#v1-glow)">
        <path d="M145 20 C 65 20, 20 65, 20 105 C 20 145, 65 190, 145 190 C 168 190, 185 180, 192 168 L 160 144 C 150 152, 138 156, 126 156 C 80 156, 58 128, 58 105 C 58 82, 80 54, 126 54 C 142 54, 155 60, 162 68 L 192 42 C 182 30, 165 20, 145 20 Z" fill="url(#v1-grad)"/>
        <!-- 3 Dynamic Speed Lines / Layers -->
        <path d="M46 72 L 90 52" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" opacity="0.9"/>
        <path d="M30 105 L 80 105" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round" opacity="0.98"/>
        <path d="M46 138 L 90 158" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" opacity="0.9"/>
      </g>
      <!-- Typography -->
      <g transform="translate(380, 130)">
        <text x="0" y="72" font-family="'Impact', 'Segoe UI', sans-serif" font-size="96" font-weight="900" letter-spacing="6" fill="#f8fafc">
          CINETRIO
        </text>
        <text x="6" y="112" font-family="'Segoe UI', Inter, sans-serif" font-size="15" font-weight="800" letter-spacing="12" fill="url(#v1-glow-grad)">
          THE CREATIVE AGENCY
        </text>
      </g>
    </svg>`
  },
  {
    id: 'cinetrio-v2-cyber-triad',
    title: 'Cyber Triad (Cyan, Violet & Crimson 3-Layer Ribbon)',
    w: 1200,
    h: 360,
    svg: `<svg width="1200" height="360" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v2-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00f5ff"/>
          <stop offset="100%" stop-color="#0066ff"/>
        </linearGradient>
        <linearGradient id="v2-violet" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#d946ef"/>
          <stop offset="100%" stop-color="#8b5cf6"/>
        </linearGradient>
        <linearGradient id="v2-crimson" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ff1744"/>
          <stop offset="100%" stop-color="#c5002a"/>
        </linearGradient>
        <filter id="v2-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="1200" height="360" fill="#07070a"/>
      <!-- 3 Layered Ribbon Curves forming C -->
      <g transform="translate(105, 80)" filter="url(#v2-glow)">
        <!-- Top Arc: Cyan (AI & Code) -->
        <path d="M145 22 C 85 22, 42 55, 28 92 L 60 102 C 68 76, 100 54, 138 54 C 152 54, 165 58, 172 65 L 195 42 C 182 30, 165 22, 145 22 Z" fill="url(#v2-cyan)"/>
        <!-- Mid Ribbon: Violet (Creative & Motion) -->
        <path d="M22 105 C 22 108, 22 112, 23 115 L 57 115 C 56 112, 56 108, 56 105 C 56 102, 56 98, 57 95 L 23 95 C 22 98, 22 102, 22 105 Z" fill="#ffffff"/>
        <!-- Bottom Arc: Crimson (Commerce & Growth) -->
        <path d="M28 118 C 42 155, 85 188, 145 188 C 165 188, 182 180, 195 168 L 172 145 C 165 152, 152 156, 138 156 C 100 156, 68 134, 60 108 L 28 118 Z" fill="url(#v2-crimson)"/>
        <!-- 3 Accent Lasers -->
        <line x1="48" y1="74" x2="95" y2="52" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="30" y1="105" x2="80" y2="105" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
        <line x1="48" y1="136" x2="95" y2="158" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      </g>
      <!-- Typography -->
      <g transform="translate(380, 130)">
        <text x="0" y="72" font-family="'Impact', 'Segoe UI', sans-serif" font-size="96" font-weight="900" letter-spacing="6" fill="#f8fafc">
          CINE<tspan fill="#00f5ff">TRIO</tspan>
        </text>
        <text x="6" y="112" font-family="'Segoe UI', Inter, sans-serif" font-size="15" font-weight="800" letter-spacing="12" fill="#d946ef">
          AI • MEDIA • COMMERCE
        </text>
      </g>
    </svg>`
  },
  {
    id: 'cinetrio-v3-titanium-crimson',
    title: 'Titanium & Liquid Crimson (Ultra-Luxury Prestige)',
    w: 1200,
    h: 360,
    svg: `<svg width="1200" height="360" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v3-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="35%" stop-color="#94a3b8"/>
          <stop offset="70%" stop-color="#cbd5e1"/>
          <stop offset="100%" stop-color="#334155"/>
        </linearGradient>
        <linearGradient id="v3-red" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff1e40"/>
          <stop offset="100%" stop-color="#b30018"/>
        </linearGradient>
        <filter id="v3-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="15" flood-color="#ff1e40" flood-opacity="0.65"/>
        </filter>
      </defs>
      <rect width="1200" height="360" fill="#08080c"/>
      <!-- Metallic Titanium C with Red Core -->
      <g transform="translate(100, 75)">
        <!-- Outer Metallic Body -->
        <path d="M145 20 C 65 20, 20 65, 20 105 C 20 145, 65 190, 145 190 C 168 190, 185 180, 192 168 L 160 144 C 150 152, 138 156, 126 156 C 80 156, 58 128, 58 105 C 58 82, 80 54, 126 54 C 142 54, 155 60, 162 68 L 192 42 C 182 30, 165 20, 145 20 Z" fill="url(#v3-metal)"/>
        <!-- Glowing Red Core Cuts -->
        <g filter="url(#v3-glow)">
          <path d="M46 72 L 90 52" stroke="url(#v3-red)" stroke-width="6" stroke-linecap="round"/>
          <path d="M30 105 L 80 105" stroke="url(#v3-red)" stroke-width="7" stroke-linecap="round"/>
          <path d="M46 138 L 90 158" stroke="url(#v3-red)" stroke-width="6" stroke-linecap="round"/>
        </g>
      </g>
      <!-- Typography -->
      <g transform="translate(380, 130)">
        <text x="0" y="72" font-family="'Impact', 'Segoe UI', sans-serif" font-size="96" font-weight="900" letter-spacing="6" fill="url(#v3-metal)">
          CINETRIO
        </text>
        <text x="6" y="112" font-family="'Segoe UI', Inter, sans-serif" font-size="15" font-weight="800" letter-spacing="12" fill="#ff1e40">
          STUDIO &amp; SYSTEMS
        </text>
      </g>
    </svg>`
  },
  {
    id: 'cinetrio-v4-electric-violet',
    title: 'Electric Violet & Cyan (High-Tech Creative Pulse)',
    w: 1200,
    h: 360,
    svg: `<svg width="1200" height="360" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v4-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#b026ff"/>
          <stop offset="50%" stop-color="#7000ff"/>
          <stop offset="100%" stop-color="#00e5ff"/>
        </linearGradient>
        <filter id="v4-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="18" flood-color="#b026ff" flood-opacity="0.75"/>
        </filter>
      </defs>
      <rect width="1200" height="360" fill="#060609"/>
      <!-- Glowing Violet/Cyan C -->
      <g transform="translate(100, 75)" filter="url(#v4-glow)">
        <path d="M145 20 C 65 20, 20 65, 20 105 C 20 145, 65 190, 145 190 C 168 190, 185 180, 192 168 L 160 144 C 150 152, 138 156, 126 156 C 80 156, 58 128, 58 105 C 58 82, 80 54, 126 54 C 142 54, 155 60, 162 68 L 192 42 C 182 30, 165 20, 145 20 Z" fill="url(#v4-grad)"/>
        <!-- 3 Electric White Slices -->
        <path d="M46 72 L 90 52" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M30 105 L 80 105" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M46 138 L 90 158" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      </g>
      <!-- Typography -->
      <g transform="translate(380, 130)">
        <text x="0" y="72" font-family="'Impact', 'Segoe UI', sans-serif" font-size="96" font-weight="900" letter-spacing="6" fill="#f8fafc">
          CINE<tspan fill="#b026ff">TRIO</tspan>
        </text>
        <text x="6" y="112" font-family="'Segoe UI', Inter, sans-serif" font-size="15" font-weight="800" letter-spacing="12" fill="#00e5ff">
          CREATIVE MEDIA &amp; AI
        </text>
      </g>
    </svg>`
  },
  {
    id: 'cinetrio-v5-gold-crimson',
    title: 'Royale Gold & Crimson (Cinema Prestige)',
    w: 1200,
    h: 360,
    svg: `<svg width="1200" height="360" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v5-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd700"/>
          <stop offset="45%" stop-color="#ffaa00"/>
          <stop offset="100%" stop-color="#ff2244"/>
        </linearGradient>
        <filter id="v5-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="15" flood-color="#ffaa00" flood-opacity="0.6"/>
        </filter>
      </defs>
      <rect width="1200" height="360" fill="#07070a"/>
      <!-- Glowing Gold / Crimson C -->
      <g transform="translate(100, 75)" filter="url(#v5-glow)">
        <path d="M145 20 C 65 20, 20 65, 20 105 C 20 145, 65 190, 145 190 C 168 190, 185 180, 192 168 L 160 144 C 150 152, 138 156, 126 156 C 80 156, 58 128, 58 105 C 58 82, 80 54, 126 54 C 142 54, 155 60, 162 68 L 192 42 C 182 30, 165 20, 145 20 Z" fill="url(#v5-gold)"/>
        <!-- 3 Crisp White Slices -->
        <path d="M46 72 L 90 52" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M30 105 L 80 105" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M46 138 L 90 158" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      </g>
      <!-- Typography -->
      <g transform="translate(380, 130)">
        <text x="0" y="72" font-family="'Impact', 'Segoe UI', sans-serif" font-size="96" font-weight="900" letter-spacing="6" fill="#f8fafc">
          CINETRIO
        </text>
        <text x="6" y="112" font-family="'Segoe UI', Inter, sans-serif" font-size="15" font-weight="800" letter-spacing="12" fill="#ffd700">
          PRODUCTIONS &amp; COMMERCE
        </text>
      </g>
    </svg>`
  },
  {
    id: 'cinetrio-v6-netflix-pure',
    title: 'Pure Netflix Crimson Master (Refined User Pick)',
    w: 1200,
    h: 360,
    svg: `<svg width="1200" height="360" viewBox="0 0 1200 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="v6-red" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff1a38"/>
          <stop offset="40%" stop-color="#e50914"/>
          <stop offset="100%" stop-color="#80000a"/>
        </linearGradient>
        <filter id="v6-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="18" flood-color="#e50914" flood-opacity="0.85"/>
        </filter>
      </defs>
      <rect width="1200" height="360" fill="#060608"/>
      <!-- Refined Red Ribbon C -->
      <g transform="translate(100, 75)" filter="url(#v6-glow)">
        <path d="M145 20 C 65 20, 20 65, 20 105 C 20 145, 65 190, 145 190 C 168 190, 185 180, 192 168 L 160 144 C 150 152, 138 156, 126 156 C 80 156, 58 128, 58 105 C 58 82, 80 54, 126 54 C 142 54, 155 60, 162 68 L 192 42 C 182 30, 165 20, 145 20 Z" fill="url(#v6-red)"/>
        <!-- 3 Sharp Laser Cuts -->
        <path d="M46 72 L 90 52" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M30 105 L 80 105" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M46 138 L 90 158" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      </g>
      <!-- Typography -->
      <g transform="translate(380, 130)">
        <text x="0" y="72" font-family="'Impact', 'Segoe UI', sans-serif" font-size="96" font-weight="900" letter-spacing="6" fill="#f8fafc">
          CINETRIO
        </text>
        <text x="6" y="112" font-family="'Segoe UI', Inter, sans-serif" font-size="15" font-weight="800" letter-spacing="12" fill="#e50914">
          THE CREATIVE AGENCY
        </text>
      </g>
    </svg>`
  }
];

const outDir = path.resolve('public/assets/logos/variations');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const v of variants) {
  const htmlPath = path.join(outDir, `${v.id}.html`);
  const pngPath = path.join(outDir, `${v.id}.png`);

  const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;overflow:hidden;background:#060608;">${v.svg}</body></html>`;
  fs.writeFileSync(htmlPath, html, 'utf8');

  try {
    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
    const cmd = `"${edgePath}" --headless --disable-gpu --screenshot="${pngPath}" --window-size=${v.w},${v.h} "${fileUrl}"`;
    execSync(cmd, { stdio: 'ignore' });
    console.log(`Rendered: ${v.id}.png (${fs.statSync(pngPath).size} bytes)`);
  } catch (err) {
    console.error(`Error rendering ${v.id}:`, err.message);
  }
}

