import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { DocsFileList } from "@/components/docs-file-list";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsToc } from "@/components/docs-toc";
import { RouteScrollTop } from "@/components/route-scroll-top";
import {
  DOCS_SECTIONS,
  getDocsSection,
  getDocsTabs,
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
  const otherSections = DOCS_SECTIONS.filter((entry) => entry.slug !== sectionSlug);

  return (
    <div className="docs2-page">
      <RouteScrollTop />
      <main className="docs2-main">
        <DocsSidebar current={sectionSlug} tabs={tabs} />

        <section className="docs2-content">
          <header className="docs2-head" id="overview">
            <p className="docs2-breadcrumb">Docs / {sectionInfo.tabLabel}</p>
            <h1>{sectionInfo.title}</h1>
            <p>{sectionInfo.description}</p>
            <div className="docs2-pill-row">
              <span className="docs2-pill">{documentItems.length} files</span>
              <span className="docs2-pill">{sectionInfo.tabLabel} section</span>
            </div>
          </header>

          <section id="highlights" className="docs2-block">
            <div className="docs2-section-panels">
              <article className="docs2-panel">
                <h2>Section Notes</h2>
                <ul>
                  {sectionInfo.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="docs2-panel">
                <h2>Quick Links</h2>
                <div className="docs2-quick-links">
                  {sectionInfo.links.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    if (isExternal) {
                      return (
                        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      );
                    }

                    return (
                      <Link key={link.href} href={link.href}>
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    );
                  })}
                </div>
              </article>
            </div>
          </section>

          <section id="library" className="docs2-block">
            <div className="docs2-block-head">
              <h2>{sectionInfo.tabLabel} File Library</h2>
              <p>All uploaded files for this section.</p>
            </div>

            <DocsFileList
              items={documentItems}
              showSection={false}
              emptyMessage={`No documents found in public/documents/${sectionSlug}. Add files to that folder and refresh.`}
            />
          </section>

          <section id="next" className="docs2-block">
            <div className="docs2-block-head">
              <h2>Continue exploring</h2>
            </div>

            <div className="docs2-overview-cards">
              <article className="docs2-overview-card">
                <div className="docs2-overview-meta">
                  <p>Docs</p>
                  <span>All files</span>
                </div>
                <h3>Full Documentation Index</h3>
                <p>Jump back to the complete file library and section overview.</p>
                <Link href="/docs">
                  Open overview
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>

              {otherSections.map((entry) => (
                <article key={entry.slug} className="docs2-overview-card">
                  <div className="docs2-overview-meta">
                    <p>{entry.tabLabel}</p>
                    <span>Section</span>
                  </div>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                  <Link href={`/docs/${entry.slug}`}>
                    Open section
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </section>

        <DocsToc
          items={[
            { id: "overview", label: "Overview" },
            { id: "highlights", label: "Highlights & Links" },
            { id: "library", label: "File Library" },
            { id: "next", label: "Continue Exploring" },
          ]}
          links={sectionInfo.links.map((link) => ({
            label: link.label,
            href: link.href,
            external: link.href.startsWith("http"),
          }))}
        />
      </main>
    </div>
  );
}
