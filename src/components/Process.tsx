import { motion } from "motion/react";
import { Sparkles, Trophy, Quote, Target, Award, Rocket, Check } from "lucide-react";

export default function Process() {
  const processSteps = [
    {
      phase: "01",
      title: "Discovery & Strategy",
      desc: "We start by understanding your business, audience, goals, and existing content. This helps us create a content strategy tailored to your brand."
    },
    {
      phase: "02",
      title: "Content Planning & Production",
      desc: "We plan, script, edit, and structure content around your goals. Every piece is designed to keep viewers engaged and communicate your message clearly."
    },
    {
      phase: "03",
      title: "Publishing & Optimization",
      desc: "Once content is ready, we help optimize it for the platform and continuously improve performance based on audience response and results."
    }
  ];

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-dark-bg overflow-hidden border-t border-b border-white/5">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] orange-glow opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] purple-glow opacity-10 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md rounded-full mb-4 text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest"
          >
            <Rocket className="w-3.5 h-3.5 text-accent-orange" />
            <span>OUR WORKING METHODOLOGY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white leading-tight"
          >
            The Adictive Growth Process. <br />
            <span className="bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold bg-clip-text text-transparent">
              Zero Guesswork. Just Content Systems.
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="mt-4 sm:mt-6 text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
          >
            We've refined our system into three simple phases that move you quickly from raw concept to published attention machines with guaranteed delivery.
          </motion.p>
        </div>

        {/* Process Timeline/Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 max-w-7xl mx-auto">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-8 sm:p-10 rounded-2xl bg-dark-card border border-white/5 hover:border-neutral-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-[1.01] transition-all duration-300 relative group overflow-hidden flex flex-col justify-between text-left"
            >
              {/* Highlight element */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                {/* Step number badge */}
                <div className="w-12 h-12 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-center mb-8">
                  <span className="font-mono text-base font-bold text-white bg-gradient-to-r from-accent-purple to-accent-orange bg-clip-text text-transparent">
                    {step.phase}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-neutral-400 text-sm font-sans font-light leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              {/* Step checklist preview */}
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono tracking-wider text-neutral-500">
                <span>PHASE {step.phase} // VERIFIED SYSTEM</span>
                <span className="w-2 h-2 rounded-full bg-white group-hover:animate-ping" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Process Check List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-5 text-sm text-neutral-300"
        >
          <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide">
            <Check className="w-4 h-4 text-accent-purple shrink-0" />
            <span>Content strategy & guidance</span>
          </span>
          <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide">
            <Check className="w-4 h-4 text-accent-orange shrink-0" />
            <span>Editing & sound design</span>
          </span>
          <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wide">
            <Check className="w-4 h-4 text-accent-gold shrink-0" />
            <span>Growth & performance tracking</span>
          </span>
        </motion.div>

      </div>
    </section>
  );
}
