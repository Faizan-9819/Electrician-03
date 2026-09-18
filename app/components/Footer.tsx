"use client";

import Logo from "./Logo";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

const FOOTER_COLUMNS: { title: Translation; items: Translation[] }[] = [
  {
    title: { en: "Company", nl: "Bedrijf" },
    items: [
      { en: "Home", nl: "Home" },
      { en: "About", nl: "Over ons" },
      { en: "Why Us", nl: "Waarom wij" },
      { en: "Team", nl: "Team" },
      { en: "Projects", nl: "Projecten" },
      { en: "Blog", nl: "Blog" },
    ],
  },
  {
    title: { en: "Services", nl: "Diensten" },
    items: [
      { en: "Emergency Repairs", nl: "Spoedreparaties" },
      { en: "Lighting", nl: "Verlichting" },
      { en: "Fuse Box Upgrades", nl: "Meterkast vervangen" },
      { en: "Inspections", nl: "Keuringen" },
      { en: "Commercial", nl: "Zakelijk" },
      { en: "EV Chargers", nl: "Laadpalen" },
    ],
  },
];

const SOCIALS = ["Instagram", "LinkedIn", "Google"];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black pt-10 md:pt-20 pb-8 text-ink">
      <div className="fix">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] md:gap-12">
          <div>
            <Logo color="#fff" />
            <p className="mt-5 max-w-[300px] text-sm leading-[1.6] text-[#9CABA6]">
              {t({
                en: "Certified residential and commercial electricians — emergency repairs, installations, EV charging and smart home, across the Netherlands.",
                nl: "Gecertificeerde elektriciens voor woningen en bedrijven — spoedreparaties, installaties, laadpalen en domotica, in heel Nederland.",
              })}
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-white/14 px-3.5 py-[7px] text-[13px] text-[#D5E0DC]"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title.en}>
              <div className="mb-[18px] text-xs tracking-[.16em] text-[#7E8E89] uppercase">
                {t(col.title)}
              </div>
              <div className="grid gap-2.5">
                {col.items.map((i) => (
                  <a key={i.en} href="#" className="text-sm text-[#D5E0DC]">
                    {t(i)}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div className="mb-[18px] text-xs tracking-[.16em] text-[#7E8E89] uppercase">
              {t({ en: "Contact", nl: "Contact" })}
            </div>
            <div className="grid gap-3 text-sm text-[#D5E0DC]">
              <div>
                Contactweg 36
                <br />
                1014 AN Amsterdam
              </div>
              <div>
                +31 (0)20 123 4567
                <br />
                hello@strom-electric.nl
              </div>
              <div className="mt-1 text-[12.5px] text-[#9CABA6]">
                {t({ en: "Mon–Fri 07:00–20:00", nl: "Ma–vr 07:00–20:00" })}
                <br />
                {t({ en: "Sat 08:00–17:00", nl: "Za 08:00–17:00" })}
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-6 md:mt-14 mb-6 h-px border-0 bg-white/8" />

        <div className="flex flex-wrap items-center justify-between gap-5 text-[12.5px] text-[#7E8E89]">
          <div>© 2026 Strøm Electric · KvK 81234567 · BTW NL003456789B01</div>
          <div className="flex flex-wrap gap-6">
            <a href="#privacy" className="text-[#9CABA6]">
              {t({ en: "Privacy Policy", nl: "Privacybeleid" })}
            </a>
            <a href="#cookies" className="text-[#9CABA6]">
              {t({ en: "Cookie Settings", nl: "Cookievoorkeuren" })}
            </a>
            <a href="#terms" className="text-[#9CABA6]">
              {t({ en: "Terms & Conditions", nl: "Algemene voorwaarden" })}
            </a>
            <a href="#imprint" className="text-[#9CABA6]">
              {t({ en: "Imprint", nl: "Colofon" })}
            </a>
          </div>
        </div>

        <div className="md:mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/6 pt-6 text-[11.5px] text-[#5E6E69]">
          <span>
            {t({ en: "A flagship template by", nl: "Een flagship-template van" })}{" "}
            <span className="text-[#B9CFC6]">Growth Rocket</span>{" "}
            {t({
              en: "— managed websites & booking for small businesses.",
              nl: "— beheerde websites & boekingen voor kleine bedrijven.",
            })}
          </span>
          <span className="tracking-[.18em] uppercase">
            {t({ en: "Designed in Amsterdam", nl: "Ontworpen in Amsterdam" })}
          </span>
        </div>
      </div>
    </footer>
  );
}
