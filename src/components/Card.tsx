"use client";

import type { Spell } from "../../lib/types";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/Button";

interface CardProps {
  spell: Spell;
  onDelete?: (id: string) => void;
  isPrintMode?: boolean;
}

/**
 * Componente de tarjeta de hechizo que muestra la información detallada de un hechizo, incluyendo nombre, escuela, nivel, tiempo de lanzamiento, alcance, componentes, duración, objetivo/área, salvación y resistencia a conjuros. Permite eliminar el hechizo si se proporciona la función onDelete y no está en modo de impresión.
 * @param param0 Props del componente Card, incluyendo el hechizo, la función para eliminar el hechizo y el estado de modo de impresión.
 * @returns Elemento JSX que representa la tarjeta de hechizo.
 */
export function Card({ spell, onDelete, isPrintMode = false }: CardProps) {
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
      <div className="text-center pb-3 mb-3 border-b-2 border-stone-400/30">
        <h3 className="font-extrabold text-ink text-2xl leading-tight font-fondamento italic">
          {spell.name}
        </h3>
        {spell.subtitle && (
          <h4 className="text-ink/50 text-xs font-fondamento italic mt-0.5">
            {spell.subtitle}
          </h4>
        )}
        <p className="italic text-ink/60 mt-1 text-sm font-fondamento">
          {spell.school} - Nivel {spell.level}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-ink/90 mb-3 text-xs">
        <div>
          <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide font-fondamento">
            Tiempo
          </span>
          <p className="mt-0.5 font-moon-dance font-bold text-xl">
            {spell.castingTime}
          </p>
        </div>
        <div>
          <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide font-fondamento">
            Alcance
          </span>
          <p className="mt-0.5 font-moon-dance font-bold text-xl">
            {spell.range}
          </p>
        </div>
        <div>
          <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide font-fondamento">
            Componentes
          </span>
          <p className="mt-0.5 font-moon-dance font-bold text-xl">
            {spell.components}
          </p>
        </div>
        <div>
          <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide font-fondamento">
            Duracion
          </span>
          <p className="mt-0.5 font-moon-dance font-bold text-xl">
            {spell.duration}
          </p>
        </div>
        {spell.target && (
          <div className="col-span-2">
            <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide font-fondamento">
              Objetivo/Area
            </span>
            <p className="mt-0.5 font-moon-dance font-bold text-xl">
              {spell.target}
            </p>
          </div>
        )}
        {(spell.savingThrow || spell.spellResistance) && (
          <>
            {spell.savingThrow && (
              <div>
                <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide font-fondamento">
                  Salvacion
                </span>
                <p className="mt-0.5 font-moon-dance font-bold text-xl">
                  {spell.savingThrow}
                </p>
              </div>
            )}
            {spell.spellResistance && (
              <div>
                <span className="font-semibold text-ink/50 uppercase text-[10px] tracking-wide font-fondamento">
                  R. Conjuros
                </span>
                <p className="mt-0.5 font-moon-dance text-xl font-bold">
                  {spell.spellResistance}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Divider */}
      <div className="my-2 mx-auto w-16 h-px bg-linear-to-r from-transparent via-ink/20 to-transparent" />

      {/* Notas del Mago */}
      <div className="flex-1">
        <h4 className="font-semibold text-ink/50 mb-1 text-[10px] uppercase tracking-wide font-fondamento">
          Notas del Mago
        </h4>
        <p className="text-ink/80 leading-relaxed font-moon-dance whitespace-pre-line text-xl font-bold">
          {spell.description}
        </p>
      </div>

      {/* Indicador de nivel eliminado para que al pie solo se muestre el número de página. */}
    </div>
  );
}
