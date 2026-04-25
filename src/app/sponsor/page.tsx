/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Link from "next/link";
import { addBasePath } from "next/dist/client/add-base-path";
import { ArrowUpRight, ExternalLink, HeartHandshake } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Sponsors | Lebob",
  description: "Sponsorship Page",
};

const sponsors = [
  {
    num: "01",
    cat: "Featured",
    name: "WA Robotics Education",
    sub: "WARES",
    desc: "Long-time backers of Western Australian robotics teams. Click the logo to visit their site.",
    href: "https://warobotics.education/",
    logo: "/sponsors/cropped-FullLogoWARES.png",
  },
];

export default function SponsorPage() {
  return (
    <div className="pf-page-bg">
      <main>
        {/* HERO */}
        <section className="pf-container pf-hero">
          <div className="pf-hero-grid">
            <div>
              <div className="pf-eyebrow">Sponsors · Team #3236</div>
              <h1 className="pf-h1">
                Thanks to the people who back<span className="amp"> us.</span>
              </h1>
              <p className="pf-lede">
                We appreciate the organizations that support Team Lebob and help us keep
                building, learning, and competing.
              </p>
              <div className="pf-cta-row">
                <Link href="/sponsor/how-to" className="pf-btn is-primary">
                  <HeartHandshake />
                  <span>How to sponsor us</span>
                  <ArrowUpRight />
                </Link>
                <Link href="/" className="pf-btn">
                  <span>Back to home</span>
                </Link>
              </div>
            </div>
            <aside className="pf-hero-aside">
              <div className="row"><span className="k">team</span> <span className="v">#3236</span></div>
              <div className="row"><span className="k">season</span> <span className="v">Unearthed</span></div>
              <div className="row"><span className="k">sponsors</span> <span className="v">{sponsors.length.toString().padStart(2, "0")}</span></div>
              <div className="row"><span className="k">status</span> <span className="acc">welcoming</span></div>
            </aside>
          </div>
        </section>

        {/* CURRENT SPONSORS */}
        <section className="pf-container pf-section" id="current">
          <header className="pf-section-head">
            <span className="pf-section-num">01</span>
            <span>current sponsors</span>
            <span className="pf-section-dash" />
            <span>~/partners</span>
          </header>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {sponsors.map((s) => (
              <a
                key={s.name}
                className="pf-spotlight"
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${s.name}`}
              >
                <div className="pf-spotlight-copy">
                  <p className="pf-spotlight-eyebrow">
                    {s.num} · {s.cat}
                  </p>
                  <h2 className="pf-spotlight-title">{s.name}</h2>
                  <p className="pf-spotlight-sub">
                    {s.sub} — {s.desc}
                    <ExternalLink size={11} style={{ display: "inline", marginLeft: 6, verticalAlign: "middle" }} />
                  </p>
                </div>
                <div className="pf-spotlight-logo">
                  <img
                    src={addBasePath(s.logo)}
                    alt={`${s.name} logo`}
                    width={399}
                    height={82}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pf-container pf-section" id="join">
          <header className="pf-section-head">
            <span className="pf-section-num">02</span>
            <span>join them</span>
            <span className="pf-section-dash" />
            <span>echo $REPLY</span>
          </header>

          <h2 className="pf-section-title">
            Sponsor a future<br />
            <span className="amp">builder.</span>
          </h2>
          <p className="pf-section-lede">
            Open to financial support, equipment, mentorship — or all three. Every
            level helps the workshop tick over.
          </p>
          <div className="pf-cta-row" style={{ marginTop: 0 }}>
            <Link href="/sponsor/how-to" className="pf-btn is-primary">
              <HeartHandshake />
              <span>Read how to sponsor</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
