import { ArrowRight, ExternalLink, Github, Terminal, Cloud, Shield, Server, Layout, Code } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";

// Reorganiza los datos del proyecto con una categoría y una URL de imagen real
const allProjects = [
  {
    id: 1,
    title: "Full-Stack Project Management Dashboard",
    description: "A complete full-stack solution for managing tasks, projects, and user roles. Demonstrates skills in API design, database management, and modern front-end frameworks.",
    image: "/projects/project1.png",
    category: "Full-Stack",
    tags: ["React", "Node.js", "MongoDB", "Express", "REST API"],
    demoUrl: "#", // Reemplazar con URL de demo en vivo
    githubUrl: "#", // Reemplazar con URL de GitHub
    icon: Server,
  },
  {
    id: 2,
    title: "Cloud Infrastructure Automation",
    description: "Automated deployment of a web server on a cloud provider (AWS/Azure) using scripting and IaC. Showcases skills in cloud computing, scripting, and CI/CD.",
    image: "/projects/project2.png",
    category: "Systems & Networking",
    tags: ["Azure", "AWS", "Terraform", "Bash", "Docker"],
    demoUrl: "#",
    githubUrl: "#",
    icon: Cloud,
  },
  {
    id: 3,
    title: "Secure Network Configuration Tool",
    description: "A Python-based tool for auditing and configuring network devices (Cisco) for security compliance. Highlights skills in networking, security, and Python scripting.",
    image: "/projects/project3.png",
    category: "Security",
    tags: ["Python", "Cisco", "Security", "Networking"],
    demoUrl: "#",
    githubUrl: "#",
    icon: Shield,
  },
  {
    id: 4,
    title: "Real-time Monitoring Dashboard",
    description: "A dashboard that visualizes real-time system metrics (CPU, RAM, disk) from servers. Demonstrates data handling, real-time communication (WebSockets), and data visualization.",
    image: "/projects/project4.png",
    category: "Data Analytics",
    tags: ["React", "D3.js", "WebSockets", "Node.js"],
    demoUrl: "#",
    githubUrl: "#",
    icon: Layout,
  },
  {
    id: 5,
    title: "Automated Backup & Recovery Script",
    description: "A script to automate backups of critical data and restore them in case of failure. Essential for showcasing systems administration and scripting skills.",
    image: "/projects/project5.png",
    category: "Systems & Networking",
    tags: ["Bash", "Linux", "cron", "Automation"],
    demoUrl: "#",
    githubUrl: "#",
    icon: Terminal,
  },
  {
    id: 6,
    title: "Containerized Web Application",
    description: "A web application containerized with Docker, demonstrating knowledge of microservices architecture and deployment strategies.",
    image: "/projects/project6.png",
    category: "Full-Stack",
    tags: ["Docker", "React", "Node.js", "Nginx"],
    demoUrl: "#",
    githubUrl: "#",
    icon: Code,
  },
];

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [inView, setInView] = useState(false);

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
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      observer.observe(projectsSection);
    }
    return () => observer.disconnect();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allProjects.map((p) => p.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return allProjects;
    }
    return allProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Here are some of my recent projects, showcasing my skills as a Computer Systems Technology student at Seneca Polytechnic.
        </p>

        {/* Botones de filtro */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-down">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-4 py-2 rounded-full font-medium transition-all duration-300",
                activeFilter === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cuadrícula de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className={cn(
                  "group bg-card rounded-lg overflow-hidden shadow-xs card-hover transition-all duration-500",
                  inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground transition-all duration-300 group-hover:translate-y-[-2px] group-hover:scale-105"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                    {Icon && <Icon size={20} className="text-primary"/>}
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors duration-300"
                          aria-label="View live demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors duration-300"
                          aria-label="View GitHub repository"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground text-lg mt-12 animate-fade-in-up">
            No projects found in this category.
          </p>
        )}

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/machadop1407"
            aria-label="Check out my GitHub profile"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
