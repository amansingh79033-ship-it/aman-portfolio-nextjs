"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { RESEARCH_TOPICS } from "@/lib/researchTopics";
import { Layers, RotateCcw, CheckCircle2 } from "lucide-react";

const SemanticStack3D = dynamic(() => import("@/components/three/SemanticStack3D"), { ssr: false });

const PIPELINE_STEPS = [
  {
    step: "01",
    title: "Natural Intent Parsing",
    ir: "OP_PARSE(goal: 'Deploy Canary Replica', env: 'prod_eu')",
    desc: "Extracts action primitives and sets deterministic boundary invariants.",
  },
  {
    step: "02",
    title: "Semantic Intermediate Representation (SIR)",
    ir: "DAG_BUILD: [AuthToken::Verify] -> [K8s::Drain(node_4)] -> [Vpc::Route]",
    desc: "Transforms prompt into strongly-typed, verifiable execution opcodes.",
  },
  {
    step: "03",
    title: "Speculative Graph Branching",
    ir: "SPECULATE: Fork(Branch_A: Canary 10%, Branch_B: BlueGreen 50%)",
    desc: "Pre-evaluates candidate actions in copy-on-write memory. Any throughput improvement must be measured against a workload-specific baseline.",
  },
  {
    step: "04",
    title: "Formal Gate & Rollback Journal",
    ir: "VALIDATE: SMT(assert MemoryUsage < 85%) -> PASS",
    desc: "A formal gate can verify declared invariants. Reversible internal state can roll back; external side effects need explicit compensating actions.",
  },
];

export default function SemanticExecutionSection() {
  const data = RESEARCH_TOPICS.semanticExecution;
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [rollbackTriggered, setRollbackTriggered] = useState<boolean>(false);
  const [selectedLayerInfo, setSelectedLayerInfo] = useState<{ name: string; desc: string } | null>(null);

  const triggerRollback = () => {
    setRollbackTriggered(true);
    setTimeout(() => {
      setRollbackTriggered(false);
      setCurrentStep(0);
    }, 2800);
  };

  return (
    <section id="semantic-execution" className="relative py-28 md:py-36 bg-[#080a10] text-bone border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="node-rule text-sky-400 text-xs font-mono uppercase tracking-[0.2em] max-w-xs">
              <AnimatedIcon icon={Layers} size={14} variant="float" colorClass="text-sky-400" />
              <span>{data.badge}</span>
            </div>
            <span className="px-3 py-1 rounded-full border border-sky-400/30 bg-sky-400/10 text-sky-400 text-xs font-mono">
              Prototype pattern · benchmark required
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-balance max-w-3xl">
            {data.title}
          </h2>
          <p className="mt-4 text-mist text-lg leading-relaxed max-w-3xl">
            {data.abstract}
          </p>
        </ScrollReveal>

        {/* 3D Holographic Plane & Step-Through Simulator */}
        <div className="mt-12 grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-stretch">
          {/* Left: 3D Holographic Execution Stack */}
          <ScrollReveal delay={0.1} className="relative rounded-3xl border border-white/10 bg-panel/60 overflow-hidden flex flex-col h-[380px] sm:h-[480px] lg:h-[580px]">
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center gap-2">
              <div className="flex max-w-full items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-bone">
                <span className={`w-2 h-2 rounded-full ${rollbackTriggered ? "bg-rose-500 animate-ping" : "bg-sky-400 animate-pulse"}`} />
                <span className="min-w-0 truncate">{rollbackTriggered ? "ROLLBACK JOURNAL ACTIVE" : "3D Execution Planes"}</span>
              </div>
            </div>

            <div className="w-full h-full">
              <SemanticStack3D
                currentStage={currentStep}
                isRollbackActive={rollbackTriggered}
                onLayerSelect={(name, desc) => setSelectedLayerInfo({ name, desc })}
              />
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-mono">
              <div className="text-sky-400">
                Rollback display: <strong className="text-bone">illustrative internal-state scenario</strong>
              </div>
              <div className="text-mist/70 text-[11px]">
                Click planes to inspect opcode layer
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Interactive Stepper & Rollback Demonstrator */}
          <ScrollReveal delay={0.2} className="flex flex-col justify-between space-y-6">
            <div className="rounded-3xl border border-white/10 bg-panel/50 p-5 sm:p-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
                  Execution Stepper &amp; Rollback
                </span>
                <button
                  onClick={triggerRollback}
                  disabled={rollbackTriggered}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 text-xs font-mono transition-colors disabled:opacity-50"
                >
                  <RotateCcw size={12} className={rollbackTriggered ? "animate-spin" : ""} />
                  <span>Simulate Fault &amp; Rollback</span>
                </button>
              </div>

              {/* Step Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PIPELINE_STEPS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setRollbackTriggered(false);
                      setCurrentStep(idx);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      currentStep === idx && !rollbackTriggered
                        ? "border-sky-400 bg-sky-400/15 text-bone"
                        : "border-white/10 hover:border-white/20 bg-black/30 text-mist"
                    }`}
                  >
                    <div className="font-mono text-xs text-sky-400">{s.step}</div>
                    <div className="text-[11px] font-mono truncate mt-0.5">{s.title.split(" ")[0]}</div>
                  </button>
                ))}
              </div>

              {/* Active Step Detail Card */}
              <div className={`p-4 rounded-2xl border transition-all ${
                rollbackTriggered
                  ? "bg-rose-950/30 border-rose-500/40 text-rose-200"
                  : "bg-black/40 border-white/10"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs font-mono mb-2">
                  <span className={rollbackTriggered ? "text-rose-400 font-bold" : "text-sky-400"}>
                    {rollbackTriggered ? "TRANSACTION ABORT & ROLLBACK" : PIPELINE_STEPS[currentStep].title}
                  </span>
                  <span className="text-mist/70">
                    {rollbackTriggered ? "Reverting state journal" : "Active Stage"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/60 font-mono text-xs text-bone/90 overflow-x-auto border border-white/5 mb-3">
                  <code>{rollbackTriggered ? "ROLLBACK_DEMO: inverse operations applied to the local scenario state." : PIPELINE_STEPS[currentStep].ir}</code>
                </div>

                <p className="text-xs text-mist leading-relaxed">
                  {rollbackTriggered
                    ? "This demonstration resets only local scenario state. A production workflow must use idempotency controls and compensating actions for external side effects."
                    : PIPELINE_STEPS[currentStep].desc}
                </p>
              </div>

              {/* Selected Layer Info */}
              {selectedLayerInfo && (
                <div className="p-3.5 rounded-xl bg-sky-400/10 border border-sky-400/30 text-xs font-mono space-y-1">
                  <div className="text-sky-400 font-medium">{selectedLayerInfo.name}</div>
                  <div className="text-mist">{selectedLayerInfo.desc}</div>
                </div>
              )}
            </div>

            {/* Architecture Highlights */}
            <div className="rounded-3xl border border-white/10 bg-panel/30 p-6 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-mist/70">
                Deterministic Execution Features
              </span>
              <div className="space-y-3">
                {data.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-sky-400 shrink-0 mt-0.5" />
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
            <span>Semantic IR Engine Benchmarks</span>
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
