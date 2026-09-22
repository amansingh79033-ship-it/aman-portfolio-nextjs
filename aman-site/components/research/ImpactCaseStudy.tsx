"use client";

import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { CloudRain, Cpu, FileCheck2, HardDrive, Users } from "lucide-react";

const ARCHITECTURE = [
  {
    icon: Cpu,
    title: "1. Local compute when connectivity is constrained",
    body: "A vitran7-style edge mesh is a research direction for processing camera, gauge, and forecast signals near the source. It must operate only on opted-in, governed hardware; public-safety operations cannot depend on privately owned vehicles being available.",
  },
  {
    icon: FileCheck2,
    title: "2. Route each decision to the right verifier",
    body: "AHI separates statistical forecasting from deterministic rules: an LLM can summarize an incident, while threshold checks, geospatial constraints, and approval rules remain explicit and testable.",
  },
  {
    icon: Users,
    title: "3. Turn warnings into reviewed actions",
    body: "Semantic execution converts an alert into an auditable, typed plan—such as notify ward teams, inspect a pump, and publish an accessible warning. Human operators approve any action with external consequences.",
  },
  {
    icon: HardDrive,
    title: "4. Preserve the operational handoff",
    body: "Task memory records the current hazard state, decisions, owners, and unresolved checks, so the next shift receives a compact operational brief rather than a long, error-prone chat transcript.",
  },
];

export default function ImpactCaseStudy() {
  return (
    <section id="impact-case" className="relative py-24 md:py-32 bg-[#0b0e17] text-bone border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="node-rule text-signal text-xs font-mono uppercase tracking-[0.2em] mb-4 max-w-xs">
            <AnimatedIcon icon={CloudRain} size={14} variant="pulse" />
            <span>Real-world problem framing</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium max-w-4xl text-balance">
            Flood warnings fail when fragmented data does not become a clear, accountable response.
          </h2>
          <p className="mt-5 text-mist text-lg leading-relaxed max-w-3xl">
            A city may receive rainfall forecasts, river-gauge readings, traffic disruption reports, and emergency calls in different systems. The operational problem is not merely predicting a flood: it is producing a timely, explainable, and accessible response while keeping people in control.
          </p>
          <p className="mt-4 text-sm text-mist leading-relaxed max-w-3xl">
            The need is material. UNDRR reports that countries with more comprehensive multi-hazard early-warning systems have nearly six times lower disaster-related mortality than countries with limited capabilities; WMO reports that early-warning services can deliver a roughly tenfold return on investment. These are system-level findings—not performance claims for this prototype.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {ARCHITECTURE.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <article className="h-full rounded-2xl border border-white/10 bg-panel/50 p-6">
                <AnimatedIcon icon={item.icon} size={20} variant="float" colorClass="text-signal" />
                <h3 className="mt-4 font-display text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed">{item.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-8 rounded-2xl border border-signal/20 bg-signal/5 p-5 text-sm text-mist leading-relaxed">
          <span className="text-signal font-medium">Impact to measure in a pilot:</span>{" "}
          warning-to-decision time, percentage of alerts with a named accountable owner, delivery and acknowledgement rates by channel and language, false-alert rate, and time to produce a complete shift handoff. Independent evaluation, privacy review, and emergency-agency approval are prerequisites—not optional add-ons.
          <span className="block mt-3 text-xs font-mono text-mist/70">
            Sources: <a className="text-signal hover:underline" href="https://www.undrr.org/reports/global-status-MHEWS-2024" target="_blank" rel="noopener noreferrer">UNDRR Global Status of MHEWS 2024</a>{" · "}<a className="text-signal hover:underline" href="https://public.wmo.int/resources/publication-series/global-status-of-multi-hazard-early-warning-systems/global-status-of-multi-hazard-early-warning-systems-2024" target="_blank" rel="noopener noreferrer">WMO Global Status of MHEWS 2024</a>
          </span>
        </ScrollReveal>
      </div>
    </section>
  );
}
