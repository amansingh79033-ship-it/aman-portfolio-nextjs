import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AmanAICopilot from "@/components/ai/AmanAICopilot";
import RpmToast from "@/components/ai/RpmToast";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aman Kumar Singh — Engineer building agentic systems",
  description:
    "Portfolio of Aman Kumar Singh: projects, an interactive AI-concepts lab, and how one-agent-one-task delegation scales agentic workflows.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-ink text-bone antialiased">
        <Navbar />
        {children}
        <AmanAICopilot />
        <RpmToast />
      </body>
    </html>
  );
}
