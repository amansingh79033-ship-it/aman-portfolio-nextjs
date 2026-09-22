"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { CONCEPTS } from "@/lib/aiConcepts";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { Brain, X } from "lucide-react";
import LiveDelegationBench from "@/components/ai/LiveDelegationBench";

const AgentConstellation = dynamic(
  () => import("@/components/three/AgentConstellation"),
  { ssr: false }
);

export default function AILab() {
  const [selected, setSelected] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"constellation" | "live-bench">("live-bench");
  const active = CONCEPTS.find((c) => c.id === selected) ?? null;

  return (
    <section id="lab" className="relative bg-black text-bone py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="node-rule text-agent text-xs font-mono uppercase tracking-[0.2em] max-w-xs">
              <AnimatedIcon icon={Brain} size={14} variant="spin" colorClass="text-agent" />
              <span>The AI Lab</span>
            </div>

            {/* View Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-panel/80 border border-white/10 self-start sm:self-auto font-mono text-xs">
              <button
                onClick={() => setViewMode("live-bench")}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === "live-bench"
                    ? "bg-signal text-ink font-bold shadow-[0_0_12px_rgba(94,234,212,0.3)]"
                    : "text-mist hover:text-bone"
                }`}
              >
                <span>⚡ Live Gemini Engine</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-black/20 uppercase font-bold">
                  Live
                </span>
              </button>
              <button
                onClick={() => setViewMode("constellation")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === "constellation"
                    ? "bg-signal text-ink font-bold shadow-[0_0_12px_rgba(94,234,212,0.3)]"
                    : "text-mist hover:text-bone"
                }`}
              >
                <span>3D Constellation</span>
              </button>
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium max-w-2xl text-balance">
            Ten concepts for a delegation model—evaluate the benefit on the workload that matters.
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            {viewMode === "live-bench"
              ? "Experiment with a reference decomposition below. Gemini is used when available; otherwise a labelled local demo explains the architecture."
              : "Drag the constellation to rotate it. Click a node to open the concept it represents — each one is a lever an agentic system can pull to work faster without losing the thread."}
          </p>
        </ScrollReveal>

        {viewMode === "live-bench" ? (
          <div className="mt-10">
            <LiveDelegationBench />
          </div>
        ) : (
          <div className="mt-14 grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-stretch">
            <ScrollReveal delay={0.1} className="relative h-[360px] sm:h-[420px] md:h-[560px] rounded-3xl border border-white/10 bg-panel/40 overflow-hidden">
              <AgentConstellation onSelect={setSelected} />
              <div className="absolute bottom-4 left-4 text-[11px] font-mono text-mist/70">
                drag to rotate · click a node
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="flex flex-col gap-2 md:max-h-[560px] md:overflow-y-auto md:pr-1">
              {CONCEPTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                    selected === c.id
                      ? "border-signal bg-signal/10"
                      : "border-white/10 hover:border-white/25 bg-panel/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-mist">
                      {String(c.id).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-signal">{c.gain}</span>
                  </div>
                  <div className="mt-1 font-medium text-sm text-bone">{c.title}</div>
                  <p className="mt-1 text-xs text-mist leading-relaxed">{c.summary}</p>
                </button>
              ))}
            </ScrollReveal>
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[calc(100svh-2rem)] overflow-y-auto bg-panel border border-white/10 rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-signal">
                    {String(active.id).padStart(2, "0")} / 10 · {active.gain}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl mt-1">{active.title}</h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="shrink-0 rounded-full p-2 hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mt-4 text-mist leading-relaxed text-sm">{active.detail}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
