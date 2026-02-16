import Link from "next/link";

import { DOCS_SECTIONS, type DocsSectionSlug, type DocsTab } from "@/lib/docs-data";

type DocsSidebarProps = {
  current: "all" | DocsSectionSlug;
  tabs: DocsTab[];
};

function tabCountByHref(tabs: DocsTab[], href: string): number {
  return tabs.find((tab) => tab.href === href)?.count ?? 0;
}

export function DocsSidebar({ current, tabs }: DocsSidebarProps) {
  const allCount = tabCountByHref(tabs, "/docs");

  return (
    <aside className="docs2-sidebar">
      <div className="docs2-sidebar-head">
        <p className="docs2-kicker">Lebob Documentation</p>
        <h2>Docs Navigator</h2>
        <p className="docs2-version">Season 2025-2026</p>
      </div>

      <nav className="docs2-nav" aria-label="Docs navigation">
        <p className="docs2-nav-group">Getting Started</p>
        <Link
          href="/docs"
          className={`docs2-nav-link ${current === "all" ? "is-active" : ""}`}
          aria-current={current === "all" ? "page" : undefined}
        >
          <span>Overview</span>
          <span>{allCount}</span>
        </Link>

        <p className="docs2-nav-group">Sections</p>
        {DOCS_SECTIONS.map((section) => {
          const href = `/docs/${section.slug}`;
          const count = tabCountByHref(tabs, href);
          const isActive = current === section.slug;

          return (
            <Link
              key={section.slug}
              href={href}
              className={`docs2-nav-link ${isActive ? "is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{section.tabLabel}</span>
              <span>{count}</span>
            </Link>
          );
        })}
      </nav>

      <div className="docs2-sidebar-links">
        <Link href="/">Home</Link>
        <Link href="/media">Team Media</Link>
      </div>
    </aside>
  );
}
