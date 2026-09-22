"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import TypewriterName from "@/components/TypewriterName";
import AnimatedIcon from "@/components/AnimatedIcon";
import { ArrowDownRight, Sparkles } from "lucide-react";

const AgentConstellation = dynamic(
  () => import("@/components/three/AgentConstellation"),
  { ssr: false }
);

export default function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });
    tl.fromTo(eyebrowRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 })
      .fromTo(
        headlineRef.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        "-=0.3"
      )
      .fromTo(subRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(ctaRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3");
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <AgentConstellation interactive={false} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/60 to-ink pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-16 w-full">
        <div ref={eyebrowRef} className="node-rule text-signal text-xs font-mono uppercase tracking-[0.2em] mb-6 max-w-xs">
          <AnimatedIcon icon={Sparkles} size={14} variant="pulse" />
          <span>Engineer &amp; builder</span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display text-balance text-4xl sm:text-6xl md:text-7xl font-medium leading-[1.05] text-bone"
        >
          <TypewriterName text="Aman Kumar Singh" className="text-signal" />
          <br />
          builds systems that
          <span className="text-agent"> delegate, remember, and ship.</span>
        </h1>

        <p ref={subRef} className="mt-6 max-w-xl text-mist text-lg leading-relaxed">
          I design and ship product interfaces and the agentic backends behind
          them — including a one-agent-one-task delegation model that keeps
          long, multi-step instructions from losing context. Scroll into the
          lab below to see it work.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href="/research"
            className="inline-flex w-full sm:w-auto max-w-full items-center justify-center gap-2 rounded-full bg-signal text-ink font-medium px-5 py-3 text-sm text-center hover:bg-bone transition-colors"
          >
            <span className="min-w-0">Explore Research (vitran7 &amp; AHI)</span>
            <AnimatedIcon icon={ArrowDownRight} size={16} colorClass="text-ink" variant="float" />
          </a>
          <a
            href="#lab"
            className="text-sm text-mist hover:text-bone transition-colors font-mono py-2"
          >
            AI Concepts Lab ↓
          </a>
          <a href="#work" className="text-sm text-mist hover:text-bone transition-colors font-mono py-2">
            Selected Work →
          </a>
        </div>
      </div>
    </section>
  );
}
