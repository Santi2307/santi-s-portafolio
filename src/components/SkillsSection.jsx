import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Code,
  Server,
  Cloud,
  Network,
  GitBranch,
  Laptop,
  Database,
  Terminal,
  ServerCog,
  Shield,
  Palette,
  Layout,
  Star,
  Zap,
  Cpu,
  ShieldCheck,
  Globe,
  Briefcase
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Mapeo de íconos a habilidades
const skillIcons = {
  "HTML/CSS": Palette,
  JavaScript: Code,
  React: Globe,
  TypeScript: Zap,
  "Tailwind CSS": Palette,
  "Next.js": Layout,
  "Node.js": Server,
  Express: Briefcase,
  MongoDB: Database,
  PostgreSQL: Database,
  GraphQL: Code,
  "Git/GitHub": GitBranch,
  Docker: Terminal,
  Figma: Palette,
  "VS Code": Code,
  "Windows Server": ServerCog,
  Linux: Cpu,
  "Cisco Networking": Network,
  VMware: Briefcase,
  "Cloud Security": ShieldCheck,
  Azure: Cloud,
  AWS: Cloud,
  "Bash/PowerShell": Terminal,
};

// Datos de habilidades, con una categoría más específica para el rol
const skillsData = [
  // Habilidades Destacadas (nuevo filtro)
  { name: "HTML/CSS", level: 95, category: "Featured Skills" },
  { name: "React", level: 90, category: "Featured Skills" },
  { name: "Linux", level: 85, category: "Featured Skills" },
  { name: "Git/GitHub", level: 90, category: "Featured Skills" },
  { name: "Docker", level: 70, category: "Featured Skills" },

  // Desarrollo de Software
  { name: "HTML/CSS", level: 95, category: "Software Development" },
  { name: "JavaScript", level: 90, category: "Software Development" },
  { name: "React", level: 90, category: "Software Development" },
  { name: "TypeScript", level: 85, category: "Software Development" },
  { name: "Tailwind CSS", level: 90, category: "Software Development" },
  { name: "Next.js", level: 80, category: "Software Development" },
  { name: "Node.js", level: 80, category: "Software Development" },
  { name: "Express", level: 75, category: "Software Development" },
  { name: "MongoDB", level: 70, category: "Software Development" },

  // Sistemas y Redes
  { name: "Windows Server", level: 90, category: "Systems & Networking" },
  { name: "Linux", level: 85, category: "Systems & Networking" },
  { name: "Cisco Networking", level: 75, category: "Systems & Networking" },
  { name: "VMware", level: 80, category: "Systems & Networking" },
  { name: "Bash/PowerShell", level: 85, category: "Systems & Networking" },
  { name: "Cloud Security", level: 70, category: "Systems & Networking" },

  // Nube
  { name: "Azure", level: 75, category: "Cloud" },
  { name: "AWS", level: 70, category: "Cloud" },

  // Herramientas
  { name: "Git/GitHub", level: 90, category: "Tools" },
  { name: "Docker", level: 70, category: "Tools" },
  { name: "Figma", level: 85, category: "Tools" },
  { name: "VS Code", level: 95, category: "Tools" },
];

const categories = ["All", "Featured Skills", "Software Development", "Systems & Networking", "Cloud", "Tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") {
      return skillsData;
    }
    return skillsData.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Skills</span>
        </h2>

        {/* Botones de Categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-down">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full font-medium transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-foreground hover:bg-secondary/70"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lista de Habilidades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {filteredSkills.map((skill, index) => {
            const Icon = skillIcons[skill.name];
            return (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-xs card-hover flex flex-col items-center text-center space-y-4"
              >
                <div className="w-28 h-28">
                  <CircularProgressbar
                    value={skill.level}
                    text={`${skill.level}%`}
                    styles={buildStyles({
                      pathColor: 'hsl(var(--primary))',
                      textColor: 'hsl(var(--foreground))',
                      trailColor: 'hsl(var(--border))',
                    })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="h-5 w-5 text-primary" />}
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{skill.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mensaje si no hay habilidades */}
        {filteredSkills.length === 0 && (
          <p className="text-center text-muted-foreground text-lg mt-12 animate-fade-in-up">
            No hay habilidades en esta categoría.
          </p>
        )}

      </div>
    </section>
  );
};
