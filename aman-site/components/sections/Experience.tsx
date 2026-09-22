"use client";

import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { Briefcase, Calendar, CheckCircle, ExternalLink, ShieldAlert, Cpu, Building } from "lucide-react";

const EXPERIENCES = [
  {
    role: "Site Reliability Engineer / DevOps Engineer",
    company: "Wandrian",
    period: "Present",
    location: "Bengaluru, India",
    platform: "Italia Rail Platform Family (ItaliaRail, ItaliaPlanner, ItaliaPass, ItaliaTours)",
    summary:
      "Direct end-to-end production availability, performance, and infrastructure reliability for international passenger booking platforms serving high-concurrency global European travel traffic.",
    achievements: [
      "Engineered an AI-powered log intelligence and heartbeat monitoring platform integrating AWS CloudWatch and Loggly for real-time anomaly detection across all four properties.",
      "Implemented automated synthetic checkout funnel dry-runs across all Italia Rail surfaces for proactive failure detection prior to passenger impact.",
      "Diagnosed and remediated critical production CPU overload and EC2 auto-scaling failures on t3.medium infrastructure; authored comprehensive RCA and remediation documentation.",
      "Automated SSL certificate lifecycle tooling on Acquia Cloud, eradicating manual renewal failure risks.",
      "Developed AWS S3 log-fetching pipelines and automated SendGrid/Gmail incident triage scripts, slashing MTTR.",
      "Authored the Q3 2026 strategic SRE roadmap encompassing 14 initiatives across observability, security, and cloud cost containment.",
    ],
  },
  {
    role: "Founder & CEO",
    company: "Q-Re-Us Minds",
    period: "Present",
    location: "Bengaluru, India",
    platform: "Applied AI Research & SaaS Organization",
    summary:
      "Founded applied research organization building intelligent systems for SRE and engineering workflows: \"Build machines that handle what machines do best, so humans can do what only humans can.\"",
    achievements: [
      "Architected Metric+: Real-time developer observability suite with p50/p95/p99 latency calculations and sliding-window aggregation.",
      "Engineered resolvE.io: Agentic AI incident response platform with multi-cloud connectors, adaptive confidence scores, and human-in-the-loop gates.",
      "Shipped Woxy: Edge fraud and bot protection reverse-proxy gateway powered by SambaNova DeepSeek-V3.2 with public transparency ledger.",
      "Architected OverWatch AHI: Enterprise distributed telemetry platform on Next.js, FastAPI, Apache Kafka, Redis, TimescaleDB, and OpenSearch.",
      "Built Sentinel: Autonomous log analysis engine utilizing Google Gemini for SOP-to-playbook ingestion and automated executive PDF reporting.",
    ],
  },
  {
    role: "Founder & CEO",
    company: "Vitran AI (formerly VehEdge)",
    period: "Present",
    location: "Bengaluru, India",
    platform: "Automotive Distributed Edge Compute",
    summary:
      "Founded Vehicle-as-a-Compute edge platform targeting Indian OEMs, turning vehicle compute idle time into an edge grid for distributed intelligence and fleet telemetry.",
    achievements: [
      "Delivered interactive fleet simulation engine demonstrating OEM edge compute offloading.",
      "Engineered high-performance WebGL/Three.js interactive platform visualizer for investor and OEM presentations.",
      "Defined platform architecture for low-latency vehicle-to-cloud telemetry sync.",
    ],
  },
  {
    role: "Founder & Architect",
    company: "Propertyfie.com & CuriousMinds.online",
    period: "Present",
    location: "Bengaluru, India",
    platform: "PropTech CRM & Cognitive Agent Research",
    summary:
      "Spearheaded multi-agent WhatsApp customer CRM under RERA compliance alongside foundational AI research on bidirectional cognitive verification.",
    achievements: [
      "Engineered full-featured WhatsApp CRM with multi-agent routing, ticket handling, and incoming calling flows for distributed sales teams.",
      "Conducted research on the Khyati-7 / AHI framework (Bidirectional Verification in AI systems) exploring trust mechanisms for autonomous agents.",
      "Developed beYOU GPT on-device cognitive agent design guidelines for edge-deployed personal AI assistants.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative bg-[#0d0f17] text-bone py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="node-rule text-signal text-xs font-mono uppercase tracking-[0.2em] mb-4 max-w-xs">
            <AnimatedIcon icon={Briefcase} size={14} variant="float" />
            <span>Career trajectory</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium max-w-2xl text-balance">
            Where I&apos;ve built, shipped, and scaled.
          </h2>
          <p className="mt-4 text-mist max-w-xl">
            Authentic production track record across high-availability international cloud infrastructure (Wandrian SRE) and serial AI ventures (Q-Re-Us Minds, Vitran AI).
          </p>
        </ScrollReveal>

        <div className="mt-16 space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-signal/60 before:via-white/10 before:to-transparent">
          {EXPERIENCES.map((exp, i) => (
            <ScrollReveal key={exp.role + exp.company} delay={i * 0.1} className="relative pl-10 sm:pl-12">
              <span className="absolute left-1.5 sm:left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-signal bg-ink -translate-x-1/2" />
              
              <div className="rounded-2xl border border-white/10 bg-panel/60 p-5 sm:p-8 hover:border-signal/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl sm:text-2xl font-medium text-bone break-words">
                      {exp.role}
                    </h3>
                    <div className="text-signal text-sm font-medium mt-0.5 flex items-center gap-2">
                      <span>{exp.company}</span>
                      {exp.platform && (
                        <>
                          <span className="text-mist/60">&bull;</span>
                          <span className="text-mist text-xs font-mono">{exp.platform}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex max-w-full flex-wrap items-center gap-2 text-xs font-mono text-mist bg-white/5 px-3 py-1.5 rounded-full self-start sm:self-auto border border-white/5">
                    <Calendar size={13} className="text-signal" />
                    <span>{exp.period}</span>
                    <span>·</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-mist leading-relaxed mb-6">
                  {exp.summary}
                </p>

                <div className="space-y-2.5">
                  {exp.achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-bone/85">
                      <CheckCircle size={15} className="text-signal/80 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
