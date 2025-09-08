import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Briefcase, Code, User, Rocket, ChevronRight, ChevronLeft } from "lucide-react";

// Array de fotos personales (reemplaza con las tuyas)
const photos = [
  "/images/santi1.jpeg", // Reemplaza con tus propias fotos en la carpeta /public
];

// Datos para las tarjetas de habilidades
const skillsData = [
  {
    icon: Code,
    title: "Web Development",
    description: "Creating responsive websites and web applications with modern frameworks.",
  },
  {
    icon: User,
    title: "UI/UX Design",
    description: "Designing intuitive user interfaces and seamless user experiences.",
  },
  {
    icon: Briefcase,
    title: "Project Management",
    description: "Leading projects from conception to completion with agile methodologies.",
  },
  {
    icon: Rocket,
    title: "Systems & Networking",
    description: "Managing and troubleshooting Windows, Linux, and macOS systems and networks.",
  },
];

export const AboutSection = () => {
  const [inView, setInView] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Efecto para la animación de entrada al hacer scroll
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
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      observer.observe(aboutSection);
    }
    return () => observer.disconnect();
  }, []);

  // Efecto para el cambio de fotos en la galería
  useEffect(() => {
    const photoInterval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);
    return () => clearInterval(photoInterval);
  }, []);

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Me</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={cn(
              "space-y-6 transition-all duration-1000 transform",
              inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            )}
          >
            {/* Galería de fotos personal */}
            <div className="pt-4 mx-auto md:mx-0">
              <div
                className="w-full aspect-square max-w-sm rounded-xl overflow-hidden relative border-4 border-primary/20 shadow-lg group"
                style={{ background: 'linear-gradient(45deg, var(--background), var(--card), var(--background))' }} // Degradado de fondo
              >
                <img
                  src={photos[currentPhotoIndex]}
                  alt="Personal photo of Santiago"
                  className="w-full h-full object-contain transition-opacity duration-500" // object-contain
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm font-semibold">
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <span className="bg-white/20 px-3 py-1 rounded-full">{currentPhotoIndex + 1} / {photos.length}</span>
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              I'm Santiago Delgado, a passionate Computer Systems Technology student at Seneca Polytechnic. My expertise lies in systems engineering and web development, with a strong foundation in managing and troubleshooting hardware and networks. My skills span various operating systems, including Windows, Linux, and macOS, and I'm proficient in virtualization technologies like VirtualBox and VMware.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not immersed in tech, you'll often find me swimming, running or cooking. It’s my way of clearing my mind and staying active, balancing the technical demands of my studies with a healthy lifestyle.
            </p>

            <div
              className={cn(
                "flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start transition-all duration-1000 delay-300 transform",
                inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
            >
              <a href="#contact" className="cosmic-button" aria-label="Get in touch">
                Get In Touch
              </a>
              <a
                href="/your-cv.pdf"
                download
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                aria-label="Download CV"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {skillsData.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "gradient-border p-6 card-hover transition-all duration-1000 transform",
                    inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  role="listitem"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-lg">{skill.title}</h4>
                      <p className="text-muted-foreground">{skill.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
