"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";
import Logo from "./Logo";
import WhatsAppIcon from "../global/WhatsAppIcon";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Locale } from "../i18n/config";

const NAV = [
  { href: "#top", en: "Home", nl: "Home" },
  { href: "#about", en: "About", nl: "Over ons" },
  { href: "#services", en: "Services", nl: "Diensten" },
  { href: "#why", en: "Why Us", nl: "Waarom wij" },
  { href: "#blog", en: "Blog", nl: "Blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { locale, t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToLocale = (target: Locale) => {
    if (target === locale) return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push((target === "nl" ? "/nl" : "/") + hash);
  };

  const languageToggle = (display: string) => (
    <div
      role="group"
      aria-label="Language"
      className={`items-center gap-0.5 rounded-lg border border-line bg-surface p-[2px] ${display}`}
    >
      <button
        type="button"
        aria-pressed={locale === "en"}
        aria-label="English"
        onClick={() => goToLocale("en")}
        className={`rounded-[6px] px-2.5 py-[5px] text-[12px] font-semibold leading-none transition-colors ${
          locale === "en"
            ? "cursor-default bg-accent text-[#0B0B0B]"
            : "cursor-pointer text-ink-2 hover:text-accent"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={locale === "nl"}
        aria-label="Nederlands"
        onClick={() => goToLocale("nl")}
        className={`rounded-[6px] px-2.5 py-[5px] text-[12px] font-semibold leading-none transition-colors ${
          locale === "nl"
            ? "cursor-default bg-accent text-[#0B0B0B]"
            : "cursor-pointer text-ink-2 hover:text-accent"
        }`}
      >
        NL
      </button>
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-bg/[.82] backdrop-blur-[14px] backdrop-saturate-[1.4]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="fix flex h-[76px] items-center gap-8">
        <a href="#top">
          <Logo />
        </a>
        <nav className="ml-6 hidden gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-2 text-sm text-ink-2 transition-colors hover:bg-tint hover:text-ink"
            >
              {t({ en: n.en, nl: n.nl })}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <a
            href="https://wa.me/31644008821"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-accent-deep md:inline-flex"
          >
            <WhatsAppIcon size={18} />
          </a>
          {languageToggle("hidden md:inline-flex")}
          <a href="#contact" className="btn btn--ghost btn--sm hidden md:inline-flex">
            {t({ en: "Contact Us", nl: "Contact" })}
          </a>
          <a
            href="#book"
            className="btn btn--primary btn--sm hidden md:inline-flex"
          >
            {t({ en: "Book Appointment", nl: "Afspraak maken" })}{" "}
            <span className="arrow">
              <Icon name="arrowUR" size={11} stroke={2} />
            </span>
          </a>
          {languageToggle("inline-flex md:hidden")}
          <button
            className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line bg-surface md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "burger"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.18 }}
                className="inline-flex"
              >
                <Icon name={open ? "close" : "burger"} size={18} />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full overflow-hidden border-t border-line bg-surface shadow-lg md:hidden"
          >
            <div className="fix grid gap-0.5 py-2.5">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: 0.05 + i * 0.04 }}
                  className="rounded-[10px] px-2 py-3 text-[15px] text-ink"
                >
                  {t({ en: n.en, nl: n.nl })}
                </motion.a>
              ))}
              <motion.a
                href="#book"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: 0.05 + NAV.length * 0.04 }}
                className="btn btn--primary btn--sm mt-2 w-full"
              >
                {t({ en: "Book Appointment", nl: "Afspraak maken" })}{" "}
                <span className="arrow">
                  <Icon name="arrowUR" size={11} stroke={2} />
                </span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
