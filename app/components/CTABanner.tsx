import Icon from "./Icon";
import type { IconName } from "./Icon";
import WhatsAppIcon from "../global/WhatsAppIcon";

type ContactRow = {
  icon: IconName;
  label: string;
  value: string;
};

const CONTACT_ROWS: ContactRow[] = [
  { icon: "phone", label: "Call us", value: "+31 (0)20 123 4567" },
  { icon: "mail", label: "Email", value: "hello@strom-electric.nl" },
  { icon: "clock", label: "Open today", value: "Mon–Fri 07:00–20:00 · Sat 08:00–17:00" },
];

export default function CTABanner() {
  return (
    <section id="book" className="section-py">
      <div className="fix">
        <div className="relative overflow-hidden rounded-2xl px-16 py-20 text-white max-[900px]:px-7 max-[900px]:py-12 [background:linear-gradient(135deg,#231A09_0%,#0A0A0A_72%)]">
          {/* abstract shapes */}
          <svg
            className="pointer-events-none absolute -top-20 -right-20 h-[420px] w-[420px] opacity-[.18]"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="80" stroke="#fff" strokeWidth=".4" fill="none" />
            <circle cx="100" cy="100" r="55" stroke="#fff" strokeWidth=".4" fill="none" />
            <circle cx="100" cy="100" r="30" stroke="#fff" strokeWidth=".4" fill="none" />
          </svg>
          <svg
            className="pointer-events-none absolute -bottom-[100px] -left-[60px] h-[340px] w-[340px] opacity-10"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="90" stroke="var(--accent-soft)" strokeWidth=".5" fill="none" />
            <circle cx="100" cy="100" r="60" stroke="var(--accent-soft)" strokeWidth=".5" fill="none" />
          </svg>

          <div className="relative grid grid-cols-1 items-center gap-12 max-[900px]:gap-8 md:grid-cols-[1.4fr_1fr]">
            <div className="reveal">
              <span className="eyebrow" style={{ color: "var(--accent-soft)" }}>
                Ready when you are
              </span>
              <h2 className="mt-[18px] text-[clamp(36px,4vw,56px)] leading-[1.05] font-normal tracking-[-.022em] text-white">
                Book your
                <br />
                electrician <span className="display-serif text-accent-soft">today.</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-[17px] leading-[1.55] text-white/70">
                Tell us about your project and we&apos;ll confirm your appointment quickly — with
                transparent, itemised pricing before any work begins.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#book" className="btn btn--accent btn--lg">
                  Book appointment{" "}
                  <span className="arrow" style={{ background: "rgba(255,255,255,.2)" }}>
                    <Icon name="arrowUR" size={12} stroke={2} />
                  </span>
                </a>
                <a
                  href="https://wa.me/31644008821"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--lg border border-white/18 bg-white/10 text-white"
                >
                  <WhatsAppIcon size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="grid gap-3.5">
              {CONTACT_ROWS.map((r, i) => (
                <div
                  key={r.label}
                  className={`reveal reveal-d${i + 1} flex items-center gap-3.5 rounded-md border border-white/10 bg-white/[.06] p-[18px]`}
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white/10 text-white">
                    <Icon name={r.icon} size={17} />
                  </span>
                  <div>
                    <div className="text-xs tracking-[.06em] text-white/55 uppercase">{r.label}</div>
                    <div className="mt-1 text-[15px]">{r.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
