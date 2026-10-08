"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

const secondaryBtn =
  "h-9 cursor-pointer whitespace-nowrap rounded-full border border-line px-4 text-[12.5px] font-medium text-ink transition-colors hover:border-ink-2 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:h-8";

// First-visit prompt only — a full-width bar stuck to the bottom edge,
// distinct from the full preferences dialog (CookieModal). Shows once, a beat
// after load, and only when no choice has been recorded yet; any of the three
// actions here (or saving from the full dialog) records a choice so it never
// appears again.
export default function CookieConsentBanner({
  onManagePreferences,
}: CookieConsentBannerProps) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!hasStoredCookieConsent()) setVisible(true);
    }, 900);
    return () => window.clearTimeout(timer);
  }, []);

  // Publish the bar's height as --cookie-bar-h so bottom-pinned UI (the
  // WhatsApp button in FloatingUI) can sit just above it while it's open.
  useEffect(() => {
    const el = barRef.current;
    if (!visible || !el) return;
    const root = document.documentElement;
    const ro = new ResizeObserver(() =>
      root.style.setProperty("--cookie-bar-h", `${el.offsetHeight}px`),
    );
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--cookie-bar-h");
    };
  }, [visible]);

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
          ref={barRef}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          role="dialog"
          aria-label={t({ en: "Cookie notice", nl: "Cookiemelding" })}
          data-lenis-prevent
          className="fixed inset-x-0 bottom-0 z-[500] border-t border-line bg-card shadow-[0_-8px_30px_rgba(0,0,0,0.45)]"
        >
          <div className="flex flex-col gap-3 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex min-w-0 flex-1 items-start gap-3 lg:items-center">
              <span
                aria-hidden
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01" />
                </svg>
              </span>
              <p className="text-[12.5px] leading-[1.55] text-muted">
                <strong className="font-semibold text-ink">
                  {t({ en: "We use cookies", nl: "Wij gebruiken cookies" })}
                </strong>
                <span className="mx-1.5">—</span>
                {t({
                  en: "We use cookies to make this website work properly and to understand how it's used. You can accept all, reject non-essential, or choose which ones to allow.",
                  nl: "We gebruiken cookies om deze site goed te laten werken en te begrijpen hoe hij wordt gebruikt. Je kunt alles accepteren, niet-essentiële weigeren of zelf kiezen.",
                })}{" "}
                <a
                  href="#privacy"
                  className="font-medium text-accent underline underline-offset-2 hover:text-accent-deep"
                >
                  {t({ en: "Privacy Policy", nl: "Privacybeleid" })}
                </a>
              </p>
            </div>

            {/* Mobile: the two secondary actions side by side, Accept all full width below. */}
            <div className="grid shrink-0 grid-cols-2 gap-2 lg:flex lg:items-center">
              <button
                type="button"
                onClick={rejectNonEssential}
                className={secondaryBtn}
              >
                {t({
                  en: "Reject non-essential",
                  nl: "Niet-essentieel weigeren",
                })}
              </button>
              <button type="button" onClick={manage} className={secondaryBtn}>
                {t({ en: "Manage preferences", nl: "Voorkeuren beheren" })}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="col-span-2 h-9 cursor-pointer whitespace-nowrap rounded-full bg-accent px-5 text-[12.5px] font-semibold text-[#0B0B0B] transition-colors hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:h-8"
              >
                {t({ en: "Accept all", nl: "Alles accepteren" })}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
