"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  User,
  ArrowRight,
  Maximize2,
  Minimize2,
  RefreshCw,
  Zap,
  Volume2,
  Square,
  FileText,
  Sliders,
  CheckCircle2,
  Radio,
} from "lucide-react";
import AmanAvatar, { AvatarState } from "./AmanAvatar";
import {
  voiceEngine,
  VoicePersona,
  VOICE_PERSONAS,
  SpeechState,
} from "@/lib/voiceEngine";
import { reportRpm } from "@/lib/rpmBus";

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
  action?: string | null;
  source?: string;
  isStar?: boolean;
};

const EXECUTIVE_PROMPTS = [
  "Why hire Aman as an SRE/DevOps lead?",
  "Walk me through an incident response using STAR",
  "How do I preview & download Aman's CV (DOCX/PDF)?",
  "Explain the Vitran AI Vehicle-as-a-Compute platform",
  "What is Aman's production tech stack & availability?",
];

export default function AmanAICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Voice controls
  const [activePersona, setActivePersona] = useState<VoicePersona>("aman");
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [speechState, setSpeechState] = useState<SpeechState>("idle");
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      text: "Greetings. I am **Ask V.Aman** — the Executive AI Copilot representing Aman Kumar Singh for recruiters, engineering leaders, and founders.\n\nI can evaluate Aman's technical fit, walk through production incidents using the **S.T.A.R.** methodology, explain system architectures, or preview his CV in DOCX and PDF.",
      isStar: false,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Subscribe to speech state
  useEffect(() => {
    const unsub = voiceEngine.subscribe((state) => {
      setSpeechState(state);
      if (state === "idle") {
        setSpeakingMessageId(null);
      }
    });
    return () => {
      unsub();
      voiceEngine.stop();
    };
  }, []);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const handleSend = async (userText?: string) => {
    const query = (userText || input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          persona: activePersona,
          history: messages.slice(-6).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!res.ok) throw new Error("API dispatch failed");
      const data = await res.json();
      reportRpm(data.rpm);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        text: data.reply || "Aman Copilot dispatch acknowledged.",
        action: data.suggestedAction,
        source: data.source,
        isStar: data.isStar,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          text: "Executive Neural Engine fallback engaged. Feel free to ask about Aman's SRE incident track record, Wandrian experience, or CV preview!",
          isStar: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceToggle = (msgId: string, text: string) => {
    if (speakingMessageId === msgId && speechState === "speaking") {
      voiceEngine.stop();
      setSpeakingMessageId(null);
    } else {
      setSpeakingMessageId(msgId);
      voiceEngine.speak(text, activePersona, playbackSpeed);
    }
  };

  const executeAction = (actionPath: string) => {
    if (actionPath.startsWith("/")) {
      window.location.href = actionPath;
    } else {
      const el = document.querySelector(actionPath);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

  // Determine current avatar state for the modal header
  const getAvatarState = (): AvatarState => {
    if (loading) return "thinking";
    if (speechState === "speaking") return "speaking";
    return "idle";
  };

  return (
    <>
      {/* Floating Executive Copilot Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0a0c14]/95 border border-signal/40 text-bone shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-signal transition-all"
        >
          <AmanAvatar size={34} state={speechState === "speaking" ? "speaking" : "idle"} showBadge />

          <div className="flex flex-col text-left">
            <span className="text-xs font-mono font-semibold text-bone group-hover:text-signal transition-colors flex items-center gap-1.5">
              <span>Ask V.Aman</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-signal/10 text-signal border border-signal/25">
                Executive Copilot
              </span>
            </span>
            <span className="text-[10px] font-mono text-mist/70 flex items-center gap-1">
              <span>Voice &amp; STAR active</span>
              <span>•</span>
              <kbd className="text-bone font-bold">⌘K</kbd>
            </span>
          </div>
        </motion.button>
      </div>

      {/* Cybernetic Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={`fixed z-50 flex flex-col bg-[#07090e]/95 border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden transition-all duration-300 ${
              isExpanded
                ? "bottom-4 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[620px] h-[calc(100svh-2rem)] max-h-[840px]"
                : "bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[480px] h-[580px] max-h-[calc(100svh-6rem)]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-panel/80">
              <div className="flex items-center gap-3">
                <AmanAvatar size={38} state={getAvatarState()} showBadge />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-bone">
                      Ask V.Aman
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-signal/10 text-signal border border-signal/20">
                      <Radio size={9} className="animate-pulse text-signal" />
                      Executive Twin
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-mist/60 flex items-center gap-1.5">
                    <span>SRE &bull; Full-Stack &bull; STAR Evaluation</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Voice Settings Toggle */}
                <button
                  onClick={() => setShowVoiceSettings((v) => !v)}
                  className={`p-1.5 rounded-lg transition-colors text-mist hover:text-bone hover:bg-white/5 ${
                    showVoiceSettings ? "text-signal bg-signal/10" : ""
                  }`}
                  title="Voice & Cadence Settings"
                >
                  <Sliders size={15} />
                </button>
                <button
                  onClick={() => setIsExpanded((v) => !v)}
                  className="p-1.5 rounded-lg text-mist hover:text-bone hover:bg-white/5 transition-colors hidden sm:block"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                </button>
                <button
                  onClick={() => {
                    voiceEngine.stop();
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-lg text-mist hover:text-bone hover:bg-white/5 transition-colors"
                  title="Close"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Voice Settings Drawer */}
            <AnimatePresence>
              {showVoiceSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-2.5 bg-black/40 border-b border-white/10 text-xs font-mono overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-mist flex items-center gap-1.5">
                      <Volume2 size={13} className="text-signal" />
                      Voice Audio Cadence
                    </span>
                    {speechState === "speaking" && (
                      <button
                        onClick={() => voiceEngine.stop()}
                        className="text-[10px] text-warn hover:underline flex items-center gap-1"
                      >
                        <Square size={10} /> Stop audio
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mb-2">
                    {(Object.keys(VOICE_PERSONAS) as VoicePersona[]).map((p) => {
                      const opt = VOICE_PERSONAS[p];
                      const isSelected = activePersona === p;
                      return (
                        <button
                          key={p}
                          onClick={() => {
                            setActivePersona(p);
                            if (speechState === "speaking") voiceEngine.stop();
                          }}
                          className={`px-2 py-1.5 rounded-lg border text-left transition-all ${
                            isSelected
                              ? "bg-signal/15 border-signal/40 text-signal"
                              : "bg-white/5 border-white/5 text-mist hover:text-bone hover:border-white/15"
                          }`}
                        >
                          <div className="font-semibold text-[11px] truncate">{opt.label}</div>
                          <div className="text-[9px] opacity-70 truncate">{opt.sublabel}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-mist">
                    <span>Speed Rate:</span>
                    <div className="flex gap-1.5">
                      {[1.0, 1.25, 1.5].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => setPlaybackSpeed(rate)}
                          className={`px-1.5 py-0.5 rounded ${
                            playbackSpeed === rate
                              ? "bg-signal text-ink font-bold"
                              : "bg-white/5 hover:bg-white/10 text-bone"
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="shrink-0 mt-0.5">
                      <AmanAvatar
                        size={28}
                        state={speakingMessageId === m.id && speechState === "speaking" ? "speaking" : "idle"}
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-signal text-ink font-sans font-medium"
                        : "bg-white/[0.04] border border-white/10 text-bone/90 font-sans"
                    }`}
                  >
                    {/* S.T.A.R. Method Badge */}
                    {m.role === "assistant" && m.isStar && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-agent/15 text-agent border border-agent/30 text-[10px] font-mono mb-2">
                        <CheckCircle2 size={11} />
                        <span>S.T.A.R. Formatted Response</span>
                      </div>
                    )}

                    <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>

                    {/* Bottom controls on assistant messages */}
                    {m.role === "assistant" && (
                      <div className="mt-2.5 pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                        {/* Audio playback button */}
                        <button
                          onClick={() => handleVoiceToggle(m.id, m.text)}
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono transition-all ${
                            speakingMessageId === m.id && speechState === "speaking"
                              ? "bg-warn/20 text-warn border border-warn/30 animate-pulse"
                              : "bg-white/5 hover:bg-white/10 text-mist hover:text-signal border border-white/5"
                          }`}
                          title="Speak response"
                        >
                          {speakingMessageId === m.id && speechState === "speaking" ? (
                            <>
                              <Square size={10} />
                              <span>Stop Speech</span>
                            </>
                          ) : (
                            <>
                              <Volume2 size={11} />
                              <span>Listen in Voice</span>
                            </>
                          )}
                        </button>

                        {/* Source Tag */}
                        {m.source && (
                          <span className="text-[10px] font-mono text-mist/50">
                            Source: {m.source}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Navigation Action Tag */}
                    {m.action && (
                      <button
                        onClick={() => executeAction(m.action!)}
                        className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-signal/15 hover:bg-signal/25 border border-signal/30 text-signal text-[11px] font-mono transition-colors"
                      >
                        <Zap size={12} />
                        <span>Go to {m.action}</span>
                        <ArrowRight size={11} />
                      </button>
                    )}
                  </div>

                  {m.role === "user" && (
                    <div className="shrink-0 w-6 h-6 rounded-md bg-white/10 text-bone flex items-center justify-center mt-0.5">
                      <User size={13} />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2.5 text-mist/70">
                  <div className="w-6 h-6 rounded-md bg-signal/20 text-signal flex items-center justify-center">
                    <RefreshCw size={13} className="animate-spin" />
                  </div>
                  <span className="text-[11px] font-mono animate-pulse">
                    Ask V.Aman is reasoning…
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="text-[10px] font-mono text-mist/60 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Sparkles size={11} className="text-signal" />
                  <span>Executive Prompts:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {EXECUTIVE_PROMPTS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(p)}
                      className="text-left text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-signal/30 text-mist hover:text-bone transition-all"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about SRE incidents, STAR cases, architecture, or CV..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-bone placeholder:text-mist/40 focus:outline-none focus:border-signal font-mono transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 p-2.5 rounded-xl bg-signal text-ink hover:bg-bone transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Send message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
