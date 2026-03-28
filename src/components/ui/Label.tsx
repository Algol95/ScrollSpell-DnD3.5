import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../../lib/utils";

/**
 * Label component for form elements. Utiliza Radix UI para la accesibilidad y Tailwind CSS para el estilo. Permite personalizar su apariencia mediante la prop className y se integra fácilmente con otros componentes de formulario.
 * @param param0 Props del componente Label, incluyendo className y otras props estándar de un label HTML.
 * @returns Elemento JSX que representa el label estilizado.
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
