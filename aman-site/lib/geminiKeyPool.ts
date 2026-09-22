/**
 * Gemini multi-key rotation pool with a rolling requests-per-minute (RPM)
 * budget shared across every configured key.
 *
 * Why: a single Gemini API key exhausts its free-tier RPM quickly under a busy
 * copilot + delegation bench. By rotating across N keys on the least-loaded one
 * and backing a key off whenever Google returns a 429 / capacity error, a burst
 * on one key transparently spills onto the others instead of failing the user.
 *
 * The collective budget is surfaced to the UI (via the routes) so the site can
 * gently warn the visitor once they cross a configurable % of the shared RPM.
 *
 * NOTE: Vercel serverless functions are stateless across cold instances, so the
 * rolling window is per warm container. That is still correct for a low-traffic
 * portfolio (one visitor at a time) and it degrades gracefully: even if our
 * counter is behind, the 429 backoff keeps requests succeeding on other keys.
 */

export interface KeySlot {
  id: number;
  key: string;
  /** last 4 chars only — safe for logs/UI, never the full secret */
  tail: string;
  /** request timestamps inside the rolling window */
  hits: number[];
  /** epoch ms until which this key is skipped (after a 429 / bad-key) */
  cooldownUntil: number;
}

const WINDOW_MS = 60_000;
/** how long a key rests after Google says it's rate limited */
const RATE_LIMIT_COOLDOWN_MS = 20_000;
/** how long a key rests after a hard auth failure (invalid/revoked key) */
const AUTH_COOLDOWN_MS = 30 * 60_000;

function readKeys(): string[] {
  const raw = [process.env.GEMINI_API_KEYS || "", process.env.GEMINI_API_KEY || ""].join(",\n");
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(/[,\n\r;]+/)) {
    const k = part.trim();
    if (k && !seen.has(k)) {
      seen.add(k);
      out.push(k);
    }
  }
  return out;
}

function rpmPerKey(): number {
  const n = Number(process.env.GEMINI_RPM_PER_KEY || "");
  return Number.isFinite(n) && n > 0 ? n : 15; // Gemini free-tier flash default
}

function alertThreshold(): number {
  const n = Number(process.env.GEMINI_RPM_ALERT || "");
  if (!Number.isFinite(n) || n <= 0) return 0.7;
  // Accept either a fraction (0.7) or a whole percent (70).
  return n <= 1 ? n : Math.min(1, n / 100);
}

let slots: KeySlot[] | null = null;

function getSlots(): KeySlot[] {
  if (!slots) {
    slots = readKeys().map((key, i) => ({
      id: i,
      key,
      tail: key.slice(-4),
      hits: [],
      cooldownUntil: 0,
    }));
  }
  return slots;
}

function prune(now: number, s: KeySlot) {
  if (s.hits.length && now - s.hits[0] >= WINDOW_MS) {
    s.hits = s.hits.filter((t) => now - t < WINDOW_MS);
  }
}

export interface RpmStatus {
  activeKeys: number;
  coolingKeys: number;
  used: number;
  capacity: number;
  /** 0..1 fraction of the shared budget currently consumed */
  fraction: number;
  /** 0..100 integer, convenience for UI */
  percentUsed: number;
  alertAtPercent: number;
  rpmPerKey: number;
}

export function hasGeminiKeys(): boolean {
  return getSlots().length > 0;
}

export function getSlotCount(): number {
  return getSlots().length;
}

export function poolStatus(): RpmStatus {
  const now = Date.now();
  const all = getSlots();
  let used = 0;
  let cooling = 0;
  for (const s of all) {
    prune(now, s);
    used += s.hits.length;
    if (s.cooldownUntil > now) cooling += 1;
  }
  const per = rpmPerKey();
  const capacity = all.length * per;
  const fraction = capacity > 0 ? Math.min(1, used / capacity) : 0;
  return {
    activeKeys: all.length,
    coolingKeys: cooling,
    used,
    capacity,
    fraction,
    percentUsed: Math.round(fraction * 100),
    alertAtPercent: Math.round(alertThreshold() * 100),
    rpmPerKey: per,
  };
}

/**
 * Choose the least-loaded key that is not cooling. Returns null only when every
 * key is in cooldown (rare), letting the caller fall back to a local engine.
 */
export function acquireKey(): KeySlot | null {
  const now = Date.now();
  let best: KeySlot | null = null;
  for (const s of getSlots()) {
    prune(now, s);
    if (s.cooldownUntil > now) continue;
    if (!best || s.hits.length < best.hits.length) best = s;
  }
  return best;
}

export function registerHit(s: KeySlot) {
  s.hits.push(Date.now());
}

export function cooldownRateLimited(s: KeySlot) {
  s.cooldownUntil = Date.now() + RATE_LIMIT_COOLDOWN_MS;
}

export function cooldownBadKey(s: KeySlot) {
  s.cooldownUntil = Date.now() + AUTH_COOLDOWN_MS;
}

export function masked(s: KeySlot) {
  return `key••${s.tail}`;
}
