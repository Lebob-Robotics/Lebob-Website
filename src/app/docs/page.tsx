import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  FileText,
  Sparkles,
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
  title: "Team Documentation | Lebob",
  description: "Placeholder documentation page for Team Lebob.",
};

const docSections = [
  {
    title: "Build Notes",
    description: "Placeholder logs for robot design decisions and iterations.",
    icon: FileText,
  },
  {
    title: "Practice Plans",
    description: "Placeholder schedules, checklists, and role assignments.",
    icon: ClipboardList,
  },
  {
    title: "Season Handbook",
    description: "Placeholder reference docs for team standards and processes.",
    icon: BookOpen,
  },
];

export default function DocsPage() {
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
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-16 sm:px-10">
          <Badge className="w-fit bg-white/10 text-white hover:bg-white/20 animate-fade-up">
            Team Documentation
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl animate-fade-up delay-1">
            Lebob Docs Center
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-200/90 animate-fade-up delay-2">
            This page is a placeholder for team documentation. Structured docs,
            templates, and searchable references will be added next.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-up delay-3">
            {docSections.map((section) => (
              <Card
                key={section.title}
                className="border-white/10 bg-white/5 text-white card-hover"
              >
                <CardHeader className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-400/20">
                    <section.icon className="h-5 w-5 text-sky-300" />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {section.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="mt-8 border-white/10 bg-gradient-to-r from-sky-500/20 via-emerald-500/10 to-transparent text-white card-hover animate-fade-up delay-4">
            <CardContent className="flex items-center gap-3 p-6">
              <Sparkles className="h-5 w-5 text-sky-200" />
              <p className="text-sm text-slate-200">
                Placeholder mode active. Documentation index, links, and file
                previews will be added here.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
