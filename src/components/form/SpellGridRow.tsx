import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";

/**
 * Componente de fila para ingresar dos valores de texto para un hechizo. Permite a los usuarios ingresar información como el tiempo de lanzamiento y el alcance, los componentes y la duración, etc. El componente incluye etiquetas y campos de entrada para ambos valores.
 * @param param0 Props del componente SpellGridRow, incluyendo los ids, etiquetas, valores, funciones onChange y placeholders para los campos izquierdo y derecho.
 * @returns Elemento JSX que representa una fila de entrada de texto para un hechizo con dos columnas.
 */
export function SpellGridRow({
  leftId,
  leftLabel,
  leftValue,
  leftOnChange,
  leftPlaceholder,
  rightId,
  rightLabel,
  rightValue,
  rightOnChange,
  rightPlaceholder,
}: {
  leftId: string;
  leftLabel: string;
  leftValue: string;
  leftOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftPlaceholder?: string;
  rightId: string;
  rightLabel: string;
  rightValue: string;
  rightOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightPlaceholder?: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor={leftId} className="text-foreground">
          {leftLabel}
        </Label>
        <Input
          id={leftId}
          value={leftValue}
          onChange={leftOnChange}
          placeholder={leftPlaceholder}
          className="bg-input border-border"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={rightId} className="text-foreground">
          {rightLabel}
        </Label>
        <Input
          id={rightId}
          value={rightValue}
          onChange={rightOnChange}
          placeholder={rightPlaceholder}
          className="bg-input border-border"
        />
      </div>
    </div>
  );
}
