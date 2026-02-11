"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  File,
  FileImage,
  FileText,
  Film,
  Music2,
  X,
} from "lucide-react";

export type DocumentItem = {
  fileName: string;
  label: string;
  extension: string;
};

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov", "m4v", "ogg"]);
const AUDIO_EXTENSIONS = new Set(["mp3", "wav", "m4a", "aac", "ogg", "flac"]);
const WORD_EXTENSIONS = new Set(["doc", "docx"]);

type PreviewKind = "image" | "video" | "audio" | "word" | "embedded";

type DocumentGridProps = {
  items: DocumentItem[];
};

function documentSrc(fileName: string): string {
  return `../documents/${encodeURIComponent(fileName)}`;
}

function extensionBadge(extension: string): string {
  return extension ? extension.toUpperCase() : "FILE";
}

function previewKind(extension: string): PreviewKind {
  const ext = extension.toLowerCase();

  if (IMAGE_EXTENSIONS.has(ext)) {
    return "image";
  }

  if (VIDEO_EXTENSIONS.has(ext)) {
    return "video";
  }

  if (AUDIO_EXTENSIONS.has(ext)) {
    return "audio";
  }

  if (WORD_EXTENSIONS.has(ext)) {
    return "word";
  }

  return "embedded";
}

function fileIcon(extension: string) {
  const ext = extension.toLowerCase();

  if (IMAGE_EXTENSIONS.has(ext)) {
    return <FileImage className="h-3.5 w-3.5" />;
  }

  if (VIDEO_EXTENSIONS.has(ext)) {
    return <Film className="h-3.5 w-3.5" />;
  }

  if (AUDIO_EXTENSIONS.has(ext)) {
    return <Music2 className="h-3.5 w-3.5" />;
  }

  if (ext === "pdf" || ext === "txt" || ext === "md") {
    return <FileText className="h-3.5 w-3.5" />;
  }

  return <File className="h-3.5 w-3.5" />;
}

function wordPreviewSrc(fileName: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const absoluteDocumentUrl = new URL(documentSrc(fileName), window.location.href).href;
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    absoluteDocumentUrl,
  )}`;
}

export function DocumentGrid({ items }: DocumentGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];
  const activePreviewKind = activeItem ? previewKind(activeItem.extension) : null;
  const activeWordSrc =
    activeItem && activePreviewKind === "word"
      ? wordPreviewSrc(activeItem.fileName)
      : null;

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null ? index : (index + 1) % items.length,
        );
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null ? index : (index - 1 + items.length) % items.length,
        );
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, items.length]);

  const showNavigation = items.length > 1;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.fileName}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 card-hover"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="block w-full text-left"
              aria-label={`Open ${item.label} preview`}
            >
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-sky-500/20 via-white/5 to-emerald-500/10 px-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-slate-100">
                  {fileIcon(item.extension)}
                  {extensionBadge(item.extension)}
                </div>
              </div>
              <div className="border-t border-white/10 px-4 py-3">
                <p className="truncate text-sm font-medium text-white">{item.label}</p>
                <p className="mt-1 truncate text-xs text-slate-300">{item.fileName}</p>
              </div>
            </button>
          </article>
        ))}
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.label}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-0 top-0 z-10 rounded-full border border-white/20 bg-black/50 p-2 text-white hover:bg-black/70"
              aria-label="Close document preview"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/70 p-2 sm:p-4">
              {activePreviewKind === "image" ? (
                <img
                  src={documentSrc(activeItem.fileName)}
                  alt={activeItem.label}
                  className="max-h-[78vh] w-full object-contain"
                />
              ) : activePreviewKind === "video" ? (
                <video
                  src={documentSrc(activeItem.fileName)}
                  className="max-h-[78vh] w-full object-contain"
                  controls
                  autoPlay
                />
              ) : activePreviewKind === "audio" ? (
                <div className="flex min-h-[40vh] items-center justify-center">
                  <audio
                    src={documentSrc(activeItem.fileName)}
                    controls
                    autoPlay
                    className="w-full max-w-xl"
                  />
                </div>
              ) : activePreviewKind === "word" ? (
                <div className="space-y-2">
                  <iframe
                    src={activeWordSrc ?? documentSrc(activeItem.fileName)}
                    title={activeItem.label}
                    className="h-[78vh] w-full rounded-lg border border-white/10 bg-white"
                  />
                  <p className="text-xs text-slate-300">
                    Word preview uses Microsoft Office viewer and works best on
                    the deployed site.
                  </p>
                </div>
              ) : (
                <iframe
                  src={documentSrc(activeItem.fileName)}
                  title={activeItem.label}
                  className="h-[78vh] w-full rounded-lg border border-white/10 bg-white"
                />
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              {showNavigation ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((index) =>
                      index === null
                        ? index
                        : (index - 1 + items.length) % items.length,
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white hover:bg-black/60"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>
              ) : (
                <span />
              )}

              <div className="flex items-center gap-2">
                <a
                  href={documentSrc(activeItem.fileName)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white hover:bg-black/60"
                >
                  Open
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={documentSrc(activeItem.fileName)}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white hover:bg-black/60"
                >
                  Download
                  <Download className="h-4 w-4" />
                </a>
              </div>

              {showNavigation ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((index) =>
                      index === null ? index : (index + 1) % items.length,
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white hover:bg-black/60"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
