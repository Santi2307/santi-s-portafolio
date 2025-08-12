// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 border-b",
        scrolled ? "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-14 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Marca izq */}
        <a href="#hero" className="font-semibold tracking-tight">
          <span className="opacity-90">SantiTech</span>{" "}
          <span className="text-violet-400">Portfolio</span>
        </a>

        {/* Links + toggle a la derecha */}
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm opacity-80 hover:opacity-100 transition"
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
          {/* Botón de noche separado, no se monta sobre los links */}
          <ThemeToggle className="h-9 w-9" />
        </div>
      </nav>
    </header>
  );
}
