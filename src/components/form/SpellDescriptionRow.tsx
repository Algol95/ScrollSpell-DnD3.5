import { Label } from "../../components/ui/Label";
import { Textarea } from "../../components/ui/Textarea";

/**
 * Componente de fila para ingresar la descripción de un hechizo. Permite a los usuarios ingresar una descripción detallada del hechizo, con un límite de caracteres y un contador de caracteres restantes. El componente incluye una etiqueta, un área de texto y un contador de caracteres para ayudar a los usuarios a mantenerse dentro del límite permitido.
 * @param param0 Props del componente SpellDescriptionRow, incluyendo el valor, la función onChange, la longitud máxima y la longitud actual de la descripción.
 * @returns Elemento JSX que representa una fila de descripción de un hechizo.
 */
export function SpellDescriptionRow({
  value,
  onChange,
  maxLength,
  length,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength: number;
  length: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="description" className="text-foreground">
        Descripción *
      </Label>
      <Textarea
        id="description"
        value={value}
        onChange={onChange}
        placeholder="Una brillante estría sale de tu dedo apuntador hacia un punto que elijas..."
        required
        rows={4}
        maxLength={maxLength}
        className="bg-input border-border resize-none max-h-40 overflow-y-auto"
      />
      <div className="flex justify-end text-xs text-muted-foreground">
        {length}/{maxLength}
      </div>
    </div>
  );
}
