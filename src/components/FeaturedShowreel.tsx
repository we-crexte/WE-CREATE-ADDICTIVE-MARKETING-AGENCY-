import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Play, Flame, ExternalLink, Sparkles, Volume2, VolumeX, Eye } from "lucide-react";

export default function FeaturedShowreel() {
  const [hovered, setHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div id="showreel" className="relative pb-24 bg-[#070708] z-10 overflow-hidden">
      {/* Background glow for showreel backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] gold-glow opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Subtle label wrapper bridging from VSL */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono font-bold tracking-[0.2em] text-amber-400 uppercase"
          >
            <Sparkles className="w-3 h-3 animate-spin text-amber-400" />
            <span>Featured Showreel</span>
          </motion.div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-neutral-400 mt-3">
            Pure Heat. Zero Placeholder.
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm">
            Experience the standard of creative production our partners receive every week.
          </p>
        </div>

        {/* Massive Cinema Frame with Premium Borders and Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handlePlayToggle}
          className="relative rounded-3xl overflow-hidden cursor-pointer shiny-border group"
        >
          {/* Outer highlight sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-amber-500/10 opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl" />
          
          <div className="relative aspect-[16/9] w-full bg-neutral-950 rounded-2xl overflow-hidden flex items-center justify-center">
            {/* The actual premium video asset */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            >
              <source 
                src="https://assets.mixkit.co/videos/preview/mixkit-recording-vertical-video-with-a-smartphone-40508-large.mp4" 
                type="video/mp4" 
              />
            </video>

            {/* Dark contrast gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40" />

            {/* Subdued static backdrop graphic (only when matching fail/not loaded) */}
            <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />

            {/* Overlay indicators & annotations */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10">
                  <Flame className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">ADDICTIVE REELS BLITZ</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 ml-2">FPS: 60.0 // STATUS: HIGH_BANDWIDTH</span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={handleMuteToggle}
                  className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white transition-all"
                  title="Toggle Mute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>
            </div>

            {/* Audio Waveform active indicator (bottom-left) */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
              <div className="flex gap-0.5 items-end h-4 w-6">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={isPlaying ? { height: ["4px", "16px", "4px"] } : { height: "4px" }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: "easeInOut"
                    }}
                    className="w-0.5 bg-gradient-to-t from-purple-500 to-rose-400 rounded-full"
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-neutral-300 font-bold uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded">
                60M+ REACH ACCRUED
              </span>
            </div>

            {/* Center giant click/play button trigger */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <motion.div
                animate={hovered ? { scale: 1.15 } : { scale: 1 }}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:bg-amber-400 group-hover:border-transparent transition-all duration-300 shadow-[0_0_80px_rgba(251,191,36,0.2)]"
              >
                {isPlaying ? (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-6 bg-white group-hover:bg-black rounded-full" />
                    <div className="w-1.5 h-6 bg-white group-hover:bg-black rounded-full" />
                  </div>
                ) : (
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-black fill-current translate-x-1 transition-colors" />
                )}
              </motion.div>
            </div>

            {/* Bottom metrics summary tag */}
            <div className="absolute bottom-6 right-6 z-10 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3">
              <div className="text-right">
                <span className="block text-[8px] font-mono text-neutral-400 uppercase tracking-widest">LIVE COUNTER</span>
                <span className="text-sm font-mono font-bold text-white font-mono">+1,320% Avg ROI</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Eye className="w-4 h-4 text-purple-400" />
              </div>
            </div>

          </div>
        </motion.div>

        {/* Showreel footnote */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 px-2 gap-4 text-neutral-500 text-xs">
          <span className="flex items-center gap-1.5 font-mono">
            <span>●</span> 
            <span>SOURCE AGENCY HARDWARE LINK: INT-2026-XQ</span>
          </span>
          <span className="font-sans font-light">
            All creatives displayed are fully tailored, engineered, and delivered to our partners.
          </span>
        </div>

      </div>
    </div>
  );
}
