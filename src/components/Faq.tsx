import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle, MessageSquare } from "lucide-react";
import { FAQs } from "../types";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-28 bg-dark-bg overflow-hidden border-b border-white/5">
      {/* Background radial atmosphere dims */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-80 h-80 rounded-full purple-glow opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 right-3/4 -translate-y-1/2 w-80 h-80 rounded-full orange-glow opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4 text-xs font-mono font-bold text-amber-400 uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>OPERATIONAL BLUEPRINT FAQs</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white">
            Locked Intent, <br />
            <span className="bg-gradient-to-r from-purple-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              No Ambiguity left.
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-neutral-400 text-xs sm:text-sm md:text-base font-light">
            You are paying for pure distribution velocity, not basic administration. Here is the operational handbook on our campaign standards.
          </p>
        </div>

        {/* Accordions Deck */}
        <div className="space-y-4">
          {FAQs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-white/[0.04] border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                    : "bg-white/[0.01] border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left focus:outline-none focus:ring-1 focus:ring-purple-500/30 rounded-2xl cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-display font-bold text-white pr-4 group-hover:text-rose-400">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full shrink-0 transition-all ${
                    isOpen ? "bg-gradient-to-r from-purple-600 to-rose-500 text-white" : "bg-white/5 text-neutral-300"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-[#bcbcc5] leading-relaxed font-sans border-t border-white/5 mx-2">
                        <p className="mt-3">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Additional Help banner */}
        <div className="mt-12 p-4 sm:p-6 rounded-2xl glass-effect border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
              <MessageSquare className="w-5 h-5 text-rose-500" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-sm text-white">Have a highly technical custom inquiry?</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Let's solve it dynamically on our locked strategy call.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-[#1c1c24] hover:bg-neutral-800 border border-white/10 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all text-center"
          >
            Ask Founder Direct
          </a>
        </div>

      </div>
    </section>
  );
}
