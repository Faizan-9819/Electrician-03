"use client";

import { useState } from "react";
import Icon from "./Icon";

type FAQData = { q: string; a: string };

const FAQS: FAQData[] = [
  {
    q: "Do you offer 24/7 emergency electrical services?",
    a: "Yes. We run a round-the-clock emergency line with certified electricians on call every day of the year, including evenings, weekends and public holidays. Whether it's a total power loss, a tripping circuit or a burning smell, call us and we will make it safe.",
  },
  {
    q: "How quickly can an electrician arrive?",
    a: "For genuine emergencies across the Randstad we aim to have an electrician with you within the hour, and often sooner. For standard work we usually offer same-day or next-day appointments, booked online or by phone in under two minutes.",
  },
  {
    q: "Are your electricians certified?",
    a: "Every electrician is fully qualified and works to NEN 1010 standards. We are NEN, VCA and InstallQ certified, fully insured, and every installation is tested and issued with the appropriate certification and documentation.",
  },
  {
    q: "Can you install EV chargers?",
    a: "Yes — EV charging is one of our specialisms. We install home and workplace chargers from all leading brands, handle load balancing and any board upgrades required, and register the installation so it is ready for the grid.",
  },
  {
    q: "Do you provide commercial electrical services?",
    a: "We do. From office fit-outs and retail units to distribution boards and ongoing maintenance contracts for light-industrial sites, we deliver commercial electrical work with minimal disruption and full compliance.",
  },
  {
    q: "How much does an electrical inspection cost?",
    a: "A standard residential condition report (EICR-equivalent) starts from a fixed, transparent price that we confirm before booking. Larger or commercial premises are quoted individually after a short scoping call. There are never any hidden fees.",
  },
];

type FAQItemProps = FAQData & {
  open: boolean;
  onClick: () => void;
  revealClass?: string;
};

function FAQItem({ q, a, open, onClick, revealClass = "" }: FAQItemProps) {
  return (
    <div className={`${revealClass} border-b border-line`}>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-[17px] font-medium tracking-[-.01em] text-ink">
          {q}
        </span>
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
            open ? "bg-accent text-[#0B0B0B]" : "bg-tint text-accent-deep"
          }`}
        >
          <Icon name={open ? "minus" : "plus"} size={15} stroke={2} />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-[760px] pb-6 text-[15px] leading-[1.6] text-ink-2">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="section-py border-t border-b border-line bg-tint"
    >
      <div className="fix">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-start md:gap-20">
          <div className="reveal md:sticky md:top-30">
            <span className="eyebrow">Questions</span>
            <h2 className="mt-[18px] text-[34px] md:text-[52px]">
              Most things,
              <br />
              <span className="display-serif text-accent-deep text-[34px] md:text-[52px]">
                answered.
              </span>
            </h2>
            <p className="lede mt-5">
              Can&apos;t find what you&apos;re looking for? Send us a message —
              we usually reply within the hour during office hours.
            </p>
            <a href="#contact" className="btn btn--primary mt-7">
              Ask a question{" "}
              <span className="arrow">
                <Icon name="arrowUR" size={11} stroke={2} />
              </span>
            </a>
          </div>
          <div>
            {FAQS.map((f, i) => (
              <FAQItem
                key={f.q}
                {...f}
                open={open === i}
                onClick={() => setOpen(i)}
                revealClass={`reveal reveal-d${Math.min(i + 1, 6)}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
