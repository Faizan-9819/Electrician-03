"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { languageFromPathname, pathForLanguage } from "@/lib/i18n";
import type { Locale, Translation } from "./config";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (entry: Translation) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // The URL is the only source of truth. Deriving on every render keeps this
  // right on direct visits and on browser back/forward, with no mirrored
  // state that could drift out of sync.
  const locale = languageFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: (next) => {
        if (next === locale) return;
        router.push(pathForLanguage(next));
      },
      t: (entry) => entry[locale] ?? entry.en,
    }),
    [locale, router],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
