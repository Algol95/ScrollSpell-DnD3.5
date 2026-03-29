import { useState, useRef, useCallback, useEffect } from "react";
import { Header } from "./components/Header";
import { Page } from "./components/Page";
import { Form } from "./components/Form";
import { Button } from "./components/ui/Button";
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
  const [pages, setPages] = useState<PageType[]>([createEmptyPage(1)]);
  const [title, setTitle] = useState("Grimorio Arcano");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingSpell, setEditingSpell] = useState<{
    pageId: string;
    spell: Spell;
  } | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setTitle(stored.title);
      setPages(stored.pages.length > 0 ? stored.pages : [createEmptyPage(1)]);
    }
    setIsLoaded(true);
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

  const handleDeletePage = useCallback(
    (pageId: string) => {
      setPages((prev) => {
        if (prev.length <= 1) return prev;
        const newPages = prev
          .filter((p) => p.id !== pageId)
          .map((page, idx) => ({ ...page, pageNumber: idx + 1 }));

        if (currentPageIndex >= newPages.length) {
          setCurrentPageIndex(newPages.length - 1);
        }
        return newPages;
      });
    },
    [currentPageIndex],
  );

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
    <div className="min-h-screen bg-background">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="text-gold">&#x2726;</span>
                Vista Previa del Grimorio
              </h2>
              <span className="text-sm text-muted-foreground">
                {pages.reduce((acc, p) => acc + p.spells.length, 0)} hechizos
                inscritos
              </span>
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
                  onClick={() => {
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
              className="w-full border-dashed border-2 border-border hover:border-gold hover:text-gold"
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
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>Cada pagina contiene un unico hechizo</li>
                <li>Haz clic en una pagina para seleccionarla</li>
                <li>Pasa el raton sobre un hechizo para eliminarlo</li>
                <li>El grimorio se guarda automaticamente</li>
                <li>Puedes editar el titulo en la cabecera</li>
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
    </div>
  );
}

export default App;
