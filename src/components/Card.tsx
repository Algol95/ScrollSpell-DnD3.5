"use client";

import type { Spell } from "../../lib/types";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/Button";

interface CardProps {
  spell: Spell;
  onDelete?: (id: string) => void;
  isPrintMode?: boolean;
}

const levelColors: Record<number, string> = {
  0: "border-stone-400/30",
  1: "border-emerald-600/30",
  2: "border-sky-600/30",
  3: "border-violet-600/30",
  4: "border-amber-600/30",
  5: "border-rose-600/30",
  6: "border-indigo-600/30",
  7: "border-fuchsia-600/30",
  8: "border-orange-600/30",
  9: "border-red-700/40",
};

/**
 * Componente de tarjeta de hechizo que muestra la información detallada de un hechizo, incluyendo nombre, escuela, nivel, tiempo de lanzamiento, alcance, componentes, duración, objetivo/área, salvación y resistencia a conjuros. Permite eliminar el hechizo si se proporciona la función onDelete y no está en modo de impresión.
 * @param param0 Props del componente Card, incluyendo el hechizo, la función para eliminar el hechizo y el estado de modo de impresión.
 * @returns Elemento JSX que representa la tarjeta de hechizo.
 */
export function Card({ spell, onDelete, isPrintMode = false }: CardProps) {
  const borderColor = levelColors[spell.level] || levelColors[0];

  return (
    <div className="relative group w-full h-full flex flex-col">
      {!isPrintMode && onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full z-20 shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(spell.id);
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      )}

      {/* Header */}
      <div className={`text-center pb-3 mb-3 border-b-2 ${borderColor}`}>
        <h3 className="font-sans font-bold text-ink text-xl leading-tight">
          {spell.name}
        </h3>
        <p className="italic text-ink/60 mt-1 text-sm font-serif">
          {spell.school} - Nivel {spell.level}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-ink/90 mb-3 text-xs">
        <div>
          <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide">
            Tiempo
          </span>
          <p className="mt-0.5 font-serif">{spell.castingTime}</p>
        </div>
        <div>
          <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide">
            Alcance
          </span>
          <p className="mt-0.5 font-serif">{spell.range}</p>
        </div>
        <div>
          <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide">
            Componentes
          </span>
          <p className="mt-0.5 font-serif">{spell.components}</p>
        </div>
        <div>
          <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide">
            Duracion
          </span>
          <p className="mt-0.5 font-serif">{spell.duration}</p>
        </div>
        {spell.target && (
          <div className="col-span-2">
            <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide">
              Objetivo/Area
            </span>
            <p className="mt-0.5 font-serif">{spell.target}</p>
          </div>
        )}
        {(spell.savingThrow || spell.spellResistance) && (
          <>
            {spell.savingThrow && (
              <div>
                <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide">
                  Salvacion
                </span>
                <p className="mt-0.5 font-serif">{spell.savingThrow}</p>
              </div>
            )}
            {spell.spellResistance && (
              <div>
                <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide">
                  R. Conjuros
                </span>
                <p className="mt-0.5 font-serif">{spell.spellResistance}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Divider */}
      <div className="my-2 mx-auto w-16 h-px bg-linear-to-r from-transparent via-ink/20 to-transparent" />

      {/* Description */}
      <div className="flex-1">
        <h4 className="font-semibold text-ink/50 mb-1 text-[10px] uppercase tracking-wide">
          Descripcion
        </h4>
        <p className="text-ink/80 leading-relaxed font-serif text-sm">
          {spell.description}
        </p>
      </div>

      {/* Indicador de nivel eliminado para que al pie solo se muestre el número de página. */}
    </div>
  );
}
