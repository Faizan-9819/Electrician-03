"use client";

import { useState } from "react";
import Icon from "./Icon";
import WhatsAppIcon from "../global/WhatsAppIcon";

export default function FloatingUI() {
  const [waOpen, setWaOpen] = useState(false);

  return (
    <>
      {/* Floating WhatsApp */}
      <div className="fixed right-5 bottom-5 z-[60] flex flex-col items-end gap-3">
        {waOpen && (
          <div className="w-[300px] animate-[fadeUp_.3s_ease_both] overflow-hidden rounded-md border border-line bg-surface shadow-lg">
            <div className="flex items-center gap-2.5 bg-[#141414] px-4 py-3.5 text-white">
              <WhatsAppIcon size={18} />
              <div className="flex-1">
                <div className="text-sm font-medium">Strøm Electric</div>
                <div className="text-[11.5px] opacity-75">
                  Replies within 1 hour
                </div>
              </div>
              <button onClick={() => setWaOpen(false)} className="text-white">
                <Icon name="close" size={16} />
              </button>
            </div>
            <div className="bg-tint p-4">
              <div className="max-w-[240px] rounded-tl-[14px] rounded-tr-[14px] rounded-br-[14px] rounded-bl-[4px] bg-surface px-3.5 py-2.5 text-[13.5px] leading-[1.4] text-ink-2">
                Hi there — how can we help? A booking, a quote, or an emergency
                call-out?
              </div>
            </div>
            <a
              href="https://wa.me/31644008821"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--accent m-3.5 justify-center"
            >
              Start chat <Icon name="arrowUR" size={12} stroke={2} />
            </a>
          </div>
        )}
        <button
          onClick={() => setWaOpen((o) => !o)}
          aria-label="WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-[#141414] text-accent shadow-[0_12px_30px_-8px_rgba(255,176,32,.28),0_4px_10px_rgba(0,0,0,.4)]"
        >
          {waOpen ? (
            <Icon name="close" size={22} stroke={2} />
          ) : (
            <WhatsAppIcon size={22} />
          )}
        </button>
      </div>

      {/* Sticky mobile book bar */}
      <div className="hidden fixed inset-x-3 bottom-3 z-[55] flex items-center justify-between rounded-full border border-line bg-[#161616] py-2.5 pr-2.5 pl-[18px] text-ink shadow-lg lg:hidden">
        <div className="text-[13.5px]">
          <div className="text-[11px] opacity-70">Next available</div>
          <div>Thu, May 21 · 10:40</div>
        </div>
        <a href="#book" className="btn btn--accent btn--sm">
          Book <Icon name="arrowUR" size={11} stroke={2} />
        </a>
      </div>
    </>
  );
}
