import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ArrowUpRight, FileImage, Film } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Team Media | Lebob",
  description: "Team photos and videos for Lebob.",
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

type MediaItem = {
  fileName: string;
  label: string;
  type: "image" | "video";
};

function fileLabel(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

function mediaSrc(fileName: string): string {
  return `./${encodeURIComponent(fileName)}`;
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
            Team Media ({mediaItems.length})
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl animate-fade-up delay-1">
            Lebob Media Hub
          </h1>

          {mediaItems.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-up delay-3">
              {mediaItems.map((item) => (
                <article
                  key={item.fileName}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 card-hover"
                >
                  <div className="aspect-[4/3] bg-black/30">
                    {item.type === "image" ? (
                      <img
                        src={mediaSrc(item.fileName)}
                        alt={item.label}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <video
                        src={mediaSrc(item.fileName)}
                        className="h-full w-full object-cover"
                        controls
                        preload="metadata"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                    <p className="truncate text-sm font-medium text-white">
                      {item.label}
                    </p>
                    <span className="ml-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-xs text-slate-200">
                      {item.type === "image" ? (
                        <FileImage className="h-3.5 w-3.5" />
                      ) : (
                        <Film className="h-3.5 w-3.5" />
                      )}
                      {item.type === "image" ? "Photo" : "Video"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 animate-fade-up delay-3">
              <p className="text-xl font-semibold text-white">
                No media files found yet.
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Add photos/videos to{" "}
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
