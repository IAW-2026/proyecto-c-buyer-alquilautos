import HeroSection from "@/components/inicio/hero-section";
import FeaturedSection from "@/components/inicio/featured-section";
import HowItWorksSection from "@/components/inicio/how-it-works-section";

export default function Home() {
  return (
    <main className="w-full px-0 py-8">
      <div className="flex w-full flex-col gap-12">
        <HeroSection />

        <FeaturedSection />

        <HowItWorksSection />
      </div>
    </main>
  );
}
