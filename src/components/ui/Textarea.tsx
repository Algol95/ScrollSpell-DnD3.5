import * as React from "react";

import { cn } from "../../../lib/utils";

/**
 * Textarea component for form elements. Utiliza Tailwind CSS para el estilo y permite personalizar su apariencia mediante la prop className.
 * @param param0 Props del componente Textarea, incluyendo className y otras props estándar de un textarea HTML.
 * @returns Elemento JSX que representa el textarea estilizado.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
