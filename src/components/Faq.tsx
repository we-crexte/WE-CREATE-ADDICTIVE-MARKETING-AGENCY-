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
    <section id="faq" className="relative py-20 sm:py-32 bg-dark-bg overflow-hidden border-b border-white/5">
      {/* Background glow flares */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] orange-glow opacity-5 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] purple-glow opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 px-4">
          <div className="inline-block px-12 py-6 sm:py-8 rounded-3xl bg-[#09090b]/80 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden">
            {/* Ambient subtle glow inside */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-accent-orange/10 to-accent-gold/10 opacity-30 blur-xl pointer-events-none" />
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white leading-none relative z-10 select-none">
              FAQ
            </h2>
          </div>
        </div>

        {/* Accordions Deck */}
        <div className="space-y-4 text-left">
          {FAQs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/5 bg-dark-card transition-all duration-300 hover:border-neutral-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left rounded-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-display font-bold text-neutral-200 pr-4 transition-colors group-hover:text-white">
                    {faq.question}
                  </span>
                  <div className="p-2 rounded-xl shrink-0 transition-all bg-neutral-900 border border-neutral-800 text-white group-hover:bg-neutral-800">
                    {isOpen ? <Minus className="w-4 h-4 text-accent-orange" /> : <Plus className="w-4 h-4 text-accent-purple" />}
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
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-dark-card border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold opacity-30" />
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
              <MessageSquare className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">Have a custom inquiry?</h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">Get in touch with us to discuss your goals and how we can help.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all text-center shrink-0"
          >
            Ask Founder Direct
          </a>
        </div>

      </div>
    </section>
  );
}
