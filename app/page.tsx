"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Timeline from "./Timeline";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  LockKeyhole,
  Mail,
  Radio,
  Sparkles,
  Volume2,
} from "lucide-react";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

const tech = ["Next.js", "TypeScript", "Python", "PostgreSQL", "Supabase", "OpenAI", "Redis", "MongoDB"];

const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID ? `https://formspree.io/f/${FORMSPREE_FORM_ID}` : "";
const WELCOME_AUDIO_SRC = "/audio/welcome.mp3";

type ContactErrors = Partial<Record<"name" | "email" | "message" | "form", string>>;

const proofSignals = [
  "3rd-year CSE undergrad",
  "Summer 2027 internships",
  "5+ hackathons",
  "Backend, AI, and security focus",
];

const engineeringSnapshot = [
  {
    title: "Backend & APIs",
    copy: "Building Express/Node APIs, authentication flows, and database-backed workflows.",
  },
  {
    title: "Data & Storage",
    copy: "Worked with MongoDB aggregation, PostgreSQL, Supabase, and schema choices for dashboards, auth, and workflow state.",
  },
  {
    title: "Security",
    copy: "Interested in authorization, RBAC/RLS, rate limits, and interfaces that make risky actions visible to users.",
  },
  {
    title: "Applied AI",
    copy: "Uses AI APIs and ML pipelines as product features, with attention to explanations, fallback behavior, and user trust.",
  },
];

const engineeringCapabilities = [
  {
    title: "API & Backend Design",
    items: ["REST APIs", "Request validation", "Service boundaries", "Protected routes"],
  },
  {
    title: "Authentication & Authorization",
    items: ["JWT checks", "RBAC/RLS", "Scoped access", "Deny-by-default thinking"],
  },
  {
    title: "Data & Persistence",
    items: ["MongoDB aggregation", "PostgreSQL", "Supabase", "Dashboard queries"],
  },
  {
    title: "Applied AI Integration",
    items: ["AI explanations", "ML pipelines", "Fallback states", "Human review boundaries"],
  },
  {
    title: "Security Awareness",
    items: ["Rate limiting", "Phishing-risk UX", "Protected actions", "Trust boundaries"],
  },
];

const projects = [
  {
    title: "ZorFin",
    category: "Financial analytics platform",
    what:
      "A full-stack finance dashboard for turning transaction records into trend views and protected role-based workflows.",
    architecture:
      "React dashboard, Express API routes, JWT authentication, MongoDB persistence, aggregation queries, and Recharts visualizations.",
    stack: ["React 19", "Node.js", "Express", "MongoDB", "Recharts", "Jest"],
    demo: "https://zorvyn-finance-assignment-mu.vercel.app/",
    repo: "https://github.com/someshwarjoshisomu-source/zorvyn-finance-assignment",
    diagram: ["Frontend", "API Layer", "JWT Auth", "MongoDB", "Charts"],
    decisions: [
      "Used MongoDB aggregation to keep analytics logic close to the data source.",
      "Protected finance workflows with role-aware JWT checks.",
      "Kept chart rendering separate from API response shaping.",
    ],
    tradeoff:
      "MongoDB made flexible analytics iteration faster, but stricter relational reporting would need more deliberate schema design.",
    future:
      "Add clearer audit logs, stronger validation around finance records, and more focused test coverage for authorization paths.",
  },
  {
    title: "PhishGuard",
    category: "AI-assisted browser security",
    what:
      "A browser-security prototype that helps users reason about suspicious websites with threat checks and AI-generated explanations.",
    architecture:
      "Browser extension UI, API layer, Redis-backed rate limiting, classification pipeline, PostgreSQL storage, and Gemini explanations.",
    stack: ["React", "TypeScript", "Express", "PostgreSQL", "Redis", "Scikit-learn"],
    demo: "https://golden-hotteok-bbc1c1.netlify.app/",
    repo: "https://github.com/Jathinreddyyanna/ALS-Extension",
    diagram: ["Extension", "API Layer", "Redis", "ML Pipeline", "Database", "AI Explanation"],
    decisions: [
      "Separated fast threat checks from slower explanation generation.",
      "Used rate limiting as part of the security and reliability model.",
      "Focused the UI on clear risk communication instead of raw model output.",
    ],
    tradeoff:
      "AI explanations improve clarity, but the system still needs conservative fallbacks when confidence is low or services fail.",
    future:
      "Add stronger URL normalization, model evaluation notes, and a clearer human-review path for uncertain classifications.",
  },
];

