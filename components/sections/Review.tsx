"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import PlatformModal from "../ui/PlatformModal";

const reviews = [
  {
    name: "Adebayo S.",
    role: "Freelance Designer",
    rating: 5,
    content:
      "BotSub saved me during a client call when my data finished. Got 2GB in 30 seconds without leaving WhatsApp! This is pure magic.",
    avatar: "/avatars/adebayo.jpg",
  },
  {
    name: "Chioma K.",
    role: "University Student",
    rating: 5,
    content:
      "I use BotSub for my midnight study sessions. No more worrying about airtime when the library WiFi fails. 24/7 service is a lifesaver!",
    avatar: "/avatars/chioma.jpg",
  },
  {
    name: "Emeka T.",
    role: "Small Business Owner",
    rating: 4,
    content:
      "My shop runs on mobile data. With BotSub, I never miss sales because of network issues. The Facebook Messenger integration is perfect for me.",
    avatar: "/avatars/emeka.jpg",
  },
];

export default function CustomerReviews() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-4"
        >
          What Our Customers Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          Trusted by thousands of users across Nigeria
        </motion.p>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg relative"
            >
              <FaQuoteLeft className="text-yellow-400 text-3xl absolute top-6 left-6 opacity-10" />

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-yellow-400">
                    {/* Replace with your actual avatar images */}
                    <div className="bg-blue-500 h-full w-full flex items-center justify-center text-white text-2xl font-bold">
                      {reviews[currentIndex].name.charAt(0)}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < reviews[currentIndex].rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } text-lg`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 italic text-lg mb-4">
                    {reviews[currentIndex].content}
                  </p>

                  <div>
                    <h4 className="font-bold text-gray-900">
                      {reviews[currentIndex].name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {reviews[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-yellow-50 transition"
          >
            <FaChevronLeft className="text-yellow-500" />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-yellow-50 transition"
          >
            <FaChevronRight className="text-yellow-500" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-yellow-500" : "bg-gray-300"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Join Happy Customers <FiArrowRight className="ml-2" />
          </button>
        </motion.div>
      </div>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
