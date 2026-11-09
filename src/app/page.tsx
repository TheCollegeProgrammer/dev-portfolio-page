import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Marquee } from "@/components/sections/marquee";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Skills />
      <Journey />
      <Contact />
    </main>
  );
}
