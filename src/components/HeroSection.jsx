// src/components/HeroSection.jsx
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[70vh] items-center justify-center py-16 sm:py-20 lg:py-24 text-center"
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <h1 className="font-extrabold tracking-tight leading-tight mb-4
                       text-[clamp(2.25rem,6vw,4.5rem)]">
          Hi, I&apos;m{" "}
          <span className="text-violet-400">Santiago</span>{" "}
          Delgado
        </h1>

        <p className="mx-auto max-w-3xl opacity-90 mb-8
                      text-[clamp(1rem,2.2vw,1.125rem)] leading-relaxed">
          I create stellar web experiences with modern technologies. Specializing in front-end
          development, I build interfaces that are both beautiful and functional.
        </p>

        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3
                     bg-violet-600 text-white hover:bg-violet-500 active:scale-[.98]
                     transition shadow-[0_0_20px_rgba(124,58,237,0.25)]"
        >
          View My Work
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
