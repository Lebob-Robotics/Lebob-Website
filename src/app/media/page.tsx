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
    <div className="min-h-screen">
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-grid" />
        <div className="absolute -left-40 top-4 h-80 w-80 rounded-full bg-emerald-500/20 blur-[160px] animate-float" />
        <div className="absolute -right-32 top-14 h-80 w-80 rounded-full bg-sky-400/20 blur-[160px] animate-float delay-3" />

        <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-6 sm:px-10">
          <Button
            asChild
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/">
              Back to Home
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-14 sm:px-10">
          <Badge className="w-fit bg-white/10 text-white hover:bg-white/20 animate-fade-up">
            Leob Media Wall
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl animate-fade-up delay-1">
            Lebob Media Wall
          </h1>

          <div className="mt-5 flex flex-wrap gap-2 animate-fade-up delay-2">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-sm text-slate-100">
              {photos.length} photos in the wall
            </span>
            {videoCount > 0 ? (
              <span className="inline-flex items-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-sm text-slate-100">
                {videoCount} video file(s) detected and excluded
              </span>
            ) : null}
          </div>

          {photos.length > 0 ? (
            <div className="mt-8 animate-fade-up delay-3">
              <MediaGrid photos={photos} />
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 animate-fade-up delay-3">
              <p className="text-xl font-semibold text-white">No image files found yet.</p>
              <p className="mt-2 text-sm text-slate-300">
                Add `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, or `.avif` files to{" "}
                <code className="rounded bg-black/30 px-2 py-1">public/media</code> and refresh.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
