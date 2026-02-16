import Link from "next/link";
import {
  Download,
  ExternalLink,
  File,
  FileImage,
  FileText,
  Film,
  Music2,
} from "lucide-react";

import type { DocumentItem } from "@/lib/docs-data";

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov", "m4v", "ogg"]);
const AUDIO_EXTENSIONS = new Set(["mp3", "wav", "m4a", "aac", "ogg", "flac"]);

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

function fileIcon(extension: string) {
  const ext = extension.toLowerCase();

  if (IMAGE_EXTENSIONS.has(ext)) {
    return <FileImage className="h-4 w-4" />;
  }

  if (VIDEO_EXTENSIONS.has(ext)) {
    return <Film className="h-4 w-4" />;
  }

  if (AUDIO_EXTENSIONS.has(ext)) {
    return <Music2 className="h-4 w-4" />;
  }

  if (ext === "pdf" || ext === "txt" || ext === "md") {
    return <FileText className="h-4 w-4" />;
  }

  return <File className="h-4 w-4" />;
}

export function DocsFileList({
  items,
  emptyMessage,
  showSection = true,
}: DocsFileListProps) {
  if (items.length === 0) {
    return (
      <div className="docs2-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`docs2-list-shell ${showSection ? "" : "is-no-section"}`}>
      <div className="docs2-list-header">
        <span>Document</span>
        {showSection ? <span>Section</span> : null}
        <span>Actions</span>
      </div>

      <div className="docs2-list">
        {items.map((item) => {
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
  );
}
