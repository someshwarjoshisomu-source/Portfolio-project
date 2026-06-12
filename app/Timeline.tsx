"use client";

import { motion, useReducedMotion } from "framer-motion";

type TimelineItem = {
  id: number;
  date: string;
  tag: string;
  title: string;
  desc: string;
  badge?: string;
};

const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: "Feb 2025",
    tag: "CATALYST",
    title: "Smart India Hackathon",
    desc: "The journey started here. Confused, out of my depth, and failed completely. The reality check that pushed me to start building seriously.",
  },
  {
    id: 2,
    date: "July 2025",
    tag: "INTERNSHIP",
    title: "Software Engineer Intern @ Forte",
    desc: "Started moving from quick prototypes toward more structured engineering while helping build ForteHR for a startup team.",
  },
  {
    id: 3,
    date: "Jan 2026",
    tag: "RESURGENCE",
    title: "VISIONOVIA-2K26",
    desc: "Returned to the competitive circuit at Anurag University with internship experience and a clearer approach to architecture.",
  },
  {
    id: 4,
    date: "Feb 2026",
    tag: "VALIDATION",
    title: "Innovathon & Webathon",
    desc: "Participated in back-to-back college hackathons and applied a year of learning to build Post-Op Guardian.",
    badge: "Webathon Winner",
  },
  {
    id: 5,
    date: "Mar 2026",
    tag: "MOMENTUM",
    title: "NOVUS'24 & Designathon",
    desc: "Worked in higher-pressure environments with a stronger focus on demos, storytelling, and system architecture.",
    badge: "2nd Runner-Up",
  },
];
export default function Timeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="grid-bg relative bg-[#09090b] py-10 md:py-12"
      aria-label="Build journey"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#09090b] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#09090b] to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(245,158,11,0.08),transparent_24%),radial-gradient(circle_at_82%_76%,rgba(14,165,233,0.06),transparent_20%)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mono text-xs uppercase tracking-[0.22em] text-amber-400">
            Build Journey
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            The short version of how the builder side developed.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            A straightforward sequence of the moments that shaped how I build, compete, and think about engineering.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-gradient-to-b from-amber-400/70 via-amber-400/20 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-5 md:space-y-6">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.article
                  key={item.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
                  className="relative pl-12 md:pl-0"
                >
                  <span className="absolute left-4 top-6 size-3 rounded-full border border-amber-300 bg-[#09090b] shadow-[0_0_18px_rgba(245,158,11,0.72)] md:left-1/2 md:-translate-x-1/2" />

                  <div className="grid gap-4 md:grid-cols-2 md:gap-8">
                    {isLeft ? (
                      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:mr-10 md:justify-self-end md:max-w-[520px] md:text-right">
                        <div className="flex items-center justify-between gap-4 md:flex-row-reverse">
                          <p className="mono text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
                            {item.tag}
                          </p>
                          <p className="mono shrink-0 text-xs text-slate-500">{item.date}</p>
                        </div>
                        <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{item.desc}</p>
                        {item.badge && (
                          <div className="mt-5 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-300">
                            {item.badge}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}

                    {!isLeft ? (
                      <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:ml-10 md:justify-self-start md:max-w-[520px]">
                        <div className="flex items-center justify-between gap-4">
                          <p className="mono text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
                            {item.tag}
                          </p>
                          <p className="mono shrink-0 text-xs text-slate-500">{item.date}</p>
                        </div>
                        <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{item.desc}</p>
                        {item.badge && (
                          <div className="mt-5 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-300">
                            {item.badge}
                          </div>
                        )}
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
