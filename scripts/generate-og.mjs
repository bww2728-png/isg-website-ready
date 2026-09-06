/**
 * توليد صورة المشاركة (Open Graph) للأبعاد 1200x630.
 * يعتمد على sharp المثبتة ضمن node_modules.
 * التشغيل: node scripts/generate-og.mjs
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "..", "public");
mkdirSync(outDir, { recursive: true });

const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d2b4a"/>
      <stop offset="0.55" stop-color="#0a2540"/>
      <stop offset="1" stop-color="#071827"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.16" cy="0.14" r="0.7">
      <stop offset="0" stop-color="#2d4f7c" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#2d4f7c" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <circle cx="${W - 140}" cy="-80" r="300" fill="none" stroke="#c9a961" stroke-opacity="0.28" stroke-width="2"/>
  <circle cx="${W - 60}" cy="0" r="190" fill="none" stroke="#c9a961" stroke-opacity="0.18" stroke-width="1.5"/>

  <circle cx="180" cy="${H - 140}" r="230" fill="none" stroke="#c9a961" stroke-opacity="0.16" stroke-width="2"/>

  <circle cx="118" cy="118" r="64" fill="#0a2540" stroke="#c9a961" stroke-opacity="0.75" stroke-width="2.5"/>
  <text x="118" y="146" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="800">IS<tspan fill="#e8c97a">G</tspan></text>

  <text x="118" y="230" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="600" letter-spacing="7" fill="#c9a961">EXECUTIVE ADVISORY</text>

  <text x="118" y="380" font-family="Tahoma, Arial, sans-serif" font-size="62" font-weight="700" fill="#ffffff">بوابة الحلول المبتكرة</text>
  <text x="118" y="452" font-family="Tahoma, Arial, sans-serif" font-size="34" font-weight="400" fill="#c7d4e1">نبني شركات أقوى. ونجهزها للنمو والاستثمار.</text>

  <rect x="118" y="508" width="96" height="4" rx="2" fill="#c9a961"/>

  <text x="1148" y="${H - 40}" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="500" fill="#6d88a8">isg-advisory.com</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(path.join(outDir, "og-image.png"));

console.log("Generated public/og-image.png");