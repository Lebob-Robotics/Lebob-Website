/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Link from "next/link";
import { addBasePath } from "next/dist/client/add-base-path";
import { ArrowUpRight, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Sponsors | Lebob",
  description: "Sponsorship Page",
};

export default function SponsorPage() {
  return (
    <div className="sub-page">
      <main className="sub-main">
        <div className="sub-grid bg-grid" />
        <div className="sub-orb sub-orb-left" />
        <div className="sub-orb sub-orb-right" />

        <section className="sub-wrap sub-wrap-tight sponsor-gratitude-wrap">
          <div className="sponsor-heart-pill-row">
            <span className="sponsor-heart-pill">
              <HeartHandshake size={14} />
              Sponsors
            </span>
          </div>
          <h1 className="sub-title sponsor-thanks-title">Thank You to Our Sponsors</h1>
          <p className="sub-text sponsor-thanks-text">
            We appreciate the organizations that support Team Lebob and help us keep building,
            learning, and competing.
          </p>
          <div className="sub-pill-row">
            <Link href="/sponsor/how-to" className="docs-link-btn">
              How to sponsor us
              <ArrowUpRight className="sub-icon" />
            </Link>
          </div>
        </section>

        <section className="sponsor-spotlight-wrap">
          <article className="sponsor-spotlight-card card-hover">
            <div className="sponsor-spotlight-inner">
              <div className="sponsor-spotlight-copy">
                <p className="sponsor-spotlight-eyebrow">Featured sponsor</p>
                <h2 className="sponsor-spotlight-title">WA Robotics Education</h2>
                <p className="sponsor-spotlight-copytext">Click the logo to visit their website.</p>
              </div>
              <a
                className="sponsor-logo-link"
                href="https://warobotics.education/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit WA Robotics Education website"
              >
                <img
                  className="sponsor-logo-image"
                  src={addBasePath("/sponsors/cropped-FullLogoWARES.png")}
                  alt="WA Robotics Education logo"
                  width={399}
                  height={82}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
