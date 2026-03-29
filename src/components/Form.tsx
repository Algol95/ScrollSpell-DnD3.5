"use client";

import { Button } from "../components/ui/Button";
import { ScrollText, Sparkles } from "lucide-react";
import { SPELL_SCHOOLS, type Spell } from "../../lib/types";
import { useSpellForm } from "../hooks/useSpellForm";
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
  const { formData, setFormData, editingMeta, resetForm } = useSpellForm({
    editingSpell,
  });

  const descriptionLength = formData.description.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseSpell: Omit<Spell, "id"> = {
      name: formData.name,
      level: parseInt(formData.level),
      school: formData.school,
      castingTime: formData.castingTime,
      range: formData.range,
      components: formData.components,
      duration: formData.duration,
      description: formData.description,
      target: formData.target || undefined,
      savingThrow: formData.savingThrow || undefined,
      spellResistance: formData.spellResistance || undefined,
    };

    if (editingMeta) {
      onUpdateSpell(editingMeta.pageId, { id: editingMeta.id, ...baseSpell });
    } else {
      const spell: Spell = {
        id: crypto.randomUUID(),
        ...baseSpell,
      };
      onAddSpell(spell);
      resetForm();
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <SpellInputRow
          id="name"
          label="Nombre del Hechizo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Bola de Fuego"
          required
        />
        <SpellLevelSchoolRow
          level={formData.level}
          school={formData.school}
          setLevel={(v) => setFormData({ ...formData, level: v })}
          setSchool={(v) => setFormData({ ...formData, school: v })}
          spellSchools={[...SPELL_SCHOOLS]}
        />
        <SpellGridRow
          leftId="castingTime"
          leftLabel="Tiempo de Lanzamiento *"
          leftValue={formData.castingTime}
          leftOnChange={(e) =>
            setFormData({ ...formData, castingTime: e.target.value })
          }
          leftPlaceholder="1 acción estándar"
          rightId="range"
          rightLabel="Alcance *"
          rightValue={formData.range}
          rightOnChange={(e) =>
            setFormData({ ...formData, range: e.target.value })
          }
          rightPlaceholder="Largo (120m)"
        />
        <SpellInputRow
          id="components"
          label="Componentes"
          value={formData.components}
          onChange={(e) =>
            setFormData({ ...formData, components: e.target.value })
          }
          placeholder="V, S, M (guano de murciélago)"
          required
        />
        <SpellInputRow
          id="duration"
          label="Duración"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          placeholder="Instantáneo"
          required
        />
        <SpellInputRow
          id="target"
          label="Objetivo/Área"
          value={formData.target}
          onChange={(e) => setFormData({ ...formData, target: e.target.value })}
          placeholder="Esfera de 6m de radio"
        />
        <SpellGridRow
          leftId="savingThrow"
          leftLabel="Tirada de Salvación"
          leftValue={formData.savingThrow}
          leftOnChange={(e) =>
            setFormData({ ...formData, savingThrow: e.target.value })
          }
          leftPlaceholder="Reflejos (mitad)"
          rightId="spellResistance"
          rightLabel="Resistencia a Conjuros"
          rightValue={formData.spellResistance}
          rightOnChange={(e) =>
            setFormData({ ...formData, spellResistance: e.target.value })
          }
          rightPlaceholder="Sí"
        />
        <SpellDescriptionRow
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          maxLength={DESCRIPTION_MAX_LENGTH}
          length={descriptionLength}
        />
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={
            !formData.name ||
            !formData.school ||
            !formData.castingTime ||
            !formData.range ||
            !formData.components ||
            !formData.duration ||
            !formData.description
          }
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {editingMeta ? "Actualizar Hechizo" : "Inscribir en el Grimorio"}
        </Button>
      </form>
    </div>
  );
}
