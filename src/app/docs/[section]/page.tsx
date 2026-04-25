import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";

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
    <div className="pf-page-bg">
      <main>
        <section className="pf-container pf-hero">
          <div className="pf-hero-grid">
            <div>
              <div className="pf-eyebrow">Documentation / {sectionInfo.tabLabel}</div>
              <h1 className="pf-h1">
                {sectionInfo.title}<span className="amp">.</span>
              </h1>
              <p className="pf-lede">{sectionInfo.description}</p>
              <div className="pf-pill-row" style={{ marginTop: "1.5rem" }}>
                <span className="pf-pill">{documentItems.length} files</span>
                <span className="pf-pill">{sectionInfo.tabLabel.toLowerCase()} section</span>
              </div>
            </div>
            <aside className="pf-hero-aside">
              <div className="row"><span className="k">section</span> <span className="v">{sectionSlug}</span></div>
              <div className="row"><span className="k">files</span> <span className="v">{documentItems.length.toString().padStart(3, "0")}</span></div>
              <div className="row"><span className="k">links</span> <span className="v">{sectionInfo.links.length.toString().padStart(2, "0")}</span></div>
              <div className="row"><span className="k">status</span> <span className="acc">live</span></div>
            </aside>
          </div>
        </section>

        <RouteScrollTop />

        <section className="pf-container pf-section" id="inside">
          <header className="pf-section-head">
            <span className="pf-section-num">01</span>
            <span>what you will find</span>
            <span className="pf-section-dash" />
            <span>~/highlights</span>
          </header>
          <div className="pf-rows">
            {sectionInfo.highlights.map((item) => (
              <div key={item} className="pf-row">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="pf-container pf-section" id="links">
          <header className="pf-section-head">
            <span className="pf-section-num">02</span>
            <span>key links</span>
            <span className="pf-section-dash" />
            <span>~/refs</span>
          </header>
          <div className="pf-cta-row" style={{ marginTop: 0 }}>
            {sectionInfo.links.map((link) => {
              const isExternal = link.href.startsWith("http");
              if (isExternal) {
                return (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="pf-btn">
                    <span>{link.label}</span>
                    <ArrowUpRight />
                  </a>
                );
              }
              return (
                <Link key={link.href} href={link.href} className="pf-btn">
                  <span>{link.label}</span>
                  <ArrowUpRight />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="pf-container pf-section" id="library">
          <header className="pf-section-head">
            <span className="pf-section-num">03</span>
            <span>{sectionInfo.tabLabel.toLowerCase()} library</span>
            <span className="pf-section-dash" />
            <span>~/files</span>
          </header>

          <div className="docs2-page">
            <div className="docs2-main">
              <DocsSidebar current={sectionSlug} tabs={tabs} />
              <div className="docs2-content">
                <div className="docs2-block">
                  <DocsFileList
                    items={documentItems}
                    showSection={false}
                    emptyMessage={`No documents found in public/documents/${sectionSlug}. Add files to that folder and refresh.`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pf-container pf-section" id="next">
          <header className="pf-section-head">
            <span className="pf-section-num">04</span>
            <span>go next</span>
            <span className="pf-section-dash" />
            <span>~/jump</span>
          </header>
          <div className="pf-cta-row" style={{ marginTop: 0 }}>
            <Link href="/docs" className="pf-btn">
              <span>Open all docs</span>
              <ArrowUpRight />
            </Link>
            {otherSections.map((entry) => (
              <Link key={entry.slug} href={`/docs/${entry.slug}`} className="pf-btn">
                <span>Open {entry.tabLabel.toLowerCase()} docs</span>
                <ArrowUpRight />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
