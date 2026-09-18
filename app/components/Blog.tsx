"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButton from "./CarouselNavButton";
import { useCarouselNav } from "./useCarouselNav";
import Icon from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

type Post = {
  cat: Translation;
  img: string;
  title: Translation;
  date: Translation;
  read: Translation;
};

const POSTS: Post[] = [
  {
    cat: { en: "Safety", nl: "Veiligheid" },
    img: "/images/blog/safety-checklist.jpg",
    title: {
      en: "The electrical safety checklist every homeowner should run twice a year.",
      nl: "De elektrische veiligheidscheck die elke huiseigenaar twee keer per jaar zou moeten doen.",
    },
    date: { en: "May 12", nl: "12 mei" },
    read: { en: "4 min read", nl: "4 min. leestijd" },
  },
  {
    cat: { en: "Lighting", nl: "Verlichting" },
    img: "/images/blog/led-lighting.jpg",
    title: {
      en: "Why switching to LED lighting pays for itself faster than you think.",
      nl: "Waarom overstappen op LED-verlichting zich sneller terugbetaalt dan je denkt.",
    },
    date: { en: "Apr 28", nl: "28 apr" },
    read: { en: "6 min read", nl: "6 min. leestijd" },
  },
  {
    cat: { en: "EV", nl: "EV" },
    img: "/images/blog/ev-charger-prep.jpg",
    title: {
      en: "Preparing your home for an EV charger: what to check before you buy.",
      nl: "Je huis voorbereiden op een laadpaal: waar je op moet letten voordat je er een aanschaft.",
    },
    date: { en: "Apr 14", nl: "14 apr" },
    read: { en: "7 min read", nl: "7 min. leestijd" },
  },
];

function BlogCard({ p, revealClass = "" }: { p: Post; revealClass?: string }) {
  const { t } = useLanguage();
  return (
    <article
      className={`card ${revealClass} flex flex-col overflow-hidden p-0`}
    >
      <div className="media relative aspect-[4/3]">
        <Image
          src={p.img}
          alt={t(p.title)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full bg-[rgba(8,8,8,.6)] px-2.5 py-1 text-[11.5px] tracking-[.01em] text-ink">
          {t(p.cat)}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-6 pr-[26px] pb-[26px] pl-[26px]">
        <h3 className="text-[19px] leading-[1.3] tracking-[-.015em]">
          {t(p.title)}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-5 text-[12.5px] text-muted">
          <span>
            {t(p.date)} · {t(p.read)}
          </span>
          <span className="arrow">
            <Icon name="arrowUR" size={11} stroke={2} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { prevDisabled, nextDisabled, onPrevClick, onNextClick } =
    useCarouselNav(emblaApi);

  return (
    <section id="blog" className="section-py">
      <div className="fix">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <span className="eyebrow">{t({ en: "Journal", nl: "Journaal" })}</span>
            <h2 className="mt-[18px]  text-[34px] md:text-[52px]">
              {t({ en: "Notes from", nl: "Notities uit" })}{" "}
              <span className="display-serif text-accent-deep">
                {t({ en: "the field.", nl: "het veld." })}
              </span>
            </h2>
          </div>
          <a href="#all-posts" className="reveal reveal-d1 btn btn--ghost">
            {t({ en: "Read all articles", nl: "Lees alle artikelen" })}{" "}
            <Icon name="arrowRight" size={14} stroke={2} />
          </a>
        </div>

        {/* Desktop / tablet — static grid */}
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <BlogCard
              key={p.title.en}
              p={p}
              revealClass={`reveal reveal-d${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile — one-card carousel */}
        <div className="sm:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4.5 flex">
              {POSTS.map((p) => (
                <div
                  key={p.title.en}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4.5"
                >
                  <BlogCard p={p} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2.5">
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
