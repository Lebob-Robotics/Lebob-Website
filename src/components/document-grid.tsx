"use client";

import {
  Download,
  ExternalLink,
  File,
  FileImage,
  FileText,
  Film,
  Music2,
} from "lucide-react";
import { addBasePath } from "next/dist/client/add-base-path";

export type DocumentItem = {
  fileName: string;
  label: string;
  extension: string;
  relativePath: string;
};

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov", "m4v", "ogg"]);
const AUDIO_EXTENSIONS = new Set(["mp3", "wav", "m4a", "aac", "ogg", "flac"]);
const WORD_EXTENSIONS = new Set(["doc", "docx"]);

type DocumentGridProps = {
  items: DocumentItem[];
};

function documentSrc(relativePath: string): string {
  const encodedPath = relativePath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return addBasePath(`/documents/${encodedPath}`);
}

function extensionBadge(extension: string): string {
  return extension ? extension.toUpperCase() : "FILE";
}

function isWordDocument(extension: string): boolean {
  return WORD_EXTENSIONS.has(extension.toLowerCase());
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

export function DocumentGrid({ items }: DocumentGridProps) {
  return (
    <div className="doc-grid">
      {items.map((item) => {
        const isWord = isWordDocument(item.extension);
        const src = documentSrc(item.relativePath);

        return (
          <article
            key={item.relativePath}
            className="doc-card card-hover"
          >
            <a
              href={src}
              {...(isWord ? { download: item.fileName } : { target: "_blank", rel: "noreferrer" })}
              className="doc-link"
              aria-label={`${isWord ? "Download" : "Open"} ${item.label}`}
            >
              <div className="doc-head">
                <div className="doc-ext">
                  {fileIcon(item.extension)}
                  {extensionBadge(item.extension)}
                </div>
              </div>
              <div className="doc-meta">
                <p className="doc-title">{item.label}</p>
                <p className="doc-file">{item.fileName}</p>
              </div>
            </a>

            <div className="doc-actions">
              <div className="doc-action-row">
                {!isWord ? (
                  <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="doc-action"
                  >
                    Open
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
                <a
                  href={src}
                  download={item.fileName}
                  className="doc-action"
                >
                  Download
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
