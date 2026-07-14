#!/usr/bin/env node
/**
 * Generate all website icons from the official ZYRCA app icon.
 * Run: node scripts/generate-icons.mjs
 */

import sharp from "sharp";
import { mkdir, access, copyFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const UPLOADS = join(ROOT, "uploads");
const ASSETS = join(
  process.env.HOME || "/Users/drissbelhoussaine",
  ".cursor",
  "projects",
  "Users-drissbelhoussaine-Desktop-zyrca-privacy",
  "assets"
);

const OFFICIAL_ICON_NAME = "APP_.icon.-61cfc349-6f62-4bcf-a6a4-3b0bd2010a50.png";

const ICON_SIZES = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "favicon-64x64.png", size: 64 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
];

const BRAND = {
  purple: "#7C3AED",
  pink: "#FF6B9D",
  darkBg: "#050508",
};

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

function resizePipeline(source, size) {
  return sharp(source)
    .rotate()
    .resize(size, size, {
      fit: "cover",
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true });
}

async function resolveSourceIcon() {
  const candidates = [
    join(UPLOADS, "app-icon-512.png"),
    join(UPLOADS, "app-icon.png"),
    join(ASSETS, OFFICIAL_ICON_NAME),
    join(PUBLIC, "images/logo/app-icon-1024.png"),
    join(PUBLIC, "images/logo/app-icon-512.png"),
  ];

  for (const path of candidates) {
    if (await fileExists(path)) {
      return path;
    }
  }

  throw new Error(
    "Official ZYRCA icon not found. Place it at uploads/app-icon-512.png"
  );
}

async function generateIcons(sourcePath) {
  await ensureDir(join(PUBLIC, "icons"));
  await ensureDir(join(PUBLIC, "images/logo"));

  console.log(`Source: ${sourcePath.replace(ROOT, "")}\n`);

  for (const size of [512, 1024]) {
    const name = size === 512 ? "app-icon-512.png" : "app-icon-1024.png";
    await resizePipeline(sourcePath, size).toFile(
      join(PUBLIC, "images/logo", name)
    );
    console.log(`  ✓ /public/images/logo/${name}`);
  }

  await resizePipeline(sourcePath, 512).toFile(
    join(PUBLIC, "images/logo/logo.png")
  );
  console.log("  ✓ /public/images/logo/logo.png");

  console.log("\nFavicons & PWA icons:");
  for (const { name, size } of ICON_SIZES) {
    await resizePipeline(sourcePath, size).toFile(join(PUBLIC, "icons", name));
    console.log(`  ✓ /public/icons/${name}`);
  }

  await resizePipeline(sourcePath, 32).toFile(join(PUBLIC, "icons", "favicon.ico"));
  await resizePipeline(sourcePath, 32).toFile(join(PUBLIC, "favicon.ico"));
  console.log("  ✓ /public/icons/favicon.ico");
  console.log("  ✓ /public/favicon.ico");
}

async function generateOgImage(sourcePath) {
  const iconSize = 200;
  const iconBuffer = await resizePipeline(sourcePath, iconSize).toBuffer();

  const textSvg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${BRAND.darkBg}"/>
        <stop offset="50%" style="stop-color:#1A1025"/>
        <stop offset="100%" style="stop-color:#2D1B4E"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <circle cx="200" cy="150" r="200" fill="${BRAND.purple}" opacity="0.15"/>
    <circle cx="1000" cy="500" r="250" fill="${BRAND.pink}" opacity="0.1"/>
    <text x="330" y="255" font-family="system-ui, sans-serif" font-weight="700" font-size="64" fill="white">ZYRCA</text>
    <text x="330" y="305" font-family="system-ui, sans-serif" font-size="32" fill="${BRAND.pink}">Smart Fasting Tracker</text>
    <text x="330" y="375" font-family="system-ui, sans-serif" font-size="22" fill="#9CA3AF">Intermittent Fasting · Water Tracker · Intelligent Guidance</text>
  </svg>`);

  const iconTop = Math.round((630 - iconSize) / 2);
  const iconLeft = 100;

  await sharp(textSvg)
    .composite([{ input: iconBuffer, top: iconTop, left: iconLeft }])
    .png()
    .toFile(join(PUBLIC, "og-image.png"));

  console.log("  ✓ /public/og-image.png");
}

async function main() {
  console.log("Generating ZYRCA icons from official app icon...\n");

  await ensureDir(UPLOADS);

  const assetsIcon = join(ASSETS, OFFICIAL_ICON_NAME);
  if (
    (await fileExists(assetsIcon)) &&
    !(await fileExists(join(UPLOADS, "app-icon-512.png")))
  ) {
    await copyFile(assetsIcon, join(UPLOADS, "app-icon-512.png"));
    console.log("  ✓ Archived official icon to uploads/app-icon-512.png\n");
  }

  const sourcePath = await resolveSourceIcon();

  await generateIcons(sourcePath);

  console.log("\nOG Image:");
  await generateOgImage(sourcePath);

  console.log("\nDone! Official ZYRCA icons generated.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
