import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { useTranslation } from "../i18n-utils";

export function Footer() {
  const { messages } = useTranslation();

  return (
    <footer className="w-full py-6 mt-10 text-center text-xs text-muted-foreground border-t border-border bg-background/80 flex flex-col items-center gap-2">
      <p>{messages.footer.disclaimer}</p>
      <p>
        &copy; {new Date().getFullYear()} {messages.header.defaultTitle}.{" "}
        {messages.footer.madeByPrefix}{" "}
        <a
          href="https://www.linkedin.com/in/angel-dev-aragon"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors text-accent uppercase"
        >
          Ángel Aragón
        </a>
        . {messages.footer.inspiredBy}
      </p>
      <div className="flex items-center gap-4 justify-center mb-1">
        <a
          href="https://www.linkedin.com/in/angel-dev-aragon"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
          aria-label={messages.footer.linkedin}
        >
          <FaLinkedin className="h-5 w-5" />
        </a>
        <a
          href="https://github.com/Algol95"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors"
          aria-label={messages.footer.github}
        >
          <FaGithub className="h-5 w-5" />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold transition-colors hidden"
          aria-label={messages.footer.portfolio}
        >
          <FaGlobe className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
