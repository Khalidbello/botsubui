import Header from "@/components/bot-landing/header";
import Hero from "@/components/bot-landing/hero";
import Patners from "@/components/bot-landing/patners";
import Footer from "@/components/bot-landing/footer";
import BackGround from "@/components/bot-landing/bg";

const Page = () => {
  return (
    <div className="w-full h-full overflow-auto bg-yellow-50 flex justify-center items-center pt-[14rem]">
      <BackGround />
      <Header />
      <div className="relative z-5 flex flex-col justify-center gap-y-[17%] items-center h-[60%] min-h-[30rem] max-h-[40rem] pb-[5rem]">
        <Hero />
        <Patners />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
