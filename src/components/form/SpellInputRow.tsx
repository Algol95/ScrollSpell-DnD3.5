import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/Input";

/**
 * Componente de fila para ingresar un valor de texto para un hechizo. Permite a los usuarios ingresar información como el nombre del hechizo, componentes, duración, etc. El componente incluye una etiqueta y un campo de entrada, y puede marcarse como obligatorio si es necesario.
 * @param param0 Props del componente SpellInputRow, incluyendo el id, la etiqueta, el valor, la función onChange, el placeholder y si es obligatorio.
 * @returns Elemento JSX que representa una fila de entrada de texto para un hechizo.
 */
import type { InputHTMLAttributes } from "react";

interface SpellInputRowProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  required?: boolean;
}

export function SpellInputRow({
  id,
  label,
  required = false,
  ...inputProps
}: SpellInputRowProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-foreground">
        {label}
        {required ? " *" : null}
      </Label>
      <Input
        id={id}
        required={required}
        className="bg-input border-border"
        {...inputProps}
      />
    </div>
  );
}
