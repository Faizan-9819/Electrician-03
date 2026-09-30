import { redirect } from "next/navigation";
import Home from "../page";
import { defaultLanguage, isLanguageEnabled, pathForLanguage } from "@/lib/i18n";

export default function EnglishPage() {
  // This site may not ship English at all, or may serve it from "/" instead.
  if (!isLanguageEnabled("en")) redirect(pathForLanguage(defaultLanguage()));

  const url = pathForLanguage("en");
  if (url !== "/en") redirect(url);

  return <Home />;
}
