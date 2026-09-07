"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { ReactNode } from "react";

const MAX_WHEEL_DELTA = 60;

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        smoothWheel: true,

        respectReducedMotion: false,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 2,

        anchors: { offset: -76 },
        virtualScroll: (data) => {
          if (data.event.type === "wheel") {
            data.deltaX = Math.max(
              -MAX_WHEEL_DELTA,
              Math.min(MAX_WHEEL_DELTA, data.deltaX),
            );
            data.deltaY = Math.max(
              -MAX_WHEEL_DELTA,
              Math.min(MAX_WHEEL_DELTA, data.deltaY),
            );
          }
          return true;
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export function useLenisControl() {
  const lenis = useLenis();
  return {
    stop: () => lenis?.stop(),
    start: () => lenis?.start(),
  };
}
