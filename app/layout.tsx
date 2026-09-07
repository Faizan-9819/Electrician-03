import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import ScrollReveal from "./components/ScrollReveal";
import FormModalProvider from "./global/FormModalProvider";
import { LanguageProvider } from "./i18n/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Strøm Electric — High-performance electrical solutions",
  description:
    "Strøm Electric — certified electricians delivering high-performance residential, commercial and EV electrical solutions across the Netherlands.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="bg-bg text-ink font-sans">
        <LanguageProvider initialLocale="en">
          <SmoothScroll>
            <FormModalProvider>{children}</FormModalProvider>
          </SmoothScroll>
        </LanguageProvider>
        <ScrollReveal />
      </body>
    </html>
  );
}
