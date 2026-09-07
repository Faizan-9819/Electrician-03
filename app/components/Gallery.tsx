import Image from "next/image";

type GalleryItem = {
  id: string;
  label: string;
  img: string;
};

const GALLERY: GalleryItem[] = [
  { id: "g1", label: "Modern home lighting", img: "/images/gallery/modern-home-lighting.jpg" },
  {
    id: "g2",
    label: "Commercial distribution board",
    img: "/images/gallery/commercial-distribution-board.jpg",
  },
  { id: "g3", label: "EV charging install", img: "/images/gallery/ev-charging-install.jpg" },
  { id: "g4", label: "Smart home controls", img: "/images/gallery/smart-home-controls.jpg" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="section-py">
      <div className="fix">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <span className="eyebrow">Featured projects</span>
            <h2 className="mt-[18px] text-[clamp(34px,3.6vw,52px)] leading-[1.05] font-normal tracking-[-.022em]">
              Recent work,
              <br />
              <span className="display-serif text-accent-deep">done to standard.</span>
            </h2>
          </div>
          <p className="lede reveal reveal-d1 max-w-[380px]">
            A selection of recent residential and commercial installations across the Randstad —
            every one certified, tested and documented.
          </p>
        </div>

        <div className="grid grid-cols-[7fr_5fr] grid-rows-[320px_320px] gap-[18px] max-[800px]:grid-cols-1 max-[800px]:grid-rows-[240px_240px_240px_240px]">
          {GALLERY.map((g, i) => (
            <div
              key={g.id}
              className={`media reveal reveal-d${i + 1} relative shadow-sm`}
            >
              <Image
                src={g.img}
                alt={g.label}
                fill
                sizes="(max-width: 800px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute bottom-[18px] left-[18px] rounded-full bg-black/[.52] px-3 py-1.5 text-[12px] text-ink tracking-[-.005em] backdrop-blur-[6px]">
                {g.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
