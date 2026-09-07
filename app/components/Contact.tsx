import Icon, { type IconName } from "./Icon";
import LeadEnquiryForm from "../global/LeadEnquiryForm";
import WhatsAppIcon from "../global/WhatsAppIcon";

const CONTACT_ROWS: {
  icon: IconName | "whatsapp";
  label: string;
  value: string;
  sub: string;
  href: string;
}[] = [
  {
    icon: "phone",
    label: "Phone",
    value: "+31 (0)20 123 4567",
    sub: "Mon–Sat",
    href: "tel:+31201234567",
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "+31 (0)6 4400 8821",
    sub: "Reply within 1h · 24/7 line",
    href: "https://wa.me/31644008821",
  },
  {
    icon: "mail",
    label: "Email",
    value: "hello@strom-electric.nl",
    sub: "For appointment requests",
    href: "mailto:hello@strom-electric.nl",
  },
  {
    icon: "pin",
    label: "Visit",
    value: "Contactweg 36, Amsterdam",
    sub: "Main base",
    href: "#locations",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-py">
      <div className="fix">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16">
          <div className="reveal">
            <span className="eyebrow">Get in touch</span>
            <h2 className="mt-[18px] text-[34px] md:text-[52px] leading-[56px] ">
              Send us a note —
              <br />
              we&apos;ll{" "}
              <span className="display-serif text-accent-deep">
                reply quickly.
              </span>
            </h2>
            <p className="lede mt-5 max-w-[480px]">
              Use the form for quotes, project questions or to request a
              callback. For urgent faults, call or WhatsApp us directly — 24/7.
            </p>

            <div className="mt-9 grid max-w-[480px] gap-3.5">
              {CONTACT_ROWS.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target={r.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    r.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-start gap-3.5 rounded-md border border-line bg-surface px-4 py-3.5 transition-colors hover:border-accent-deep/50"
                >
                  <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-tint text-accent-deep">
                    {r.icon === "whatsapp" ? (
                      <WhatsAppIcon size={16} />
                    ) : (
                      <Icon name={r.icon} size={16} />
                    )}
                  </span>
                  <div>
                    <div className="text-[11.5px] tracking-[.08em] text-muted uppercase">
                      {r.label}
                    </div>
                    <div className="mt-[3px] text-[15px] font-medium">
                      {r.value}
                    </div>
                    <div className="mt-0.5 text-[12.5px] text-muted">
                      {r.sub}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="card reveal reveal-d1 relative p-8 md:sticky md:top-28 md:self-start">
            <LeadEnquiryForm idPrefix="contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
