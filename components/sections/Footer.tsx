import { FaFacebook, FaWhatsapp, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-yellow-400">BotSub</h3>
            <p className="text-gray-400">
              Instant airtime and data purchases through chat.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-blue-300">
              <li>
                <a href="#" className=" hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className=" hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className=" hover:text-white transition"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className=" hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">
              Contact Us
            </h4>
            <ul className="space-y-3  text-blue-300">
              <li className="flex items-center space-x-2">
                <MdEmail />
                <span>support@botsub.com.ng</span>
              </li>
              <li className="flex items-center space-x-2">
                <MdPhone />
                <a href="https://wa.me/+234818814243">+234 818 814 243</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md w-full text-gray-900 focus:outline-none"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-r-md transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} BotSub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
