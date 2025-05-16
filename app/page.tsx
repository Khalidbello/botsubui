import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Navbar from "@/components/ui/NavBar";
import { MotionDiv } from "@/components/motion-client";
import { Footer } from "@/components/sections/Footer";
import { FAQSection } from "@/components/sections/Faq";
import { HowItWorks } from "@/components/sections/HowItworks";
import CustomerReviews from "@/components/sections/Review";

export default function Home() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Navbar />
      <HeroSection />
      <CustomerReviews />
      <FeaturesSection />
      <HowItWorks />
      <FAQSection />
      <Footer />
    </MotionDiv>
  );
}
