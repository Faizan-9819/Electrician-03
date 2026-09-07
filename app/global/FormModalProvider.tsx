"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import BookingForm from "./BookingForm";
import CookieConsentBanner from "./CookieConsentBanner";
import CookieModal from "./CookieModal";
import EnquiryModal from "./EnquiryModal";

type FormModalContextValue = {
  openBooking: () => void;
  openEnquiry: () => void;
  openCookies: () => void;
};

const FormModalContext = createContext<FormModalContextValue | null>(null);

export function useFormModals() {
  return useContext(FormModalContext);
}

// Anchor hashes used across the site's CTAs (e.g. href="#book") that should
// open a modal instead of scrolling. Kept as aliases alongside the original
// #booking/#enquiry hashes so either naming works.
const BOOKING_HASHES = new Set(["#booking", "#book"]);
const ENQUIRY_HASHES = new Set(["#enquiry", "#contact"]);
const COOKIE_HASHES = new Set(["#cookies", "#cookie-settings"]);

export default function FormModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);

  const openBooking = useCallback(() => {
    setIsBookingOpen(true);
  }, []);

  const openEnquiry = useCallback(() => {
    setIsEnquiryOpen(true);
  }, []);

  const openCookies = useCallback(() => {
    setIsCookieOpen(true);
  }, []);

  useEffect(() => {
    const openFromHash = (hash: string) => {
      if (BOOKING_HASHES.has(hash)) {
        openBooking();
        return true;
      }
      if (ENQUIRY_HASHES.has(hash)) {
        openEnquiry();
        return true;
      }
      if (COOKIE_HASHES.has(hash)) {
        openCookies();
        return true;
      }
      return false;
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname
      ) {
        return;
      }

      if (openFromHash(url.hash)) {
        event.preventDefault();
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}`,
        );
      }
    };

    document.addEventListener("click", onClick, true);
    openFromHash(window.location.hash);

    return () => document.removeEventListener("click", onClick, true);
  }, [openBooking, openEnquiry, openCookies]);

  const value = useMemo(
    () => ({ openBooking, openEnquiry, openCookies }),
    [openBooking, openEnquiry, openCookies],
  );

  return (
    <FormModalContext.Provider value={value}>
      {children}
      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
      <CookieModal
        isOpen={isCookieOpen}
        onClose={() => setIsCookieOpen(false)}
      />
      <CookieConsentBanner onManagePreferences={openCookies} />
    </FormModalContext.Provider>
  );
}
