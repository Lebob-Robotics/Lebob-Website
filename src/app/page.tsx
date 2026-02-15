"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { addBasePath } from "next/dist/client/add-base-path";
import {
  ArrowUpRight,
  BadgeCheck,
  Brain,
  CircuitBoard,
  GitFork,
  Globe,
  HeartHandshake,
  ImageIcon,
  Menu,
  Newspaper,
  Orbit,
  Sparkles,
  Trophy,
  Users,
  Wrench,
  WrenchIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getVariantList, pickVariantForWidth } from "@/lib/image-variants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/media", label: "Media" },
  { href: "/docs", label: "Docs" },
  { href: "/sponsor", label: "Sponsors" },
];

const team = [
  { name: "Kingsley W", image: "/members/kingsley.png" },
  { name: "Andre N", image: "/members/andre.jpeg" },
  { name: "Sean C", image: "/members/sean.jpg" },
  { name: "Oliver L", image: "/members/oliver.png" },
  { name: "Subesh S", image: "/members/subesh.png" },
  { name: "Chris W", image: "/members/chris.png" },
  { name: "Aaron Z", image: "/members/aaron.png" },
  { name: "Leven S", image: "/members/leven.png" },
];

const mentors = {
  names: ["Jade", "Kaelie"],
  image: "/members/mentors.jpg",
};

const values = [
  {
    title: "Build",
    description: "We turn ideas into mechanisms that can survive competition day.",
    icon: Wrench,
  },
  {
    title: "Code",
    description: "We program with precision so our robot moves like a teammate.",
    icon: CircuitBoard,
  },
  {
    title: "Explore",
    description: "We research, iterate, and learn from every prototype.",
    icon: Orbit,
  },
  {
    title: "Share",
    description: "We show up for the community and inspire new builders.",
    icon: Globe,
  },
];

const milestones = [
  { title: "Discover", detail: "Study the mission model and imagine our best run." },
  { title: "Design", detail: "Prototype attachments, refine the drive base, repeat." },
  { title: "Program", detail: "Automate missions and tune for consistency." },
  { title: "Present", detail: "Share our innovation story and teamwork journey." },
];

const aboutUsInfo = [
  { text: "Won national and state competitions in First Lego League.", icon: Trophy },
  { text: "Built and coded a robot to complete various missions reliably.", icon: WrenchIcon },
  { text: "Made the SoftSense manipulator arm for innovations.", icon: Brain },
];

function withBasePath(path: string): string {
  return path.startsWith("/") ? addBasePath(path) : path;
}

function buildResponsiveImage(
  sourcePath: string,
  targetWidth: number,
  maxWidth: number,
): { src: string; srcSet?: string } {
  const preferredVariant = pickVariantForWidth(sourcePath, targetWidth);
  const variants = getVariantList(sourcePath).filter((variant) => variant.width <= maxWidth);
  const srcSet =
    variants.length > 0
      ? variants.map((variant) => `${withBasePath(variant.src)} ${variant.width}w`).join(", ")
      : undefined;

  return {
    src: withBasePath(preferredVariant?.src ?? sourcePath),
    srcSet,
  };
}

