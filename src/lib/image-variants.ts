import imageVariants from "@/generated/image-variants.json";

type VariantImage = {
  src: string;
  width: number;
  height: number;
};

type VariantEntry = {
  width: number;
  height: number;
  variants: VariantImage[];
};

type VariantManifest = Record<string, VariantEntry>;

const manifest = imageVariants as VariantManifest;

function byWidthAscending(a: VariantImage, b: VariantImage) {
  return a.width - b.width;
}

export function getVariantEntry(sourcePath: string): VariantEntry | null {
  return manifest[sourcePath] ?? null;
}

export function getVariantDimensions(sourcePath: string): { width: number; height: number } | null {
  const entry = getVariantEntry(sourcePath);
  if (!entry) {
    return null;
  }

  return { width: entry.width, height: entry.height };
}

export function getVariantList(sourcePath: string): VariantImage[] {
  const entry = getVariantEntry(sourcePath);
  if (!entry || entry.variants.length === 0) {
    return [];
  }

  return [...entry.variants].sort(byWidthAscending);
}

export function pickVariantForWidth(sourcePath: string, targetWidth: number): VariantImage | null {
  const variants = getVariantList(sourcePath);
  if (variants.length === 0) {
    return null;
  }

  const candidate = variants
    .filter((variant) => variant.width <= targetWidth)
    .at(-1);

  return candidate ?? variants[0];
}
