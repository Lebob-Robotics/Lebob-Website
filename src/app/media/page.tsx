import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { imageSizeFromFile } from "image-size/fromFile";

import { MediaGrid, type WallPhoto } from "@/components/media-grid";
import { getVariantDimensions, getVariantList, pickVariantForWidth } from "@/lib/image-variants";

export const metadata: Metadata = {
  title: "Media | Lebob",
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
    <div className="pf-page-bg">
      <main>
        <section className="pf-container pf-hero">
          <div className="pf-hero-grid">
            <div>
              <div className="pf-eyebrow">Media · gallery</div>
              <h1 className="pf-h1">
                Photos from the<span className="amp"> field.</span>
              </h1>
              <p className="pf-lede">
                Competition shots, build sessions, and prototype iterations. The season as
                it actually happened — Nikon and phone alike.
              </p>
              <div className="pf-pill-row" style={{ marginTop: "1.5rem" }}>
                <span className="pf-pill">{photos.length} photos</span>
                {videoCount > 0 ? (
                  <span className="pf-pill">{videoCount} video(s) excluded</span>
                ) : null}
              </div>
            </div>
            <aside className="pf-hero-aside">
              <div className="row"><span className="k">count</span> <span className="v">{photos.length.toString().padStart(3, "0")}</span></div>
              <div className="row"><span className="k">season</span> <span className="v">2025/26</span></div>
              <div className="row"><span className="k">format</span> <span className="v">jpg · png · webp</span></div>
              <div className="row"><span className="k">layout</span> <span className="v">masonry</span></div>
              <div className="row"><span className="k">status</span> <span className="acc">live</span></div>
            </aside>
          </div>
        </section>

        <section className="pf-container pf-section" id="gallery">
          <header className="pf-section-head">
            <span className="pf-section-num">01</span>
            <span>gallery</span>
            <span className="pf-section-dash" />
            <span>~/photos</span>
          </header>

          {photos.length > 0 ? (
            <MediaGrid photos={photos} />
          ) : (
            <div className="pf-rows">
              <div className="pf-row"><span>No image files found yet.</span></div>
              <div className="pf-row">
                <span>
                  Add files to <code className="pf-code">public/media</code> and refresh.
                </span>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="pf-footer">
        <div className="pf-container pf-footer-inner">
          <div className="who">Lebob FLL Robotics · Team #3236 · Perth Modern</div>
          <div>
            <a href="https://github.com/Lebob-Robotics" target="_blank" rel="noreferrer">
              github.com/Lebob-Robotics
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
