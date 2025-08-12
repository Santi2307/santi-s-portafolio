// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme") || "system";
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return saved === "dark" || (saved === "system" && prefersDark);
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((v) => !v)}
      className={`inline-flex items-center justify-center rounded-full border bg-background hover:bg-foreground/5 transition leading-none ${className}`}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

/* Background Effects */


