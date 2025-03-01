import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const AboutPrduct = () => {
  return (
    <div className="flex flex-col items-center justify-around mb-[7rem] md:flex-row md:mt-6 gap-x-6 gap-y-4 md:mb-[10rem] max-w-[70rem] mx-auto">
      <div className="max-w-[17rem] lg:max-w-[25rem] rounded-xl bg-orange-50 p-3 text-gray-800 font-mono relative">
        <span className="bg-purple-600 text-white text-center max-w-[7rem] font-semibold text-xs px-3 py-1 rounded-full inline absolute left-[1rem] md:right-[6rem]  -top-[2rem] -rotate-6">
          About BotSub
        </span>
        BotSub is your lifeline when you’re out of data, letting you buy data
        and airtime effortlessly through Facebook Free Mode. No extra apps
        needed, no hassle—just log into Facebook, search BotSub, and reconnect
        instantly. Affordable, reliable, and always there, BotSub ensures you’re
        never stranded offline.
        <a
          href="/https://www.facebook.com/profile.php?id=100094053438576"
          className="text-purple-400 underline text-sm gap-x-3 flex items-center justify-start"
        >
          Get started with BotSub{" "}
          <FontAwesomeIcon icon={faArrowRight} className="h-3" />
        </a>
      </div>
      <div className="bg-purple-50 rounded-xl relative mt-[4rem]">
        <span className="bg-cyan-600 text-white text-xs px-3 py-1 rounded-full absolute right-[3rem] md:right-[6rem] -top-[3rem] rotate-12">
          ₦200/GB
        </span>

        <Image
          alt="photo of botsub"
          width={500}
          height={500}
          src="/botsub.png"
          className="-mt-[4rem] ml-1 rounded-xl"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default AboutPrduct;
