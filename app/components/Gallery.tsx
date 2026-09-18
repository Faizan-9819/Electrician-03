"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButton from "./CarouselNavButton";
import { useCarouselNav } from "./useCarouselNav";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Translation } from "../i18n/config";

type GalleryItem = {
  id: string;
  label: Translation;
  img: string;
};

const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    label: { en: "Modern home lighting", nl: "Moderne woonverlichting" },
    img: "/images/gallery/modern-home-lighting.jpg",
  },
  {
    id: "g2",
    label: { en: "Commercial distribution board", nl: "Zakelijke verdeelinrichting" },
    img: "/images/gallery/commercial-distribution-board.jpg",
  },
  {
    id: "g3",
    label: { en: "EV charging install", nl: "Laadpaal installatie" },
    img: "/images/gallery/ev-charging-install.jpg",
  },
  {
    id: "g4",
    label: { en: "Smart home controls", nl: "Slimme domoticabediening" },
    img: "/images/gallery/smart-home-controls.jpg",
  },
];

function GalleryCard({ g, className = "" }: { g: GalleryItem; className?: string }) {
  const { t } = useLanguage();
  const label = t(g.label);
  return (
    <div className={`media relative shadow-sm ${className}`}>
      <Image
        src={g.img}
        alt={label}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover"
      />
      <div className="absolute bottom-[18px] left-[18px] rounded-full bg-black/[.52] px-3 py-1.5 text-[12px] text-ink tracking-[-.005em] backdrop-blur-[6px]">
        {label}
      </div>
    </div>
  );
}

export default function Gallery() {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { prevDisabled, nextDisabled, onPrevClick, onNextClick } =
    useCarouselNav(emblaApi);

  return (
    <section id="gallery" className="section-py">
      <div className="fix">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <span className="eyebrow">{t({ en: "Featured projects", nl: "Uitgelichte projecten" })}</span>
            <h2 className="mt-[18px] text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              {t({ en: "Recent work,", nl: "Recent werk," })}
              <br />
              <span className="display-serif text-accent-deep">
                {t({ en: "done to standard.", nl: "volgens de norm uitgevoerd." })}
              </span>
            </h2>
          </div>
          <p className="lede reveal reveal-d1 max-w-[380px]">
            {t({
              en: "A selection of recent residential and commercial installations across the Randstad — every one certified, tested and documented.",
              nl: "Een selectie van recente woning- en bedrijfsinstallaties in de Randstad — allemaal gecertificeerd, getest en gedocumenteerd.",
            })}
          </p>
        </div>

        {/* Desktop — static grid, no carousel */}
        <div className="reveal hidden grid-cols-[7fr_5fr] grid-rows-[320px_320px] gap-[18px] lg:grid">
          {GALLERY.map((g, i) => (
            <GalleryCard key={g.id} g={g} className={`reveal reveal-d${i + 1}`} />
          ))}
        </div>

        {/* Mobile / tablet — carousel */}
        <div className="lg:hidden">
          <div className="reveal overflow-hidden" ref={emblaRef}>
            <div className="-ml-4.5 flex">
              {GALLERY.map((g) => (
                <div
                  key={g.id}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4.5 sm:basis-1/2"
                >
                  <GalleryCard g={g} className="h-[240px]" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-2.5">
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
