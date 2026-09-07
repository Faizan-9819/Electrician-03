import Logo from "./Logo";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    items: ["Home", "About", "Why Us", "Team", "Projects", "Blog"],
  },
  {
    title: "Services",
    items: [
      "Emergency Repairs",
      "Lighting",
      "Fuse Box Upgrades",
      "Inspections",
      "Commercial",
      "EV Chargers",
    ],
  },
];

const SOCIALS = ["Instagram", "LinkedIn", "Google"];

export default function Footer() {
  return (
    <footer className="bg-black pt-10 md:pt-20 pb-8 text-ink">
      <div className="fix">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] md:gap-12">
          <div>
            <Logo color="#fff" />
            <p className="mt-5 max-w-[300px] text-sm leading-[1.6] text-[#9CABA6]">
              Certified residential and commercial electricians — emergency
              repairs, installations, EV charging and smart home, across the
              Netherlands.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-white/14 px-3.5 py-[7px] text-[13px] text-[#D5E0DC]"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-[18px] text-xs tracking-[.16em] text-[#7E8E89] uppercase">
                {col.title}
              </div>
              <div className="grid gap-2.5">
                {col.items.map((i) => (
                  <a key={i} href="#" className="text-sm text-[#D5E0DC]">
                    {i}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div className="mb-[18px] text-xs tracking-[.16em] text-[#7E8E89] uppercase">
              Contact
            </div>
            <div className="grid gap-3 text-sm text-[#D5E0DC]">
              <div>
                Contactweg 36
                <br />
                1014 AN Amsterdam
              </div>
              <div>
                +31 (0)20 123 4567
                <br />
                hello@strom-electric.nl
              </div>
              <div className="mt-1 text-[12.5px] text-[#9CABA6]">
                Mon–Fri 07:00–20:00
                <br />
                Sat 08:00–17:00
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-6 md:mt-14 mb-6 h-px border-0 bg-white/8" />

        <div className="flex flex-wrap items-center justify-between gap-5 text-[12.5px] text-[#7E8E89]">
          <div>© 2026 Strøm Electric · KvK 81234567 · BTW NL003456789B01</div>
          <div className="flex flex-wrap gap-6">
            <a href="#privacy" className="text-[#9CABA6]">
              Privacy Policy
            </a>
            <a href="#cookies" className="text-[#9CABA6]">
              Cookie Settings
            </a>
            <a href="#terms" className="text-[#9CABA6]">
              Terms &amp; Conditions
            </a>
            <a href="#imprint" className="text-[#9CABA6]">
              Imprint
            </a>
          </div>
        </div>

        <div className="md:mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/6 pt-6 text-[11.5px] text-[#5E6E69]">
          <span>
            A flagship template by{" "}
            <span className="text-[#B9CFC6]">Growth Rocket</span> — managed
            websites &amp; booking for small businesses.
          </span>
          <span className="tracking-[.18em] uppercase">
            Designed in Amsterdam
          </span>
        </div>
      </div>
    </footer>
  );
}
