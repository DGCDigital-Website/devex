"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowUp } from "@tabler/icons-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {/* Illuminating shadow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3D9DD9] to-[#177DA6] rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

            {/* Main button */}
            <div className="relative bg-gradient-to-r from-[#3D9DD9] to-[#177DA6] text-white p-3 rounded-full shadow-2xl hover:shadow-[0_20px_40px_rgba(61,157,217,0.3)] transition-all duration-300 border border-white/20 backdrop-blur-sm">
              <IconArrowUp className="w-5 h-5" />
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3D9DD9] to-[#177DA6] rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
