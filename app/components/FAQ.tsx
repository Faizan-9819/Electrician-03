"use client";

import { useState } from "react";
import Icon from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

type FAQData = { q: Translation; a: Translation };

const FAQS: FAQData[] = [
  {
    q: {
      en: "Do you offer 24/7 emergency electrical services?",
      nl: "Bieden jullie 24/7 storingsdienst aan?",
    },
    a: {
      en: "Yes. We run a round-the-clock emergency line with certified electricians on call every day of the year, including evenings, weekends and public holidays. Whether it's a total power loss, a tripping circuit or a burning smell, call us and we will make it safe.",
      nl: "Ja. Wij hebben een 24 uur per dag bereikbare storingslijn met gecertificeerde elektriciens die het hele jaar rond stand-by staan, ook 's avonds, in het weekend en op feestdagen. Of het nu gaat om totale stroomuitval, een doorslaande groep of een brandlucht — bel ons en wij maken de situatie veilig.",
    },
  },
  {
    q: {
      en: "How quickly can an electrician arrive?",
      nl: "Hoe snel kan een elektricien aanwezig zijn?",
    },
    a: {
      en: "For genuine emergencies across the Randstad we aim to have an electrician with you within the hour, and often sooner. For standard work we usually offer same-day or next-day appointments, booked online or by phone in under two minutes.",
      nl: "Bij echte spoedgevallen in de Randstad streven we ernaar binnen het uur een elektricien bij je te hebben, vaak sneller. Voor regulier werk bieden we meestal dezelfde dag of de volgende dag een afspraak, binnen twee minuten online of telefonisch te boeken.",
    },
  },
  {
    q: { en: "Are your electricians certified?", nl: "Zijn jullie elektriciens gecertificeerd?" },
    a: {
      en: "Every electrician is fully qualified and works to NEN 1010 standards. We are NEN, VCA and InstallQ certified, fully insured, and every installation is tested and issued with the appropriate certification and documentation.",
      nl: "Elke elektricien is volledig gekwalificeerd en werkt volgens de NEN 1010-norm. Wij zijn NEN-, VCA- en InstallQ-gecertificeerd, volledig verzekerd, en elke installatie wordt getest en voorzien van de juiste certificering en documentatie.",
    },
  },
  {
    q: { en: "Can you install EV chargers?", nl: "Kunnen jullie laadpalen installeren?" },
    a: {
      en: "Yes — EV charging is one of our specialisms. We install home and workplace chargers from all leading brands, handle load balancing and any board upgrades required, and register the installation so it is ready for the grid.",
      nl: "Ja — laadpalen installeren is een van onze specialismen. Wij installeren laadpalen voor thuis en op de werkplek van alle bekende merken, regelen loadbalancing en eventuele meterkastaanpassingen, en melden de installatie aan zodat deze klaar is voor het net.",
    },
  },
  {
    q: {
      en: "Do you provide commercial electrical services?",
      nl: "Bieden jullie ook zakelijke elektrotechnische diensten aan?",
    },
    a: {
      en: "We do. From office fit-outs and retail units to distribution boards and ongoing maintenance contracts for light-industrial sites, we deliver commercial electrical work with minimal disruption and full compliance.",
      nl: "Jazeker. Van kantoorverbouwingen en winkelpanden tot verdeelinrichtingen en doorlopende onderhoudscontracten voor lichte industrie — wij leveren zakelijk elektrotechnisch werk met minimale verstoring en volledige naleving van de normen.",
    },
  },
  {
    q: {
      en: "How much does an electrical inspection cost?",
      nl: "Hoeveel kost een elektrische keuring?",
    },
    a: {
      en: "A standard residential condition report (EICR-equivalent) starts from a fixed, transparent price that we confirm before booking. Larger or commercial premises are quoted individually after a short scoping call. There are never any hidden fees.",
      nl: "Een standaard keuringsrapport voor woningen begint bij een vaste, transparante prijs die we vóór het boeken bevestigen. Grotere of zakelijke panden krijgen een individuele offerte na een kort verkennend gesprek. Er zijn nooit verborgen kosten.",
    },
  },
];

type FAQItemProps = FAQData & {
  open: boolean;
  onClick: () => void;
  revealClass?: string;
};

function FAQItem({ q, a, open, onClick, revealClass = "" }: FAQItemProps) {
  const { t } = useLanguage();
  return (
    <div className={`${revealClass} border-b border-line`}>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-[17px] font-medium tracking-[-.01em] text-ink">
          {t(q)}
        </span>
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
            open ? "bg-accent text-[#0B0B0B]" : "bg-tint text-accent-deep"
          }`}
        >
          <Icon name={open ? "minus" : "plus"} size={15} stroke={2} />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[760px] pb-6 text-[15px] leading-[1.6] text-ink-2">
            {t(a)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="section-py border-t border-b border-line bg-tint"
    >
      <div className="fix">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-start md:gap-20">
          <div className="reveal md:sticky md:top-30">
            <span className="eyebrow">{t({ en: "Questions", nl: "Vragen" })}</span>
            <h2 className="mt-[18px] text-[34px] md:text-[52px]">
              {t({ en: "Most things,", nl: "De meeste vragen," })}
              <br />
              <span className="display-serif text-accent-deep text-[34px] md:text-[52px]">
                {t({ en: "answered.", nl: "beantwoord." })}
              </span>
            </h2>
            <p className="lede mt-5">
              {t({
                en: "Can't find what you're looking for? Send us a message — we usually reply within the hour during office hours.",
                nl: "Kun je niet vinden wat je zoekt? Stuur ons een bericht — tijdens kantooruren reageren we meestal binnen het uur.",
              })}
            </p>
            <a href="#contact" className="btn btn--primary mt-7">
              {t({ en: "Ask a question", nl: "Stel een vraag" })}{" "}
              <span className="arrow">
                <Icon name="arrowUR" size={11} stroke={2} />
              </span>
            </a>
          </div>
          <div>
            {FAQS.map((f, i) => (
              <FAQItem
                key={f.q.en}
                {...f}
                open={open === i}
                onClick={() => setOpen(i)}
                revealClass={`reveal reveal-d${Math.min(i + 1, 6)}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
