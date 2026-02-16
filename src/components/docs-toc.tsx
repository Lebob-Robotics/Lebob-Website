import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type DocsTocItem = {
  id: string;
  label: string;
};

type DocsTocLink = {
  label: string;
  href: string;
  external?: boolean;
};

type DocsTocProps = {
  items: DocsTocItem[];
  links?: DocsTocLink[];
};

export function DocsToc({ items, links = [] }: DocsTocProps) {
  return (
    <aside className="docs2-toc" aria-label="On this page">
      <p className="docs2-toc-title">On this page</p>
      <nav>
        <ul className="docs2-toc-list">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {links.length > 0 ? (
        <div className="docs2-toc-links">
          <p>Quick links</p>
          {links.map((link) =>
            link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link key={link.href} href={link.href}>
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ),
          )}
        </div>
      ) : null}
    </aside>
  );
}
