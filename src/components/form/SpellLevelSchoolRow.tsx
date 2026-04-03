import { Label } from "../../components/ui/Label";
import { SPELL_LEVELS } from "../../../lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import { getSchoolLabel, useTranslation } from "../../i18n-utils";

/**
 * Componente de fila para seleccionar el nivel y la escuela de un hechizo. Permite a los usuarios elegir el nivel del hechizo (desde truco hasta nivel 9) y la escuela de magia a la que pertenece. Utiliza componentes de selección personalizados para una mejor experiencia de usuario.
 * @param param0 Props del componente SpellLevelSchoolRow, incluyendo el nivel, la escuela, las funciones para actualizar el nivel y la escuela, y la lista de escuelas de magia disponibles.
 * @returns Elemento JSX que representa la fila de selección de nivel y escuela para un hechizo.
 */
interface SpellLevelSchoolRowProps {
  level: string;
  school: string;
  setValue: (field: "level" | "school", value: string) => void;
  spellSchools: string[];
}

export function SpellLevelSchoolRow({
  level,
  school,
  setValue,
  spellSchools,
}: SpellLevelSchoolRowProps) {
  const { messages } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="level" className="text-foreground">
          {messages.form.level} *
        </Label>
        <Select value={level} onValueChange={(v) => setValue("level", v)}>
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder={messages.form.levelPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {SPELL_LEVELS.map((level) => (
              <SelectItem key={level} value={level.toString()}>
                {level === 0
                  ? messages.form.cantrip
                  : messages.form.levelValue.replace(
                      "{level}",
                      level.toString(),
                    )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="school" className="text-foreground">
          {messages.form.school} *
        </Label>
        <Select value={school} onValueChange={(v) => setValue("school", v)}>
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder={messages.form.schoolPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {spellSchools.map((school) => (
              <SelectItem key={school} value={school}>
                {getSchoolLabel(school, messages)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
