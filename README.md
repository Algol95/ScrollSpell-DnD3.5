# Spellbook Generator DnD3.5

Versión actual: 1.7.0

Spellbook Generator DnD3.5 es una aplicación web desarrollada en React + TypeScript para crear, editar, previsualizar e imprimir grimorios de hechizos de Dungeons & Dragons 3.5 con un formato visual pensado para mesa y PDF.

## Novedades de la versión 1.7.0

- **Flujo móvil de impresión simplificado**: En móviles ya no se fuerza una generación pesada de PDF. Ahora la app abre una vista interna del grimorio lista para imprimir o guardar como PDF desde el propio navegador.
- **Previsualización móvil más estable**: Se eliminó la dependencia de pestañas emergentes y blobs externos en Chrome móvil, lo que mejora la compatibilidad y reduce bloqueos.
- **Responsive de impresión mejorado**: La barra superior de la vista móvil se reorganiza mejor en pantallas pequeñas y concentra la acción principal en un único botón.
- **Composición visual refinada**: El glifo arcano y la marca inferior del grimorio se ven más equilibrados dentro de la previsualización móvil.

## Características principales

- **Gestión de grimorios**: Crea, edita y elimina páginas de tu grimorio, cada una con un único hechizo, siguiendo la lógica de los libros de conjuros de D&D 3.5.
- **Formulario inteligente**: Añade y edita hechizos con validación y selección de nivel y escuela, incluida la escuela Universal.
- **Vista previa en tiempo real**: Revisa cada página del grimorio antes de imprimir o exportar.
- **Impresión y PDF en escritorio y móvil**: El flujo de escritorio mantiene la impresión A4 y el móvil usa una vista de impresión nativa más estable.
- **Interfaz multilenguaje**: Soporte para español e inglés, con detección automática del idioma y selector manual.
- **Persistencia local**: Los datos del grimorio se guardan automáticamente en el navegador.
- **Cálculo de páginas on-rol**: Muestra el consumo teórico de páginas según las reglas de D&D 3.5.

## Tecnologías utilizadas

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [react-to-print](https://github.com/gregnb/react-to-print)
- Archivos JSON propios para localización e internacionalización

## Instalación y uso

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tuusuario/scrollspell-dnd.git
   cd scrollspell-dnd
   ```
2. **Instala las dependencias**
   ```bash
   npm install
   ```
3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```
4. **Abre la app**
   Visita [http://localhost:5173](http://localhost:5173) en tu navegador.

## Apoyo al proyecto

Si la herramienta te resulta útil, puedes apoyar su mantenimiento y evolución desde el footer de la aplicación mediante el botón oficial de donación de PayPal.

## Autoría

- Desarrollo principal: Ángel Aragón
- GitHub: [https://github.com/Algol95](https://github.com/Algol95)
- LinkedIn: [https://www.linkedin.com/in/angel-dev-aragon](https://www.linkedin.com/in/angel-dev-aragon)
- Twitch: [https://www.twitch.tv/gayspervt](https://www.twitch.tv/gayspervt)
- Discord: [https://discord.gg/a4pFwRxcPx](https://discord.gg/a4pFwRxcPx)

<details>
<summary>Cambios anteriores y contexto del proyecto</summary>

## Mejoras incorporadas en versiones anteriores

- **Internacionalización completa**: La app soporta español e inglés, detecta automáticamente el idioma del sistema y permite cambiarlo manualmente desde el header.
- **Header responsive mejorado**: Navegación, selector de idioma y botón PDF reorganizados para móviles, con cabecera fija y controles más compactos.
- **Footer rediseñado**: Nuevo pie de página con una presentación más profesional, enlaces sociales ampliados y bloque de apoyo al proyecto.
- **Donaciones por PayPal**: Integración de un enlace oficial de donación para apoyar el mantenimiento y mejora de ScrollSpell.
- **Escuela Universal**: Ahora puedes seleccionar la escuela "Universal" para los hechizos que no pertenecen a una escuela tradicional.
- **Glifo universal**: El grimorio incluye un glifo específico para la escuela Universal en forma de estrella de 8 puntas.
- **Compatibilidad total de UUID**: Generación de identificadores única compatible con navegadores móviles y entornos más antiguos.
- **Mejoras de exportación PDF**: Varias iteraciones de compatibilidad para escritorio y móviles.
- **Mejoras en impresión**: Ajustes específicos del pie de página y del formato A4 para lectura más clara en PDF.
- **Fuentes personalizadas**: Integración correcta de Google Fonts para reforzar la identidad visual del grimorio.

## Estructura del proyecto

```text
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── i18n.tsx
│   ├── i18n-utils.ts
│   ├── main.tsx
│   ├── assets/
│   ├── components/
│   │   ├── ArchmageTips.tsx
│   │   ├── Card.tsx
│   │   ├── Footer.tsx
│   │   ├── Form.tsx
│   │   ├── Glyph.tsx
│   │   ├── Header.tsx
│   │   ├── Page.tsx
│   │   ├── form/
│   │   │   ├── SpellDescriptionRow.tsx
│   │   │   ├── SpellGridRow.tsx
│   │   │   ├── SpellInputRow.tsx
│   │   │   └── SpellLevelSchoolRow.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Label.tsx
│   │       ├── Select.tsx
│   │       └── Textarea.tsx
│   ├── hooks/
│   │   ├── useSpellForm.ts
│   │   ├── useSpellbookPages.ts
│   │   └── useSpellbookStorage.ts
│   ├── locales/
│   │   ├── en.json
│   │   └── es.json
│   └── types/
│       └── json.d.ts
├── lib/
│   ├── types.ts
│   └── utils.ts
├── package-lock.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

</details>

---

© 2026 ScrollSpell DnD. Proyecto open source bajo licencia MIT.
