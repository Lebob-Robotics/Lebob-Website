import crypto from "node:crypto";
import path from "node:path";
import { promises as fs } from "node:fs";

import sharp from "sharp";

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const defaultOutputDirName = "_img";
const generatedDir = path.join(projectRoot, "src", "generated");
const manifestPath = path.join(generatedDir, "image-variants.json");

const sourceFolders = ["media", "members"];
const sourceFiles = ["lebob.png"];
const rasterExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const variantWidths = [64, 96, 160, 240, 320, 480, 640, 768, 960, 1200, 1600, 2048];

function sanitizePathSegment(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "local";
}

function currentUserTag() {
  if (process.env.SUDO_USER) {
    return sanitizePathSegment(process.env.SUDO_USER);
  }

  if (process.env.USER) {
    return sanitizePathSegment(process.env.USER);
  }

  if (process.env.LOGNAME) {
    return sanitizePathSegment(process.env.LOGNAME);
  }

  if (typeof process.getuid === "function") {
    return `uid-${process.getuid()}`;
  }

  return "local";
}

function hasErrorCode(error, code) {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === code);
}

function isPermissionError(error) {
  return hasErrorCode(error, "EACCES") || hasErrorCode(error, "EPERM");
}

function asPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function toUrlPath(parts) {
  return `/${parts.map((part) => encodeURIComponent(part)).join("/")}`;
}

function keyForPublicFile(absolutePath) {
  const relativePath = asPosix(path.relative(publicDir, absolutePath));
  return toUrlPath(relativePath.split("/"));
}

function variantFileName(relativeSourcePath, width) {
  const parsed = path.parse(relativeSourcePath);
  const safeBase =
    parsed.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "image";
  const hash = crypto
    .createHash("sha1")
    .update(relativeSourcePath)
    .digest("hex")
    .slice(0, 8);

  return `${safeBase}-${hash}-${width}.webp`;
}

async function walkDir(absoluteDir) {
  const entries = await fs.readdir(absoluteDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(absoluteDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkDir(absolutePath)));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
}

async function collectSourceImages() {
  const images = [];

  for (const folder of sourceFolders) {
    const absoluteFolder = path.join(publicDir, folder);

    try {
      const files = await walkDir(absoluteFolder);
      files.forEach((absolutePath) => {
        const ext = path.extname(absolutePath).toLowerCase();
        if (rasterExtensions.has(ext)) {
          images.push(absolutePath);
        }
      });
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
        continue;
      }
      throw error;
    }
  }

  for (const file of sourceFiles) {
    const absoluteFile = path.join(publicDir, file);
    try {
      const stat = await fs.stat(absoluteFile);
      if (!stat.isFile()) {
        continue;
      }

      const ext = path.extname(absoluteFile).toLowerCase();
      if (rasterExtensions.has(ext)) {
        images.push(absoluteFile);
      }
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
        continue;
      }
      throw error;
    }
  }

  return images.sort((a, b) => a.localeCompare(b));
}

function widthsForSource(sourceWidth) {
  const widths = variantWidths.filter((width) => width < sourceWidth);

  if (widths.length === 0) {
    return [sourceWidth];
  }

  if (!widths.includes(sourceWidth) && sourceWidth <= 2560) {
    widths.push(sourceWidth);
  }

  return widths;
}

async function createVariantsForImage(absoluteSourcePath, activeOutputDir) {
  const metadata = await sharp(absoluteSourcePath).rotate().metadata();
  if (!metadata.width || !metadata.height) {
    return null;
  }

  const sourceWidth = metadata.width;
  const sourceHeight = metadata.height;
  const sourceKey = keyForPublicFile(absoluteSourcePath);
  const relativeSourcePath = asPosix(path.relative(publicDir, absoluteSourcePath));
  const sourceFolder = path.dirname(relativeSourcePath);
  const outputFolder = path.join(activeOutputDir, sourceFolder);

  await fs.mkdir(outputFolder, { recursive: true });

  const variants = [];

  for (const width of widthsForSource(sourceWidth)) {
    const outputFileName = variantFileName(relativeSourcePath, width);
    const absoluteOutputPath = path.join(outputFolder, outputFileName);

    const info = await sharp(absoluteSourcePath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width > 1400 ? 72 : 78 })
      .toFile(absoluteOutputPath);

    const relativeVariantPath = asPosix(path.relative(publicDir, absoluteOutputPath));
    variants.push({
      src: toUrlPath(relativeVariantPath.split("/")),
      width: info.width ?? width,
      height: info.height ?? Math.round((sourceHeight * width) / sourceWidth),
    });
  }

  variants.sort((a, b) => a.width - b.width);

  return [
    sourceKey,
    {
      width: sourceWidth,
      height: sourceHeight,
      variants,
    },
  ];
}

async function clearAndCreateOutputDir(absoluteDir) {
  await fs.rm(absoluteDir, { recursive: true, force: true });
  await fs.mkdir(absoluteDir, { recursive: true });
}

async function resolveOutputDir() {
  const defaultOutputDir = path.join(publicDir, defaultOutputDirName);

  try {
    await clearAndCreateOutputDir(defaultOutputDir);
    return { outputDir: defaultOutputDir, didFallback: false };
  } catch (error) {
    if (!isPermissionError(error)) {
      throw error;
    }
  }

  const fallbackOutputDirName = `${defaultOutputDirName}-${currentUserTag()}`;
  const fallbackOutputDir = path.join(publicDir, fallbackOutputDirName);
  await clearAndCreateOutputDir(fallbackOutputDir);

  return { outputDir: fallbackOutputDir, didFallback: true };
}

async function main() {
  const { outputDir, didFallback } = await resolveOutputDir();
  await fs.mkdir(generatedDir, { recursive: true });

  if (didFallback) {
    console.warn(
      `image variants: default output dir "${defaultOutputDirName}" is not writable, using "${path.basename(
        outputDir,
      )}" instead`,
    );
  }

  const sourceImages = await collectSourceImages();
  const manifestEntries = {};

  for (const sourceImage of sourceImages) {
    const entry = await createVariantsForImage(sourceImage, outputDir);
    if (!entry) {
      continue;
    }

    const [key, value] = entry;
    manifestEntries[key] = value;
  }

  await fs.writeFile(manifestPath, `${JSON.stringify(manifestEntries, null, 2)}\n`);

  console.log(
    `image variants: generated ${Object.keys(manifestEntries).length} entries in ${asPosix(
      path.relative(projectRoot, outputDir),
    )}`,
  );
}

main().catch((error) => {
  console.error("image variants: failed", error);
  process.exit(1);
});
