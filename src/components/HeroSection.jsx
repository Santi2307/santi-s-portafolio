// src/components/HeroSection.jsx
import { ArrowRight } from "lucide-react";
import Typewriter from "./Typewriter.jsx";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[70vh] items-center justify-center py-16 sm:py-20 lg:py-24 text-center overflow-x-clip"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h1 className="text-[clamp(2.8rem,6.6vw,5.2rem)] font-extrabold tracking-tight leading-tight whitespace-nowrap">
          <Typewriter
            segments={[
              { text: "Hi, I'm " },
              {
                text: "Santiago",
                className:
                  // animated gradient fill on the name
                  "bg-[linear-gradient(90deg,#a78bfa,#7c3aed,#4f46e5)] bg-clip-text text-transparent animate-gradient-x",
              },
            ]}
            speed={100}        // medium-fast
            startDelay={500}
          />
        </h1>

        <p className="mx-auto max-w-3xl opacity-90 mb-8 text-[clamp(1rem,2.2vw,1.125rem)] leading-relaxed">
          I'm an aspiring software engineer from Toronto, Canada. I'm fascinated by large scale, high impact products, and passionate about building innovative solutions that make a difference. 
        </p>

        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-violet-600 text-white hover:bg-violet-500 active:scale-[.98] transition shadow-[0_0_20px_rgba(124,58,237,0.25)]"
        >
          View My Work <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
