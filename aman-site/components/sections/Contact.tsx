"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedIcon from "@/components/AnimatedIcon";
import {
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  Globe,
} from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const email = "singh.aman.dev99@gmail.com";

  const handleCopy = () => {
    navigator.clipboard?.writeText(email).catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 250);
  };

  return (
    <section id="contact" className="relative bg-[#090a0f] text-bone py-28 md:py-36 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="node-rule text-signal text-xs font-mono uppercase tracking-[0.2em] mb-4 max-w-xs">
            <AnimatedIcon icon={Mail} size={14} variant="pulse" />
            <span>Initiate handshake</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium max-w-xl text-balance">
                Let&apos;s build something ambitious together.
              </h2>
              <p className="mt-4 text-mist max-w-lg text-base leading-relaxed">
                Whether you need a full-stack product engineered from scratch, an AI agent delegation architecture, or a high-performance web interface.
              </p>
            </div>

            <div className="flex max-w-full items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono self-stretch sm:self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="min-w-0">Available for new contracts &amp; roles</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Direct channels */}
          <ScrollReveal delay={0.1} className="md:col-span-2 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Copy Email Box */}
              <div className="rounded-2xl border border-white/10 bg-panel/60 p-5 sm:p-6">
                <span className="text-xs font-mono text-mist uppercase tracking-wider">
                  Direct Inbox
                </span>
                <div className="mt-2 text-sm sm:text-base font-mono text-bone break-all">
                  {email}
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-mist hover:text-bone hover:border-signal/40 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied to clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy address</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-signal text-ink text-xs font-mono font-medium hover:bg-bone transition-colors"
                  >
                    <Mail size={13} />
                    <span>Open Mail</span>
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="rounded-2xl border border-white/10 bg-panel/60 p-5 sm:p-6 space-y-3">
                <span className="text-xs font-mono text-mist uppercase tracking-wider">
                  Developer Profiles
                </span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://github.com/amankumarsingh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-xs font-mono text-bone group"
                  >
                    <div className="flex items-center gap-2">
                      <Github size={15} />
                      <span>GitHub</span>
                    </div>
                    <ArrowUpRight size={13} className="opacity-50 group-hover:opacity-100 group-hover:text-signal" />
                  </a>

                  <a
                    href="https://linkedin.com/in/aman-kumar-singh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-xs font-mono text-bone group"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin size={15} />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowUpRight size={13} className="opacity-50 group-hover:opacity-100 group-hover:text-signal" />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-mist/60 pt-4">
              Response time: usually within 4–12 hours.
            </div>
          </ScrollReveal>

          {/* Interactive Message Form */}
          <ScrollReveal delay={0.2} className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-panel/70 p-6 sm:p-8 space-y-4 relative"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs font-mono text-signal uppercase tracking-wider">
                <MessageSquare size={14} />
                <span>Send Quick Dispatch</span>
              </div>

              <div>
                <label className="block text-xs font-mono text-mist mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-bone placeholder:text-mist/40 text-sm focus:outline-none focus:border-signal transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-mist mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-bone placeholder:text-mist/40 text-sm focus:outline-none focus:border-signal transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-mist mb-1.5">
                  Project or Opportunity Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me what you're building, target timeline, or what you need help with..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-bone placeholder:text-mist/40 text-sm focus:outline-none focus:border-signal transition-colors resize-none font-mono"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl bg-signal text-ink font-medium text-sm hover:bg-bone transition-colors disabled:opacity-50"
                >
                  {sending ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={14} />
                    </>
                  )}
                </button>

                {sent && (
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <Check size={14} />
                    <span>Email draft opened — send it to complete delivery.</span>
                  </div>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
