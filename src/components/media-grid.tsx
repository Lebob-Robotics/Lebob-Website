"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, FileImage, Film, X } from "lucide-react";

export type MediaItem = {
  fileName: string;
  label: string;
  type: "image" | "video";
};

type MediaGridProps = {
  items: MediaItem[];
};

function mediaSrc(fileName: string): string {
  return `./${encodeURIComponent(fileName)}`;
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
              aria-label="Close fullscreen media"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/70 p-2 sm:p-4">
              {activeItem.type === "image" ? (
                <img
                  src={mediaSrc(activeItem.fileName)}
                  alt={activeItem.label}
                  className="max-h-[82vh] w-full object-contain"
                />
              ) : (
                <video
                  src={mediaSrc(activeItem.fileName)}
                  className="max-h-[82vh] w-full object-contain"
                  controls
                  autoPlay
                />
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
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

              <p className="px-3 text-center text-sm text-slate-200">{activeItem.label}</p>

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
