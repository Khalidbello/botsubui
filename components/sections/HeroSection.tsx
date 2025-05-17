"use client";

import { useState } from "react";
import PlatformModal from "../ui/PlatformModal";
import { MotionH1, MotionP, MotionButton } from "../motion-client";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="container mx-auto px-6 py-20 md:py-32 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <MotionH1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 md:mb-14"
      >
        Instant <span className="text-yellow-500">Airtime</span> &{" "}
        <span className="text-blue-500">Data</span> Purchases
      </MotionH1>

      <MotionP
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-600 mb-12 md:mb-20 max-w-2xl"
      >
        Get your mobile data and airtime instantly through WhatsApp or Facebook
        Even While On Freemode. No apps, no hassle.
      </MotionP>

      <MotionButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300"
      >
        Sub Now
      </MotionButton>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
