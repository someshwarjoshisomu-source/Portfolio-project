"use client";

import React, { useState, useEffect, useRef, FormEvent, ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Timeline from "./Timeline";
import emailjs from "@emailjs/browser";
import {
  Code2,
  FileText,
  Mail,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Award,
  BookOpen,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Cpu,
  Database,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Send,
  ThumbsUp,
  Radio,
  Share2,
  Search,
  X,
  Lock,
  Flame,
  Binary,
} from "lucide-react";

// ==========================================
// DATA STRUCTURES & DEFINITIONS
// ==========================================
interface Project {
  id: string;
  title: string;
  tag: string;
  badge: string;
  category: string;
  period: string;
  stack: string[];
  brief: string;
  architecture: string;
  diagram: string[];
  metrics: string[];
  decisions: string[];
  tradeoff: string;
  future: string;
  demo?: string;
  repo?: string;
}

const PROJECTS: Project[] = [
  {
    id: "campus-tracker",
    title: "Campus Project Tracker",
    tag: "CORE_BACKEND_NODE",
    badge: "Production Architecture",
    category: "Full-Stack Enterprise & Academic Platform",
    period: "May 2026 – Present",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker", "JWT", "Maven", "GitHub Actions"],
    brief:
      "A centralized academic platform engineered to track, evaluate, and manage university project submissions at scale with high-throughput database efficiency.",
    architecture:
      "Stateless Spring Boot REST API Layer with custom security filter chains -> JPA/Hibernate ORM -> Highly normalized PostgreSQL schema with composite multi-column indexing. Containerized via Docker with automated GitHub Actions CI/CD running Maven/JUnit test suites on every commit.",
    diagram: [
      "Client UI",
      "Stateless JWT Filter",
      "Spring Security Guard",
      "Service Aggregations",
      "PostgreSQL (Composite Indexes)",
      "Docker CI/CD",
    ],
    metrics: [
      "Eliminated N+1 query bottlenecks via optimized single-query Spring/JPQL aggregations",
      "Stateless JWT authentication APIs with in-memory rate limiting against brute-force attacks",
      "Dockerized container builds with automated GitHub Actions testing CI/CD pipeline",
    ],
    decisions: [
      "Replaced in-memory evaluation loops with composite database indexes to execute single-query aggregates.",
      "Applied stateless JWT verification in custom filter chains to protect administrative endpoints.",
      "Enforced automated Maven/JUnit unit and integration tests inside Docker CI/CD before staging deploy.",
    ],
    tradeoff:
      "Strict schema normalization and composite indexing require deliberate migrations, but maximize read speed and data consistency across concurrent student records.",
    future:
      "Introduce Redis caching for real-time leaderboard statistics and asynchronous batch PDF generation for faculty rubrics.",
    demo: "https://project-tracker-frontend-cyan.vercel.app/",
    repo: "https://github.com/someshwarjoshisomu-source/dbms_cbp.git",
  },
  {
    id: "post-op",
    title: "Post-Op Guardian",
    tag: "WEBATHON_WINNER_1ST",
    badge: "1st Place Winner",
    category: "Healthcare Recovery & Clinical Monitoring",
    period: "Feb 2026",
    stack: ["React", "Node.js", "Express", "REST APIs", "PostgreSQL"],
    brief:
      "Full-stack post-surgery recovery monitoring platform automating patient check-ins and clinical vital status reporting, securing 1st place overall at the university Webathon.",
    architecture:
      "React Alert-First Dashboard -> Express.js REST API Layer -> Validation Middleware -> PostgreSQL storage. Continuously computes anomaly scores across patient-reported post-op recovery metrics.",
    diagram: [
      "Patient Check-in UI",
      "Express REST API",
      "Telemetry Validator",
      "PostgreSQL Database",
      "Clinical Alert Engine",
    ],
    metrics: [
      "1st Place Overall at University Webathon (Feb 2026)",
      "Zero-friction patient check-in loop validating 12+ postoperative recovery factors",
      "Alert-first triage dashboard for rapid escalation by clinical nursing staff",
    ],
    decisions: [
      "Designed an alert-first UI hierarchy so critical pain or infection indicators visually preempt routine stats.",
      "Used normalized PostgreSQL relational records for audit-trail compliance in clinical data retrieval.",
      "Implemented strict request schema validation on incoming vitals to avoid corrupted telemetry.",
    ],
    tradeoff:
      "Focused on rapid doctor-patient communication UX over complex wearable device IoT hardware integrations.",
    future:
      "Integrate automated SMS/WhatsApp alerts for emergency threshold breaches and support localized speech check-ins.",
  },
  {
    id: "phishguard",
    title: "PhishGuard ML",
    tag: "DESIGNATHON_RUNNER_UP",
    badge: "2nd Runner-Up",
    category: "AI Threat Detection & Browser Security",
    period: "Jan 2026 – Mar 2026",
    stack: ["React", "TypeScript", "Scikit-learn", "PostgreSQL", "Redis", "Google Gemini AI"],
    brief:
      "Real-time browser security extension providing client-side malicious URL and download threat classification backed by Scikit-learn models and AI explanations.",
    architecture:
      "Chrome Manifest V3 Extension (TypeScript) -> Redis-backed rate limiter API gateway -> Scikit-learn ML inference pipeline (trained on 50,000+ records) -> Google Gemini AI explanation generator -> PostgreSQL threat repository.",
    diagram: [
      "Chrome Extension (V3)",
      "Redis Rate Limiter",
      "Scikit-learn Classifier",
      "Gemini AI Explanation",
      "PostgreSQL Threat Log",
    ],
    metrics: [
      "Trained ML classifier over 50,000+ malicious & benign training vector records",
      "Designathon 2nd Runner-Up (March 2026)",
      "Under 45ms heuristic pre-check before invoking Gemini generative explanation",
    ],
    decisions: [
      "Decoupled fast heuristic/ML model classification from conversational AI explanation generation.",
      "Added Redis rate-limiting to protect the Gemini API from abuse on rapid browser navigation.",
      "Designed clear threat score badges so non-technical users understand why a domain was flagged.",
    ],
    tradeoff:
      "Generative AI explanations improve clarity, but require structured fallback rules if API latency limits spike.",
    future:
      "Incorporate local ONNX client-side inference directly inside the browser extension to operate offline.",
    repo: "https://github.com/Jathinreddyyanna/ALS-Extension",
  },
];

const METRICS_DATA = [
  {
    title: "ACADEMIC_EXCELLENCE",
    value: "9.1 CGPA",
    subtext: "VNR VJIET • B.Tech Computer Science (2024–2028)",
    status: "active",
  },
  {
    title: "COMPUTER_VISION_PIPELINE",
    value: "0% False Positives",
    subtext: "ONNX Runtime & 512-dim facial embeddings @ MyClassBoard",
    status: "active",
  },
  {
    title: "HACKATHON_HONORS",
    value: "1st Place Winner",
    subtext: "University Webathon (Post-Op Guardian)",
    status: "milestone",
  },
  {
    title: "ML_DATASET_SCALE",
    value: "50,000+ Records",
    subtext: "Trained threat vectors in PhishGuard security extension",
    status: "active",
  },
  {
    title: "TEST_RELIABILITY",
    value: "500+ Pytest Tests",
    subtext: "Strict data isolation & unit/integration tests authored",
    status: "active",
  },
  {
    title: "COMPETITIVE_AWARDS",
    value: "2nd Runner-Up",
    subtext: "Designathon 2026 (PhishGuard ML)",
    status: "milestone",
  },
];

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Java", "Python", "C++", "C", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
  },
  {
    title: "Backend & Web Services",
    icon: ServerIcon,
    skills: ["Spring Boot", "FastAPI", "Node.js", "Express.js", "RESTful APIs", "SOAP", "Asyncio"],
  },
  {
    title: "Systems & Algorithms",
    icon: Cpu,
    skills: ["Data Structures", "Object-Oriented Design", "Relational Database Optimization", "Complexity Analysis"],
  },
  {
    title: "Databases & Storage",
    icon: Database,
    skills: ["PostgreSQL", "Oracle SQL", "MySQL", "MongoDB", "Redis", "Connection Pooling"],
  },
  {
    title: "Cloud, AI & DevOps",
    icon: Layers,
    skills: ["Google Cloud Platform (GCS)", "ONNX Runtime", "OpenCV", "Supabase", "Docker", "GitHub Actions", "CI/CD"],
  },
  {
    title: "Frontend Engineering",
    icon: Zap,
    skills: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Framer Motion"],
  },
  {
    title: "Tools & Testing",
    icon: ShieldCheck,
    skills: ["Git", "GitHub", "Maven", "JUnit", "Pytest", "Figma", "StarUML"],
  },
];

function ServerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

const CODING_PROFILES = [
  {
    platform: "LeetCode",
    handle: "someshwarjoshi",
    href: "https://leetcode.com/u/someshwarjoshi/",
    color: "#FFA116",
  },
  {
    platform: "Codeforces",
    handle: "someshwarjoshi.somu",
    href: "https://codeforces.com/profile/someshwarjoshi.somu",
    color: "#38BDF8",
  },
  {
    platform: "CodeChef",
    handle: "lively_zeal_60",
    href: "https://www.codechef.com/users/lively_zeal_60",
    color: "#A78BFA",
  },
  {
    platform: "ResearchGate",
    handle: "Joshi-Someshwar",
    href: "https://www.researchgate.net/scientific-contributions/Joshi-Someshwar-2356593405",
    color: "#00CCBB",
  },
  {
    platform: "GitHub",
    handle: "someshwarjoshisomu-source",
    href: "https://github.com/someshwarjoshisomu-source",
    color: "#4ADE80",
  },
  {
    platform: "LinkedIn",
    handle: "someshwar-joshi",
    href: "https://linkedin.com/in/someshwar-joshi",
    color: "#0077B5",
  },
];

// ==========================================
// SUB-COMPONENTS: METRIC CARD & PROJECT NODE
// ==========================================
function MetricCard({
  title,
  value,
  subtext,
  status = "active",
}: {
  title: string;
  value: string;
  subtext: string;
  status?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-[#12121A]/90 p-5 font-mono group hover:border-sky-500/40 transition-all duration-300 shadow-lg">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500/60 via-emerald-500/30 to-transparent" />
      <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2">
        <span className="tracking-wider uppercase">{title}</span>
        <span className="flex h-2 w-2 items-center justify-center">
          <span
            className={`absolute h-2 w-2 animate-ping rounded-full opacity-75 ${
              status === "milestone" ? "bg-amber-400" : "bg-emerald-400"
            }`}
          />
          <span
            className={`relative h-1.5 w-1.5 rounded-full ${
              status === "milestone" ? "bg-amber-500" : "bg-emerald-500"
            }`}
          />
        </span>
      </div>
      <div className="text-2xl font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
        {value}
      </div>
      <p className="mt-1 text-xs text-zinc-400 font-sans leading-relaxed">{subtext}</p>
    </div>
  );
}

function ProjectNodeCard({
  project,
  onExpand,
}: {
  project: Project;
  onExpand: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-xl border border-zinc-800 bg-[#12121A]/90 p-6 overflow-hidden transition-all duration-300 hover:border-sky-500/40 shadow-xl flex flex-col justify-between"
    >
      {/* Interactive Radial Glow Tracking Hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(56, 189, 248, 0.08), transparent 80%)`,
        }}
      />

      <div>
        {/* Terminal Title Window Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-rose-500/70 transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-amber-500/70 transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-emerald-500/70 transition-colors" />
            <span className="ml-2 font-mono text-[10px] text-zinc-600 tracking-wider">
              RENDER_VIEWPORT.EXE
            </span>
          </div>
          <span className="font-mono text-[10px] text-sky-400 bg-sky-950/50 border border-sky-800/50 px-2 py-0.5 rounded">
            {project.badge}
          </span>
        </div>

        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
          {project.period}
        </span>
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-sky-400 font-mono mt-1">{project.category}</p>

        <p className="text-xs text-zinc-300 mt-3 font-sans leading-relaxed">
          {project.brief}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.stack.map((item) => (
            <span
              key={item}
              className="font-mono text-[10px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onExpand}
          className="flex-1 py-2 px-3 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-sky-500/50 hover:bg-sky-500/10 text-xs font-mono text-zinc-300 hover:text-sky-300 transition-all text-center"
        >
          INSPECT_ARCHITECTURE -&gt;
        </button>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 transition-all text-xs"
            title="Live Demo"
          >
            <ExternalLink size={14} />
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all text-xs"
            title="GitHub Repository"
          >
            <Code2 size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ==========================================
// MAIN COMPONENT: PORTFOLIO PAGE
// ==========================================
export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [cmdInput, setCmdInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "INITIALIZING_SOMU_CORE_V4.2...",
    "System status: PRODUCTION_READY // 0% False Positives confirmed.",
    "Type 'help' for command syntax, or use buttons to navigate.",
  ]);

  // Audio welcome note
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioStatus, setAudioStatus] = useState<"idle" | "error">("idle");

  // Contact form state
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  // AI Voice Narrator states
  const [narratorText, setNarratorText] = useState(
    "Select an architectural topic below to activate the audio synthesizer."
  );
  const [isTyping, setIsTyping] = useState(false);
  const [speakingState, setSpeakingState] = useState<"idle" | "playing" | "paused">("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Creative Hub state
  const [creativeTab, setCreativeTab] = useState<"linkedin" | "slides">("linkedin");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlayingSlides, setIsPlayingSlides] = useState(false);

  // LinkedIn simulator reactions
  const [reactions, setReactions] = useState([
    { id: 1, likes: 78, celebrates: 25, loves: 31, hasReacted: null as "like" | "celebrate" | "love" | null },
    { id: 2, likes: 92, celebrates: 34, loves: 45, hasReacted: null as "like" | "celebrate" | "love" | null },
    { id: 3, likes: 58, celebrates: 19, loves: 27, hasReacted: null as "like" | "celebrate" | "love" | null },
  ]);

  const [comments, setComments] = useState<
    Record<number, Array<{ author: string; text: string; time: string }>>
  >({
    1: [
      {
        author: "Tech Lead",
        text: "0% false-positive rate on face matching in real event photos is huge. OpenCV 5-point landmark alignment is spot on.",
        time: "1d ago",
      },
      {
        author: "Aditi Rao",
        text: "Great work scaling this with FastAPI and PostgreSQL pooling!",
        time: "2d ago",
      },
    ],
    2: [
      {
        author: "Kavya Menon",
        text: "Massive congratulations on the 1st place Webathon win! Post-Op Guardian provides vital clinical value.",
        time: "3d ago",
      },
    ],
    3: [
      {
        author: "Siddharth V.",
        text: "Clean Spring Boot architecture. Removing N+1 query loops via composite indexing shows real DB mastery.",
        time: "5d ago",
      },
    ],
  });
  const [newCommentTexts, setNewCommentTexts] = useState<Record<number, string>>({ 1: "", 2: "", 3: "" });
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({ 1: false, 2: false, 3: false });

  // Voice Narrator Topics
  const narratorTopics: Record<string, { label: string; text: string; full: string }> = {
    overview: {
      label: "System Overview",
      text: "Someshwar Joshi is a 3rd-year CS undergrad at VNR VJIET with a 9.1 CGPA, focused on scalable backend services and applied AI.",
      full: "Someshwar Joshi is a third-year Computer Science student at VNR VJIET with a 9.1 CGPA. He specializes in engineering scalable internal business applications, high-performance RESTful APIs, and automated data pipelines using Java, Python, and cloud platforms.",
    },
    myclassboard: {
      label: "MyClassBoard (CV & FastAPI)",
      text: "Engineered computer vision pipeline with ONNX Runtime & OpenCV, achieving 0% false positives with 512-dim facial embeddings.",
      full: "At MyClassBoard, Someshwar developed asynchronous backend services with FastAPI and Python for AgentP. He engineered a computer vision pipeline with ONNX Runtime and OpenCV, applying 5-point facial landmark alignment and 512-dimensional embeddings, driving the false-positive match rate to 0%.",
    },
    campus_tracker: {
      label: "Campus Project Tracker",
      text: "Built normalized PostgreSQL schema with composite indexes, Spring Boot JPQL aggregations, stateless JWT, and Docker CI/CD.",
      full: "Campus Project Tracker is an enterprise academic evaluation platform built with Java, Spring Boot, and PostgreSQL. Someshwar eliminated N-plus-one query bottlenecks via composite multi-column indexing, implemented stateless JWT authentication, and containerized the architecture with Docker and GitHub Actions CI/CD.",
    },
    forte: {
      label: "ForteHR Internship",
      text: "Architected ForteHR using React, TypeScript, Supabase RBAC, and OpenAI API integrations.",
      full: "During his software engineer internship at Forte, Someshwar built ForteHR, an internal full-stack analytics platform. He implemented role-based access control policies using Supabase Row-Level Security and integrated OpenAI API assistants to automate HR reporting workflows.",
    },
    phishguard: {
      label: "PhishGuard (Designathon)",
      text: "Developed Chrome extension security layer with Scikit-learn trained on 50k+ records and Gemini AI explanations.",
      full: "PhishGuard is an AI-powered browser security extension that won 2nd Runner-Up at the Designathon. It evaluates URLs and downloads in real time using a Scikit-learn classifier trained on over 50,000 malicious records, translating threats into clear explanations with Gemini AI.",
    },
    research: {
      label: "Water Quality (ICACECS 2025)",
      text: "Co-authored peer-reviewed research paper on algorithmic water quality assessment utilizing EF-BER, clustering, and KNN.",
      full: "Someshwar co-authored a peer-reviewed research paper published in the ICACECS 2025 proceedings. The study evaluates multi-parameter sensor arrays using EF-BER, clustering, and K-Nearest Neighbors algorithms for algorithmic water quality assessment.",
    },
  };

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  // Slideshow auto-advance
  useEffect(() => {
    if (!isPlayingSlides) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlayingSlides]);

  const executeCommand = (e: FormEvent) => {
    e.preventDefault();
    const cleanCmd = cmdInput.trim().toLowerCase();
    let response = `Directive not recognized: '${cleanCmd}'. Type 'help' for available directives.`;

    if (cleanCmd === "help") {
      response =
        "Available directives:\n- status: Current degree, CGPA, graduation date\n- cv-pipeline: MyClassBoard ONNX facial inference status\n- projects: List active production projects\n- skills: Output core tech stack\n- resume: Open verified resume PDF in new tab\n- ping: Check telemetry latency\n- clear: Clear terminal screen";
    } else if (cleanCmd === "resume") {
      if (typeof window !== "undefined") {
        window.open("/resume.pdf", "_blank");
      }
      response = "Dispatched instruction: Opening /resume.pdf in new browser viewport.";
    } else if (cleanCmd === "status") {
      response =
        "NODE STATUS: ONLINE\nInstitution: VNR VJIET (B.Tech Computer Science & Engineering)\nCGPA: 9.1 / 10.0\nExpected Graduation: May 2028\nTarget: Summer 2027 SWE, Backend & Applied AI Internships";
    } else if (cleanCmd === "cv-pipeline") {
      response =
        "CV PIPELINE METRICS:\nTarget: AgentP Automated Photo Matching\nEmbedding Dimension: 512-D vectors\nFalse Positive Match Rate: 0.0%\nRuntime Engine: ONNX Runtime + OpenCV 5-point landmark alignment\nTest Coverage: 500+ Pytest tests";
    } else if (cleanCmd === "projects") {
      response =
        "ACTIVE NODES:\n1. Campus Project Tracker (Java, Spring Boot, PostgreSQL, Docker, JWT)\n2. Post-Op Guardian (React, Node.js, REST APIs, Webathon 1st Place Winner)\n3. PhishGuard ML (React, Scikit-learn, Redis, Gemini AI, Designathon 2nd Runner-Up)";
    } else if (cleanCmd === "skills") {
      response =
        "STACK MATRIX:\n- Languages: Java, Python, C++, TypeScript, SQL\n- Backend: Spring Boot, FastAPI, Node.js, Express, RESTful APIs\n- DB: PostgreSQL (Composite Indexes), MongoDB, Redis\n- DevOps: Docker, GitHub Actions CI/CD, GCP GCS";
    } else if (cleanCmd === "ping") {
      response = "PONG! Telemetry link downstream latency: 12ms. Packet loss: 0.0%.";
    } else if (cleanCmd === "clear") {
      setTerminalLogs([]);
      setCmdInput("");
      return;
    }

    setTerminalLogs((prev) => [...prev, `$ ${cmdInput}`, response]);
    setCmdInput("");
  };

  const speakTopic = (key: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const topic = narratorTopics[key];
    setActiveTopic(key);
    setSpeakingState("playing");
    setIsTyping(true);

    let currentLen = 0;
    setNarratorText("");
    const timer = setInterval(() => {
      currentLen += 2;
      if (currentLen >= topic.full.length) {
        setNarratorText(topic.full);
        clearInterval(timer);
        setIsTyping(false);
      } else {
        setNarratorText(topic.full.slice(0, currentLen));
      }
    }, 15);

    const utterance = new SpeechSynthesisUtterance(topic.full);
    utteranceRef.current = utterance;

    const voices = synthRef.current.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.startsWith("en-") && v.name.includes("Google")) ||
      voices.find((v) => v.lang.startsWith("en-")) ||
      voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.volume = isMuted ? 0 : 1;
    utterance.rate = 1.05;

    utterance.onend = () => {
      setSpeakingState("idle");
      setActiveTopic(null);
    };
    utterance.onerror = () => {
      setSpeakingState("idle");
      setActiveTopic(null);
    };

    synthRef.current.speak(utterance);
  };

  const handlePauseResume = () => {
    if (!synthRef.current) return;
    if (speakingState === "playing") {
      synthRef.current.pause();
      setSpeakingState("paused");
    } else if (speakingState === "paused") {
      synthRef.current.resume();
      setSpeakingState("playing");
    }
  };

  const handleStop = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setSpeakingState("idle");
    setActiveTopic(null);
    setIsTyping(false);
    setNarratorText("AI voice synthesizer idle. Select a topic above to initiate audio stream.");
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current) {
      utteranceRef.current.volume = !isMuted ? 0 : 1;
    }
  };

  const handleReaction = (postId: number, type: "like" | "celebrate" | "love") => {
    setReactions((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const newPost = { ...post };
        if (post.hasReacted === type) {
          if (type === "like") newPost.likes--;
          if (type === "celebrate") newPost.celebrates--;
          if (type === "love") newPost.loves--;
          newPost.hasReacted = null;
        } else {
          if (post.hasReacted === "like") newPost.likes--;
          if (post.hasReacted === "celebrate") newPost.celebrates--;
          if (post.hasReacted === "love") newPost.loves--;
          if (type === "like") newPost.likes++;
          if (type === "celebrate") newPost.celebrates++;
          if (type === "love") newPost.loves++;
          newPost.hasReacted = type;
        }
        return newPost;
      })
    );
  };

  const handleAddComment = (postId: number, e: FormEvent) => {
    e.preventDefault();
    const text = newCommentTexts[postId]?.trim();
    if (!text) return;
    setComments((prev) => ({
      ...prev,
      [postId]: [...prev[postId], { author: "Engineering Lead (Visitor)", text, time: "Just now" }],
    }));
    setNewCommentTexts((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleWelcomeNote = async () => {
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
  };

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Please enter your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!message) errors.message = "Please include a project or internship briefing.";

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");
    setContactErrors({});

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(serviceId, templateId, { name, email, message }, publicKey);
        setFormStatus("sent");
        form.reset();
      } catch (err) {
        console.error("EmailJS dispatch failed:", err);
        setFormStatus("error");
        setContactErrors({ form: "Email service currently unavailable. Please reach out to someshwarjoshi.somu@gmail.com directly." });
      }
    } else {
      // Fallback success mock for local preview without production credentials
      setTimeout(() => {
        setFormStatus("sent");
        form.reset();
      }, 700);
    }
  };

  return (
    <main className="min-h-screen bg-terminal-canvas text-zinc-300 font-sans selection:bg-sky-500/20 selection:text-sky-300">
      
      {/* ==========================================
          TOP NAVIGATION DOCK BAR
      ========================================== */}
      <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#08080C]/85 backdrop-blur-md px-5 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <a href="#" className="font-mono text-xs font-bold text-white tracking-wider hover:text-sky-400 transition-colors">
              SOMESHWAR_JOSHI // NODE_V4.2
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6 font-mono text-xs text-zinc-400">
            <a href="#metrics" className="hover:text-white transition-colors">01//METRICS</a>
            <a href="#experience" className="hover:text-white transition-colors">02//EXPERIENCE</a>
            <a href="#projects" className="hover:text-white transition-colors">03//PROJECTS</a>
            <a href="#journey" className="hover:text-white transition-colors">04//JOURNEY</a>
            <a href="#skills" className="hover:text-white transition-colors">05//STACK</a>
            <a href="#contact" className="hover:text-white transition-colors">06//CONTACT</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#12121A] border border-zinc-800 hover:border-sky-500/50 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2"
            >
              <Terminal size={12} className="text-sky-400" />
              <span className="hidden sm:inline">Terminal</span>
              <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] text-zinc-500">Ctrl+K</kbd>
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5"
            >
              <FileText size={12} />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-16 space-y-20">

        {/* ==========================================
            HERO SECTION: ACTIVE IDE & TERMINAL
        ========================================== */}
        <section className="grid lg:grid-cols-[1.3fr_0.9fr] gap-10 items-start pt-4">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for Summer 2027 SWE & AI Engineering Internships</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Building fluid backend loops & responsive AI vectors.
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-sans leading-relaxed">
              Computer Science undergraduate at VNR VJIET (CGPA: 9.1) focused on engineering highly scalable internal business applications, RESTful web services, and automated data pipelines using Java, Python, and cloud infrastructure.
            </p>

            {/* Availability Terminal Array */}
            <div className="rounded-xl border border-zinc-800 bg-[#12121A] p-5 font-mono text-xs space-y-2 relative max-w-2xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <span className="text-[10px] text-zinc-600">TERMINAL_ARRAY // V4.2</span>
              </div>
              <p className="text-zinc-500">$ status --current</p>
              <p className="text-zinc-200 pl-3">&gt; 3rd Year B.Tech CSE @ VNR VJIET (CGPA: 9.1 / 10.0)</p>
              
              <p className="text-zinc-500">$ current --workplace</p>
              <p className="text-emerald-400 pl-3">&gt; Software Developer Intern @ MyClassBoard (FastAPI & ONNX Computer Vision)</p>

              <p className="text-zinc-500">$ target --role</p>
              <p className="text-sky-400 pl-3">&gt; Summer 2027 SWE, Backend Systems & Applied AI Internships</p>

              <p className="text-zinc-500">$ stack --primary-matrix</p>
              <p className="text-zinc-300 pl-3">&gt; Java (Spring Boot) | Python (FastAPI) | PostgreSQL | Docker | ONNX</p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-lg"
              >
                <span>Inspect Projects</span>
                <ChevronRight size={14} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2"
              >
                <FileText size={14} className="text-sky-400" />
                <span>View Resume</span>
              </a>
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="px-5 py-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2"
              >
                <Terminal size={14} className="text-sky-400" />
                <span>Launch Terminal (Ctrl+K)</span>
              </button>
              <button
                onClick={handleWelcomeNote}
                className="px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2"
              >
                {playing ? <Radio size={14} className="text-sky-400" /> : <Volume2 size={14} />}
                <span>{playing ? "Playing Note..." : "Voice Note"}</span>
                {playing && (
                  <span className="wave" aria-hidden="true">
                    <span /><span /><span /><span />
                  </span>
                )}
              </button>
              <audio
                ref={audioRef}
                src="/audio/welcome.mp3"
                preload="metadata"
                onEnded={() => setPlaying(false)}
                onError={() => {
                  setPlaying(false);
                  setAudioStatus("error");
                }}
              />
            </div>
            {audioStatus === "error" && (
              <p className="text-xs text-rose-400 font-mono">
                Audio stream initialization notice: Audio player fallback active.
              </p>
            )}
          </div>

          {/* Right Column: Asset Node & AI Narrator Synthesizer */}
          <div className="space-y-6 max-w-[440px] mx-auto w-full">
            {/* Portrait Asset Container */}
            <div className="group relative aspect-square w-full rounded-2xl border border-zinc-800 bg-[#12121A] p-2 overflow-hidden shadow-2xl transition-all duration-300 hover:border-sky-500/40">
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-zinc-950">
                <Image
                  src="/images/SomeshwarJoshi-Profile.jpeg"
                  alt="Someshwar Joshi portrait"
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 440px"
                  className="object-cover object-center grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent opacity-80" />
                
                {/* Live Node Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border border-zinc-800 bg-[#08080C]/80 backdrop-blur-md px-3 py-2 rounded-lg font-mono text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-semibold">SOMU_NODE // ALIVE</span>
                  </div>
                  <span className="text-zinc-500 text-[10px]">FASTAPI_READY</span>
                </div>
              </div>
            </div>

            {/* AI VOICE SYNTHESIZER TERMINAL */}
            <div className="rounded-xl border border-zinc-800 bg-[#12121A] p-5 shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      speakingState === "playing" ? "bg-sky-400 animate-pulse" : "bg-zinc-600"
                    }`}
                  />
                  <span className="text-[11px] font-bold text-zinc-400 tracking-wider">
                    SOMU-CORE AUDIO SYNTH V4.2
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-950/60 border border-sky-900/60 px-2 py-0.5 rounded">
                  AI GUIDE
                </span>
              </div>

              {/* Terminal Audio readout screen */}
              <div className="p-3 bg-black/50 rounded-lg min-h-[76px] border border-zinc-900 mb-3 relative overflow-hidden">
                <div className="text-sky-400 text-[10px] mb-1 flex items-center justify-between">
                  <span>user@someshwar:~$: speak --topic {activeTopic || "none"}</span>
                  {speakingState === "playing" && (
                    <span className="text-emerald-400 text-[9px] uppercase font-bold animate-pulse">
                      [TRANSMITTING]
                    </span>
                  )}
                </div>
                <p className="leading-5 text-zinc-300 text-[11px]">
                  {narratorText}
                  {isTyping && <span className="inline-block w-1.5 h-3 ml-1 bg-sky-400 animate-pulse" />}
                </p>
              </div>

              {/* Topic chips selector */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {Object.entries(narratorTopics).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => speakTopic(key)}
                    className={`text-left p-2 rounded border text-[10px] transition-all ${
                      activeTopic === key
                        ? "border-sky-500 bg-sky-500/10 text-sky-300 font-bold"
                        : "border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    🎙️ {item.label}
                  </button>
                ))}
              </div>

              {/* Audio controls & visualizer wave */}
              <div className="flex items-center justify-between border-t border-zinc-900 pt-3">
                <div className="flex items-end h-6 w-20">
                  {speakingState === "playing" ? (
                    <>
                      <span className="ai-visualizer-bar" />
                      <span className="ai-visualizer-bar" />
                      <span className="ai-visualizer-bar" />
                      <span className="ai-visualizer-bar" />
                      <span className="ai-visualizer-bar" />
                      <span className="ai-visualizer-bar" />
                    </>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="h-1.5 w-1 bg-zinc-700 rounded-full" />
                      <span className="h-1.5 w-1 bg-zinc-700 rounded-full" />
                      <span className="h-1.5 w-1 bg-zinc-700 rounded-full" />
                      <span className="h-1.5 w-1 bg-zinc-700 rounded-full" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePauseResume}
                    disabled={speakingState === "idle"}
                    className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-sky-500/50 hover:text-white transition disabled:opacity-30"
                    title={speakingState === "paused" ? "Resume" : "Pause"}
                  >
                    {speakingState === "paused" ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
                  </button>
                  <button
                    onClick={handleStop}
                    disabled={speakingState === "idle"}
                    className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-rose-500/50 hover:text-rose-400 transition disabled:opacity-30"
                    title="Stop"
                  >
                    <Square size={12} fill="currentColor" />
                  </button>
                  <button
                    onClick={handleMuteToggle}
                    className={`p-1.5 rounded border transition ${
                      isMuted
                        ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
                        : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-sky-500 hover:text-white"
                    }`}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            HIGH-IMPACT METRICS SECTION
        ========================================== */}
        <section id="metrics" className="space-y-6 pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-zinc-800/80 pb-4">
            <div>
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block">
                DIAGNOSTIC_TELEMETRY // V4.2
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Verified Engineering Metrics
              </h2>
            </div>
            <div className="font-mono text-xs text-zinc-500">
              LATENCY: 12ms // PACKET_INTEGRITY: 100%
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {METRICS_DATA.map((m) => (
              <MetricCard
                key={m.title}
                title={m.title}
                value={m.value}
                subtext={m.subtext}
                status={m.status}
              />
            ))}
          </div>
        </section>

        {/* ==========================================
            EXPERIENCE SECTION: DUAL INTERNSHIP
        ========================================== */}
        <section id="experience" className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div>
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block">
                PRODUCTION_NODES // 02
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Software Engineering Experience
              </h2>
            </div>
            <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-1 rounded">
              CURRENTLY_ACTIVE
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Experience 1: MyClassBoard */}
            <div className="rounded-xl border border-zinc-800 bg-[#12121A]/95 p-6 space-y-4 hover:border-sky-500/40 transition-all duration-300 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-mono text-xs text-emerald-400 font-semibold">
                  CURRENT ROLE // JUL 2026 – PRESENT
                </span>
                <span className="font-mono text-[11px] text-zinc-500">Hyderabad, India</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Software Developer Intern</h3>
                <p className="text-xs font-mono text-sky-400 mt-0.5">MyClassBoard (AgentP Platform)</p>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300 font-sans leading-relaxed">
                <li className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-sky-400" />
                  <span>
                    Developed asynchronous RESTful backend services in <strong>Python</strong> and <strong>FastAPI</strong> for AgentP, automating manual business workflows by matching student ID references against event photos in <strong>Google Cloud Storage</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>
                    Engineered a computer vision algorithm pipeline with <strong>ONNX Runtime</strong> and OpenCV, applying 5-point facial landmark alignment and 512-dimensional embeddings, driving the false-positive match rate to <strong>0%</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-sky-400" />
                  <span>
                    Optimized backend throughput and operational scaling via <strong>PostgreSQL</strong> connection pooling and deterministic caching, and authored <strong>500+ Pytest unit/integration tests</strong> to ensure strict data isolation.
                  </span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900">
                {["Python", "FastAPI", "ONNX Runtime", "OpenCV", "PostgreSQL", "Google Cloud Storage", "Pytest"].map((t) => (
                  <span key={t} className="font-mono text-[10px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience 2: FORTE */}
            <div className="rounded-xl border border-zinc-800 bg-[#12121A]/95 p-6 space-y-4 hover:border-sky-500/40 transition-all duration-300 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-mono text-xs text-sky-400 font-semibold">
                  INTERNSHIP // JUL 2025 – NOV 2025
                </span>
                <span className="font-mono text-[11px] text-zinc-500">Hyderabad, India</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Software Engineer Intern</h3>
                <p className="text-xs font-mono text-purple-400 mt-0.5">FORTE (ForteHR Platform)</p>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300 font-sans leading-relaxed">
                <li className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-purple-400" />
                  <span>
                    Architected <strong>ForteHR</strong>, an internal full-stack AI-powered HR analytics platform (React, TypeScript, Supabase) with <strong>RBAC</strong>, enabling secure and automated operational workflows for HR stakeholders.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-sky-400" />
                  <span>
                    Implemented <strong>Supabase Row-Level Security (RLS)</strong> policies enforcing strict tenant boundaries and preventing unauthorized cross-department data mutation.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-purple-400" />
                  <span>
                    Integrated the <strong>OpenAI API</strong> to power a custom AI assistant, translating complex HR data requirements into technical solutions and eliminating manual report generation bottlenecks.
                  </span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900">
                {["React", "TypeScript", "Supabase RLS", "PostgreSQL", "OpenAI API", "RBAC"].map((t) => (
                  <span key={t} className="font-mono text-[10px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            RESEARCH PUBLICATION SECTION
        ========================================== */}
        <section className="space-y-6 pt-4">
          <div className="rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-950/20 via-[#12121A] to-zinc-950 p-6 md:p-8 space-y-4 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-3 border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-sky-400" />
                <span className="font-mono text-xs text-sky-400 uppercase tracking-widest font-semibold">
                  RESEARCH_PUBLICATION // ICACECS 2025
                </span>
              </div>
              <span className="font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded">
                Published August 2025
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Algorithmic Water Quality Assessment via EF-BER, Clustering, and KNN
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Co-Author: Someshwar Joshi • Proceedings of ICACECS 2025
              </p>
            </div>

            <p className="text-sm text-zinc-300 font-sans leading-relaxed max-w-4xl">
              Co-authored peer-reviewed research analyzing multi-variable sensor vectors for real-time water quality indexing. Evaluated the algorithmic convergence of Exponential Forgetting Factor Bit Error Rate (EF-BER) combined with spatial clustering and K-Nearest Neighbors (KNN) classification algorithms to filter environmental sensor telemetry.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="https://www.researchgate.net/scientific-contributions/Joshi-Someshwar-2356593405"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-400 hover:bg-sky-500/20 transition-all font-semibold"
              >
                <span>View Author Profile on ResearchGate</span>
                <ExternalLink size={13} />
              </a>
              <span className="text-xs font-mono text-zinc-500">
                Peer-Reviewed • Mathematical Modeling • Python Evaluation
              </span>
            </div>
          </div>
        </section>

        {/* ==========================================
            FEATURED PROJECTS MATRIX
        ========================================== */}
        <section id="projects" className="space-y-6 pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-zinc-800/80 pb-4">
            <div>
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block">
                PRODUCTION_NODES // 03
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Featured Systems & Architecture
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500">
              INTERACTIVE_NODES // CLICK TO DEEP INSPECT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((proj) => (
              <ProjectNodeCard
                key={proj.id}
                project={proj}
                onExpand={() => setSelectedProject(proj)}
              />
            ))}
          </div>
        </section>

        {/* ==========================================
            CHRONOLOGICAL TIMELINE
        ========================================== */}
        <Timeline />

        {/* ==========================================
            TECHNICAL SKILLS MATRIX
        ========================================== */}
        <section id="skills" className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div>
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block">
                COMPETENCY_MATRIX // 07
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Technical Skills & Tools
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500">7 SYSTEM DOMAINS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILL_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="rounded-xl border border-zinc-800 bg-[#12121A]/80 p-5 space-y-3 hover:border-sky-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5 text-sky-400">
                    <Icon className="size-4" />
                    <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[11px] bg-zinc-900/90 border border-zinc-800/80 px-2 py-0.5 rounded text-zinc-300 hover:text-sky-300 hover:border-sky-500/40 transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================
            CREATIVE SHOWCASE HUB: SOCIAL FEED & SLIDES
        ========================================== */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-4">
            <div>
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block">
                TELEMETRY_FEEDS // V4.2
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Engineering Updates & Technical Keynotes
              </h2>
            </div>

            <div className="flex border border-zinc-800 bg-[#12121A] p-1 rounded-lg self-start">
              <button
                onClick={() => setCreativeTab("linkedin")}
                className={`px-3 py-1.5 text-xs font-mono rounded transition ${
                  creativeTab === "linkedin"
                    ? "bg-sky-500 text-zinc-950 font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                LinkedIn Updates
              </button>
              <button
                onClick={() => setCreativeTab("slides")}
                className={`px-3 py-1.5 text-xs font-mono rounded transition ${
                  creativeTab === "slides"
                    ? "bg-sky-500 text-zinc-950 font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Keynote Slides
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {creativeTab === "linkedin" ? (
              <motion.div
                key="linkedin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {/* Post 1: MyClassBoard Computer Vision Pipeline */}
                <div className="rounded-xl border border-zinc-800 bg-[#12121A] p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative size-9 rounded-full overflow-hidden border border-sky-400">
                        <Image src="/images/SomeshwarJoshi-Profile.jpeg" alt="Someshwar avatar" fill sizes="36px" className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">Someshwar Joshi</h4>
                        <p className="text-[10px] text-zinc-400 leading-tight">SWE Intern @ MyClassBoard • VNR VJIET</p>
                        <p className="text-[9px] text-zinc-600 leading-tight font-mono">1d • 🌍</p>
                      </div>
                    </div>

                    <p className="text-xs leading-5 text-zinc-300 font-sans">
                      🚀 Excited to share an update on my work with <strong>AgentP</strong> at <strong>MyClassBoard</strong>! We engineered a computer vision pipeline with <strong>ONNX Runtime</strong> and OpenCV using 5-point facial landmark alignment and 512-dimensional embeddings—driving our false-positive match rate down to 0% across high-volume school event photos. Scaled via FastAPI and PostgreSQL pooling! #ComputerVision #FastAPI #Python #Engineering
                    </p>

                    <div className="border border-zinc-800 bg-black/40 rounded-lg p-3 mt-3 font-mono text-[10px]">
                      <span className="text-emerald-400 block font-bold">PIPELINE TELEMETRY</span>
                      <span className="text-zinc-300">0% False Positives • 512-D Embeddings • 500+ Pytest Tests</span>
                    </div>
                  </div>

                  {/* Actions & Reactions */}
                  <div className="border-t border-zinc-900 pt-3">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                      <span className="flex items-center gap-1">
                        👍 👏 ❤️ {reactions[0].likes + reactions[0].celebrates + reactions[0].loves}
                      </span>
                      <button
                        onClick={() => setExpandedComments((p) => ({ ...p, 1: !p[1] }))}
                        className="hover:underline font-mono text-[10px] text-zinc-500"
                      >
                        {comments[1].length} comments
                      </button>
                    </div>

                    <div className="flex justify-around border-t border-zinc-900 pt-2 text-xs font-mono">
                      <button
                        onClick={() => handleReaction(1, "like")}
                        className={`hover:text-sky-400 ${reactions[0].hasReacted === "like" ? "text-sky-400 font-bold" : "text-zinc-500"}`}
                      >
                        Like ({reactions[0].likes})
                      </button>
                      <button
                        onClick={() => handleReaction(1, "celebrate")}
                        className={`hover:text-emerald-400 ${reactions[0].hasReacted === "celebrate" ? "text-emerald-400 font-bold" : "text-zinc-500"}`}
                      >
                        Celebrate ({reactions[0].celebrates})
                      </button>
                    </div>

                    {expandedComments[1] && (
                      <div className="mt-3 border-t border-zinc-900 pt-2 space-y-2">
                        {comments[1].map((c, i) => (
                          <div key={i} className="bg-black/30 p-2 rounded border border-zinc-900 text-[11px]">
                            <span className="font-bold text-white block text-[10px]">{c.author}</span>
                            <span className="text-zinc-300">{c.text}</span>
                          </div>
                        ))}
                        <form onSubmit={(e) => handleAddComment(1, e)} className="flex gap-1.5 pt-1">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newCommentTexts[1]}
                            onChange={(e) => setNewCommentTexts((p) => ({ ...p, 1: e.target.value }))}
                            className="flex-1 bg-black/40 border border-zinc-800 rounded px-2 py-1 text-[11px] text-white outline-none focus:border-sky-500"
                          />
                          <button type="submit" className="px-2.5 py-1 bg-sky-500 text-zinc-950 font-bold rounded text-xs">
                            <Send size={11} />
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post 2: Webathon Victory - Post-Op Guardian */}
                <div className="rounded-xl border border-zinc-800 bg-[#12121A] p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative size-9 rounded-full overflow-hidden border border-amber-400">
                        <Image src="/images/SomeshwarJoshi-Profile.jpeg" alt="Someshwar avatar" fill sizes="36px" className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">Someshwar Joshi</h4>
                        <p className="text-[10px] text-zinc-400 leading-tight">Webathon Winner 1st Place • VNR VJIET</p>
                        <p className="text-[9px] text-zinc-600 leading-tight font-mono">2w • 🌍</p>
                      </div>
                    </div>

                    <p className="text-xs leading-5 text-zinc-300 font-sans">
                      🏆 Thrilled to share that our team won <strong>1st Place Overall</strong> at the university <strong>Webathon</strong>! We built <strong>Post-Op Guardian</strong>, a recovery monitoring system automating patient check-ins and clinical alerting for post-surgery teams. High-pressure building is always the greatest teacher! #winner #hackathon #healthcare #webdev
                    </p>

                    <div className="border border-zinc-800 bg-black/40 rounded-lg p-3 mt-3 font-mono text-[10px]">
                      <span className="text-amber-400 block font-bold">1ST PLACE AWARD</span>
                      <span className="text-zinc-300">Post-Op Guardian • Anomaly Scoring • Healthcare UX</span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-900 pt-3">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                      <span className="flex items-center gap-1">
                        👍 👏 ❤️ {reactions[1].likes + reactions[1].celebrates + reactions[1].loves}
                      </span>
                      <button
                        onClick={() => setExpandedComments((p) => ({ ...p, 2: !p[2] }))}
                        className="hover:underline font-mono text-[10px] text-zinc-500"
                      >
                        {comments[2].length} comments
                      </button>
                    </div>

                    <div className="flex justify-around border-t border-zinc-900 pt-2 text-xs font-mono">
                      <button
                        onClick={() => handleReaction(2, "like")}
                        className={`hover:text-sky-400 ${reactions[1].hasReacted === "like" ? "text-sky-400 font-bold" : "text-zinc-500"}`}
                      >
                        Like ({reactions[1].likes})
                      </button>
                      <button
                        onClick={() => handleReaction(2, "celebrate")}
                        className={`hover:text-emerald-400 ${reactions[1].hasReacted === "celebrate" ? "text-emerald-400 font-bold" : "text-zinc-500"}`}
                      >
                        Celebrate ({reactions[1].celebrates})
                      </button>
                    </div>

                    {expandedComments[2] && (
                      <div className="mt-3 border-t border-zinc-900 pt-2 space-y-2">
                        {comments[2].map((c, i) => (
                          <div key={i} className="bg-black/30 p-2 rounded border border-zinc-900 text-[11px]">
                            <span className="font-bold text-white block text-[10px]">{c.author}</span>
                            <span className="text-zinc-300">{c.text}</span>
                          </div>
                        ))}
                        <form onSubmit={(e) => handleAddComment(2, e)} className="flex gap-1.5 pt-1">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newCommentTexts[2]}
                            onChange={(e) => setNewCommentTexts((p) => ({ ...p, 2: e.target.value }))}
                            className="flex-1 bg-black/40 border border-zinc-800 rounded px-2 py-1 text-[11px] text-white outline-none focus:border-sky-500"
                          />
                          <button type="submit" className="px-2.5 py-1 bg-sky-500 text-zinc-950 font-bold rounded text-xs">
                            <Send size={11} />
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post 3: Campus Project Tracker */}
                <div className="rounded-xl border border-zinc-800 bg-[#12121A] p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative size-9 rounded-full overflow-hidden border border-sky-400">
                        <Image src="/images/SomeshwarJoshi-Profile.jpeg" alt="Someshwar avatar" fill sizes="36px" className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight">Someshwar Joshi</h4>
                        <p className="text-[10px] text-zinc-400 leading-tight">Backend & Distributed Systems</p>
                        <p className="text-[9px] text-zinc-600 leading-tight font-mono">3w • 🌍</p>
                      </div>
                    </div>

                    <p className="text-xs leading-5 text-zinc-300 font-sans">
                      ⚙️ Shipped <strong>Campus Project Tracker</strong>! Architected in <strong>Java</strong> and <strong>Spring Boot</strong> with a highly normalized <strong>PostgreSQL</strong> schema. We replaced slow in-memory loop aggregates with single-query JPQL aggregations and composite multi-column indexing, deployed with Docker and GitHub Actions CI/CD! #SpringBoot #Java #PostgreSQL #Docker
                    </p>

                    <div className="border border-zinc-800 bg-black/40 rounded-lg p-3 mt-3 font-mono text-[10px]">
                      <span className="text-sky-400 block font-bold">SYSTEM RELEASE</span>
                      <span className="text-zinc-300">Spring Boot • Stateless JWT • Docker Containerization</span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-900 pt-3">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                      <span className="flex items-center gap-1">
                        👍 👏 ❤️ {reactions[2].likes + reactions[2].celebrates + reactions[2].loves}
                      </span>
                      <button
                        onClick={() => setExpandedComments((p) => ({ ...p, 3: !p[3] }))}
                        className="hover:underline font-mono text-[10px] text-zinc-500"
                      >
                        {comments[3].length} comments
                      </button>
                    </div>

                    <div className="flex justify-around border-t border-zinc-900 pt-2 text-xs font-mono">
                      <button
                        onClick={() => handleReaction(3, "like")}
                        className={`hover:text-sky-400 ${reactions[2].hasReacted === "like" ? "text-sky-400 font-bold" : "text-zinc-500"}`}
                      >
                        Like ({reactions[2].likes})
                      </button>
                      <button
                        onClick={() => handleReaction(3, "celebrate")}
                        className={`hover:text-emerald-400 ${reactions[2].hasReacted === "celebrate" ? "text-emerald-400 font-bold" : "text-zinc-500"}`}
                      >
                        Celebrate ({reactions[2].celebrates})
                      </button>
                    </div>

                    {expandedComments[3] && (
                      <div className="mt-3 border-t border-zinc-900 pt-2 space-y-2">
                        {comments[3].map((c, i) => (
                          <div key={i} className="bg-black/30 p-2 rounded border border-zinc-900 text-[11px]">
                            <span className="font-bold text-white block text-[10px]">{c.author}</span>
                            <span className="text-zinc-300">{c.text}</span>
                          </div>
                        ))}
                        <form onSubmit={(e) => handleAddComment(3, e)} className="flex gap-1.5 pt-1">
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newCommentTexts[3]}
                            onChange={(e) => setNewCommentTexts((p) => ({ ...p, 3: e.target.value }))}
                            className="flex-1 bg-black/40 border border-zinc-800 rounded px-2 py-1 text-[11px] text-white outline-none focus:border-sky-500"
                          />
                          <button type="submit" className="px-2.5 py-1 bg-sky-500 text-zinc-950 font-bold rounded text-xs">
                            <Send size={11} />
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="slides"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-zinc-800 bg-[#12121A] overflow-hidden min-h-[440px] flex flex-col md:grid md:grid-cols-[1.3fr_0.7fr]"
              >
                {/* Left: Presentation Canvas */}
                <div className="p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800/80 bg-[radial-gradient(circle_at_25%_25%,rgba(56,189,248,0.06),transparent_50%)]">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-widest">
                        KEYNOTE_SLIDE // 0{activeSlide + 1} OF 05
                      </span>
                      <div className="flex gap-1.5">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <div
                            key={s}
                            onClick={() => setActiveSlide(s)}
                            className={`h-1.5 rounded-full transition-all cursor-pointer ${
                              activeSlide === s ? "w-6 bg-sky-400" : "w-1.5 bg-zinc-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {activeSlide === 0 && (
                          <>
                            <h3 className="text-3xl font-bold text-white tracking-tight leading-tight">
                              Dynamic Backend Engineer & Applied AI Builder
                            </h3>
                            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                              3rd-year CS student at VNR VJIET (CGPA: 9.1). Engineering high-performance RESTful APIs, computer vision pipelines, and database aggregates using Java, Python, and Google Cloud.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                              <div className="p-4 rounded-lg bg-black/40 border border-zinc-800">
                                <span className="font-mono text-[10px] text-sky-400">ACADEMICS</span>
                                <p className="text-xs font-semibold text-white mt-1">9.1 CGPA @ VNR VJIET</p>
                              </div>
                              <div className="p-4 rounded-lg bg-black/40 border border-zinc-800">
                                <span className="font-mono text-[10px] text-emerald-400">RESEARCH</span>
                                <p className="text-xs font-semibold text-white mt-1">ICACECS 2025 Paper Author</p>
                              </div>
                            </div>
                          </>
                        )}

                        {activeSlide === 1 && (
                          <>
                            <h3 className="text-3xl font-bold text-white tracking-tight leading-tight">
                              MyClassBoard Computer Vision Architecture
                            </h3>
                            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                              Engineered an automated face matching pipeline for event albums in Google Cloud Storage, applying 5-point facial landmark alignment and 512-dimensional embeddings via ONNX Runtime.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4 font-mono text-xs">
                              <span className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                                0% False Positives
                              </span>
                              <span className="px-3 py-1.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300">
                                ONNX + OpenCV
                              </span>
                              <span className="px-3 py-1.5 rounded bg-zinc-800 text-zinc-300">
                                500+ Pytest Tests
                              </span>
                            </div>
                          </>
                        )}

                        {activeSlide === 2 && (
                          <>
                            <h3 className="text-3xl font-bold text-white tracking-tight leading-tight">
                              Campus Project Tracker (Spring Boot & Docker)
                            </h3>
                            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                              Eliminated N+1 query bottlenecks on large-scale student project evaluations by replacing in-memory loops with single-query JPQL aggregations and composite database indexes.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4 font-mono text-xs">
                              <span className="px-3 py-1.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300">
                                Spring Security JWT
                              </span>
                              <span className="px-3 py-1.5 rounded bg-zinc-800 text-zinc-300">
                                Composite Indexing
                              </span>
                              <span className="px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                                Docker CI/CD
                              </span>
                            </div>
                          </>
                        )}

                        {activeSlide === 3 && (
                          <>
                            <h3 className="text-3xl font-bold text-white tracking-tight leading-tight">
                              Post-Op Guardian & PhishGuard Awards
                            </h3>
                            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                              High-velocity prototyping across competitive hackathons. Won 1st Place at Webathon for healthcare recovery triage, and 2nd Runner-Up at Designathon for ML threat classification.
                            </p>
                            <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
                              <div className="p-3 bg-black/40 rounded border border-zinc-800">
                                <p className="text-amber-400 font-bold">1ST PLACE</p>
                                <p className="text-zinc-300 text-[11px] mt-1">Webathon (Post-Op)</p>
                              </div>
                              <div className="p-3 bg-black/40 rounded border border-zinc-800">
                                <p className="text-sky-400 font-bold">2ND RUNNER-UP</p>
                                <p className="text-zinc-300 text-[11px] mt-1">Designathon (PhishGuard)</p>
                              </div>
                            </div>
                          </>
                        )}

                        {activeSlide === 4 && (
                          <>
                            <h3 className="text-3xl font-bold text-white tracking-tight leading-tight">
                              DSA & Competitive Problem Solving
                            </h3>
                            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                              Consistent algorithmic practice mastering optimal time and space complexity bounds across trees, dynamic programming, and graph algorithms.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-4 font-mono text-xs">
                              <span className="bg-black/40 border border-zinc-800 px-3 py-1 rounded text-sky-400">
                                LeetCode: someshwarjoshi
                              </span>
                              <span className="bg-black/40 border border-zinc-800 px-3 py-1 rounded text-emerald-400">
                                Codeforces: someshwarjoshi.somu
                              </span>
                              <span className="bg-black/40 border border-zinc-800 px-3 py-1 rounded text-purple-400">
                                CodeChef: lively_zeal_60
                              </span>
                            </div>
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-3 mt-8 pt-4 border-t border-zinc-900">
                    <button
                      onClick={() => setActiveSlide((p) => (p === 0 ? 4 : p - 1))}
                      className="p-2 border border-zinc-800 rounded bg-zinc-900 hover:border-sky-500 text-zinc-300"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setActiveSlide((p) => (p + 1) % 5)}
                      className="p-2 border border-zinc-800 rounded bg-zinc-900 hover:border-sky-500 text-zinc-300"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button
                      onClick={() => setIsPlayingSlides(!isPlayingSlides)}
                      className={`px-3 py-1.5 rounded font-mono text-xs font-bold flex items-center gap-1.5 transition ${
                        isPlayingSlides ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-sky-500 text-zinc-950"
                      }`}
                    >
                      {isPlayingSlides ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
                      <span>{isPlayingSlides ? "Pause Auto" : "Play Deck"}</span>
                    </button>
                  </div>
                </div>

                {/* Right: Technical Notes */}
                <div className="p-6 bg-black/40 flex flex-col justify-between font-mono text-xs space-y-4">
                  <div>
                    <h4 className="text-zinc-400 uppercase tracking-widest text-[11px] font-bold border-b border-zinc-800 pb-2 mb-4">
                      ARCHITECTURAL_TAKEAWAYS
                    </h4>
                    {activeSlide === 0 && (
                      <div className="space-y-3 text-zinc-400 text-xs font-sans">
                        <p>🎯 Aiming for Summer 2027 SWE and backend platform engineering internships.</p>
                        <p>🛠️ Focus is on relational query optimization, type-safe APIs, and containerized CI/CD.</p>
                        <p>🤝 Fast-paced builder with hackathon-tested communication and demo skills.</p>
                      </div>
                    )}
                    {activeSlide === 1 && (
                      <div className="space-y-3 text-zinc-400 text-xs font-sans">
                        <p>⚡ <strong>ONNX Acceleration:</strong> Converted models to ONNX Runtime for microsecond facial embedding vectorization.</p>
                        <p>🔍 <strong>Landmark Alignment:</strong> 5-point facial landmark warping directly eradicated false-positive edge cases.</p>
                      </div>
                    )}
                    {activeSlide === 2 && (
                      <div className="space-y-3 text-zinc-400 text-xs font-sans">
                        <p>📊 <strong>JPQL Optimization:</strong> Replaced in-memory evaluation with single-query composite DB indexes.</p>
                        <p>🛡️ <strong>Stateless Security:</strong> Rate-limited authentication filter chains shielding against brute-force calls.</p>
                      </div>
                    )}
                    {activeSlide === 3 && (
                      <div className="space-y-3 text-zinc-400 text-xs font-sans">
                        <p>🏆 <strong>Webathon 1st:</strong> Designed alert-first clinical recovery status telemetry.</p>
                        <p>🛡️ <strong>Designathon 2nd:</strong> Deployed Chrome Manifest V3 extension with Redis rate limits.</p>
                      </div>
                    )}
                    {activeSlide === 4 && (
                      <div className="space-y-3 text-zinc-400 text-xs font-sans">
                        <p>📈 <strong>Algorithmic Depth:</strong> Consistent multi-platform practice on optimal space/time bounds.</p>
                        <p>🧪 <strong>Clean Code:</strong> Writing modular testable code with strict edge case isolation.</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 text-[10px] text-zinc-600 flex justify-between">
                    <span>SOMESHWAR JOSHI</span>
                    <span>SUMMER 2027</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ==========================================
            PROBLEM SOLVING PROFILES SECTION
        ========================================== */}
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div>
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest block">
                COMPETITIVE_PROFILES // 06
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Competitive Programming & Research Verification
              </h2>
            </div>
            <span className="font-mono text-xs text-zinc-500">DIRECT VERIFICATION LINKS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CODING_PROFILES.map((p) => (
              <a
                key={p.platform}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group p-4 rounded-xl border border-zinc-800 bg-[#12121A]/80 hover:border-sky-500/40 transition-all text-center space-y-1 block"
              >
                <span className="font-mono text-[10px] uppercase text-zinc-500 block tracking-wider group-hover:text-sky-400 transition-colors">
                  {p.platform}
                </span>
                <span className="font-mono text-xs font-bold text-white block truncate">
                  {p.handle}
                </span>
                <span className="font-mono text-[10px] text-sky-400 group-hover:underline inline-flex items-center gap-1">
                  <span>Inspect</span> &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ==========================================
            CONTACT & INTERNSHIP BRIEFING FORM
        ========================================== */}
        <section id="contact" className="space-y-6 pt-6">
          <div className="rounded-2xl border border-zinc-800 bg-[#12121A] p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest font-semibold block">
                INITIALIZE_COMMUNICATION_LINK // 06
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Open to Summer 2027 SWE, Backend & AI Opportunities
              </h2>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                Available for internships, technical discussions, and scalable backend collaborations. Let&apos;s build what scales.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-zinc-400 block">YOUR_NAME</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Engineering Leader / Recruiter"
                    className="w-full h-11 px-4 rounded-lg bg-black/40 border border-zinc-800 text-white outline-none focus:border-sky-500 transition text-xs"
                  />
                  {contactErrors.name && (
                    <span className="text-rose-400 text-[10px] block">{contactErrors.name}</span>
                  )}
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-zinc-400 block">CONTACT_EMAIL</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full h-11 px-4 rounded-lg bg-black/40 border border-zinc-800 text-white outline-none focus:border-sky-500 transition text-xs"
                  />
                  {contactErrors.email && (
                    <span className="text-rose-400 text-[10px] block">{contactErrors.email}</span>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-zinc-400 block">DIRECTIVE_MESSAGE</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Share details on engineering roles, backend systems, or internship openings..."
                  className="w-full p-4 rounded-lg bg-black/40 border border-zinc-800 text-white outline-none focus:border-sky-500 transition text-xs font-sans"
                />
                {contactErrors.message && (
                  <span className="text-rose-400 text-[10px] block">{contactErrors.message}</span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="text-xs font-mono">
                  {formStatus === "sent" && (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> Message dispatched successfully. Will reply shortly.
                    </span>
                  )}
                  {formStatus === "error" && (
                    <span className="text-rose-400">
                      {contactErrors.form || "Please review the highlighted parameters."}
                    </span>
                  )}
                  {formStatus === "idle" && (
                    <span className="text-zinc-500">
                      Direct contact: someshwarjoshi.somu@gmail.com • +91 8074553729
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-mono text-xs font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formStatus === "sending" ? (
                    "DISPATCHING..."
                  ) : (
                    <>
                      <span>TRANSMIT_MESSAGE</span>
                      <Send size={12} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ==========================================
            SYSTEM FOOTER WITH TELEMETRY HEARTBEAT
        ========================================== */}
        <footer className="border-t border-zinc-800/80 pt-8 pb-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://github.com/someshwarjoshisomu-source" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
            <span>•</span>
            <a href="https://linkedin.com/in/someshwar-joshi" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
            <span>•</span>
            <a href="https://www.researchgate.net/scientific-contributions/Joshi-Someshwar-2356593405" target="_blank" rel="noreferrer" className="hover:text-white transition">ResearchGate</a>
            <span>•</span>
            <a href="https://leetcode.com/u/someshwarjoshi/" target="_blank" rel="noreferrer" className="hover:text-white transition">LeetCode</a>
            <span>•</span>
            <a href="mailto:someshwarjoshi.somu@gmail.com" className="hover:text-white transition">Email</a>
            <span>•</span>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="hover:text-white transition">Resume</a>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-zinc-500">NODE:</span>
            <span className="text-zinc-300">VNR-VJIET-SWE-01</span>
            <span className="text-zinc-500">//</span>
            <span className="text-emerald-400">PRODUCTION_ACTIVE</span>
          </div>
        </footer>

      </div>

      {/* ==========================================
          MODAL: DEEP ARCHITECTURE INSPECTOR
      ========================================== */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 25 }}
              className="w-full max-w-2xl rounded-2xl bg-[#12121A] border border-zinc-800 overflow-hidden shadow-2xl font-mono text-xs max-h-[85vh] flex flex-col scanlines"
            >
              {/* Modal header bar */}
              <div className="flex items-center justify-between border-b border-zinc-800 p-4 bg-zinc-950/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white tracking-wider text-xs">
                    INSPECTING_NODE // {selectedProject.title.toUpperCase()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition text-[10px]"
                >
                  ESC_CLOSE ✕
                </button>
              </div>

              {/* Modal scrollable content */}
              <div className="p-6 overflow-y-auto space-y-6 font-sans">
                <div>
                  <span className="font-mono text-[10px] text-sky-400 uppercase tracking-widest block mb-1">
                    SYSTEM_BRIEF
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">{selectedProject.brief}</p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-zinc-800/80 space-y-3 font-mono">
                  <span className="text-[10px] text-sky-400 uppercase tracking-wider block font-bold">
                    ARCHITECTURE_PIPELINE
                  </span>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                  
                  {/* Visual flow stepper */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                    {selectedProject.diagram.map((step, idx) => (
                      <div
                        key={step}
                        className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 flex items-center justify-between"
                      >
                        <span>{idx + 1}. {step}</span>
                        {idx < selectedProject.diagram.length - 1 && (
                          <span className="text-sky-400/80 font-bold">&rarr;</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block mb-2 font-bold">
                    SYSTEM_RETURNS_AND_BENCHMARKS
                  </span>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {selectedProject.metrics.map((metric) => (
                      <li key={metric} className="flex gap-2 items-start">
                        <span className="mt-1 text-emerald-400 font-mono font-bold">&gt;</span>
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/30 border border-zinc-800/80 space-y-1.5 font-mono">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                      ARCHITECTURAL_TRADEOFF
                    </span>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {selectedProject.tradeoff}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/30 border border-zinc-800/80 space-y-1.5 font-mono">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                      FUTURE_ROADMAP
                    </span>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                      {selectedProject.future}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold flex items-center gap-2 transition"
                    >
                      <span>Launch Live Demo</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {selectedProject.repo && (
                    <a
                      href={selectedProject.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white flex items-center gap-2 transition"
                    >
                      <Code2 size={13} />
                      <span>View GitHub Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==========================================
          POWER-USER COMMAND PALETTE (CTRL+K)
      ========================================== */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl rounded-xl border border-zinc-800 bg-[#12121A] overflow-hidden shadow-2xl font-mono text-xs scanlines"
            >
              {/* Input header */}
              <form onSubmit={executeCommand} className="flex items-center gap-2 p-3.5 border-b border-zinc-800 bg-black/60">
                <span className="text-sky-400 font-bold">$</span>
                <input
                  type="text"
                  placeholder="Enter telemetry command (status, cv-pipeline, projects, skills, ping, clear)..."
                  className="bg-transparent flex-1 text-white border-0 outline-none text-xs placeholder-zinc-600"
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setCommandPaletteOpen(false)}
                  className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded hover:text-white"
                >
                  ESC
                </button>
              </form>

              {/* Terminal Logs Output */}
              <div className="p-4 max-h-64 overflow-y-auto space-y-2 bg-zinc-950/60 font-mono text-[11px]">
                {terminalLogs.map((log, idx) => (
                  <p
                    key={idx}
                    className={
                      log.startsWith("$")
                        ? "text-sky-400 font-semibold"
                        : "text-zinc-300 whitespace-pre-wrap leading-relaxed"
                    }
                  >
                    {log}
                  </p>
                ))}
              </div>

              {/* Quick shortcut bar */}
              <div className="p-2.5 bg-black/40 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500">
                <div className="flex items-center gap-3">
                  <span onClick={() => { setCmdInput("status"); }} className="hover:text-sky-400 cursor-pointer">status</span>
                  <span onClick={() => { setCmdInput("cv-pipeline"); }} className="hover:text-sky-400 cursor-pointer">cv-pipeline</span>
                  <span onClick={() => { setCmdInput("projects"); }} className="hover:text-sky-400 cursor-pointer">projects</span>
                  <span onClick={() => { setCmdInput("ping"); }} className="hover:text-sky-400 cursor-pointer">ping</span>
                </div>
                <span>PRESS ENTER TO EXECUTE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}