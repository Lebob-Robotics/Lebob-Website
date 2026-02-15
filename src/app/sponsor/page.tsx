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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sponsorships | Lebob",
  description:
    "Sponsorship Page",
};

const supportOptions = [
  {
    title: "Financial",
    description:
      "Sponsor travel, registration fees, and build materials for the season.",
    icon: HandCoins,
  },
  {
    title: "Equipment and Materials",
    description:
      "Support us with tools, fabrication help, prototyping supplies, or printing resources.",
    icon: Wrench,
  },
  {
    title: "Professional Support",
    description:
      "Volunteer mentorship in engineering, software, communication, or project planning.",
    icon: Megaphone,
  },
];

const whereSupportGoes = [
  "Competition registration and event travel",
  "Prototype parts, sensors, and replacement hardware",
  "Presentation materials and community outreach demos",
  "Team learning resources and practice field upgrades",
];

const sponsorBenefits = [
  "Recognition on team materials and sponsorship page",
  "Project updates during the season",
  "Highlight mentions in team presentations and outreach",
  "A direct role in supporting us and our community",
];

const sponsorEmail = "your-team-email@example.com";

export default function SponsorPage() {
  return (
    <div className="sub-page">
      <main className="sub-main">
        <div className="sub-grid bg-grid" />
        <div className="sub-orb sub-orb-left" />
        <div className="sub-orb sub-orb-right" />

        <section className="sub-wrap sub-wrap-tight">
          <Badge className="sub-badge animate-fade-up">
            Sponsorships
          </Badge>
          <h1 className="sub-title animate-fade-up delay-1">
            Sponsor Us
          </h1>
          <p className="sub-text animate-fade-up delay-2">
            Your support helps our team build, improve and inspire more students in our community. We welcome sponsors of any size.
          </p>
          <div className="spon-actions animate-fade-up delay-3">
            <Button asChild className="spon-primary-btn">
              <a href={`mailto:${sponsorEmail}?subject=Lebob%20Sponsorship%20Inquiry`}>
                Start a conversation
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="sub-back-btn"
            >
              <Link href="/docs">
                Review our team documentation
                <ArrowUpRight className="sub-icon" />
              </Link>
            </Button>
          </div>
          <p className="spon-note animate-fade-up delay-3">
            Update contact email in{" "}
            <code className="sub-code">
              src/app/sponsor/page.tsx
            </code>{" "}
            before publishing.
          </p>
        </section>

        <section className="spon-grid spon-grid-3 animate-fade-up delay-1">
          {supportOptions.map((option) => (
            <Card
              key={option.title}
              className="spon-card card-hover"
            >
              <CardHeader className="spon-head">
                <div className="spon-icon">
                  <option.icon className="spon-icon-svg" />
                </div>
                <CardTitle>{option.title}</CardTitle>
                <CardDescription className="spon-desc">
                  {option.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="spon-grid spon-grid-2 animate-fade-up delay-2">
          <Card className="spon-card card-hover">
            <CardHeader>
              <CardTitle className="spon-title-row">
                <PackageCheck className="spon-title-icon" />
                Where your sponsorship goes
              </CardTitle>
            </CardHeader>
            <CardContent className="spon-list">
              {whereSupportGoes.map((item) => (
                <div key={item} className="spon-list-row">
                  <BadgeCheck className="spon-check" />
                  <p className="spon-list-text">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="spon-card card-hover">
            <CardHeader>
              <CardTitle className="spon-title-row">
                <BadgeCheck className="spon-title-icon" />
                What you receive
              </CardTitle>
            </CardHeader>
            <CardContent className="spon-list">
              {sponsorBenefits.map((benefit) => (
                <div key={benefit} className="spon-list-row">
                  <BadgeCheck className="spon-check" />
                  <p className="spon-list-text">{benefit}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="spon-cta-wrap animate-fade-up delay-3">
          <Card className="spon-cta-card card-hover">
            <CardContent className="spon-cta-inner">
              <div>
                <p className="spon-eyebrow">
                  Ready to support our team?
                </p>
                <h2 className="spon-cta-title">
                  Sponsor Lebob
                </h2>
                <p className="spon-cta-copy">
                  Reach out and we will discuss your part in our future.
                </p>
              </div>
              <Button size="lg" asChild className="github-cta-button">
                <a href={`mailto:${sponsorEmail}?subject=Lebob%20Sponsorship%20Inquiry`}>
                  Contact the team
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
