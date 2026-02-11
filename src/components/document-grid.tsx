import {
  Download,
  ExternalLink,
  File,
  FileImage,
  FileText,
  Film,
  Music2,
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

type DocumentGridProps = {
  items: DocumentItem[];
};

function documentSrc(fileName: string): string {
  return `../documents/${encodeURIComponent(fileName)}`;
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const isWord = isWordDocument(item.extension);
        const src = documentSrc(item.fileName);

        return (
          <article
            key={item.fileName}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 card-hover"
          >
            <a
              href={src}
              {...(isWord ? { download: item.fileName } : { target: "_blank", rel: "noreferrer" })}
              className="block text-left"
              aria-label={`${isWord ? "Download" : "Open"} ${item.label}`}
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
            </a>

            <div className="border-t border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                {!isWord ? (
                  <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white hover:bg-black/60"
                  >
                    Open
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
                <a
                  href={src}
                  download={item.fileName}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white hover:bg-black/60"
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
