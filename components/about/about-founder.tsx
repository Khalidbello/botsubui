import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const AboutFounder = () => {
  return (
    <div className="flex flex-col items-center justify-around md:flex-row-reverse md:mt-6 gap-x-6 gap-y-4 mb-[6rem] max-w-[70rem] mx-auto">
      <p className="max-w-[17rem] rounded-xl bg-orange-50 p-3 text-gray-800 font-mono relative">
        <span className="bg-purple-600 text-white text-center max-w-[8rem] font-semibold text-xs px-3 py-1 rounded-full inline absolute left-[1rem] md:right-[6rem]  -top-[2rem] -rotate-6">
          About Founder
        </span>
        Khalid Bello, a Kaduna-based innovator, founded BotSub after
        experiencing the frustration of running out of data while researching.
        With sharp analytical skills and grit, he turned that challenge into a
        seamless solution to keep everyone connected.{" "}
        <a
          href="https://codenojutsu.vercel.app"
          className="text-purple-400 underline text-sm gap-x-3 flex items-center justify-start"
        >
          Get to know more about Khalid Bello{" "}
          <FontAwesomeIcon icon={faArrowRight} className="h-3" />
        </a>
      </p>
      <div className="bg-purple-50 rounded-xl relative mt-[2rem]">
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

export default AboutFounder;
