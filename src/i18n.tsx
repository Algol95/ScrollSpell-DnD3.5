import { useEffect, useState, type ReactNode } from "react";
import {
  getInitialLocale,
  LANGUAGE_STORAGE_KEY,
  LanguageContext,
  messages,
  type Locale,
} from "./i18n-utils";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  }, [locale]);

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, messages: messages[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
