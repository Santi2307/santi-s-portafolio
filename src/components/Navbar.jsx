import { useEffect, useState, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  User,
  Lightbulb,
  Briefcase,
  Mail,
  Code,
  Brush,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Lightbulb },
  {
    name: "Projects",
    href: "#projects",
    icon: Briefcase,
  },
  { name: "Contact", href: "#contact", icon: Mail },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const observerRef = useRef(null);

  // IntersectionObserver para detectar la sección activa
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(
      handleIntersect,
      observerOptions
    );

    const sections = navItems
      .map((item) => document.getElementById(item.href.substring(1)))
      .filter(Boolean);
    sections.forEach((sec) => observerRef.current.observe(sec));

    return () => {
      sections.forEach((sec) => observerRef.current.unobserve(sec));
    };
  }, []);

  // Manejar el scroll y el menú móvil
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onKey = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="relative group text-xl font-extrabold tracking-wide"
          >
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Santiago’s
            </span>{" "}
            <span className="text-foreground">Portfolio</span>
          </a>

          {/* Menú de escritorio */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item, i) => {
              const hasSub = Array.isArray(item.submenu);
              const isActive = activeSection === item.href.substring(1);
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="relative group h-full"
                  onMouseEnter={() => hasSub && setOpenSubMenu(i)}
                  onMouseLeave={() => setOpenSubMenu(null)}
                >
                  <a
                    href={item.href}
                    onClick={() => setActiveSection(item.href.substring(1))}
                    className={cn(
                      "group inline-flex items-center gap-1 transition-colors relative",
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-foreground hover:text-indigo-600 dark:hover:text-indigo-400"
                    )}
                    aria-haspopup={hasSub ? "menu" : undefined}
                    aria-expanded={hasSub ? openSubMenu === i : undefined}
                  >
                    <Icon
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                    {item.name}
                    {hasSub && (
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform",
                          openSubMenu === i ? "rotate-180" : "rotate-0"
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full",
                        isActive ? "w-full bg-indigo-600 dark:bg-indigo-400" : ""
                      )}
                    />
                  </a>

                  {/* Submenú de escritorio */}
                  {hasSub && openSubMenu === i && (
                    <div className="absolute left-0 top-full mt-3 w-56 overflow-hidden rounded-xl border border-border bg-card backdrop-blur-lg shadow-lg z-20 animate-fade-in-up">
                      <ul className="py-2">
                        {item.submenu.map((sub, j) => {
                          const SubIcon = sub.icon;
                          return (
                            <li key={j}>
                              <a
                                href={sub.href}
                                className="flex items-center gap-3 px-4 py-2.5 text-foreground hover:bg-black/[0.04] dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                onClick={() => setOpenSubMenu(null)}
                              >
                                <SubIcon size={18} />
                                {sub.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Botones de menú móvil */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-border hover:bg-black/[0.04] dark:hover:bg-white/5 transition"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X size={22} className="text-foreground" />
              ) : (
                <Menu size={22} className="text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay móvil */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-background/90 backdrop-blur-xl transition-opacity duration-300",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer móvil */}
      <aside
        className={cn(
          "md:hidden fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm transform",
          "bg-card border-l border-border shadow-xl",
          "transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-base font-semibold text-foreground">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="rounded-xl p-2 hover:bg-black/[0.04] dark:hover:bg-white/5 transition"
            aria-label="Close menu"
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        <nav className="px-2 pb-8">
          <ul className="space-y-2">
            {navItems.map((item, i) => {
              const hasSub = Array.isArray(item.submenu);
              const Icon = item.icon;
              return (
                <li
                  key={i}
                  className="px-2 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-3 transition",
                      activeSection === item.href.substring(1)
                        ? "bg-black/[0.04] dark:bg-white/5 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-foreground hover:bg-black/[0.04] dark:hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </div>
                    {hasSub && <ChevronDown size={18} />}
                  </a>

                  {/* Submenú móvil */}
                  {hasSub && (
                    <ul className="mt-1 ml-2 space-y-1 border-l border-border pl-3">
                      {item.submenu.map((sub, j) => {
                        const SubIcon = sub.icon;
                        return (
                          <li key={j}>
                            <a
                              href={sub.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block rounded-lg px-3 py-2 text-muted-foreground hover:bg-black/[0.04] dark:hover:bg-white/5 transition"
                            >
                              {sub.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </nav>
  );
};

