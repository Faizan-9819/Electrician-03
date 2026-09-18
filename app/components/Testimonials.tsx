"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButton from "./CarouselNavButton";
import { useCarouselNav } from "./useCarouselNav";
import Icon from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

type Review = {
  name: string;
  city: string;
  rating: number;
  treatment: Translation;
  body: Translation;
  photo: string;
};

const REVIEWS: Review[] = [
  {
    name: "Marieke V.",
    city: "Amsterdam",
    rating: 5,
    treatment: { en: "Fuse box upgrade", nl: "Meterkast vervangen" },
    body: {
      en: "Professional from the first call. They explained every step, worked cleanly, and left the cupboard tidier than they found it.",
      nl: "Professioneel vanaf het eerste telefoontje. Ze legden elke stap uit, werkten netjes en lieten de kast opgeruimder achter dan ze hem aantroffen.",
    },
    photo: "/images/team/mila-jansen.jpg",
  },
  {
    name: "Jasper L.",
    city: "Utrecht",
    rating: 5,
    treatment: { en: "EV charger install", nl: "Laadpaal installatie" },
    body: {
      en: "Booked online, confirmed within the hour, installed two days later. Transparent price, no surprises, faultless work.",
      nl: "Online geboekt, binnen het uur bevestigd, twee dagen later geïnstalleerd. Transparante prijs, geen verrassingen, foutloos werk.",
    },
    photo: "/images/team/daan-visser.jpg",
  },
  {
    name: "Anouk B.",
    city: "Haarlem",
    rating: 5,
    treatment: { en: "Emergency call-out", nl: "Spoedmelding" },
    body: {
      en: "Lost power late on a Sunday — an electrician arrived within 40 minutes, found the fault and made it safe. Lifesavers.",
      nl: "Laat op een zondag zonder stroom — binnen 40 minuten stond er een elektricien, die de storing vond en veilig maakte. Levensreddend.",
    },
    photo: "/images/team/sven-bakker.jpg",
  },
  {
    name: "Tomás R.",
    city: "Rotterdam",
    rating: 5,
    treatment: { en: "Full home rewire", nl: "Volledige huisbedrading" },
    body: {
      en: "A big job handled with real care. Every circuit labelled, every wall made good, everything tested and certified.",
      nl: "Een grote klus met echte zorg uitgevoerd. Elke groep gelabeld, elke muur netjes afgewerkt, alles getest en gecertificeerd.",
    },
    photo: "/images/team/ruben-de-wit.jpg",
  },
];

const TRUST: { l: string; v: Translation }[] = [
  { l: "Google", v: { en: "4.9", nl: "4,9" } },
  { l: "Werkspot", v: { en: "9.4", nl: "9,4" } },
  { l: "Trustpilot", v: { en: "4.8", nl: "4,8" } },
];

function ReviewCard({ r }: { r: Review }) {
  const { t } = useLanguage();
  return (
    <article className="card flex min-h-[280px] flex-col p-7">
      <div className="flex items-center justify-between">
        <div className="flex gap-[3px] text-gold">
          {[0, 1, 2, 3, 4].map((j) => (
            <Icon key={j} name="star" size={14} stroke={0} className="fill-current" />
          ))}
        </div>
        <Icon name="quote" size={20} className="text-accent-soft" />
      </div>
      <p className="mt-[18px] text-[21px] leading-[1.4] text-ink [font-family:var(--font-display)]">
        &quot;{t(r.body)}&quot;
      </p>
      <div className="mt-auto flex items-center gap-3 border-t border-line pt-6">
        <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full">
          <Image src={r.photo} alt={r.name} fill sizes="38px" className="object-cover" />
        </div>
        <div className="text-[13px]">
          <div className="font-medium">{r.name}</div>
          <div className="mt-0.5 text-[12px] text-muted">
            {t(r.treatment)} · {r.city}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { prevDisabled, nextDisabled, onPrevClick, onNextClick } = useCarouselNav(emblaApi);

  return (
    <section id="testimonials" className="section-py">
      <div className="fix">
        <div className="reveal mx-auto mb-14 max-w-[680px] text-center">
          <span className="eyebrow eyebrow--center">{t({ en: "Testimonials", nl: "Ervaringen" })}</span>
          <h2 className="mt-[18px] text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
            {t({ en: "Clients say it", nl: "Klanten zeggen het" })}{" "}
            <span className="display-serif text-accent-deep">
              {t({ en: "better than we can.", nl: "beter dan wij kunnen." })}
            </span>
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            <div className="flex items-center gap-1.5 text-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon key={i} name="star" size={16} stroke={0} className="fill-current" />
              ))}
              <span className="ml-2 text-sm font-medium text-ink">
                {t({ en: "4.9 / 5", nl: "4,9 / 5" })}
              </span>
            </div>
            <span className="text-[13px] text-muted">
              {t({
                en: "· 2,000+ projects · Top-rated in Noord-Holland",
                nl: "· 2.000+ projecten · Best beoordeeld in Noord-Holland",
              })}
            </span>
          </div>
        </div>

        {/* Carousel on every breakpoint — one card on mobile, three peeking on desktop */}
        <div className="reveal reveal-d1 overflow-hidden" ref={emblaRef}>
          <div className="-ml-4.5 flex">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="min-w-0 shrink-0 grow-0 basis-full pl-4.5 sm:basis-1/2 lg:basis-1/3"
              >
                <ReviewCard r={r} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-2.5">
          <CarouselNavButton direction="prev" onClick={onPrevClick} disabled={prevDisabled} />
          <CarouselNavButton direction="next" onClick={onNextClick} disabled={nextDisabled} />
        </div>

        {/* Trust strip */}
        <div className="reveal mt-16 flex flex-wrap items-center justify-center gap-12">
          {TRUST.map((b) => (
            <div key={b.l} className="flex items-center gap-2.5">
              <span className="display-serif text-[30px] text-ink">{t(b.v)}</span>
              <div className="text-[11px] tracking-[.14em] text-muted uppercase">
                {t({ en: "on", nl: "op" })}
                <br />
                <span className="text-[13px] tracking-[-.005em] text-ink-2 normal-case">{b.l}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
