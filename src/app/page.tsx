"use client";

import Image from "next/image";
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
  House,
  ImageIcon,
  Menu,
  Newspaper,
  Orbit,
  Search,
  Sparkles,
  Trophy,
  UserSearch,
  Users,
  Wrench,
  WrenchIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";

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
  names: ["Kaelie", "Jade"],
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

export default function Home() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsHeroVisible(true);
    }, 220);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const revealNodes = document.querySelectorAll<HTMLElement>(".wares-reveal");
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
    if (isSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  }, [isSearchOpen, isMobileMenuOpen]);

  useEffect(() => {
    const syncDockPadding = () => {
      const dock = document.querySelector<HTMLElement>(".wares-mobile-dock");

      if (window.innerWidth <= 782 && dock) {
        document.body.style.paddingBottom = `${dock.offsetHeight}px`;
        return;
      }

      document.body.style.paddingBottom = "";
    };

    syncDockPadding();
    window.addEventListener("resize", syncDockPadding);

    return () => {
      window.removeEventListener("resize", syncDockPadding);
      document.body.style.paddingBottom = "";
      document.body.style.overflow = "";
    };
  }, []);

  const closeOverlays = () => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((state) => !state);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((state) => !state);
    setIsSearchOpen(false);
  };

  return (
    <div className="wares-page">
      <header className="wares-header">
        <div className="wares-container wares-header-inner">
          <Link href="/" className="wares-brand" onClick={closeOverlays}>
            <Image
              src={addBasePath("/lebob.png")}
              alt="Lebob logo"
              width={48}
              height={48}
              className="wares-brand-image"
            />
            <span className="wares-brand-copy">
              <strong>Lebob</strong>
              <small>FLL Team #3236</small>
            </span>
          </Link>

          <button
            type="button"
            className="wares-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          <nav
            className={`wares-nav ${isMobileMenuOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
          >
            <ul className="wares-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="wares-nav-link" onClick={closeOverlays}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="wares-header-actions">
            <button
              type="button"
              className={`wares-icon-button ${isSearchOpen ? "is-active" : ""}`}
              onClick={toggleSearch}
              aria-label="Open search overlay"
            >
              <Search />
            </button>
            <Link href="/media" className="wares-icon-button wares-icon-link" aria-label="Go to media page">
              <ImageIcon />
            </Link>
            <ThemeToggle compact className="wares-theme-toggle" />
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <button
          type="button"
          className="wares-backdrop"
          onClick={closeOverlays}
          aria-label="Close menu backdrop"
        />
      ) : null}

      {isSearchOpen ? (
        <button
          type="button"
          className="wares-search-backdrop"
          onClick={() => setIsSearchOpen(false)}
          aria-label="Close search backdrop"
        />
      ) : null}

      <div className={`wares-search-overlay ${isSearchOpen ? "is-open" : ""}`}>
        <form className="wares-search-panel" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="wares-search-input" className="wares-search-label">
            Quick access
          </label>
          <div className="wares-search-row">
            <input
              id="wares-search-input"
              type="search"
              className="wares-search-input"
              placeholder="Search team pages..."
            />
            <button type="submit" className="wares-search-submit">
              <Search />
              Search
            </button>
          </div>
          <div className="wares-search-links">
            <Link href="/docs" className="wares-chip" onClick={closeOverlays}>
              Team docs
            </Link>
            <Link href="/media" className="wares-chip" onClick={closeOverlays}>
              Team media
            </Link>
            <a
              href="https://github.com/prawny-boy/FLL-Lebob-Unearthed"
              target="_blank"
              rel="noreferrer"
              className="wares-chip"
              onClick={closeOverlays}
            >
              GitHub
            </a>
            <a
              href="https://cad.onshape.com/documents/47a3be0d6a2fdc65e8e54697/w/01a750025f75b7ddacbabc32/e/b3435ce241b6547a5a3021fb?renderMode=0&uiState=698c7958681008fee6ee1ae9"
              target="_blank"
              rel="noreferrer"
              className="wares-chip"
              onClick={closeOverlays}
            >
              Onshape
            </a>
          </div>
        </form>
      </div>

      <main className="wares-main">
        <section className={`wares-hero ${isHeroVisible ? "show" : ""}`}>
          <Image
            src={addBasePath("/media/5Z9A0947.JPG")}
            alt=""
            fill
            sizes="100vw"
            className="wares-hero-background"
          />
          <div className="wares-hero-overlay" />
          <div className="wares-container wares-hero-inner">
            <div className="wares-hero-copy">
              <p className="wares-kicker">Lebob - FLL Team #3236</p>
              <h1>
                Robots that compete and ideas that inspire.
                <span> Welcome to Lebob.</span>
              </h1>
              <p className="wares-hero-text">
                We are a team competing in the
                <Link href="https://www.firstlegoleague.org/" target="_blank"> First Lego League</Link>.
                We <b>engineer</b> robots to complete missions, <b>research</b> and <b>innovate</b> to
                design impactful mechanisms, and make it possible through <b>collaboration</b>.
                This is our official website.
              </p>
              <div className="wares-action-row">
                <a
                  href="https://github.com/prawny-boy/FLL-Lebob-Unearthed"
                  target="_blank"
                  rel="noreferrer"
                  className="wares-btn wares-btn-primary"
                >
                  <GitFork />
                  Explore our GitHub
                </a>
                <a href="#team" className="wares-btn wares-btn-outline">
                  <UserSearch />
                  Meet the team
                </a>
                <Link href="/media" className="wares-btn wares-btn-ghost">
                  <ImageIcon />
                  Team media
                </Link>
                <Link href="/docs" className="wares-btn wares-btn-ghost">
                  <Newspaper />
                  Team docs
                </Link>
              </div>
            </div>

            <aside className="wares-about-card">
              <div className="wares-about-header">
                <h2>
                  <Sparkles />
                  About Us
                </h2>
                <span>Info</span>
              </div>
              <p className="wares-about-description">First Lego League international team.</p>
              <div className="wares-team-name">
                <Image
                  src={addBasePath("/lebob.png")}
                  alt="Lebob team logo"
                  width={64}
                  height={64}
                />
                <div>
                  <small>Team Name</small>
                  <strong>Lebob</strong>
                </div>
              </div>
              <ul className="wares-about-list">
                {aboutUsInfo.map((item) => (
                  <li key={item.text}>
                    <item.icon />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="wares-core-values">
                <h3>
                  <BadgeCheck />
                  Core Values in action
                </h3>
                <p>Innovation, impact, inclusion, discovery, teamwork, and fun.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="wares-section wares-reveal">
          <div className="wares-container wares-values-layout">
            <div className="wares-section-copy">
              <p>What we do</p>
              <h2>Building robots is only half the story.</h2>
              <p className="wares-copy-body">
                Our season is about turning wild ideas into reliable systems, then sharing how we
                got there. We design, iterate, and present as a single unit. Every win is a team
                win.
              </p>
            </div>
            <div className="wares-values-grid">
              {values.map((value) => (
                <article key={value.title} className="wares-panel">
                  <div className="wares-icon-wrap">
                    <value.icon />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="wares-section wares-reveal">
          <div className="wares-container wares-flow-panel">
            <div className="wares-flow-header">
              <div>
                <p>Our flow</p>
                <h2>From mission model to match day.</h2>
              </div>
              <div className="wares-pill">
                <Users />
                All 8 members contribute at every stage.
              </div>
            </div>
            <div className="wares-flow-grid">
              {milestones.map((milestone, index) => (
                <article key={milestone.title} className="wares-step-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="wares-section wares-reveal">
          <div className="wares-container">
            <div className="wares-section-head">
              <div>
                <p>Team Lebob</p>
                <h2>Eight builders, one mission.</h2>
              </div>
              <span className="wares-tag">2026 Season</span>
            </div>
            <div className="wares-team-grid">
              {team.map((member) => (
                <article key={member.name} className="wares-member-card">
                  <div className="wares-member-avatar">
                    <Image
                      src={addBasePath(member.image)}
                      alt={`${member.name} profile`}
                      width={56}
                      height={56}
                    />
                  </div>
                  <h3>{member.name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="wares-section wares-reveal">
          <div className="wares-container">
            <div className="wares-section-head">
              <div>
                <p>Mentors</p>
                <h2>Guidance behind the scenes.</h2>
              </div>
              <span className="wares-tag">Support Team</span>
            </div>
            <article className="wares-mentor-card">
              <div className="wares-mentor-image">
                <Image
                  src={addBasePath(mentors.image)}
                  alt="Kaelie and Jade"
                  fill
                  sizes="(max-width: 1024px) 100vw, 760px"
                />
              </div>
              <div className="wares-mentor-copy">
                <HeartHandshake />
                <h3>{mentors.names.join(" & ")}</h3>
              </div>
            </article>
          </div>
        </section>

        <section className="wares-section wares-reveal">
          <div className="wares-container">
            <article className="wares-cta-card">
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
                className="wares-btn wares-btn-solid"
              >
                <Image
                  src={addBasePath("/onshape.svg")}
                  alt="Onshape"
                  width={20}
                  height={20}
                  className="onshape-icon"
                />
                Go to our Onshape
              </a>
            </article>
          </div>
        </section>

        <section className="wares-section wares-reveal">
          <div className="wares-container">
            <article className="wares-cta-card">
              <div>
                <p>Follow our build</p>
                <h2>Our GitHub lab</h2>
                <p>
                  Code, notes, and project updates live in our repo. Explore what we are building
                  this season and see how Lebob grows with each iteration.
                </p>
              </div>
              <a
                href="https://github.com/prawny-boy/FLL-Lebob-Unearthed"
                target="_blank"
                rel="noreferrer"
                className="wares-btn wares-btn-solid"
              >
                <GitFork />
                Visit GitHub
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer className="wares-footer wares-reveal">
        <div className="wares-container wares-footer-inner">
          <div className="wares-footer-branding">
            <Sparkles />
            Lebob FLL Robotics Team
          </div>
          <div className="wares-footer-links">
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

      <div className="wares-mobile-dock">
        <Link href="/" className="wares-mobile-dock-button" aria-label="Home">
          <House />
        </Link>
        <Link href="/media" className="wares-mobile-dock-button" aria-label="Media">
          <ImageIcon />
        </Link>
        <Link href="/docs" className="wares-mobile-dock-button" aria-label="Docs">
          <Newspaper />
        </Link>
        <button type="button" className="wares-mobile-dock-button" onClick={toggleSearch} aria-label="Search">
          <Search />
        </button>
      </div>
    </div>
  );
}