const codingProfiles = [
  {
    platform: "Codeforces",
    handle: "someshwarjoshi.somu",
    href: "https://codeforces.com/profile/someshwarjoshi.somu",
  },
  {
    platform: "CodeChef",
    handle: "lively_zeal_60",
    href: "https://www.codechef.com/users/lively_zeal_60",
  },
  {
    platform: "LeetCode",
    handle: "SomeshwarJoshi",
    href: "https://leetcode.com/u/SomeshwarJoshi/",
  },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mono mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-amber-400">
      <Sparkles size={13} />
      {children}
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55 }}
      className={`rounded-lg border border-white/10 bg-[rgba(16,16,19,0.78)] p-6 shadow-2xl shadow-black/30 backdrop-blur ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ArchitectureFlow({ steps }: { steps: string[] }) {
  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
      {steps.map((step, index) => (
        <div key={step} className="relative">
          <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.045] px-3 py-3 text-sm text-slate-200">
            {step}
          </div>
          {index < steps.length - 1 && (
            <span className="mono absolute -right-2 top-1/2 hidden -translate-y-1/2 text-amber-400/70 sm:block">
              -&gt;
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [audioStatus, setAudioStatus] = useState<"idle" | "error">("idle");
  const [activeProject, setActiveProject] = useState(0);
  const [footerHash, setFooterHash] = useState(false);
  const project = projects[activeProject];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setPlaying(false), 5000);
    return () => window.clearTimeout(timer);
  }, [playing]);

  async function handleWelcomeNote() {
    const audio = audioRef.current;
    setAudioStatus("idle");
    setPlaying(true);

    if (!audio) return;

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch {
      setPlaying(false);
      setAudioStatus("error");
    }
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formStatus === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const gotcha = String(data.get("_gotcha") || "").trim();
    const nextErrors: ContactErrors = {};

    if (gotcha) return;
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!message) nextErrors.message = "Please enter a message.";
    if (!FORMSPREE_ENDPOINT) nextErrors.form = "Contact form is not configured yet.";

    if (Object.keys(nextErrors).length > 0) {
      setContactErrors(nextErrors);
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");
    setContactErrors({});

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error("Contact form request failed");
      setFormStatus("sent");
      setContactErrors({});
      form.reset();
    } catch {
      setContactErrors({ form: "Message could not be sent. Please try again." });
      setFormStatus("error");
    }
  }

  function showPreviousProject() {
    setActiveProject((current) => (current === 0 ? projects.length - 1 : current - 1));
  }

  function showNextProject() {
    setActiveProject((current) => (current + 1) % projects.length);
  }

  return (
    <main className="grid-bg relative min-h-screen overflow-x-hidden bg-[#09090b] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_8%,rgba(245,158,11,0.13),transparent_28%),radial-gradient(circle_at_14%_36%,rgba(14,165,233,0.09),transparent_26%)]" />

      <section className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1.35fr_0.9fr] lg:py-16">
        <div>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-sm text-slate-200">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            Available for Summer 2027 SWE, Backend, Platform, and AI Internships
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-8xl"
          >
            Someshwar Joshi
          </motion.h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            I&apos;m a 3rd-year Computer Science undergrad at VNR VJIET interested in building backend systems, applied AI, and security-focused product workflows. My projects explore authentication, APIs, database-backed applications, and AI-assisted user experiences.
          </p>

          <div className="mt-7 grid max-w-4xl gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {proofSignals.map((signal) => (
              <div
                key={signal}
                className="rounded-lg border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-slate-300"
              >
                <span className="mono text-amber-400">/</span> {signal}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-500 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400" href="#projects">
              View Projects <ChevronRight size={17} />
            </a>
            <a
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-white transition hover:border-amber-400/60"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={17} />
              Resume
            </a>
            <a
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-white transition hover:border-amber-400/60"
              href="#contact"
            >
              <Mail size={17} />
              Contact
            </a>
            <button
              type="button"
              onClick={handleWelcomeNote}
              className="group inline-flex h-12 items-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-white transition hover:border-amber-400/80 hover:shadow-[0_0_28px_rgba(245,158,11,0.2)]"
            >
              {playing ? <Radio size={18} /> : <Volume2 size={18} />}
              {playing ? "Playing..." : "Welcome Note"}
              {playing && (
                <span className="wave" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              )}
            </button>
            <audio
              ref={audioRef}
              src={WELCOME_AUDIO_SRC}
              preload="metadata"
              onEnded={() => setPlaying(false)}
              onError={() => {
                setPlaying(false);
                setAudioStatus("error");
              }}
            />
          </div>
          {audioStatus === "error" && (
            <p className="mt-3 text-sm text-red-300" aria-live="polite">
              Welcome note could not be played in this browser.
            </p>
          )}

          <div className="mt-14 flex flex-wrap gap-2">
            {tech.map((item) => (
              <span
                key={item}
                className="mono rounded-md border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-slate-500 grayscale transition hover:border-amber-400/50 hover:text-white hover:grayscale-0"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[430px]">
          <div className="portrait-shell relative h-full overflow-hidden rounded-[2rem] border border-amber-400/20 shadow-[0_0_80px_rgba(245,158,11,0.16)]">
            <Image
              src="/images/SomeshwarJoshi-Profile.jpeg"
              alt="Someshwar Joshi portrait"
              fill
              priority
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 430px"
              className="object-cover object-center opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
          </div>
          <svg className="pointer-events-none absolute -inset-8 h-[calc(100%+64px)] w-[calc(100%+64px)]" viewBox="0 0 520 520">
            <circle cx="260" cy="260" r="230" fill="none" stroke="rgba(245,158,11,0.16)" strokeWidth="1" />
            <g className="orbit">
              <circle className="orbit-sun" cx="260" cy="30" r="18" fill="#f59e0b" />
              <path d="M260 472a24 24 0 1 0 18-39 26 26 0 1 1-18 39Z" fill="#cbd5e1" />
            </g>
          </svg>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-12 md:px-8">
        <SectionLabel>Engineering Snapshot</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {engineeringSnapshot.map((item) => (
            <Card key={item.title} className="h-full">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-400">{item.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-14 md:px-8">
        <SectionLabel>Experience</SectionLabel>
        <Card className="group relative overflow-visible">
          <div className="absolute right-5 top-5 rounded-full border border-white/10 p-3 text-slate-500 transition group-hover:border-amber-400/50 group-hover:text-amber-400">
            <LockKeyhole size={22} />
          </div>
          <p className="text-sm text-amber-400">July 2025 - Nov 2025</p>
          <h2 className="mt-2 pr-14 text-3xl font-semibold">Software Engineer Intern at Forte</h2>
          <p className="mt-4 max-w-3xl text-slate-400">
            Built ForteHR features using React, TypeScript, Supabase RLS/RBAC, and OpenAI API integrations.
          </p>
          <ul className="mt-6 grid gap-3 text-sm text-slate-300">
            <li className="flex gap-3 leading-6">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
              <span>Built authenticated HR workflows with typed React interfaces and role-aware application states.</span>
            </li>
            <li className="group/lock rounded-lg border border-white/10 bg-white/[0.025] p-3 transition hover:border-amber-400/50">
              <div className="flex gap-3 leading-6">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>Worked with Supabase RLS/RBAC policies to keep access decisions close to the data layer.</span>
              </div>
              <div className="mt-3 hidden rounded-lg border border-amber-400/30 bg-zinc-950 p-4 shadow-2xl shadow-amber-950/30 group-hover/lock:block">
                <p className="mono text-xs text-amber-400">ACCESS MODEL</p>
                <div className="mt-3 grid gap-2 text-xs text-slate-300">
                  <span>Admin - HR Manager - Recruiter</span>
                  <span>Team Lead - Employee - Candidate</span>
                  <span className="text-emerald-400">Default posture: scoped access</span>
                </div>
              </div>
            </li>
            <li className="flex gap-3 leading-6">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
              <span>Integrated OpenAI-assisted flows where automation could support HR operations without replacing review.</span>
            </li>
          </ul>
        </Card>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-10 md:px-8">
        <SectionLabel>Research</SectionLabel>
        <Card className="cluster-bg group relative overflow-hidden">
          <p className="text-sm text-amber-400">Aug 2025</p>
          <h2 className="mt-2 text-3xl font-semibold">Water Quality Research Work</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Worked on a water quality assessment study exploring EF-BER with clustering and KNN. I keep this framed as research work unless a public proceedings link is available.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
              <span className="mono text-xs uppercase tracking-[0.16em] text-amber-400">Focus</span>
              <p className="mt-2">Data preprocessing, clustering behavior, KNN classification, and evaluation framing.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
              <span className="mono text-xs uppercase tracking-[0.16em] text-amber-400">Credibility note</span>
              <p className="mt-2">Shown as research experience, not over-claimed as a published result without a public link.</p>
            </div>
          </div>
        </Card>
      </section>

      <section id="projects" className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionLabel>Project Case Studies</SectionLabel>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Backend-focused projects with architecture notes.</h2>
            <p className="mt-4 leading-7 text-slate-400">
              These are framed around engineering decisions, tradeoffs, and next steps instead of inflated impact claims.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={showPreviousProject}
              aria-label="Show previous project"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] text-white transition hover:border-amber-400/60 hover:text-amber-400"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={showNextProject}
              aria-label="Show next project"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] text-white transition hover:border-amber-400/60 hover:text-amber-400"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <Card className="overflow-hidden bg-[#121214] p-0">
          <div className="relative min-h-[760px] p-6 sm:p-8 lg:min-h-[640px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(245,158,11,0.15),transparent_34%)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative flex h-full flex-col"
              >
              <p className="mono text-xs uppercase tracking-[0.2em] text-amber-400">
                Case Study 0{activeProject + 1}
              </p>
              <h2 className="mt-4 text-4xl font-semibold">{project.title}</h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
                {project.category}
              </p>
              <p className="mt-5 leading-7 text-slate-300">{project.what}</p>

              <div className="mt-6">
                <p className="mono text-xs uppercase tracking-[0.18em] text-amber-400">Architecture</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{project.architecture}</p>
                <ArchitectureFlow steps={project.diagram} />
              </div>

              <div className="mt-6 grid gap-4">
                <div>
                  <p className="mono text-xs uppercase tracking-[0.18em] text-amber-400">Engineering decisions</p>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300">
                    {project.decisions.map((decision) => (
                      <li key={decision} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
                    <p className="mono text-xs uppercase tracking-[0.18em] text-slate-500">Tradeoff</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{project.tradeoff}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
                    <p className="mono text-xs uppercase tracking-[0.18em] text-slate-500">Future improvement</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{project.future}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-slate-300">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-amber-500 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
                <a
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-medium text-white transition hover:border-amber-400/60"
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Code2 size={17} />
                  GitHub
                </a>
              </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative flex h-16 items-center justify-center gap-2 border-t border-white/10 px-6">
            {projects.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveProject(index)}
                aria-label={`Show ${item.title}`}
                aria-current={activeProject === index}
                className={`h-2.5 rounded-full transition-all ${activeProject === index ? "w-8 bg-amber-400" : "w-2.5 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </Card>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <SectionLabel>Engineering Capabilities</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {engineeringCapabilities.map((capability) => (
            <Card key={capability.title} className="h-full">
              <h2 className="text-base font-semibold text-white">{capability.title}</h2>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-400">
                {capability.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <SectionLabel>Achievements</SectionLabel>
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <Card className="group relative min-h-72 overflow-hidden border-amber-400/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_55%,rgba(245,158,11,0.22),transparent_34%)] opacity-0 transition group-hover:opacity-100" />
            <p className="text-sm text-amber-400">Webathon Winner - Feb 2026</p>
            <h2 className="mt-2 text-4xl font-semibold">Post-Op Guardian</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Built a healthcare-focused recovery monitoring concept with patient status tracking, alert-first UX, and a product flow designed around post-surgery care teams.
            </p>
            <svg className="mt-10 h-24 w-full" viewBox="0 0 620 120" fill="none">
              <path className="pulse-line" d="M0 70H90L110 70L130 24L158 104L182 70H260L284 70L306 42L332 88L354 70H620" stroke="#f59e0b" strokeWidth="4" />
            </svg>
            <div className="absolute bottom-6 right-6 translate-x-24 rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-zinc-950 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
              1st Place
            </div>
          </Card>

          <motion.div whileHover={{ rotateX: 6, rotateY: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 180, damping: 16 }}>
            <Card className="min-h-72 bg-[linear-gradient(145deg,rgba(245,158,11,0.14),rgba(16,16,19,0.92)_42%,rgba(14,165,233,0.12))]">
              <Bot className="text-amber-400" size={34} />
              <p className="mt-8 text-sm text-amber-400">Designathon 2nd Runner-Up - Mar 2026</p>
              <h2 className="mt-2 text-3xl font-semibold">PhishGuard</h2>
              <p className="mt-4 leading-7 text-slate-400">
                Designed a security experience that turns suspicious browser behavior into clear threat states, AI explanations, and user-facing decisions.
              </p>
            </Card>
          </motion.div>
        </div>
        <Card className="mt-5 border-amber-400/20 bg-amber-400/[0.045]">
          <p className="mono text-xs uppercase tracking-[0.18em] text-amber-400">Builder Momentum</p>
          <h2 className="mt-3 text-2xl font-semibold">Participated in 5+ hackathons and design sprints</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
            {["Rapid prototyping", "Team collaboration", "Demo storytelling", "Technical decisions under deadlines"].map((item) => (
              <div key={item} className="rounded-lg border border-amber-400/15 bg-black/15 px-4 py-3">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-12 md:px-8">
        <SectionLabel>Coding Profiles</SectionLabel>
        <Card className="bg-[#121214]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Problem solving profiles</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                Competitive programming and DSA practice links for quick verification.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {codingProfiles.map((profile) => (
                <a
                  key={profile.platform}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-amber-400/50 hover:bg-amber-400/[0.06]"
                >
                  <span className="mono block text-xs uppercase tracking-[0.16em] text-amber-400">
                    {profile.platform}
                  </span>
                  <span className="mt-2 block text-sm text-slate-300 transition group-hover:text-white">
                    {profile.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <Timeline />

      <section id="contact" className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <SectionLabel>Contact</SectionLabel>
        <Card className="bg-[#121214]">
          <div className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-semibold">Open to internships, networking, and technical discussions</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Interested in discussing software engineering, backend systems, applied AI, security-focused products, and Summer 2027 opportunities.
            </p>
          </div>
          <form onSubmit={handleContactSubmit} className="grid gap-5" noValidate>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">
                Name
                <input
                  required
                  name="name"
                  type="text"
                  aria-invalid={Boolean(contactErrors.name)}
                  aria-describedby={contactErrors.name ? "contact-name-error" : undefined}
                  className="h-12 rounded-lg border border-white/10 bg-transparent px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400"
                  placeholder="Your name"
                />
                {contactErrors.name && (
                  <span id="contact-name-error" className="text-xs text-red-300">
                    {contactErrors.name}
                  </span>
                )}
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  aria-invalid={Boolean(contactErrors.email)}
                  aria-describedby={contactErrors.email ? "contact-email-error" : undefined}
                  className="h-12 rounded-lg border border-white/10 bg-transparent px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400"
                  placeholder="you@example.com"
                />
                {contactErrors.email && (
                  <span id="contact-email-error" className="text-xs text-red-300">
                    {contactErrors.email}
                  </span>
                )}
              </label>
            </div>
            <label className="grid gap-2 text-sm text-slate-300">
              Message
              <textarea
                required
                name="message"
                minLength={10}
                aria-invalid={Boolean(contactErrors.message)}
                aria-describedby={contactErrors.message ? "contact-message-error" : undefined}
                className="min-h-[120px] resize-y rounded-lg border border-white/10 bg-transparent px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400"
                placeholder="Tell me what you are building, hiring for, or curious about."
              />
              {contactErrors.message && (
                <span id="contact-message-error" className="text-xs text-red-300">
                  {contactErrors.message}
                </span>
              )}
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500" aria-live="polite">
                {formStatus === "sent" && "Message ready. Thanks for reaching out."}
                {formStatus === "error" && (contactErrors.form || "Please fix the highlighted fields.")}
              </p>
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-amber-500 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-44"
              >
                {formStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </Card>
      </section>

      <footer className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 border-t border-white/10 px-5 py-9 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-wrap gap-4">
          <a className="inline-flex items-center gap-2 transition hover:text-white" href="https://github.com/someshwarjoshisomu-source" target="_blank" rel="noreferrer"><Code2 size={17} />GitHub</a>
          <a className="inline-flex items-center gap-2 transition hover:text-white" href="https://leetcode.com/u/SomeshwarJoshi/" target="_blank" rel="noreferrer"><Code2 size={17} />LeetCode</a>
          <a className="inline-flex items-center gap-2 transition hover:text-white" href="https://codeforces.com/profile/someshwarjoshi.somu" target="_blank" rel="noreferrer"><Code2 size={17} />Codeforces</a>
          <a className="inline-flex items-center gap-2 transition hover:text-white" href="https://www.codechef.com/users/lively_zeal_60" target="_blank" rel="noreferrer"><Code2 size={17} />CodeChef</a>
          <a className="inline-flex items-center gap-2 transition hover:text-white" href="mailto:someshwarjoshi.somu@gmail.com"><Mail size={17} />Email</a>
          <a className="inline-flex items-center gap-2 transition hover:text-white" href="/resume.pdf" target="_blank" rel="noreferrer"><FileText size={17} />Resume</a>
        </div>
        <button
          type="button"
          onMouseEnter={() => setFooterHash(true)}
          onMouseLeave={() => setFooterHash(false)}
          className="hash-cycle mono text-left text-xs text-emerald-400"
        >
          {footerHash ? "HANDSHAKE_ACCEPTED // BUILD_WHAT_SCALES" : "VNR-VJIET-NODE-01 // LATENCY: 12ms // STATUS: PRODUCTION_READY"}
        </button>
      </footer>
    </main>
  );
}
