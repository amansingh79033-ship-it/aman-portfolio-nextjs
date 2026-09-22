import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import GitHubRepos from "@/components/sections/GitHubRepos";
import AILab from "@/components/sections/AILab";
import Process from "@/components/sections/Process";
import Experience from "@/components/sections/Experience";
import DocumentsSection from "@/components/sections/DocumentsSection";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <GitHubRepos />
      <AILab />
      <Process />
      <Experience />
      <DocumentsSection />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
