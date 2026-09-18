"use client";

import Image from "next/image";
import Icon from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

const STATS: { value: Translation; label: Translation }[] = [
  { value: { en: "15+", nl: "15+" }, label: { en: "Years experience", nl: "Jaar ervaring" } },
  {
    value: { en: "2,000+", nl: "2.000+" },
    label: { en: "Projects completed", nl: "Voltooide projecten" },
  },
  { value: { en: "24/7", nl: "24/7" }, label: { en: "Emergency service", nl: "Storingsdienst" } },
  { value: { en: "4.9★", nl: "4,9★" }, label: { en: "Customer rating", nl: "Klantbeoordeling" } },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-py">
      <div className="fix">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          <div className="reveal relative">
            <div className="media relative aspect-[4/5] rounded-xl shadow-md">
              <Image
                src="/images/about-electrician-fitting.jpg"
                alt={t({
                  en: "Strøm electrician fitting a light fitting",
                  nl: "Strøm elektricien monteert een lichtarmatuur",
                })}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,11,0) 55%, rgba(11,11,11,.35) 100%)",
                }}
              />
            </div>
            <div className="absolute -right-6 -bottom-6 w-[240px] rounded-md border border-line bg-surface p-6 shadow-lg">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-tint text-accent-deep">
                  <Icon name="award" size={16} />
                </span>
                <div className="text-[13px] font-medium">
                  {t({
                    en: "Top-rated electrician 2025",
                    nl: "Best beoordeelde elektricien 2025",
                  })}
                </div>
              </div>
              <div className="mt-2 text-xs leading-normal text-muted">
                {t({
                  en: "Homeowner's choice award, Noord-Holland.",
                  nl: "Keuze van huiseigenaren award, Noord-Holland.",
                })}
              </div>
            </div>
          </div>

          <div className="reveal reveal-d1">
            <span className="eyebrow">{t({ en: "About Strøm", nl: "Over Strøm" })}</span>
            <h2 className="mt-4.5 text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              {t({ en: "Powering homes with", nl: "Huizen van stroom voorzien met" })}{" "}
              <span className="display-serif text-accent-deep">
                {t({ en: "precision.", nl: "precisie." })}
              </span>
            </h2>
            <p className="lede mt-5 max-w-[520px]">
              {t({
                en: "For over fifteen years we've helped homeowners and businesses with safe, reliable and future-ready electrical solutions. Every project is delivered with technical expertise, transparent communication and uncompromising safety standards.",
                nl: "Al meer dan vijftien jaar helpen wij huiseigenaren en bedrijven met veilige, betrouwbare en toekomstbestendige elektrotechnische oplossingen. Elk project wordt geleverd met technische expertise, transparante communicatie en compromisloze veiligheidsnormen.",
              })}
            </p>
            <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
              {STATS.map((s, i) => (
                <div
                  key={s.label.en}
                  className={`reveal reveal-d${i + 2} bg-surface px-5.5 py-6`}
                >
                  <div className="display-serif text-[38px] leading-none">{t(s.value)}</div>
                  <div className="mt-2 text-[13px] tracking-[-.005em] text-muted">
                    {t(s.label)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#team" className="btn btn--primary">
                {t({ en: "Meet the team", nl: "Ontmoet het team" })}{" "}
                <span className="arrow">
                  <Icon name="arrowUR" size={11} stroke={2} />
                </span>
              </a>
              <a href="#process" className="btn btn--ghost">
                {t({ en: "Our process", nl: "Ons proces" })}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
