import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { imageSizeFromFile } from "image-size/fromFile";

import { MediaGrid, type WallPhoto } from "@/components/media-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

    const photos = await Promise.all(
      imageEntries.map(async (entry) => {
        const absolutePath = path.join(mediaDir, entry.name);
        const label = fileLabel(entry.name);

        let width = 1600;
        let height = 1000;

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

        return {
          src: `/media/${encodeURIComponent(entry.name)}`,
          width,
          height,
          alt: label,
          title: label,
          label,
        } satisfies WallPhoto;
      }),
    );

    photos.sort((a, b) =>
      a.src.localeCompare(b.src, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );

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

        <div className="sub-top">
          <Button
            asChild
            variant="outline"
            className="sub-back-btn"
          >
            <Link href="/">
              Back to Home
              <ArrowUpRight className="sub-icon" />
            </Link>
          </Button>
        </div>

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
