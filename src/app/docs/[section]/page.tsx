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
    <div className="sub-page">
      <main className="sub-main">
        <div className="sub-grid bg-grid" />
        <div className="sub-orb sub-orb-left" />
        <div className="sub-orb sub-orb-right" />

        <div className="sub-top">
          <Button
            asChild
            variant="outline"
            className="sub-back-btn"
          >
            <Link href="/docs">
              Back to Docs Hub
              <ArrowUpRight className="sub-icon" />
            </Link>
          </Button>
        </div>

        <section className="sub-wrap">
          <Badge className="sub-badge animate-fade-up">
            {sectionInfo.title} ({documentItems.length})
          </Badge>
          <h1 className="sub-title animate-fade-up delay-1">
            {sectionInfo.title}
          </h1>
          <p className="sub-text animate-fade-up delay-2">
            {sectionInfo.description}
          </p>

          <DocsTabs tabs={tabs} />

          <div className="docs-layout">
            <div className="animate-fade-up delay-3">
              {documentItems.length > 0 ? (
                <DocumentGrid items={documentItems} />
              ) : (
                <div className="sub-empty">
                  <p className="sub-empty-title">No documents found yet.</p>
                  <p className="sub-empty-copy">
                    Add files to{" "}
                    <code className="sub-code">
                      public/documents/{sectionSlug}
                    </code>{" "}
                    and refresh this page.
                  </p>
                </div>
              )}
            </div>

            <aside className="docs-side animate-fade-up delay-3">
              <h2 className="docs-side-title">Section Notes</h2>
              <ul className="docs-note-list">
                {sectionInfo.highlights.map((item) => (
                  <li key={item} className="docs-note-item">
                    • {item}
                  </li>
                ))}
              </ul>

              <h3 className="docs-links-title">
                Quick Links
              </h3>
              <div className="docs-links">
                {sectionInfo.links.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return isExternal ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="docs-link-btn"
                    >
                      <LinkIcon className="h-4 w-4" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="docs-link-btn"
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
