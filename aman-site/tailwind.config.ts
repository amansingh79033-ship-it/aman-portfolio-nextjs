import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0b10",
        panel: "#12141c",
        panel2: "#181b26",
        mist: "#8891a7",
        bone: "#e9eaee",
        signal: "#5eead4", // context / memory layer accent (cyan)
        agent: "#8b7cf6", // agent / delegation accent (violet)
        warn: "#ff8a3d",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
