"use client";

import Icon from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

type Step = {
  n: string;
  title: Translation;
  body: Translation;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: { en: "Book appointment", nl: "Maak een afspraak" },
    body: {
      en: "Choose a convenient date online or by phone. We confirm quickly and send everything you need before we arrive.",
      nl: "Kies online of telefonisch een geschikte datum. Wij bevestigen snel en sturen alles wat je nodig hebt voordat we langskomen.",
    },
  },
  {
    n: "02",
    title: { en: "Site inspection", nl: "Inspectie op locatie" },
    body: {
      en: "We assess the issue or project on site, explain the options clearly, and agree a fixed, transparent price.",
      nl: "Wij beoordelen het probleem of project ter plaatse, leggen de mogelijkheden duidelijk uit en spreken een vaste, transparante prijs af.",
    },
  },
  {
    n: "03",
    title: { en: "Professional installation", nl: "Professionele installatie" },
    body: {
      en: "Certified electricians complete the work safely, cleanly and to the latest NEN 1010 standards.",
      nl: "Gecertificeerde elektriciens voeren het werk veilig en netjes uit, volgens de nieuwste NEN 1010-normen.",
    },
  },
  {
    n: "04",
    title: { en: "Testing & completion", nl: "Testen & afronding" },
    body: {
      en: "Every installation is thoroughly tested and certified before handover, with full documentation.",
      nl: "Elke installatie wordt grondig getest en gecertificeerd voor overdracht, met volledige documentatie.",
    },
  },
];

export default function Process() {
  const { t } = useLanguage();

  return (
    <section
      id="process"
      className="section-py bg-black"
      style={{
        background:
          "radial-gradient(900px 460px at 82% -8%, rgba(255,176,32,.10), transparent 60%), #0E0E0E",
      }}
    >
      <div className="fix">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal max-w-[620px]">
            <span className="eyebrow" style={{ color: "var(--accent-soft)" }}>
              {t({ en: "How we work", nl: "Hoe wij werken" })}
            </span>
            <h2 className="mt-4.5 text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em] text-white">
              {t({ en: "Four steps —", nl: "Vier stappen —" })} <br />
              <span
                className="display-serif"
                style={{ color: "var(--accent-soft)" }}
              >
                {t({ en: "no surprises.", nl: "geen verrassingen." })}
              </span>
            </h2>
          </div>
          <p className="reveal reveal-d1 max-w-[380px] text-lg leading-[1.6] text-[#A9B6B1]">
            {t({
              en: "The same clear process for a single repair or a full installation. You always know exactly what's next.",
              nl: "Hetzelfde duidelijke proces voor een enkele reparatie of een volledige installatie. Je weet altijd precies wat er hierna komt.",
            })}
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute top-9 left-[6%] right-[6%] z-0 hidden h-px bg-white/[.12] lg:block" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`group reveal reveal-d${i + 1} relative`}
              >
                <div className="display-serif relative z-[1] mb-6 flex h-18 w-18 items-center justify-center rounded-full border border-white/[.14] bg-white/[.04] text-[28px] text-accent-soft transition-colors duration-300 group-hover:bg-accent group-hover:text-[#0B0B0B]">
                  {s.n}
                </div>
                <h4 className="text-lg leading-[1.3] font-medium tracking-[-.01em] text-white">
                  {t(s.title)}
                </h4>
                <p className="mt-2.5 text-sm leading-[1.6] text-[#9CABA6]">
                  {t(s.body)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/[.08] bg-white/[.04] px-8 py-7">
          <div className="flex items-center gap-4">
            <span className="flex w-14 h-10.5 md:w-10.5 items-center justify-center rounded-full bg-accent">
              <Icon name="calendar" size={18} />
            </span>
            <div>
              <div className="text-[15px] text-white">
                {t({
                  en: "Most call-outs booked in under 2 minutes",
                  nl: "De meeste afspraken worden in minder dan 2 minuten geboekt",
                })}
              </div>
              <div className="mt-0.5 text-[13px] text-[#9CABA6]">
                {t({
                  en: "Same-day appointments usually available.",
                  nl: "Afspraken op dezelfde dag meestal mogelijk.",
                })}
              </div>
            </div>
          </div>
          <a href="#book" className="btn btn--accent w-full md:w-auto">
            {t({ en: "Book an appointment", nl: "Maak een afspraak" })}{" "}
            <span
              className="arrow"
              style={{ background: "rgba(255,255,255,.18)" }}
            >
              <Icon name="arrowUR" size={11} stroke={2} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
