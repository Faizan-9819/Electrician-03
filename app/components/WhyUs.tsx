import Icon, { type IconName } from "./Icon";

type WhyPoint = {
  icon: IconName;
  title: string;
  body: string;
};

const WHY: WhyPoint[] = [
  {
    icon: "award",
    title: "Certified electricians",
    body: "Every job is led by a fully qualified, NEN-certified electrician. No subcontractors, no shortcuts.",
  },
  {
    icon: "wallet",
    title: "Transparent pricing",
    body: "Fixed, itemised quotes approved before any work begins. The price we agree is the price you pay.",
  },
  {
    icon: "clock",
    title: "Fast response",
    body: "24/7 emergency line with electricians on call. Most urgent call-outs reached within the hour.",
  },
  {
    icon: "check",
    title: "Guaranteed workmanship",
    body: "Every installation is fully tested, certified and backed by our workmanship guarantee.",
  },
  {
    icon: "tools",
    title: "Latest equipment",
    body: "Thermal imaging, calibrated testers and modern tooling for precise, efficient, future-ready work.",
  },
  {
    icon: "shield",
    title: "Safety first",
    body: "We work to the latest regulations and leave every site clean, labelled and fully documented.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="section-py">
      <div className="fix">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-24">
          <div className="reveal lg:sticky lg:top-30">
            <span className="eyebrow">Why clients choose us</span>
            <h2 className="mt-4.5 text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              Six reasons the work
              <br />
              just <span className="display-serif text-accent-deep">feels safer.</span>
            </h2>
            <p className="lede mt-5 text-ink-2">
              We optimise for the things that matter on site: certified work, a clean finish, a
              fair price and a job that&apos;s signed off properly.
            </p>
            <div className="mt-9 rounded-md border border-tint-2 bg-tint p-6">
              <div className="flex items-center gap-2.5 text-accent-deep">
                <Icon name="quote" size={18} />
                <span className="text-xs tracking-[.16em] uppercase">From a recent job</span>
              </div>
              <p className="display-serif mt-3 text-[22px] leading-[1.35]">
                &quot;They turned up on time, explained everything, and left the place spotless.
                Rare these days.&quot;
              </p>
              <div className="mt-3 text-[13px] text-muted">— Jasper L., homeowner, Utrecht</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {WHY.map((w, i) => (
              <div
                key={w.title}
                className={`reveal reveal-d${Math.min(i + 1, 6)} bg-surface p-8`}
              >
                <span className="mb-4.5 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-tint text-accent-deep">
                  <Icon name={w.icon} size={18} />
                </span>
                <h4 className="text-[17px] leading-[1.3] font-medium tracking-[-.01em]">
                  {w.title}
                </h4>
                <p className="mt-2.5 text-sm leading-[1.55] text-ink-2">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
