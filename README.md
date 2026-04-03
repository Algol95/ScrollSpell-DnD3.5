# Spellbook Generator DnD3.5

Versión actual: 1.5.0

Spellbook Generator DnD3.5 es una aplicación web desarrollada en React + TypeScript que permite a jugadores y Dungeon Masters de Dungeons & Dragons 3.5 gestionar, crear e imprimir grimorios de hechizos personalizados de manera visual, rápida y flexible.

## Novedades recientes

- **Internacionalización completa**: La app ahora soporta español e inglés, detecta automáticamente el idioma del sistema y permite cambiarlo manualmente desde el header.
- **Header responsive mejorado**: Navegación, selector de idioma y botón PDF reorganizados para móviles, con cabecera fija y controles más compactos.
- **Footer rediseñado**: Nuevo pie de página con una presentación más profesional, enlaces sociales ampliados y bloque de apoyo al proyecto.
- **Donaciones por PayPal**: Integración de un enlace oficial de donación para apoyar el mantenimiento y mejora de ScrollSpell.
- **Escuela Universal**: Ahora puedes seleccionar la escuela "Universal" para los hechizos que no pertenecen a una escuela tradicional. Incluye un glifo especial en forma de estrella de 8 puntas, representando la unión de todas las escuelas.
- **Glifo universal**: El glifo de la escuela Universal es una estrella dorada de 8 puntas, única y fácilmente reconocible en el grimorio.
- **Compatibilidad total de UUID**: Generación de identificadores única universal compatible con todos los navegadores, incluso móviles y legacy.
- **Mejoras de exportación PDF**: Exportación robusta y compatible en móviles y escritorio, con detección automática del entorno.
- **Mejoras en impresión**: Ajustes específicos del pie de página para que el texto de referencia se lea mejor en PDF.
- **Fuentes personalizadas**: Integración correcta de Google Fonts (Moon Dance y Fondamento) para una experiencia visual más inmersiva.

## Características principales

- **Gestión de Grimorios**: Crea, edita y elimina páginas de tu grimorio, cada una con un único hechizo, siguiendo la lógica de los libros de conjuros de D&D 3.5.
- **Formulario inteligente**: Añade y edita hechizos con un formulario intuitivo, validación de campos y autocompletado de escuelas (incluida Universal) y niveles.
- **Interfaz multilenguaje**: Todos los textos principales de la aplicación se cargan desde archivos JSON localizados.
- **Cálculo de páginas on-rol**: Calcula automáticamente el número de páginas teóricas según el nivel de los hechizos, mostrando advertencias si excedes el límite oficial.
- **Vista previa y navegación**: Visualiza tu grimorio en tiempo real, navega entre páginas y selecciona fácilmente el hechizo a editar.
- **Impresión y exportación**: Exporta tu grimorio a PDF listo para imprimir, con formato optimizado para A4 y soporte móvil.
- **Persistencia local**: Todos los datos se guardan automáticamente en el navegador, sin necesidad de registro ni conexión a internet.
- **UI moderna y accesible**: Interfaz responsiva, accesible y agradable, con mejoras específicas para móvil y una sección de apoyo al proyecto en el footer.

## Tecnologías utilizadas

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) para desarrollo ultrarrápido
- [Tailwind CSS](https://tailwindcss.com/) para estilos modernos y personalizables
- [Lucide React](https://lucide.dev/) para iconografía
- [react-to-print](https://github.com/gregnb/react-to-print) para exportación a PDF
- JSON locales propios para internacionalización

## Estructura del proyecto (2026)

```
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

## Enlaces del proyecto

- GitHub: [https://github.com/Algol95](https://github.com/Algol95)
- LinkedIn: [https://www.linkedin.com/in/angel-dev-aragon](https://www.linkedin.com/in/angel-dev-aragon)
- Twitch: [https://www.twitch.tv/gayspervt](https://www.twitch.tv/gayspervt)
- Discord: [https://discord.gg/a4pFwRxcPx](https://discord.gg/a4pFwRxcPx)

## Autoría

- Desarrollo principal: Ángel Aragón
- GitHub: [https://github.com/Algol95](https://github.com/Algol95)
- LinkedIn: [https://www.linkedin.com/in/angel-dev-aragon](https://www.linkedin.com/in/angel-dev-aragon)
- Twitch: [https://www.twitch.tv/gayspervt](https://www.twitch.tv/gayspervt)
- Discord: [https://discord.gg/a4pFwRxcPx](https://discord.gg/a4pFwRxcPx)

---

© 2026 ScrollSpell DnD. Proyecto open source bajo licencia MIT.
