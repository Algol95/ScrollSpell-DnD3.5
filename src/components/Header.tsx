import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
  Scroll,
  Pencil,
  Check,
} from "lucide-react";

/**
 * Componente de encabezado del libro de hechizos que incluye el título editable, la navegación de páginas y la generación de PDF. Permite a los usuarios cambiar el título del libro, navegar entre las páginas del libro de hechizos y generar un PDF del contenido. El componente utiliza Tailwind CSS para el estilo y lucide-react para los íconos, proporcionando una interfaz de usuario atractiva y funcional para la gestión del libro de hechizos.
 * @param param0 Props del componente Header, incluyendo el título, la función para cambiar el título, el número total de páginas, la página actual, la función para cambiar de página, la función para generar PDF y el estado de generación de PDF.
 * @returns Elemento JSX que representa el encabezado del libro de hechizos.
 */
interface HeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onGeneratePDF: () => void;
  isGeneratingPDF: boolean;
}

/**
 * Componente de encabezado del libro de hechizos que incluye el título editable, la navegación de páginas y la generación de PDF. Permite a los usuarios cambiar el título del libro, navegar entre las páginas del libro de hechizos y generar un PDF del contenido.
 * @param param0 Props del componente Header, incluyendo el título, la función para cambiar el título, el número total de páginas, la página actual, la función para cambiar de página, la función para generar PDF y el estado de generación de PDF.
 * @returns Elemento JSX que representa el encabezado del libro de hechizos.
 */
export function Header({
  title,
  onTitleChange,
  totalPages,
  currentPage,
  onPageChange,
  onGeneratePDF,
  isGeneratingPDF,
}: HeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleSave = () => {
    if (editValue.trim()) {
      onTitleChange(editValue.trim());
    } else {
      setEditValue(title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(title);
      setIsEditing(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 min-w-0">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-gold shrink-0" />
            <div className="min-w-0">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave}
                    className="h-8 text-lg font-bold bg-background/50 border-gold/50 focus:border-gold w-48"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gold hover:text-gold/80 shrink-0"
                    onClick={handleSave}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="flex items-center gap-2 group cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-wide truncate">
                    {title}
                  </h1>
                  <Pencil className="h-4 w-4 text-muted-foreground opacity-50 group-hover:opacity-100 hover:text-gold transition" />
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                D&D 3.5 Spellbook Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-between sm:justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4 shrink-0" />
            </Button>

            <div className="flex items-center gap-1 px-2 sm:px-3">
              <Scroll className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground font-medium whitespace-nowrap">
                {currentPage} / {totalPages}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1 flex-wrap">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }

                return (
                  <Button
                    key={`nav-${i}-${pageNum}`}
                    variant={pageNum === currentPage ? "default" : "ghost"}
                    size="sm"
                    className={`h-7 w-7 p-0 text-xs ${pageNum === currentPage ? "bg-gold text-ink hover:bg-gold/90" : ""}`}
                    onClick={() => onPageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4 shrink-0" />
            </Button>
          </div>

          <Button
            onClick={onGeneratePDF}
            disabled={isGeneratingPDF}
            className="bg-gold text-ink hover:bg-gold/90 w-full sm:w-auto justify-center"
          >
            <Download className="h-4 w-4 mr-2 shrink-0" />
            <span className="hidden sm:inline">
              {isGeneratingPDF ? "Generando..." : "Descargar PDF"}
            </span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
