import type { Metadata } from "next";

import { DocsFileList } from "@/components/docs-file-list";
import { DocsSidebar } from "@/components/docs-sidebar";
import {
  DOCS_SECTIONS,
  getAllSectionDocumentItems,
  getDocsTabs,
} from "@/lib/docs-data";

export const metadata: Metadata = {
  title: "Team Documentation | Lebob",
  description: "Main docs hub for Robot and Innovation files.",
};

export default async function DocsPage() {
  const [documentItems, { tabs, totalCount }] = await Promise.all([
    getAllSectionDocumentItems(),
    getDocsTabs(),
  ]);

  return (
    <div className="docs2-page">
      <main className="docs2-main">
        <DocsSidebar current="all" tabs={tabs} />

        <section className="docs2-content">
          <header className="docs2-head">
            <p className="docs2-breadcrumb">Docs / All files</p>
            <h1>Team Documentation</h1>
          </header>

          <div className="docs2-metrics">
            <article className="docs2-metric">
              <p>Total files</p>
              <strong>{totalCount}</strong>
            </article>
            {DOCS_SECTIONS.map((section) => {
              const tab = tabs.find((entry) => entry.href === `/docs/${section.slug}`);
              return (
                <article key={section.slug} className="docs2-metric">
                  <p>{section.tabLabel}</p>
                  <strong>{tab?.count ?? 0}</strong>
                </article>
              );
            })}
          </div>

          <DocsFileList
            items={documentItems}
            emptyMessage="No documents found. Add files to public/documents, public/documents/robot, or public/documents/innovation and refresh."
          />
        </section>
      </main>
    </div>
  );
}
