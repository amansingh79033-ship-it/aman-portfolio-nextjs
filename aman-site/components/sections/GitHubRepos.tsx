"use client";

import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import { Github, LockKeyhole, ArrowUpRight, Globe2 } from "lucide-react";

const GITHUB_PROFILE = "https://github.com/amansingh79033-ship-it";

const FEATURED_REPOSITORIES = [
  { name: "fullstack-critic", description: "A senior full-stack engineering critic for Claude Code, Gemini CLI, QoderCLI, Antigravity, and IDE workflows.", language: "Shell" },
  { name: "tarkiq7-aws-agent-control-plane", description: "A safety-first AWS agent control plane with planning, policy, replica execution, approval, and verification workflows.", language: "Python" },
  { name: "tarkiq7", description: "A Rust and Kubernetes personal-cloud platform spanning compute, databases, storage, networking, observability, authentication, and backups.", language: "Public repository" },
  { name: "linkyy", description: "Public source repository for the Linkyy project.", language: "TypeScript" },
  { name: "OWatch", description: "CloudWatch Insight Dashboard.", language: "TypeScript" },
  { name: "zawake", description: "A public TypeScript repository for cloud-infrastructure optimization work.", language: "TypeScript" },
];

export default function GitHubRepos() {
  return (
    <section id="github" className="relative bg-[#0b0d15] text-bone py-28 md:py-36 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="node-rule text-signal text-xs font-mono uppercase tracking-[0.2em] mb-4 max-w-xs">
            <AnimatedIcon icon={Github} size={14} variant="float" />
            <span>Open-source footprint</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium max-w-2xl text-balance">
            Public code where it can be shared. Private work where it should remain protected.
          </h2>
          <p className="mt-4 max-w-2xl text-mist leading-relaxed">
            A curated selection from 19 public repositories is listed below. Private client and experimental repositories are described only at an approved, non-sensitive level.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_REPOSITORIES.map((repo, index) => (
            <ScrollReveal key={repo.name} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-white/10 bg-panel/60 p-6 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-signal">PUBLIC REPOSITORY</span>
                  <Github size={17} className="text-mist/60" />
                </div>
                <h3 className="mt-4 font-display text-xl font-medium break-words">{repo.name}</h3>
                <p className="mt-2 text-sm text-mist leading-relaxed flex-1">{repo.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-mist/70">{repo.language}</span>
                  <a href={`${GITHUB_PROFILE}/${repo.name}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-signal hover:text-bone transition-colors">
                    Open repo <ArrowUpRight size={13} />
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.08}>
            <article className="h-full rounded-2xl border border-white/10 bg-panel/60 p-6 flex flex-col">
              <AnimatedIcon icon={Globe2} size={20} colorClass="text-signal" variant="pulse" />
              <h3 className="mt-4 font-display text-xl font-medium">All public repositories</h3>
              <p className="mt-2 text-sm text-mist leading-relaxed flex-1">
                Browse the full, current public repository inventory directly on GitHub.
              </p>
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-signal hover:text-bone transition-colors"
              >
                View GitHub profile <ArrowUpRight size={15} />
              </a>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <article className="h-full rounded-2xl border border-white/10 bg-panel/60 p-6 flex flex-col">
              <AnimatedIcon icon={LockKeyhole} size={20} colorClass="text-agent" variant="float" />
              <h3 className="mt-4 font-display text-xl font-medium">Private repositories</h3>
              <p className="mt-2 text-sm text-mist leading-relaxed flex-1">
                Private repositories are not fetched, listed, or exposed here. For a relevant conversation, Aman can share an approved architecture summary, demo, or access-controlled code sample.
              </p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm text-agent hover:text-bone transition-colors">
                Request an approved walkthrough <ArrowUpRight size={15} />
              </a>
            </article>
          </ScrollReveal>
        </div>

        <p className="mt-5 text-xs font-mono text-mist/60">
          Public inventory checked via GitHub&apos;s public API on this update. Private GitHub data requires explicit authenticated authorization and is never inferred.
        </p>
      </div>
    </section>
  );
}
