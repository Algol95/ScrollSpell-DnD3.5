import { Label } from "../../components/ui/Label";
import { Textarea } from "../../components/ui/Textarea";

/**
 * Componente de fila para ingresar la descripción de un hechizo. Permite a los usuarios ingresar una descripción detallada del hechizo, con un límite de caracteres y un contador de caracteres restantes. El componente incluye una etiqueta, un área de texto y un contador de caracteres para ayudar a los usuarios a mantenerse dentro del límite permitido.
 * @param param0 Props del componente SpellDescriptionRow, incluyendo el valor, la función onChange, la longitud máxima y la longitud actual de la descripción.
 * @returns Elemento JSX que representa una fila de descripción de un hechizo.
 */
import type { TextareaHTMLAttributes } from "react";

interface SpellDescriptionRowProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength: number;
  length: number;
}

export function SpellDescriptionRow({
  maxLength,
  length,
  placeholder = "",
  ...textareaProps
}: SpellDescriptionRowProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="description" className="text-foreground">
        Descripción *
      </Label>
      <Textarea
        id="description"
        required
        rows={4}
        maxLength={maxLength}
        className="bg-input border-border resize-none max-h-40 overflow-y-auto"
        placeholder={placeholder}
        {...textareaProps}
      />
      <div className="flex justify-end text-xs text-muted-foreground">
        {length}/{maxLength}
      </div>
    </div>
  );
}
