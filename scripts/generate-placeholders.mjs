#!/usr/bin/env node
/**
 * Generate placeholder screenshots until official screenshots are uploaded.
 * Icons are generated separately by generate-icons.mjs from the official app icon.
 * Run: node scripts/generate-placeholders.mjs
 */

import sharp from "sharp";
import { mkdir, access } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

const BRAND = {
  purple: "#7C3AED",
  pink: "#FF6B9D",
  dark: "#1A1025",
  darkBg: "#050508",
  light: "#F5F5F7",
  white: "#FFFFFF",
};

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function createScreenshotSvg(width, height, mode, label) {
  const isDark = mode === "dark";
  const bg = isDark ? BRAND.darkBg : BRAND.white;
  const card = isDark ? BRAND.dark : BRAND.light;
  const accent = BRAND.purple;
  const pink = BRAND.pink;

  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${bg}"/>
    <rect x="24" y="60" width="${width - 48}" height="80" rx="16" fill="${card}"/>
    <rect x="24" y="160" width="${(width - 56) / 2}" height="100" rx="12" fill="${card}"/>
    <rect x="${32 + (width - 56) / 2}" y="160" width="${(width - 56) / 2}" height="100" rx="12" fill="${card}"/>
    <rect x="24" y="280" width="${width - 48}" height="160" rx="16" fill="${card}"/>
    <circle cx="${width / 2}" cy="100" r="20" fill="${accent}" opacity="0.8"/>
    <rect x="60" y="200" width="60" height="8" rx="4" fill="${accent}" opacity="0.6"/>
    <rect x="60" y="220" width="40" height="6" rx="3" fill="${isDark ? '#9CA3AF' : '#6B7280'}" opacity="0.5"/>
    <rect x="40" y="310" width="${width - 80}" height="8" rx="4" fill="${pink}" opacity="0.5"/>
    <rect x="40" y="330" width="${width - 120}" height="8" rx="4" fill="${accent}" opacity="0.4"/>
    <rect x="40" y="350" width="${width - 100}" height="8" rx="4" fill="${accent}" opacity="0.3"/>
    <text x="${width / 2}" y="${height - 40}" text-anchor="middle"
      font-family="system-ui" font-size="14" fill="${isDark ? '#6B7280' : '#9CA3AF'}">${label}</text>
  </svg>`);
}

async function generatePng(svg, outputPath, width, height) {
  await sharp(svg).resize(width, height).png().toFile(outputPath);
  console.log(`  ✓ ${outputPath.replace(ROOT, "")}`);
}

async function main() {
  console.log("Generating screenshot placeholders (if missing)...\n");

  const dirs = [
    "images/screenshots/dark",
    "images/screenshots/light",
  ];
  for (const dir of dirs) {
    await ensureDir(join(PUBLIC, dir));
  }

  console.log("Screenshots:");
  for (const mode of ["dark", "light"]) {
    for (let i = 1; i <= 4; i++) {
      const path = join(PUBLIC, `images/screenshots/${mode}/screenshot-${i}.png`);
      if (!(await fileExists(path))) {
        const svg = createScreenshotSvg(390, 844, mode, `ZYRCA ${mode} — Screen ${i}`);
        await generatePng(svg, path, 390, 844);
      }
    }
  }

  console.log("\nDone! Icons are managed by scripts/generate-icons.mjs");
}

main().catch(console.error);
