import { useEffect } from "react";
import type { SpellbookPage as PageType } from "../../lib/types";

const STORAGE_KEY = "grimorio_arcano_data";

/**
 * Hook personalizado para guardar el estado del grimorio de hechizos en el almacenamiento local del navegador. Permite persistir el título y las páginas del grimorio para que los usuarios puedan recuperar su progreso incluso después de cerrar la aplicación. El hook utiliza useEffect para actualizar el almacenamiento local cada vez que cambian el título, las páginas o el estado de carga.
 * @param param0 Objeto con el título, las páginas y el estado de carga del grimorio de hechizos.
 * @returns void
 */
export function useSpellbookStorage({
  title,
  pages,
  isLoaded,
}: {
  title: string;
  pages: PageType[];
  isLoaded: boolean;
}) {
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ title, pages }));
      } catch (e) {
        console.error("Error saving to localStorage:", e);
      }
    }
  }, [title, pages, isLoaded]);
}
