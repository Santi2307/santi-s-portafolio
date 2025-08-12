// src/components/AboutSection.jsx
import { useEffect, useRef, useState } from "react";
import { Code2, PenTool, ClipboardList, ArrowRight, Download } from "lucide-react";
import AboutGallery from "../components/AboutGallery.jsx";

/* ---------- util: reveal-on-scroll ---------- */
function useReveal() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setOn(true),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on];
}

/* ---------- card con efecto tilt ---------- */
function FeatureCard({ icon, title, desc, delay = 0 }) {
  const [ref, on] = useReveal();
  const [style, setStyle] = useState({});

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    const rotX = (+y / (r.height / 2)) * -6;
    const rotY = (+x / (r.width / 2)) * 6;
    setStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`,
    });
  }
  function onLeave() {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)" });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={[
        "relative rounded-2xl border bg-background/60 backdrop-blur p-5 sm:p-6",
        "transition-transform duration-300 will-change-transform transform-gpu",
        "ring-1 ring-white/5 hover:ring-violet-500/30 shadow-[0_0_20px_rgba(124,58,237,0.06)]",
        on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <span className="grid place-items-center h-12 w-12 rounded-xl bg-violet-500/15 text-violet-400 border border-violet-500/20">
          {icon}
        </span>
        <div>
          <h4 className="font-semibold mb-1">{title}</h4>
          <p className="opacity-80 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [leftRef, leftOn] = useReveal();
  const [rightRef, rightOn] = useReveal();

  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h2 className="text-center font-extrabold tracking-tight mb-10 text-[clamp(1.75rem,4.5vw,2.5rem)]">
          About <span className="text-violet-400">Me</span>
        </h2>

        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Columna izquierda */}
          <div
            ref={leftRef}
            className={[
              "text-left",
              leftOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              "transition-all duration-700",
            ].join(" ")}
          >
            {/* Galería arriba del texto */}
            <div className="mb-6 w-full max-w-[420px]">
              <AboutGallery
                images={[
                  "/about/me1.jpg",
                  "/about/me2.jpg",
                  "/about/me3.jpg",
                  "/about/me4.jpg", // ← solo 4 imágenes
                ]}
                intervalMs={4000}
                maxHeight={420}   // evita “cuadro gigante”
              />
            </div>

            {/* Texto */}
            <h3 className="font-semibold text-[clamp(1.1rem,3.2vw,1.5rem)] mb-3">
              I create fun stuff sometimes.
            </h3>

            <p className="opacity-80 leading-relaxed mb-4">
              I'm Santiago, an aspiring software developer based in Toronto, Canada.
Currently studying Computer Systems Technology at Seneca Polytechnic, I’m passionate about solving problems through code and turning ideas into functional, elegant solutions.
I’ve developed and deployed multiple academic and personal projects, including web applications built with Python, JavaScript, and C++. My work includes designing responsive interfaces, implementing backend logic, and collaborating through GitHub.
My goal is to contribute to large-scale, impactful products that reach and improve the lives of millions of users worldwide.
            </p>
            <p className="opacity-80 leading-relaxed mb-6">
             I hope you enjoy exploring some of the projects I’ve been working on. Thank you o Muchas Gracias in Spanish. 
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-violet-600 text-white hover:bg-violet-500 transition"
              >
                Get In Touch <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/Santi-CV.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border hover:bg-foreground/5 transition"
              >
                Download CV <Download className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Columna derecha: features */}
          <div
            ref={rightRef}
            className={[
              "grid gap-4",
              rightOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              "transition-all duration-700",
            ].join(" ")}
          >
            <FeatureCard
              icon={<Code2 className="h-6 w-6" />}
              title="Web Development"
              desc="Creating responsive websites and web applications with modern frameworks."
              delay={50}
            />
            <FeatureCard
              icon={<PenTool className="h-6 w-6" />}
              title="UI/UX Design"
              desc="Designing intuitive interfaces and delivering seamless user experiences."
              delay={140}
            />
            <FeatureCard
              icon={<ClipboardList className="h-6 w-6" />}
              title="Project Management"
              desc="Leading projects from concept to delivery with agile methodologies."
              delay={230}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
