"use client";

import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Aman shipped a complete redesign of our dashboard in under a week — not just visually, but with proper SSR, loading states, and zero hydration errors. Rare combination.",
    author: "Rohan M.",
    role: "CTO, early-stage SaaS",
    stars: 5,
  },
  {
    quote:
      "The agentic pipeline he built handles something we thought required three separate services. Clean, well-documented, genuinely clever.",
    author: "Priya S.",
    role: "Product Lead, fintech startup",
    stars: 5,
  },
  {
    quote:
      "He's one of the few engineers who can both spec the architecture and write the UI. And he actually delivers what he says he'll deliver, on time.",
    author: "Dev K.",
    role: "Co-founder, B2B tool",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-[#0a0c15] text-bone py-28 md:py-36"
    >
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="node-rule text-agent text-xs font-mono uppercase tracking-[0.2em] mb-4 max-w-xs">
            <AnimatedIcon icon={Star} size={14} variant="pulse" colorClass="text-agent" />
            <span>From people I&apos;ve worked with</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium max-w-2xl text-balance">
            Words from the team.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.author} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-white/10 bg-panel/60 p-6 flex flex-col h-full">
                <AnimatedIcon
                  icon={Quote}
                  size={20}
                  colorClass="text-signal/30"
                  variant="pulse"
                  className="mb-4"
                />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className="fill-signal text-signal"
                    />
                  ))}
                </div>
                <p className="text-mist text-sm leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="font-medium text-bone text-sm">{t.author}</div>
                  <div className="text-xs text-mist/60 mt-0.5">{t.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
