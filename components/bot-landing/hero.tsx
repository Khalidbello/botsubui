"use client";

import { useState } from "react";
import RollerAnimation from "./roller-white";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClicked = () => {
    setClicked(true);
    setTimeout(() => {
      router.push("https://www.facebook.com/profile.php?id=100094053438576");
    });
  };

  return (
    <div className="w-full flex flex-col jusitfy-center items-center gap-y-7 text-gray-500 p-4">
      <p className="font-mono font-bold to-transparent text-center text-3xl md:text-5xl pb-6 relative">
        <span className="bg-cyan-600 text-white text-xs px-3 py-1 rounded-full absolute right-[2rem] md:right-[6rem] -top-[3rem] rotate-12">
          ₦200/GB
        </span>
        Buy Data Without Data
      </p>
      <p className="font-mono text-sm max-w-md text-center">
        Good bye to abeg hotspot me mah sub... totally out of data..? talk to
        botsub on facebook.... works on freemode
      </p>
      <button
        onClick={handleClicked}
        className="px-4 py-2 rounded-full bg-purple-600 text-white"
      >
        {clicked ? <RollerAnimation h="h-[1rem]" /> : "Get Started"}
      </button>
    </div>
  );
};

export default Hero;
