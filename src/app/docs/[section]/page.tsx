import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { DocsFileList } from "@/components/docs-file-list";
import { DocsSidebar } from "@/components/docs-sidebar";
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
    description: `Clear access to ${sectionInfo.tabLabel} files, links, and notes.`,
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
            <p className="docs2-breadcrumb">Documentation / {sectionInfo.tabLabel}</p>
            <h1>{sectionInfo.title}</h1>
            <p>{sectionInfo.description}</p>
            <div className="docs2-pill-row">
              <span className="docs2-pill">{documentItems.length} files available</span>
              <span className="docs2-pill">{sectionInfo.tabLabel} section</span>
            </div>
          </header>

          <section id="inside" className="docs2-block">
            <div className="docs2-section-panels">
              <article className="docs2-panel">
                <h2>What You Will Find</h2>
                <ul>
                  {sectionInfo.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="docs2-panel">
                <h2>Key Links</h2>
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
              <p>
                Search by keyword and filter by file type to get to the right file faster.
              </p>
            </div>

            <DocsFileList
              items={documentItems}
              showSection={false}
              emptyMessage={`No documents found in public/documents/${sectionSlug}. Add files to that folder and refresh.`}
            />
          </section>

          <section id="next" className="docs2-block">
            <div className="docs2-block-head">
              <h2>Go Next</h2>
              <p>Need another section? Use these shortcuts.</p>
            </div>

            <div className="docs2-hero-actions">
              <Link href="/docs" className="docs2-hero-btn">
                Open all docs
                <ArrowRight className="h-4 w-4" />
              </Link>
              {otherSections.map((entry) => (
                <Link key={entry.slug} href={`/docs/${entry.slug}`} className="docs2-hero-btn">
                  Open {entry.tabLabel} docs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
