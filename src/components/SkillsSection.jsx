import { useEffect, useMemo, useRef, useState } from "react";

/* ---------- Datos ---------- */
const CATEGORIES = ["All", "Frontend", "Backend", "Tools"];

const SKILLS = [
  // Frontend
  { name: "HTML/CSS",   value: 95, category: "Frontend" },
  { name: "JavaScript", value: 90, category: "Frontend" },
  { name: "React",      value: 90, category: "Frontend" },
  { name: "TypeScript", value: 85, category: "Frontend" },
  { name: "Tailwind CSS", value: 90, category: "Frontend" },
  { name: "Next.js",    value: 80, category: "Frontend" },

  // Backend
  { name: "Node.js",    value: 80, category: "Backend" },
  { name: "Express",    value: 75, category: "Backend" },
  { name: "MongoDB",    value: 70, category: "Backend" },
  { name: "PostgreSQL", value: 65, category: "Backend" },
  { name: "GraphQL",    value: 60, category: "Backend" },

  // Tools
  { name: "Git/GitHub", value: 90, category: "Tools" },
  { name: "Docker",     value: 70, category: "Tools" },
  { name: "Figma",      value: 85, category: "Tools" },
  { name: "VS Code",    value: 95, category: "Tools" },
];

/* ---------- Hook: aparece al hacer scroll ---------- */
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

/* ---------- Componente ---------- */
export default function SkillsSection() {
  const [active, setActive] = useState("All");
  const [titleRef, titleInView] = useReveal();

  const filtered = useMemo(() => {
    return active === "All" ? SKILLS : SKILLS.filter(s => s.category === active);
  }, [active]);

  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div
          ref={titleRef}
          className={[
            "text-center mb-8 sm:mb-10 transition-all duration-700",
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
          ].join(" ")}
        >
          <h2 className="font-extrabold tracking-tight text-[clamp(1.6rem,4.2vw,2.2rem)]">
            My <span className="text-violet-400">Skills</span>
          </h2>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex items-center justify-center gap-4 text-sm">
          {CATEGORIES.map(cat => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={[
                  "rounded-full px-4 py-1.5 transition",
                  isActive
                    ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,.25)]"
                    : "opacity-80 hover:opacity-100 border"
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid de skills */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <SkillCard key={s.name} skill={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Tarjeta de skill ---------- */
function SkillCard({ skill, index }) {
  const [ref, inView] = useReveal();
  const [progress, setProgress] = useState(0);

  // anima la barra cuando entra en vista
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setProgress(skill.value), 80); // pequeño delay
    return () => clearTimeout(t);
  }, [inView, skill.value]);

  return (
    <div
      ref={ref}
      className={[
        "rounded-2xl border bg-background/60 backdrop-blur p-5 sm:p-6",
        "ring-1 ring-white/5 shadow-[0_0_20px_rgba(124,58,237,0.06)]",
        "transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      ].join(" ")}
      style={{ transitionDelay: `${index * 35}ms` }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-semibold">{skill.name}</h4>
        <span className="text-xs opacity-70">{progress}%</span>
      </div>

      {/* Track */}
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        {/* Bar */}
        <div
          className="h-full rounded-full bg-violet-500 transition-[width] duration-700 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        />
      </div>
    </div>
  );
}
