#!/usr/bin/env node
/**
 * Integrate uploaded brand assets into the website.
 *
 * Place your files in the uploads/ folder:
 *   uploads/logo.png          — Official logo
 *   uploads/app-icon-512.png  — 512×512 app icon
 *   uploads/screenshots/dark/   — Dark mode screenshots
 *   uploads/screenshots/light/  — Light mode screenshots
 *
 * Run: npm run integrate-assets
 */

import sharp from "sharp";
import { mkdir, access, copyFile, readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const UPLOADS = join(ROOT, "uploads");
const PUBLIC = join(ROOT, "public");

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

async function copyIfExists(src, dest) {
  if (await fileExists(src)) {
    await ensureDir(dirname(dest));
    await copyFile(src, dest);
    console.log(`  ✓ Copied ${src.replace(ROOT, "")} → ${dest.replace(ROOT, "")}`);
    return true;
  }
  return false;
}

async function generateIconsFrom(sourcePath) {
  const iconSizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-48x48.png", size: 48 },
    { name: "favicon-64x64.png", size: 64 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
  ];

  await ensureDir(join(PUBLIC, "icons"));
  await ensureDir(join(PUBLIC, "images/logo"));

  const resize = (size) =>
    sharp(sourcePath)
      .rotate()
      .resize(size, size, { fit: "cover", kernel: sharp.kernel.lanczos3 })
      .png({ compressionLevel: 9, adaptiveFiltering: true });

  for (const size of [512, 1024]) {
    const name = size === 512 ? "app-icon-512.png" : "app-icon-1024.png";
    await resize(size).toFile(join(PUBLIC, "images/logo", name));
    console.log(`  ✓ Generated /public/images/logo/${name}`);
  }

  await resize(512).toFile(join(PUBLIC, "images/logo/logo.png"));
  console.log("  ✓ Generated /public/images/logo/logo.png");

  for (const { name, size } of iconSizes) {
    await resize(size).toFile(join(PUBLIC, "icons", name));
    console.log(`  ✓ Generated /public/icons/${name}`);
  }

  await resize(32).toFile(join(PUBLIC, "icons", "favicon.ico"));
  await resize(32).toFile(join(PUBLIC, "favicon.ico"));
  console.log("  ✓ Generated /public/icons/favicon.ico");
  console.log("  ✓ Generated /public/favicon.ico");
}

async function copyScreenshots(mode) {
  const srcDir = join(UPLOADS, "screenshots", mode);
  const destDir = join(PUBLIC, "images", "screenshots", mode);

  if (!(await fileExists(srcDir))) return;

  await ensureDir(destDir);
  const files = (await readdir(srcDir)).filter((f) =>
    /\.(png|jpg|jpeg|webp)$/i.test(f)
  );

  files.sort();
  for (let i = 0; i < files.length; i++) {
    const ext = files[i].split(".").pop();
    const dest = join(destDir, `screenshot-${i + 1}.${ext}`);
    await copyFile(join(srcDir, files[i]), dest);
    console.log(`  ✓ ${mode} screenshot ${i + 1}: ${files[i]}`);
  }
}

async function main() {
  console.log("Integrating uploaded ZYRCA assets...\n");

  let hasAssets = false;

  if (await copyIfExists(join(UPLOADS, "logo.png"), join(PUBLIC, "images/logo/logo.png"))) {
    hasAssets = true;
  }

  if (
    await copyIfExists(
      join(UPLOADS, "app-icon-512.png"),
      join(PUBLIC, "images/logo/app-icon-512.png")
    )
  ) {
    hasAssets = true;
    await generateIconsFrom(join(PUBLIC, "images/logo/app-icon-512.png"));
  } else if (await fileExists(join(PUBLIC, "images/logo/logo.png"))) {
    await generateIconsFrom(join(PUBLIC, "images/logo/logo.png"));
  }

  console.log("\nScreenshots:");
  await copyScreenshots("dark");
  await copyScreenshots("light");

  if (!hasAssets) {
    console.log(
      "\nNo files found in uploads/. Place assets in uploads/ and re-run."
    );
    console.log("Expected structure:");
    console.log("  uploads/logo.png");
    console.log("  uploads/app-icon-512.png");
    console.log("  uploads/screenshots/dark/*.png");
    console.log("  uploads/screenshots/light/*.png");
  } else {
    console.log("\nAssets integrated! Run npm run build to rebuild the site.");
  }
}

main().catch(console.error);
