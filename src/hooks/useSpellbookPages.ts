import { useState, useEffect, useCallback } from "react";
import type { Spell, SpellbookPage as PageType } from "../../lib/types";

// Generador UUID compatible universal
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const createEmptyPage = (pageNumber: number): PageType => ({
  id: uuidv4(),
  pageNumber,
  spells: [],
});

/**
 * Función para cargar el estado del grimorio de hechizos desde el almacenamiento local del navegador. Devuelve los datos almacenados si existen, o null si no se encuentran.
 * @returns Objeto con el título y las páginas del grimorio, o null si no hay datos almacenados.
 */
const loadFromStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("grimorio_arcano_data");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error loading from localStorage:", e);
  }
  return null;
};

/**
 * Hook personalizado para gestionar las páginas del grimorio de hechizos. Proporciona funciones para agregar, actualizar y eliminar hechizos, así como para manejar la navegación entre páginas y el título del grimorio. También calcula el número de páginas teóricas basadas en los niveles de los hechizos y verifica si se ha excedido el límite teórico.
 * @returns Objeto con el estado y las funciones para gestionar el grimorio de hechizos.
 */
export function useSpellbookPages() {
  const stored = loadFromStorage();
  const [pages, setPages] = useState<PageType[]>(
    stored && stored.pages.length > 0 ? stored.pages : [createEmptyPage(1)],
  );
  const [title, setTitle] = useState(stored ? stored.title : "Grimorio Arcano");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingSpell, setEditingSpell] = useState<{
    pageId: string;
    spell: Spell;
  } | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const theoreticalPages = pages.reduce(
    (acc, page) =>
      acc +
      page.spells.reduce((sum, spell) => sum + Math.max(1, spell.level), 0),
    0,
  );
  const maxTheoreticalPages = 100;
  const isOverTheoreticalLimit = theoreticalPages > maxTheoreticalPages;

  const handleAddSpell = useCallback(
    (spell: Spell) => {
      setPages((prev) => {
        const newPages = [...prev];
        const targetPage = newPages[currentPageIndex];
        if (targetPage.spells.length >= 1) {
          const newPage = createEmptyPage(newPages.length + 1);
          newPage.spells.push(spell);
          newPages.push(newPage);
          setTimeout(() => setCurrentPageIndex(newPages.length - 1), 0);
        } else {
          targetPage.spells.push(spell);
        }
        return newPages;
      });
      setEditingSpell(null);
    },
    [currentPageIndex],
  );

  const handleUpdateSpell = useCallback(
    (pageId: string, updatedSpell: Spell) => {
      setPages((prev) =>
        prev.map((page) =>
          page.id === pageId
            ? {
                ...page,
                spells: page.spells.map((s) =>
                  s.id === updatedSpell.id ? updatedSpell : s,
                ),
              }
            : page,
        ),
      );
      setEditingSpell(null);
    },
    [],
  );

  const handleDeleteSpell = useCallback((pageId: string, spellId: string) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === pageId
          ? { ...page, spells: page.spells.filter((s) => s.id !== spellId) }
          : page,
      ),
    );
    setEditingSpell((current) =>
      current && current.pageId === pageId && current.spell.id === spellId
        ? null
        : current,
    );
  }, []);

  const handleAddPage = useCallback(() => {
    setPages((prev) => {
      const newPages = [...prev, createEmptyPage(prev.length + 1)];
      setCurrentPageIndex(newPages.length - 1);
      return newPages;
    });
  }, []);

  const handleDeletePage = useCallback((pageId: string) => {
    setPages((prev) => {
      if (prev.length <= 1) return prev;
      const deleteIndex = prev.findIndex((p) => p.id === pageId);
      if (deleteIndex === -1) return prev;
      setCurrentPageIndex((prevIndex) => {
        if (prevIndex === deleteIndex) {
          return deleteIndex === 0 ? 0 : prevIndex - 1;
        }
        if (prevIndex > deleteIndex) return prevIndex - 1;
        return prevIndex;
      });
      setEditingSpell((current) => {
        if (
          current &&
          prev[deleteIndex] &&
          current.pageId === prev[deleteIndex].id
        ) {
          return null;
        }
        return current;
      });
      const newPages = prev
        .filter((p) => p.id !== pageId)
        .map((page, idx) => ({ ...page, pageNumber: idx + 1 }));
      return newPages;
    });
  }, []);

  const handlePageChange = useCallback(
    (pageNum: number) => {
      if (pageNum >= 1 && pageNum <= pages.length) {
        setCurrentPageIndex(pageNum - 1);
      }
    },
    [pages.length],
  );

  return {
    pages,
    setPages,
    currentPageIndex,
    setCurrentPageIndex,
    editingSpell,
    setEditingSpell,
    handleAddSpell,
    handleUpdateSpell,
    handleDeleteSpell,
    handleAddPage,
    handleDeletePage,
    handlePageChange,
    isLoaded,
    title,
    setTitle,
    theoreticalPages,
    maxTheoreticalPages,
    isOverTheoreticalLimit,
  };
}
