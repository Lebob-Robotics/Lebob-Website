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
      <section className="media-shell">
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
              className: "media-tile card-hover",
            },
            image: {
              className: "media-tile-image",
            },
          }}
          render={{
            extras: (_, { photo }) => (
              <div className="media-cap">
                <p>{(photo as WallPhoto).label}</p>
              </div>
            ),
          }}
        />
      </section>

      {activePhoto ? (
        <div
          className="media-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.label}
          onClick={() => setActiveIndex(null)}
        >
          <div className="media-lightbox-bar">
            <p className="media-lightbox-title">
              {activeIndex! + 1} / {photos.length} · {activePhoto.label}
            </p>
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="media-close"
              aria-label="Close fullscreen media"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="media-stage">
            <div className="media-frame" onClick={(event) => event.stopPropagation()}>
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt ?? activePhoto.label}
                fill
                sizes="100vw"
                className="media-stage-image"
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
              className="media-nav media-nav-left"
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
              className="media-nav media-nav-right"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : null}

          <div className="media-foot">
            <p className="media-tip">
              Tip: use Left/Right arrow keys to move through the wall
            </p>
            <div className="media-thumbs">
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
                      "media-thumb",
                      isActive ? "is-active" : "",
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
