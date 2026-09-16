"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Award, ExternalLink, Terminal, GitBranch } from "lucide-react";

interface TimelineItem {
  id: number;
  date: string;
  tag: string;
  title: string;
  role?: string;
  desc: string;
  tech?: string[];
  badge?: string;
  badgeColor?: string;
  status: "active" | "milestone" | "completed";
  link?: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: "Jul 2026 – Present",
    tag: "CURRENT_ROLE",
    title: "Software Developer Intern",
    role: "MyClassBoard (Hyderabad, India)",
    desc: "Developing asynchronous RESTful backend services in Python and FastAPI for AgentP. Engineered an ONNX Runtime + OpenCV computer vision pipeline (5-point facial landmark alignment, 512-dim embeddings) achieving 0% false-positive match rate. Scaled backend throughput via PostgreSQL pooling and authored 500+ Pytest tests.",
    tech: ["Python", "FastAPI", "ONNX Runtime", "OpenCV", "PostgreSQL", "Pytest"],
    badge: "Active Node // 0% FP Match",
    badgeColor: "emerald",
    status: "active",
  },
  {
    id: 2,
    date: "May 2026 – Present",
    tag: "SYSTEM_DEPLOY",
    title: "Campus Project Tracker",
    role: "Core Architecture & Backend",
    desc: "Architected a highly normalized PostgreSQL schema with composite indexes, eliminating N+1 bottlenecks via optimized single-query Spring/JPQL aggregations. Built stateless JWT authentication with Spring Security and rate limiting. Deployed via Docker and GitHub Actions CI/CD with Maven/JUnit tests.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "JWT", "GitHub Actions"],
    badge: "Full-Stack System",
    badgeColor: "sky",
    status: "completed",
    link: "https://project-tracker-frontend-cyan.vercel.app/",
  },
  {
    id: 3,
    date: "Mar 2026",
    tag: "COMPETITIVE_WIN",
    title: "Designathon 2nd Runner-Up",
    role: "PhishGuard Threat Intelligence",
    desc: "Automated real-time phishing threat detection across URLs and file downloads via custom browser security extension (TypeScript, Manifest V3). Integrated hybrid ML algorithm pipeline (Scikit-learn on 50,000+ malicious records) with Gemini AI for human-readable threat explanations.",
    tech: ["React", "TypeScript", "Scikit-learn", "PostgreSQL", "Redis", "Gemini AI"],
    badge: "2nd Runner-Up",
    badgeColor: "amber",
    status: "milestone",
    link: "https://github.com/Jathinreddyyanna/ALS-Extension",
  },
  {
    id: 4,
    date: "Feb 2026",
    tag: "1ST_PLACE_AWARD",
    title: "Webathon Winner (1st Place)",
    role: "Post-Op Guardian Platform",
    desc: "Engineered a full-stack recovery monitoring application to automate post-surgery patient check-ins, securing 1st place overall at the university Webathon. Built scalable REST APIs to process and validate critical patient recovery metrics for medical staff.",
    tech: ["React", "Node.js", "Express", "REST APIs", "PostgreSQL"],
    badge: "1st Place Winner",
    badgeColor: "emerald",
    status: "milestone",
  },
  {
    id: 5,
    date: "Aug 2025",
    tag: "ACADEMIC_RESEARCH",
    title: "Research Publication @ ICACECS 2025",
    role: "Co-Author, Water Quality Analytics",
    desc: "Co-authored peer-reviewed research paper on algorithmic water quality assessment utilizing EF-BER, clustering, and KNN algorithms. Evaluated classification accuracy across multi-parameter sensor vectors.",
    tech: ["EF-BER", "Clustering", "KNN", "Python", "Data Modeling"],
    badge: "ICACECS 2025 Proceeding",
    badgeColor: "sky",
    status: "completed",
    link: "https://www.researchgate.net/scientific-contributions/Joshi-Someshwar-2356593405",
  },
  {
    id: 6,
    date: "Jul 2025 – Nov 2025",
    tag: "INTERNSHIP",
    title: "Software Engineer Intern",
    role: "FORTE (Hyderabad, India)",
    desc: "Architected ForteHR, an internal full-stack AI-powered HR analytics platform (React, TypeScript, Supabase) with role-based access control (RBAC/RLS). Integrated OpenAI API to power an automated HR assistant eliminating manual reporting bottlenecks.",
    tech: ["React", "TypeScript", "Supabase RLS", "OpenAI API", "PostgreSQL"],
    badge: "5-Month Internship",
    badgeColor: "sky",
    status: "completed",
  },
  {
    id: 7,
    date: "Feb 2025",
    tag: "CATALYST_EVENT",
    title: "Smart India Hackathon",
    role: "The Initial Reality Check",
    desc: "The turning point. Out of depth and failed completely—the necessary catalyst that inspired an obsession with mastering scalable architecture, rigorous database modeling, and production systems.",
    tech: ["Systems Thinking", "Competitive Circuit"],
    badge: "The Genesis",
    badgeColor: "zinc",
    status: "completed",
  },
];

