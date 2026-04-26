"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/media", label: "media" },
  { href: "/docs", label: "docs" },
  { href: "/sponsor", label: "sponsors" },
];

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function formatUtcOffset(date: Date): string {
  const totalMinutes = -date.getTimezoneOffset();
  const sign = totalMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(totalMinutes);
  return `UTC${sign}${pad2(Math.floor(abs / 60))}:${pad2(abs % 60)}`;
}

export function FloatingBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clock, setClock] = useState("--:--:-- UTC+00");

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())} ${formatUtcOffset(d)}`,
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const toggleMenu = () => setIsMobileMenuOpen((s) => !s);

  const isLinkActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="lb-pf-nav">
        <div className="lb-pf-nav-inner">
          <Link href="/" className="lb-pf-logo" aria-label="Lebob home" onClick={closeMenu}>
            <span className="lb-pf-logo-dot" />
            <span>LB</span>
            <small>·3236</small>
          </Link>

          <button
            type="button"
            className="lb-pf-menu-toggle"
            data-open={isMobileMenuOpen ? "true" : "false"}
            onClick={toggleMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="lb-pf-burger" aria-hidden="true">
              <span className="lb-pf-burger-bar lb-pf-burger-top" />
              <span className="lb-pf-burger-bar lb-pf-burger-mid" />
              <span className="lb-pf-burger-bar lb-pf-burger-bot" />
            </span>
          </button>

          <nav
            className={`lb-pf-nav-links ${isMobileMenuOpen ? "is-open" : ""}`}
            aria-label="Main"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? "is-active" : ""}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Drawer footer — primary CTA + status */}
            <div className="lb-pf-drawer-foot" aria-hidden={!isMobileMenuOpen}>
              <Link
                href="/sponsor/how-to"
                className="lb-pf-drawer-cta"
                onClick={closeMenu}
              >
                <span>Sponsor Lebob</span>
                <ArrowUpRight />
              </Link>
              <div className="lb-pf-drawer-status">
                <span className="lb-pf-status-dot" />
                <span>season unearthed · perth · au</span>
              </div>
            </div>
          </nav>

          <div className="lb-pf-nav-meta">
            <a
              href="https://www.instagram.com/lebob_aus"
              target="_blank"
              rel="noopener noreferrer"
              className="lb-pf-icon-link"
              aria-label="Follow Lebob on Instagram"
            >
              <Instagram />
            </a>
            <span className="lb-pf-status">
              <span className="lb-pf-status-dot" />
              <span>perth · au</span>
            </span>
            <span className="lb-pf-clock">{clock}</span>
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <button
          type="button"
          className="lb-pf-backdrop"
          onClick={closeMenu}
          aria-label="Close menu backdrop"
        />
      ) : null}
    </>
  );
}
