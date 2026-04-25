"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
      const off = -d.getTimezoneOffset() / 60;
      const tz = `UTC${off >= 0 ? "+" : ""}${off}`;
      setClock(`${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())} ${tz}`);
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
            <span className="lb-pf-menu-toggle-stack" aria-hidden="true">
              <span className="lb-pf-menu-label menu">menu</span>
              <span className="lb-pf-menu-label close">close</span>
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
          </nav>

          <div className="lb-pf-nav-meta">
            <span className="lb-pf-status">
              <span className="lb-pf-status-dot" />
              <span>iterating</span>
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
