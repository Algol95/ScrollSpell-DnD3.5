# ScrollSpell DnD

ScrollSpell DnD es una aplicación web desarrollada en React + TypeScript que permite a jugadores y Dungeon Masters de Dungeons & Dragons 3.5 gestionar, crear e imprimir grimorios de hechizos personalizados de manera visual, rápida y flexible.

## Características principales

- **Gestión de Grimorios**: Crea, edita y elimina páginas de tu grimorio, cada una con un único hechizo, siguiendo la lógica de los libros de conjuros de D&D 3.5.
- **Formulario inteligente**: Añade y edita hechizos con un formulario intuitivo, validación de campos y autocompletado de escuelas y niveles.
- **Cálculo de páginas on-rol**: Calcula automáticamente el número de páginas teóricas según el nivel de los hechizos, mostrando advertencias si excedes el límite oficial.
- **Vista previa y navegación**: Visualiza tu grimorio en tiempo real, navega entre páginas y selecciona fácilmente el hechizo a editar.
- **Impresión y exportación**: Exporta tu grimorio a PDF listo para imprimir, con formato optimizado para A4.
- **Persistencia local**: Todos los datos se guardan automáticamente en el navegador, sin necesidad de registro ni conexión a internet.
- **UI moderna y accesible**: Interfaz responsiva, accesible y agradable, con soporte para temas y atajos de teclado.

## Tecnologías utilizadas

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) para desarrollo ultrarrápido
- [Tailwind CSS](https://tailwindcss.com/) para estilos modernos y personalizables
- [Lucide React](https://lucide.dev/) para iconografía
- [react-to-print](https://github.com/gregnb/react-to-print) para exportación a PDF

## Estructura del proyecto

```
├── public/
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes de UI reutilizables
│   │   ├── form/         # Subcomponentes del formulario de hechizos
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Page.tsx
│   │   └── Form.tsx
│   ├── hooks/            # Hooks personalizados para lógica de negocio
│   ├── assets/
│   ├── App.tsx           # Componente principal
│   └── main.tsx
├── lib/
│   └── types.ts          # Tipos y constantes de dominio
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
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

## Autoría

- **Desarrollo principal:**
  - Ángel Aragón
    - [GitHub](https://github.com/Algol95)
    - [LinkedIn](https://www.linkedin.com/in/angel-dev-aragon)
    <!-- - [Portfolio](#) -->

---

© 2026 ScrollSpell DnD. Proyecto open source bajo licencia MIT.
