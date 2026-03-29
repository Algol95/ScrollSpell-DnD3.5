import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full py-6 mt-10 text-center text-xs text-muted-foreground border-t border-border bg-background/80 flex flex-col items-center gap-2">
      <span>
        &copy; {new Date().getFullYear()} Grimorio Arcano. Hecho por{" "}
        <a
          href="https://www.linkedin.com/in/angel-aragon"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
        >
          Ángel Aragón
        </a>
        . Inspirado en D&D 3.5. No oficial.
      </span>
      <div className="flex items-center gap-4 justify-center mb-1">
        <a
          href="https://www.linkedin.com/in/tu-linkedin" // Cambia por tu URL
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="h-5 w-5" />
        </a>
        <a
          href="https://github.com/tu-github" // Cambia por tu URL
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
          aria-label="GitHub"
        >
          <FaGithub className="h-5 w-5" />
        </a>
        <a
          href="https://tu-portfolio.com" // Cambia por tu URL
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
          aria-label="Portfolio"
        >
          <FaGlobe className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
