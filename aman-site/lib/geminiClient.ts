/**
 * Minimal Google Gemini REST client shared by the site's AI routes.
 *
 * - The key travels in the `x-goog-api-key` header, never in the URL query
 *   string (query strings end up in upstream access logs).
 * - `gemini-1.5-*` models are retired, so we walk a fallback chain and report
 *   which model actually answered.
 * - Override the chain with the GEMINI_MODEL env var (comma separated).
 */

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

export const GEMINI_MODEL_FALLBACKS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
];

export function geminiModels(): string[] {
  const override = (process.env.GEMINI_MODEL || "").trim();
  if (!override) return GEMINI_MODEL_FALLBACKS;
  return override.split(",").map((m) => m.trim()).filter(Boolean);
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
}

export interface GeminiResult {
  text: string;
  model: string;
}

/** Calls each model in turn and returns the first non-empty completion. */
export async function generateContent(
  apiKey: string,
  req: GeminiRequest
): Promise<GeminiResult | null> {
  if (!apiKey) return null;

  for (const model of geminiModels()) {
    try {
      const res = await fetch(`${ENDPOINT}/${model}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: req.contents.map((turn) => ({
            role: turn.role,
            parts: [{ text: turn.text }],
          })),
          generationConfig: {
            temperature: req.temperature ?? 0.65,
            maxOutputTokens: req.maxOutputTokens ?? 950,
            ...(req.jsonMode ? { responseMimeType: "application/json" } : {}),
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.warn(`Gemini ${model} note:`, err?.error?.message || res.statusText);
        continue;
      }

      const data = await res.json();
      const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text && text.trim()) return { text, model };
      console.warn(`Gemini ${model} returned an empty candidate`);
    } catch (callError) {
      console.warn(`Gemini ${model} call failed:`, callError);
    }
  }

  return null;
}
