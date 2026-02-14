"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { MasonryPhotoAlbum, type Photo } from "react-photo-album";

import { cn } from "@/lib/utils";

export type WallPhoto = Photo & {
  label: string;
};

type MediaGridProps = {
  photos: WallPhoto[];
};

export function MediaGrid({ photos }: MediaGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];
  const hasNavigation = photos.length > 1;

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index === null ? index : (index + 1) % photos.length));
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index === null ? index : (index - 1 + photos.length) % photos.length));
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, photos.length]);

  return (
    <>
      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <MasonryPhotoAlbum
          photos={photos}
          defaultContainerWidth={1200}
          columns={(containerWidth) => {
            if (containerWidth < 640) {
              return 1;
            }
            if (containerWidth < 1024) {
              return 2;
            }
            if (containerWidth < 1400) {
              return 3;
            }
            return 4;
          }}
          spacing={(containerWidth) => (containerWidth < 640 ? 10 : 14)}
          onClick={({ index }) => setActiveIndex(index)}
          componentsProps={{
            button: {
              className:
                "group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-white/5 card-hover",
            },
            image: {
              className: "transition-transform duration-500 group-hover:scale-[1.03]",
            },
          }}
          render={{
            extras: (_, { photo }) => (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-3">
                <p className="truncate text-sm font-medium text-white">{(photo as WallPhoto).label}</p>
              </div>
            ),
          }}
        />
      </section>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-50 bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.label}
          onClick={() => setActiveIndex(null)}
        >
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-white/15 bg-black/50 px-3 py-2 sm:px-5">
            <p className="truncate pr-3 text-sm text-slate-100">
              {activeIndex! + 1} / {photos.length} · {activePhoto.label}
            </p>
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="rounded-full border border-white/25 bg-black/60 p-2 text-white hover:bg-black/80"
              aria-label="Close fullscreen media"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute inset-0 flex items-center justify-center px-3 pb-24 pt-14 sm:px-8 sm:pb-32 sm:pt-16">
            <div className="relative h-full w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt ?? activePhoto.label}
                fill
                sizes="100vw"
                className="h-full w-full object-contain"
                priority
              />
            </div>
          </div>

          {hasNavigation ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex((index) =>
                  index === null ? index : (index - 1 + photos.length) % photos.length,
                );
              }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-black/60 p-2 text-white hover:bg-black/80 sm:left-5"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : null}

          {hasNavigation ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveIndex((index) =>
                  index === null ? index : (index + 1) % photos.length,
                );
              }}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-black/60 p-2 text-white hover:bg-black/80 sm:right-5"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : null}

          <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-black/55 px-3 py-3 sm:px-5">
            <p className="truncate text-center text-xs text-slate-200 sm:text-sm">
              Tip: use Left/Right arrow keys to move through the wall
            </p>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {photos.map((photo, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveIndex(index);
                    }}
                    className={cn(
                      "relative h-14 w-20 shrink-0 overflow-hidden rounded-md border",
                      isActive ? "border-emerald-300/80" : "border-white/20",
                    )}
                    aria-label={`View ${photo.label}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt ?? photo.label}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
