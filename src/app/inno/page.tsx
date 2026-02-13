import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DocumentGrid, type DocumentItem } from "@/components/document-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Team Documentation | Lebob",
  description: "Team documentation and file previews for Lebob.",
};

function fileLabel(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim();
}

function fileExtension(fileName: string): string {
  const extension = path.extname(fileName).toLowerCase();
  return extension.startsWith(".") ? extension.slice(1) : "";
}

async function getDocumentItems(): Promise<DocumentItem[]> {
  const documentsDir = path.join(process.cwd(), "public", "documents");

  try {
    const entries = await readdir(documentsDir, { withFileTypes: true });
    const items: DocumentItem[] = [];

    for (const entry of entries) {
      if (!entry.isFile()) {
        continue;
      }

      // Ignore hidden helper files such as .gitkeep
      if (entry.name.startsWith(".")) {
        continue;
      }

      items.push({
        fileName: entry.name,
        label: fileLabel(entry.name),
        extension: fileExtension(entry.name),
      });
    }

    return items.sort((a, b) =>
      a.fileName.localeCompare(b.fileName, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}

export default async function DocsPage() {
  const documentItems = await getDocumentItems();

  return (
    <div className="min-h-screen">
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-grid" />
        <div className="absolute -left-40 top-4 h-80 w-80 rounded-full bg-emerald-500/20 blur-[160px] animate-float" />
        <div className="absolute -right-32 top-14 h-80 w-80 rounded-full bg-sky-400/20 blur-[160px] animate-float delay-3" />

        <div className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-10">
          <Button
            asChild
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/">
              Back to Home
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-16 sm:px-10">
          <Badge className="w-fit bg-white/10 text-white hover:bg-white/20 animate-fade-up">
            Team Documentation ({documentItems.length})
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl animate-fade-up delay-1">
            Lebob Docs Center
          </h1>

          {documentItems.length > 0 ? (
            <div className="mt-10 animate-fade-up delay-3">
              <DocumentGrid items={documentItems} />
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 animate-fade-up delay-3">
              <p className="text-xl font-semibold text-white">
                No documents found yet.
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Add files to{" "}
                <code className="rounded bg-black/30 px-2 py-1">
                  public/documents
                </code>{" "}
                and refresh this page.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
