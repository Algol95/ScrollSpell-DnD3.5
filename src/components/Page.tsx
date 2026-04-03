import type { SpellbookPage as SpellbookPageType } from "../../lib/types";
import { Card } from "./Card";
import { Glyph } from "./Glyph";
import { Trash2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useTranslation } from "../i18n-utils";

interface PageProps {
  page: SpellbookPageType;
  title: string;
  onDeleteSpell?: (pageId: string, spellId: string) => void;
  onDeletePage?: (pageId: string) => void;
  isPrintMode?: boolean;
}

/**
 * Componente que representa una página de un libro de hechizos, mostrando un glifo mágico, contenido del hechizo y opciones de eliminación.
 * @param param0 Props del componente Page, incluyendo la página, el título, y funciones de manejo de eliminación.
 * @returns Elemento JSX que representa la página del libro de hechizos.
 */
export function Page({
  page,
  title,
  onDeleteSpell,
  onDeletePage,
  isPrintMode = false,
}: PageProps) {
  const { messages } = useTranslation();
  const spell = page.spells[0];

  return (
    <div
      className="relative bg-parchment rounded-sm shadow-lg overflow-hidden group/page grimorio-page"
      style={{
        aspectRatio: "210 / 297",
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px),
          radial-gradient(ellipse at center, transparent 0%, rgba(139, 119, 101, 0.15) 100%)
        `,
        backgroundSize: "20px 20px, 20px 20px, 100% 100%",
      }}
    >
      {spell && <Glyph level={spell.level} school={spell.school} />}

      {!isPrintMode && onDeletePage && !spell && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 bg-destructive/90 text-destructive-foreground hover:bg-destructive rounded-full z-20 opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onDeletePage(page.id);
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      )}

      <div className="absolute inset-3 border-2 border-ink/10 rounded-sm pointer-events-none" />
      <div className="absolute inset-4 border border-ink/5 rounded-sm pointer-events-none" />

      <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-gold/40" />
      <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-gold/40" />
      <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-gold/40" />
      <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-gold/40" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-ink/40 italic z-10 font-fondamento font-bold">
        &#x2014; {page.pageNumber} &#x2014;
      </div>
      <div
        className={`absolute bottom-6 right-6 text-ink/30 z-10 select-none px-2 italic ${
          isPrintMode ? "text-[12px]" : "text-[5px] lg:text-sm"
        }`}
      >
        {messages.page.generatedWith}{" "}
        <a
          href="https://spellbookgenerator.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gold/80"
        >
          spellbookgenerator.netlify.app
        </a>
      </div>

      <div className="relative p-6 h-full flex flex-col z-10">
        <div className="text-center mb-4">
          <div className="inline-block">
            <span className="text-lg text-gold">&#x2726;</span>
            <span className="mx-2 font-semibold text-ink/50 uppercase tracking-widest font-fondamento">
              {title}
            </span>
            <span className="text-lg text-gold">&#x2726;</span>
          </div>
          <div className="mt-1 mx-auto w-24 h-px bg-linear-to-r from-transparent via-ink/20 to-transparent" />
        </div>

        <div className="flex-1 flex flex-col">
          {!spell ? (
            <div className="flex-1 flex flex-col items-center justify-center text-ink/30">
              <span className="text-4xl mb-3">&#x1F4DC;</span>
              <p className="text-sm italic font-serif text-center">
                {messages.page.emptyTitle}
              </p>
              <p className="text-xs mt-1 font-serif italic">
                {messages.page.emptySubtitle}
              </p>
            </div>
          ) : (
            <Card
              spell={spell}
              onDelete={
                onDeleteSpell
                  ? (spellId) => onDeleteSpell(page.id, spellId)
                  : undefined
              }
              isPrintMode={isPrintMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
