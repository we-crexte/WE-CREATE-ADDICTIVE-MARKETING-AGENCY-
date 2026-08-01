import React from "react";
import { motion } from "motion/react";
import { Sparkles, CheckCircle2 } from "lucide-react";

import tiktokFlowDiagram from "../assets/images/tiktok_flow_diagram_1780314827690.png";
import podcastFlowDiagram from "../assets/images/podcast_growth_flow_1780315200_1780315180803.png";
import ofekImg from "../assets/images/OFEK.jpg";
import paulImg from "../assets/images/PAUL.jpg";

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-20 sm:py-32 bg-dark-bg overflow-hidden border-t border-b border-white/5">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] orange-glow opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] purple-glow opacity-10 pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24 animate-[fadeIn_0.8s_ease-out] px-4">
          <div className="inline-block px-12 py-6 sm:py-8 rounded-3xl bg-[#09090b]/80 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden">
            {/* Ambient subtle glow inside */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-accent-orange/10 to-accent-gold/10 opacity-30 blur-xl pointer-events-none" />
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white leading-none relative z-10 select-none">
              Case Studies
            </h2>
          </div>
        </div>

        {/* Both Case Studies displayed in sequence */}
        <div className="space-y-20 sm:space-y-32">
          
          {/* Case Study 1: (Ofek Circle Profile) -> [Content Photo] -> Info */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
            
            {/* Left & Middle Container: Circle Profile + Content Photo */}
            <div className="w-full lg:w-7/12 flex flex-col sm:flex-row items-center gap-6">
              {/* Ofek Circular Profile Photo */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: -15 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 flex flex-col items-center text-center p-4 rounded-2xl bg-neutral-950/80 border border-purple-500/20 shadow-[0_15px_40px_rgba(168,85,247,0.12)] group"
              >
                <div className="relative">
                  <img 
                    src={ofekImg} 
                    alt="Ofek Alon" 
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-accent-purple/60 group-hover:scale-105 transition-transform duration-300 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 p-1 rounded-full bg-black border border-white/20 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 fill-emerald-400/20" />
                  </span>
                </div>
                <div className="mt-3">
                  <h4 className="text-sm sm:text-base font-display font-black text-white tracking-wide uppercase">
                    Ofek Alon
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-400">
                    @ofek.alon_
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-[9px] font-mono text-accent-purple uppercase tracking-wider">
                    CLIENT
                  </span>
                </div>
              </motion.div>

              {/* TikTok Content Photo Diagram */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 w-full relative p-2 rounded-2xl bg-neutral-950/80 border border-white/5 overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
              >
                <img 
                  src={tiktokFlowDiagram} 
                  alt="TikTok Views Growth Flow" 
                  className="w-full h-auto rounded-xl object-cover border border-neutral-900 group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 font-mono text-[9px] text-neutral-300 flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-accent-purple animate-pulse" />
                  <span>TIKTOK ORGANIC RETENTION</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Info */}
            <div className="w-full lg:w-5/12 text-left space-y-4 lg:pl-4">
              <span className="text-xs font-mono tracking-[0.2em] text-accent-orange uppercase font-bold block">
                CASE STUDY 01 // RESULTS
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight uppercase">
                CONTENT PERFORMANCE BREAKDOWN
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                A breakdown of how stronger hooks, better pacing, and improved retention helped this content reach a wider audience.
              </p>
            </div>
          </div>

          {/* Case Study 2: Info -> [Content Photo] -> (Paul Circle Profile) */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
            {/* Left: Info */}
            <div className="w-full lg:w-5/12 text-left space-y-4 lg:pr-4 order-2 lg:order-1">
              <span className="text-xs font-mono tracking-[0.2em] text-accent-purple uppercase font-bold block">
                CASE STUDY 02 // RESULTS
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight uppercase">
                AUDIENCE ENGAGEMENT BREAKDOWN
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                A closer look at the content structure and engagement improvements that helped increase reach and watch time.
              </p>
            </div>

            {/* Middle & Right Container: Content Photo + Paul Circle Profile */}
            <div className="w-full lg:w-7/12 flex flex-col-reverse sm:flex-row items-center gap-6 order-1 lg:order-2">
              {/* Podcast Content Photo Diagram */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 w-full relative p-2 rounded-2xl bg-neutral-950/80 border border-white/5 overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
              >
                <img 
                  src={podcastFlowDiagram} 
                  alt="Podcast Views Growth Flow" 
                  className="w-full h-auto rounded-xl object-cover border border-neutral-900 group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 font-mono text-[9px] text-neutral-300 flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-accent-purple animate-pulse" />
                  <span>PERSONAL BRAND & PODCAST STRATEGY</span>
                </div>
              </motion.div>

              {/* Paul Circular Profile Photo */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, x: 15 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 flex flex-col items-center text-center p-4 rounded-2xl bg-neutral-950/80 border border-purple-500/20 shadow-[0_15px_40px_rgba(168,85,247,0.12)] group"
              >
                <div className="relative">
                  <img 
                    src={paulImg} 
                    alt="Paul Getter" 
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover ring-4 ring-accent-purple/60 group-hover:scale-105 transition-transform duration-300 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 p-1 rounded-full bg-black border border-white/20 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 fill-emerald-400/20" />
                  </span>
                </div>
                <div className="mt-3">
                  <h4 className="text-sm sm:text-base font-display font-black text-white tracking-wide uppercase">
                    Paul Getter
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-400">
                    @paul
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-accent-purple/10 border border-accent-purple/30 text-[9px] font-mono text-accent-purple uppercase tracking-wider">
                    CLIENT
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

