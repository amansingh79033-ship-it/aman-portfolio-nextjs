"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { RESEARCH_TOPICS } from "@/lib/researchTopics";
import { Cpu, CheckCircle2 } from "lucide-react";

const AHISynapseField = dynamic(() => import("@/components/three/AHISynapseField"), { ssr: false });

const SIM_SCENARIOS = [
  {
    title: "Formal AST Refactor with Zero Leaks",
    input: "Refactor multi-tenant auth token parser to Rust FFI",
    route: [
      { unit: "Deterministic AST Gate", status: "Validated Tree-sitter Syntax", time: "0.2ms", color: "text-sky-400" },
      { unit: "Z3 Symbolic Engine", status: "Proved Buffer Safety Invariant", time: "1.1ms", color: "text-signal" },
      { unit: "Deep Neural Reasoner", status: "Generated Optimized Idiomatic Rust Code", time: "18.4ms", color: "text-agent" },
    ],
  },
  {
    title: "Financial Quant Strategy with Invariant Bounds",
    input: "Execute delta-neutral liquidity allocation across 4 pools",
    route: [
      { unit: "Fast Heuristic Filter", status: "Classified Risk Topology", time: "0.1ms", color: "text-emerald-400" },
      { unit: "Symbolic SMT Solver", status: "Bounded Slippage <= 0.05% Invariant", time: "0.8ms", color: "text-signal" },
      { unit: "Native Kernel Bridge", status: "Executed Atomic Zero-Copy FFI Dispatch", time: "0.3ms", color: "text-amber-400" },
    ],
  },
];

export default function AHISection() {
  const data = RESEARCH_TOPICS.ahi;
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [activeAgent, setActiveAgent] = useState<{ name: string; role: string } | null>(null);

  const scenario = SIM_SCENARIOS[selectedScenario];

  return (
    <section id="ahi" className="relative py-28 md:py-36 bg-[#0a0c16] text-bone border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="node-rule text-agent text-xs font-mono uppercase tracking-[0.2em] max-w-xs">
              <AnimatedIcon icon={Cpu} size={14} variant="spin" colorClass="text-agent" />
              <span>{data.badge}</span>
            </div>
            <span className="px-3 py-1 rounded-full border border-agent/30 bg-agent/10 text-agent text-xs font-mono">
              Reference architecture · validate on a bounded task
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-balance max-w-3xl">
            {data.title}
          </h2>
          <p className="mt-4 text-mist text-lg leading-relaxed max-w-3xl">
            {data.abstract}
          </p>
        </ScrollReveal>

        {/* 3D Neural Synapse Lattice & Dispatch Simulator */}
        <div className="mt-12 grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-stretch">
          {/* Left: 3D WebGL Neural Matrix */}
          <ScrollReveal delay={0.1} className="relative rounded-3xl border border-white/10 bg-panel/60 overflow-hidden flex flex-col h-[380px] sm:h-[460px] lg:h-[560px]">
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center gap-2">
              <div className="flex max-w-full items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-bone">
                <span className="w-2 h-2 rounded-full bg-agent animate-pulse" />
                <span className="min-w-0 truncate">3D Heterogeneous Synapse Lattice</span>
              </div>
            </div>

            <div className="w-full h-full">
              <AHISynapseField
                onAgentClick={(name, role) => setActiveAgent({ name, role })}
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-mono">
              <div className="text-agent">
                Displayed timings: <strong className="text-bone">illustrative scenario values</strong>
              </div>
              <div className="text-mist/70 text-[11px]">
                Click nodes to isolate co-processor
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Heterogeneous Dispatch Simulator */}
          <ScrollReveal delay={0.2} className="flex flex-col justify-between space-y-6">
            <div className="rounded-3xl border border-white/10 bg-panel/50 p-5 sm:p-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-agent">
                  Dispatch scenario explorer
                </span>
                <span className="text-xs font-mono text-mist">
                  Bounded checks only; no universal guarantee
                </span>
              </div>

              {/* Scenario Selector */}
              <div>
                <span className="block text-xs font-mono text-mist mb-2">Select Evaluation Query:</span>
                <div className="grid sm:grid-cols-2 gap-2">
                  {SIM_SCENARIOS.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedScenario(idx)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedScenario === idx
                          ? "border-agent bg-agent/15 text-bone"
                          : "border-white/10 hover:border-white/20 bg-black/30 text-mist"
                      }`}
                    >
                      <div className="font-mono text-xs font-medium">{s.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulated Query Stream */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono">
                <div className="text-mist/60 text-[11px] mb-1">Incoming Intent:</div>
                <div className="text-signal break-words">&gt; {scenario.input}</div>
              </div>

              {/* Co-Processor Routing Steps */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono text-mist uppercase tracking-wider block">
                  Heterogeneous Unit Routing:
                </span>
                {scenario.route.map((r, i) => (
                  <div key={i} className="p-3 rounded-xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-mono">
                    <div className="min-w-0">
                      <span className={`${r.color} font-medium block`}>{r.unit}</span>
                      <span className="text-mist/80 text-[11px] break-words">{r.status}</span>
                    </div>
                    <span className="text-mist text-[11px] font-mono px-2 py-0.5 rounded bg-white/5">
                      {r.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active Agent Info */}
              {activeAgent && (
                <div className="p-4 rounded-2xl bg-agent/10 border border-agent/30 text-xs font-mono space-y-1 animate-fadeIn">
                  <div className="flex items-center justify-between text-agent font-medium">
                    <span>{activeAgent.name}</span>
                    <button onClick={() => setActiveAgent(null)} className="text-mist hover:text-bone">✕</button>
                  </div>
                  <div className="text-bone">{activeAgent.role}</div>
                </div>
              )}
            </div>

            {/* Architecture Highlights */}
            <div className="rounded-3xl border border-white/10 bg-panel/30 p-6 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-mist/70">
                Heterogeneous Guarantees
              </span>
              <div className="space-y-3">
                {data.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-agent shrink-0 mt-0.5" />
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
            <span>AHI Integration Matrix</span>
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
