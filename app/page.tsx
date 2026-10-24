import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { Projects } from "@/components/portfolio/projects";
import { MinorProjects } from "@/components/portfolio/minor-projects";
import { About } from "@/components/portfolio/about";
import { Experience } from "@/components/portfolio/experience";
import { OpenSource } from "@/components/portfolio/open-source";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-background">
        <Hero />
        <Projects />
        <MinorProjects />
        <About />
        <Experience />
        {/* <OpenSource /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
