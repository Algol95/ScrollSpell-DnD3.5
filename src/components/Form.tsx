"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { SPELL_SCHOOLS, SPELL_LEVELS, type Spell } from "../../lib/types";
import { ScrollText, Sparkles } from "lucide-react";

interface SpellFormProps {
  onAddSpell: (spell: Spell) => void;
  onUpdateSpell: (pageId: string, spell: Spell) => void;
  currentPageNumber: number;
  editingSpell?: { pageId: string; spell: Spell } | null;
}

const DESCRIPTION_MAX_LENGTH = 3000;

/**
 * Componente de formulario para inscribir un hechizo. Permite ingresar los detalles del hechizo y enviarlos mediante la función onAddSpell.
 * @param onAddSpell Función que se llama al enviar el formulario para agregar un nuevo hechizo.
 * @param onUpdateSpell Función que se llama al enviar el formulario para actualizar un hechizo existente.
 * @param currentPageNumber Número de página actual, utilizado para mostrar en el encabezado del formulario.
 * @param editingSpell Objeto opcional que contiene el hechizo a editar y su página correspondiente. Si se proporciona, el formulario se rellenará con los datos del hechizo para su edición.
 * @returns Elemento JSX que representa el formulario de hechizo.
 */
export function Form({
  onAddSpell,
  onUpdateSpell,
  currentPageNumber,
  editingSpell,
}: SpellFormProps) {
  const [formData, setFormData] = useState({
    name: "",
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
  });

  const [editingMeta, setEditingMeta] = useState<{
    pageId: string;
    id: string;
  } | null>(null);

  const descriptionLength = formData.description.length;

  // Rellenar el formulario cuando recibimos un hechizo en edición
  useEffect(() => {
    if (editingSpell) {
      const { spell, pageId } = editingSpell;
      Promise.resolve().then(() => {
        setFormData({
          name: spell.name,
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
        setFormData({
          name: "",
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
        });
      });
    }
  }, [editingSpell]);

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
      setFormData({
        name: "",
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
      });
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
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Nombre del Hechizo *
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Bola de Fuego"
            required
            className="bg-input border-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="level" className="text-foreground">
              Nivel *
            </Label>
            <Select
              value={formData.level}
              onValueChange={(v) => setFormData({ ...formData, level: v })}
            >
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
            <Select
              value={formData.school}
              onValueChange={(v) => setFormData({ ...formData, school: v })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Escuela" />
              </SelectTrigger>
              <SelectContent>
                {SPELL_SCHOOLS.map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="castingTime" className="text-foreground">
              Tiempo de Lanzamiento *
            </Label>
            <Input
              id="castingTime"
              value={formData.castingTime}
              onChange={(e) =>
                setFormData({ ...formData, castingTime: e.target.value })
              }
              placeholder="1 acción estándar"
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="range" className="text-foreground">
              Alcance *
            </Label>
            <Input
              id="range"
              value={formData.range}
              onChange={(e) =>
                setFormData({ ...formData, range: e.target.value })
              }
              placeholder="Largo (120m)"
              required
              className="bg-input border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="components" className="text-foreground">
            Componentes *
          </Label>
          <Input
            id="components"
            value={formData.components}
            onChange={(e) =>
              setFormData({ ...formData, components: e.target.value })
            }
            placeholder="V, S, M (guano de murciélago)"
            required
            className="bg-input border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-foreground">
            Duración *
          </Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            placeholder="Instantáneo"
            required
            className="bg-input border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target" className="text-foreground">
            Objetivo/Área
          </Label>
          <Input
            id="target"
            value={formData.target}
            onChange={(e) =>
              setFormData({ ...formData, target: e.target.value })
            }
            placeholder="Esfera de 6m de radio"
            className="bg-input border-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="savingThrow" className="text-foreground">
              Tirada de Salvación
            </Label>
            <Input
              id="savingThrow"
              value={formData.savingThrow}
              onChange={(e) =>
                setFormData({ ...formData, savingThrow: e.target.value })
              }
              placeholder="Reflejos (mitad)"
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="spellResistance" className="text-foreground">
              Resistencia a Conjuros
            </Label>
            <Input
              id="spellResistance"
              value={formData.spellResistance}
              onChange={(e) =>
                setFormData({ ...formData, spellResistance: e.target.value })
              }
              placeholder="Sí"
              className="bg-input border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground">
            Descripción *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Una brillante estría sale de tu dedo apuntador hacia un punto que elijas..."
            required
            rows={4}
            maxLength={DESCRIPTION_MAX_LENGTH}
            className="bg-input border-border resize-none max-h-40 overflow-y-auto"
          />
          <div className="flex justify-end text-xs text-muted-foreground">
            {descriptionLength}/{DESCRIPTION_MAX_LENGTH}
          </div>
        </div>

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
