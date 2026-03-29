import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";

/**
 * Componente de fila para ingresar dos valores de texto para un hechizo. Permite a los usuarios ingresar información como el tiempo de lanzamiento y el alcance, los componentes y la duración, etc. El componente incluye etiquetas y campos de entrada para ambos valores.
 * @param param0 Props del componente SpellGridRow, incluyendo los ids, etiquetas, valores, funciones onChange y placeholders para los campos izquierdo y derecho.
 * @returns Elemento JSX que representa una fila de entrada de texto para un hechizo con dos columnas.
 */
import type { InputHTMLAttributes } from "react";

interface SpellGridRowProps {
  leftId: string;
  leftLabel: string;
  leftInputProps?: InputHTMLAttributes<HTMLInputElement>;
  rightId: string;
  rightLabel: string;
  rightInputProps?: InputHTMLAttributes<HTMLInputElement>;
}

export function SpellGridRow({
  leftId,
  leftLabel,
  leftInputProps = {},
  rightId,
  rightLabel,
  rightInputProps = {},
}: SpellGridRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor={leftId} className="text-foreground">
          {leftLabel}
        </Label>
        <Input
          id={leftId}
          className="bg-input border-border"
          {...leftInputProps}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={rightId} className="text-foreground">
          {rightLabel}
        </Label>
        <Input
          id={rightId}
          className="bg-input border-border"
          {...rightInputProps}
        />
      </div>
    </div>
  );
}
