"use client";

/**
 * Tiny client-side pub/sub for the shared Gemini RPM budget.
 *
 * The API routes return an `rpm` object on every response. The copilot and the
 * delegation bench push it in via `reportRpm`, and <RpmToast/> subscribes to
 * raise the "slow down" banner once the collective budget crosses the alert %.
 */

export interface RpmStatus {
  activeKeys: number;
  coolingKeys: number;
  used: number;
  capacity: number;
  fraction: number;
  percentUsed: number;
  alertAtPercent: number;
  rpmPerKey: number;
}

let current: RpmStatus | null = null;
const subs = new Set<(s: RpmStatus) => void>();

export function reportRpm(status: RpmStatus | undefined | null): void {
  if (!status || typeof status.percentUsed !== "number") return;
  current = status;
  subs.forEach((fn) => fn(status));
}

export function subscribeRpm(fn: (s: RpmStatus) => void): () => void {
  subs.add(fn);
  if (current) fn(current);
  return () => {
    subs.delete(fn);
  };
}
