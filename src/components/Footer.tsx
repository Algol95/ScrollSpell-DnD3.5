import { Heart, Sparkles } from "lucide-react";
import {
  FaDiscord,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaPaypal,
  FaTwitch,
} from "react-icons/fa";
import { useTranslation } from "../i18n-utils";

const PAYPAL_DONATION_URL =
  "https://www.paypal.com/donate/?hosted_button_id=QJN5GC68D6S2C";

export function Footer() {
  const { messages } = useTranslation();
  const hasPaypalLink = PAYPAL_DONATION_URL.trim().length > 0;

  return (
    <footer className="mt-14 border-t border-gold/15 bg-linear-to-b from-background via-card/60 to-background">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-stretch">
          <section className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm p-6 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.28em] text-gold/80">
                  {messages.meta.appName}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground sm:text-xl">
                  {messages.footer.projectTitle}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {messages.footer.disclaimer}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com/in/angel-dev-aragon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground transition hover:border-gold/40 hover:text-gold"
                aria-label={messages.footer.linkedin}
              >
                <FaLinkedin className="h-4 w-4" />
                <span>{messages.footer.linkedin}</span>
              </a>
              <a
                href="https://github.com/Algol95"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground transition hover:border-gold/40 hover:text-gold"
                aria-label={messages.footer.github}
              >
                <FaGithub className="h-4 w-4" />
                <span>{messages.footer.github}</span>
              </a>
              <a
                href="https://www.twitch.tv/gayspervt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground transition hover:border-gold/40 hover:text-gold"
                aria-label={messages.footer.twitch}
              >
                <FaTwitch className="h-4 w-4" />
                <span>{messages.footer.twitch}</span>
              </a>
              <a
                href="https://discord.gg/a4pFwRxcPx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground transition hover:border-gold/40 hover:text-gold"
                aria-label={messages.footer.discord}
              >
                <FaDiscord className="h-4 w-4" />
                <span>{messages.footer.discord}</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-foreground transition hover:border-gold/40 hover:text-gold"
                aria-label={messages.footer.portfolio}
              >
                <FaGlobe className="h-4 w-4" />
                <span>{messages.footer.portfolio}</span>
              </a>
            </div>

            <div className="mt-6 border-t border-border/80 pt-5 text-sm text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} {messages.header.defaultTitle}
                . {messages.footer.madeByPrefix}{" "}
                <a
                  href="https://www.linkedin.com/in/angel-dev-aragon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent transition hover:text-gold"
                >
                  Ángel Aragón
                </a>
                . {messages.footer.inspiredBy}
              </p>
            </div>
          </section>

          <aside className="rounded-2xl border border-[#1b4f9c]/25 bg-linear-to-br from-[#0a2540] via-[#102f4f] to-[#183b63] p-6 text-white shadow-[0_14px_45px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#7cc5ff]">
                <FaPaypal className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#9fcbff]">
                  PayPal
                </p>
                <h3 className="text-lg font-semibold">
                  {messages.footer.donateTitle}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-200">
              {messages.footer.donateDescription}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-slate-200">
              <Heart className="h-4 w-4 text-[#7cc5ff]" />
              <span>{messages.footer.donateHint}</span>
            </div>

            {hasPaypalLink ? (
              <a
                href={PAYPAL_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffc439] px-4 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#ffcf5a]"
              >
                <FaPaypal className="h-4 w-4" />
                <span>{messages.footer.donateAction}</span>
              </a>
            ) : (
              <div className="mt-6 rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-slate-200">
                {messages.footer.donatePending}
              </div>
            )}
          </aside>
        </div>
      </div>
    </footer>
  );
}
