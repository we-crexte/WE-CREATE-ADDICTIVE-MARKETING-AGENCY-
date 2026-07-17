import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

import tiktokFlowDiagram from "../assets/images/tiktok_flow_diagram_1780314827690.png";
import podcastFlowDiagram from "../assets/images/podcast_growth_flow_1780315200_1780315180803.png";

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
        <div className="space-y-24 sm:space-y-36">
          
          {/* Case Study 1: [photo 1]   info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left: [photo 1] */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-2 rounded-2xl bg-neutral-950/80 border border-white/5 overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
              >
                <img 
                  src={tiktokFlowDiagram} 
                  alt="TikTok Views Growth Flow" 
                  className="w-full h-auto rounded-xl object-cover border border-neutral-900 group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 font-mono text-[9px] text-neutral-300 flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-accent-purple animate-pulse" />
                  <span>TIKTOK ORGANIC RETENTION</span>
                </div>
              </motion.div>
            </div>

            {/* Right: info */}
            <div className="lg:col-span-5 text-left space-y-4 lg:pl-4">
              <span className="text-xs font-mono tracking-[0.2em] text-accent-orange uppercase font-bold block">
                CASE STUDY 01 // RESULTS
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight uppercase">
                CONTENT PERFORMANCE BREAKDOWN
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                A breakdown of how stronger hooks, better pacing, and improved retention helped this content reach a wider audience.
              </p>
            </div>
          </div>

          {/* Case Study 2: info   [photo 2] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left: info (order-2 on mobile, order-1 on desktop) */}
            <div className="lg:col-span-5 text-left space-y-4 lg:pr-4 order-2 lg:order-1">
              <span className="text-xs font-mono tracking-[0.2em] text-accent-purple uppercase font-bold block">
                CASE STUDY 02 // RESULTS
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight uppercase">
                AUDIENCE ENGAGEMENT BREAKDOWN
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                A closer look at the content structure and engagement improvements that helped increase reach and watch time.
              </p>
            </div>

            {/* Right: [photo 2] (order-1 on mobile, order-2 on desktop) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-2 rounded-2xl bg-neutral-950/80 border border-white/5 overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
              >
                <img 
                  src={podcastFlowDiagram} 
                  alt="Podcast Views Growth Flow" 
                  className="w-full h-auto rounded-xl object-cover border border-neutral-900 group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 font-mono text-[9px] text-neutral-300 flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-accent-purple animate-pulse" />
                  <span>PERSONAL BRAND & PODCAST STRATEGY</span>
                </div>
              </motion.div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

