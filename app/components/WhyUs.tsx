"use client";

import Icon, { type IconName } from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

type WhyPoint = {
  icon: IconName;
  title: Translation;
  body: Translation;
};

const WHY: WhyPoint[] = [
  {
    icon: "award",
    title: { en: "Certified electricians", nl: "Gecertificeerde elektriciens" },
    body: {
      en: "Every job is led by a fully qualified, NEN-certified electrician. No subcontractors, no shortcuts.",
      nl: "Elke klus wordt uitgevoerd door een volledig gekwalificeerde, NEN-gecertificeerde elektricien. Geen onderaannemers, geen omwegen.",
    },
  },
  {
    icon: "wallet",
    title: { en: "Transparent pricing", nl: "Transparante prijzen" },
    body: {
      en: "Fixed, itemised quotes approved before any work begins. The price we agree is the price you pay.",
      nl: "Vaste, gespecificeerde offertes die worden goedgekeurd voordat het werk begint. De afgesproken prijs is de prijs die je betaalt.",
    },
  },
  {
    icon: "clock",
    title: { en: "Fast response", nl: "Snelle respons" },
    body: {
      en: "24/7 emergency line with electricians on call. Most urgent call-outs reached within the hour.",
      nl: "24/7 storingslijn met elektriciens standby. De meeste spoedgevallen worden binnen het uur bereikt.",
    },
  },
  {
    icon: "check",
    title: { en: "Guaranteed workmanship", nl: "Gegarandeerd vakmanschap" },
    body: {
      en: "Every installation is fully tested, certified and backed by our workmanship guarantee.",
      nl: "Elke installatie wordt volledig getest, gecertificeerd en gedekt door onze vakmanschapsgarantie.",
    },
  },
  {
    icon: "tools",
    title: { en: "Latest equipment", nl: "Nieuwste apparatuur" },
    body: {
      en: "Thermal imaging, calibrated testers and modern tooling for precise, efficient, future-ready work.",
      nl: "Thermische beeldvorming, gekalibreerde testapparatuur en modern gereedschap voor nauwkeurig, efficiënt en toekomstbestendig werk.",
    },
  },
  {
    icon: "shield",
    title: { en: "Safety first", nl: "Veiligheid voorop" },
    body: {
      en: "We work to the latest regulations and leave every site clean, labelled and fully documented.",
      nl: "Wij werken volgens de nieuwste voorschriften en laten elke locatie schoon, gelabeld en volledig gedocumenteerd achter.",
    },
  },
];

export default function WhyUs() {
  const { t } = useLanguage();

  return (
    <section id="why" className="section-py">
      <div className="fix">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-24">
          <div className="reveal lg:sticky lg:top-30">
            <span className="eyebrow">
              {t({ en: "Why clients choose us", nl: "Waarom klanten voor ons kiezen" })}
            </span>
            <h2 className="mt-4.5 text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              {t({ en: "Six reasons the work", nl: "Zes redenen waarom het werk" })}
              <br />
              {t({ en: "just", nl: "gewoon" })}{" "}
              <span className="display-serif text-accent-deep">
                {t({ en: "feels safer.", nl: "veiliger aanvoelt." })}
              </span>
            </h2>
            <p className="lede mt-5 text-ink-2">
              {t({
                en: "We optimise for the things that matter on site: certified work, a clean finish, a fair price and a job that's signed off properly.",
                nl: "Wij focussen op wat er op locatie echt toe doet: gecertificeerd werk, een net afgewerkt resultaat, een eerlijke prijs en een klus die correct wordt afgerond.",
              })}
            </p>
            <div className="mt-9 rounded-md border border-tint-2 bg-tint p-6">
              <div className="flex items-center gap-2.5 text-accent-deep">
                <Icon name="quote" size={18} />
                <span className="text-xs tracking-[.16em] uppercase">
                  {t({ en: "From a recent job", nl: "Van een recente klus" })}
                </span>
              </div>
              <p className="display-serif mt-3 text-[22px] leading-[1.35]">
                {t({
                  en: '"They turned up on time, explained everything, and left the place spotless. Rare these days."',
                  nl: '"Ze kwamen op tijd, legden alles duidelijk uit en lieten de plek spotschoon achter. Tegenwoordig zeldzaam."',
                })}
              </p>
              <div className="mt-3 text-[13px] text-muted">
                {t({
                  en: "— Jasper L., homeowner, Utrecht",
                  nl: "— Jasper L., huiseigenaar, Utrecht",
                })}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {WHY.map((w, i) => (
              <div
                key={w.icon}
                className={`reveal reveal-d${Math.min(i + 1, 6)} bg-surface p-8`}
              >
                <span className="mb-4.5 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-tint text-accent-deep">
                  <Icon name={w.icon} size={18} />
                </span>
                <h4 className="text-[17px] leading-[1.3] font-medium tracking-[-.01em]">
                  {t(w.title)}
                </h4>
                <p className="mt-2.5 text-sm leading-[1.55] text-ink-2">{t(w.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
