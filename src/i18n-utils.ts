import { createContext, useContext } from "react";
import en from "./locales/en.json";
import es from "./locales/es.json";

export const LANGUAGE_STORAGE_KEY = "spellbook_language";

export const messages = {
  en,
  es,
} as const;

export type Locale = keyof typeof messages;
export type Messages = (typeof messages)["en"];

const defaultTitles = Object.values(messages).map(
  (localeMessages) => localeMessages.header.defaultTitle,
);

const schoolAliases: Record<string, keyof Messages["schools"]> = {
  Abjuración: "Abjuración",
  Conjuración: "Conjuración",
  Adivinación: "Adivinación",
  Encantamiento: "Encantamiento",
  Evocación: "Evocación",
  Ilusión: "Ilusión",
  Nigromancia: "Nigromancia",
  Transmutación: "Transmutación",
  Universal: "Universal",
  Abjuration: "Abjuración",
  Conjuration: "Conjuración",
  Divination: "Adivinación",
  Enchantment: "Encantamiento",
  Evocation: "Evocación",
  Illusion: "Ilusión",
  Necromancy: "Nigromancia",
  Transmutation: "Transmutación",
};

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectSystemLocale(): Locale {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const languages = navigator.languages ?? [navigator.language];
  const hasSpanish = languages.some((language) =>
    language.toLowerCase().startsWith("es"),
  );

  return hasSpanish ? "es" : "en";
}

export function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const storedLocale = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLocale === "en" || storedLocale === "es") {
    return storedLocale;
  }

  return detectSystemLocale();
}

export function useTranslation() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }

  return context;
}

export function isDefaultTitle(title: string) {
  return defaultTitles.includes(title);
}

export function getSchoolLabel(school: string, localeMessages: Messages) {
  const key = schoolAliases[school];
  return key ? localeMessages.schools[key] : school;
}
