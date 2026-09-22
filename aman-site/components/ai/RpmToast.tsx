"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Activity } from "lucide-react";
import { subscribeRpm, type RpmStatus } from "@/lib/rpmBus";

/**
 * A mini, non-blocking banner that surfaces once the collective Gemini RPM
 * budget (shared across every configured key) crosses the alert threshold.
 * The tone is intentionally warm: it tells the visitor to ease off before the
 * pool actually hard-limits, instead of failing requests silently.
 */
export default function RpmToast() {
  const [status, setStatus] = useState<RpmStatus | null>(null);
  const [visible, setVisible] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return subscribeRpm((s) => {
      setStatus(s);
      if (s.percentUsed >= s.alertAtPercent) {
        setVisible(true);
        if (dismissTimer.current) clearTimeout(dismissTimer.current);
        // Keep it up a little longer the hotter the pool runs.
        dismissTimer.current = setTimeout(() => setVisible(false), 9000);
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  const show = visible && status !== null;
  const pct = status?.percentUsed ?? 0;
  const overHeat = pct >= 100;

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-50 max-w-[min(92vw,340px)]">
      <AnimatePresence>
        {show && status && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="rounded-2xl border border-warn/40 bg-[#0a0c14]/95 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-3.5"
          >
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-warn/15 text-warn flex items-center justify-center">
                <Wind size={15} className={overHeat ? "animate-pulse" : ""} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-mono font-semibold text-warn leading-tight">
                  Slow down, champ — you&apos;re almost there. Take a breath!
                </p>
                <p className="text-[11px] font-mono text-mist/80 mt-1 leading-snug">
                  Shared Gemini RPM is at{" "}
                  <span className="text-bone font-semibold">{pct}%</span> across{" "}
                  {status.activeKeys} key{status.activeKeys === 1 ? "" : "s"}
                  {status.coolingKeys > 0 && (
                    <>
                      {" "}
                      · {status.coolingKeys} cooling
                    </>
                  )}
                  . Requests still roll onto a free key automatically.
                </p>

                {/* usage meter */}
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: overHeat ? "#ff8a3d" : "#ffb066" }}
                    initial={false}
                    animate={{ width: `${Math.min(100, pct)}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  />
                </div>
                <div className="mt-1 flex items-center gap-1 text-[9px] font-mono text-mist/50">
                  <Activity size={9} />
                  <span>
                    {status.used}/{status.capacity} req/min budget · alert @ {status.alertAtPercent}%
                  </span>
                </div>
              </div>

              <button
                onClick={() => setVisible(false)}
                className="shrink-0 text-mist/60 hover:text-bone text-[13px] leading-none px-1"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
