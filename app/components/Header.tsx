"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import WhatsAppIcon from "../global/WhatsAppIcon";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Blog", href: "#blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-bg/[.82] backdrop-blur-[14px] backdrop-saturate-[1.4]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="fix flex h-[76px] items-center gap-8">
        <a href="#top">
          <Logo />
        </a>
        <nav className="ml-6 hidden gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-full px-3.5 py-2 text-sm text-ink-2 transition-colors hover:bg-tint hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <a
            href="https://wa.me/31644008821"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-accent-deep md:inline-flex"
          >
            <WhatsAppIcon size={18} />
          </a>
          <a href="#contact" className="btn btn--ghost btn--sm hidden md:inline-flex">
            Contact Us
          </a>
          <a
            href="#book"
            className="btn btn--primary btn--sm hidden md:inline-flex"
          >
            Book Appointment{" "}
            <span className="arrow">
              <Icon name="arrowUR" size={11} stroke={2} />
            </span>
          </a>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "burger"} size={18} />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-line bg-surface py-2.5 md:hidden">
          <div className="fix grid gap-0.5">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-[10px] px-2 py-3 text-[15px] text-ink"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="btn btn--primary btn--sm mt-2 w-full"
            >
              Book Appointment{" "}
              <span className="arrow">
                <Icon name="arrowUR" size={11} stroke={2} />
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
