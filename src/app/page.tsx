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
  Newspaper,
  Orbit,
  Sparkles,
  Trophy,
  Users,
  Wrench,
  WrenchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getVariantList, pickVariantForWidth } from "@/lib/image-variants";

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
    description: "We first build our robot to our best specifications.",
    icon: Wrench,
  },
  {
    title: "Code",
    description: "We then program our robot to achieve our goals.",
    icon: CircuitBoard,
  },
  {
    title: "Iterate",
    description: "We continue researching and iterating to improve our standard.",
    icon: Orbit,
  },
  {
    title: "Inspire",
    description: "We show up for the community and inspire new builders.",
    icon: Globe,
  },
];

const milestones = [
  {
    title: "Plan",
    detail: "Study the game and imagine our best run.",
  },
  {
    title: "Design",
    detail: "Prototype and iterate on many attachments to achieve our strategy.",
  },
  {
    title: "Program",
    detail: "Automate missions to enable the robot to carry out runs.",
  },
  {
    title: "Present",
    detail: "Share our innovation and teamwork journey.",
  },
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

  return (
    <div className="lb-page">
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
                  Github
                </a>
                <a href="#team" className="lb-btn lb-btn-outline">
                  <Users />
                  Our Team
                </a>
                <Link href="/media" className="lb-btn lb-btn-ghost">
                  <ImageIcon />
                  Media
                </Link>
                <Link href="/docs" className="lb-btn lb-btn-ghost">
                  <Newspaper />
                  Documentation
                </Link>
                <Link href="/sponsor" className="lb-btn lb-btn-ghost">
                  <HeartHandshake />
                  Sponsors
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
              <h2>Building robots is only part of our goal.</h2>
              <p className="lb-copy-body">
                Our goal is about turning our ideas into real, working 
                prototypes through teamwork, then sharing how we got there.
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
                  <p>Our Process</p>
                  <h2>Guidelines for our success.</h2>
                </div>
                <div className="lb-pill">
                  <Users />
                  4 simple steps
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
                <h2>Our team members.</h2>
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
                  alt="Kaelie O and Jade T"
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
            <div className="lb-cta-grid">
              <article className="lb-cta-card">
                <div>
                  <p>Innovations</p>
                  <h2>Our Innovations</h2>
                  <p>
                    SoftSense research, documentation, and links.
                  </p>
                </div>
                <Link href="/inno" scroll className="lb-btn lb-btn-solid">
                  Inno
                </Link>
              </article>

              <article className="lb-cta-card">
                <div>
                  <p>Programming</p>
                  <h2>Our Robot Work</h2>
                  <p>
                    Robot documentation, coding resources, and files.
                  </p>
                </div>
                <Link href="/robot" scroll className="lb-btn lb-btn-solid">
                  Robot
                </Link>
              </article>
            </div>
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
