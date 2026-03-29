import { Label } from "../../components/ui/Label";
import { SPELL_LEVELS } from "../../../lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";

/**
 * Componente de fila para seleccionar el nivel y la escuela de un hechizo. Permite a los usuarios elegir el nivel del hechizo (desde truco hasta nivel 9) y la escuela de magia a la que pertenece. Utiliza componentes de selección personalizados para una mejor experiencia de usuario.
 * @param param0 Props del componente SpellLevelSchoolRow, incluyendo el nivel, la escuela, las funciones para actualizar el nivel y la escuela, y la lista de escuelas de magia disponibles.
 * @returns Elemento JSX que representa la fila de selección de nivel y escuela para un hechizo.
 */
export function SpellLevelSchoolRow({
  level,
  school,
  setLevel,
  setSchool,
  spellSchools,
}: {
  level: string;
  school: string;
  setLevel: (v: string) => void;
  setSchool: (v: string) => void;
  spellSchools: string[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="level" className="text-foreground">
          Nivel *
        </Label>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder="Nivel" />
          </SelectTrigger>
          <SelectContent>
            {SPELL_LEVELS.map((level) => (
              <SelectItem key={level} value={level.toString()}>
                {level === 0 ? "Truco (0)" : `Nivel ${level}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="school" className="text-foreground">
          Escuela *
        </Label>
        <Select value={school} onValueChange={setSchool}>
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder="Escuela" />
          </SelectTrigger>
          <SelectContent>
            {spellSchools.map((school) => (
              <SelectItem key={school} value={school}>
                {school}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
