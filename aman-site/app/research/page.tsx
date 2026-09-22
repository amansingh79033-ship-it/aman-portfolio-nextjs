import type { Metadata } from "next";
import ResearchHero from "@/components/research/ResearchHero";
import ImpactCaseStudy from "@/components/research/ImpactCaseStudy";
import Vitran7Section from "@/components/research/Vitran7Section";
import AHISection from "@/components/research/AHISection";
import SemanticExecutionSection from "@/components/research/SemanticExecutionSection";
import MemoryLayerSection from "@/components/research/MemoryLayerSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Advanced AI Systems & Compute Research — Aman Kumar Singh",
  description:
    "Interactive research laboratory on vitran7 (EV & Edge GPU compute mesh for datacentre offload), Artificial Heterogeneous Intelligence (AHI), Layered Semantic Execution, and Task Memory Strata.",
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-ink text-bone">
      <ResearchHero />
      <ImpactCaseStudy />
      <Vitran7Section />
      <AHISection />
      <SemanticExecutionSection />
      <MemoryLayerSection />
      <Footer />
    </main>
  );
}
