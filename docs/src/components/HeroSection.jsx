import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const typingSpeed = 80;
const deletingSpeed = 50;
const pauseAfterTyping = 1500;
const pauseAfterDelete = 800;

const useTypingEffect = (phrases) => {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      const speed = isDeleting ? deletingSpeed : typingSpeed;

      setTypedText(
        currentPhrase.substring(0, isDeleting ? typedText.length - 1 : typedText.length + 1)
      );

      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), pauseAfterTyping);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex, phrases]);

  return typedText;
};

const fullGreeting = "Hi, I'm Santiago.";
const jobTitles = [
  "Web Developer.",
  "Systems Engineer.",
  "IT Student.",
  "Network Analyst.",
  "Colombian in Canada.",
  "Enthusiastic.",
  "Adaptable.",
  "Lifelong Learner.",
];

export const HeroSection = () => {
  const [typedGreeting, setTypedGreeting] = useState("");
  const [showJobTitle, setShowJobTitle] = useState(false);
  const [greetingComplete, setGreetingComplete] = useState(false);
  const typedJobTitle = useTypingEffect(jobTitles);

  useEffect(() => {
    if (!greetingComplete) {
      if (typedGreeting.length < fullGreeting.length) {
        const timer = setTimeout(() => {
          setTypedGreeting(fullGreeting.substring(0, typedGreeting.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        setGreetingComplete(true);
        setTimeout(() => setShowJobTitle(true), pauseAfterTyping);
      }
    }
  }, [typedGreeting, greetingComplete]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground animate-fade-in-down">
            <span className="text-glow">
              {typedGreeting}
              <span className="inline-block w-1 h-10 ml-1 bg-primary animate-pulse-fast"></span>
            </span>
          </h1>

          <h2
            className={cn(
              "text-xl md:text-2xl font-semibold text-muted-foreground mt-4 h-8",
              showJobTitle ? "opacity-100 animate-fade-in-up" : "opacity-0"
            )}
          >
            I'm a{" "}
            <span className="text-primary font-bold">
              {typedJobTitle}
            </span>
            <span className="inline-block w-1 h-6 ml-1 bg-primary animate-pulse-fast"></span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay">
            I’m an aspiring IT professional from Colombia currently in Toronto, Canada who’s genuinely fascinated by technology and how it connects people. I love helping others solve problems, whether it’s fixing a computer glitch or making tech feel less intimidating.
          </p>

          <div className="pt-4 animate-fade-in-up-delay-2">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
