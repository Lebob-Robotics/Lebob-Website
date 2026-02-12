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
    <div className="mt-8 flex flex-wrap gap-3 animate-fade-up delay-2">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
              isActive
                ? "border-emerald-300/80 bg-emerald-300/20 text-emerald-100"
                : "border-white/20 bg-black/30 text-slate-200 hover:bg-black/50",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {tab.label}
            {typeof tab.count === "number" ? (
              <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs">
                {tab.count}
              </span>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}
