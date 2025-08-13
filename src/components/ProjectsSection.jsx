import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

/* ==== EDITA ESTOS DATOS ==== */
const PROJECT = {
  title: "CryptoTracker Pro App",
  description:
    "A designed SwiftUI app for tracking top cryptocurrencies like Bitcoin, Ethereum, Solana, and more. Inspired by modern fintech apps, CryptoTracker Pro delivers an elegant, real-time-ready experience.",
  image: "/projects/orbit-dashboard.png", // coloca tu imagen en /public/projects/
  tags: ["SwiftUI", "Xcode", "SF Symbols"],
  liveUrl: "https://tu-demo.com",          // cambia por tu demo
  repoUrl: "https://github.com/Santi2307/CryptoTracker-Pro", // cambia por tu repo
};
/* =========================== */

/* reveal al hacer scroll */
function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

export default function ProjectsSection() {
  const [titleRef, titleInView] = useReveal();

  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          ref={titleRef}
          className={[
            "text-center mb-10 transition-all duration-700",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <h2 className="font-extrabold tracking-tight text-[clamp(1.6rem,4.2vw,2.2rem)]">
            Featured <span className="text-violet-400">Projects</span>
          </h2>
          <p className="opacity-80 mt-2 max-w-2xl mx-auto">
            One of my recent projects.
          </p>
        </div>

        {/* Card centrada */}
        <div className="mx-auto max-w-5xl">
          <ProjectCard project={PROJECT} />
        </div>

        {/* CTA general (opcional) */}
        {PROJECT.repoUrl && (
          <div className="mt-8 text-center">
            <a
              href={PROJECT.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 text-white px-6 py-3 hover:bg-violet-500 transition shadow-[0_0_20px_rgba(124,58,237,0.25)]"
            >
              Check my GitHub
              <Github className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [cardRef, inView] = useReveal();
  const [style, setStyle] = useState({});

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    const rotX = (+y / (r.height / 2)) * -4;
    const rotY = (+x / (r.width / 2)) * 4;
    setStyle({ transform: `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg)` });
  }
  function onLeave() {
    setStyle({ transform: "perspective(1100px) rotateX(0) rotateY(0)" });
  }

  return (
    <article
      ref={cardRef}
      className={[
        "relative overflow-hidden rounded-2xl border bg-background/60 backdrop-blur",
        "ring-1 ring-white/5 shadow-[0_0_26px_rgba(124,58,237,0.08)]",
        "transition-all duration-500 will-change-transform transform-gpu",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        "hover:-translate-y-1 hover:ring-violet-500/30",
      ].join(" ")}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
    >
      {/* Imagen */}
      <div className="relative">
        <img
          src={project.image}
          alt={project.title}
          className="h-[220px] w-full object-cover sm:h-[260px] lg:h-[300px] select-none"
          draggable="false"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/1200x600?text=Project+Preview";
          }}
        />
      </div>

      {/* Contenido */}
      <div className="p-5 sm:p-6">
        {/* tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border px-3 py-1 text-xs opacity-90 bg-background/50"
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="opacity-80 mt-1 leading-relaxed">{project.description}</p>

        {/* acciones */}
        <div className="mt-4 flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 border hover:bg-foreground/5 transition"
              aria-label="Open live demo"
            >
              Live Demo <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 border hover:bg-foreground/5 transition"
              aria-label="Open GitHub repository"
            >
              Source Code <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
