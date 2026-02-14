"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type DocsTab = {
  href: string;
  label: string;
  count?: number;
};

type DocsTabsProps = {
  tabs: DocsTab[];
};

export function DocsTabs({ tabs }: DocsTabsProps) {
  const pathname = usePathname();

  return (
    <div className="docs-tabs animate-fade-up delay-2">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "docs-tab",
              isActive ? "is-active" : "",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {tab.label}
            {typeof tab.count === "number" ? (
              <span className="docs-tab-count">
                {tab.count}
              </span>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
