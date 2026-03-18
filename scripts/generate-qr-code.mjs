/**
 * Generates a fixed QR code for https://rokvilla.com
 * with the ROK logo embedded in the center.
 *
 * Outputs:
 *   public/qr/rokvilla-qr.svg
 *   public/qr/rokvilla-qr.png (1024x1024)
 *
 * Usage: node scripts/generate-qr-code.mjs
 */

import QRCode from "qrcode";
import sharp from "sharp";
import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT_DIR = join(ROOT, "public", "qr");
const LOGO_PATH = join(ROOT, "public", "logo", "rok-logo-black.png");

const TARGET_URL = "https://rokvilla.com";
const PNG_SIZE = 1024;
const QR_MARGIN = 2;

// Logo covers ~20% of the QR area (well within H-level 30% tolerance)
const LOGO_RATIO = 0.28;

async function generateSVG() {
  const svgString = await QRCode.toString(TARGET_URL, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: QR_MARGIN,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });

  // Parse SVG dimensions to embed the logo
  const viewBoxMatch = svgString.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (!viewBoxMatch) {
    throw new Error("Could not parse SVG viewBox");
  }

  const svgSize = parseInt(viewBoxMatch[1], 10);
  const logoSize = Math.round(svgSize * LOGO_RATIO);
  const logoOffset = Math.round((svgSize - logoSize) / 2);

  // Add white background rect behind logo + embedded logo image
  const logoBase64 = readFileSync(LOGO_PATH).toString("base64");

  const svgWithLogo = svgString.replace(
    "</svg>",
    `  <rect x="${logoOffset - 2}" y="${logoOffset - 2}" width="${logoSize + 4}" height="${logoSize + 4}" fill="white" rx="4"/>
  <image x="${logoOffset}" y="${logoOffset}" width="${logoSize}" height="${logoSize}" href="data:image/png;base64,${logoBase64}" preserveAspectRatio="xMidYMid meet"/>
</svg>`
  );

  mkdirSync(OUTPUT_DIR, { recursive: true });
  const outputPath = join(OUTPUT_DIR, "rokvilla-qr.svg");
  writeFileSync(outputPath, svgWithLogo);
  console.log(`SVG saved: ${outputPath}`);
}

async function generatePNG() {
  // Generate raw QR code as PNG buffer
  const qrBuffer = await QRCode.toBuffer(TARGET_URL, {
    type: "png",
    width: PNG_SIZE,
    errorCorrectionLevel: "H",
    margin: QR_MARGIN,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });

  // Resize logo to fit center
  const logoSize = Math.round(PNG_SIZE * LOGO_RATIO);
  const logoPadding = 8;
  const bgSize = logoSize + logoPadding * 2;
  const logoOffset = Math.round((PNG_SIZE - logoSize) / 2);
  const bgOffset = Math.round((PNG_SIZE - bgSize) / 2);

  // Trim whitespace from logo, then resize to fit the center area
  const resizedLogo = await sharp(LOGO_PATH)
    .trim()
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toBuffer();

  // Create white background square for logo
  const whiteBg = await sharp({
    create: {
      width: bgSize,
      height: bgSize,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 255 },
    },
  })
    .png()
    .toBuffer();

  // Composite: QR code + white bg + logo
  const result = await sharp(qrBuffer)
    .composite([
      { input: whiteBg, left: bgOffset, top: bgOffset },
      { input: resizedLogo, left: logoOffset, top: logoOffset },
    ])
    .png()
    .toBuffer();

  mkdirSync(OUTPUT_DIR, { recursive: true });
  const outputPath = join(OUTPUT_DIR, "rokvilla-qr.png");
  writeFileSync(outputPath, result);
  console.log(`PNG saved: ${outputPath} (${PNG_SIZE}x${PNG_SIZE})`);
}

async function main() {
  console.log(`Generating QR code for: ${TARGET_URL}`);
  console.log(`Error correction: H (30% — supports center logo)`);
  console.log(`Logo: ${LOGO_PATH}\n`);

  await generateSVG();
  await generatePNG();

  console.log("\nDone! Files are in public/qr/");
  console.log("These QR codes are permanently fixed to https://rokvilla.com");
}

main().catch((err) => {
  console.error("Error generating QR code:", err);
  process.exit(1);
});
