"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Animated ellipse-shaped profile mark.
 * NOTE: no photo was supplied — this renders an animated gradient
 * ellipse with initials as a stand-in. Swap the <image> href below
 * for a real photo (e.g. /profile.jpg) to drop it in directly; the
 * clip-path ellipse mask will keep the same shape.
 */
export default function ProfileAvatar({
  size = 40,
  className = "",
  photoSrc,
}: {
  size?: number;
  className?: string;
  photoSrc?: string;
}) {
  const pathRef = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const tween = gsap.to(pathRef.current, {
      attr: { rx: 19, ry: 21 },
      duration: 2.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" width={size} height={size}>
        <defs>
          <linearGradient id="avatarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#8b7cf6" />
          </linearGradient>
          <clipPath id="avatarClip">
            <ellipse ref={pathRef} cx="20" cy="20" rx="20" ry="20" />
          </clipPath>
        </defs>
        <ellipse cx="20" cy="20" rx="20" ry="20" fill="url(#avatarGrad)" />
        {photoSrc && (
          <image
            href={photoSrc}
            x="0"
            y="0"
            width="40"
            height="40"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#avatarClip)"
          />
        )}
        {!photoSrc && (
          <text
            x="50%"
            y="53%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="var(--font-mono)"
            fontSize="14"
            fill="#0a0b10"
            fontWeight={600}
          >
            AS
          </text>
        )}
      </svg>
    </div>
  );
}
