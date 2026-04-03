import React, { useRef } from "react";
import { Header } from "./components/Header";
import { Page } from "./components/Page";
import { Form } from "./components/Form";
import { Button } from "./components/ui/Button";
import { Footer } from "./components/Footer";
import { Plus } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useSpellbookPages } from "./hooks/useSpellbookPages";
import { useSpellbookStorage } from "./hooks/useSpellbookStorage";
import { ArchmageTips } from "./components/ArchmageTips";
import { useTranslation, isDefaultTitle } from "./i18n-utils";
import "./App.css";

/**
 * Componente principal de la aplicación de grimorio de hechizos. Gestiona el estado del grimorio, incluyendo las páginas, los hechizos y el título. También maneja la generación de PDF y la navegación entre páginas.
 * @returns JSX.Element que representa la aplicación completa.
 */
export function App() {
  const { messages } = useTranslation();
  const {
    pages,
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
  } = useSpellbookPages(messages.header.defaultTitle);

  const spellCount = pages.reduce((acc, page) => acc + page.spells.length, 0);
  const spellCountLabel =
    spellCount === 1 ? messages.app.spellSingular : messages.app.spellPlural;

  // Handler para el cambio de título del grimorio
  const handleTitleChange = React.useCallback(
    (newTitle: string) => {
      setTitle(newTitle);
    },
    [setTitle],
  );

  useSpellbookStorage({ title, pages, isLoaded });

  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);
  const printRef = useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    const pageElement = document.getElementById(`page-${currentPageIndex}`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentPageIndex]);

  React.useEffect(() => {
    if (isDefaultTitle(title)) {
      setTitle(messages.header.defaultTitle);
    }
  }, [messages.header.defaultTitle, setTitle, title]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl text-gold mb-4 animate-pulse">&#x2726;</div>
          <p className="text-muted-foreground">{messages.app.loading}</p>
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
                  {messages.app.previewTitle}
                </h2>
                <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground ml-2">
                  {spellCount} {spellCountLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${isOverTheoreticalLimit ? "bg-destructive/10 text-destructive border border-destructive" : "bg-muted text-muted-foreground"}`}
                  title={messages.app.pagesOnRoleTitle}
                >
                  {messages.app.pagesOnRole}: {theoreticalPages} /{" "}
                  {maxTheoreticalPages}
                </span>
                {isOverTheoreticalLimit && (
                  <span className="text-xs text-destructive font-semibold ml-1">
                    {messages.app.pagesLimitExceeded}
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
              {messages.app.addNewPage}
            </Button>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Form
              onAddSpell={handleAddSpell}
              onUpdateSpell={handleUpdateSpell}
              currentPageNumber={currentPageIndex + 1}
              editingSpell={editingSpell}
            />
          </div>
        </div>
        <ArchmageTips />
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
