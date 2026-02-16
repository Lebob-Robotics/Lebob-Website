import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DocsFileList } from "@/components/docs-file-list";
import { DocsSidebar } from "@/components/docs-sidebar";
import { RouteScrollTop } from "@/components/route-scroll-top";
import { getDocsSection, getDocsTabs, getSectionDocumentItems } from "@/lib/docs-data";

const sectionSlug = "robot";
const sectionInfo = getDocsSection(sectionSlug);

export const metadata: Metadata = {
  title: `${sectionInfo.title} | Lebob`,
  description: sectionInfo.description,
};

export default async function RobotPage() {
  const [documentItems, { tabs }] = await Promise.all([
    getSectionDocumentItems(sectionSlug),
    getDocsTabs(),
  ]);

  return (
    <div className="docs2-page">
      <RouteScrollTop />
      <main className="docs2-main">
        <DocsSidebar current={sectionSlug} tabs={tabs} />

        <section className="docs2-content">
          <header className="docs2-head">
            <p className="docs2-breadcrumb">Docs / {sectionInfo.tabLabel}</p>
            <h1>{sectionInfo.title}</h1>
            <p>{sectionInfo.description}</p>
          </header>

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

          <DocsFileList
            items={documentItems}
            emptyMessage={`No documents found in public/documents/${sectionSlug}. Add files to that folder and refresh.`}
          />
        </section>
      </main>
    </div>
  );
}
