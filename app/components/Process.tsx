import Icon from "./Icon";

type Step = {
  n: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Book appointment",
    body: "Choose a convenient date online or by phone. We confirm quickly and send everything you need before we arrive.",
  },
  {
    n: "02",
    title: "Site inspection",
    body: "We assess the issue or project on site, explain the options clearly, and agree a fixed, transparent price.",
  },
  {
    n: "03",
    title: "Professional installation",
    body: "Certified electricians complete the work safely, cleanly and to the latest NEN 1010 standards.",
  },
  {
    n: "04",
    title: "Testing & completion",
    body: "Every installation is thoroughly tested and certified before handover, with full documentation.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="section-py bg-black"
      style={{
        background:
          "radial-gradient(900px 460px at 82% -8%, rgba(255,176,32,.10), transparent 60%), #0E0E0E",
      }}
    >
      <div className="fix">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal max-w-[620px]">
            <span className="eyebrow" style={{ color: "var(--accent-soft)" }}>
              How we work
            </span>
            <h2 className="mt-4.5 text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em] text-white">
              Four steps — <br />
              <span className="display-serif" style={{ color: "var(--accent-soft)" }}>
                no surprises.
              </span>
            </h2>
          </div>
          <p className="reveal reveal-d1 max-w-[380px] text-lg leading-[1.6] text-[#A9B6B1]">
            The same clear process for a single repair or a full installation. You always know
            exactly what&apos;s next.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute top-9 left-[6%] right-[6%] z-0 hidden h-px bg-white/[.12] lg:block" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`group reveal reveal-d${i + 1} relative`}
              >
                <div className="display-serif relative z-[1] mb-6 flex h-18 w-18 items-center justify-center rounded-full border border-white/[.14] bg-white/[.04] text-[28px] text-accent-soft transition-colors duration-300 group-hover:bg-accent group-hover:text-[#0B0B0B]">
                  {s.n}
                </div>
                <h4 className="text-lg leading-[1.3] font-medium tracking-[-.01em] text-white">
                  {s.title}
                </h4>
                <p className="mt-2.5 text-sm leading-[1.6] text-[#9CABA6]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 rounded-md border border-white/[.08] bg-white/[.04] px-8 py-7">
          <div className="flex items-center gap-4">
            <span className="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-accent">
              <Icon name="calendar" size={18} />
            </span>
            <div>
              <div className="text-[15px] text-white">
                Most call-outs booked in under 2 minutes
              </div>
              <div className="mt-0.5 text-[13px] text-[#9CABA6]">
                Same-day appointments usually available.
              </div>
            </div>
          </div>
          <a href="#book" className="btn btn--accent w-full md:w-auto">
            Book an appointment{" "}
            <span className="arrow" style={{ background: "rgba(255,255,255,.18)" }}>
              <Icon name="arrowUR" size={11} stroke={2} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
