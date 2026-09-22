"use client";

import { LucideIcon } from "lucide-react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Wraps any lucide-react icon with a small idle + hover motion so
 * icons read as alive rather than static glyphs — used everywhere
 * an emoji would otherwise have been used (status markers, feature
 * bullets, nav affordances, etc).
 */
export default function AnimatedIcon({
  icon: Icon,
  size = 20,
  className = "",
  variant = "float",
  colorClass = "text-signal",
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
  variant?: "float" | "spin" | "pulse" | "draw";
  colorClass?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    if (!ref.current) return;
    if (variant === "spin") {
      gsap.to(ref.current, { rotate: 180, duration: 0.5, ease: "power3.out" });
    } else if (variant === "pulse") {
      gsap.fromTo(
        ref.current,
        { scale: 1 },
        { scale: 1.25, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    } else {
      gsap.to(ref.current, { y: -3, duration: 0.3, ease: "power2.out" });
    }
  };

  const onLeave = () => {
    if (!ref.current) return;
    if (variant === "spin") {
      gsap.to(ref.current, { rotate: 0, duration: 0.4, ease: "power3.inOut" });
    } else {
      gsap.to(ref.current, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <span
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`inline-flex items-center justify-center ${colorClass} ${className} ${
        variant === "draw" ? "animate-[dash_1.6s_ease-in-out_infinite]" : ""
      }`}
    >
      <Icon size={size} strokeWidth={1.75} />
    </span>
  );
}
