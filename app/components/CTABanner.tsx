"use client";

import Icon from "./Icon";
import type { IconName } from "./Icon";
import WhatsAppIcon from "../global/WhatsAppIcon";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

type ContactRow = {
  icon: IconName;
  label: Translation;
  value: Translation;
};

const CONTACT_ROWS: ContactRow[] = [
  {
    icon: "phone",
    label: { en: "Call us", nl: "Bel ons" },
    value: { en: "+31 (0)20 123 4567", nl: "+31 (0)20 123 4567" },
  },
  {
    icon: "mail",
    label: { en: "Email", nl: "E-mail" },
    value: { en: "hello@strom-electric.nl", nl: "hello@strom-electric.nl" },
  },
  {
    icon: "clock",
    label: { en: "Open today", nl: "Vandaag open" },
    value: {
      en: "Mon–Fri 07:00–20:00 · Sat 08:00–17:00",
      nl: "Ma–vr 07:00–20:00 · Za 08:00–17:00",
    },
  },
];

export default function CTABanner() {
  const { t } = useLanguage();

  return (
    <section id="book" className="section-py">
      <div className="fix">
        <div className="relative overflow-hidden rounded-2xl px-16 py-20 text-white max-[900px]:px-7 max-[900px]:py-12 [background:linear-gradient(135deg,#231A09_0%,#0A0A0A_72%)]">
          {/* abstract shapes */}
          <svg
            className="pointer-events-none absolute -top-20 -right-20 h-[420px] w-[420px] opacity-[.18]"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="80" stroke="#fff" strokeWidth=".4" fill="none" />
            <circle cx="100" cy="100" r="55" stroke="#fff" strokeWidth=".4" fill="none" />
            <circle cx="100" cy="100" r="30" stroke="#fff" strokeWidth=".4" fill="none" />
          </svg>
          <svg
            className="pointer-events-none absolute -bottom-[100px] -left-[60px] h-[340px] w-[340px] opacity-10"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="90" stroke="var(--accent-soft)" strokeWidth=".5" fill="none" />
            <circle cx="100" cy="100" r="60" stroke="var(--accent-soft)" strokeWidth=".5" fill="none" />
          </svg>

          <div className="relative grid grid-cols-1 items-center gap-12 max-[900px]:gap-8 md:grid-cols-[1.4fr_1fr]">
            <div className="reveal">
              <span className="eyebrow" style={{ color: "var(--accent-soft)" }}>
                {t({ en: "Ready when you are", nl: "Klaar wanneer jij er klaar voor bent" })}
              </span>
              <h2 className="mt-[18px] text-[clamp(36px,4vw,56px)] leading-[1.05] font-normal tracking-[-.022em] text-white">
                {t({ en: "Book your", nl: "Boek je" })}
                <br />
                {t({ en: "electrician", nl: "elektricien" })}{" "}
                <span className="display-serif text-accent-soft">
                  {t({ en: "today.", nl: "vandaag." })}
                </span>
              </h2>
              <p className="mt-5 max-w-[520px] text-[17px] leading-[1.55] text-white/70">
                {t({
                  en: "Tell us about your project and we'll confirm your appointment quickly — with transparent, itemised pricing before any work begins.",
                  nl: "Vertel ons over je project en wij bevestigen je afspraak snel — met transparante, gespecificeerde prijzen voordat het werk begint.",
                })}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#book" className="btn btn--accent btn--lg">
                  {t({ en: "Book appointment", nl: "Maak een afspraak" })}{" "}
                  <span className="arrow" style={{ background: "rgba(255,255,255,.2)" }}>
                    <Icon name="arrowUR" size={12} stroke={2} />
                  </span>
                </a>
                <a
                  href="https://wa.me/31644008821"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--lg border border-white/18 bg-white/10 text-white"
                >
                  <WhatsAppIcon size={16} /> {t({ en: "Chat on WhatsApp", nl: "Chat via WhatsApp" })}
                </a>
              </div>
            </div>

            <div className="grid gap-3.5">
              {CONTACT_ROWS.map((r, i) => (
                <div
                  key={r.label.en}
                  className={`reveal reveal-d${i + 1} flex items-center gap-3.5 rounded-md border border-white/10 bg-white/[.06] p-[18px]`}
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white/10 text-white">
                    <Icon name={r.icon} size={17} />
                  </span>
                  <div>
                    <div className="text-xs tracking-[.06em] text-white/55 uppercase">
                      {t(r.label)}
                    </div>
                    <div className="mt-1 text-[15px]">{t(r.value)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
