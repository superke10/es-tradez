import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TickerBar from "@/components/home/TickerBar";
import HeroSection from "@/components/home/HeroSection";
import MarketsSection from "@/components/home/MarketsSection";
import SignalsSection from "@/components/home/SignalsSection";
import PerformanceSection from "@/components/home/PerformanceSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <TickerBar />
      <HeroSection />
      <MarketsSection />
      <SignalsSection />
      <PerformanceSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}