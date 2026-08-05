export const locales = ["es", "en", "ar", "tr", "bg"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

// Solo "es" tiene contenido en esta fase; el resto se activa en la fase 9
// del roadmap (ver CLAUDE.md) cuando haya traducciones.
export const enabledLocales: Locale[] = ["es"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