export default function Home() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoImage = buildResponsiveImage("/lebob.png", 96, 160);
  const heroImage = buildResponsiveImage("/media/5Z9A0947.JPG", 1600, 2048);
  const mentorImage = buildResponsiveImage(mentors.image, 1400, 2048);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsHeroVisible(true);
    }, 220);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const revealNodes = document.querySelectorAll<HTMLElement>(".lb-reveal");
    if (revealNodes.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closeOverlays = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((state) => !state);
  };

  return (
    <div className="lb-page">
      <header className="lb-header">
        <div className="lb-container lb-header-inner">
          <Link href="/" className="lb-brand" onClick={closeOverlays}>
            <img
              src={logoImage.src}
              srcSet={logoImage.srcSet}
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
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          <nav
            className={`lb-nav ${isMobileMenuOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            <ul className="lb-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="lb-nav-link" onClick={closeOverlays}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lb-header-actions">
            <Link href="/media" className="lb-icon-button lb-icon-link" aria-label="Go to media page">
              <ImageIcon />
            </Link>
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <button
          type="button"
          className="lb-backdrop"
          onClick={closeOverlays}
          aria-label="Close menu backdrop"
        />
      ) : null}

      <main className="lb-main">
        <section className={`lb-hero ${isHeroVisible ? "show" : ""}`}>
          <img
            src={heroImage.src}
            srcSet={heroImage.srcSet}
            sizes="100vw"
            alt=""
            className="lb-hero-background"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="lb-hero-overlay" />
          <div className="lb-container lb-hero-inner">
            <div className="lb-hero-copy">
              <p className="lb-kicker">Lebob - FLL Team #3236</p>
              <h1>
                Robots that compete and ideas that inspire.
                <span className="lb-welcome-wordmark"> Welcome to Lebob.</span>
              </h1>
              <p className="lb-hero-text">
                We are a team competing in the
                <Link href="https://www.firstlegoleague.org/" target="_blank"> First Lego League</Link>.
                We <b>engineer</b> robots to complete missions, <b>research</b> and <b>innovate</b> to
                design impactful mechanisms, and make it possible through <b>collaboration</b>.
                This is our official website.
              </p>
              <div className="lb-action-row">
                <a
                  href="https://github.com/prawny-boy/FLL-Lebob-Unearthed"
                  target="_blank"
                  rel="noreferrer"
                  className="lb-btn lb-btn-primary"
                >
                  <GitFork />
                  Explore our GitHub
                </a>
                <a href="#team" className="lb-btn lb-btn-outline">
                  <Users />
                  Meet the team
                </a>
                <Link href="/media" className="lb-btn lb-btn-ghost">
                  <ImageIcon />
                  Team media
                </Link>
                <Link href="/docs" className="lb-btn lb-btn-ghost">
                  <Newspaper />
                  Team docs
                </Link>
              </div>
            </div>

            <aside className="lb-about-card">
              <div className="lb-about-header">
                <h2>
                  <Sparkles />
                  About Us
                </h2>
                <span>Info</span>
              </div>
              <p className="lb-about-description">First Lego League international team.</p>
              <div className="lb-team-name">
                <img
                  src={logoImage.src}
                  srcSet={logoImage.srcSet}
                  sizes="64px"
                  alt="Lebob team logo"
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <small>Team Name</small>
                  <strong>Lebob</strong>
                </div>
              </div>
              <ul className="lb-about-list">
                {aboutUsInfo.map((item) => (
                  <li key={item.text}>
                    <item.icon />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="lb-core-values">
                <h3>
                  <BadgeCheck />
                  Core Values in action
                </h3>
                <p>Innovation, impact, inclusion, discovery, teamwork, and fun.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="lb-section lb-reveal">
          <div className="lb-container lb-values-layout">
            <div className="lb-section-copy">
              <p>What we do</p>
              <h2>Building robots is only half the story.</h2>
              <p className="lb-copy-body">
                Our season is about turning wild ideas into reliable systems, then sharing how we
                got there. We design, iterate, and present as a single unit. Every win is a team
                win.
              </p>
            </div>
            <div className="lb-values-grid">
              {values.map((value) => (
                <article key={value.title} className="lb-panel">
                  <div className="lb-icon-wrap">
                    <value.icon />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lb-section lb-reveal">
          <div className="lb-container">
            <div className="lb-flow-panel">
              <div className="lb-flow-header">
                <div>
                  <p>Our flow</p>
                  <h2>From mission model to match day.</h2>
                </div>
                <div className="lb-pill">
                  <Users />
                  All 8 members contribute at every stage.
                </div>
              </div>
              <div className="lb-flow-grid">
                {milestones.map((milestone, index) => (
                  <article key={milestone.title} className="lb-step-card">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="lb-section lb-reveal">
          <div className="lb-container">
            <div className="lb-section-head">
              <div>
                <p>Team Lebob</p>
                <h2>Eight builders, one mission.</h2>
              </div>
              <span className="lb-tag">2026 Season</span>
            </div>
            <div className="lb-team-grid">
              {team.map((member) => {
                const memberImage = buildResponsiveImage(member.image, 160, 320);

                return (
                  <article key={member.name} className="lb-member-card">
                    <div className="lb-member-avatar">
                      <img
                        src={memberImage.src}
                        srcSet={memberImage.srcSet}
                        sizes="56px"
                        alt={`${member.name} profile`}
                        width={56}
                        height={56}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h3>{member.name}</h3>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="lb-section lb-reveal lb-section-tight-bottom">
          <div className="lb-container">
            <div className="lb-section-head">
              <div>
                <p>Mentors</p>
                <h2>Guidance behind the scenes.</h2>
              </div>
              <span className="lb-tag">Support Team</span>
            </div>
            <article className="lb-mentor-card">
              <div className="lb-mentor-image">
                <img
                  src={mentorImage.src}
                  srcSet={mentorImage.srcSet}
                  sizes="(max-width: 1024px) 100vw, 760px"
                  alt="Kaelie and Jade"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="lb-mentor-copy">
                <HeartHandshake />
                <h3>{mentors.names.join(" & ")}</h3>
              </div>
            </article>
          </div>
        </section>

        <section className="lb-section lb-reveal lb-section-tight-y">
          <div className="lb-container">
            <article className="lb-cta-card">
              <div>
                <p>Follow our solution</p>
                <h2>Our Innovations Design</h2>
                <p>
                  Explore our 3D models and CAD files for SoftSense. See our design evolution, from
                  early concepts to field-worthy products.
                </p>
              </div>
              <a
                href="https://cad.onshape.com/documents/47a3be0d6a2fdc65e8e54697/w/01a750025f75b7ddacbabc32/e/b3435ce241b6547a5a3021fb?renderMode=0&uiState=698c7958681008fee6ee1ae9"
                target="_blank"
                rel="noreferrer"
                className="lb-btn lb-btn-solid"
              >
                <img
                  src={addBasePath("/onshape.svg")}
                  alt="Onshape"
                  width={20}
                  height={20}
                  className="onshape-icon"
                  loading="lazy"
                  decoding="async"
                />
                Go to our Onshape
              </a>
            </article>
          </div>
        </section>

        <section className="lb-section lb-reveal lb-section-tight-top">
          <div className="lb-container">
            <article className="lb-cta-card">
              <div>
                <p>Follow our build</p>
                <h2>Our GitHub</h2>
                <p>
                  Code, notes, and project updates live in our repo. Explore what we are building
                  this season and see how Lebob grows with each iteration.
                </p>
              </div>
              <a
                href="https://github.com/prawny-boy/FLL-Lebob-Unearthed"
                target="_blank"
                rel="noreferrer"
                className="lb-btn lb-btn-solid"
              >
                <GitFork />
                Visit GitHub
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer className="lb-footer lb-reveal">
        <div className="lb-container lb-footer-inner">
          <div className="lb-footer-branding">
            <Sparkles />
            Lebob FLL Robotics Team
          </div>
          <div className="lb-footer-links">
            <span>
              <HeartHandshake />
              Built with teamwork
            </span>
            <a href="https://github.com/prawny-boy/FLL-Lebob-Unearthed" target="_blank" rel="noreferrer">
              <ArrowUpRight />
              GitHub
            </a>
            <a
              href="https://cad.onshape.com/documents/47a3be0d6a2fdc65e8e54697/w/01a750025f75b7ddacbabc32/e/b3435ce241b6547a5a3021fb?renderMode=0&uiState=698c7958681008fee6ee1ae9"
              target="_blank"
              rel="noreferrer"
            >
              <ArrowUpRight />
              Onshape
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
