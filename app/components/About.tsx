import Image from "next/image";
import Icon from "./Icon";

const STATS = [
  { value: "15+", label: "Years experience" },
  { value: "2,000+", label: "Projects completed" },
  { value: "24/7", label: "Emergency service" },
  { value: "4.9★", label: "Customer rating" },
];

export default function About() {
  return (
    <section id="about" className="section-py">
      <div className="fix">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          <div className="reveal relative">
            <div className="media relative aspect-[4/5] rounded-xl shadow-md">
              <Image
                src="/images/about-electrician-fitting.jpg"
                alt="Strøm electrician fitting a light fitting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,11,0) 55%, rgba(11,11,11,.35) 100%)",
                }}
              />
            </div>
            <div className="absolute -right-6 -bottom-6 w-[240px] rounded-md border border-line bg-surface p-6 shadow-lg">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-tint text-accent-deep">
                  <Icon name="award" size={16} />
                </span>
                <div className="text-[13px] font-medium">Top-rated electrician 2025</div>
              </div>
              <div className="mt-2 text-xs leading-normal text-muted">
                Homeowner&apos;s choice award, Noord-Holland.
              </div>
            </div>
          </div>

          <div className="reveal reveal-d1">
            <span className="eyebrow">About Strøm</span>
            <h2 className="mt-4.5 text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              Powering homes with{" "}
              <span className="display-serif text-accent-deep">precision.</span>
            </h2>
            <p className="lede mt-5 max-w-[520px]">
              For over fifteen years we&apos;ve helped homeowners and businesses with safe,
              reliable and future-ready electrical solutions. Every project is delivered with
              technical expertise, transparent communication and uncompromising safety standards.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`reveal reveal-d${i + 2} bg-surface px-5.5 py-6`}
                >
                  <div className="display-serif text-[38px] leading-none">{s.value}</div>
                  <div className="mt-2 text-[13px] tracking-[-.005em] text-muted">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#team" className="btn btn--primary">
                Meet the team{" "}
                <span className="arrow">
                  <Icon name="arrowUR" size={11} stroke={2} />
                </span>
              </a>
              <a href="#process" className="btn btn--ghost">
                Our process
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
