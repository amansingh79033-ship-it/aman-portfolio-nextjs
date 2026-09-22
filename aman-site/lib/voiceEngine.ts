"use client";

export type VoicePersona = "aman" | "executive" | "silicon";

export interface VoiceOption {
  id: VoicePersona;
  label: string;
  sublabel: string;
  langCode: string[];
  defaultPitch: number;
  defaultRate: number;
}

export const VOICE_PERSONAS: Record<VoicePersona, VoiceOption> = {
  aman: {
    id: "aman",
    label: "Aman (Global Tech)",
    sublabel: "Indian / Global Tech Cadence",
    langCode: ["en-IN", "en-GB", "en-US"],
    defaultPitch: 1.0,
    defaultRate: 1.05
  },
  executive: {
    id: "executive",
    label: "Executive Lead",
    sublabel: "British / Transatlantic Clarity",
    langCode: ["en-GB", "en-IE", "en-US"],
    defaultPitch: 0.95,
    defaultRate: 1.0
  },
  silicon: {
    id: "silicon",
    label: "Silicon Valley",
    sublabel: "Fast Tech Lead Cadence",
    langCode: ["en-US", "en-CA"],
    defaultPitch: 1.05,
    defaultRate: 1.15
  }
};

export type SpeechState = "idle" | "speaking" | "paused";

class VoiceEngine {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private state: SpeechState = "idle";
  private listeners: Set<(state: SpeechState) => void> = new Set();
  private visualizerTimer: any = null;
  private visualizerListeners: Set<(amplitude: number) => void> = new Set();

  public isSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.isSupported()) return [];
    return window.speechSynthesis.getVoices();
  }

  public subscribe(listener: (state: SpeechState) => void): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  public subscribeVisualizer(listener: (amplitude: number) => void): () => void {
    this.visualizerListeners.add(listener);
    return () => this.visualizerListeners.delete(listener);
  }

  private setState(newState: SpeechState) {
    this.state = newState;
    this.listeners.forEach((fn) => fn(newState));

    if (newState === "speaking") {
      this.startVisualizerSimulation();
    } else {
      this.stopVisualizerSimulation();
    }
  }

  private startVisualizerSimulation() {
    if (this.visualizerTimer) clearInterval(this.visualizerTimer);
    this.visualizerTimer = setInterval(() => {
      // Simulate rhythmic audio wave spikes during speech
      const amp = 0.3 + Math.random() * 0.7;
      this.visualizerListeners.forEach((fn) => fn(amp));
    }, 120);
  }

  private stopVisualizerSimulation() {
    if (this.visualizerTimer) {
      clearInterval(this.visualizerTimer);
      this.visualizerTimer = null;
    }
    this.visualizerListeners.forEach((fn) => fn(0));
  }

  public speak(
    rawText: string,
    personaId: VoicePersona = "aman",
    speedMultiplier: number = 1.0
  ): boolean {
    if (!this.isSupported()) return false;

    this.stop();

    // Clean markdown symbols for natural speech pronunciation
    const cleanText = rawText
      .replace(/(\*\*|__)(.*?)\1/g, "$2")
      .replace(/(\*|_)(.*?)\1/g, "$2")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/#{1,6}\s?/g, "")
      .replace(/•\s?/g, ". ")
      .replace(/\n+/g, " ")
      .trim();

    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const persona = VOICE_PERSONAS[personaId] || VOICE_PERSONAS.aman;
    const availableVoices = window.speechSynthesis.getVoices();

    // Pick best matching voice
    let selectedVoice: SpeechSynthesisVoice | null = null;
    for (const code of persona.langCode) {
      const match = availableVoices.find(
        (v) => v.lang.toLowerCase() === code.toLowerCase() || v.lang.toLowerCase().startsWith(code.toLowerCase().split("-")[0])
      );
      if (match) {
        selectedVoice = match;
        break;
      }
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.pitch = persona.defaultPitch;
    utterance.rate = Math.max(0.7, Math.min(2.0, persona.defaultRate * speedMultiplier));

    utterance.onstart = () => {
      this.setState("speaking");
    };

    utterance.onend = () => {
      this.setState("idle");
      this.currentUtterance = null;
    };

    utterance.onerror = () => {
      this.setState("idle");
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  }

  public pause() {
    if (!this.isSupported()) return;
    if (this.state === "speaking") {
      window.speechSynthesis.pause();
      this.setState("paused");
    }
  }

  public resume() {
    if (!this.isSupported()) return;
    if (this.state === "paused") {
      window.speechSynthesis.resume();
      this.setState("speaking");
    }
  }

  public stop() {
    if (!this.isSupported()) return;
    window.speechSynthesis.cancel();
    this.currentUtterance = null;
    this.setState("idle");
  }

  public getState(): SpeechState {
    return this.state;
  }
}

export const voiceEngine = new VoiceEngine();
