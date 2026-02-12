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

import { ThemeToggle } from "@/components/theme-toggle";
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
  title: "How to Sponsor Us | Lebob",
  description:
    "Support Lebob with funding, tools, and mentorship to help our robotics team build, test, and compete.",
};

const supportOptions = [
  {
    title: "Financial Sponsorship",
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
  "A direct role in supporting student engineering growth",
];

const sponsorEmail = "your-team-email@example.com";

export default function SponsorPage() {
  return (
    <div className="min-h-screen">
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-grid" />
        <div className="absolute -left-40 top-4 h-80 w-80 rounded-full bg-emerald-500/20 blur-[160px] animate-float" />
        <div className="absolute -right-32 top-14 h-80 w-80 rounded-full bg-sky-400/20 blur-[160px] animate-float delay-3" />

        <div className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6 sm:px-10">
          <Button
            asChild
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/">
              Back to Home
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 pt-16 sm:px-10">
          <Badge className="w-fit bg-white/10 text-white hover:bg-white/20 animate-fade-up">
            Partner With Lebob
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl animate-fade-up delay-1">
            How to Sponsor Us
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-200 animate-fade-up delay-2">
            Your support helps our team build better robots, travel to
            competitions, and share STEM with more students in our community.
            We welcome sponsors of every size.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 animate-fade-up delay-3">
            <Button asChild className="bg-emerald-400 text-slate-950 hover:bg-emerald-300">
              <a href={`mailto:${sponsorEmail}?subject=Lebob%20Sponsorship%20Inquiry`}>
                Start a sponsorship conversation
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/docs">
                Review team documentation
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-3 text-xs text-slate-300 animate-fade-up delay-3">
            Update contact email in{" "}
            <code className="rounded bg-black/30 px-2 py-1">
              src/app/sponsor/page.tsx
            </code>{" "}
            before publishing.
          </p>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 py-8 sm:px-10 md:grid-cols-3 animate-fade-up delay-1">
          {supportOptions.map((option) => (
            <Card
              key={option.title}
              className="border-white/10 bg-white/5 text-white card-hover"
            >
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/20">
                  <option.icon className="h-5 w-5 text-emerald-200" />
                </div>
                <CardTitle>{option.title}</CardTitle>
                <CardDescription className="text-slate-300">
                  {option.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 py-8 sm:px-10 md:grid-cols-2 animate-fade-up delay-2">
          <Card className="border-white/10 bg-white/5 text-white card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <PackageCheck className="h-5 w-5 text-sky-300" />
                Where your sponsorship goes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {whereSupportGoes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <p className="text-sm text-slate-200">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BadgeCheck className="h-5 w-5 text-sky-300" />
                What sponsors receive
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sponsorBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <p className="text-sm text-slate-200">{benefit}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8 sm:px-10 animate-fade-up delay-3">
          <Card className="border-white/10 bg-gradient-to-r from-emerald-500/20 via-sky-500/10 to-transparent text-white card-hover">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
                  Ready to partner?
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  Sponsor Lebob this season
                </h2>
                <p className="mt-2 max-w-xl text-sm text-slate-200">
                  Reach out and we will share sponsor levels, timelines, and how
                  your support will be acknowledged.
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
