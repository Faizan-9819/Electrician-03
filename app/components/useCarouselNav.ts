"use client";

import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export function useCarouselNav(emblaApi: EmblaCarouselType | undefined) {
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onPrevClick = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNextClick = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = (api: EmblaCarouselType) => {
      setPrevDisabled(!api.canScrollPrev());
      setNextDisabled(!api.canScrollNext());
    };

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect);
    };
  }, [emblaApi]);

  return { prevDisabled, nextDisabled, onPrevClick, onNextClick };
}
