"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { RESEARCH_TOPICS } from "@/lib/researchTopics";
import { Zap, Gauge, CheckCircle2 } from "lucide-react";

const Vitran7Mesh3D = dynamic(() => import("@/components/three/Vitran7Mesh3D"), { ssr: false });

export default function Vitran7Section() {
  const data = RESEARCH_TOPICS.vitran7;
  const [fleetSize, setFleetSize] = useState<number>(4500);
  const [activeMode, setActiveMode] = useState<"mesh" | "sharding" | "thermal">("mesh");
  const [selectedNode, setSelectedNode] = useState<{ id: string; type: string; tflops: number; load: number } | null>(null);

  // Dynamic telemetry calculations based on fleet size & mode
  const metrics = useMemo(() => {
    const totalTflops = Math.round(fleetSize * 0.32); // average 320 TFLOPs per vehicle
    const offloadPercent = Math.min(94, Math.round(45 + (fleetSize / 50000) * 45));
    const powerSavedMWh = (fleetSize * 0.0028).toFixed(1);
    const p95Latency = activeMode === "sharding" ? "19.4ms" : activeMode === "thermal" ? "32.1ms" : "24.6ms";
    return { totalTflops, offloadPercent, powerSavedMWh, p95Latency };
  }, [fleetSize, activeMode]);

  return (
    <section id="vitran7" className="relative py-28 md:py-36 bg-[#090b12] text-bone border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="node-rule text-signal text-xs font-mono uppercase tracking-[0.2em] max-w-xs">
              <AnimatedIcon icon={Zap} size={14} variant="pulse" />
              <span>{data.badge}</span>
            </div>
            <span className="px-3 py-1 rounded-full border border-signal/30 bg-signal/10 text-signal text-xs font-mono">
              Research concept · scenario model
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-balance max-w-3xl">
            {data.title}
          </h2>
          <p className="mt-4 text-mist text-lg leading-relaxed max-w-3xl">
            {data.abstract}
          </p>
        </ScrollReveal>

        {/* Interactive 3D Mesh Canvas & Live Control Matrix */}
        <div className="mt-12 grid lg:grid-cols-[1.2fr,0.8fr] gap-8 items-stretch">
          {/* Left: 3D WebGL Canvas */}
          <ScrollReveal delay={0.1} className="relative rounded-3xl border border-white/10 bg-panel/60 overflow-hidden flex flex-col h-[380px] sm:h-[480px] lg:h-[580px]">
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center gap-2">
              <div className="flex max-w-full items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-bone">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="min-w-0 truncate">3D EV Tensor Grid</span>
              </div>
            </div>

            <div className="w-full h-full">
              <Vitran7Mesh3D
                fleetSize={fleetSize}
                activeMode={activeMode}
                onNodeSelect={setSelectedNode}
              />
            </div>

            {/* Bottom Floating Telemetry Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 text-xs font-mono">
              <div className="flex min-w-0 items-center gap-2 text-signal">
                <Gauge size={14} />
                <span className="min-w-0 break-words">Aggregate Cluster: <strong className="text-bone">{metrics.totalTflops.toLocaleString()} TFLOPs</strong></span>
              </div>
              <div className="text-mist">
                Scenario latency: <span className="text-emerald-400">{metrics.p95Latency}</span>
              </div>
              <div className="text-mist/70 text-[11px] hidden sm:block">
                Drag to rotate · Click node to inspect
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Live Interactive Telemetry Controls & Specs */}
          <ScrollReveal delay={0.2} className="flex flex-col justify-between space-y-6">
            {/* Control Panel */}
            <div className="rounded-3xl border border-white/10 bg-panel/50 p-5 sm:p-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-signal">
                  Cluster Orchestration Sim
                </span>
                <span className="text-xs font-mono text-mist">
                  Active Fleet: <strong className="text-bone font-medium">{fleetSize.toLocaleString()} EVs</strong>
                </span>
              </div>

              {/* Fleet Slider */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs font-mono text-mist mb-2">
                  <span>Parked EV Node Capacity</span>
                  <span className="text-signal">{fleetSize} Vehicles</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="50000"
                  step="200"
                  value={fleetSize}
                  onChange={(e) => setFleetSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#5eead4]"
                />
              </div>

              {/* Mode Toggle Buttons */}
              <div>
                <span className="block text-xs font-mono text-mist mb-2">Execution Topology</span>
                <div className="grid sm:grid-cols-3 gap-2">
                  {[
                    { id: "mesh", label: "P2P Mesh", desc: "Local peer token broadcast" },
                    { id: "sharding", label: "Pipeline Shard", desc: "Model layer distribution" },
                    { id: "thermal", label: "Battery Safe", desc: "Depot thermal throttling" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveMode(m.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        activeMode === m.id
                          ? "border-signal bg-signal/15 text-bone"
                          : "border-white/10 hover:border-white/20 bg-black/30 text-mist"
                      }`}
                    >
                      <div className="font-mono text-xs font-medium">{m.label}</div>
                      <div className="text-[10px] text-mist/70 mt-0.5 leading-tight">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Metric Cards */}
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[11px] font-mono text-mist/70 block">Datacentre Offload</span>
                  <span className="text-2xl font-display font-medium text-signal mt-1 block">
                    {metrics.offloadPercent}%
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 mt-0.5 block">Peak load diverted</span>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[11px] font-mono text-mist/70 block">Cooling Power Offset</span>
                  <span className="text-2xl font-display font-medium text-bone mt-1 block">
                    {metrics.powerSavedMWh} <span className="text-sm text-mist">MWh</span>
                  </span>
                  <span className="text-[10px] font-mono text-signal mt-0.5 block">Zero cooling water used</span>
                </div>
              </div>

              {/* Node Inspector Modal/Box */}
              {selectedNode && (
                <div className="p-4 rounded-2xl bg-signal/10 border border-signal/30 text-xs font-mono space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-signal font-medium">
                    <span>{selectedNode.id}</span>
                    <button onClick={() => setSelectedNode(null)} className="text-mist hover:text-bone">✕</button>
                  </div>
                  <div className="text-bone">{selectedNode.type}</div>
                  <div className="text-mist">Silicon Compute: {selectedNode.tflops} TFLOPs · Current Load: {selectedNode.load}%</div>
                </div>
              )}
            </div>

            {/* Architectural Highlights */}
            <div className="rounded-3xl border border-white/10 bg-panel/30 p-6 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-mist/70">
                Core Innovations
              </span>
              <div className="space-y-3">
                {data.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-signal shrink-0 mt-0.5" />
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

        {/* Technical Specification Matrix */}
        <ScrollReveal className="mt-14 pt-8 border-t border-white/10">
          <div className="node-rule text-mist/60 text-xs font-mono uppercase tracking-[0.2em] mb-6 max-w-xs">
            <span>Hardware &amp; Network Protocol Specs</span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3.5">
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
