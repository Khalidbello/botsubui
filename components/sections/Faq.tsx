"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqItems = [
  {
    question: "How do I purchase airtime with BotSub?",
    answer:
      "Simply send 'Airtime [amount]' to our WhatsApp or Facebook bot, then follow the payment instructions. Your airtime will be delivered instantly after payment confirmation.",
  },
  {
    question: "Which networks do you support for data bundles?",
    answer:
      "We support all major networks including MTN, Airtel, Glo, and 9mobile. Just specify your network when making the request.",
  },
  {
    question: "Is there a limit to how much I can purchase?",
    answer:
      "You can purchase between ₦100 and ₦50,000 worth of airtime or data per transaction. Higher amounts may require verification.",
  },
  {
    question: "How secure are my transactions?",
    answer:
      "All transactions are encrypted and processed securely. We never store your payment details and use trusted payment gateways.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, debit cards, and mobile money. More payment options coming soon!",
  },
  {
    question: "How long does it take to receive my data/airtime?",
    answer:
      "99% of transactions are completed within 30 seconds after successful payment. In rare cases, it may take up to 5 minutes.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white rounded-lg shadow-sm overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        {isOpen ? (
          <FaChevronUp className="text-yellow-500" />
        ) : (
          <FaChevronDown className="text-yellow-500" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 overflow-hidden"
          >
            <div className="pb-6 text-gray-600">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
