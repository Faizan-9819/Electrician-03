import Image from "next/image";
import Icon from "./Icon";

type Location = {
  name: string;
  photo: string;
  addr: string;
  hours: string;
  phone: string;
  main?: boolean;
};

const LOCATIONS: Location[] = [
  {
    name: "Amsterdam — HQ",
    photo: "/images/locations/amsterdam-hq.jpg",
    addr: "Contactweg 36, 1014 AN Amsterdam",
    hours: "Mon–Fri 07:00–20:00 · Sat 08:00–17:00",
    phone: "+31 20 123 4567",
    main: true,
  },
  {
    name: "Rotterdam — Depot",
    photo: "/images/locations/rotterdam-depot.jpg",
    addr: "Schiehavenkade 12, 3024 EZ Rotterdam",
    hours: "Mon–Fri 07:00–19:00 · Sat 08:00–16:00",
    phone: "+31 10 987 6543",
  },
];

const ALSO_COVERING = [
  "Amsterdam",
  "Rotterdam",
  "The Hague",
  "Utrecht",
  "Eindhoven",
  "Leiden",
  "Haarlem",
  "Delft",
];

export default function Locations() {
  return (
    <section
      id="locations"
      className="section-py border-t border-b border-line bg-surface"
    >
      <div className="fix">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <span className="eyebrow">Service areas</span>
            <h2 className="mt-[18px] text-[34px] md:text-[52px]">
              Two bases,{" "}
              <span className="display-serif text-accent-deep">
                one standard.
              </span>
            </h2>
          </div>
          <p className="lede reveal reveal-d1 max-w-[380px]">
            Both bases share the same team, equipment and certification
            standards. We cover the entire Randstad and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {LOCATIONS.map((l, i) => (
            <div
              key={l.name}
              className={`card reveal reveal-d${i + 1} overflow-hidden p-0`}
            >
              <div className="media relative h-[220px]">
                <Image
                  src={l.photo}
                  alt={`${l.name} — Strøm Electric`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/12 to-bg/45" />
                {l.main && (
                  <div className="absolute top-3.5 left-3.5 rounded-full bg-accent px-2.5 py-1 text-[11px] tracking-[.08em] text-[#0B0B0B] uppercase">
                    Main base
                  </div>
                )}
              </div>
              <div className="pt-6 pr-[26px] pb-[26px] pl-[26px]">
                <h3 className="text-xl">{l.name}</h3>
                <div className="mt-4 grid gap-2.5 text-sm text-ink-2">
                  <div className="flex gap-2.5">
                    <Icon
                      name="pin"
                      size={15}
                      className="mt-0.5 shrink-0 text-muted"
                    />{" "}
                    {l.addr}
                  </div>
                  <div className="flex gap-2.5">
                    <Icon
                      name="clock"
                      size={15}
                      className="mt-0.5 shrink-0 text-muted"
                    />{" "}
                    {l.hours}
                  </div>
                  <div className="flex gap-2.5">
                    <Icon
                      name="phone"
                      size={15}
                      className="mt-0.5 shrink-0 text-muted"
                    />{" "}
                    {l.phone}
                  </div>
                </div>
                <div className="mt-[22px] flex gap-2.5">
                  <a href="#book" className="btn btn--primary btn--sm">
                    Book here
                  </a>
                  <a href="#directions" className="btn btn--ghost btn--sm">
                    Get directions <Icon name="arrowUR" size={12} stroke={2} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-10 border-t border-line pt-8">
          <div className="mb-[18px] text-xs tracking-[.16em] text-muted uppercase">
            Also covering
          </div>
          <div className="flex flex-wrap gap-2.5">
            {ALSO_COVERING.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-[9px] text-[13.5px] text-ink-2"
              >
                <Icon name="pin" size={13} className="text-accent-deep" /> {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
