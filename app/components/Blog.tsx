"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import CarouselNavButton from "./CarouselNavButton";
import { useCarouselNav } from "./useCarouselNav";
import Icon from "./Icon";

type Post = {
  cat: string;
  img: string;
  title: string;
  date: string;
  read: string;
};

const POSTS: Post[] = [
  {
    cat: "Safety",
    img: "/images/blog/safety-checklist.jpg",
    title:
      "The electrical safety checklist every homeowner should run twice a year.",
    date: "May 12",
    read: "4 min read",
  },
  {
    cat: "Lighting",
    img: "/images/blog/led-lighting.jpg",
    title:
      "Why switching to LED lighting pays for itself faster than you think.",
    date: "Apr 28",
    read: "6 min read",
  },
  {
    cat: "EV",
    img: "/images/blog/ev-charger-prep.jpg",
    title:
      "Preparing your home for an EV charger: what to check before you buy.",
    date: "Apr 14",
    read: "7 min read",
  },
];

function BlogCard({ p, revealClass = "" }: { p: Post; revealClass?: string }) {
  return (
    <article
      className={`card ${revealClass} flex flex-col overflow-hidden p-0`}
    >
      <div className="media relative aspect-[4/3]">
        <Image
          src={p.img}
          alt={p.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full bg-[rgba(8,8,8,.6)] px-2.5 py-1 text-[11.5px] tracking-[.01em] text-ink">
          {p.cat}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-6 pr-[26px] pb-[26px] pl-[26px]">
        <h3 className="text-[19px] leading-[1.3] tracking-[-.015em]">
          {p.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-5 text-[12.5px] text-muted">
          <span>
            {p.date} · {p.read}
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const { prevDisabled, nextDisabled, onPrevClick, onNextClick } =
    useCarouselNav(emblaApi);

  return (
    <section id="blog" className="section-py">
      <div className="fix">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <span className="eyebrow">Journal</span>
            <h2 className="mt-[18px]  text-[34px] md:text-[52px]">
              Notes from{" "}
              <span className="display-serif text-accent-deep">the field.</span>
            </h2>
          </div>
          <a href="#all-posts" className="reveal reveal-d1 btn btn--ghost">
            Read all articles <Icon name="arrowRight" size={14} stroke={2} />
          </a>
        </div>

        {/* Desktop / tablet — static grid */}
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <BlogCard
              key={p.title}
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
                  key={p.title}
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
