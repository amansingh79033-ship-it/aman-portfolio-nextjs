"use client";

import { useEffect, useRef, useState } from "react";

export default function TypewriterName({
  text = "Aman Kumar Singh",
  className = "",
  loop = false,
  speed = 55,
}: {
  text?: string;
  className?: string;
  loop?: boolean;
  speed?: number;
}) {
  const [shown, setShown] = useState("");
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion.current) {
      setShown(text);
      return;
    }

    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      i++;
      setShown(text.slice(0, i));
      if (i < text.length) {
        timeout = setTimeout(tick, speed);
      } else if (loop) {
        timeout = setTimeout(() => {
          i = 0;
          setShown("");
          tick();
        }, 2200);
      }
    };
    timeout = setTimeout(tick, speed);

    return () => clearTimeout(timeout);
  }, [text, loop, speed]);

  return (
    <span className={`font-mono tracking-tight ${className}`}>
      {shown}
      <span className="inline-block w-[0.5ch] animate-pulse text-signal">
        |
      </span>
    </span>
  );
}
