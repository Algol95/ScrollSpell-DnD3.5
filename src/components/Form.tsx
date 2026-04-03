"use client";

import { Button } from "../components/ui/Button";
import { ScrollText, Sparkles } from "lucide-react";
import { SPELL_SCHOOLS, type Spell } from "../../lib/types";
import { useSpellForm } from "../hooks/useSpellForm";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { SpellLevelSchoolRow } from "./form/SpellLevelSchoolRow";
import { SpellInputRow } from "./form/SpellInputRow";
import { SpellGridRow } from "./form/SpellGridRow";
import { SpellDescriptionRow } from "./form/SpellDescriptionRow";
import { useTranslation } from "../i18n-utils";

interface SpellFormProps {
  onAddSpell: (spell: Spell) => void;
  onUpdateSpell: (pageId: string, spell: Spell) => void;
  currentPageNumber: number;
  editingSpell?: { pageId: string; spell: Spell } | null;
}

const DESCRIPTION_MAX_LENGTH = 1500;

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
  const { messages } = useTranslation();
  const { editingMeta } = useSpellForm({ editingSpell }) as {
    editingMeta: { pageId: string; id: string } | null;
  };

  const { control, register, handleSubmit, reset, setValue } =
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

  const levelValue = useWatch({ control, name: "level" }) ?? "1";
  const schoolValue = useWatch({ control, name: "school" }) ?? SPELL_SCHOOLS[0];
  const nameValue = useWatch({ control, name: "name" }) ?? "";
  const castingTimeValue = useWatch({ control, name: "castingTime" }) ?? "";
  const rangeValue = useWatch({ control, name: "range" }) ?? "";
  const componentsValue = useWatch({ control, name: "components" }) ?? "";
  const durationValue = useWatch({ control, name: "duration" }) ?? "";
  const descriptionValue = useWatch({ control, name: "description" }) ?? "";
  const descriptionLength = descriptionValue.length;

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
          {editingMeta ? messages.form.editSpell : messages.form.inscribeSpell}
        </h2>
        <span className="ml-auto text-sm text-muted-foreground">
          {messages.form.page} {currentPageNumber}
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SpellInputRow
          id="name"
          label={messages.form.name}
          placeholder={messages.form.namePlaceholder}
          required
          {...register("name", { required: true })}
        />
        <SpellInputRow
          id="subtitle"
          label={`${messages.form.subtitle} (${messages.form.optional})`}
          placeholder={messages.form.subtitlePlaceholder}
          {...register("subtitle")}
        />
        <SpellLevelSchoolRow
          level={levelValue}
          school={schoolValue}
          setValue={setValue}
          spellSchools={[...SPELL_SCHOOLS]}
        />
        <SpellGridRow
          leftId="castingTime"
          leftLabel={`${messages.form.castingTime} *`}
          leftInputProps={{
            ...register("castingTime", { required: true }),
            placeholder: messages.form.castingTimePlaceholder,
            required: true,
          }}
          rightId="range"
          rightLabel={`${messages.form.range} *`}
          rightInputProps={{
            ...register("range", { required: true }),
            placeholder: messages.form.rangePlaceholder,
            required: true,
          }}
        />
        <SpellInputRow
          id="components"
          label={messages.form.components}
          placeholder={messages.form.componentsPlaceholder}
          required
          {...register("components", { required: true })}
        />
        <SpellInputRow
          id="duration"
          label={messages.form.duration}
          placeholder={messages.form.durationPlaceholder}
          required
          {...register("duration", { required: true })}
        />
        <SpellInputRow
          id="target"
          label={messages.form.target}
          placeholder={messages.form.targetPlaceholder}
          {...register("target")}
        />
        <SpellGridRow
          leftId="savingThrow"
          leftLabel={messages.form.savingThrow}
          leftInputProps={{
            ...register("savingThrow"),
            placeholder: messages.form.savingThrowPlaceholder,
          }}
          rightId="spellResistance"
          rightLabel={messages.form.spellResistance}
          rightInputProps={{
            ...register("spellResistance"),
            placeholder: messages.form.spellResistancePlaceholder,
          }}
        />
        <SpellDescriptionRow
          maxLength={DESCRIPTION_MAX_LENGTH}
          length={descriptionLength}
          {...register("description", { required: true })}
          placeholder={messages.form.descriptionPlaceholder}
        />
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={
            !nameValue ||
            !schoolValue ||
            !castingTimeValue ||
            !rangeValue ||
            !componentsValue ||
            !durationValue ||
            !descriptionValue
          }
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {editingMeta
            ? messages.form.updateSpell
            : messages.form.inscribeInSpellbook}
        </Button>
      </form>
    </div>
  );
}