export default function Timeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="journey"
      className="relative bg-terminal-canvas py-16 md:py-24 border-t border-white/5"
      aria-label="Engineering timeline"
    >
      {/* Background ambient radial gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(56,189,248,0.06),transparent_35%),radial-gradient(circle_at_85%_75%,rgba(74,222,128,0.04),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-mono tracking-wider text-sky-400 mb-3">
            <GitBranch size={13} />
            <span>EXECUTION_CHRONOLOGY // V4.2</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engineering Milestones & Build Trajectory
          </h2>
          <p className="mt-3 text-sm text-zinc-400 font-sans leading-relaxed">
            From the initial catalyst to production computer vision pipelines at MyClassBoard, hackathon victories, and academic publications.
          </p>
        </div>

        <div className="relative">
          {/* Vertical guideline */}
          <div className="pointer-events-none absolute left-4 top-0 h-full w-[1px] bg-gradient-to-b from-sky-500/60 via-zinc-800 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.article
                  key={item.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: "easeOut" }}
                  className="relative pl-12 md:pl-0"
                >
                  {/* Status Indicator Dot on Timeline */}
                  <span
                    className={`absolute left-4 top-6 z-10 size-3.5 -translate-x-1/2 rounded-full border md:left-1/2 ${
                      item.status === "active"
                        ? "border-emerald-400 bg-emerald-500 shadow-[0_0_16px_rgba(74,222,128,0.8)] animate-pulse"
                        : item.status === "milestone"
                        ? "border-amber-400 bg-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.6)]"
                        : "border-sky-400/80 bg-[#08080C] shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                    }`}
                  />

                  <div className="grid gap-4 md:grid-cols-2 md:gap-12">
                    {/* Left side card */}
                    {isLeft ? (
                      <div className="group relative rounded-xl border border-zinc-800 bg-[#12121A]/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-sky-500/40 md:mr-6 md:justify-self-end md:max-w-[560px] md:text-left">
                        {/* Terminal header line */}
                        <div className="flex items-center justify-between gap-4 border-b border-zinc-800/80 pb-3 mb-3">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-sky-400 font-semibold">
                            {item.tag}
                          </span>
                          <span className="font-mono text-[11px] text-zinc-500">{item.date}</span>
                        </div>

                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                            {item.title}
                          </h3>
                          {item.role && (
                            <span className="text-xs font-mono text-zinc-400">
                              {item.role}
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-zinc-400 font-sans">
                          {item.desc}
                        </p>

                        {item.tech && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {item.tech.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[10px] rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-zinc-400"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-5 flex items-center justify-between pt-3 border-t border-zinc-900">
                          {item.badge && (
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                                item.badgeColor === "emerald"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                  : item.badgeColor === "amber"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                                  : "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                              }`}
                            >
                              <Award size={11} /> {item.badge}
                            </span>
                          )}
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-sky-400 transition-colors"
                            >
                              <span>Inspect</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}

                    {/* Right side card */}
                    {!isLeft ? (
                      <div className="group relative rounded-xl border border-zinc-800 bg-[#12121A]/90 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-sky-500/40 md:ml-6 md:justify-self-start md:max-w-[560px]">
                        <div className="flex items-center justify-between gap-4 border-b border-zinc-800/80 pb-3 mb-3">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-sky-400 font-semibold">
                            {item.tag}
                          </span>
                          <span className="font-mono text-[11px] text-zinc-500">{item.date}</span>
                        </div>

                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                            {item.title}
                          </h3>
                          {item.role && (
                            <span className="text-xs font-mono text-zinc-400">
                              {item.role}
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-zinc-400 font-sans">
                          {item.desc}
                        </p>

                        {item.tech && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {item.tech.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[10px] rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-zinc-400"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-5 flex items-center justify-between pt-3 border-t border-zinc-900">
                          {item.badge && (
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                                item.badgeColor === "emerald"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                  : item.badgeColor === "amber"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                                  : "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                              }`}
                            >
                              <Award size={11} /> {item.badge}
                            </span>
                          )}
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-sky-400 transition-colors"
                            >
                              <span>Inspect</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
