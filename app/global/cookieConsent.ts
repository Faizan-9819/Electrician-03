// Shared cookie-consent storage helpers, used by both the first-visit
// corner banner (CookieConsentBanner) and the full preferences dialog
// (CookieModal) so they always read/write the exact same record.

export const COOKIE_CONSENT_STORAGE_KEY = "strom-cookie-consent";

export type CookiePrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export const DEFAULT_COOKIE_PREFS: CookiePrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export const ALL_COOKIE_PREFS: CookiePrefs = {
  necessary: true,
  analytics: true,
  marketing: true,
  functional: true,
};

export function readStoredCookiePrefs(): CookiePrefs {
  if (typeof window === "undefined") return DEFAULT_COOKIE_PREFS;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_COOKIE_PREFS;
    const parsed = JSON.parse(raw) as Partial<CookiePrefs>;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      functional: !!parsed.functional,
    };
  } catch {
    return DEFAULT_COOKIE_PREFS;
  }
}

export function storeCookiePrefs(prefs: CookiePrefs) {
  try {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify({ ...prefs, updatedAt: new Date().toISOString() }),
    );
  } catch {
    // localStorage unavailable — preference simply won't persist.
  }
}

// Whether the visitor has already made a cookie choice (accept/reject/save).
// Used to decide whether the first-visit banner should appear at all.
export function hasStoredCookieConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}
