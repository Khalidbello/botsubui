"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import PlatformModal from "./PlatformModal";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPlatformModal, setShowPlatformModal] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50  shadow-sm bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-yellow-500">BotSub</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* CTA Button - Triggers your existing modal */}
            <button
              onClick={() => setShowPlatformModal(true)}
              className="ml-4 flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Chat Now <FiArrowRight className="ml-2" />
            </button>
          </nav>

          {/* Mobile Menu Button with WhatsApp CTA */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setShowPlatformModal(true);
              }}
              className="mr-4 flex items-center bg-blue-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
            >
              <FaWhatsapp className="mr-1" /> Chat Now
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-2 pb-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}

                {/* Mobile CTA - Triggers modal */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowPlatformModal(true);
                  }}
                  className="w-full text-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl"
                >
                  Chat Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Your existing modal - now controlled by NavBar */}
        <PlatformModal
          isOpen={showPlatformModal}
          onClose={() => setShowPlatformModal(false)}
        />
      </div>
    </header>
  );
}
