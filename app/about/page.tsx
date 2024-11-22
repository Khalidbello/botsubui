import AboutPrduct from "@/components/about/about-botsub";
import AboutFounder from "@/components/about/about-founder";
import Head from "@/components/about/head";
import Footer from "@/components/bot-landing/footer";

const About = () => {
  return (
    <div className="relative w-full h-full bg-yellow-50 pt-[8rem] px-5 overflow-auto">
      <Head />
      <AboutPrduct />
      <AboutFounder />
      <Footer />
    </div>
  );
};

export default About;
