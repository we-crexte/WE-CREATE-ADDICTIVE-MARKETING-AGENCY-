import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  Layers, 
  Zap, 
  Award,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { CASE_STUDIES } from "../types";

import tiktokFlowDiagram from "../assets/images/tiktok_flow_diagram_1780314827690.png";
import podcastFlowDiagram from "../assets/images/podcast_growth_flow_1780315200_1780315180803.png";

const TABS_DATA = [
  {
  id: 0,
  tag: "CASE STUDY 01: TIKTOK GROWTH",
  title: "Real Results.",
  titleHighlight: "Real Growth.",
  subtitle: "TIKTOK ORGANIC RETENTION",
  campaign: "TikTok Content Optimization",
  headingFrom: "1,600 Views",
  headingTo: "300K+ Views",
  baselineLabel: "Baseline Average",
  baselineValue: "~ 1,600 Views",
  scaleLabel: "Scale Post-Edit",
  scaleValue: "300K+ / 185K+",
  peakVelocity: "+18,650% Peak",
  reachOverlay: "300K+ VIEWS",
  axisLabel1: "Baseline (1,600)",
  axisLabel2: "Optimizing VSL",
  axisLabel3: "Retention Loop (300K)",
  svgPath: "M 10 100 Q 80 95, 150 70 T 260 30 T 340 10",
  fillPath: "M 10 100 Q 80 95, 150 70 T 260 30 T 340 10 L 340 110 L 10 110 Z",
  gradientFrom: "#3b82f6",
  gradientTo: "#10b981",
  imageSrc: tiktokFlowDiagram,
  imageAlt: "TikTok Views Growth Flow Schematic",
  visualTitle: "CONTENT PERFORMANCE BREAKDOWN",
  visualDesc: "A breakdown of how stronger hooks, better pacing, and improved retention helped this content reach a wider audience.",
  description: "By improving video structure, pacing, and retention, we helped this account grow from an average of 1,600 views to multiple videos crossing 300,000+ views."
},
 {
  id: 1,
  tag: "CASE STUDY 02: PODCAST GROWTH",
  title: "Improved Reach.",
  titleHighlight: "Stronger Engagement.",
  subtitle: "PERSONAL BRAND & PODCAST STRATEGY",
  campaign: "Podcast Content Strategy",
  headingFrom: "17.7K Views",
  headingTo: "107K+ Views",
  baselineLabel: "Original Baseline",
  baselineValue: "~ 17.7K Views",
  scaleLabel: "Optimized High-End",
  scaleValue: "107K+ Verified Views",
  peakVelocity: "+504% Growth Peak",
  reachOverlay: "107K+ VIEWS",
  axisLabel1: "Baseline (17.7K)",
  axisLabel2: "Attention Hook",
  axisLabel3: "Pattern Interrupt (107K)",
  svgPath: "M 10 100 Q 90 85, 170 55 T 260 35 T 340 15",
  fillPath: "M 10 100 Q 90 85, 170 55 T 260 35 T 340 15 L 340 110 L 10 110 Z",
  gradientFrom: "#6366f1",
  gradientTo: "#ec4899",
  imageSrc: podcastFlowDiagram,
  imageAlt: "Podcast Views Growth Flow Schematic",
  visualTitle: "AUDIENCE ENGAGEMENT BREAKDOWN",
  visualDesc: "A closer look at the content structure and engagement improvements that helped increase reach and watch time.",
  description: "After restructuring the content and improving engagement points, this video reached over 107,000 views and generated significantly higher audience interaction."
}
];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState(0);
  const activeObj = TABS_DATA[activeTab];

  return (
    <section id="case-studies" className="relative py-20 sm:py-32 bg-dark-bg overflow-hidden border-t border-b border-white/5">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] orange-glow opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] purple-glow opacity-10 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-20 animate-[fadeIn_0.8s_ease-out] px-4">
          <div className="inline-block px-12 py-6 sm:py-8 rounded-3xl bg-[#09090b]/80 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden">
            {/* Ambient subtle glow inside */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-accent-orange/10 to-accent-gold/10 opacity-30 blur-xl pointer-events-none" />
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white leading-none relative z-10 select-none">
              Case Studies
            </h2>
          </div>
        </div>

        {/* Tab switcher buttons under section header */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <div className="inline-flex bg-neutral-950 p-1.5 rounded-full border border-neutral-900 relative max-w-full overflow-x-auto whitespace-nowrap scrollbar-none shadow-inner">
            {TABS_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded-full transition-all duration-300 z-10 ${
                  activeTab === tab.id 
                    ? "text-white font-bold" 
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.subtitle}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Case Study Layout with Exit-Entry Animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 items-start"
          >
            
            {/* LEFT SIDE: Narrative breakdown & Custom Graph */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">
                  <span>{activeObj.subtitle}</span>
                  <span className="text-neutral-800">•</span>
                  <span className="text-neutral-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-neutral-500" /> {activeObj.campaign}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-4xl font-display font-black text-white tracking-tight leading-tight">
                  From <span className="text-neutral-600 line-through">{activeObj.headingFrom}</span> to <span className="text-white">{activeObj.headingTo}</span>
                </h3>

                <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                  {activeObj.description}
                </p>
              </div>

              {/* Metrics Snapshot block */}
              <div className="grid grid-cols-2 gap-4 p-4 sm:p-5 rounded-xl bg-neutral-900/40 border border-white/5 backdrop-blur-sm">
                <div>
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-1 font-extrabold">{activeObj.baselineLabel}</span>
                  <p className="text-base sm:text-lg font-bold text-neutral-500 line-through">{activeObj.baselineValue}</p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-mono text-white uppercase tracking-widest block mb-1 font-extrabold">{activeObj.scaleLabel}</span>
                  <p className="text-base sm:text-lg font-bold text-white flex items-center gap-1 font-mono">
                    <CheckCircle className="w-4 h-4 text-accent-orange" /> {activeObj.scaleValue}
                  </p>
                </div>
              </div>

              {/* Highly customized interactive SVG retention graph */}
              <div className="p-6 rounded-xl bg-dark-card border border-white/5 relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">CONTENT PERFORMANCE TREND</span>
                    <p className="text-xs font-bold text-white font-mono uppercase tracking-wider">View Growth Over Time</p>
                  </div>
                  <div className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-[9px] font-mono text-accent-gold leading-tight">
                    {activeObj.peakVelocity}
                  </div>
                </div>

                {/* Precise SVG custom graph with grid lines */}
                <div className="relative w-full h-44 flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 350 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`curveGrad-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id={`strokeGrad-${activeTab}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#404040" />
                        <stop offset="100%" stopColor="#ffffff" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal visual Grid lines */}
                    <line x1="0" y1="20" x2="350" y2="20" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    <line x1="0" y1="60" x2="350" y2="60" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    <line x1="0" y1="100" x2="350" y2="100" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                    {/* Shaded Area */}
                    <path
                      d={activeObj.fillPath}
                      fill={`url(#curveGrad-${activeTab})`}
                    />

                    {/* Glowing Stroke Curve */}
                    <path
                      d={activeObj.svgPath}
                      fill="none"
                      stroke={`url(#strokeGrad-${activeTab})`}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Peak and anchor marks */}
                    <circle cx="340" cy="10" r="3.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                    <circle cx="10" cy="100" r="3" fill="#404040" stroke="#000000" strokeWidth="1.5" />
                  </svg>

                  {/* Left/Right graph axes overlays */}
                  <div className="absolute top-2 right-4 bg-[#0a0a0a] px-2 py-0.5 border border-neutral-800 font-mono text-[8px] text-neutral-400">
                    {activeObj.reachOverlay}
                  </div>
                </div>

                {/* Chart labels horizontal axis */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-neutral-900 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                  <span>{activeObj.axisLabel1}</span>
                  <span>Optimizing VSL</span>
                  <span>{activeObj.axisLabel3}</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Perfect Case Study Visual Card placing the provided photo exactly */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-8 relative">
              
              <div className="text-left">
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-500 block mb-2">{activeObj.visualTitle}</span>
                <p className="text-sm text-neutral-400 font-sans leading-relaxed max-w-xl">
                  {activeObj.visualDesc}
                </p>
              </div>

              {/* Photo frame container with high-end glows */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative p-2.5 rounded-2xl bg-neutral-950/80 border border-white/5 overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
              >
                <img 
                  src={activeObj.imageSrc} 
                  alt={activeObj.imageAlt} 
                  className="w-full h-auto rounded-xl object-cover border border-neutral-900 group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Secure visual cue overlay */}
                <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 font-mono text-[9px] text-neutral-300 flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-accent-purple" />
                  <span>CASE STUDY RESULTS</span>
                </div>
              </motion.div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* Elaborated Content Strategy - Why Choose Us / Performance Boosters */}
        <div id="compounding-retention" className="mt-32 pt-24 border-t border-white/5">
          <div className="max-w-3xl mb-16 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest rounded-full mb-4">
              <Layers className="w-3.5 h-3.5 text-accent-orange" />
              <span>WHY THESE VIDEOS PERFORMED BETTER</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
              What Helped These Videos Perform Better
            </h3>
            <p className="mt-4 text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Better performing content usually comes down to a few simple things: a strong opening, keeping viewers interested, and giving people a reason to share. Here's how we approach it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {/* Booster Card 1 */}
            <div className="p-8 sm:p-10 rounded-2xl bg-dark-card border border-white/5 hover:border-neutral-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden flex flex-col justify-between text-left">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-purple to-accent-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-accent-purple" />
                </div>
                <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-wider font-mono mb-4">1. Strong Opening Hook</h4>
                <p className="text-sm text-neutral-400 leading-relaxed font-sans font-light">
                  Most viewers decide within the first few seconds whether they will keep watching or scroll away. We focus on creating stronger openings that immediately grab attention and make people curious about what's coming next.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 text-[9px] font-mono tracking-wider text-neutral-500">
                ENGAGEMENT ACCELERATOR // ACTIVE
              </div>
            </div>

            {/* Booster Card 2 */}
            <div className="p-8 sm:p-10 rounded-2xl bg-dark-card border border-white/5 hover:border-neutral-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden flex flex-col justify-between text-left">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 text-accent-orange" />
                </div>
                <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-wider font-mono mb-4">2. Keeping Viewers Curious</h4>
                <p className="text-sm text-neutral-400 leading-relaxed font-sans font-light">
                  Instead of giving away everything at the beginning, we structure content so viewers naturally want to stay until the end. This helps improve watch time and overall engagement.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 text-[9px] font-mono tracking-wider text-neutral-500">
                RETENTION ENGINE // ENGAGED
              </div>
            </div>

            {/* Booster Card 3 */}
            <div className="p-8 sm:p-10 rounded-2xl bg-dark-card border border-white/5 hover:border-neutral-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden flex flex-col justify-between text-left">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-gold to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5 text-accent-gold" />
                </div>
                <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-wider font-mono mb-4">3. Content Worth Sharing</h4>
                <p className="text-sm text-neutral-400 leading-relaxed font-sans font-light">
                  The best-performing content is often shared with friends, colleagues, or communities. We focus on creating content that delivers enough value for people to save, share, and talk about.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 text-[9px] font-mono tracking-wider text-neutral-500">
                VIRAL COEFFICIENT // COMPOUNDED
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

