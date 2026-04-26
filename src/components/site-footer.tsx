"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const FOOTER_GROUPS: Array<{
  head: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    head: "Site",
    links: [
      { label: "Home", href: "/" },
      { label: "Media", href: "/media" },
      { label: "Documentation", href: "/docs" },
      { label: "Sponsors", href: "/sponsor" },
    ],
  },
  {
    head: "Resources",
    links: [
      { label: "Instagram · @lebob_aus", href: "https://www.instagram.com/lebob_aus", external: true },
      { label: "FLL · official site", href: "https://www.firstlegoleague.org/", external: true },
      { label: "Onshape · CAD", href: "https://cad.onshape.com/documents/47a3be0d6a2fdc65e8e54697/w/01a750025f75b7ddacbabc32/e/b3435ce241b6547a5a3021fb", external: true },
      { label: "GitHub · source", href: "https://github.com/prawny-boy/FLL-Lebob-Unearthed", external: true },
      { label: "Sponsor us", href: "/sponsor/how-to" },
    ],
  },
  {
    head: "Team",
    links: [
      { label: "Perth Modern School", href: "https://perthmodern.wa.edu.au/", external: true },
      { label: "Team #3236 · Lebob", href: "/" },
      { label: "Season · Unearthed 2025/26", href: "/" },
      { label: "Western Australia · AU", href: "/" },
    ],
  },
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

export function SiteFooter() {
  const [year, setYear] = useState<number | null>(null);
  const [time, setTime] = useState("--:--:-- UTC+00:00");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setYear(d.getFullYear());
      setTime(
        `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())} ${formatUtcOffset(d)}`,
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="lb-site-footer">
      <div className="lb-site-footer-inner">
        <div className="lb-site-footer-brand">
          <div className="lb-site-footer-logo">
            <span className="lb-site-footer-dot" />
            <span>LB</span>
            <small>·3236</small>
          </div>
          <p className="lb-site-footer-tagline">
            Robots that compete. Ideas that inspire.
          </p>
          <div className="lb-site-footer-meta">
            <span className="lb-site-footer-status">
              <span className="lb-site-footer-status-dot" />
              <span>iterating</span>
            </span>
            <span>{time}</span>
          </div>
        </div>

        <div className="lb-site-footer-grid">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.head} className="lb-site-footer-col">
              <h4>{group.head}</h4>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label + link.href}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <span>{link.label}</span>
                        <ArrowUpRight size={11} />
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="lb-site-footer-bottom">
        <span>
          {year ?? "—"} · Lebob FLL Robotics · Team #3236 · Perth Modern School,
          Western Australia
        </span>
        <span className="lb-site-footer-bottom-right">
          Built with teamwork ·{" "}
          <a
            href="https://github.com/Lebob-Robotics/Lebob-Website"
            target="_blank"
            rel="noopener noreferrer"
          >
            source
          </a>
        </span>
      </div>
    </footer>
  );
}
