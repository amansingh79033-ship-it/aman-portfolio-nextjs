"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { RESEARCH_TOPICS } from "@/lib/researchTopics";
import { HardDrive, CheckCircle2, ArrowDownUp } from "lucide-react";

const MemoryHoloLayers3D = dynamic(() => import("@/components/three/MemoryHoloLayers3D"), { ssr: false });

export default function MemoryLayerSection() {
  const data = RESEARCH_TOPICS.memoryLayers;
  const [compacted, setCompacted] = useState<boolean>(true);
  const [selectedLayer, setSelectedLayer] = useState<{ name: string; role: string } | null>(null);

  return (
    <section id="memory-layers" className="relative py-28 md:py-36 bg-[#0a0b12] text-bone">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="node-rule text-emerald-400 text-xs font-mono uppercase tracking-[0.2em] max-w-xs">
              <AnimatedIcon icon={HardDrive} size={14} variant="pulse" colorClass="text-emerald-400" />
              <span>{data.badge}</span>
            </div>
            <span className="px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 text-xs font-mono">
              Reference memory architecture
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-balance max-w-3xl">
            {data.title}
          </h2>
          <p className="mt-4 text-mist text-lg leading-relaxed max-w-3xl">
            {data.abstract}
          </p>
        </ScrollReveal>

        {/* 3D Memory Strata & Interactive Compactor */}
        <div className="mt-12 grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-stretch">
          {/* Left: 3D Memory Holo Canvas */}
          <ScrollReveal delay={0.1} className="relative rounded-3xl border border-white/10 bg-panel/60 overflow-hidden flex flex-col h-[380px] sm:h-[480px] lg:h-[580px]">
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center gap-2">
              <div className="flex max-w-full items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-bone">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="min-w-0 truncate">3D Concentric Memory Strata</span>
              </div>
            </div>

            <div className="w-full h-full">
              <MemoryHoloLayers3D
                compactionActive={compacted}
                onLayerClick={(name, role) => setSelectedLayer({ name, role })}
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-mono">
              <div className="text-emerald-400">
                Retrieval target: <strong className="text-bone">measure in deployment</strong>
              </div>
              <div className="text-mist/70 text-[11px]">
                Click rings to view memory tier
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Compaction & Isolation Matrix */}
          <ScrollReveal delay={0.2} className="flex flex-col justify-between space-y-6">
            <div className="rounded-3xl border border-white/10 bg-panel/50 p-5 sm:p-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  Compaction Engine Telemetry
                </span>
                <button
                  onClick={() => setCompacted((v) => !v)}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-bone transition-colors"
                >
                  <ArrowDownUp size={12} className="text-emerald-400" />
                  <span>Toggle Compaction: <strong>{compacted ? "ON" : "OFF"}</strong></span>
                </button>
              </div>

              {/* Memory Usage Comparison Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs font-mono text-mist mb-1.5">
                    <span>Active Context Consumption</span>
                    <span className={compacted ? "text-emerald-400" : "text-amber-400"}>
                      {compacted ? "Illustrative compact state" : "Illustrative full-context state"}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-black/50 border border-white/5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        compacted
                          ? "w-[32%] bg-gradient-to-r from-emerald-500 to-signal"
                          : "w-[96%] bg-gradient-to-r from-amber-500 to-rose-500"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs font-mono">
                    <span className="text-mist/70 block">Cross-Task Leakage</span>
                    <span className="text-lg font-display font-medium text-emerald-400 mt-0.5 block">Design goal</span>
                    <span className="text-[10px] text-mist/60">Requires isolation controls and audit tests</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs font-mono">
                    <span className="text-mist/70 block">Recall Accuracy</span>
                    <span className="text-lg font-display font-medium text-bone mt-0.5 block">To evaluate</span>
                    <span className="text-[10px] text-signal">Use task-specific recall tests</span>
                  </div>
                </div>
              </div>

              {/* Memory Strata Tiers */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-mist/70 block">
                  Hierarchical Memory Strata:
                </span>
                {[
                  { name: "L1: Ephemeral Scratchpad", desc: "Auto-scrubbed on subtask exit", color: "text-signal" },
                  { name: "L2: Rolling Delta Compactor", desc: "State delta without dialogue bloat", color: "text-agent" },
                  { name: "L3: Durable Knowledge Core", desc: "Durable cross-session invariants", color: "text-sky-400" },
                ].map((tier, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-xs font-mono">
                    <span className={`${tier.color} font-medium`}>{tier.name}</span>
                    <span className="text-mist text-[11px]">{tier.desc}</span>
                  </div>
                ))}
              </div>

              {selectedLayer && (
                <div className="p-3.5 rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-xs font-mono space-y-1">
                  <div className="text-emerald-400 font-medium">{selectedLayer.name}</div>
                  <div className="text-mist">{selectedLayer.role}</div>
                </div>
              )}
            </div>

            {/* Architecture Highlights */}
            <div className="rounded-3xl border border-white/10 bg-panel/30 p-6 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-mist/70">
                Memory Layer Architecture
              </span>
              <div className="space-y-3">
                {data.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-mono font-medium text-bone">{h.heading}</div>
                      <p className="text-xs text-mist leading-relaxed mt-0.5">{h.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Specifications Matrix */}
        <ScrollReveal className="mt-14 pt-8 border-t border-white/10">
          <div className="node-rule text-mist/60 text-xs font-mono uppercase tracking-[0.2em] mb-6 max-w-xs">
            <span>Memory Subsystem Benchmarks</span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {data.specifications.map((s, i) => (
              <div key={i} className="p-4 rounded-2xl bg-panel/40 border border-white/10">
                <span className="text-xs font-mono text-mist block">{s.label}</span>
                <span className="text-sm font-mono text-bone font-medium mt-1 block">{s.value}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
