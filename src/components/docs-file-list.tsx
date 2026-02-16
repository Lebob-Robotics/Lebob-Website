"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Download,
  ExternalLink,
  File,
  FileImage,
  FileText,
  Film,
  Music2,
  Search,
  X,
} from "lucide-react";

import type { DocumentItem } from "@/lib/docs-data";

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov", "m4v", "ogg"]);
const AUDIO_EXTENSIONS = new Set(["mp3", "wav", "m4a", "aac", "ogg", "flac"]);
const DOCUMENT_EXTENSIONS = new Set([
  "pdf",
  "txt",
  "md",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "csv",
]);

type FileCategory = "document" | "image" | "video" | "audio" | "other";

type DocsFileListProps = {
  items: DocumentItem[];
  emptyMessage: string;
  showSection?: boolean;
};

function documentHref(relativePath: string): string {
  const encodedPath = relativePath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `/documents/${encodedPath}`;
}

function fileSection(relativePath: string): string {
  const parts = relativePath.split("/");
  if (parts.length < 2) {
    return "General";
  }

  const raw = parts[0] ?? "General";
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function fileCategory(extension: string): FileCategory {
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

  if (DOCUMENT_EXTENSIONS.has(ext)) {
    return "document";
  }

  return "other";
}

function fileIcon(extension: string) {
  const category = fileCategory(extension);

  if (category === "image") {
    return <FileImage className="h-4 w-4" />;
  }

  if (category === "video") {
    return <Film className="h-4 w-4" />;
  }

  if (category === "audio") {
    return <Music2 className="h-4 w-4" />;
  }

  if (category === "document") {
    return <FileText className="h-4 w-4" />;
  }

  return <File className="h-4 w-4" />;
}

function categoryLabel(category: FileCategory): string {
  switch (category) {
    case "document":
      return "Documents";
    case "image":
      return "Images";
    case "video":
      return "Videos";
    case "audio":
      return "Audio";
    default:
      return "Other";
  }
}

export function DocsFileList({
  items,
  emptyMessage,
  showSection = true,
}: DocsFileListProps) {
  const [query, setQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | FileCategory>("all");

  const normalizedQuery = query.trim().toLowerCase();

  const availableSections = useMemo(() => {
    const uniqueSections = new Set(items.map((item) => fileSection(item.relativePath)));
    return Array.from(uniqueSections).sort((a, b) =>
      a.localeCompare(b, undefined, {
        sensitivity: "base",
      }),
    );
  }, [items]);

  const sectionCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const item of items) {
      const section = fileSection(item.relativePath);
      counts.set(section, (counts.get(section) ?? 0) + 1);
    }

    return counts;
  }, [items]);

  const categoryCounts = useMemo(() => {
    const counts: Record<FileCategory, number> = {
      document: 0,
      image: 0,
      video: 0,
      audio: 0,
      other: 0,
    };

    for (const item of items) {
      counts[fileCategory(item.extension)] += 1;
    }

    return counts;
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const itemSection = fileSection(item.relativePath);
      const itemCategory = fileCategory(item.extension);

      if (showSection && sectionFilter !== "all" && itemSection !== sectionFilter) {
        return false;
      }

      if (categoryFilter !== "all" && itemCategory !== categoryFilter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchable = `${item.label} ${item.fileName} ${item.relativePath}`.toLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [items, normalizedQuery, showSection, sectionFilter, categoryFilter]);

  const hasFilters =
    normalizedQuery.length > 0 || sectionFilter !== "all" || categoryFilter !== "all";

  function clearFilters() {
    setQuery("");
    setSectionFilter("all");
    setCategoryFilter("all");
  }

  if (items.length === 0) {
    return (
      <div className="docs2-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="docs2-list-tools">
        <div className="docs2-search">
          <Search className="h-4 w-4" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by file name or keyword"
            aria-label="Search documents"
          />
        </div>

        <div className="docs2-filter-row">
          {showSection && availableSections.length > 1 ? (
            <label className="docs2-filter">
              <span>Section</span>
              <select
                value={sectionFilter}
                onChange={(event) => setSectionFilter(event.target.value)}
              >
                <option value="all">All sections ({items.length})</option>
                {availableSections.map((section) => {
                  const count = sectionCounts.get(section) ?? 0;

                  return (
                    <option key={section} value={section}>
                      {section} ({count})
                    </option>
                  );
                })}
              </select>
            </label>
          ) : null}

          <label className="docs2-filter">
            <span>Type</span>
            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value as "all" | FileCategory)
              }
            >
              <option value="all">All types ({items.length})</option>
              {Object.entries(categoryCounts).map(([category, count]) => (
                <option key={category} value={category}>
                  {categoryLabel(category as FileCategory)} ({count})
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            className="docs2-filter-reset"
            disabled={!hasFilters}
          >
            <X className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>

        <p className="docs2-list-summary" aria-live="polite">
          Showing {filteredItems.length} of {items.length} files
        </p>
      </div>

      {filteredItems.length === 0 ? (
        <div className="docs2-empty">
          <p>No files match your search or filter settings.</p>
          {hasFilters ? (
            <button type="button" onClick={clearFilters} className="docs2-empty-action">
              Clear filters
            </button>
          ) : null}
        </div>
      ) : (
        <div className={`docs2-list-shell ${showSection ? "" : "is-no-section"}`}>
          <div className="docs2-list-header">
            <span>Document</span>
            {showSection ? <span>Section</span> : null}
            <span>Actions</span>
          </div>

          <div className="docs2-list">
            {filteredItems.map((item) => {
              const href = documentHref(item.relativePath);

              return (
                <article
                  key={item.relativePath}
                  className={`docs2-row ${showSection ? "" : "is-no-section"}`}
                >
                  <div className="docs2-row-main">
                    <div className="docs2-row-icon">{fileIcon(item.extension)}</div>
                    <div>
                      <p className="docs2-row-title">{item.label}</p>
                      <p className="docs2-row-file">{item.fileName}</p>
                    </div>
                  </div>

                  {showSection ? (
                    <p className="docs2-row-section">{fileSection(item.relativePath)}</p>
                  ) : null}

                  <div className="docs2-row-actions">
                    <Link href={href} target="_blank" rel="noreferrer">
                      Open
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <Link href={href} download={item.fileName}>
                      Download
                      <Download className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
