import { ArrowUp } from "lucide-react";


export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-12 pt-8 pb-8 px-6 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Built and Designed by Santiago Delgado. All rights reserved.
      </p>
      <a
        href="#hero"
        aria-label="Back to top"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex items-center justify-center shadow-sm"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};

