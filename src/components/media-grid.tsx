"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index + 1) % items.length);
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index - 1 + items.length) % items.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, items.length]);

  const showNavigation = items.length > 1;

  if (!activeItem) {
    return null;
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40">
        <div className="relative aspect-[16/9] bg-black/40">
          <img
            src={mediaSrc(activeItem.fileName)}
            alt={activeItem.label}
            className="h-full w-full object-contain"
          />
        </div>

        {showNavigation ? (
          <>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((index) => (index - 1 + items.length) % items.length)
              }
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/60 p-2 text-white hover:bg-black/80 sm:left-4"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((index) => (index + 1) % items.length)}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-black/60 p-2 text-white hover:bg-black/80 sm:right-4"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}

        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-2">
            {items.map((item, index) => (
              <button
                key={item.fileName}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={
                  index === activeIndex
                    ? "h-2.5 w-8 rounded-full bg-white"
                    : "h-2.5 w-2.5 rounded-full bg-white/40 hover:bg-white/70"
                }
                aria-label={`Go to ${item.label}`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-slate-200">{activeItem.label}</p>
    </>
  );
}
