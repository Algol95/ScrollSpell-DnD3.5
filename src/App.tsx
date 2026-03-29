import { useState, useRef, useCallback, useEffect } from "react";
import { Header } from "./components/Header";
import { Page } from "./components/Page";
import { Form } from "./components/Form";
import { Button } from "./components/ui/Button";
import { Footer } from "./components/Footer";
import { Plus } from "lucide-react";
import type { Spell, SpellbookPage as PageType } from "../lib/types";
import { useReactToPrint } from "react-to-print";
import "./App.css";

const STORAGE_KEY = "grimorio_arcano_data";

interface SpellbookData {
  title: string;
  pages: PageType[];
}

const createEmptyPage = (pageNumber: number): PageType => ({
  id: crypto.randomUUID(),
  pageNumber,
  spells: [],
});

const loadFromStorage = (): SpellbookData | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error loading from localStorage:", e);
  }
  return null;
};

const saveToStorage = (data: SpellbookData) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
};

export function App() {
  const stored = loadFromStorage();
  const [pages, setPages] = useState<PageType[]>(
    stored && stored.pages.length > 0 ? stored.pages : [createEmptyPage(1)],
  );
  const [title, setTitle] = useState(stored ? stored.title : "Grimorio Arcano");

  // Calcula el total de páginas teóricas según el nivel de los hechizos
  const theoreticalPages = pages.reduce(
    (acc, page) =>
      acc +
      page.spells.reduce((sum, spell) => sum + Math.max(1, spell.level), 0),
    0,
  );
  const maxTheoreticalPages = 100;
  const isOverTheoreticalLimit = theoreticalPages > maxTheoreticalPages;

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingSpell, setEditingSpell] = useState<{
    pageId: string;
    spell: Spell;
  } | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveToStorage({ title, pages });
    }
  }, [title, pages, isLoaded]);

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

      // Ajustar el índice de página actual antes de eliminar
      setCurrentPageIndex((prevIndex) => {
        if (prevIndex === deleteIndex) {
          // Si es la primera, quedarse en la 0; si no, ir a la anterior
          return deleteIndex === 0 ? 0 : prevIndex - 1;
        }
        if (prevIndex > deleteIndex) return prevIndex - 1;
        return prevIndex;
      });

      // Limpiar edición si corresponde
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

  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: title.replace(/\s+/g, "_"),
    onBeforePrint: async () => {
      setIsGeneratingPDF(true);
    },
    onAfterPrint: () => {
      setIsGeneratingPDF(false);
    },
  });

  useEffect(() => {
    const pageElement = document.getElementById(`page-${currentPageIndex}`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentPageIndex]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-gold mb-4 animate-pulse">&#x2726;</div>
          <p className="text-muted-foreground">Cargando grimorio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        title={title}
        onTitleChange={handleTitleChange}
        totalPages={pages.length}
        currentPage={currentPageIndex + 1}
        onPageChange={handlePageChange}
        onGeneratePDF={() => handlePrint()}
        isGeneratingPDF={isGeneratingPDF}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="text-gold">&#x2726;</span>
                  Vista Previa del Grimorio
                </h2>
                <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground ml-2">
                  {pages.reduce((acc, p) => acc + p.spells.length, 0)} hechizos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${isOverTheoreticalLimit ? "bg-destructive/10 text-destructive border border-destructive" : "bg-muted text-muted-foreground"}`}
                  title="Páginas teóricas según reglas oficiales de D&D 3.5"
                >
                  Páginas on-rol: {theoreticalPages} / {maxTheoreticalPages}
                </span>
                {isOverTheoreticalLimit && (
                  <span className="text-xs text-destructive font-semibold ml-1">
                    ¡Has excedido el límite oficial de páginas!
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 pb-4">
              {pages.map((page, index) => (
                <div
                  key={page.id}
                  id={`page-${index}`}
                  className={`transition-all duration-300 ${
                    index === currentPageIndex
                      ? "ring-2 ring-gold ring-offset-4 ring-offset-background"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={(e) => {
                    // Si el click viene del botón de eliminar, no cambiar el índice ni editar
                    if (
                      (e.target as HTMLElement).closest(
                        "button[data-delete-page]",
                      )
                    )
                      return;
                    setCurrentPageIndex(index);
                    const spell = page.spells[0];
                    if (spell) {
                      setEditingSpell({ pageId: page.id, spell });
                    } else {
                      setEditingSpell(null);
                    }
                  }}
                >
                  <Page
                    page={page}
                    title={title}
                    onDeleteSpell={handleDeleteSpell}
                    onDeletePage={
                      pages.length > 1 ? handleDeletePage : undefined
                    }
                  />
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full border-2 border-border hover:bg-secondary"
              onClick={handleAddPage}
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir Nueva Página
            </Button>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Form
              onAddSpell={handleAddSpell}
              onUpdateSpell={handleUpdateSpell}
              currentPageNumber={currentPageIndex + 1}
              editingSpell={editingSpell}
            />

            <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Consejos del Archimago
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Cada pagina contiene un unico hechizo</li>
                <li>Haz clic en una pagina para seleccionarla</li>
                <li>Pasa el raton sobre un hechizo para eliminarlo</li>
                <li>El grimorio se guarda automaticamente</li>
                <li>Puedes editar el titulo en la cabecera</li>
                <li>
                  El número de páginas teóricas ON-ROL se calcula según el nivel
                  de los hechizos, siguiendo las reglas oficiales de D&D 3.5.
                </li>
                <li>
                  Si excedes el límite oficial de páginas, se mostrará una
                  advertencia para ayudarte a mantener tu grimorio dentro de las
                  reglas. Se puede seguir añadiendo hechizos sin restricciones
                  para permitir flexibilidad en la creación de tu grimorio y
                  ajustarte a las reglas de tu master.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <div className="hidden">
        <div ref={printRef} className="print-container">
          <style>{`
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              .print-page {
                page-break-after: always;
                width: 210mm;
                height: 297mm;
                padding: 0;
                box-sizing: border-box;
              }
              .print-page:last-child {
                page-break-after: auto;
              }
            }
          `}</style>
          {pages.map((page) => (
            <div key={page.id} className="print-page">
              <Page page={page} title={title} isPrintMode />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
