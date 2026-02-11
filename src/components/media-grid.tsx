"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, FileImage, Film, X } from "lucide-react";
import { addBasePath } from "next/dist/client/add-base-path";

export type MediaItem = {
  fileName: string;
  label: string;
  type: "image" | "video";
};

type MediaGridProps = {
  items: MediaItem[];
};

function mediaSrc(fileName: string): string {
  return addBasePath(`/media/${encodeURIComponent(fileName)}`);
}

export function MediaGrid({ items }: MediaGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];

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
              aria-label={`Open ${item.label} fullscreen`}
            >
              <div className="relative aspect-[4/3] bg-black/30">
                {item.type === "image" ? (
                  <img
                    src={mediaSrc(item.fileName)}
                    alt={item.label}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <>
                    <video
                      src={mediaSrc(item.fileName)}
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/30" />
                  </>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                <p className="truncate text-sm font-medium text-white">{item.label}</p>
                <span className="ml-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-xs text-slate-200">
                  {item.type === "image" ? (
                    <FileImage className="h-3.5 w-3.5" />
                  ) : (
                    <Film className="h-3.5 w-3.5" />
                  )}
                  {item.type === "image" ? "Photo" : "Video"}
                </span>
              </div>
            </button>
          </article>
        ))}
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-50 bg-black"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.label}
          onClick={() => setActiveIndex(null)}
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="h-[100dvh] w-screen" onClick={(event) => event.stopPropagation()}>
              {activeItem.type === "image" ? (
                <img
                  src={mediaSrc(activeItem.fileName)}
                  alt={activeItem.label}
                  className="h-full w-full object-contain"
                />
              ) : (
                <video
                  src={mediaSrc(activeItem.fileName)}
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                />
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-3 top-3 z-20 rounded-full border border-white/25 bg-black/60 p-2 text-white hover:bg-black/80 sm:right-4 sm:top-4"
            aria-label="Close fullscreen media"
          >
            <X className="h-4 w-4" />
          </button>

          {showNavigation ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex((index) =>
                  index === null ? index : (index - 1 + items.length) % items.length,
                );
              }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-black/60 p-2 text-white hover:bg-black/80 sm:left-4"
              aria-label="Previous media"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : null}

          {showNavigation ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex((index) =>
                  index === null ? index : (index + 1) % items.length,
                );
              }}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-black/60 p-2 text-white hover:bg-black/80 sm:right-4"
              aria-label="Next media"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center px-3 sm:bottom-4">
            <p className="max-w-[92vw] truncate rounded-full border border-white/20 bg-black/60 px-3 py-1 text-center text-sm text-slate-100">
              {activeItem.label}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
