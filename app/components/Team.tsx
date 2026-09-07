"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButton from "./CarouselNavButton";
import { useCarouselNav } from "./useCarouselNav";
import Icon from "./Icon";

type TeamMember = {
  name: string;
  role: string;
  exp: string;
  bio: string;
  photo: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Daan Visser",
    role: "Lead Electrician · Installations",
    exp: "15 yrs",
    bio: "NEN-certified master electrician. Leads rewires, fuse box upgrades and smart-home projects.",
    photo: "/images/team/daan-visser.jpg",
  },
  {
    name: "Sven Bakker",
    role: "Commercial Specialist",
    exp: "12 yrs",
    bio: "Distribution boards, fit-outs and maintenance contracts for offices, retail and light industry.",
    photo: "/images/team/sven-bakker.jpg",
  },
  {
    name: "Mila Jansen",
    role: "Installation Technician",
    exp: "8 yrs",
    bio: "Lighting, EV chargers and finish work. Known for clean cable runs and tidy, labelled boards.",
    photo: "/images/team/mila-jansen.jpg",
  },
  {
    name: "Ruben de Wit",
    role: "Emergency Response Engineer",
    exp: "11 yrs",
    bio: "On-call fault finding and rapid repairs. Thermal imaging and live testing across the Randstad.",
    photo: "/images/team/ruben-de-wit.jpg",
  },
];

function TeamCard({ t, revealClass = "" }: { t: TeamMember; revealClass?: string }) {
  return (
    <article className={`card ${revealClass} overflow-hidden p-0`}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={t.photo}
          alt={`${t.name} — ${t.role}`}
          fill
          sizes="(max-width: 540px) 100vw, (max-width: 1080px) 50vw, 25vw"
          className="object-cover"
        />
        <div className="absolute top-3.5 right-3.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-ink">
          {t.exp}
        </div>
      </div>
      <div className="px-[22px] pt-[22px] pb-6">
        <h4 className="text-[17px] leading-[1.3] tracking-[-.01em]">{t.name}</h4>
        <div className="mt-1 text-[12.5px] tracking-[-.005em] text-accent-deep">{t.role}</div>
        <p className="mt-3 text-[13px] leading-[1.5] text-ink-2">{t.bio}</p>
      </div>
    </article>
  );
}

export default function Team() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { prevDisabled, nextDisabled, onPrevClick, onNextClick } = useCarouselNav(emblaApi);

  return (
    <section id="team" className="section-py border-t border-b border-line bg-tint">
      <div className="fix">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal max-w-[620px]">
            <span className="eyebrow">The team</span>
            <h2 className="mt-[18px] text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              The people who&apos;ll <br />
              be <span className="display-serif text-accent-deep">on your site.</span>
            </h2>
          </div>
          <a href="#team-all" className="reveal reveal-d1 btn btn--ghost">
            See full team <Icon name="arrowRight" size={14} stroke={2} />
          </a>
        </div>

        {/* Desktop / tablet — static grid */}
        <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t, i) => (
            <TeamCard key={t.name} t={t} revealClass={`reveal reveal-d${i + 1}`} />
          ))}
        </div>

        {/* Mobile — one-card carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4.5 flex">
              {TEAM.map((t) => (
                <div key={t.name} className="min-w-0 shrink-0 grow-0 basis-full pl-4.5">
                  <TeamCard t={t} />
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
