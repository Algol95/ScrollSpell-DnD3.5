interface MagicGlyphProps {
  level: number;
  school: string;
}

const schoolSymbols: Record<string, string> = {
  Abjuracion:
    "M50,10 L60,30 L80,30 L65,45 L70,65 L50,52 L30,65 L35,45 L20,30 L40,30 Z",
  Conjuracion:
    "M50,5 L55,35 L85,35 L60,55 L70,85 L50,65 L30,85 L40,55 L15,35 L45,35 Z",
  Adivinacion:
    "M50,15 A35,35 0 1,1 50,85 A35,35 0 1,1 50,15 M50,25 A25,25 0 1,1 50,75 A25,25 0 1,1 50,25 M50,35 A15,15 0 1,1 50,65 A15,15 0 1,1 50,35",
  Encantamiento:
    "M50,10 Q70,25 70,50 Q70,75 50,90 Q30,75 30,50 Q30,25 50,10 M30,50 L70,50 M50,10 L50,90",
  Evocacion:
    "M50,5 L62,40 L95,40 L68,60 L80,95 L50,72 L20,95 L32,60 L5,40 L38,40 Z",
  Ilusion:
    "M25,25 Q50,0 75,25 Q100,50 75,75 Q50,100 25,75 Q0,50 25,25 M35,35 Q50,20 65,35 Q80,50 65,65 Q50,80 35,65 Q20,50 35,35",
  Nigromancia:
    "M50,10 L60,25 L75,10 L70,30 L90,35 L72,45 L85,60 L65,55 L60,75 L50,60 L40,75 L35,55 L15,60 L28,45 L10,35 L30,30 L25,10 L40,25 Z",
  Transmutacion:
    "M50,5 L65,25 L90,25 L72,42 L80,65 L55,52 L50,75 L45,52 L20,65 L28,42 L10,25 L35,25 Z M50,30 A20,20 0 1,1 50,70 A20,20 0 1,1 50,30",
};

const schoolColors: Record<string, string> = {
  Abjuracion: "#4b5563", // gris
  Conjuracion: "#0f766e", // verde azulado
  Adivinacion: "#1d4ed8", // azul
  Encantamiento: "#7c3aed", // violeta
  Evocacion: "#b45309", // ámbar
  Ilusion: "#6b21a8", // púrpura
  Nigromancia: "#111827", // casi negro
  Transmutacion: "#16a34a", // verde
};

function normalizeSchoolName(name: string): string {
  // Quitar acentos y normalizar para coincidir con las claves del mapa
  const noAccents = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return noAccents.trim();
}

/**
 * Componente que representa un glifo mágico basado en el nivel y la escuela de un hechizo. El glifo se compone de anillos concéntricos, runas alrededor del círculo, líneas cruzadas para niveles más altos y un símbolo específico de la escuela en el centro. El diseño se adapta dinámicamente según el nivel del hechizo, proporcionando una representación visual única para cada combinación de nivel y escuela.
 * @param param0 Props del componente MagicGlyph, incluyendo el nivel y la escuela del hechizo.
 * @returns Elemento JSX que representa el glifo mágico.
 */
export function Glyph({ level, school }: MagicGlyphProps) {
  const baseSize = 120 + level * 25;
  const opacity = 0.25;
  const rings = Math.min(Math.floor(level / 2) + 1, 5);
  const runes = Math.min(level + 4, 12);

  const normalizedSchool = normalizeSchoolName(school);
  const schoolPath =
    schoolSymbols[normalizedSchool] || schoolSymbols["Evocacion"];
  const glyphColor = schoolColors[normalizedSchool] || "#7c6a58";

  const runeSymbols = [
    "A",
    "E",
    "I",
    "O",
    "U",
    "R",
    "N",
    "S",
    "T",
    "L",
    "D",
    "M",
  ];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <svg
        width={baseSize}
        height={baseSize}
        viewBox="0 0 100 100"
        className="text-ink"
        style={{ opacity, color: glyphColor }}
      >
        {/* Outer rings based on level */}
        {Array.from({ length: rings }).map((_, i) => (
          <circle
            key={`ring-${i}`}
            cx="50"
            cy="50"
            r={45 - i * 7}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.5 + i * 0.2}
            strokeDasharray={level > 3 ? `${3 + i},${2 + i}` : "none"}
          />
        ))}

        {/* Rune letters around the circle */}
        {Array.from({ length: runes }).map((_, i) => {
          const angle = (i * 360) / runes - 90;
          const radius = 40;
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
          return (
            <text
              key={`rune-${i}`}
              x={x}
              y={y}
              fontSize={level > 5 ? 5 : 4}
              fill="currentColor"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontFamily: "serif" }}
              transform={`rotate(${angle + 90}, ${x}, ${y})`}
            >
              {runeSymbols[i % runeSymbols.length]}
            </text>
          );
        })}

        {/* Cross lines for higher levels */}
        {level >= 3 && (
          <>
            <line
              x1="50"
              y1="12"
              x2="50"
              y2="88"
              stroke="currentColor"
              strokeWidth="0.3"
            />
            <line
              x1="12"
              y1="50"
              x2="88"
              y2="50"
              stroke="currentColor"
              strokeWidth="0.3"
            />
          </>
        )}

        {level >= 5 && (
          <>
            <line
              x1="23"
              y1="23"
              x2="77"
              y2="77"
              stroke="currentColor"
              strokeWidth="0.3"
            />
            <line
              x1="77"
              y1="23"
              x2="23"
              y2="77"
              stroke="currentColor"
              strokeWidth="0.3"
            />
          </>
        )}

        {/* School-specific symbol in center */}
        <g transform="scale(0.5) translate(50, 50)">
          <path
            d={schoolPath}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>

        {/* Inner decorative elements for high level spells */}
        {level >= 7 && (
          <g>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const innerR = 15;
              const outerR = 25;
              return (
                <line
                  key={`ray-${i}`}
                  x1={50 + innerR * Math.cos(angle)}
                  y1={50 + innerR * Math.sin(angle)}
                  x2={50 + outerR * Math.cos(angle)}
                  y2={50 + outerR * Math.sin(angle)}
                  stroke="currentColor"
                  strokeWidth="0.4"
                />
              );
            })}
          </g>
        )}

        {/* Ultimate seal for level 9 */}
        {level >= 9 && (
          <>
            <circle
              cx="50"
              cy="50"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
          </>
        )}
      </svg>
    </div>
  );
}
