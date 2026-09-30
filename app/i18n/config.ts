import type { Language } from "@/settings";

export type Locale = Language;
export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "nl"];
export type Translation = { en: string; nl: string };

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "nl";
}
