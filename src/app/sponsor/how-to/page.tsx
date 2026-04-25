import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  HandCoins,
  Megaphone,
  PackageCheck,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Sponsor | Lebob",
  description:
    "Support Lebob with funding, tools, and mentorship to help our robotics team build, test, and compete.",
};

const supportOptions = [
  {
    code: "OPT.01",
    title: "Financial Sponsorship",
    description: "Sponsor travel, registration fees, and build materials for the season.",
    icon: HandCoins,
  },
  {
    code: "OPT.02",
    title: "Equipment & Materials",
    description: "Tools, fabrication help, prototyping supplies, or printing resources.",
    icon: Wrench,
  },
  {
    code: "OPT.03",
    title: "Professional Support",
    description: "Volunteer mentorship in engineering, software, comms, or planning.",
    icon: Megaphone,
  },
];

const whereSupportGoes = [
  "Competition registration and event travel",
  "Prototype parts, sensors, replacement hardware",
  "Presentation materials and community outreach demos",
  "Team learning resources and practice field upgrades",
];

const sponsorBenefits = [
  "Recognition on team materials and sponsorship page",
  "Project updates during the season",
  "Highlight mentions in team presentations and outreach",
  "A direct role in supporting student engineering growth",
];

const sponsorEmail = "your-team-email@example.com";

export default function SponsorHowToPage() {
  return (
    <div className="pf-page-bg">
      <main>
        {/* HERO */}
        <section className="pf-container pf-hero">
          <div className="pf-hero-grid">
            <div>
              <div className="pf-eyebrow">Sponsorships · how to help</div>
              <h1 className="pf-h1">
                How to sponsor<span className="amp"> us.</span>
              </h1>
              <p className="pf-lede">
                Your support helps the team build better robots, travel to competitions,
                and share STEM with more students. We welcome sponsors of every size.
              </p>
              <div className="pf-cta-row">
                <a
                  href={`mailto:${sponsorEmail}?subject=Lebob%20Sponsorship%20Inquiry`}
                  className="pf-btn is-primary"
                >
                  <span>Start a conversation</span>
                  <ArrowUpRight />
                </a>
                <Link href="/sponsor" className="pf-btn">
                  <span>View current sponsors</span>
                  <ArrowUpRight />
                </Link>
                <Link href="/docs" className="pf-btn">
                  <span>Team documentation</span>
                </Link>
              </div>
              <p className="pf-lede" style={{ marginTop: "1.25rem", fontSize: "0.875rem" }}>
                Update contact email in <code className="pf-code">src/app/sponsor/how-to/page.tsx</code> before publishing.
              </p>
            </div>
            <aside className="pf-hero-aside">
              <div className="row"><span className="k">team</span> <span className="v">#3236</span></div>
              <div className="row"><span className="k">season</span> <span className="v">Unearthed</span></div>
              <div className="row"><span className="k">contact</span> <span className="v">email</span></div>
              <div className="row"><span className="k">levels</span> <span className="v">flexible</span></div>
              <div className="row"><span className="k">status</span> <span className="acc">open</span></div>
            </aside>
          </div>
        </section>

        {/* HOW YOU CAN HELP */}
        <section className="pf-container pf-section" id="options">
          <header className="pf-section-head">
            <span className="pf-section-num">01</span>
            <span>how you can help</span>
            <span className="pf-section-dash" />
            <span>~/options</span>
          </header>

          <div className="pf-grid-3">
            {supportOptions.map((opt) => (
              <article key={opt.code} className="pf-grid-cell">
                <div className="pf-cell-head">{opt.title}</div>
                <span className="pf-cell-code">{opt.code}</span>
                <opt.icon className="pf-cell-icon" />
                <h3>{opt.title}</h3>
                <p>{opt.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* WHERE / WHAT */}
        <section className="pf-container pf-section" id="impact">
          <header className="pf-section-head">
            <span className="pf-section-num">02</span>
            <span>impact</span>
            <span className="pf-section-dash" />
            <span>where it goes / what you get</span>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
            className="pf-impact-grid"
          >
            <div>
              <header className="pf-section-head" style={{ marginBottom: "1rem" }}>
                <PackageCheck size={14} style={{ color: "var(--p-accent)" }} />
                <span>where your support goes</span>
                <span className="pf-section-dash" />
              </header>
              <div className="pf-rows">
                {whereSupportGoes.map((item) => (
                  <div key={item} className="pf-row">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <header className="pf-section-head" style={{ marginBottom: "1rem" }}>
                <BadgeCheck size={14} style={{ color: "var(--p-accent)" }} />
                <span>what sponsors receive</span>
                <span className="pf-section-dash" />
              </header>
              <div className="pf-rows">
                {sponsorBenefits.map((b) => (
                  <div key={b} className="pf-row">
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="pf-container pf-section" id="contact">
          <header className="pf-section-head">
            <span className="pf-section-num">03</span>
            <span>ready to partner?</span>
            <span className="pf-section-dash" />
            <span>echo $REPLY</span>
          </header>
          <h2 className="pf-section-title">
            Sponsor Lebob<br />
            <span className="amp">this season.</span>
          </h2>
          <p className="pf-section-lede">
            Reach out and we will share sponsor levels, timelines, and how your support
            will be acknowledged.
          </p>
          <div className="pf-cta-row" style={{ marginTop: 0 }}>
            <a
              href={`mailto:${sponsorEmail}?subject=Lebob%20Sponsorship%20Inquiry`}
              className="pf-btn is-primary"
            >
              <span>Contact the team</span>
              <ArrowUpRight />
            </a>
          </div>
        </section>
      </main>

      <footer className="pf-footer">
        <div className="pf-container pf-footer-inner">
          <div className="who">Lebob FLL Robotics · Team #3236 · Perth Modern</div>
          <div>
            <a href="https://github.com/Lebob-Robotics" target="_blank" rel="noreferrer">
              github.com/Lebob-Robotics
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
