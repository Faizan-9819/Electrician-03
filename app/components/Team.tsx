"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButton from "./CarouselNavButton";
import { useCarouselNav } from "./useCarouselNav";
import Icon from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

type TeamMember = {
  name: string;
  role: Translation;
  exp: Translation;
  bio: Translation;
  photo: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Daan Visser",
    role: { en: "Lead Electrician · Installations", nl: "Hoofdelektricien · Installaties" },
    exp: { en: "15 yrs", nl: "15 jaar" },
    bio: {
      en: "NEN-certified master electrician. Leads rewires, fuse box upgrades and smart-home projects.",
      nl: "NEN-gecertificeerd erkend elektricien. Leidt bedrading, meterkastvervangingen en slimme-woningprojecten.",
    },
    photo: "/images/team/daan-visser.jpg",
  },
  {
    name: "Sven Bakker",
    role: { en: "Commercial Specialist", nl: "Zakelijk specialist" },
    exp: { en: "12 yrs", nl: "12 jaar" },
    bio: {
      en: "Distribution boards, fit-outs and maintenance contracts for offices, retail and light industry.",
      nl: "Verdeelinrichtingen, verbouwingen en onderhoudscontracten voor kantoren, winkels en lichte industrie.",
    },
    photo: "/images/team/sven-bakker.jpg",
  },
  {
    name: "Mila Jansen",
    role: { en: "Installation Technician", nl: "Installatietechnicus" },
    exp: { en: "8 yrs", nl: "8 jaar" },
    bio: {
      en: "Lighting, EV chargers and finish work. Known for clean cable runs and tidy, labelled boards.",
      nl: "Verlichting, laadpalen en afwerking. Bekend om nette kabelgoten en opgeruimde, gelabelde kasten.",
    },
    photo: "/images/team/mila-jansen.jpg",
  },
  {
    name: "Ruben de Wit",
    role: { en: "Emergency Response Engineer", nl: "Storingsmonteur" },
    exp: { en: "11 yrs", nl: "11 jaar" },
    bio: {
      en: "On-call fault finding and rapid repairs. Thermal imaging and live testing across the Randstad.",
      nl: "Storingsdienst en snelle reparaties. Thermische beeldvorming en testen onder spanning in de hele Randstad.",
    },
    photo: "/images/team/ruben-de-wit.jpg",
  },
];

function TeamCard({ t: member, revealClass = "" }: { t: TeamMember; revealClass?: string }) {
  const { t } = useLanguage();
  const role = t(member.role);
  return (
    <article className={`card ${revealClass} overflow-hidden p-0`}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={member.photo}
          alt={`${member.name} — ${role}`}
          fill
          sizes="(max-width: 540px) 100vw, (max-width: 1080px) 50vw, 25vw"
          className="object-cover"
        />
        <div className="absolute top-3.5 right-3.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-ink">
          {t(member.exp)}
        </div>
      </div>
      <div className="px-[22px] pt-[22px] pb-6">
        <h4 className="text-[17px] leading-[1.3] tracking-[-.01em]">{member.name}</h4>
        <div className="mt-1 text-[12.5px] tracking-[-.005em] text-accent-deep">{role}</div>
        <p className="mt-3 text-[13px] leading-[1.5] text-ink-2">{t(member.bio)}</p>
      </div>
    </article>
  );
}

export default function Team() {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { prevDisabled, nextDisabled, onPrevClick, onNextClick } = useCarouselNav(emblaApi);

  return (
    <section id="team" className="section-py border-t border-b border-line bg-tint">
      <div className="fix">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal max-w-[620px]">
            <span className="eyebrow">{t({ en: "The team", nl: "Het team" })}</span>
            <h2 className="mt-[18px] text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              {t({ en: "The people who'll", nl: "De mensen die" })} <br />
              {t({ en: "be", nl: "bij jou" })}{" "}
              <span className="display-serif text-accent-deep">
                {t({ en: "on your site.", nl: "over de vloer komen." })}
              </span>
            </h2>
          </div>
          <a href="#team-all" className="reveal reveal-d1 btn btn--ghost">
            {t({ en: "See full team", nl: "Bekijk het volledige team" })}{" "}
            <Icon name="arrowRight" size={14} stroke={2} />
          </a>
        </div>

        {/* Desktop / tablet — static grid */}
        <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} t={member} revealClass={`reveal reveal-d${i + 1}`} />
          ))}
        </div>

        {/* Mobile — one-card carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4.5 flex">
              {TEAM.map((member) => (
                <div key={member.name} className="min-w-0 shrink-0 grow-0 basis-full pl-4.5">
                  <TeamCard t={member} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2.5">
            <CarouselNavButton direction="prev" onClick={onPrevClick} disabled={prevDisabled} />
            <CarouselNavButton direction="next" onClick={onNextClick} disabled={nextDisabled} />
          </div>
        </div>
      </div>
    </section>
  );
}
