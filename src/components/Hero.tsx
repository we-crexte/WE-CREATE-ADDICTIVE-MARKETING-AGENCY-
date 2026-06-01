import { motion } from "motion/react";
import { Play, TrendingUp, Sparkles, Award, ShieldCheck, ArrowDownCircle, Flame, Star } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full purple-glow -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full orange-glow translate-x-1/2 translate-y-1/2 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-15 pointer-events-none z-0">
        <img
          src="/src/assets/images/premium_abstract_data_1780311877428.png"
          alt="Atmosphere background"
          className="w-full h-full object-cover rounded-[40px] blur-xl"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Left Side: Editorial Messaging */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Trust Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit mb-6 shadow-indigo-500/10 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              The Attention Oligarchy Engine
            </span>
          </motion.div>

          {/* Majestic Hero Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.05] text-white"
          >
            Your Brand Deserves <br />
            <span className="relative inline-block mt-1">
              <span className="absolute inset-x-0 bottom-2 h-4 bg-gradient-to-r from-purple-600/30 via-rose-500/30 to-amber-500/30 filter blur-sm" />
              <span className="relative bg-gradient-to-r from-purple-400 via-rose-400 to-amber-300 bg-clip-text text-transparent font-black">
                More Than Just Content.
              </span>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-neutral-400 font-sans max-w-xl leading-relaxed font-light"
          >
            We build content systems that generate attention, authority, and revenue. Convert cold scrollers into high-paying advocates.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            {/* Showreel Primary */}
            <a
              href="#showreel"
              className="relative group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 rounded-xl text-white font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,63,94,0.35)] shadow-md"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-700 via-rose-600 to-amber-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <Play className="w-4 h-4 fill-white" />
                View Showreel
              </span>
            </a>

            {/* VSL Secondary */}
            <a
              href="#vsl"
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white font-medium transition-colors duration-300"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Watch process (VSL)</span>
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex -space-x-3">
              <img src="https://picsum.photos/seed/face1/64/64" alt="Client" className="w-9 h-9 rounded-full border-2 border-[#070708]" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/face2/64/64" alt="Client" className="w-9 h-9 rounded-full border-2 border-[#070708]" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/face3/64/64" alt="Client" className="w-9 h-9 rounded-full border-2 border-[#070708]" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/face4/64/64" alt="Client" className="w-9 h-9 rounded-full border-2 border-[#070708]" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
                <span className="ml-2 text-xs font-bold text-white font-mono">100% SUCCESS RATIO</span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">Driving multimillion attention flows for 40+ brands.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Floating Social Media Elements & Metrics Graphic */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px]">
          {/* Main Visual: Glassmorphic Centerpiece */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-80 h-[400px] rounded-3xl glass-effect shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden group"
          >
            <img 
              src="/src/assets/images/luxury_agency_workspace_1780311831201.png" 
              alt="Workspace visual mockup" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              referrerPolicy="no-referrer"
            />
            {/* Live Visual overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            
            {/* Center static text */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] tracking-[0.2em] uppercase text-rose-400 font-mono font-bold">CREATIVE PIPELINE LOCK</span>
              <h3 className="font-display font-medium text-lg text-white mt-1">Addictive Attention Matrix v4.2</h3>
            </div>
          </motion.div>

          {/* Floating Element 1: IG Notification Pop (Top Left) */}
          <motion.div
            initial={{ x: -120, y: -40, opacity: 0 }}
            animate={{ x: -30, y: -60, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.6 }}
            className="absolute rounded-2xl glass-effect p-4 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] max-w-[200px]"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono font-bold">VIRAL BLITZ</span>
                <p className="text-xs font-semibold text-white mt-0.5">Gain 54k followers</p>
                <p className="text-[9px] font-mono text-emerald-400 mt-0.5">+432% past 7d</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Element 2: Revenue Impact Tracker (Bottom Right) */}
          <motion.div
            initial={{ x: 120, y: 150, opacity: 0 }}
            animate={{ x: 20, y: 120, opacity: 1 }}
            transition={{ type: "spring", stiffness: 40, delay: 0.8 }}
            className="absolute rounded-2xl bg-black/90 p-4 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] min-w-[220px]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-amber-400 font-mono font-bold tracking-wider uppercase">REVENUE IMPACT</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-2xl font-mono font-bold text-white tracking-tight">$185.3K</p>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "88%" }}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full"
              />
            </div>
            <p className="text-[9px] text-neutral-400 mt-1">D2C Launch Cap Achieved (100%)</p>
          </motion.div>

          {/* Floating Element 3: Retention Indicator (Top Right) */}
          <motion.div
            initial={{ x: 140, y: -40, opacity: 0 }}
            animate={{ x: 80, y: -20, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, delay: 1 }}
            className="absolute rounded-full glass-effect px-4 py-2 border border-white/10 shadow-lg flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-mono tracking-wider font-bold text-neutral-200">98% Retention Approved</span>
          </motion.div>
        </div>

      </div>

      {/* Down arrow scroll helper */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase tracking-widest font-mono text-neutral-400">Discover Our Process</span>
        <a href="#vsl" className="animate-bounce">
          <ArrowDownCircle className="w-5 h-5 text-neutral-400 hover:text-white transition-colors" />
        </a>
      </div>
    </section>
  );
}
