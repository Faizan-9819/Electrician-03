import Image from "next/image";
import Icon from "./Icon";

const AVATARS = [
  "/images/team/daan-visser.jpg",
  "/images/team/mila-jansen.jpg",
  "/images/team/ruben-de-wit.jpg",
  "/images/team/sven-bakker.jpg",
];

export default function Hero() {
  return (
    <section id="top" className="section-py relative overflow-hidden">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="hbg1" cx="20%" cy="30%" r="50%">
            <stop offset="0%" stopColor="var(--tint)" stopOpacity=".9" />
            <stop offset="100%" stopColor="var(--tint)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hbg2" cx="80%" cy="80%" r="40%">
            <stop offset="0%" stopColor="var(--accent-soft)" stopOpacity=".55" />
            <stop offset="100%" stopColor="var(--accent-soft)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hbg1)" />
        <rect width="100%" height="100%" fill="url(#hbg2)" />
      </svg>

      <div className="fix relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* LEFT */}
          <div className="reveal">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-1.5 shadow-sm">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-tint text-accent-deep">
                <Icon name="bolt" size={13} />
              </span>
              <span className="text-[13px] text-ink-2">24/7 emergency response · Netherlands</span>
            </div>
            <h1 className="text-[clamp(44px,5.5vw,76px)] leading-[1.02] font-normal tracking-[-.025em]">
              High-performance electrical
              <br />
              solutions for{" "}
              <span className="display-serif text-accent-deep">modern living.</span>
            </h1>
            <p className="lede mt-6 max-w-[520px]">
              From emergency repairs to complete installations, we deliver certified
              electrical solutions for homes and businesses across the Netherlands — on
              time, on budget, done to standard.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#book" className="btn btn--primary btn--lg">
                Book appointment{" "}
                <span className="arrow">
                  <Icon name="arrowUR" size={12} stroke={2} />
                </span>
              </a>
              <a href="#gallery" className="btn btn--ghost btn--lg">
                <Icon name="bolt" size={15} /> See our projects
              </a>
            </div>
            <div className="mt-11 flex items-center gap-4.5">
              <div className="flex">
                {AVATARS.map((src, i) => (
                  <div
                    key={src}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-bg"
                    style={{ marginLeft: i === 0 ? 0 : -10 }}
                  >
                    <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-gold flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Icon key={i} name="star" size={14} stroke={0} className="fill-current" />
                  ))}
                  <span className="ml-2 text-[13px] font-medium text-ink">
                    4.9 · Google reviews
                  </span>
                </div>
                <div className="mt-1 text-[13px] text-muted">
                  From 2,000+ completed projects across the Netherlands
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — image + floating cards */}
          <div className="reveal reveal-d1 relative lg:min-h-140">
            <div className="media relative aspect-[4/5] rounded-2xl shadow-lg">
              <Image
                src="/images/hero-electrician-lighting.jpg"
                alt="Strøm electrician installing modern hexagon lighting"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                style={{ objectPosition: "50% 38%" }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,11,0) 50%, rgba(11,11,11,.45) 100%)",
                }}
              />
              <div className="absolute bottom-6 left-6 inline-flex items-center gap-2.5 rounded-full bg-black/60 py-2.5 pr-3.5 pl-2.5 text-[13px] text-ink shadow-md backdrop-blur">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[#0B0B0B]">
                  <Icon name="shield" size={14} stroke={2} />
                </span>
                NEN 1010 certified
              </div>
            </div>

            <div className="absolute top-[54%] -right-5 w-[200px] rounded-md border border-line bg-[#0E0E0E] p-5 text-white shadow-lg [animation:floatY_7s_ease-in-out_infinite_.8s]">
              <div className="text-[11px] tracking-[.16em] uppercase opacity-60">Since 2010</div>
              <div className="display-serif mt-1.5 text-[38px] leading-none">15+ yrs</div>
              <div className="mt-1.5 text-[13px] opacity-85">
                of certified residential &amp; commercial work.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
