import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ExperienceScenes from "@/components/sections/ExperienceScenes";
import LazySpatialAudio from "@/components/sections/LazySpatialAudio";
import Features from "@/components/sections/Features";
import Specs from "@/components/sections/Specs";
import CTA from "@/components/sections/CTA";
import WaveformDivider from "@/components/ui/WaveformDivider";
import ScrollToNext from "@/components/ui/ScrollToNext";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WaveformDivider />
        <ProductShowcase />
        <WaveformDivider />
        <ExperienceScenes />
        <WaveformDivider />
        <LazySpatialAudio />
        <WaveformDivider />
        <Features />
        <WaveformDivider />
        <Specs />
        <WaveformDivider />
        <CTA />
      </main>
      <Footer />
      <ScrollToNext />
    </>
  );
}
