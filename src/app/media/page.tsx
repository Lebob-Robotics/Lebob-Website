import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MediaGrid, type MediaItem } from "@/components/media-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Image Gallery | Lebob",
  description: "Team photos for Lebob.",
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

async function getMediaItems(): Promise<MediaItem[]> {
  const mediaDir = path.join(process.cwd(), "public", "media");

  try {
    const entries = await readdir(mediaDir, { withFileTypes: true });

    const items: MediaItem[] = [];

    for (const entry of entries) {
      if (!entry.isFile()) {
        continue;
      }

      const ext = path.extname(entry.name).toLowerCase();

      if (IMAGE_EXTENSIONS.has(ext)) {
        items.push({
          fileName: entry.name,
          label: fileLabel(entry.name),
          type: "image",
        });
      } else if (VIDEO_EXTENSIONS.has(ext)) {
        items.push({
          fileName: entry.name,
          label: fileLabel(entry.name),
          type: "video",
        });
      }
    }

    return items.sort((a, b) =>
        a.fileName.localeCompare(b.fileName, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}

export default async function MediaPage() {
  const mediaItems = await getMediaItems();
  const imageItems = mediaItems.filter((item) => item.type === "image");

  return (
    <div className="min-h-screen">
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-grid" />
        <div className="absolute -left-40 top-4 h-80 w-80 rounded-full bg-emerald-500/20 blur-[160px] animate-float" />
        <div className="absolute -right-32 top-14 h-80 w-80 rounded-full bg-sky-400/20 blur-[160px] animate-float delay-3" />

        <div className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-10">
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
          <ThemeToggle />
        </div>

        <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-16 sm:px-10">
          <Badge className="w-fit bg-white/10 text-white hover:bg-white/20 animate-fade-up">
            Image Gallery ({imageItems.length})
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl animate-fade-up delay-1">
            Lebob Image Gallery
          </h1>

          {imageItems.length > 0 ? (
            <div className="mt-10 animate-fade-up delay-3">
              <MediaGrid items={imageItems} />
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 animate-fade-up delay-3">
              <p className="text-xl font-semibold text-white">No images found yet.</p>
              <p className="mt-2 text-sm text-slate-300">
                Add photos to{" "}
                <code className="rounded bg-black/30 px-2 py-1">
                  public/media
                </code>{" "}
                and refresh this page.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
