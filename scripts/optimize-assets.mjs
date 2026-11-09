import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const projectSourceDir = path.join(root, "public", "assets", "projects", "src");
const projectOutDir = path.join(root, "public", "assets", "projects");

const files = await readdir(projectSourceDir);

for (const file of files) {
  if (!file.endsWith(".svg")) continue;
  const input = path.join(projectSourceDir, file);
  const output = path.join(
    projectOutDir,
    `${path.basename(file, ".svg")}.webp`,
  );

  await sharp(input, { density: 144 })
    .resize(1200, 800)
    .webp({ quality: 84, effort: 5 })
    .toFile(output);

  console.log(`optimised ${file} -> ${path.basename(output)}`);
}

await sharp(path.join(root, "public", "assets", "og-source.svg"), {
  density: 144,
})
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "public", "og.png"));
console.log("optimised og-source.svg -> og.png");

const icon = await readFile(path.join(root, "src", "app", "icon.svg"));
await sharp(icon, { density: 300 })
  .resize(180, 180)
  .png()
  .toFile(path.join(root, "src", "app", "apple-icon.png"));
console.log("generated apple-icon.png");
