import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { imageSizeFromFile } from "image-size/fromFile";

import { MediaGrid, type WallPhoto } from "@/components/media-grid";
import { getVariantDimensions, getVariantList, pickVariantForWidth } from "@/lib/image-variants";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Team Media | Lebob",
  description: "Lebob media wall.",
};

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v", ".ogg"]);

function fileLabel(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

function normalizeDimensions(
  width: number,
  height: number,
  orientation?: number,
): { width: number; height: number } {
  if (orientation && [5, 6, 7, 8].includes(orientation)) {
    return { width: height, height: width };
  }

  return { width, height };
}

async function getMediaWallData(): Promise<{ photos: WallPhoto[]; videoCount: number }> {
  const mediaDir = path.join(process.cwd(), "public", "media");

  try {
    const entries = await readdir(mediaDir, { withFileTypes: true });

    const imageEntries = entries.filter(
      (entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    );
    const videoCount = entries.filter(
      (entry) => entry.isFile() && VIDEO_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    ).length;

    const photoItems = await Promise.all(
      imageEntries.map(async (entry) => {
        const absolutePath = path.join(mediaDir, entry.name);
        const label = fileLabel(entry.name);
        const sourcePath = `/media/${encodeURIComponent(entry.name)}`;
        const variants = getVariantList(sourcePath);
        const previewVariant = pickVariantForWidth(sourcePath, 1200);
        const lightboxVariant = pickVariantForWidth(sourcePath, 2048);
        const thumbVariant = pickVariantForWidth(sourcePath, 240);
        const variantDimensions = getVariantDimensions(sourcePath);

        let width = variantDimensions?.width ?? 1600;
        let height = variantDimensions?.height ?? 1000;

        if (!variantDimensions) {
          try {
            const dimensions = await imageSizeFromFile(absolutePath);
            if (dimensions.width && dimensions.height) {
              const normalized = normalizeDimensions(
                dimensions.width,
                dimensions.height,
                dimensions.orientation,
              );
              width = normalized.width;
              height = normalized.height;
            }
          } catch {
            // Fallback dimensions keep the wall rendering even if metadata lookup fails.
          }
        }

        const layoutWidth = previewVariant?.width ?? width;
        const layoutHeight = previewVariant?.height ?? height;

        return {
          sortKey: sourcePath,
          photo: {
            src: previewVariant?.src ?? sourcePath,
            srcSet: variants.length > 0 ? variants : undefined,
            width: layoutWidth,
            height: layoutHeight,
            alt: label,
            title: label,
            label,
            fullSrc: lightboxVariant?.src ?? sourcePath,
            thumbSrc: thumbVariant?.src ?? sourcePath,
          } satisfies WallPhoto,
        };
      }),
    );

    photoItems.sort((a, b) =>
      a.sortKey.localeCompare(b.sortKey, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );

    const photos = photoItems.map((item) => item.photo);

    return { photos, videoCount };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return { photos: [], videoCount: 0 };
    }

    throw error;
  }
}

export default async function MediaPage() {
  const { photos, videoCount } = await getMediaWallData();

  return (
    <div className="sub-page">
      <main className="sub-main">
        <div className="sub-grid bg-grid" />
        <div className="sub-orb sub-orb-left" />
        <div className="sub-orb sub-orb-right" />

        <section className="sub-wrap">
          <Badge className="sub-badge animate-fade-up">
            Leob Media Wall
          </Badge>
          <h1 className="sub-title animate-fade-up delay-1">
            Lebob Media Wall
          </h1>

          <div className="sub-pill-row animate-fade-up delay-2">
            <span className="sub-pill">
              {photos.length} photos in the wall
            </span>
            {videoCount > 0 ? (
              <span className="sub-pill">
                {videoCount} video file(s) detected and excluded
              </span>
            ) : null}
          </div>

          {photos.length > 0 ? (
            <div className="sub-block animate-fade-up delay-3">
              <MediaGrid photos={photos} />
            </div>
          ) : (
            <div className="sub-empty animate-fade-up delay-3">
              <p className="sub-empty-title">No image files found yet.</p>
              <p className="sub-empty-copy">
                Add `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, or `.avif` files to{" "}
                <code className="sub-code">public/media</code> and refresh.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
