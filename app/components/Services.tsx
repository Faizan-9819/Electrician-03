"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButton from "./CarouselNavButton";
import { useCarouselNav } from "./useCarouselNav";
import Icon, { type IconName } from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

type Service = {
  id: string;
  icon: IconName;
  img: string;
  title: Translation;
  body: Translation;
  tag: Translation | null;
};

type ResolvedService = {
  id: string;
  icon: IconName;
  img: string;
  title: string;
  body: string;
  tag: string;
};

const SERVICES: Service[] = [
  {
    id: "emergency-repairs",
    icon: "bolt",
    img: "/images/services/emergency-repairs.jpg",
    title: { en: "Emergency Electrical Repairs", nl: "Spoedreparaties elektra" },
    body: {
      en: "24/7 rapid response for faults, outages and trips — certified electricians on call across the Netherlands.",
      nl: "24/7 snelle respons bij storingen, uitval en kortsluiting — gecertificeerde elektriciens standby in heel Nederland.",
    },
    tag: { en: "24/7", nl: "24/7" },
  },
  {
    id: "lighting-installation",
    icon: "bulb",
    img: "/images/services/lighting-installation.jpg",
    title: { en: "Lighting Installation", nl: "Verlichting installeren" },
    body: {
      en: "Architectural, LED and accent lighting designed and installed for warmth, efficiency and control.",
      nl: "Architecturale, LED- en accentverlichting ontworpen en geïnstalleerd voor warmte, efficiëntie en bediening.",
    },
    tag: null,
  },
  {
    id: "fuse-box-upgrades",
    icon: "panel",
    img: "/images/services/fuse-box-upgrades.jpg",
    title: { en: "Fuse Box Upgrades", nl: "Meterkast vervangen" },
    body: {
      en: "Modern consumer units and RCBO protection, fully tested and certified to NEN 1010 standards.",
      nl: "Moderne groepenkasten en RCBO-beveiliging, volledig getest en gecertificeerd volgens de NEN 1010-norm.",
    },
    tag: null,
  },
  {
    id: "electrical-inspections",
    icon: "gauge",
    img: "/images/services/electrical-inspections.jpg",
    title: { en: "Electrical Inspections", nl: "Elektrische keuringen" },
    body: {
      en: "Detailed condition reports and safety testing for homes, landlords and commercial premises.",
      nl: "Uitgebreide keuringsrapporten en veiligheidstests voor woningen, verhuurders en bedrijfspanden.",
    },
    tag: null,
  },
  {
    id: "commercial-electrical",
    icon: "building",
    img: "/images/services/commercial-electrical.jpg",
    title: { en: "Commercial Electrical", nl: "Zakelijke elektra" },
    body: {
      en: "Fit-outs, distribution boards and maintenance contracts for offices, retail and industrial sites.",
      nl: "Verbouwingen, verdeelinrichtingen en onderhoudscontracten voor kantoren, winkels en bedrijfslocaties.",
    },
    tag: null,
  },
  {
    id: "smart-home-automation",
    icon: "smart",
    img: "/images/services/smart-home-automation.jpg",
    title: { en: "Smart Home Automation", nl: "Slimme domotica" },
    body: {
      en: "Lighting, climate, security and energy — integrated into one calm, reliable system you control.",
      nl: "Verlichting, klimaat, beveiliging en energie — geïntegreerd in één rustig, betrouwbaar systeem dat jij bedient.",
    },
    tag: { en: "New", nl: "Nieuw" },
  },
  {
    id: "ev-charger-installation",
    icon: "ev",
    img: "/images/services/ev-charger-installation.jpg",
    title: { en: "EV Charger Installation", nl: "Laadpaal installeren" },
    body: {
      en: "Home and workplace charging from leading brands, load-balanced and ready for the grid.",
      nl: "Laadoplossingen voor thuis en op de werkplek van topmerken, met loadbalancing en klaar voor het net.",
    },
    tag: { en: "Popular", nl: "Populair" },
  },
];

