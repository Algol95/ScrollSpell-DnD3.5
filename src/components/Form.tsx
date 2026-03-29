"use client";

import { Button } from "../components/ui/Button";
import { ScrollText, Sparkles } from "lucide-react";
import { SPELL_SCHOOLS, type Spell } from "../../lib/types";
import { useSpellForm } from "../hooks/useSpellForm";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { SpellLevelSchoolRow } from "./form/SpellLevelSchoolRow";
import { SpellInputRow } from "./form/SpellInputRow";
import { SpellGridRow } from "./form/SpellGridRow";
import { SpellDescriptionRow } from "./form/SpellDescriptionRow";

interface SpellFormProps {
  onAddSpell: (spell: Spell) => void;
  onUpdateSpell: (pageId: string, spell: Spell) => void;
  currentPageNumber: number;
  editingSpell?: { pageId: string; spell: Spell } | null;
}

const DESCRIPTION_MAX_LENGTH = 3000;

type SpellFormData = {
  name: string;
  subtitle?: string;
  level: string;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  target?: string;
  savingThrow?: string;
  spellResistance?: string;
};

/**
 * Componente de formulario para inscribir o editar un hechizo. Permite a los usuarios ingresar detalles del hechizo, como nombre, nivel, escuela, tiempo de lanzamiento, alcance, componentes, duración, descripción, objetivo/área, tirada de salvación y resistencia a conjuros. El formulario valida que se completen los campos obligatorios antes de permitir la inscripción o actualización del hechizo en el grimorio.
 * @param param0 Props del componente Form, incluyendo las funciones para agregar y actualizar hechizos, el número de página actual y el hechizo que se está editando (si aplica).
 * @returns Elemento JSX que representa el formulario de hechizo.
 */

export function Form({
  onAddSpell,
  onUpdateSpell,
  currentPageNumber,
  editingSpell,
}: SpellFormProps) {
  const { editingMeta } = useSpellForm({ editingSpell }) as {
    editingMeta: { pageId: string; id: string } | null;
  };

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<SpellFormData>({
      defaultValues: editingSpell
        ? {
            ...editingSpell.spell,
            level: editingSpell.spell.level.toString(),
          }
        : {
            name: "",
            subtitle: "",
            level: "1",
            school: SPELL_SCHOOLS[0],
            castingTime: "",
            range: "",
            components: "",
            duration: "",
            description: "",
            target: "",
            savingThrow: "",
            spellResistance: "",
          },
    });

  // Rellena el formulario al seleccionar un hechizo para editar
  useEffect(() => {
    if (editingSpell) {
      reset({
        ...editingSpell.spell,
        level: editingSpell.spell.level.toString(),
      });
    } else {
      reset({
        name: "",
        subtitle: "",
        level: "1",
        school: SPELL_SCHOOLS[0],
        castingTime: "",
        range: "",
        components: "",
        duration: "",
        description: "",
        target: "",
        savingThrow: "",
        spellResistance: "",
      });
    }
  }, [editingSpell, reset]);

  // ADVERTENCIA: El uso de watch() de react-hook-form puede causar que React Compiler omita la memoización de este componente.
  // En este caso es seguro porque el formulario no es memoizado ni se pasa a otros hooks memoizados.
  const descriptionLength = watch("description")?.length || 0;

  const onSubmit = (data: SpellFormData) => {
    const baseSpell: Omit<Spell, "id"> & { subtitle?: string } = {
      name: data.name,
      subtitle: data.subtitle || undefined,
      level: parseInt(data.level),
      school: data.school,
      castingTime: data.castingTime,
      range: data.range,
      components: data.components,
      duration: data.duration,
      description: data.description,
      target: data.target || undefined,
      savingThrow: data.savingThrow || undefined,
      spellResistance: data.spellResistance || undefined,
    };
    if (editingMeta) {
      onUpdateSpell(editingMeta.pageId, { id: editingMeta.id, ...baseSpell });
    } else {
      // Generador UUID compatible universal
      function uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            const r = (Math.random() * 16) | 0,
              v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          },
        );
      }
      const spell: Spell = {
        id: uuidv4(),
        ...baseSpell,
      };
      onAddSpell(spell);
      reset();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <ScrollText className="h-6 w-6 text-gold" />
        <h2 className="text-lg sm:text-xl font-semibold text-foreground">
          {editingMeta ? "Editar Hechizo" : "Inscribir Hechizo"}
        </h2>
        <span className="ml-auto text-sm text-muted-foreground">
          Página {currentPageNumber}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SpellInputRow
          id="name"
          label="Nombre del Hechizo"
          placeholder="Bola de Fuego"
          required
          {...register("name", { required: true })}
        />
        <SpellInputRow
          id="subtitle"
          label="Subtítulo (opcional)"
          placeholder="Explosión de fuego ardiente"
          {...register("subtitle")}
        />
        <SpellLevelSchoolRow
          level={watch("level")}
          school={watch("school")}
          setValue={setValue}
          spellSchools={[...SPELL_SCHOOLS]}
        />
        <SpellGridRow
          leftId="castingTime"
          leftLabel="Tiempo de Lanzamiento *"
          leftInputProps={{
            ...register("castingTime", { required: true }),
            placeholder: "1 acción estándar",
            required: true,
          }}
          rightId="range"
          rightLabel="Alcance *"
          rightInputProps={{
            ...register("range", { required: true }),
            placeholder: "Largo (120m)",
            required: true,
          }}
        />
        <SpellInputRow
          id="components"
          label="Componentes"
          placeholder="V, S, M (guano de murciélago)"
          required
          {...register("components", { required: true })}
        />
        <SpellInputRow
          id="duration"
          label="Duración"
          placeholder="Instantáneo"
          required
          {...register("duration", { required: true })}
        />
        <SpellInputRow
          id="target"
          label="Objetivo/Área"
          placeholder="Esfera de 6m de radio"
          {...register("target")}
        />
        <SpellGridRow
          leftId="savingThrow"
          leftLabel="Tirada de Salvación"
          leftInputProps={{
            ...register("savingThrow"),
            placeholder: "Reflejos (mitad)",
          }}
          rightId="spellResistance"
          rightLabel="Resistencia a Conjuros"
          rightInputProps={{
            ...register("spellResistance"),
            placeholder: "Sí",
          }}
        />
        <SpellDescriptionRow
          maxLength={DESCRIPTION_MAX_LENGTH}
          length={descriptionLength}
          {...register("description", { required: true })}
        />
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={
            !watch("name") ||
            !watch("school") ||
            !watch("castingTime") ||
            !watch("range") ||
            !watch("components") ||
            !watch("duration") ||
            !watch("description")
          }
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {editingMeta ? "Actualizar Hechizo" : "Inscribir en el Grimorio"}
        </Button>
      </form>
    </div>
  );
}
