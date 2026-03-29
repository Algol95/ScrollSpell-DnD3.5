/**
 * Componente que muestra consejos para el usuario sobre cómo usar la aplicación de grimorio de hechizos. Proporciona información útil sobre cómo organizar las páginas, seleccionar hechizos y mantener el grimorio dentro de las reglas oficiales de D&D 3.5.
 * @returns JSX.Element que representa la sección de consejos del Archimago.
 */
export function ArchmageTips() {
  return (
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
          El número de páginas teóricas ON-ROL se calcula según el nivel de los
          hechizos, siguiendo las reglas oficiales de D&D 3.5.
        </li>
        <li>
          Si excedes el límite oficial de páginas, se mostrará una advertencia
          para ayudarte a mantener tu grimorio dentro de las reglas. Se puede
          seguir añadiendo hechizos sin restricciones para permitir flexibilidad
          en la creación de tu grimorio y ajustarte a las reglas de tu master.
        </li>
      </ul>
    </div>
  );
}
