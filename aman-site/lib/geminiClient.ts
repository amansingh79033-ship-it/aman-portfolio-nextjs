/**
 * Minimal Google Gemini REST client shared by the site's AI routes.
 *
 * - Sends the key via the `x-goog-api-key` header (never the URL query string,
 *   which leaks into upstream access logs).
 * - Rotates across the configured key pool: when Google returns a 429 /
 *   capacity error the key is cooled down and the request is retried on the next
 *   least-loaded key, so a burst on one key never fails the visitor.
 * - Walks a live-model fallback chain (`gemini-1.5-*` is retired).
 * - Override the chain with the GEMINI_MODEL env var (comma separated).
 */

import {
  acquireKey,
  cooldownBadKey,
  cooldownRateLimited,
  getSlotCount,
  masked,
  registerHit,
} from "./geminiKeyPool";

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

export const GEMINI_MODEL_FALLBACKS = [
  "gemini-2.5-flash",
  "gemini-3.5-flash",
  "gemini-3.6-flash",
];

export function geminiModels(): string[] {
  const override = (process.env.GEMINI_MODEL || "").trim();
  if (!override) return GEMINI_MODEL_FALLBACKS;
  return override
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
}

export interface GeminiTurn {
  role: "user" | "model";
  text: string;
}

export interface GeminiRequest {
  contents: GeminiTurn[];
  temperature?: number;
  maxOutputTokens?: number;
  jsonMode?: boolean;
  /**
   * Reasoning budget for thinking models. 0 disables thinking — much faster
   * and avoids truncated structured output; only supported on some models
   * (e.g. gemini-2.5-flash), so it is opt-in per call.
   */
  thinkingBudget?: number;
}

/**
 * Hard ceiling on a single upstream call. Vercel Hobby functions default to a
 * 10s wall but can be raised to 60s via `export const maxDuration`; aborting a
 * touch earlier lets the route fall back gracefully instead of a hard 504.
 */
const CALL_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 55_000);

export interface GeminiResult {
  text: string;
  model: string;
  keyTail: string;
}

function isRateLimited(status: number, message: string): boolean {
  return status === 429 || status === 503 || /RESOURCE_EXHAUSTED|rate limit|quota/i.test(message);
}

function isAuthFailure(status: number): boolean {
  return status === 401 || status === 403;
}

function isModelUnavailable(status: number, message: string): boolean {
  return status === 404 || /not found for API|is not found|unsupported/i.test(message);
}

async function callModel(
  model: string,
  apiKey: string,
  req: GeminiRequest
): Promise<{ ok: true; text?: string } | { ok: false; status: number; message: string }> {
  try {
    const res = await fetch(`${ENDPOINT}/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      signal: AbortSignal.timeout(CALL_TIMEOUT_MS),
      body: JSON.stringify({
        contents: req.contents.map((turn) => ({ role: turn.role, parts: [{ text: turn.text }] })),
        generationConfig: {
          temperature: req.temperature ?? 0.65,
          maxOutputTokens: req.maxOutputTokens ?? 950,
          ...(req.jsonMode ? { responseMimeType: "application/json" } : {}),
          ...(req.thinkingBudget !== undefined
            ? { thinkingConfig: { thinkingBudget: req.thinkingBudget } }
            : {}),
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return {
        ok: false,
        status: res.status,
        message: String(err?.error?.message || res.statusText || "Gemini error"),
      };
    }

    const data = await res.json();
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return { ok: true, text };
  } catch (e) {
    return { ok: false, status: 0, message: e instanceof Error ? e.message : "network error" };
  }
}

/**
 * Attempt the request across the key pool and model chain. Returns the first
 * successful completion, or null when every key is cooling / all attempts fail
 * (the caller then serves its local fallback).
 */
export async function generateContent(req: GeminiRequest): Promise<GeminiResult | null> {
  const models = geminiModels();
  const totalKeys = getSlotCount();

  // Rotate at most once per key: every send registers a hit (and failures cool
  // the key), so acquireKey naturally walks to a fresher key each iteration.
  for (let attempt = 0; attempt < totalKeys; attempt++) {
    const slot = acquireKey();
    if (!slot) break; // all keys cooling

    for (const model of models) {
      registerHit(slot); // count the actual send against the rolling budget
      const result = await callModel(model, slot.key, req);

      if (result.ok) {
        if (result.text && result.text.trim()) {
          return { text: result.text, model, keyTail: slot.tail };
        }
        // empty candidate: try the next model on this same key
        continue;
      }

      if (isAuthFailure(result.status)) {
        cooldownBadKey(slot);
        console.warn(`Gemini ${masked(slot)} auth failed; cooling key`);
        break; // next key
      }
      if (isRateLimited(result.status, result.message)) {
        cooldownRateLimited(slot);
        console.warn(`Gemini ${masked(slot)} rate limited; rotating key`);
        break; // next key
      }
      if (isModelUnavailable(result.status, result.message)) {
        continue; // same key, next model
      }

      console.warn(`Gemini ${masked(slot)}/${model} error: ${result.message}`);
      break; // unknown error on this key; try another key
    }
  }

  return null;
}
