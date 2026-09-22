"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  Terminal,
  Sparkles,
} from "lucide-react";
import { reportRpm, type RpmStatus } from "@/lib/rpmBus";

type Stage = {
  agent: number;
  name: string;
  role: string;
  toolScope: string[];
  handoffContract: string;
  executionOutput: string;
};

type CriticRubric = {
  category: string;
  status: string;
  detail: string;
};

type DecomposeResult = {
  taskTitle: string;
  estimatedGain: string;
  summary: string;
  stages: Stage[];
  criticReview: {
    passed: boolean;
    score: string;
    notes: string;
    rubrics: CriticRubric[];
  };
  source?: string;
  rpm?: RpmStatus;
};

const PRESETS = [
  "Build an automated fraud detection webhook with Redis & PostgreSQL",
  "Design a high-throughput edge link-shortening pipeline (<15ms)",
  "Autonomous SSL renewal and heartbeat watchdog daemon",
  "Zero-downtime distributed schema migration coordinator",
];

export default function LiveDelegationBench() {
  const [prompt, setPrompt] = useState(PRESETS[0]);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [result, setResult] = useState<DecomposeResult | null>(null);

  const runDecomposition = async (customPrompt?: string) => {
    const task = (customPrompt || prompt).trim();
    if (!task || loading) return;

    setLoading(true);
    setActiveStep(null);
    setResult(null);

    try {
      const res = await fetch("/api/gemini/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: task }),
      });

      if (!res.ok) throw new Error("Decomposition dispatch failed");
      const data: DecomposeResult = await res.json();
      reportRpm(data.rpm);
      setResult(data);
      setActiveStep(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-panel/40 p-6 md:p-8 overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-signal uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Delegation Architecture Explorer</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl text-bone mt-1">
            Test the One-Agent-One-Task Architecture
          </h3>
          <p className="text-xs text-mist mt-1 max-w-xl">
            Enter a software instruction to inspect a reference decomposition. Gemini is used when configured; otherwise the page returns a labelled local demonstration. Treat output as a starting point, not an execution result.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-agent/15 text-agent border border-agent/30 flex items-center gap-1.5">
            <Cpu size={12} />
            <span>Multi-Agent Dispatch</span>
          </span>
        </div>
      </div>

      {/* Input & Presets */}
      <div className="pt-6 space-y-4">
        <div>
          <label className="block text-xs font-mono text-mist mb-2">
            Target System Instruction:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Build a high-throughput edge caching layer..."
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-bone font-mono placeholder:text-mist/40 focus:outline-none focus:border-signal transition-colors"
            />
            <button
              onClick={() => runDecomposition()}
              disabled={loading || !prompt.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-signal text-ink font-medium text-sm hover:bg-bone transition-colors disabled:opacity-40 font-mono shrink-0"
            >
              {loading ? (
                <>
                  <RotateCcw size={14} className="animate-spin" />
                  <span>Decomposing...</span>
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" />
                  <span>Generate decomposition</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Presets Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-mist/60">Presets:</span>
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(preset);
                runDecomposition(preset);
              }}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-signal/30 text-mist hover:text-bone transition-all text-left truncate max-w-xs"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Results Deck */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 pt-6 border-t border-white/10 space-y-6"
          >
            {/* Top Stat Banner */}
            <div className="grid sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10">
              <div>
                <span className="text-[10px] font-mono text-mist uppercase tracking-wider">
                  Target Task
                </span>
                <div className="font-display text-sm font-medium text-bone mt-0.5 truncate">
                  {result.taskTitle}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-mist uppercase tracking-wider">
                  Evaluation hypothesis
                </span>
                <div className="font-mono text-sm font-bold text-emerald-400 mt-0.5">
                  {result.estimatedGain} — validate per workload
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-mist uppercase tracking-wider">
                  11th Agent Review
                </span>
                <div className="flex items-center gap-1.5 text-sm font-mono text-signal mt-0.5">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Critic Score: {result.criticReview?.score}</span>
                </div>
              </div>
            </div>
            <p className="-mt-3 text-[11px] font-mono text-mist/60">
              Source: {result.source?.includes("synthetic") ? "local demonstration" : "Gemini-generated draft"}. The score and stages are not evidence of an executed build or independent review.
            </p>

            {/* Stages Navigator Pills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-mist">
                <span>10-Agent Ordered Pipeline Graph</span>
                <span>Click node to view contract</span>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                {result.stages.map((stage) => {
                  const isSelected = activeStep === stage.agent;
                  return (
                    <button
                      key={stage.agent}
                      onClick={() => setActiveStep(stage.agent)}
                      className={`p-2 rounded-xl text-center font-mono text-xs border transition-all ${
                        isSelected
                          ? "bg-signal text-ink border-signal font-bold shadow-[0_0_15px_rgba(94,234,212,0.3)]"
                          : "bg-white/[0.04] text-bone/80 border-white/10 hover:border-signal/40"
                      }`}
                    >
                      <div className="text-[10px] opacity-70">A{stage.agent}</div>
                      <div className="truncate text-[10px] mt-0.5">
                        {stage.agent === 10 ? "Integrate" : `Node ${stage.agent}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Stage Detailed Inspector */}
            {activeStep !== null && (
              <div className="rounded-2xl border border-signal/30 bg-panel/70 p-5 space-y-4">
                {(() => {
                  const current = result.stages.find((s) => s.agent === activeStep);
                  if (!current) return null;
                  return (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-signal/20 text-signal font-mono font-bold text-xs flex items-center justify-center">
                            {String(current.agent).padStart(2, "0")}
                          </span>
                          <div>
                            <h4 className="text-sm font-medium text-bone font-mono">
                              {current.name}
                            </h4>
                            <p className="text-xs text-mist">{current.role}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {current.toolScope.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-mist"
                            >
                              tool: {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-[10px] text-signal uppercase tracking-wider block">
                            Explicit Handoff Contract (To Agent {current.agent === 10 ? "Critic" : current.agent + 1})
                          </span>
                          <p className="text-bone/90">{current.handoffContract}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                          <span className="text-[10px] text-emerald-400 uppercase tracking-wider block">
                            Execution Artifact Output
                          </span>
                          <p className="text-mist/90">{current.executionOutput}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 text-[11px] font-mono text-mist">
                        <button
                          disabled={activeStep <= 1}
                          onClick={() => setActiveStep((s) => Math.max(1, (s || 1) - 1))}
                          className="hover:text-bone disabled:opacity-30"
                        >
                          ← Previous Agent
                        </button>
                        <span>Agent {activeStep} of 10</span>
                        <button
                          disabled={activeStep >= 10}
                          onClick={() => setActiveStep((s) => Math.min(10, (s || 1) + 1))}
                          className="hover:text-signal disabled:opacity-30"
                        >
                          Next Agent →
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Critic Pass Review Rubric Card */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-bone">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span className="font-bold">Agent 11 Independent Critic Review Pass</span>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {result.criticReview?.score} Passed
                </span>
              </div>

              <p className="text-xs text-mist font-mono">
                {result.criticReview?.notes}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {result.criticReview?.rubrics?.map((r, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-bone">{r.category}</span>
                      <span className="text-emerald-400 font-bold">✓</span>
                    </div>
                    <div className="text-[10px] text-mist/70 mt-1 leading-tight">
                      {r.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
