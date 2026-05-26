import { useState, useEffect, useCallback, type SetStateAction } from "react";
import type { Spell, SpellbookPage as PageType } from "../../lib/types";

const STORAGE_KEY = "grimorio_arcano_data";

interface StoredSpellbook {
  id: string;
  title: string;
  pages: PageType[];
}

interface StoredSpellbookCollection {
  activeSpellbookId: string;
  spellbooks: StoredSpellbook[];
}

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

const normalizePages = (pages: PageType[] | undefined) => {
  if (!pages || pages.length === 0) {
    return [createEmptyPage(1)];
  }

  return pages.map((page, index) => ({
    ...page,
    pageNumber: index + 1,
    spells: Array.isArray(page.spells) ? page.spells : [],
  }));
};

const createSpellbook = (title: string): StoredSpellbook => ({
  id: uuidv4(),
  title,
  pages: [createEmptyPage(1)],
});

const createInitialCollection = (
  defaultTitle: string,
): StoredSpellbookCollection => {
  const spellbook = createSpellbook(defaultTitle);

  return {
    activeSpellbookId: spellbook.id,
    spellbooks: [spellbook],
  };
};

const parseStoredSpellbook = (
  value: unknown,
  defaultTitle: string,
): StoredSpellbook | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<StoredSpellbook>;
  const title =
    typeof candidate.title === "string" && candidate.title.trim()
      ? candidate.title.trim()
      : defaultTitle;

  return {
    id:
      typeof candidate.id === "string" && candidate.id.trim()
        ? candidate.id
        : uuidv4(),
    title,
    pages: normalizePages(
      Array.isArray(candidate.pages)
        ? (candidate.pages as PageType[])
        : undefined,
    ),
  };
};

/**
 * Función para cargar el estado del grimorio de hechizos desde el almacenamiento local del navegador. Devuelve los datos almacenados si existen, o null si no se encuentran.
 * @returns Objeto con el título y las páginas del grimorio, o null si no hay datos almacenados.
 */
const loadFromStorage = (defaultTitle: string): StoredSpellbookCollection => {
  if (typeof window === "undefined") {
    return createInitialCollection(defaultTitle);
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(
        stored,
      ) as Partial<StoredSpellbookCollection> & {
        title?: string;
        pages?: PageType[];
      };

      if (Array.isArray(parsed.spellbooks)) {
        const spellbooks = parsed.spellbooks
          .map((spellbook) => parseStoredSpellbook(spellbook, defaultTitle))
          .filter(
            (spellbook): spellbook is StoredSpellbook => spellbook !== null,
          );

        if (spellbooks.length > 0) {
          const hasActiveSpellbook = spellbooks.some(
            (spellbook) => spellbook.id === parsed.activeSpellbookId,
          );

          return {
            activeSpellbookId: hasActiveSpellbook
              ? (parsed.activeSpellbookId as string)
              : spellbooks[0].id,
            spellbooks,
          };
        }
      }

      const legacySpellbook = parseStoredSpellbook(
        {
          title: parsed.title,
          pages: parsed.pages,
        },
        defaultTitle,
      );

      if (legacySpellbook) {
        return {
          activeSpellbookId: legacySpellbook.id,
          spellbooks: [legacySpellbook],
        };
      }
    }
  } catch (e) {
    console.error("Error loading from localStorage:", e);
  }

  return createInitialCollection(defaultTitle);
};

/**
 * Hook personalizado para gestionar las páginas del grimorio de hechizos. Proporciona funciones para agregar, actualizar y eliminar hechizos, así como para manejar la navegación entre páginas y el título del grimorio. También calcula el número de páginas teóricas basadas en los niveles de los hechizos y verifica si se ha excedido el límite teórico.
 * @returns Objeto con el estado y las funciones para gestionar el grimorio de hechizos.
 */
export function useSpellbookPages(defaultTitle: string) {
  const stored = loadFromStorage(defaultTitle);
  const [spellbooks, setSpellbooks] = useState<StoredSpellbook[]>(
    stored.spellbooks,
  );
  const [activeSpellbookId, setActiveSpellbookId] = useState(
    stored.activeSpellbookId,
  );
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingSpell, setEditingSpell] = useState<{
    pageId: string;
    spell: Spell;
  } | null>(null);

  const activeSpellbook =
    spellbooks.find((spellbook) => spellbook.id === activeSpellbookId) ??
    spellbooks[0];
  const pages = activeSpellbook?.pages ?? [createEmptyPage(1)];
  const title = activeSpellbook?.title ?? defaultTitle;

  const setPages = useCallback(
    (value: SetStateAction<PageType[]>) => {
      setSpellbooks((prev) =>
        prev.map((spellbook) => {
          if (spellbook.id !== activeSpellbookId) {
            return spellbook;
          }

          const nextPages =
            typeof value === "function"
              ? (value as (previousPages: PageType[]) => PageType[])(
                  spellbook.pages,
                )
              : value;

          return {
            ...spellbook,
            pages: normalizePages(nextPages),
          };
        }),
      );
    },
    [activeSpellbookId],
  );

  const setTitle = useCallback(
    (nextTitle: string) => {
      setSpellbooks((prev) =>
        prev.map((spellbook) =>
          spellbook.id === activeSpellbookId
            ? { ...spellbook, title: nextTitle }
            : spellbook,
        ),
      );
    },
    [activeSpellbookId],
  );

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setCurrentPageIndex(0);
    setEditingSpell(null);
  }, [activeSpellbookId]);

  useEffect(() => {
    setCurrentPageIndex((prev) => Math.min(prev, pages.length - 1));
  }, [pages.length]);

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
        const targetPage = prev[currentPageIndex];

        if (!targetPage) {
          return prev;
        }

        if (targetPage.spells.length >= 1) {
          const newPage = {
            ...createEmptyPage(prev.length + 1),
            spells: [spell],
          };

          setTimeout(() => setCurrentPageIndex(prev.length), 0);

          return [...prev, newPage];
        }

        return prev.map((page, index) =>
          index === currentPageIndex
            ? { ...page, spells: [...page.spells, spell] }
            : page,
        );
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
  }, [setPages]);

  const handleDeletePage = useCallback(
    (pageId: string) => {
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
    },
    [setPages],
  );

  const handlePageChange = useCallback(
    (pageNum: number) => {
      if (pageNum >= 1 && pageNum <= pages.length) {
        setCurrentPageIndex(pageNum - 1);
      }
    },
    [pages.length],
  );

  const handleSpellbookChange = useCallback((spellbookId: string) => {
    setActiveSpellbookId(spellbookId);
  }, []);

  const handleCreateSpellbook = useCallback(() => {
    const existingTitles = new Set(
      spellbooks.map((spellbook) => spellbook.title),
    );
    let nextTitle = defaultTitle;
    let suffix = 2;

    while (existingTitles.has(nextTitle)) {
      nextTitle = `${defaultTitle} ${suffix}`;
      suffix += 1;
    }

    const newSpellbook = createSpellbook(nextTitle);

    setSpellbooks((prev) => [...prev, newSpellbook]);
    setActiveSpellbookId(newSpellbook.id);
  }, [defaultTitle, spellbooks]);

  return {
    spellbooks,
    activeSpellbookId,
    handleSpellbookChange,
    handleCreateSpellbook,
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
