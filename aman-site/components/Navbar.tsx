"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import ProfileAvatar from "./ProfileAvatar";
import TypewriterName from "./TypewriterName";

const LINKS = [
  { href: "/#documents", label: "CV & Documents (DOCX/PDF)", isFeatured: true },
  { href: "/research", label: "Research Lab (vitran7 & AHI)" },
  { href: "/#work", label: "Selected Work" },
  { href: "/#experience", label: "Wandrian SRE & Experience" },
  { href: "/#github", label: "GitHub" },
  { href: "/#about", label: "About" },
  { href: "/#lab", label: "AI Concepts Lab" },
  { href: "/#process", label: "Delegation Pipeline" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (!shellRef.current || !menuRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    const availableWidth = Math.max(0, window.innerWidth - 32);
    const closedWidth = Math.min(220, availableWidth);
    const expandedWidth = Math.min(320, availableWidth);
    const expandedHeight = Math.min(420, Math.max(280, window.innerHeight - 32));

    if (open) {
      tl.to(shellRef.current, { width: expandedWidth, height: expandedHeight, borderRadius: 18, duration: 0.45 })
        .to(menuRef.current, { autoAlpha: 1, duration: 0.2 }, "-=0.15")
        .fromTo(
          linkRefs.current,
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.03 },
          "-=0.1"
        );
    } else {
      tl.to(menuRef.current, { autoAlpha: 0, duration: 0.15 }).to(
        shellRef.current,
        { width: closedWidth, height: 56, borderRadius: 999, duration: 0.4 },
        "-=0.05"
      );
    }
  }, [open]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div
        ref={shellRef}
        className="w-[min(220px,calc(100vw-2rem))] h-14 overflow-hidden bg-[#0d0f16]/95 border border-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
        style={{ borderRadius: 999 }}
      >
        <div className="flex items-center justify-between h-14 px-3">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <ProfileAvatar size={32} />
            <TypewriterName
              text="Aman K. Singh"
              className="text-sm text-bone hidden sm:inline truncate"
            />
          </Link>

          <button
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] shrink-0 rounded-full hover:bg-white/5"
          >
            <span
              className="block h-[1.5px] w-4 bg-bone transition-transform duration-300"
              style={
                open
                  ? { transform: "translateY(6.5px) rotate(45deg)" }
                  : undefined
              }
            />
            <span
              className="block h-[1.5px] w-4 bg-bone transition-opacity duration-200"
              style={open ? { opacity: 0 } : undefined}
            />
            <span
              className="block h-[1.5px] w-4 bg-bone transition-transform duration-300"
              style={
                open
                  ? { transform: "translateY(-6.5px) rotate(-45deg)" }
                  : undefined
              }
            />
          </button>
        </div>

        <div
          ref={menuRef}
          className="invisible opacity-0 px-5 pb-5 flex flex-col gap-0.5 overflow-y-auto max-h-[calc(100svh-6rem)]"
        >
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              ref={(el) => {
                if (el) linkRefs.current[i] = el;
              }}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`node-rule py-1.5 text-xs sm:text-sm font-mono transition-colors flex items-center justify-between gap-3 ${
                l.isFeatured
                  ? "text-signal font-medium bg-signal/10 px-2.5 rounded-lg -mx-2 mb-1 border border-signal/20 hover:bg-signal/20"
                  : "text-mist hover:text-signal"
              }`}
            >
              <span className="min-w-0 break-words">{l.label}</span>
              {l.isFeatured && (
                <span className="shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded bg-signal text-ink font-bold">
                  VERIFIED
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
