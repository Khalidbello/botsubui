"use client";

import { useState } from "react";
import Image from "next/image";

const BackGround = () => {
  const [vidLoaded, setVidLoaded] = useState<boolean>(true);

  const handleVideError = () => {
    setVidLoaded(false);
  };

  return (
    <>
      {vidLoaded ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-80 z-1"
          onError={handleVideError}
        >
          <source src="/homepage_bg_slow_speed.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          alt="background image"
          src={"/logo.png"}
          height={500}
          width={500}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-80 z-1"
        />
      )}
    </>
  );
};

export default BackGround;
