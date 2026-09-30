import { redirect } from "next/navigation";
import { defaultLanguage, pathForLanguage, rootLanguage } from "@/lib/i18n";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import Gallery from "./components/Gallery";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import CTABanner from "./components/CTABanner";
import Locations from "./components/Locations";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingUI from "./components/FloatingUI";

export default function Home() {
  // When neither language uses "/", it isn't a real page — send visitors on
  // to the main language's own URL.
  if (!rootLanguage()) redirect(pathForLanguage(defaultLanguage()));

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <Gallery />
      <Team />
      <Testimonials />
      <CTABanner />
      <Locations />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingUI />
    </>
  );
}
