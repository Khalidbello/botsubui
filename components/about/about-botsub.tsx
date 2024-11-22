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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
        molestias accusantium hic quis quae repellat, minus iste eaque
        praesentium error optio sint odit, totam doloremque iusto animi,
        temporibus explicabo dignissimos.
        <a
          href="/https://www.facebook.com/profile.php?id=100094053438576"
          className="text-purple-400 underline text-sm gap-x-3 flex items-center justify-start"
        >
          Get started with BotSub{" "}
          <FontAwesomeIcon icon={faArrowRight} className="h-3" />
        </a>
      </div>
      <div className="bg-purple-50 rounded-xl relative mt-[2rem]">
        <span className="bg-cyan-600 text-white text-xs px-3 py-1 rounded-full absolute right-[3rem] md:right-[6rem] -top-[3rem] rotate-12">
          ₦200/GB
        </span>

        <Image
          alt="photo of botsub"
          width={500}
          height={500}
          src="/fb.jpeg"
          className="-mt-[2rem] ml-1 rounded-xl"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default AboutPrduct;
