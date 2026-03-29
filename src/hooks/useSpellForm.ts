import { useState, useEffect } from "react";
import { type Spell } from "../../lib/types";

export interface UseSpellFormProps {
  editingSpell?: { pageId: string; spell: Spell } | null;
}

const INITIAL_FORM = {
  name: "",
  subtitle: "",
  level: "0",
  school: "",
  castingTime: "",
  range: "",
  components: "",
  duration: "",
  description: "",
  target: "",
  savingThrow: "",
  spellResistance: "",
};

export function useSpellForm({ editingSpell }: UseSpellFormProps) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [editingMeta, setEditingMeta] = useState<{
    pageId: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    if (editingSpell) {
      const { spell, pageId } = editingSpell;
      Promise.resolve().then(() => {
        setFormData({
          name: spell.name,
          subtitle: spell.subtitle ?? "",
          level: spell.level.toString(),
          school: spell.school,
          castingTime: spell.castingTime,
          range: spell.range,
          components: spell.components,
          duration: spell.duration,
          description: spell.description,
          target: spell.target ?? "",
          savingThrow: spell.savingThrow ?? "",
          spellResistance: spell.spellResistance ?? "",
        });
        setEditingMeta({ pageId, id: spell.id });
      });
    } else {
      Promise.resolve().then(() => {
        setEditingMeta(null);
        setFormData(INITIAL_FORM);
      });
    }
  }, [editingSpell]);

  const resetForm = () => setFormData(INITIAL_FORM);

  return {
    formData,
    setFormData,
    editingMeta,
    setEditingMeta,
    resetForm,
  };
}
