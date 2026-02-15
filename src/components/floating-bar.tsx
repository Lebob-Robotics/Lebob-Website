"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { addBasePath } from "next/dist/client/add-base-path";
import { HeartHandshake, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/media", label: "Media" },
  { href: "/docs", label: "Docs" },
  { href: "/sponsor", label: "Sponsors" },
];

function withBasePath(path: string): string {
  return path.startsWith("/") ? addBasePath(path) : path;
}

export function FloatingBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const updateHeader = () => {
      setIsHeaderCompact(window.scrollY > 40);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

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

  const logoPath = useMemo(() => withBasePath("/lebob.png"), []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen((state) => !state);
  };

  const isLinkActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className={`lb-header ${isHeaderCompact ? "is-scrolled" : ""}`}>
        <div className="lb-container lb-header-inner">
          <Link href="/" className="lb-brand" onClick={closeMenu}>
            <img
              src={logoPath}
              sizes="48px"
              alt="Lebob logo"
              width={48}
              height={48}
              className="lb-brand-image"
              loading="eager"
              decoding="async"
            />
            <span className="lb-brand-copy">
              <strong>Lebob</strong>
              <small>FLL Team #3236</small>
            </span>
          </Link>

          <button
            type="button"
            className="lb-menu-toggle"
            onClick={toggleMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          <nav className={`lb-nav ${isMobileMenuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <ul className="lb-nav-list">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`lb-nav-link ${active ? "is-active" : ""}`}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="lb-header-actions">
            <Link href="/sponsor" className="lb-icon-button lb-icon-link" aria-label="Go to sponsors page">
              <HeartHandshake />
            </Link>
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <button type="button" className="lb-backdrop" onClick={closeMenu} aria-label="Close menu backdrop" />
      ) : null}

      {!isHomePage ? <div className="lb-header-spacer" aria-hidden /> : null}
    </>
  );
}
