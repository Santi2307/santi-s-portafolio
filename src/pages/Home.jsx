// src/pages/Home.jsx
import { Navbar } from "../components/Navbar.jsx";
import StarBackground from "../components/StarBackground.jsx";
import HeroSection from "../components/HeroSection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import AboutSection from "../components/AboutSection.jsx";
import SkillsSection from "../components/SkillsSection.jsx";
import ProjectsSection from "../components/ProjectsSection.jsx";
import { Footer } from "../components/Footer.jsx";


// src/pages/Home.jsx
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />

      {/* crea tus secciones con los ids que usa el menú */}
      <section id="about" className="scroll-mt-24 py-24" />
      <section id="skills" className="scroll-mt-24 py-24" />
      <section id="projects" className="scroll-mt-24 py-24" />
      <ContactSection />
      <Footer />
    </>
  );
}

