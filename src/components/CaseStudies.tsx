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
    <section id="case-studies" className="relative py-16 sm:py-28 bg-dark-bg overflow-hidden border-t border-b border-white/5">
      {/* Background decoration elements */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid backing layout overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16 animate-[fadeIn_0.5s_ease-out]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>REAL CLIENT RESULTS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-black tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            Results We've Generated. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              For Real Clients.
            </span>
          </h2>
          <p className="mt-3 sm:mt-6 text-neutral-300 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto">
            Here are a few examples of content we've edited and optimized. These results come directly from client campaigns and creator accounts.
          </p>
        </div>

        {/* Tab switcher buttons under section header */}
        <div className="flex justify-center mb-10 sm:mb-16">
          <div className="inline-flex bg-zinc-950 p-1 rounded-xl border border-white/5 relative max-w-full overflow-x-auto whitespace-nowrap scrollbar-none">
            {TABS_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider rounded-lg transition-all duration-300 z-10 ${
                  activeTab === tab.id 
                    ? "text-white font-bold" 
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-white/[0.04] border border-white/10 rounded-lg -z-10"
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
                <div className="flex items-center gap-3 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                  <span>{activeObj.subtitle}</span>
                  <span className="text-neutral-700">•</span>
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-indigo-400" /> {activeObj.campaign}
                  </span>
                </div>                 <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-tight">
                  From <span className="text-neutral-500 line-through">{activeObj.headingFrom}</span> to <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{activeObj.headingTo}</span>
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                  {activeObj.description}
                </p>
              </div>

              {/* Metrics Snapshot block */}
              <div className="grid grid-cols-2 gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                <div>
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-1 font-extrabold">{activeObj.baselineLabel}</span>
                  <p className="text-base sm:text-xl font-bold text-neutral-500 line-through">{activeObj.baselineValue}</p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1 font-extrabold">{activeObj.scaleLabel}</span>
                  <p className="text-base sm:text-xl font-bold text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle className="w-4 h-4" /> {activeObj.scaleValue}
                  </p>
                </div>
              </div>

              {/* Highly customized interactive SVG retention graph */}
              <div className="p-6 rounded-2xl bg-dark-card/90 border border-white/5 relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">CONTENT PERFORMANCE TREND</span>
                    <p className="text-xs font-bold text-white font-mono animate-pulse">View Growth Over Time</p>
                  </div>
                  <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-400 leading-tight rounded">
                    {activeObj.peakVelocity}
                  </div>
                </div>

                {/* Precise SVG custom graph with grid lines */}
                <div className="relative w-full h-44 flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 350 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`curveGrad-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={activeObj.gradientFrom} stopOpacity="0.30" />
                        <stop offset="100%" stopColor={activeObj.gradientFrom} stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id={`strokeGrad-${activeTab}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#bfdbfe" />
                        <stop offset="50%" stopColor={activeObj.gradientFrom} />
                        <stop offset="100%" stopColor={activeObj.gradientTo} />
                      </linearGradient>
                    </defs>

                    {/* Horizontal visual Grid lines */}
                    <line x1="0" y1="20" x2="350" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="60" x2="350" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="100" x2="350" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

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
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Peak and anchor marks */}
                    <circle cx="340" cy="10" r="4.5" fill={activeObj.gradientTo} stroke="#070708" strokeWidth="1.5" />
                    <circle cx="10" cy="100" r="3.5" fill="#ef4444" stroke="#070708" strokeWidth="1.5" />
                  </svg>

                  {/* Left/Right graph axes overlays */}
                  <div className="absolute top-2 right-4 bg-black/50 px-2 py-0.5 rounded border border-white/5 font-mono text-[8px] text-emerald-400">
                    {activeObj.reachOverlay}
                  </div>
                </div>

                {/* Chart labels horizontal axis */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
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
                className="relative p-2.5 rounded-3xl bg-dark-card border border-white/10 overflow-hidden shadow-[0_25px_60px_-15px_rgba(59,130,246,0.15)] group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 opacity-100 pointer-events-none" />
                
                <img 
                  src={activeObj.imageSrc} 
                  alt={activeObj.imageAlt} 
                  className="w-full h-auto rounded-2.5xl object-cover border border-white/5 group-hover:scale-[1.01] transition-transform duration-500 shadow-inner"
                  referrerPolicy="no-referrer"
                />

                {/* Secure visual cue overlay */}
                <div className="absolute bottom-6 left-6 px-3 py-1 rounded bg-black/80 border border-white/10 font-mono text-[9px] text-neutral-400 flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  <span>CASE STUDY RESULTS</span>
                </div>
              </motion.div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* Elaborated Content Strategy - Added specifically to satisfy the explicit "elaborate the following according to you" instruction */}
        <div id="compounding-retention" className="mt-24 pt-16 border-t border-white/5">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-500/10 border border-indigo-200/5 text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest rounded mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>WHY THESE VIDEOS PERFORMED BETTER</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">
              What Helped These Videos Perform Better
            </h3>
            <p className="mt-2 text-neutral-400 text-sm font-light">
              Better performing content usually comes down to a few simple things: a strong opening, keeping viewers interested, and giving people a reason to share. Here's how we approach it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-base font-bold text-white"> 1. Strong Opening Hook</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
              Most viewers decide within the first few seconds whether they will keep watching or scroll away. We focus on creating stronger openings that immediately grab attention and make people curious about what's coming next.              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Zap className="w-5 h-5 text-indigo-400" />
              </div>
              <h4 className="text-base font-bold text-white">2. Keeping Viewers Curious</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                Instead of giving away everything at the beginning, we structure content so viewers naturally want to stay until the end. This helps improve watch time and overall engagement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="text-base font-bold text-white">3. Content Worth Sharing</h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                The best-performing content is often shared with friends, colleagues, or communities. We focus on creating content that delivers enough value for people to save, share, and talk about.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

