"use client";

import { PIPELINE, REVIEW_CRITERIA } from "@/lib/aiConcepts";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { GitBranch, ShieldCheck } from "lucide-react";

export default function Process() {
  return (
    <section id="process" className="relative bg-[#0c1120] text-bone py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="node-rule text-signal text-xs font-mono uppercase tracking-[0.2em] mb-4 max-w-xs">
            <AnimatedIcon icon={GitBranch} size={14} variant="float" />
            <span>Delegation pipeline</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium max-w-2xl text-balance">
            When one instruction breaks into ten tasks.
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            Each sub-agent gets exactly one subtask and a short summary of
            what's already done — not the full transcript. Agent ten hands
            off to a final reviewer.
          </p>
        </ScrollReveal>

        <ol className="mt-14 relative border-l border-white/10 ml-3">
          {PIPELINE.map((stage, i) => (
            <ScrollReveal as="li" key={stage.agent} delay={i * 0.03} className="relative pl-8 pb-8 last:pb-0">
              <span className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-signal" />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-xs text-signal">
                  Agent {String(stage.agent).padStart(2, "0")}
                </span>
                <span className="font-medium text-bone">{stage.does}</span>
              </div>
              <p className="mt-1 text-sm text-mist">
                Inherits: {stage.inheritsFrom}
              </p>
              <p className="text-sm text-mist/80">Hands off: {stage.handsOff}</p>
            </ScrollReveal>
          ))}
        </ol>

        <ScrollReveal className="mt-16 rounded-2xl border border-white/10 bg-panel/40 p-6 sm:p-8">
          <div className="node-rule text-agent text-xs font-mono uppercase tracking-[0.2em] mb-4 max-w-xs">
            <AnimatedIcon icon={ShieldCheck} size={14} variant="pulse" colorClass="text-agent" />
            <span>Final critical review</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {REVIEW_CRITERIA.map((r) => (
              <div key={r.title}>
                <div className="font-medium text-bone">{r.title}</div>
                <p className="text-sm text-mist mt-1">{r.note}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