function ServiceCard({ s }: { s: ResolvedService }) {
  const { t } = useLanguage();
  return (
    <div className="card relative flex min-h-[300px] flex-col overflow-hidden p-0">
      <div className="media relative aspect-[16/10] overflow-hidden rounded-none border-b border-line">
        <Image
          src={s.img}
          alt={s.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,11,0) 58%, rgba(11,11,11,.4))",
          }}
        />
        {s.tag && (
          <span className="absolute top-3.5 right-3.5 rounded-full bg-[rgba(8,8,8,.6)] px-2.5 py-1 text-[11px] tracking-[.08em] text-accent-deep uppercase backdrop-blur-[6px]">
            {s.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-6.5 pt-6 pb-6.5">
        <h3 className="text-xl leading-[1.2] font-medium tracking-[-.015em]">
          {s.title}
        </h3>
        <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.55] text-ink-2">
          {s.body}
        </p>
        <a
          href="#book"
          className="mt-5 inline-flex items-center gap-2 self-start text-[13.5px] font-medium"
        >
          {t({ en: "Learn more", nl: "Meer informatie" })}
          <span className="arrow">
            <Icon name="arrowRight" size={11} stroke={2} />
          </span>
        </a>
      </div>
    </div>
  );
}

function MoreCard() {
  const { t } = useLanguage();
  return (
    <a
      href="#contact"
      className="card relative flex min-h-[280px] flex-col justify-between p-7"
      style={{
        background: "linear-gradient(165deg, #221A09 0%, #0E0E0E 100%)",
        borderColor: "rgba(255,176,32,.28)",
      }}
    >
      <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-accent text-[#0B0B0B]">
        <Icon name="bolt" size={22} stroke={2} />
      </span>
      <div>
        <h3 className="text-xl leading-[1.2] font-medium tracking-[-.015em]">
          {t({ en: "Not sure what you need?", nl: "Niet zeker wat je nodig hebt?" })}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-[1.55] text-ink-2">
          {t({
            en: "Tell us about the job and we'll recommend the right service — with a fixed quote up front.",
            nl: "Vertel ons over de klus en wij adviseren de juiste dienst — met vooraf een vaste offerte.",
          })}
        </p>
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-medium text-accent-deep">
        {t({ en: "Get a free quote", nl: "Ontvang een gratis offerte" })}{" "}
        <span className="arrow" style={{ background: "rgba(255,176,32,.16)" }}>
          <Icon name="arrowUR" size={11} stroke={2} />
        </span>
      </span>
    </a>
  );
}

export default function Services() {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { prevDisabled, nextDisabled, onPrevClick, onNextClick } =
    useCarouselNav(emblaApi);

  const services: ResolvedService[] = SERVICES.map((s) => ({
    id: s.id,
    icon: s.icon,
    img: s.img,
    title: t(s.title),
    body: t(s.body),
    tag: s.tag ? t(s.tag) : "",
  }));

  return (
    <section
      id="services"
      className="section-py border-t border-b border-line bg-tint"
    >
      <div className="fix">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal max-w-[620px]">
            <span className="eyebrow">{t({ en: "Services", nl: "Diensten" })}</span>
            <h2 className="mt-4.5 text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              {t({ en: "Certified electrical work,", nl: "Gecertificeerd elektrisch werk," })} <br />
              <span className="display-serif text-accent-deep">
                {t({ en: "done right.", nl: "goed gedaan." })}
              </span>
            </h2>
          </div>
          <p className="lede reveal reveal-d1 max-w-[380px] text-ink-2">
            {t({
              en: "From a single socket to a full commercial fit-out — every job follows the same certified workflow, documented and tested end to end.",
              nl: "Van een enkel stopcontact tot een complete bedrijfsverbouwing — elke klus volgt hetzelfde gecertificeerde proces, van begin tot eind gedocumenteerd en getest.",
            })}
          </p>
        </div>

        {/* Desktop — static grid, no carousel */}
        <div className="reveal hidden gap-4.5 lg:grid lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
          <MoreCard />
        </div>

        {/* Mobile / tablet — carousel */}
        <div className="lg:hidden">
          <div className="reveal overflow-hidden" ref={emblaRef}>
            <div className="-ml-4.5 flex">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4.5 sm:basis-1/2"
                >
                  <ServiceCard s={s} />
                </div>
              ))}

              <div className="min-w-0 shrink-0 grow-0 basis-full pl-4.5 sm:basis-1/2">
                <MoreCard />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <a href="#book" className="btn btn--ghost">
            {t({ en: "View all services", nl: "Bekijk alle diensten" })}{" "}
            <Icon name="arrowRight" size={14} stroke={2} />
          </a>
          <div className="flex gap-2.5 lg:hidden">
            <CarouselNavButton
              direction="prev"
              onClick={onPrevClick}
              disabled={prevDisabled}
            />
            <CarouselNavButton
              direction="next"
              onClick={onNextClick}
              disabled={nextDisabled}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
