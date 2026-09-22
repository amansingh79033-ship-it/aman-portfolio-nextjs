"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import {
  ArrowUpRight,
  Link2,
  TrendingUp,
  ShieldAlert,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export type ProjectItem = {
  id: string;
  name: string;
  tagline: string;
  url: string;
  github?: string;
  icon: typeof Link2;
  status: string;
  metrics: string;
  tags: string[];
  description: string;
  architecture: string[];
  color: string;
};

const PROJECTS: ProjectItem[] = [
  {
    id: "linkyy",
    name: "Linkyy Online",
    tagline: "Smart Link Management & AI-Powered Traffic Intelligence",
    url: "https://linkyy.online",
    icon: Link2,
    status: "Live & Scaling",
    metrics: "Reported production target — verify with public monitoring",
    tags: ["Next.js 14", "TypeScript", "SambaNova AI", "PostgreSQL", "Redis", "Tailwind CSS"],
    description:
      "A high-throughput URL shortening and traffic intelligence platform built for modern creators and enterprises. Features AI-powered smart slug suggestions using SambaNova LLM integration, automated SSL renewal workflow generation, geo-distributed visitor tracking, and real-time clickstream telemetry.",
    architecture: [
      "Edge-routed 301/308 redirect pipeline caching hot slugs in distributed Redis clusters.",
      "SambaNova AI integration for contextual alias generation and traffic anomaly analysis.",
      "SSL Auto-Renew daemon that interfaces with Let's Encrypt / Cloudflare DNS API for zero-touch certificate rotation.",
      "Real-time event streaming for click breakdown by referrer, device OS, and city-level geolocation.",
    ],
    color: "#5eead4",
  },
  {
    id: "metric-plus",
    name: "Metric+",
    tagline: "Full-Stack Observability & Performance Intelligence",
    url: "https://metric-plus.vercel.app",
    icon: TrendingUp,
    status: "Production Ready",
    metrics: "Telemetry capabilities — benchmark per deployment",
    tags: ["React", "TypeScript", "tRPC", "TimescaleDB", "Tailwind CSS", "Chart.js"],
    description:
      "A lightweight, developer-first observability suite that tracks endpoint availability, server response latencies, and service error budgets without the bloat of legacy APM platforms. Offers instant webhook alerting into Discord and Slack.",
    architecture: [
      "Multi-region heartbeat pingers querying HTTP/gRPC endpoints every 10–60 seconds.",
      "Sliding-window aggregation pipeline calculating real-time p50, p95, and p99 latency percentiles.",
      "Configurable escalation policies dispatching automated recovery runbooks upon threshold breaches.",
      "Minimalist, high-density dark mode dashboard designed for rapid incident triage.",
    ],
    color: "#8b7cf6",
  },
  {
    id: "woxy-defense",
    name: "Woxy — Transparent Request Defense",
    tagline: "Edge Shield & Automated Anomaly Rate Limiting",
    url: "https://shiny-blancmange-989bb2.netlify.app/",
    icon: ShieldAlert,
    status: "Live Deployment",
    metrics: "Edge proxy concept · validate overhead in deployment",
    tags: ["Edge Functions", "TypeScript", "Web Crypto API", "Cloudflare Workers", "WAF"],
    description:
      "A transparent reverse-proxy security shield that intercepts malicious bot traffic, prevents brute-force credential stuffing, and mitigates layer-7 DDoS floods with cryptographic proof-of-work challenges.",
    architecture: [
      "Token-bucket rate limiter running at edge POPs with microsecond overhead.",
      "Automated heuristic behavioral analysis filtering headless scrapers and botnets.",
      "Zero-dependency lightweight client footprint that preserves core web vitals and SEO performance.",
      "Real-time security audit log visualizing blocked attack vectors and geographic origins.",
    ],
    color: "#38bdf8",
  },
  {
    id: "heartbeat-agent",
    name: "SSL & Heartbeat Autonomous Daemon",
    tagline: "One-Agent Autonomous Workflow Generator & Health Watchdog",
    url: "https://linkyy.online",
    icon: Activity,
    status: "Active Subsystem",
    metrics: "Automation design — verify renewal and availability history",
    tags: ["Node.js", "Cron Workers", "ACME Protocol", "Cloudflare API", "Webhooks"],
    description:
      "An autonomous background worker built on single-responsibility agentic principles. Continuously monitors SSL cert expiration curves across custom domains, initiates automated DNS validation challenges, and validates HTTPS handshake integrity.",
    architecture: [
      "Cron-based health probe evaluating TLS expiry windows 30 days ahead of cutoff.",
      "Isolated agent workflow executing domain validation tokens without human intervention.",
      "Fault-tolerant fallback paths with instant Slack/Discord escalation upon verification failure.",
      "Modular design allowing drop-in integration with any Next.js or reverse-proxy architecture.",
    ],
    color: "#ff8a3d",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section id="work" className="relative bg-panel text-bone py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="node-rule text-signal text-xs font-mono uppercase tracking-[0.2em] mb-4 max-w-xs">
            <AnimatedIcon icon={Terminal} size={14} variant="pulse" />
            <span>Selected work</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium max-w-2xl text-balance">
                Shipped systems, live products &amp; production tools.
              </h2>
              <p className="mt-4 text-mist max-w-xl text-base leading-relaxed">
                Every project here was designed, architected, and engineered with an emphasis on speed, reliability, and modern aesthetic craft.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-mist/70">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All systems active</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setActiveProject(p)}
                className="group relative h-full w-full text-left flex flex-col justify-between rounded-2xl border border-white/10 bg-panel2/60 p-5 sm:p-7 hover:border-signal/50 hover:bg-panel2/80 transition-all duration-300 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(94,234,212,0.08)]"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 bg-black/40 group-hover:border-signal/40 transition-colors"
                        style={{ color: p.color }}
                      >
                        <AnimatedIcon icon={p.icon} size={22} variant="float" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-medium text-bone group-hover:text-signal transition-colors">
                          {p.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span className="text-xs font-mono text-mist/80">{p.status}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className="rounded-full p-2 text-mist group-hover:text-signal group-hover:bg-white/5 transition-colors"
                    >
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <p className="text-sm font-medium text-bone/90 mb-2">{p.tagline}</p>
                  <p className="text-sm text-mist leading-relaxed line-clamp-3 mb-5">
                    {p.description}
                  </p>
                </div>

                <div>
                  <div className="py-2.5 px-3 rounded-lg bg-black/30 border border-white/5 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-xs font-mono text-mist/80">
                    <span className="text-signal/90">Metric:</span>
                    <span className="min-w-0 break-words">{p.metrics}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-mist/90 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 4 && (
                      <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 text-mist/60">
                        +{p.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Interactive Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start sm:items-center justify-center bg-black/80 backdrop-blur-md px-4 py-4 sm:p-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[calc(100svh-2rem)] overflow-y-auto bg-panel border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-9 shadow-2xl relative"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-black/50"
                    style={{ color: activeProject.color }}
                  >
                    <AnimatedIcon icon={activeProject.icon} size={26} variant="float" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-mono text-signal uppercase tracking-wider">
                      Case Study · {activeProject.status}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium mt-0.5 text-bone break-words">
                      {activeProject.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  aria-label="Close modal"
                  className="rounded-full p-2.5 text-mist hover:text-bone hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-mist/70 mb-2">
                    Overview
                  </h4>
                  <p className="text-sm sm:text-base text-bone/90 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-mist/70 mb-3">
                    Architectural Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {activeProject.architecture.map((arch, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-mist leading-relaxed">
                        <CheckCircle2 size={16} className="text-signal shrink-0 mt-0.5" />
                        <span>{arch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-mist/70 mb-2.5">
                    Tech Stack &amp; Infrastructure
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-bone/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-4">
                  <div className="text-xs font-mono text-mist break-words">
                    Performance Benchmark: <span className="text-signal">{activeProject.metrics}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-signal text-ink font-medium px-5 py-2.5 text-sm hover:bg-bone transition-colors"
                    >
                      Visit Live System
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
