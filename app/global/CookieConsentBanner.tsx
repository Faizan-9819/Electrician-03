"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import {
  ALL_COOKIE_PREFS,
  DEFAULT_COOKIE_PREFS,
  hasStoredCookieConsent,
  storeCookiePrefs,
} from "./cookieConsent";

interface CookieConsentBannerProps {
  onManagePreferences: () => void;
}

// First-visit prompt only — a small corner card, distinct from the full
// preferences dialog (CookieModal). Shows once, a beat after load, and only
// when no choice has been recorded yet; any of the three actions here (or
// saving from the full dialog) records a choice so it never appears again.
export default function CookieConsentBanner({
  onManagePreferences,
}: CookieConsentBannerProps) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!hasStoredCookieConsent()) setVisible(true);
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

  const acceptAll = () => {
    storeCookiePrefs(ALL_COOKIE_PREFS);
    setVisible(false);
  };

  const rejectNonEssential = () => {
    storeCookiePrefs(DEFAULT_COOKIE_PREFS);
    setVisible(false);
  };

  const manage = () => {
    setVisible(false);
    onManagePreferences();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.22 }}
          role="dialog"
          aria-label={t({ en: "Cookie notice", nl: "Cookiemelding" })}
          data-lenis-prevent
          className="fixed bottom-0 right-4 z-[500] w-[calc(100vw-32px)] max-w-[360px] rounded-md border border-line bg-card p-5 shadow-2xl sm:bottom-6 sm:right-6"
        >
          <h2 className="text-[15px] font-bold text-ink">
            {t({ en: "We use cookies", nl: "Wij gebruiken cookies" })}
          </h2>
          <p className="mt-2 text-[13px] leading-[1.55] text-muted">
            {t({
              en: "We use cookies to make this website work properly and to understand how it's used. You can accept all, reject non-essential, or choose which ones to allow.",
              nl: "We gebruiken cookies om deze site goed te laten werken en te begrijpen hoe hij wordt gebruikt. Je kunt alles accepteren, niet-essentiële weigeren of zelf kiezen.",
            })}{" "}
            <a href="#privacy" className="text-ink-2 underline hover:text-ink">
              {t({ en: "Privacy Policy", nl: "Privacybeleid" })}
            </a>
          </p>

          <button
            type="button"
            onClick={acceptAll}
            className="btn-primary mt-4 w-full cursor-pointer"
          >
            {t({ en: "Accept all", nl: "Alles accepteren" })}
          </button>

          <div className="mt-2.5 flex items-center gap-4">
            <button
              type="button"
              onClick={rejectNonEssential}
              className="btn-secondary border-white/15 flex-1 cursor-pointer"
            >
              {t({
                en: "Reject non-essential",
                nl: "Niet-essentieel weigeren",
              })}
            </button>
            <button
              type="button"
              onClick={manage}
              className="shrink-0 text-[13px] font-medium text-ink-2 underline decoration-line underline-offset-2 hover:text-ink cursor-pointer"
            >
              {t({ en: "Manage preferences", nl: "Voorkeuren beheren" })}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
