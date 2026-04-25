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
  const [documentItems, { tabs, totalCount }] = await Promise.all([
    getAllSectionDocumentItems(),
    getDocsTabs(),
  ]);

  return (
    <div className="pf-page-bg">
      <main>
        <section className="pf-container pf-hero">
          <div className="pf-hero-grid">
            <div>
              <div className="pf-eyebrow">Documentation · all files</div>
              <h1 className="pf-h1">
                The full library<span className="amp">.</span>
              </h1>
              <p className="pf-lede">
                Every file in one place. Search by keyword, then filter by section
                or file type.
              </p>
              <div className="pf-pill-row" style={{ marginTop: "1.5rem" }}>
                <span className="pf-pill">{totalCount} total files</span>
                <span className="pf-pill">season 2025/26</span>
              </div>
            </div>
            <aside className="pf-hero-aside">
              <div className="row"><span className="k">files</span> <span className="v">{totalCount.toString().padStart(3, "0")}</span></div>
              <div className="row"><span className="k">sections</span> <span className="v">{tabs.length.toString().padStart(2, "0")}</span></div>
              <div className="row"><span className="k">format</span> <span className="v">pdf · md · img</span></div>
              <div className="row"><span className="k">status</span> <span className="acc">live</span></div>
            </aside>
          </div>
        </section>

        <RouteScrollTop />

        <section className="pf-container pf-section" id="library">
          <header className="pf-section-head">
            <span className="pf-section-num">01</span>
            <span>library</span>
            <span className="pf-section-dash" />
            <span>~/docs</span>
          </header>

          <div className="docs2-page">
            <div className="docs2-main">
              <DocsSidebar current="all" tabs={tabs} />
              <div className="docs2-content">
                <div className="docs2-block">
                  <DocsFileList
                    items={documentItems}
                    emptyMessage="No documents found. Add files to public/documents/general, public/documents/robot, or public/documents/innovation and refresh."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pf-footer">
        <div className="pf-container pf-footer-inner">
          <div className="who">Lebob FLL Robotics · Team #3236 · Perth Modern</div>
          <div>
            <a href="https://github.com/Lebob-Robotics" target="_blank" rel="noreferrer">
              github.com/Lebob-Robotics
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
