import { useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, ShieldCheck, Sparkles } from "lucide-react";

/**
 * CALENDLY EMBED CONFIGURATION
 * ----------------------------
 * Active discovery call booking link:
 */
export const DEFAULT_CALENDLY_URL = "https://calendly.com/samworks1097/adictive-discovery-call";

interface ContactProps {
  calendlyUrl?: string;
}

export default function Contact({ calendlyUrl = DEFAULT_CALENDLY_URL }: ContactProps) {
  useEffect(() => {
    // Check if Calendly widget script is already loaded
    const scriptSrc = "https://assets.calendly.com/assets/external/widget.js";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-dark-bg overflow-hidden border-t border-white/5 font-sans">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-r from-accent-purple/10 via-accent-orange/10 to-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900/90 border border-accent-purple/30 rounded-full mb-4 text-[10px] font-mono font-bold text-accent-purple uppercase tracking-widest shadow-lg">
            <Calendar className="w-3.5 h-3.5 text-accent-purple" />
            <span>1-ON-1 STRATEGY & DISCOVERY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white mb-4 uppercase">
            BOOK AN <span className="bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold bg-clip-text text-transparent font-black">ADICTIVE DISCOVERY CALL</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Choose a date and time on the live calendar below to lock in your 1-on-1 discovery call with our team.
          </p>

          {/* Quick trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent-orange" />
              15–20 Min Strategy Session
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
              Actionable Content Roadmap
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Free & No Obligation
            </span>
          </div>
        </div>

        {/* Real Calendly Inline Widget Embed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mx-auto relative rounded-3xl overflow-hidden bg-neutral-950/60 border border-white/10 shadow-2xl p-2 sm:p-4 backdrop-blur-xl"
        >
          <div
            className="calendly-inline-widget w-full"
            data-url={calendlyUrl}
            style={{ minWidth: "320px", height: "850px" }}
          />
        </motion.div>

      </div>
    </section>
  );
}
