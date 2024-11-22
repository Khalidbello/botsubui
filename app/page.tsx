import Header from "@/components/bot-landing/header";
import Hero from "@/components/bot-landing/hero";
import Patners from "@/components/bot-landing/patners";
import Footer from "@/components/bot-landing/footer";

const Page = () => {
  return (
    <div className="w-full h-full overflow-hidden bg-yellow-50 flex justify-center items-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-80 z-1"
      >
        <source src="/homepage_bg_slow_speed.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Header />
      <div className="relative z-5 flex flex-col justify-center gap-y-[20%] items-center h-[60%] min-h-[25rem] max-h-[40rem] mt-[5rem]">
        <Hero />
        <Patners />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
