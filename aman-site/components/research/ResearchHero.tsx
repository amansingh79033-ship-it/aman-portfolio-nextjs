"use client";

import AnimatedIcon from "@/components/AnimatedIcon";
import { Sparkles, Cpu, Layers, HardDrive, Zap } from "lucide-react";

export default function ResearchHero() {
  const topics = [
    { href: "#impact-case", label: "Impact Case", icon: Zap, color: "text-signal", metric: "Flood response" },
    { href: "#vitran7", label: "vitran7 EV Mesh", icon: Zap, color: "text-signal", metric: "Research concept" },
    { href: "#ahi", label: "AHI Architecture", icon: Cpu, color: "text-agent", metric: "Reference design" },
    { href: "#semantic-execution", label: "Semantic Execution", icon: Layers, color: "text-sky-400", metric: "Prototype pattern" },
    { href: "#memory-layers", label: "Task Memory Layers", icon: HardDrive, color: "text-emerald-400", metric: "Evaluation framework" },
  ];

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-ink border-b border-white/10">
      {/* Background ambient mesh glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-signal/15 via-agent/15 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="node-rule text-signal text-xs font-mono uppercase tracking-[0.25em] mb-6 max-w-xs">
          <AnimatedIcon icon={Sparkles} size={14} variant="pulse" />
          <span>Advanced Systems Research</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-bone leading-[1.08] max-w-4xl text-balance">
          Decentralizing Compute &amp; Architecting
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal via-sky-300 to-agent">
            {" "}Deterministic Agentic Foundations.
          </span>
        </h1>

        <p className="mt-7 text-mist text-lg md:text-xl max-w-3xl leading-relaxed">
          Exploring hardware-level compute harvesting, heterogeneous multi-agent kernels, and transactional semantic execution layers to scale AI infrastructure sustainably.
        </p>

        {/* Quick-Jump Research Topic Cards */}
        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-5 gap-3.5">
          {topics.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="group p-4 rounded-2xl border border-white/10 bg-panel/60 hover:border-signal/50 hover:bg-panel2 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <AnimatedIcon icon={t.icon} size={20} colorClass={t.color} variant="float" />
                <span className="text-[11px] font-mono text-mist/70 group-hover:text-bone transition-colors">
                  {t.metric}
                </span>
              </div>
              <div className="mt-4 font-display font-medium text-sm text-bone group-hover:text-signal transition-colors flex items-center justify-between gap-3">
                <span className="min-w-0 break-words">{t.label}</span>
                <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
              </div>
            </a>
          ))}
        </div>

        {/* Live Lab Status Ribbon */}
        <div className="mt-8 py-3 px-4 rounded-xl bg-black/40 border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-mist">
          <div className="flex min-w-0 items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-bone min-w-0 break-words">Interactive concept visualizations — not operational telemetry</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-mist/60">
            <span>Click and drag 3D models to rotate</span>
            <span>·</span>
            <span>Tap nodes for real-time telemetry</span>
          </div>
        </div>
      </div>
    </section>
  );
}
