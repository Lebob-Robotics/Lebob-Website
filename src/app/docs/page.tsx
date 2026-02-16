import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DocsFileList } from "@/components/docs-file-list";
import { DocsSidebar } from "@/components/docs-sidebar";
import { RouteScrollTop } from "@/components/route-scroll-top";
import {
  DOCS_SECTIONS,
  getAllSectionDocumentItems,
  getDocsTabs,
} from "@/lib/docs-data";

export const metadata: Metadata = {
  title: "Team Documentation | Lebob",
  description: "Simple and organized access to all team documentation files.",
};

export default async function DocsPage() {
  const [documentItems, { tabs, totalCount }] = await Promise.all([
    getAllSectionDocumentItems(),
    getDocsTabs(),
  ]);
  const sectionCards = DOCS_SECTIONS.map((section) => {
    const sectionCount =
      tabs.find((entry) => entry.href === `/docs/${section.slug}`)?.count ?? 0;

    return {
      ...section,
      count: sectionCount,
    };
  });

  return (
    <div className="docs2-page">
      <RouteScrollTop />
      <main className="docs2-main">
        <DocsSidebar current="all" tabs={tabs} />

        <section className="docs2-content">
          <header className="docs2-head" id="overview">
            <p className="docs2-breadcrumb">Documentation</p>
            <h1>Find the right file quickly</h1>
            <p>
              Use a section to focus on one project area, or use the full library with
              search and filters to jump straight to a specific file.
            </p>
            <div className="docs2-pill-row">
              <span className="docs2-pill">{totalCount} total files</span>
              <span className="docs2-pill">Season 2025-2026</span>
            </div>
            <div className="docs2-hero-actions">
              <Link href="/docs/robot" className="docs2-hero-btn">
                Open Robot docs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/docs/innovation" className="docs2-hero-btn">
                Open Innovation docs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </header>

          <section id="quick-start" className="docs2-block">
            <div className="docs2-block-head">
              <h2>Quick Start</h2>
              <p>New here? Follow these steps.</p>
            </div>

            <div className="docs2-overview-cards">
              <article className="docs2-overview-card">
                <div className="docs2-overview-meta">
                  <p>Step 1</p>
                </div>
                <h3>Pick a section</h3>
                <p>
                  Start with Robot or Innovation if you already know what you need.
                </p>
              </article>
              <article className="docs2-overview-card">
                <div className="docs2-overview-meta">
                  <p>Step 2</p>
                </div>
                <h3>Filter the list</h3>
                <p>
                  Use search and type filters in the file library to narrow results fast.
                </p>
              </article>
              <article className="docs2-overview-card">
                <div className="docs2-overview-meta">
                  <p>Step 3</p>
                </div>
                <h3>Open or download</h3>
                <p>
                  Open any file in a new tab or download it directly from the same row.
                </p>
              </article>
            </div>
          </section>

          <section id="sections" className="docs2-block">
            <div className="docs2-block-head">
              <h2>Browse by Section</h2>
              <p>
                Choose a focused area first. Each section includes notes, key links, and
                its own file library.
              </p>
            </div>

            <div className="docs2-overview-cards">
              {sectionCards.map((section) => (
                <article key={section.slug} className="docs2-overview-card">
                  <div className="docs2-overview-meta">
                    <p>{section.tabLabel}</p>
                    <span>{section.count} files</span>
                  </div>
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                  <Link href={`/docs/${section.slug}`}>
                    Open section
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section id="library" className="docs2-block">
            <div className="docs2-block-head">
              <h2>Document Library</h2>
              <p>
                Every file in one place. Search by keyword, then filter by section or
                file type.
              </p>
            </div>

            <DocsFileList
              items={documentItems}
              emptyMessage="No documents found. Add files to public/documents, public/documents/robot, or public/documents/innovation and refresh."
            />
          </section>
        </section>
      </main>
    </div>
  );
}
