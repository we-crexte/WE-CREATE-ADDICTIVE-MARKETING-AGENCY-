import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import AdictiveLogo from "./AdictiveLogo";

export default function LuxuryLoader() {
  const [percent, setPercent] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Increment percent quickly
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setComplete(true), 400); // Hold full bar briefly
          return 100;
        }
        // Random incremental leaps for high fidelity loading feeling
        const leap = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + leap, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-[#070708] z-[99999] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Visual abstract overlay */}
          <div className="absolute inset-x-0 top-1/4 h-1/2 bg-gradient-to-r from-purple-500/10 via-rose-500/10 to-amber-500/10 filter blur-[150px]" />
          
          <div className="relative flex flex-col items-center max-w-[18rem] xs:max-w-xs sm:max-w-sm w-full">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 sm:mb-10"
            >
              <AdictiveLogo iconSize="w-11 h-11 sm:w-13 sm:h-13" textSize="text-lg sm:text-2xl" />
            </motion.div>

            {/* Progress Meter bar container */}
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 rounded-full"
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>

            {/* Percent & Status info row */}
            <div className="w-full flex justify-between items-center mt-3.5 text-[8.5px] sm:text-[10px] font-mono tracking-normal sm:tracking-widest uppercase">
              <span className="text-neutral-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" />
                <span>ATTENTION COMPILING...</span>
              </span>
              <span className="text-amber-400 font-bold font-mono">{percent}%</span>
            </div>

            {/* Subtle loading subtitle */}
            <p className="mt-12 sm:mt-16 text-[8px] sm:text-[9px] font-mono uppercase tracking-wider sm:tracking-[0.2em] text-neutral-600 text-center leading-relaxed max-w-xs px-2 sm:px-0">
              SYSTEM RE-INDEX v4.2 <br className="sm:hidden" /> // EXECUTING EXTRACTION BLUEPRINT
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
