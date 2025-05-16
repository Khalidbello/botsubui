"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { BsLightningCharge } from "react-icons/bs";
import PlatformModal from "../ui/PlatformModal";
import { useState } from "react";

export function HowItWorks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const steps = [
    {
      icon: <FaWhatsapp className="text-green-500" size={24} />,
      title: "Start Chat",
      description: "Message BotSub on WhatsApp or Facebook Messenger",
      color: "bg-green-100",
    },
    {
      icon: <IoMdSend className="text-blue-500" size={24} />,
      title: "Send Request",
      description: "Type your request (e.g. 'Airtime 1000' or 'Data 1GB MTN')",
      color: "bg-blue-100",
    },
    {
      icon: <BsLightningCharge className="text-yellow-500" size={24} />,
      title: "Instant Delivery",
      description: "Receive your airtime/data within seconds after payment",
      color: "bg-yellow-100",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-4"
        >
          How BotSub Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          Get your airtime and data in 3 simple steps through chat
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block mt-auto">
                  <FaArrowRight className="text-gray-400" size={20} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Get Started Now
            <FaArrowRight className="ml-2" />
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
