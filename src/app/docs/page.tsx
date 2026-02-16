import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DocsFileList } from "@/components/docs-file-list";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsToc } from "@/components/docs-toc";
import { RouteScrollTop } from "@/components/route-scroll-top";
import {
  DOCS_SECTIONS,
  getAllSectionDocumentItems,
  getDocsTabs,
} from "@/lib/docs-data";

export const metadata: Metadata = {
  title: "Team Documentation | Lebob",
  description: "Documentation Page",
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
            <p className="docs2-breadcrumb">Docs / Overview</p>
            <h1>Team Documentation</h1>
            <p>
              A centralized, review-ready library of Lebob robot and innovation files.
              Use the left sidebar to move between sections, or jump directly into the
              full file library.
            </p>
            <div className="docs2-hero-actions">
              <Link href="/docs/robot" className="docs2-hero-btn">
                Start with Robot docs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/docs/innovation" className="docs2-hero-btn">
                Open Innovation docs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </header>

          <section id="sections" className="docs2-block">
            <div className="docs2-block-head">
              <h2>Sections</h2>
              <p>
                Browse by project area. There are currently <strong>{totalCount}</strong>{" "}
                files available across all docs.
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
              <p>Every file from all documentation folders in one list.</p>
            </div>

            <DocsFileList
              items={documentItems}
              emptyMessage="No documents found. Add files to public/documents, public/documents/robot, or public/documents/innovation and refresh."
            />
          </section>
        </section>

        <DocsToc
          items={[
            { id: "overview", label: "Overview" },
            { id: "sections", label: "Sections" },
            { id: "library", label: "Document Library" },
          ]}
          links={[
            { label: "Team Media", href: "/media" },
            {
              label: "Robot Code (GitHub)",
              href: "https://github.com/prawny-boy/FLL-Lebob-Unearthed",
              external: true,
            },
          ]}
        />
      </main>
    </div>
  );
}
