import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, LinkIcon } from "lucide-react";

import { DocsTabs } from "@/components/docs-tabs";
import { DocumentGrid } from "@/components/document-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DOCS_SECTIONS,
  getDocsTabs,
  getDocsSection,
  getSectionDocumentItems,
  isDocsSectionSlug,
  type DocsSectionSlug,
} from "@/lib/docs-data";

type DocsSectionPageProps = {
  params: Promise<{ section: string }>;
};

export async function generateMetadata({
  params,
}: DocsSectionPageProps): Promise<Metadata> {
  const { section } = await params;

  if (!isDocsSectionSlug(section)) {
    return {
      title: "Team Documentation | Lebob",
      description: "Team documentation and file previews for Lebob.",
    };
  }

  const sectionInfo = getDocsSection(section);

  return {
    title: `${sectionInfo.title} | Lebob`,
    description: sectionInfo.description,
  };
}

export async function generateStaticParams() {
  return DOCS_SECTIONS.map((section) => ({ section: section.slug }));
}

export default async function DocsSectionPage({ params }: DocsSectionPageProps) {
  const { section } = await params;

  if (!isDocsSectionSlug(section)) {
    notFound();
  }

  const sectionSlug: DocsSectionSlug = section;
  const sectionInfo = getDocsSection(sectionSlug);

  const [documentItems, { tabs }] = await Promise.all([
    getSectionDocumentItems(sectionSlug),
    getDocsTabs(),
  ]);

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
            <Link href="/docs">
              Back to Docs Hub
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-16 sm:px-10">
          <Badge className="w-fit bg-white/10 text-white hover:bg-white/20 animate-fade-up">
            {sectionInfo.title} ({documentItems.length})
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl animate-fade-up delay-1">
            {sectionInfo.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-200 animate-fade-up delay-2">
            {sectionInfo.description}
          </p>

          <DocsTabs tabs={tabs} />

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="animate-fade-up delay-3">
              {documentItems.length > 0 ? (
                <DocumentGrid items={documentItems} />
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                  <p className="text-xl font-semibold text-white">
                    No documents found yet.
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Add files to{" "}
                    <code className="rounded bg-black/30 px-2 py-1">
                      public/documents/{sectionSlug}
                    </code>{" "}
                    and refresh this page.
                  </p>
                </div>
              )}
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 animate-fade-up delay-3">
              <h2 className="text-xl font-semibold text-white">Section Notes</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {sectionInfo.highlights.map((item) => (
                  <li key={item} className="leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                Quick Links
              </h3>
              <div className="mt-3 flex flex-col gap-2">
                {sectionInfo.links.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return isExternal ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 hover:bg-black/50"
                    >
                      <LinkIcon className="h-4 w-4" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-sm text-slate-100 hover:bg-black/50"
                    >
                      <LinkIcon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
