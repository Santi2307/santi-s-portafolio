import { ArrowUp, Github, Linkedin, Instagram, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const socialLinks = [
  { href: "https://www.linkedin.com/in/santiagodelgado23", icon: Linkedin, label: "LinkedIn profile" },
  { href: "https://github.com/Santi2307", icon: Github, label: "GitHub profile" },
  { href: "https://www.instagram.com/santidelgado2004", icon: Instagram, label: "Instagram profile" },
  { href: "mailto:santiagodelgadosanchez9@gmail.com", icon: Mail, label: "Gmail" },
];

const footerNavItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const [inView, setInView] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      observer.observe(footerElement);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer id="footer" className="py-12 px-4 bg-card border-t border-border mt-12 text-center relative overflow-hidden">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-8">
        <p className={cn(
          "text-sm text-muted-foreground order-3 md:order-1 mt-6 md:mt-0 transition-all duration-1000",
          inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
        )}>
          &copy; {new Date().getFullYear()} Built and Designed by{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent font-semibold">
            Santiago Delgado
          </span>. All rights reserved.
        </p>

        <div className={cn(
          "flex space-x-4 order-2 md:order-2 transition-all duration-1000 delay-200",
          inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>

        <a
          href="#hero"
          className={cn(
            "p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 transform",
            "order-1 md:order-3",
            showScrollButton ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </a>
      </div>

      <div className={cn(
        "container mx-auto max-w-5xl mt-8 pt-8 border-t border-border transition-all duration-1000 delay-300",
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}>
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          {footerNavItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
