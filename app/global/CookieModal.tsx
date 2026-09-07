"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { useLenisControl } from "../components/SmoothScroll";
import {
  ALL_COOKIE_PREFS,
  type CookiePrefs,
  DEFAULT_COOKIE_PREFS,
  readStoredCookiePrefs,
  storeCookiePrefs,
} from "./cookieConsent";

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        checked ? "bg-accent" : "bg-line",
      ].join(" ")}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={[
          "absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-sm",
          checked ? "left-[23px]" : "left-[3px]",
        ].join(" ")}
      />
    </button>
  );
}

export default function CookieModal({ isOpen, onClose }: CookieModalProps) {
  const { t } = useLanguage();
  const { stop, start } = useLenisControl();
  const [prefs, setPrefs] = useState<CookiePrefs>(DEFAULT_COOKIE_PREFS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPrefs(readStoredCookiePrefs());
      setSaved(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      stop();
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
        start();
      };
    }
  }, [isOpen, stop, start]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const commit = (next: CookiePrefs) => {
    storeCookiePrefs(next);
    setPrefs(next);
    setSaved(true);
    window.setTimeout(onClose, 700);
  };

  // Accept-all doesn't change any toggle the user can see mid-close — store
  // the preference and close right away instead of animating every toggle
  // on first and only then closing.
  const acceptAllAndClose = () => {
    storeCookiePrefs(ALL_COOKIE_PREFS);
    onClose();
  };

  const rows: {
    key: "necessary" | "analytics" | "marketing" | "functional";
    title: string;
  }[] = [
    {
      key: "necessary",
      title: t({ en: "Essential", nl: "Essentieel" }),
    },
    {
      key: "analytics",
      title: t({ en: "Analytics", nl: "Analytisch" }),
    },
    {
      key: "marketing",
      title: t({ en: "Marketing", nl: "Marketing" }),
    },
    {
      key: "functional",
      title: t({ en: "Functional", nl: "Functioneel" }),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[1800] bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[1801] flex items-center justify-center p-3 lg:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ type: "spring", duration: 0.55, bounce: 0.28 }}
              className="relative w-full max-w-[520px] bg-card rounded-3xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[calc(100vh-24px)]"
              role="dialog"
              aria-modal="true"
              aria-label={t({
                en: "Cookie preferences",
                nl: "Cookievoorkeuren",
              })}
              data-lenis-prevent
            >
              <div className="relative shrink-0 px-6 lg:px-8 pt-6 pb-5 border-b border-line">
                <div className="relative flex items-start justify-between gap-4">
                  <h2 className="text-[clamp(20px,3.8vw,24px)] leading-[1.15] font-extrabold text-ink">
                    {t({
                      en: "Cookie preferences",
                      nl: "Cookievoorkeuren",
                    })}
                  </h2>
                  <button
                    onClick={onClose}
                    aria-label={t({ en: "Close", nl: "Sluiten" })}
                    className="shrink-0 -m-2 p-2 rounded-full text-muted hover:text-ink hover:bg-soft transition-colors cursor-pointer"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="relative px-6 lg:px-8 py-2 flex-1 min-h-0 overflow-y-auto touch-pan-y"
                data-lenis-prevent
              >
                <div className="divide-y divide-line">
                  {rows.map((row) => (
                    <div
                      key={row.key}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <div className="min-w-0 flex items-center gap-2.5">
                        <span className="text-[14.5px] font-semibold text-ink">
                          {row.title}
                        </span>
                        {row.key === "necessary" && (
                          <span className="shrink-0 rounded-full bg-soft px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[1px] text-muted">
                            {t({ en: "Always on", nl: "Altijd actief" })}
                          </span>
                        )}
                      </div>
                      <Toggle
                        label={row.title}
                        checked={row.key === "necessary" ? true : prefs[row.key]}
                        disabled={row.key === "necessary"}
                        onChange={(v) =>
                          setPrefs((prev) => ({ ...prev, [row.key]: v }))
                        }
                      />
                    </div>
                  ))}
                </div>

                {saved && (
                  <p className="mt-4 text-[13px] font-medium text-accent-deep">
                    {t({
                      en: "Preferences saved.",
                      nl: "Voorkeuren opgeslagen.",
                    })}
                  </p>
                )}

                <div className="mt-6 pb-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={acceptAllAndClose}
                    className="btn-secondary border-white/15 cursor-pointer"
                  >
                    {t({ en: "Accept all", nl: "Alles accepteren" })}
                  </button>
                  <button
                    type="button"
                    onClick={() => commit(prefs)}
                    className="btn-primary cursor-pointer"
                  >
                    {t({ en: "Save preferences", nl: "Voorkeuren opslaan" })}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
