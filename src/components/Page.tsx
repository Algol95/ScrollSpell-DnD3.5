import type { SpellbookPage as SpellbookPageType } from "../../lib/types";
import { Card } from "./Card";
import { Glyph } from "./Glyph";
import { Trash2 } from "lucide-react";
import { Button } from "../components/ui/Button";

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
  const spell = page.spells[0];

  return (
    <div
      className="relative bg-parchment rounded-sm shadow-lg overflow-hidden group/page"
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
      {/* Magic Glyph Background */}
      {spell && <Glyph level={spell.level} school={spell.school} />}

      {/* Delete page button */}
      {!isPrintMode && onDeletePage && !spell && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover/page:opacity-100 transition-opacity bg-destructive/90 text-destructive-foreground hover:bg-destructive rounded-full z-10"
          onClick={(e) => {
            e.stopPropagation();
            onDeletePage(page.id);
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      )}

      {/* Decorative border */}
      <div className="absolute inset-3 border-2 border-ink/10 rounded-sm pointer-events-none" />
      <div className="absolute inset-4 border border-ink/5 rounded-sm pointer-events-none" />

      {/* Corner decorations */}
      <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-gold/40" />
      <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-gold/40" />
      <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-gold/40" />
      <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-gold/40" />

      {/* Page number */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-ink/40 font-serif italic z-10">
        &#x2014; {page.pageNumber} &#x2014;
      </div>

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col z-10">
        {/* Page header */}
        <div className="text-center mb-4">
          <div className="inline-block">
            <span className="text-lg text-gold">&#x2726;</span>
            <span className="mx-2 text-xs font-semibold text-ink/50 uppercase tracking-[0.2em]">
              {title}
            </span>
            <span className="text-lg text-gold">&#x2726;</span>
          </div>
          <div className="mt-1 mx-auto w-24 h-px bg-linear-to-r from-transparent via-ink/20 to-transparent" />
        </div>

        {/* Spell Content - Full page */}
        <div className="flex-1 flex flex-col">
          {!spell ? (
            <div className="flex-1 flex flex-col items-center justify-center text-ink/30">
              <span className="text-4xl mb-3">&#x1F4DC;</span>
              <p className="text-sm italic font-serif text-center">
                Esta pagina aguarda los secretos arcanos...
              </p>
              <p className="text-xs mt-1 font-serif">
                Inscribe tu primer hechizo
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
