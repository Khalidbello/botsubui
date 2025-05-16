import { FaBolt, FaComment, FaShieldAlt } from "react-icons/fa";

export const features = [
  {
    icon: <FaBolt className="text-yellow-500 text-2xl" />,
    title: "Instant Transactions",
    description: "Get your airtime and data bundles instantly without delays.",
  },
  {
    icon: <FaComment className="text-blue-500 text-2xl" />,
    title: "Chat-Based Interface",
    description: "Simple conversation interface you're already familiar with.",
  },
  {
    icon: <FaShieldAlt className="text-yellow-500 text-2xl" />,
    title: "Secure Payments",
    description: "All transactions are encrypted and secure.",
  },
] as const;
