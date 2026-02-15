"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { addBasePath } from "next/dist/client/add-base-path";
import { MasonryPhotoAlbum, type Photo } from "react-photo-album";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

export type WallPhoto = Photo & {
  label: string;
  fullSrc?: string;
  thumbSrc?: string;
};

type MediaGridProps = {
  photos: WallPhoto[];
};

function withBasePath(path: string): string {
  return path.startsWith("/") ? addBasePath(path) : path;
}

function withBasePathPhoto(photo: WallPhoto): WallPhoto {
  return {
    ...photo,
    src: withBasePath(photo.src),
    srcSet: photo.srcSet?.map((variant) => ({ ...variant, src: withBasePath(variant.src) })),
    fullSrc: photo.fullSrc ? withBasePath(photo.fullSrc) : undefined,
    thumbSrc: photo.thumbSrc ? withBasePath(photo.thumbSrc) : undefined,
  };
}

export function MediaGrid({ photos }: MediaGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const albumPhotos = useMemo(() => photos.map(withBasePathPhoto), [photos]);
  const activePhoto = activeIndex === null ? null : albumPhotos[activeIndex];
  const hasNavigation = albumPhotos.length > 1;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index === null ? index : (index + 1) % albumPhotos.length));
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index === null ? index : (index - 1 + albumPhotos.length) % albumPhotos.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, albumPhotos.length]);

  const lightbox = activePhoto ? (
    <div
      className="media-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={activePhoto.label}
      onClick={() => setActiveIndex(null)}
    >
      <div className="media-lightbox-bar">
        <p className="media-lightbox-title">
          {activeIndex! + 1} / {albumPhotos.length} · {activePhoto.label}
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
        {hasNavigation ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex((index) =>
                index === null ? index : (index - 1 + albumPhotos.length) % albumPhotos.length,
              );
            }}
            className="media-nav media-nav-left"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : null}

        <div className="media-frame" onClick={(event) => event.stopPropagation()}>
          <Image
            src={activePhoto.fullSrc ?? activePhoto.src}
            alt={activePhoto.alt ?? activePhoto.label}
            width={activePhoto.width}
            height={activePhoto.height}
            sizes="(max-width: 640px) 92vw, 90vw"
            className="media-stage-image"
            priority
          />
        </div>

        {hasNavigation ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveIndex((index) =>
                index === null ? index : (index + 1) % albumPhotos.length,
              );
            }}
            className="media-nav media-nav-right"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <div className="media-foot">
        <p className="media-tip">
          Tip: use Left/Right arrow keys to move through the wall
        </p>
        <div className="media-thumbs">
          {albumPhotos.map((photo, index) => {
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
                  src={photo.thumbSrc ?? photo.src}
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
  ) : null;

  return (
    <>
      <section className="media-shell">
        <MasonryPhotoAlbum
          photos={albumPhotos}
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

      {lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
}
