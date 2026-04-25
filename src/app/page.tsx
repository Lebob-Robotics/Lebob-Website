"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { addBasePath } from "next/dist/client/add-base-path";
import { Brain, Trophy, WrenchIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { getVariantList, pickVariantForWidth } from "@/lib/image-variants";
import "./home.css";

const team = [
  { name: "Kingsley W", image: "/members/kingsley.png", role: "build lead", id: "CR-01" },
  { name: "Andre N", image: "/members/andre.jpeg", role: "software", id: "CR-02" },
  { name: "Sean C", image: "/members/sean.jpg", role: "mechanical", id: "CR-03" },
  { name: "Oliver L", image: "/members/oliver.png", role: "strategy", id: "CR-04" },
  { name: "Subesh S", image: "/members/subesh.png", role: "innovation", id: "CR-05" },
  { name: "Chris W", image: "/members/chris.png", role: "programming", id: "CR-06" },
  { name: "Aaron Z", image: "/members/aaron.png", role: "design", id: "CR-07" },
  { name: "Leven S", image: "/members/leven.png", role: "research", id: "CR-08" },
];

const highlights = [
  { text: "Won national + state competitions in First Lego League.", icon: Trophy },
  { text: "Built and coded a robot to complete missions reliably.", icon: WrenchIcon },
  { text: "Made the SoftSense manipulator arm for our Innovation Project.", icon: Brain },
];

const taglines = [
  "robots that compete.",
  "ideas that inspire.",
  "perth, western australia.",
  "first lego league #3236.",
  "season: unearthed.",
];

const projects = [
  {
    num: "01",
    cat: "Robot Engineering",
    title: "FLL Unearthed Robot",
    desc: "Spike Prime build with custom attachments tuned to the 2025/26 Unearthed game. Modular mounts, calibrated drive base, and autonomous mission programs that score reliably under competition pressure.",
    tags: ["Spike Prime", "Python", "Onshape", "Iteration"],
    href: "/docs/robot",
    host: "/docs/robot",
    internal: true,
  },
  {
    num: "02",
    cat: "Innovation Project",
    title: "SoftSense Manipulator",
    desc: "Soft-robotic gripper designed for ROV manipulation in delicate underwater environments. Research dossier, mechanism prototypes, and test data documenting our innovation submission.",
    tags: ["Soft Robotics", "ROV", "Research", "Prototyping"],
    href: "/docs/innovation",
    host: "/docs/innovation",
    internal: true,
  },
  {
    num: "03",
    cat: "Documentation",
    title: "Engineering Notebook",
    desc: "Living documentation of our season — robot design rationale, code architecture, attachment library, and the research notes behind every iteration we ship to the field.",
    tags: ["Markdown", "Next.js", "Docs", "OpenSource"],
    href: "/docs",
    host: "/docs",
    internal: true,
  },
  {
    num: "04",
    cat: "Source Code",
    title: "FLL-Lebob-Unearthed",
    desc: "Mission code and autonomous routines for our 2025/26 robot. Open-source on GitHub. Pull requests welcome from other teams looking to share strategy or tools.",
    tags: ["Python", "Spike", "GitHub", "MIT"],
    href: "https://github.com/prawny-boy/FLL-Lebob-Unearthed",
    host: "github.com/prawny-boy",
    internal: false,
  },
  {
    num: "05",
    cat: "Hardware / CAD",
    title: "Onshape Workspace",
    desc: "Full CAD models for the robot, attachments, and SoftSense innovation prototypes. Live Onshape document — every revision logged.",
    tags: ["Onshape", "CAD", "STL", "DXF"],
    href: "https://cad.onshape.com/documents/47a3be0d6a2fdc65e8e54697/w/01a750025f75b7ddacbabc32/e/b3435ce241b6547a5a3021fb",
    host: "cad.onshape.com",
    internal: false,
  },
  {
    num: "06",
    cat: "Media",
    title: "Photo Gallery",
    desc: "Competition photos, build sessions, prototype iterations, and the moments between. Shot on Nikon and phone alike — the season as it actually happened.",
    tags: ["Gallery", "Photography", "Season 2026"],
    href: "/media",
    host: "/media",
    internal: true,
  },
];

const stack = [
  { head: "Hardware", sub: "what we build with", items: ["LEGO Spike Prime", "Sensors", "Custom attachments", "3D-printed parts"] },
  { head: "Software", sub: "what we code in", items: ["Python", "Spike app", "GitHub Actions", "Next.js (this site)"] },
  { head: "Design", sub: "where ideas take shape", items: ["Onshape CAD", "Bambu Studio", "Inkscape", "Adobe CC"] },
  { head: "Field", sub: "where it all matters", items: ["Unearthed mat", "Mission models", "Field rig", "Pit kit"] },
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
  return { src: withBasePath(preferredVariant?.src ?? sourcePath), srcSet };
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export default function Home() {
  const [, setClock] = useState("--:--:-- UTC+00");
  const [footClock, setFootClock] = useState("—");
  const tagRef = useRef<HTMLSpanElement | null>(null);
  const taglineTimer = useRef<number | null>(null);
  const taglineIdx = useRef(0);

  useEffect(() => {
    document.body.classList.add("p3-active");
    return () => document.body.classList.remove("p3-active");
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = pad2(d.getHours());
      const m = pad2(d.getMinutes());
      const s = pad2(d.getSeconds());
      const off = -d.getTimezoneOffset() / 60;
      const tz = `UTC${off >= 0 ? "+" : ""}${off}`;
      setClock(`${h}:${m}:${s} ${tz}`);
      setFootClock(`${d.getFullYear()} · built w/ teamwork`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const node = tagRef.current;
    if (!node) return;
    let cancelled = false;
    const schedule = (fn: () => void, ms: number) => {
      taglineTimer.current = window.setTimeout(fn, ms);
    };
    const cycle = () => {
      if (cancelled) return;
      const word = taglines[taglineIdx.current];
      let i = 0;
      node.textContent = "";
      const typeNext = () => {
        if (cancelled) return;
        if (i <= word.length) {
          node.textContent = word.slice(0, i);
          i++;
          schedule(typeNext, 55 + Math.random() * 40);
        } else schedule(erase, 2200);
      };
      const erase = () => {
        if (cancelled) return;
        if (i > 0) {
          i--;
          node.textContent = word.slice(0, i);
          schedule(erase, 25);
        } else {
          taglineIdx.current = (taglineIdx.current + 1) % taglines.length;
          schedule(cycle, 300);
        }
      };
      typeNext();
    };
    cycle();
    return () => {
      cancelled = true;
      if (taglineTimer.current !== null) window.clearTimeout(taglineTimer.current);
    };
  }, []);

  useEffect(() => {
    const order = ["top", "about", "projects", "stack", "crew", "contact"];
    const goSection = (delta: number) => {
      const y = window.scrollY + 120;
      let idx = 0;
      for (let i = 0; i < order.length; i++) {
        const el = document.getElementById(order[i]);
        if (el && el.offsetTop <= y) idx = i;
      }
      const next = Math.max(0, Math.min(order.length - 1, idx + delta));
      const target = document.getElementById(order[next]);
      if (target) {
        window.scrollTo({
          top: next === 0 ? 0 : target.offsetTop - 40,
          behavior: "smooth",
        });
      }
    };
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "j") {
        e.preventDefault();
        goSection(1);
      } else if (e.key === "k") {
        e.preventDefault();
        goSection(-1);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleAnchor = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: (target as HTMLElement).offsetTop - 40, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="p3-page" data-accent="amber" id="top">
      <main>
        {/* HERO */}
        <section className="hero container">
          <div className="hero-grid">
            <div>
              <div className="hero-eyebrow mono">FLL Robotics · Team #3236 · Perth</div>
              <h1 className="hero-name">
                Robots that compete<span className="amp">.</span>
                <br />
                <span className="soft">Ideas that inspire.</span>
              </h1>
              <div className="hero-tag mono">
                <span className="prompt">$</span>
                <span ref={tagRef} />
                <span className="caret" aria-hidden="true" />
              </div>
              <div className="hero-ctas">
                <a
                  href="#projects"
                  className="btn primary"
                  onClick={(e) => handleAnchor(e, "#projects")}
                >
                  <span>View Work</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </a>
                <a
                  href="https://github.com/prawny-boy/FLL-Lebob-Unearthed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.73.5.67 5.56.67 11.83c0 4.97 3.22 9.18 7.7 10.67.56.1.77-.24.77-.54v-1.9c-3.13.68-3.8-1.51-3.8-1.51-.51-1.31-1.25-1.66-1.25-1.66-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.43.11-2.98 0 0 .94-.3 3.1 1.16a10.75 10.75 0 0 1 5.64 0c2.15-1.46 3.09-1.16 3.09-1.16.62 1.55.23 2.69.11 2.98.72.79 1.15 1.8 1.15 3.03 0 4.33-2.63 5.29-5.14 5.57.41.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54 4.48-1.49 7.69-5.7 7.69-10.67C23.33 5.56 18.27.5 12 .5z" />
                  </svg>
                  <span>GitHub</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M8 7h9v9" />
                  </svg>
                </a>
                <Link href="/sponsor" className="btn">
                  <span>Sponsors</span>
                </Link>
              </div>
            </div>
            <aside className="hero-aside">
              <div className="row"><span className="k">location</span> <span className="v">Perth · WA</span></div>
              <div className="row"><span className="k">school</span> <span className="v">Perth Modern</span></div>
              <div className="row"><span className="k">team</span> <span className="v">#3236</span></div>
              <div className="row"><span className="k">season</span> <span className="v">Unearthed</span></div>
              <div className="row"><span className="k">members</span> <span className="v">08</span></div>
              <div className="row"><span className="k">mentors</span> <span className="v">02</span></div>
              <div className="row"><span className="k">status</span> <span className="acc">iterating</span></div>
            </aside>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="highlights" aria-label="Team highlights">
          <div className="container">
            <div className="highlights-grid">
              {highlights.map((item) => (
                <div key={item.text} className="highlight">
                  <item.icon />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section container" id="about">
          <header className="section-head">
            <span className="section-num">01</span>
            <span>about</span>
            <span className="section-dash" />
            <span>whoami</span>
          </header>
          <div className="about-grid">
            <div className="about-prose">
              <p>
                Lebob is an <strong>international FIRST LEGO League team</strong>{" "}
                based at Perth Modern School in Western Australia. We engineer
                robots, research soft-robotic mechanisms, and ship our work as
                documentation others can learn from.
              </p>
              <p>
                Eight members, two mentors, one shared workshop. Our goal is
                turning ideas into real, working prototypes through teamwork —
                and then sharing them with the rest of the engineering world.
              </p>
              <p className="pull">&quot;the workshop is home.&quot;</p>
              <p>
                We compete in the <strong>Unearthed</strong> season and run the{" "}
                <strong>SoftSense</strong> innovation project — a soft gripper
                for ROV manipulation. The goal: software, mechanisms, and a team
                that <strong>work well</strong> and <strong>feel right</strong>.
              </p>
              <a
                className="about-link mono"
                href="https://github.com/Lebob-Robotics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>github.com/Lebob-Robotics</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </a>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="stat-val">08</div>
                <div className="stat-key">members</div>
              </div>
              <div className="stat">
                <div className="stat-val" style={{ fontSize: "1.4rem", paddingTop: "0.6rem" }}>
                  State + Nat
                </div>
                <div className="stat-key">champions</div>
              </div>
              <div className="stat">
                <div className="stat-val" style={{ fontSize: "1.4rem", paddingTop: "0.6rem" }}>
                  Unearthed
                </div>
                <div className="stat-key">2025/26 season</div>
              </div>
              <div className="stat">
                <div className="stat-val">∞</div>
                <div className="stat-key">iterations shipped</div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section container" id="projects">
          <header className="section-head">
            <span className="section-num">02</span>
            <span>projects</span>
            <span className="section-dash" />
            <span>~/src</span>
          </header>

          <div className="projects">
            {projects.map((proj) =>
              proj.internal ? (
                <Link key={proj.num} className="project" href={proj.href}>
                  <span className="project-num mono">{proj.num}</span>
                  <span className="project-cat">{proj.cat}</span>
                  <div className="project-main">
                    <h3 className="project-title">
                      {proj.title}
                      <span className="project-title-caret mono">↗</span>
                    </h3>
                    <p className="project-desc">{proj.desc}</p>
                    <div className="project-tags">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-link-wrap">
                    <span className="arrow">↗</span>
                    <span className="project-link-host">{proj.host}</span>
                  </div>
                </Link>
              ) : (
                <a
                  key={proj.num}
                  className="project"
                  href={proj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="project-num mono">{proj.num}</span>
                  <span className="project-cat">{proj.cat}</span>
                  <div className="project-main">
                    <h3 className="project-title">
                      {proj.title}
                      <span className="project-title-caret mono">↗</span>
                    </h3>
                    <p className="project-desc">{proj.desc}</p>
                    <div className="project-tags">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-link-wrap">
                    <span className="arrow">↗</span>
                    <span className="project-link-host">{proj.host}</span>
                  </div>
                </a>
              ),
            )}
          </div>
        </section>

        {/* STACK */}
        <section className="section container" id="stack">
          <header className="section-head">
            <span className="section-num">03</span>
            <span>stack</span>
            <span className="section-dash" />
            <span>which --all</span>
          </header>
          <div className="stack-grid">
            {stack.map((group) => (
              <div key={group.head} className="stack-group">
                <div className="stack-head">{group.head}</div>
                <div className="stack-sub">{group.sub}</div>
                <ul className="stack-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CREW */}
        <section className="section container" id="crew">
          <header className="section-head">
            <span className="section-num">04</span>
            <span>crew</span>
            <span className="section-dash" />
            <span>personnel manifest</span>
          </header>

          <div className="crew-grid">
            {team.map((member) => {
              const memberImage = buildResponsiveImage(member.image, 160, 320);
              return (
                <article key={member.id} className="crew-cell">
                  <div className="crew-portrait">
                    <img
                      src={memberImage.src}
                      srcSet={memberImage.srcSet}
                      sizes="56px"
                      alt={member.name}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="crew-meta">
                    <span className="crew-id">{member.id}</span>
                    <h3>{member.name}</h3>
                  </div>
                </article>
              );
            })}
          </div>

          {(() => {
            const mentorImage = buildResponsiveImage("/members/mentors.jpg", 600, 1200);
            return (
              <article className="mentor-card">
                <div className="mentor-card-photo">
                  <img
                    src={mentorImage.src}
                    srcSet={mentorImage.srcSet}
                    sizes="(max-width: 900px) 100vw, 280px"
                    alt="Jade and Kaelie, Lebob mentors"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mentor-card-meta">
                  <span className="mentor-card-id mono">MT-01 · mentors / coaching</span>
                  <h3>
                    Jade <span className="amp">&amp;</span> Kaelie
                  </h3>
                  <p className="mentor-card-role">
                    Coaches · season 2026 · perth modern
                  </p>
                  <dl className="mentor-card-spec">
                    <div>
                      <dt>role</dt>
                      <dd>coach · mentor</dd>
                    </div>
                    <div>
                      <dt>tenure</dt>
                      <dd>season 2026</dd>
                    </div>
                  </dl>
                </div>
              </article>
            );
          })()}
        </section>

        {/* CONTACT */}
        <section className="section container contact" id="contact">
          <header className="section-head">
            <span className="section-num">05</span>
            <span>contact</span>
            <span className="section-dash" />
            <span>echo $REPLY</span>
          </header>
          <h2 className="contact-h">
            Sponsor a<br />
            future builder<span className="amp">.</span>
          </h2>
          <p className="contact-sub">
            Open to sponsorship, mentorship, and collaboration with other teams.
            Drop us a line — we run lean and we ship.
          </p>
          <div className="contact-links">
            <Link href="/sponsor" className="btn primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16v12H4z" />
                <path d="M4 7l8 6 8-6" />
              </svg>
              <span>Sponsor Lebob</span>
            </Link>
            <a
              href="https://github.com/prawny-boy/FLL-Lebob-Unearthed"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.73.5.67 5.56.67 11.83c0 4.97 3.22 9.18 7.7 10.67.56.1.77-.24.77-.54v-1.9c-3.13.68-3.8-1.51-3.8-1.51-.51-1.31-1.25-1.66-1.25-1.66-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.43.11-2.98 0 0 .94-.3 3.1 1.16a10.75 10.75 0 0 1 5.64 0c2.15-1.46 3.09-1.16 3.09-1.16.62 1.55.23 2.69.11 2.98.72.79 1.15 1.8 1.15 3.03 0 4.33-2.63 5.29-5.14 5.57.41.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54 4.48-1.49 7.69-5.7 7.69-10.67C23.33 5.56 18.27.5 12 .5z" />
              </svg>
              <span>github.com/prawny-boy/FLL-Lebob-Unearthed</span>
            </a>
            <a
              href="https://cad.onshape.com/documents/47a3be0d6a2fdc65e8e54697/w/01a750025f75b7ddacbabc32/e/b3435ce241b6547a5a3021fb"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <span>cad.onshape.com</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="who">Lebob FLL Robotics · Team #3236 · Perth Modern</div>
          <div>
            <a href="https://github.com/Lebob-Robotics" target="_blank" rel="noopener noreferrer">
              github.com/Lebob-Robotics
            </a>
          </div>
          <div>{footClock}</div>
        </div>
      </footer>

      <div className="kbd-hint" aria-hidden="true">
        <span className="kbd">j</span>
        <span className="kbd">k</span>
        <span style={{ alignSelf: "center" }}>section</span>
      </div>
    </div>
  );
}
