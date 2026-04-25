import type { Metadata } from "next";

import { DocsFileList } from "@/components/docs-file-list";
import { DocsSidebar } from "@/components/docs-sidebar";
import { RouteScrollTop } from "@/components/route-scroll-top";
import { getAllSectionDocumentItems, getDocsTabs } from "@/lib/docs-data";

export const metadata: Metadata = {
  title: "Team Documentation | Lebob",
  description: "All team documentation files.",
};

export default async function DocsPage() {
  const [documentItems, { tabs }] = await Promise.all([
    getAllSectionDocumentItems(),
    getDocsTabs(),
  ]);

  return (
    <div className="docs2-page">
      <RouteScrollTop />
      <main className="docs2-main">
        <DocsSidebar current="all" tabs={tabs} />

        <section className="docs2-content">
          <section id="library" className="docs2-block">
            <DocsFileList
              items={documentItems}
              emptyMessage="No documents found. Add files to public/documents/general, public/documents/robot, or public/documents/innovation and refresh."
            />
          </section>
        </section>
      </main>
    </div>
  );
}
