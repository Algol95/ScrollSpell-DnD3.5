import React, { useRef } from "react";
import { Header } from "./components/Header";
import { Page } from "./components/Page";
import { Form } from "./components/Form";
import { Button } from "./components/ui/Button";
import { Footer } from "./components/Footer";
import { ArrowLeft, Plus, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useSpellbookPages } from "./hooks/useSpellbookPages";
import { useSpellbookStorage } from "./hooks/useSpellbookStorage";
import { ArchmageTips } from "./components/ArchmageTips";
import { useTranslation, isDefaultTitle } from "./i18n-utils";
import "./App.css";

function shouldUseMobilePdfFallback() {
  if (typeof window === "undefined") return false;

  const userAgent = window.navigator.userAgent;
  const isMobileDevice =
    /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent) ||
    window.matchMedia("(max-width: 768px)").matches;

  return isMobileDevice;
}

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
  const [isMobilePrintPreviewOpen, setIsMobilePrintPreviewOpen] =
    React.useState(false);
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

  const handleGeneratePDF = React.useCallback(async () => {
    if (!printRef.current) {
      return;
    }

    try {
      if (shouldUseMobilePdfFallback()) {
        setIsMobilePrintPreviewOpen(true);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

        return;
      }

      await handlePrint();
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [handlePrint]);

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

  const handleCloseMobilePrintPreview = React.useCallback(() => {
    setIsMobilePrintPreviewOpen(false);
  }, []);

  const handlePrintMobilePreview = React.useCallback(() => {
    window.print();
  }, []);

  React.useEffect(() => {
    if (!isMobilePrintPreviewOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isMobilePrintPreviewOpen]);

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

  if (isMobilePrintPreviewOpen) {
    return (
      <div className="min-h-screen bg-[#e8dfd2] text-[#3f3122] print:bg-white print:text-black">
        <div className="sticky top-0 z-20 border-b border-[#63492c]/20 bg-[#f5f0e6]/95 backdrop-blur print:hidden">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 pr-1">
              <p className="truncate text-sm font-semibold sm:text-base">{title}</p>
              <p className="text-xs text-[#63492c]/80">
                Usa Imprimir o Guardar PDF desde el navegador.
              </p>
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto sm:shrink-0 sm:justify-end">
              <Button
                variant="outline"
                className="flex-1 border-[#63492c]/30 bg-white/70 text-[#3f3122] hover:bg-white sm:flex-none"
                onClick={handleCloseMobilePrintPreview}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
              <Button
                className="flex-[1.35] bg-gold text-ink hover:bg-gold/90 sm:flex-none"
                onClick={handlePrintMobilePreview}
              >
                <Printer className="mr-2 h-4 w-4" />
                Imprimir o Guardar PDF
              </Button>
            </div>
          </div>
        </div>

        <main className="mx-auto w-full max-w-4xl px-2 py-4 print:max-w-none print:px-0 print:py-0">
          <div className="space-y-4 print:space-y-0">
            {pages.map((page, index) => (
              <section
                key={`${page.id}-${index + 1}`}
                className="overflow-hidden rounded-lg bg-[#f5f0e6] shadow-[0_12px_32px_rgba(41,28,14,0.18)] print:mb-0 print:rounded-none print:shadow-none print:break-after-page"
                aria-label={`Página ${index + 1}`}
              >
                <Page page={page} title={title} isPrintMode isMobilePreview />
              </section>
            ))}
          </div>
        </main>
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
        onGeneratePDF={handleGeneratePDF}
        isGeneratingPDF={isGeneratingPDF}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 pt-36 pb-4 sm:py-8">
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

      <div
        aria-hidden="true"
        className="fixed top-0 opacity-0 pointer-events-none"
        style={{ left: "-99999px" }}
      >
        <div ref={printRef} className="print-container bg-parchment">
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
