import { WandSparkles } from "lucide-react";
import { useTranslation } from "../i18n-utils";
/**
 * Componente que muestra consejos para el usuario sobre cómo usar la aplicación de grimorio de hechizos. Proporciona información útil sobre cómo organizar las páginas, seleccionar hechizos y mantener el grimorio dentro de las reglas oficiales de D&D 3.5.
 * @returns JSX.Element que representa la sección de consejos del Archimago.
 */
export function ArchmageTips() {
  const { messages } = useTranslation();

  return (
    <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-2">
        <WandSparkles className="inline-block mr-2 h-4 w-4" />
        {messages.tips.title}
      </h3>
      <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
        {messages.tips.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
