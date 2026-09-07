"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButton from "./CarouselNavButton";
import { useCarouselNav } from "./useCarouselNav";
import Icon, { type IconName } from "./Icon";

type Service = {
  icon: IconName;
  img: string;
  title: string;
  body: string;
  tag: string;
};

const SERVICES: Service[] = [
  {
    icon: "bolt",
    img: "/images/services/emergency-repairs.jpg",
    title: "Emergency Electrical Repairs",
    body: "24/7 rapid response for faults, outages and trips — certified electricians on call across the Netherlands.",
    tag: "24/7",
  },
  {
    icon: "bulb",
    img: "/images/services/lighting-installation.jpg",
    title: "Lighting Installation",
    body: "Architectural, LED and accent lighting designed and installed for warmth, efficiency and control.",
    tag: "",
  },
  {
    icon: "panel",
    img: "/images/services/fuse-box-upgrades.jpg",
    title: "Fuse Box Upgrades",
    body: "Modern consumer units and RCBO protection, fully tested and certified to NEN 1010 standards.",
    tag: "",
  },
  {
    icon: "gauge",
    img: "/images/services/electrical-inspections.jpg",
    title: "Electrical Inspections",
    body: "Detailed condition reports and safety testing for homes, landlords and commercial premises.",
    tag: "",
  },
  {
    icon: "building",
    img: "/images/services/commercial-electrical.jpg",
    title: "Commercial Electrical",
    body: "Fit-outs, distribution boards and maintenance contracts for offices, retail and industrial sites.",
    tag: "",
  },
  {
    icon: "smart",
    img: "/images/services/smart-home-automation.jpg",
    title: "Smart Home Automation",
    body: "Lighting, climate, security and energy — integrated into one calm, reliable system you control.",
    tag: "New",
  },
  {
    icon: "ev",
    img: "/images/services/ev-charger-installation.jpg",
    title: "EV Charger Installation",
    body: "Home and workplace charging from leading brands, load-balanced and ready for the grid.",
    tag: "Popular",
  },
];

function ServiceCard({ s }: { s: Service }) {
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
          Learn more
          <span className="arrow">
            <Icon name="arrowRight" size={11} stroke={2} />
          </span>
        </a>
      </div>
    </div>
  );
}

function MoreCard() {
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
          Not sure what you need?
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-[1.55] text-ink-2">
          Tell us about the job and we&apos;ll recommend the right service —
          with a fixed quote up front.
        </p>
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-medium text-accent-deep">
        Get a free quote{" "}
        <span className="arrow" style={{ background: "rgba(255,176,32,.16)" }}>
          <Icon name="arrowUR" size={11} stroke={2} />
        </span>
      </span>
    </a>
  );
}

export default function Services() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { prevDisabled, nextDisabled, onPrevClick, onNextClick } =
    useCarouselNav(emblaApi);

  return (
    <section
      id="services"
      className="section-py border-t border-b border-line bg-tint"
    >
      <div className="fix">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal max-w-[620px]">
            <span className="eyebrow">Services</span>
            <h2 className="mt-4.5 text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              Certified electrical work, <br />
              <span className="display-serif text-accent-deep">
                done right.
              </span>
            </h2>
          </div>
          <p className="lede reveal reveal-d1 max-w-[380px] text-ink-2">
            From a single socket to a full commercial fit-out — every job
            follows the same certified workflow, documented and tested end to
            end.
          </p>
        </div>

        {/* Desktop — static grid, no carousel */}
        <div className="reveal hidden gap-4.5 lg:grid lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
          <MoreCard />
        </div>

        {/* Mobile / tablet — carousel */}
        <div className="lg:hidden">
          <div className="reveal overflow-hidden" ref={emblaRef}>
            <div className="-ml-4.5 flex">
              {SERVICES.map((s) => (
                <div
                  key={s.title}
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
            View all services <Icon name="arrowRight" size={14} stroke={2} />
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
