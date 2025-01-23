import React from "react";
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.div
        className="w-40 h-40 bg-blue-500 rounded-xl flex justify-center items-center text-white font-bold text-lg"
        whileHover={{
          scale: 1.2,
          opacity: 0.8,
          rotate: 15,
        }}
        whileTap={{
          scale: 0.9,
          opacity: 1,
        }}
      >
        Hover Me
      </motion.div>
    </div>
  );
};

export default App;
