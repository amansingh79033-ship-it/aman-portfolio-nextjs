"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const ist = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(ist);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-ink text-mist border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-mist/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal" />
            <span className="text-bone font-medium">Aman Kumar Singh</span>
          </div>
          <span>/</span>
          <span>Bengaluru &amp; Remote</span>
          <span>/</span>
          <span className="text-signal/90">{time ? `${time} IST` : "LIVE"}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 text-mist/60">
            <span>Built with Next.js 14, GSAP &amp; Three.js</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-signal/40 text-bone hover:text-signal transition-colors bg-panel"
          >
            <span>Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
