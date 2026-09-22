"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Printer,
  ExternalLink,
  CheckCircle2,
  Building2,
  Cpu,
  ShieldCheck,
  Code2,
  Terminal,
  Sparkles,
  Layers,
  Award,
  ChevronRight,
  Globe,
  Mail,
  Linkedin,
  MapPin,
  Flame,
} from "lucide-react";
import { cvData } from "@/lib/cvData";

type TabKey = "summary" | "sre" | "ventures" | "projects" | "skills";

export default function DocumentsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("summary");

  const handleDownloadDocx = () => {
    const link = document.createElement("a");
    link.href = "/docs/Aman_Kumar_Singh_UT_CV.docx";
    link.download = "Aman_Kumar_Singh_UT_CV.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <section
      id="documents"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-signal/10 via-agent/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-signal/10 border border-signal/25 text-signal text-xs font-mono uppercase tracking-wider mb-4">
              <FileText size={13} />
              <span>Verified Documents &amp; Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-bone tracking-tight">
              Executive CV &amp; Career Dossier
            </h2>
            <p className="mt-3 text-mist max-w-2xl text-sm sm:text-base leading-relaxed">
              Explore Aman&apos;s verified production trajectory across Wandrian SRE, serial entrepreneurial ventures, and security evaluations. Preview interactively or export in your format of choice.
            </p>
          </div>

          {/* Choice-based Export Toggle */}
          <div className="flex flex-wrap items-center gap-3 p-1.5 rounded-2xl bg-panel2 border border-white/10 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={handleDownloadDocx}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-signal text-ink font-mono text-xs font-semibold hover:bg-bone transition-all shadow-[0_4px_16px_rgba(94,234,212,0.25)]"
              title="Download original DOCX"
            >
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
              <span>Download .DOCX</span>
            </button>

            <button
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-bone font-mono text-xs font-medium transition-all"
              title="Print or Save as Executive PDF"
            >
              <Printer size={14} className="text-signal" />
              <span>Export / Print PDF</span>
            </button>
          </div>
        </div>

        {/* In-Browser Interactive CV Viewer Card */}
        <div className="rounded-2xl border border-white/10 bg-panel/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Document Header Bar */}
          <div className="px-6 py-4 border-b border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-signal/15 border border-signal/30 flex items-center justify-center text-signal">
                <FileText size={18} />
              </div>
              <div>
                <div className="text-sm font-mono font-bold text-bone flex items-center gap-2">
                  <span>Aman_Kumar_Singh_UT_CV.docx</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    Verified Source
                  </span>
                </div>
                <div className="text-xs font-mono text-mist/70">
                  Site Reliability Engineer &bull; DevOps Lead &bull; Founder &amp; Systems Architect
                </div>
              </div>
            </div>

            {/* Quick Contact Micro-bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-mist">
              <a
                href="mailto:asingh@wandrian.com"
                className="hover:text-signal transition-colors flex items-center gap-1.5"
              >
                <Mail size={12} className="text-signal" />
                <span>asingh@wandrian.com</span>
              </a>
              <span className="text-white/20">&bull;</span>
              <a
                href={cvData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-signal transition-colors flex items-center gap-1.5"
              >
                <Linkedin size={12} className="text-signal" />
                <span>LinkedIn</span>
              </a>
              <span className="text-white/20">&bull;</span>
              <span className="flex items-center gap-1.5 text-mist/80">
                <MapPin size={12} className="text-signal" />
                <span>Bengaluru, India</span>
              </span>
            </div>
          </div>

          {/* Executive Tabs Navigation */}
          <div className="flex border-b border-white/10 bg-black/20 overflow-x-auto no-scrollbar">
            {[
              { key: "summary", label: "Executive Summary", icon: Sparkles },
              { key: "sre", label: "Wandrian SRE Impact", icon: Cpu },
              { key: "ventures", label: "Founding Ventures", icon: Building2 },
              { key: "projects", label: "Key Projects & VAPT", icon: ShieldCheck },
              { key: "skills", label: "Technical Matrix", icon: Terminal },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as TabKey)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-xs font-mono font-medium whitespace-nowrap transition-all border-b-2 ${
                    isActive
                      ? "border-signal text-signal bg-signal/5"
                      : "border-transparent text-mist hover:text-bone hover:bg-white/[0.02]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-signal" : "text-mist"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 sm:p-8 min-h-[440px]">
            {/* TAB 1: EXECUTIVE SUMMARY */}
            {activeTab === "summary" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-signal mb-2 flex items-center gap-2">
                    <Sparkles size={13} />
                    <span>Professional Overview</span>
                  </h3>
                  <p className="text-sm sm:text-base text-bone/90 leading-relaxed font-sans font-normal border-l-2 border-signal/40 pl-4 py-1">
                    {cvData.summary}
                  </p>
                </div>

                {/* Core Competencies Pills */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-mist mb-3 flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-signal" />
                    <span>Core Competencies &amp; Execution Domains</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cvData.coreCompetencies.map((comp, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-bone hover:border-signal/40 hover:text-signal transition-colors"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages & Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="p-4 rounded-xl bg-panel2/60 border border-white/5">
                    <div className="text-xs font-mono text-mist uppercase tracking-wider mb-2">
                      Spoken Languages
                    </div>
                    <div className="space-y-1.5 text-xs font-mono">
                      {cvData.languages.map((l, i) => (
                        <div key={i} className="flex justify-between text-bone">
                          <span>{l.language}:</span>
                          <span className="text-signal">{l.proficiency}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-panel2/60 border border-white/5">
                    <div className="text-xs font-mono text-mist uppercase tracking-wider mb-2">
                      Dual Track Highlight
                    </div>
                    <p className="text-xs text-bone/80 leading-relaxed font-sans">
                      Operates with deep production responsibility at Wandrian while spearheading applied AI product architectures across Q-Re-Us Minds and Vitran AI.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: WANDRIAN SRE EXPERIENCE */}
            {activeTab === "sre" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {cvData.experience.map((exp, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                      <div>
                        <div className="text-lg font-display font-bold text-bone">
                          {exp.role}
                        </div>
                        <div className="text-xs font-mono text-signal flex items-center gap-2 mt-0.5">
                          <span>{exp.company}</span>
                          <span>&bull;</span>
                          <span className="text-mist">{exp.location}</span>
                          <span>&bull;</span>
                          <span className="text-mist">{exp.period}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-signal/15 text-signal text-[11px] font-mono border border-signal/30 self-start sm:self-auto">
                        Global Booking Infrastructure
                      </span>
                    </div>

                    {exp.platform && (
                      <div className="p-3 rounded-xl bg-panel2 border border-white/5 text-xs font-mono text-bone/90 flex items-center gap-2">
                        <Globe size={14} className="text-signal shrink-0" />
                        <span><strong>Scope:</strong> {exp.platform}</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-bone/80 font-sans leading-relaxed">
                          <ChevronRight size={14} className="text-signal shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {exp.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] font-mono text-mist border border-white/5"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 3: ENTREPRENEURIAL VENTURES */}
            {activeTab === "ventures" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {cvData.ventures.map((v, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-panel2/70 border border-white/5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-display font-bold text-bone">
                            {v.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-agent/15 text-agent text-[10px] font-mono border border-agent/30">
                            {v.role}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-mist mt-0.5">
                          {v.location} &bull; {v.period}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-signal/90 font-mono italic">
                      &ldquo;{v.tagline}&rdquo;
                    </p>

                    {/* Products Grid if applicable */}
                    {v.products && v.products.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        {v.products.map((prod, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1.5"
                          >
                            <div className="text-xs font-mono font-bold text-bone flex items-center justify-between">
                              <span>{prod.name}</span>
                              <span className="text-[10px] font-normal text-mist">Shipped</span>
                            </div>
                            <p className="text-xs text-mist/90 leading-relaxed font-sans">
                              {prod.description}
                            </p>
                            {prod.tech && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {prod.tech.map((tc, tcIdx) => (
                                  <span
                                    key={tcIdx}
                                    className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono text-signal"
                                  >
                                    {tc}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bullets */}
                    <div className="space-y-2 pt-1">
                      {v.bullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5 text-xs text-bone/80 font-sans">
                          <ChevronRight size={13} className="text-agent shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 4: KEY PROJECTS & SECURITY VAPT */}
            {activeTab === "projects" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {cvData.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-panel2/60 border border-white/5 hover:border-signal/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-display font-bold text-bone">
                          {proj.title}
                        </h4>
                        <span className="text-[10px] font-mono text-signal px-2 py-0.5 rounded bg-signal/10 border border-signal/20">
                          {proj.tags[0]}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-mist mb-3">
                        {proj.subtitle}
                      </div>
                      <p className="text-xs text-bone/80 font-sans leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-1.5 border-t border-white/5 mt-4">
                      {proj.tags.map((tg, tgIdx) => (
                        <span
                          key={tgIdx}
                          className="px-2 py-0.5 rounded bg-white/[0.03] text-[10px] font-mono text-mist"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 5: TECHNICAL SKILLS MATRIX */}
            {activeTab === "skills" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cvData.skills.map((skillGroup, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-panel2/60 border border-white/5 space-y-2.5"
                    >
                      <div className="text-xs font-mono uppercase tracking-wider text-signal font-bold flex items-center gap-2">
                        <Terminal size={12} />
                        <span>{skillGroup.category}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {skillGroup.items.map((item, iIdx) => (
                          <span
                            key={iIdx}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-mono text-bone hover:border-signal/30 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Callout */}
          <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-mist">
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-signal" />
              <span>
                Want to interview Aman on these points? Try asking <strong className="text-bone font-mono">Ask V.Aman</strong> (bottom right).
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadDocx}
                className="hover:text-signal transition-colors underline flex items-center gap-1"
              >
                <span>Direct .DOCX</span>
                <ExternalLink size={11} />
              </button>
              <span>&bull;</span>
              <button
                onClick={handlePrintPdf}
                className="hover:text-signal transition-colors underline flex items-center gap-1"
              >
                <span>Executive PDF</span>
                <ExternalLink size={11} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
