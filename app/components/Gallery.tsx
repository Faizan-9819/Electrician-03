"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButton from "./CarouselNavButton";
import { useCarouselNav } from "./useCarouselNav";

type GalleryItem = {
  id: string;
  label: string;
  img: string;
};

const GALLERY: GalleryItem[] = [
  { id: "g1", label: "Modern home lighting", img: "/images/gallery/modern-home-lighting.jpg" },
  {
    id: "g2",
    label: "Commercial distribution board",
    img: "/images/gallery/commercial-distribution-board.jpg",
  },
  { id: "g3", label: "EV charging install", img: "/images/gallery/ev-charging-install.jpg" },
  { id: "g4", label: "Smart home controls", img: "/images/gallery/smart-home-controls.jpg" },
];

function GalleryCard({ g, className = "" }: { g: GalleryItem; className?: string }) {
  return (
    <div className={`media relative shadow-sm ${className}`}>
      <Image
        src={g.img}
        alt={g.label}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover"
      />
      <div className="absolute bottom-[18px] left-[18px] rounded-full bg-black/[.52] px-3 py-1.5 text-[12px] text-ink tracking-[-.005em] backdrop-blur-[6px]">
        {g.label}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { prevDisabled, nextDisabled, onPrevClick, onNextClick } =
    useCarouselNav(emblaApi);

  return (
    <section id="gallery" className="section-py">
      <div className="fix">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <span className="eyebrow">Featured projects</span>
            <h2 className="mt-[18px] text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              Recent work,
              <br />
              <span className="display-serif text-accent-deep">done to standard.</span>
            </h2>
          </div>
          <p className="lede reveal reveal-d1 max-w-[380px]">
            A selection of recent residential and commercial installations across the Randstad —
            every one certified, tested and documented.
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
