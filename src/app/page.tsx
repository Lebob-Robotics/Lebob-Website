import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  CircuitBoard,
  Github,
  Globe,
  HeartHandshake,
  Orbit,
  Sparkles,
  Trophy,
  Users,
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
import { ThemeToggle } from "@/components/theme-toggle";

const team = [
  {
    name: "Kingsley W",
    image: "/members/kingsley.png",
  },
  {
    name: "Andre N",
    image: "/members/andre.jpeg",
  },
  {
    name: "Sean C",
    image: "/members/sean.jpg",
  },
  {
    name: "Oliver L",
    image: "/members/oliver.png",
  },
  {
    name: "Subesh S",
    image: "/members/subesh.png",
  },
  {
    name: "Chris W",
    image: "/members/chris.png",
  },
  {
    name: "Aaron Z",
    image: "/members/aaron.png",
  },
  {
    name: "Leven S",
    image: "/members/leven.png",
  },
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
  {
    title: "Discover",
    detail: "Study the mission model and imagine our best run.",
  },
  {
    title: "Design",
    detail: "Prototype attachments, refine the drive base, repeat.",
  },
  {
    title: "Program",
    detail: "Automate missions and tune for consistency.",
  },
  {
    title: "Present",
    detail: "Share our innovation story and teamwork journey.",
  },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function withBasePath(path: string): string {
  return `${basePath}${path}`;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-grid" />
        <div className="relative z-20 mx-auto flex w-full max-w-6xl justify-end px-6 pt-6 sm:px-10">
          <ThemeToggle />
        </div>
        <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-16 sm:px-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="absolute -left-40 top-4 h-80 w-80 rounded-full bg-emerald-500/20 blur-[160px] animate-float" />
          <div className="absolute -right-32 top-14 h-80 w-80 rounded-full bg-sky-400/20 blur-[160px] animate-float delay-3" />

          <div className="relative z-10 flex flex-1 flex-col gap-6">
            <Badge className="w-fit bg-white/10 text-white hover:bg-white/20 animate-fade-up">
              FLL Team #3236 - 8 Members
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-up delay-1">
              Lebob is a
              <span className="text-gradient"> fearless FLL team</span> building
              robots and ideas that compete and inspire.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-200/90 animate-fade-up delay-2">
              We mix engineering, coding, and research to build reliable robots
              and tell the story behind every mission. Every run is a
              collaboration, every win a shared moment, and every season a push
              to be the best in the state.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up delay-3">
              <Button asChild className="bg-emerald-400 text-slate-950 hover:bg-emerald-300">
                <a
                  href="https://github.com/prawny-boy/FLL-Lebob-Unearthed"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Explore our GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <a href="#team">
                  Meet the team
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <Link href="/media">Team media</Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <Link href="/docs">Team docs</Link>
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 animate-fade-up delay-4">
              {[
                { label: "Members", value: "8" },
                { label: "Core Values", value: "6" },
                { label: "Mission Focus", value: "One team" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex w-full max-w-md flex-col gap-6 animate-fade-up delay-2">
            <Card className="glass text-white card-hover">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Sparkles className="h-5 w-5 text-emerald-300" />
                    Mission Console
                  </CardTitle>
                  <Badge className="bg-emerald-400/20 text-emerald-200">
                    Active
                  </Badge>
                </div>
                <CardDescription className="text-slate-300">
                  A quick look at how we operate together.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16">
                    <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-sm" />
                    <Image
                      src={withBasePath("/lebob.png")}
                      alt="Lebob team logo"
                      width={64}
                      height={64}
                      className="relative rounded-2xl border border-white/10 bg-white/5"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
                      Team Name
                    </p>
                    <p className="text-2xl font-semibold">Lebob</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  {[
                    {
                      icon: Trophy,
                      text: "Practice cycles that maximize consistency.",
                    },
                    {
                      icon: HeartHandshake,
                      text: "Collaboration keeps our ideas sharp.",
                    },
                    {
                      icon: BadgeCheck,
                      text: "Core values guide every build decision.",
                    },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <item.icon className="mt-1 h-5 w-5 text-emerald-300" />
                      <p className="text-sm text-slate-200">{item.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-white/10 via-transparent to-emerald-500/10 text-white card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BadgeCheck className="h-5 w-5 text-sky-300" />
                  Core Values in action
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Innovation, impact, inclusion, discovery, teamwork, and fun.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 animate-fade-up">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
                What we do
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Building robots is only half the story.
              </h2>
              <p className="mt-4 text-base text-slate-300">
                Our season is about turning wild ideas into reliable systems,
                then sharing how we got there. We design, iterate, and present as
                a single unit -- every win is a team win.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="border-white/10 bg-white/5 text-white card-hover"
                >
                  <CardHeader className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/20">
                      <value.icon className="h-5 w-5 text-emerald-300" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 animate-fade-up delay-1">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glow">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-sky-200">
                  Our flow
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  From mission model to match day.
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
                <Users className="h-4 w-4 text-emerald-200" />
                All 8 members contribute at every stage.
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 via-transparent to-transparent p-4 card-hover"
                >
                  <p className="text-sm font-semibold text-emerald-200">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {milestone.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 animate-fade-up delay-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
                Team Lebob
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Eight builders, one mission.
              </h2>
            </div>
            <Badge className="w-fit bg-white/10 text-white">2026 Season</Badge>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card
                key={member.name}
                className="border-white/10 bg-white/5 text-white card-hover"
              >
                <CardHeader className="space-y-3">
                  {member.image ? (
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-white/15">
                      <Image
                        src={withBasePath(member.image)}
                        alt={`${member.name} profile`}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-400/15">
                      <Users className="h-5 w-5 text-sky-300" />
                    </div>
                  )}
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-14 pt-0 sm:px-10 animate-fade-up delay-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
                Mentors
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Guidance behind the scenes.
              </h2>
            </div>
            <Badge className="w-fit bg-white/10 text-white">Support Team</Badge>
          </div>
          <Card className="mt-8 overflow-hidden border-white/10 bg-white/5 text-white card-hover">
            <div className="w-full bg-gradient-to-br from-slate-900/35 via-black/20 to-emerald-500/10 p-3 sm:p-5">
              <div className="relative mx-auto aspect-square w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={withBasePath(mentors.image)}
                  alt="Kaelie and Jade"
                  fill
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-contain"
                />
              </div>
            </div>
            <CardHeader className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15">
                <HeartHandshake className="h-5 w-5 text-emerald-200" />
              </div>
              <CardTitle className="text-2xl">{mentors.names.join(" & ")}</CardTitle>
            </CardHeader>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-6 sm:px-10 animate-fade-up delay-2">
          <Card className="border-white/10 bg-gradient-to-r from-emerald-500/20 via-sky-500/10 to-transparent text-white card-hover">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
                  Follow our solution
                </p>
                <h2 className="mt-3 text-3xl font-semibold">Our Innovations Design</h2>
                <p className="mt-2 max-w-xl text-sm text-slate-200">
                  Explore our 3D models and CAD files for SoftSense. See our design evolution, from early concepts to field-worthy products. Feel free to comment on our project on our forms!
                </p>
              </div>
              <Button
                size="lg"
                asChild
                className="github-cta-button"
              >
                <a
                  href="https://cad.onshape.com/documents/47a3be0d6a2fdc65e8e54697/w/01a750025f75b7ddacbabc32/e/b3435ce241b6547a5a3021fb?renderMode=0&uiState=698c7958681008fee6ee1ae9"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={withBasePath("/onshape.svg")}
                    alt="Onshape"
                    width={20}
                    height={20}
                    className="mr-2 h-5 w-5 onshape-icon"
                  />
                  Go to our Onshape
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
        <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-6 sm:px-10 animate-fade-up delay-2">
          <Card className="border-white/10 bg-gradient-to-r from-emerald-500/20 via-sky-500/10 to-transparent text-white card-hover">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">
                  Follow our build
                </p>
                <h2 className="mt-3 text-3xl font-semibold">Our GitHub lab</h2>
                <p className="mt-2 max-w-xl text-sm text-slate-200">
                  Code, notes, and project updates live in our repo. Explore
                  what we are building this season and see how Lebob grows with
                  each iteration.
                </p>
              </div>
              <Button
                size="lg"
                asChild
                className="github-cta-button"
              >
                <a
                  href="https://github.com/prawny-boy/FLL-Lebob-Unearthed"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  Visit GitHub
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            Lebob FLL Robotics Team
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <HeartHandshake className="h-4 w-4 text-emerald-300" />
              Built with teamwork
            </span>
            <span className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-sky-300" />
              <a
                href="https://github.com/prawny-boy/FLL-Lebob-Unearthed"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
            </span>
            <span className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-sky-300" />
              <a
                href="https://cad.onshape.com/documents/47a3be0d6a2fdc65e8e54697/w/01a750025f75b7ddacbabc32/e/b3435ce241b6547a5a3021fb?renderMode=0&uiState=698c7958681008fee6ee1ae9"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                Onshape
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
