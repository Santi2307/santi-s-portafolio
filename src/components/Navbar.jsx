// src/components/Navbar.jsx
import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import { Menu, X } from "lucide-react";

const LINKS = [
  { name: "Home",         href: "#hero" },
  { name: "About",        href: "#about" },
  { name: "Skills",       href: "#skills" },
  { name: "Projects",     href: "#projects" },
  { name: "Certificates", href: "#certifications" }, // entre Projects y Contact
  { name: "Contact",      href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("#hero");
  const [progress, setProgress]     = useState(0);

  const sectionIds = useMemo(() => LINKS.map(l => l.href).filter(h => h.startsWith("#")), []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setScrolled(y > 8);

        const h = document.documentElement;
        const pct = (y / (h.scrollHeight - h.clientHeight)) * 100;
        setProgress(Math.max(0, Math.min(100, pct)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const els = sectionIds.map(id => document.querySelector(id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
        if (vis[0]) setActive("#" + vis[0].target.id);
      },
      { rootMargin: "-48% 0% -48% 0%", threshold: [0.01, 0.1, 0.25, 0.5] }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const go = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      role="navigation"
      aria-label="Primary"
      className={[
        "fixed inset-x-0 top-0 z-50 border-b transition-all",
        "supports-[backdrop-filter]:backdrop-blur",
        scrolled
          ? "bg-background/70 supports-[backdrop-filter]:bg-background/60"
          : "bg-background/30 supports-[backdrop-filter]:bg-background/30",
      ].join(" ")}
    >
      {/* progreso scroll */}
      <div className="relative h-[2px]">
        <div
          className="absolute left-0 top-0 h-[2px] rounded-r-full
                     bg-[linear-gradient(90deg,#8b5cf6,transparent)]
                     shadow-[0_0_12px_#8b5cf6]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Marca */}
        <a href="#hero" className="group inline-flex items-center gap-3 font-semibold tracking-tight">
          <img
            src="/about/dino-32.png"           // asegúrate de que exista
            alt="SantiTech logo"
            className="h-8 w-8 rounded-lg ring-1 ring-black/5 dark:ring-white/10
                       motion-safe:animate-[float_3s_ease-in-out_infinite]"
            onError={(e) => { e.currentTarget.src = "/favicon.svg"; }}
            decoding="async"
          />
          <span className="opacity-90">
            Santi<span className="text-violet-400">Tech</span> Portfolio
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -bottom-5 h-8
                       bg-gradient-to-r from-transparent via-violet-500/10 to-transparent
                       blur-2xl opacity-0 group-hover:opacity-100 transition"
          />
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className={[
                    "group relative px-3 py-2 text-sm transition",
                    isActive ? "text-violet-400" : "opacity-80 hover:opacity-100",
                  ].join(" ")}
                >
                  {l.name}
                  <span
                    aria-hidden
                    className={[
                      "pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1",
                      "h-[2px] w-0 bg-gradient-to-r from-transparent via-violet-400 to-transparent",
                      "transition-all duration-500",
                      isActive ? "w-full" : "group-hover:w-full",
                    ].join(" ")}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="h-10 w-10" />
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-foreground/5 transition"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Sheet móvil */}
      <div
        className={[
          "md:hidden fixed inset-0 z-40 transition",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div
          className={[
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={[
            "absolute right-3 left-3 top-3 rounded-2xl border bg-background/95 p-4 ring-1 ring-white/10",
            "transition-transform duration-300",
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
          ].join(" ")}
        >
          <ul className="grid gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => go(l.href)}
                  className={[
                    "w-full rounded-xl px-4 py-3 text-left text-sm transition",
                    active === l.href
                      ? "bg-violet-500/10 text-violet-400"
                      : "hover:bg-foreground/5",
                  ].join(" ")}
                >
                  {l.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-xs opacity-60 text-center">© {new Date().getFullYear()} Santi</div>
        </div>
      </div>
    </header>
  );
}

// 👉 exportamos ambos para evitar roturas
export { Navbar };
export default Navbar;

