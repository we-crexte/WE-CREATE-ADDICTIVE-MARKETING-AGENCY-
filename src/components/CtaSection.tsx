import { motion } from "motion/react";
import { PhoneCall, Sparkles, ArrowRight, Flame } from "lucide-react";

export default function CtaSection() {
  return (
    <section id="cta-section" className="relative py-24 sm:py-32 bg-dark-bg overflow-hidden border-t border-b border-white/5">
      {/* Immersive full-width radial glow backing */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e11] to-dark-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] purple-glow opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] orange-glow opacity-15 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Visual Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full mb-6 text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-widest shadow-lg"
        >
          <Flame className="w-3.5 h-3.5 text-accent-orange animate-pulse" />
          <span>IMMEDIATE SCALE ACTION</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto"
        >
          Ready to Turn Content Into <br />
          <span className="bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold bg-clip-text text-transparent">
            Consistent Views, Leads & Sales?
          </span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-neutral-400 text-sm sm:text-base md:text-lg font-light font-sans max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Stop wasting budget on uninspired strategies. Partner with Addictive Marketing to deploy proven content systems built exclusively to capture attention and scale your brand.
        </motion.p>

        {/* Call to action group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
        >
          {/* Main Prominent Call button */}
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold text-white font-mono font-bold text-xs uppercase tracking-widest rounded-full transition-transform hover:scale-105 active:scale-95 duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-white/10"
          >
            <PhoneCall className="w-4 h-4 text-white" />
            <span>Book A Free Strategy Call</span>
          </a>
          
          {/* Secondary Watch Masterclass button */}
          <a
            href="#vsl"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <span>Watch Masterclass</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Sub-disclaimer */}
        <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider mt-10">
          ⚡ 15-Minute strategy consultation // Limited openings monthly
        </p>

      </div>
    </section>
  );
}
