import {
  MotionDiv,
  MotionA,
  AnimatePresence,
} from "@/components/motion-client";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

interface PlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlatformModal({ isOpen, onClose }: PlatformModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <MotionDiv
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="bg-white rounded-xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Choose Platform
              </h2>
              <FaX
                onClick={onClose}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </FaX>
            </div>

            <div className="space-y-4">
              <MotionA
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/+2349136659673"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors"
              >
                <FaWhatsapp className="text-xl" />
                <span>Continue on WhatsApp</span>
              </MotionA>

              <MotionA
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://facebook.com/100094053438576"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors"
              >
                <FaFacebook className="text-xl" />
                <span>Continue on Facebook</span>
              </MotionA>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
