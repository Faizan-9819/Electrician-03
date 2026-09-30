import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Home from "../page";
import { defaultLanguage, isLanguageEnabled, pathForLanguage } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Strøm Electric — Krachtige elektrotechnische oplossingen",
  description:
    "Strøm Electric — gecertificeerde elektriciens die krachtige elektrotechnische oplossingen leveren voor woningen, bedrijven en EV-laadpalen in heel Nederland.",
};

export default function DutchPage() {
  // This site may not ship Dutch at all, or may serve it from "/" instead.
  if (!isLanguageEnabled("nl")) redirect(pathForLanguage(defaultLanguage()));

  const url = pathForLanguage("nl");
  if (url !== "/nl") redirect(url);

  return <Home />;
}
