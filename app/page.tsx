"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Timeline from "./Timeline";
import {
  Bot,
  ChevronRight,
  Code2,
  FileText,
  LockKeyhole,
  Mail,
  Radio,
  Sparkles,
  Volume2,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const tech = ["Next.js", "TypeScript", "Python", "PostgreSQL", "Supabase", "OpenAI", "Redis", "MongoDB"];

const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID ? `https://formspree.io/f/${FORMSPREE_FORM_ID}` : "";
const WELCOME_AUDIO_SRC = "/audio/welcome.mp3";

type ContactErrors = Partial<Record<"name" | "email" | "message" | "form", string>>;

const proofSignals = [
  "3rd-year CSE undergrad",
  "Summer 2027 SWE/AI internships",
  "5+ hackathons",
  "Backend, AI, and security focus",
];

const skillGroups = [
  {
    title: "Backend & Data",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase", "API design"],
  },
  {
    title: "AI & Security",
    items: ["Scikit-learn", "OpenAI/Gemini APIs", "Threat detection", "RBAC", "RLS"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Engineering Practice",
    items: ["Testing", "Caching", "Auth flows", "Product thinking", "System design"],
  },
];

const projects = [
  {
    title: "ZorFin",
    category: "Financial analytics platform",
    description:
      "A full-stack financial analytics platform using MongoDB aggregation for rolling 7-day trend analysis and JWT-based role-aware access.",
    stack: ["React 19", "Node.js", "Express", "MongoDB", "Recharts"],
    demo: "https://zorvyn-finance-assignment-mu.vercel.app/",
    repo: "https://github.com/someshwarjoshisomu-source/zorvyn-finance-assignment",
    caseStudy: [
      ["Problem", "Turn raw finance records into decision-ready trend views."],
      ["Architecture", "Express APIs, MongoDB aggregation, JWT role checks, and Recharts dashboards."],
      ["Outcome", "A deployable analytics project with tested API paths and protected workflows."],
    ],
    metrics: [
      "Rolling 7-day analytics with MongoDB aggregation",
      "JWT role checks across protected finance workflows",
      "7+ integration and smoke checks for core APIs",
    ],
  },
  {
    title: "PhishGuard",
    category: "AI-assisted browser security",
    description:
      "An AI-assisted browser security extension that combines a Scikit-learn threat detection pipeline with Gemini explanations to make suspicious links easier to understand.",
    stack: ["React", "TypeScript", "PostgreSQL", "Redis", "Scikit-learn"],
    demo: "https://golden-hotteok-bbc1c1.netlify.app/",
    repo: "https://github.com/Jathinreddyyanna/ALS-Extension",
    caseStudy: [
      ["Problem", "Help users reason about suspicious sites before they make risky decisions."],
      ["Architecture", "Extension UI, Express services, PostgreSQL storage, Redis rate limits, and an ML scoring pipeline."],
      ["Outcome", "A security-focused prototype that combines threat labels with AI-generated explanations."],
    ],
    metrics: [
      "Layered URL, behavior, and ML threat checks",
      "Redis-backed rate limiting for real-time scan requests",
      "AI explanations convert model output into user guidance",
    ],
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

function SectionLabel({ children }: { children: React.ReactNode }) {
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
  children: React.ReactNode;
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

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [audioStatus, setAudioStatus] = useState<"idle" | "error">("idle");
  const [footerHash, setFooterHash] = useState(false);

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % projects.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

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
            Available for Summer 2027 SWE & AI Internships
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
            I&apos;m a 3rd-year Computer Science undergrad at VNR VJIET Interested in building backend systems, applied AI, and security-focused product workflows. My projects explore authentication, APIs, database-backed applications, and AI-assisted user experiences, with a growing interest in scalable systems and software architecture.

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
            <button
              type="button"
              onClick={handleWelcomeNote}
              className="group inline-flex h-12 items-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-white transition hover:border-amber-400/80 hover:shadow-[0_0_28px_rgba(245,158,11,0.2)]"
            >
              {playing ? <Radio size={18} /> : <Volume2 size={18} />}
              {playing ? "Playing..." : "Play Welcome Note"}
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
            <a className="inline-flex h-12 items-center gap-2 rounded-lg bg-amber-500 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400" href="#projects">
              View Systems <ChevronRight size={17} />
            </a>
            <a
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-white transition hover:border-amber-400/60"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={17} />
              View Resume
            </a>
            <a
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-white transition hover:border-amber-400/60"
              href="#contact"
            >
              <Mail size={17} />
              Contact
            </a>
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

      <section className="relative mx-auto w-full max-w-7xl px-5 py-8 md:px-8">
        <SectionLabel>Engineering Stack</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <Card key={group.title} className="h-full">
              <h2 className="text-lg font-semibold text-white">{group.title}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-8 md:px-8" aria-hidden="true">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />
      </section>

      <Timeline />

      <section className="relative mx-auto w-full max-w-7xl px-5 py-8 md:px-8" aria-hidden="true">
        <div className="mx-auto h-16 max-w-3xl rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.1),transparent_68%)]" />
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-14 md:px-8">
        <SectionLabel>Experience & Research</SectionLabel>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="group relative overflow-visible">
            <div className="absolute right-5 top-5 rounded-full border border-white/10 p-3 text-slate-500 transition group-hover:border-amber-400/50 group-hover:text-amber-400">
              <LockKeyhole size={22} />
            </div>
            <p className="text-sm text-amber-400">July 2025 - Nov 2025</p>
            <h2 className="mt-2 text-3xl font-semibold">Software Engineer Intern at Forte</h2>
            <p className="mt-4 text-slate-400">Built ForteHR using React, TypeScript, Supabase RLS/RBAC, and the OpenAI API.</p>
            <ul className="mt-6 grid gap-3 text-sm text-slate-300">
              <li className="flex gap-3 leading-6">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>Built authenticated HR workflows with typed React interfaces.</span>
              </li>
              <li className="group/lock rounded-lg border border-white/10 bg-white/[0.025] p-3 transition hover:border-amber-400/50">
                <div className="flex gap-3 leading-6">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>Implemented role-aware access with Supabase RLS/RBAC policies.</span>
                </div>
                <div className="mt-3 hidden rounded-lg border border-amber-400/30 bg-zinc-950 p-4 shadow-2xl shadow-amber-950/30 group-hover/lock:block">
                  <p className="mono text-xs text-amber-400">ROLE HIERARCHY</p>
                  <div className="mt-3 grid gap-2 text-xs text-slate-300">
                    <span>Admin to HR Manager to Recruiter</span>
                    <span>Team Lead to Employee to Candidate</span>
                    <span className="text-emerald-400">Policy: deny-by-default</span>
                  </div>
                </div>
              </li>
              <li className="flex gap-3 leading-6">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>Integrated OpenAI-assisted flows for selected HR operations.</span>
              </li>
            </ul>
            {false && (
            <div className="hidden">
              <p>• Shipped authenticated HR workflows with typed React interfaces.</p>
              <div className="group/lock relative rounded-lg border border-white/10 bg-white/[0.025] p-3 transition hover:border-amber-400/50">
                • Hardened RBAC and row-level security for role-aware access.
                <div className="pointer-events-none absolute left-5 top-full z-10 mt-3 w-72 rounded-lg border border-amber-400/30 bg-zinc-950 p-4 opacity-0 shadow-2xl shadow-amber-950/30 transition group-hover/lock:opacity-100">
                  <p className="mono text-xs text-amber-400">ROLE HIERARCHY</p>
                  <div className="mt-3 grid gap-2 text-xs text-slate-300">
                    <span>Admin → HR Manager → Recruiter</span>
                    <span>Team Lead → Employee → Candidate</span>
                    <span className="text-emerald-400">Policy: deny-by-default</span>
                  </div>
                </div>
              </div>
            </div>
            )}
          </Card>

          <Card className="cluster-bg group relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" />
            <p className="text-sm text-amber-400">Aug 2025</p>
            <h2 className="mt-2 text-3xl font-semibold">ICACECS 2025 Research Work</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Worked on a water quality assessment study exploring EF-BER with clustering and KNN. Keeping this framed as research work unless a public paper or proceedings link is available.
            </p>
          </Card>
        </div>
      </section>

      <section id="projects" className="relative mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel>Engineered Projects</SectionLabel>
        <Card className="relative min-h-[860px] overflow-hidden bg-[#121214] p-0 lg:h-[860px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.16),transparent_34%)]" />
          <div className="relative flex min-h-[780px] p-6 sm:p-8 lg:h-[780px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={projects[activeProject].title}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="flex w-full flex-col justify-between"
              >
                <div>
                  <p className="mono text-xs uppercase tracking-[0.2em] text-amber-400">
                    Case Study 0{activeProject + 1}
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                    {projects[activeProject].title}
                  </h2>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
                    {projects[activeProject].category}
                  </p>
                  <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
                    {projects[activeProject].description}
                  </p>
                  <div className="mt-8 grid gap-3 lg:grid-cols-3">
                    {projects[activeProject].caseStudy.map(([label, detail]) => (
                      <div
                        key={label}
                        className="rounded-lg border border-white/10 bg-white/[0.025] p-4"
                      >
                        <span className="mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          {label}
                        </span>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {projects[activeProject].stack.map((item) => (
                      <span key={item} className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 grid gap-3 md:grid-cols-3">
                    {projects[activeProject].metrics.map((metric) => (
                      <div
                        key={metric}
                        className="rounded-lg border border-amber-400/15 bg-amber-400/[0.045] p-4 text-sm leading-6 text-slate-300"
                      >
                        <span className="mono mb-2 block text-[11px] uppercase tracking-[0.18em] text-amber-400">
                          Product Signal
                        </span>
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-amber-500 px-5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400"
                    href={projects[activeProject].demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                  <a
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-medium text-white transition hover:border-amber-400/60"
                    href={projects[activeProject].repo}
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
          <div className="relative flex h-20 items-center justify-center gap-2 border-t border-white/10 px-6 py-4">
            {projects.map((project, index) => (
              <button
                key={project.title}
                onClick={() => setActiveProject(index)}
                aria-label={`Show ${project.title}`}
                className={`h-2.5 rounded-full transition-all ${activeProject === index ? "w-8 bg-amber-400" : "w-2.5 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </Card>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
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
              <p className="mt-4 leading-7 text-slate-400">Designed a security experience that turns suspicious browser behavior into clear threat states, AI explanations, and user-facing decisions.</p>
            </Card>
          </motion.div>
        </div>
        <Card className="mt-5 border-amber-400/20 bg-amber-400/[0.045]">
          <p className="mono text-xs uppercase tracking-[0.18em] text-amber-400">Builder Momentum</p>
          <h2 className="mt-3 text-2xl font-semibold">Participated in 5+ hackathons and design sprints</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            These builds shaped my approach to fast product discovery, scoped engineering execution, secure-by-default thinking, and presenting technical decisions clearly under time pressure.
          </p>
        </Card>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <SectionLabel>Coding Profiles</SectionLabel>
        <Card className="bg-[#121214]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Problem solving profiles</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                Verified competitive programming and DSA practice profiles.
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

      <section id="contact" className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <SectionLabel>Let's Connect</SectionLabel>
        <Card className="bg-[#121214]">
          <div className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-semibold">Open to internships, networking, and technical discussions</h2>
            <p className="mt-3 leading-7 text-slate-400">
              I&apos;m actively preparing for Summer 2027 SWE/AI roles and looking to learn from engineers building reliable, secure, scalable products.
            </p>
          </div>
          <form onSubmit={handleContactSubmit} className="grid gap-5" noValidate>
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
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

      <section className="relative mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
        <SectionLabel>/now</SectionLabel>
        <div className="rounded-lg border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/35">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-amber-400" />
            <span className="size-3 rounded-full bg-emerald-400" />
            <span className="mono ml-3 text-xs text-slate-500">now.md</span>
          </div>
          <div className="mono group relative p-6 text-sm leading-7 text-slate-300 sm:text-base">
            <p><span className="text-slate-500">#</span> Now</p>
            <p className="mt-4">3rd-year CSE undergrad at VNR VJIET.</p>
            <p>Learning distributed systems architecture and secure product engineering.</p>
            <p>Preparing for the Summer 2027 hiring cycle and open to networking.<span className="ml-1 inline-block h-5 w-2 animate-pulse bg-amber-400 align-middle" /></p>
            <span className="absolute right-5 top-5 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-500 opacity-0 transition group-hover:opacity-100">
              Last updated: 3 mins ago
            </span>
          </div>
        </div>
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
