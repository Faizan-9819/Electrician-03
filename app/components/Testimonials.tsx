"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButton from "./CarouselNavButton";
import { useCarouselNav } from "./useCarouselNav";
import Icon from "./Icon";

type Review = {
  name: string;
  city: string;
  rating: number;
  treatment: string;
  body: string;
  photo: string;
};

const REVIEWS: Review[] = [
  {
    name: "Marieke V.",
    city: "Amsterdam",
    rating: 5,
    treatment: "Fuse box upgrade",
    body: "Professional from the first call. They explained every step, worked cleanly, and left the cupboard tidier than they found it.",
    photo: "/images/team/mila-jansen.jpg",
  },
  {
    name: "Jasper L.",
    city: "Utrecht",
    rating: 5,
    treatment: "EV charger install",
    body: "Booked online, confirmed within the hour, installed two days later. Transparent price, no surprises, faultless work.",
    photo: "/images/team/daan-visser.jpg",
  },
  {
    name: "Anouk B.",
    city: "Haarlem",
    rating: 5,
    treatment: "Emergency call-out",
    body: "Lost power late on a Sunday — an electrician arrived within 40 minutes, found the fault and made it safe. Lifesavers.",
    photo: "/images/team/sven-bakker.jpg",
  },
  {
    name: "Tomás R.",
    city: "Rotterdam",
    rating: 5,
    treatment: "Full home rewire",
    body: "A big job handled with real care. Every circuit labelled, every wall made good, everything tested and certified.",
    photo: "/images/team/ruben-de-wit.jpg",
  },
];

const TRUST = [
  { l: "Google", v: "4.9" },
  { l: "Werkspot", v: "9.4" },
  { l: "Trustpilot", v: "4.8" },
];

function ReviewCard({ r }: { r: Review }) {
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
        &quot;{r.body}&quot;
      </p>
      <div className="mt-auto flex items-center gap-3 border-t border-line pt-6">
        <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full">
          <Image src={r.photo} alt={r.name} fill sizes="38px" className="object-cover" />
        </div>
        <div className="text-[13px]">
          <div className="font-medium">{r.name}</div>
          <div className="mt-0.5 text-[12px] text-muted">
            {r.treatment} · {r.city}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { prevDisabled, nextDisabled, onPrevClick, onNextClick } = useCarouselNav(emblaApi);

  return (
    <section id="testimonials" className="section-py">
      <div className="fix">
        <div className="reveal mx-auto mb-14 max-w-[680px] text-center">
          <span className="eyebrow eyebrow--center">Testimonials</span>
          <h2 className="mt-[18px] text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
            Clients say it <span className="display-serif text-accent-deep">better than we can.</span>
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            <div className="flex items-center gap-1.5 text-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon key={i} name="star" size={16} stroke={0} className="fill-current" />
              ))}
              <span className="ml-2 text-sm font-medium text-ink">4.9 / 5</span>
            </div>
            <span className="text-[13px] text-muted">· 2,000+ projects · Top-rated in Noord-Holland</span>
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
              <span className="display-serif text-[30px] text-ink">{b.v}</span>
              <div className="text-[11px] tracking-[.14em] text-muted uppercase">
                on
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
