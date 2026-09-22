"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { voiceEngine, SpeechState } from "@/lib/voiceEngine";

export type AvatarState = "idle" | "thinking" | "speaking" | "listening";

interface AmanAvatarProps {
  state?: AvatarState;
  size?: "sm" | "md" | "lg" | number;
  className?: string;
  showBadge?: boolean;
}

export default function AmanAvatar({
  state: externalState,
  size = "md",
  className = "",
  showBadge = false,
}: AmanAvatarProps) {
  const [speechState, setSpeechState] = useState<SpeechState>("idle");
  const [amplitude, setAmplitude] = useState<number>(0);

  useEffect(() => {
    const unsubSpeech = voiceEngine.subscribe((s) => {
      setSpeechState(s);
    });
    const unsubVisualizer = voiceEngine.subscribeVisualizer((amp) => {
      setAmplitude(amp);
    });
    return () => {
      unsubSpeech();
      unsubVisualizer();
    };
  }, []);

  // Determine active avatar state
  let effectiveState: AvatarState = externalState || "idle";
  if (!externalState) {
    if (speechState === "speaking") effectiveState = "speaking";
    else if (speechState === "paused") effectiveState = "idle";
  }

  const dimension =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 34
      : size === "lg"
      ? 68
      : 46;

  const getStatusColor = () => {
    switch (effectiveState) {
      case "thinking":
        return "#ff8a3d"; // warn / thinking pulse
      case "speaking":
        return "#5eead4"; // signal / audio out
      case "listening":
        return "#8b7cf6"; // agent / active listen
      case "idle":
      default:
        return "#5eead4";
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      {/* Outer Halo Glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-md opacity-40 pointer-events-none"
        animate={{
          scale:
            effectiveState === "speaking"
              ? 1.2 + amplitude * 0.4
              : effectiveState === "thinking"
              ? [1, 1.25, 1]
              : [1, 1.08, 1],
          opacity:
            effectiveState === "speaking"
              ? 0.5 + amplitude * 0.4
              : effectiveState === "thinking"
              ? [0.4, 0.8, 0.4]
              : 0.35,
        }}
        transition={{
          repeat: Infinity,
          duration: effectiveState === "thinking" ? 0.8 : 2.5,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle, ${getStatusColor()} 0%, transparent 70%)`,
        }}
      />

      {/* Cybernetic Rotating Orbital Ring */}
      <motion.div
        className="absolute inset-[-4px] rounded-full border border-dashed pointer-events-none"
        style={{
          borderColor:
            effectiveState === "speaking"
              ? "rgba(94, 234, 212, 0.4)"
              : effectiveState === "thinking"
              ? "rgba(255, 138, 61, 0.5)"
              : "rgba(139, 124, 246, 0.25)",
        }}
        animate={{
          rotate: effectiveState === "thinking" ? 360 : 360,
        }}
        transition={{
          repeat: Infinity,
          duration: effectiveState === "thinking" ? 3 : 18,
          ease: "linear",
        }}
      />

      {/* Core Cyber Avatar SVG */}
      <svg
        viewBox="0 0 100 100"
        width={dimension}
        height={dimension}
        className="relative z-10 drop-shadow-sm"
      >
        <defs>
          <linearGradient id="cyberMeshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="50%" stopColor="#8b7cf6" />
            <stop offset="100%" stopColor="#0a0b10" />
          </linearGradient>

          <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Head Shell Outer Frame */}
        <path
          d="M 50,10 C 26,10 20,32 20,54 C 20,76 34,90 50,90 C 66,90 80,76 80,54 C 80,32 74,10 50,10 Z"
          fill="#12141c"
          stroke="#181b26"
          strokeWidth="2.5"
        />

        {/* Cyber Forehead Visor Plate */}
        <path
          d="M 32,24 Q 50,20 68,24 L 72,34 Q 50,30 28,34 Z"
          fill="url(#cyberMeshGrad)"
          opacity="0.85"
        />

        {/* Neural Circuit Trace Lines */}
        <path
          d="M 50,24 L 50,42 M 35,32 L 42,42 M 65,32 L 58,42"
          stroke="#5eead4"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Cyber Visor / Optical Bar */}
        <rect
          x="28"
          y="42"
          width="44"
          height="12"
          rx="6"
          fill="#0a0b10"
          stroke={getStatusColor()}
          strokeWidth="1.5"
        />

        {/* Optical Sensor Pupils / Wave bars */}
        {effectiveState === "speaking" ? (
          <g>
            {/* Dynamic Soundwave mouth / visor */}
            <motion.rect
              x="36"
              y="46"
              width="4"
              height={4 + amplitude * 4}
              rx="2"
              fill="#5eead4"
            />
            <motion.rect
              x="44"
              y="45"
              width="4"
              height={6 + amplitude * 5}
              rx="2"
              fill="#5eead4"
            />
            <motion.rect
              x="52"
              y="45"
              width="4"
              height={6 + amplitude * 5}
              rx="2"
              fill="#5eead4"
            />
            <motion.rect
              x="60"
              y="46"
              width="4"
              height={4 + amplitude * 4}
              rx="2"
              fill="#5eead4"
            />
          </g>
        ) : effectiveState === "thinking" ? (
          <g>
            <motion.circle
              cx="42"
              cy="48"
              r="2.5"
              fill="#ff8a3d"
              animate={{ opacity: [0.3, 1, 0.3], x: [-1, 2, -1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            />
            <motion.circle
              cx="58"
              cy="48"
              r="2.5"
              fill="#ff8a3d"
              animate={{ opacity: [1, 0.3, 1], x: [1, -2, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
            />
          </g>
        ) : (
          <g>
            {/* Steady Calibrated Cyber Optic Sensors */}
            <circle cx="40" cy="48" r="3" fill="#5eead4" />
            <circle cx="60" cy="48" r="3" fill="#5eead4" />
            <circle cx="41" cy="47" r="1" fill="#ffffff" />
            <circle cx="61" cy="47" r="1" fill="#ffffff" />
          </g>
        )}

        {/* Jaw / Acoustic Speaker Grille */}
        <g opacity="0.7">
          <line x1="42" y1="68" x2="58" y2="68" stroke="#8891a7" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="45" y1="72" x2="55" y2="72" stroke="#8891a7" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="48" y1="76" x2="52" y2="76" stroke="#8891a7" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Tech Monogram Badge */}
        <text
          x="50"
          y="84"
          textAnchor="middle"
          fill="#5eead4"
          fontFamily="monospace"
          fontSize="5.5"
          fontWeight="700"
          letterSpacing="0.8"
        >
          VA•SRE
        </text>
      </svg>

      {/* Online Status Dot Indicator */}
      {showBadge && (
        <span className="absolute bottom-0 right-0 flex h-2.5 w-2.5 z-20">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: getStatusColor() }}
          />
          <span
            className="relative inline-flex rounded-full h-2.5 w-2.5 border border-panel"
            style={{ backgroundColor: getStatusColor() }}
          />
        </span>
      )}
    </div>
  );
}
