"use client";

import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { User, Zap, Cpu, Code2 } from "lucide-react";

const SKILLS = [
  { label: "Next.js / React", note: "SSR, App Router, edge functions" },
  { label: "TypeScript", note: "strict mode, runtime validation" },
  { label: "Node.js / tRPC", note: "API design, streaming" },
  { label: "Three.js / WebGL", note: "real-time 3D, shaders" },
  { label: "GSAP / Framer Motion", note: "animation, gesture-driven UI" },
  { label: "Agentic Systems", note: "orchestration, multi-agent delegation" },
  { label: "Postgres / Prisma", note: "schema design, migrations" },
  { label: "Tailwind CSS", note: "design systems, tokens" },
];

const HIGHLIGHTS = [
  {
    icon: Code2,
    heading: "Full-stack engineer",
    body: "I build products end-to-end — from the database schema to the pixel-perfect UI and the CI that keeps it all green.",
  },
  {
    icon: Cpu,
    heading: "AI systems architect",
    body: "Specialising in multi-agent orchestration: one-agent-one-task delegation models that keep long instructions from losing context.",
  },
  {
    icon: Zap,
    heading: "Shipped things",
    body: "linkyy.online, metric-plus, Woxy — products I designed, built, and launched solo or in tiny teams.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-[#0e101a] text-bone py-28 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="node-rule text-signal text-xs font-mono uppercase tracking-[0.2em] mb-4 max-w-xs">
            <AnimatedIcon icon={User} size={14} variant="pulse" />
            <span>About</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium max-w-2xl text-balance">
            I turn complex requirements into clean, working software.
          </h2>
          <p className="mt-6 max-w-2xl text-mist text-lg leading-relaxed">
            My name is Aman Kumar Singh. I&apos;m an engineer and builder who works
            at the intersection of product interfaces and the agentic backends
            that power them. I&apos;ve spent the last few years shipping web products
            — from link management tools to analytics dashboards to transparent
            request-defense infrastructure — and increasingly, wiring those
            products to AI orchestration layers that make them faster and more
            capable.
          </p>
          <p className="mt-4 max-w-2xl text-mist leading-relaxed">
            I care about code that&apos;s legible, interfaces that are fast, and
            systems that degrade gracefully. I work best in small teams with
            clear problem statements and the freedom to own the solution.
          </p>
        </ScrollReveal>

        {/* Three highlight cards */}
        <div className="mt-14 grid sm:grid-cols-3 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <ScrollReveal key={h.heading} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-panel/60 p-6 h-full">
                <AnimatedIcon icon={h.icon} size={20} variant="float" colorClass="text-signal" />
                <div className="mt-4 font-display font-medium text-bone">{h.heading}</div>
                <p className="mt-2 text-sm text-mist leading-relaxed">{h.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Skills grid */}
        <ScrollReveal className="mt-16">
          <div className="node-rule text-mist/60 text-xs font-mono uppercase tracking-[0.2em] mb-6 max-w-xs">
            <span>Stack &amp; tools</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SKILLS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-panel/30 px-4 py-3 hover:border-signal/40 transition-colors group"
              >
                <div className="font-medium text-sm text-bone group-hover:text-signal transition-colors">
                  {s.label}
                </div>
                <div className="text-xs text-mist/70 mt-0.5">{s.note}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
