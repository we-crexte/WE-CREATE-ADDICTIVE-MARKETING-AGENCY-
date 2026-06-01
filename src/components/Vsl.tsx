import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RefreshCw, Volume2, VolumeX, Sparkles, Trophy } from "lucide-react";

export default function Vsl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(35);
  const [showNotification, setShowNotification] = useState(false);

  // Play handler toggling
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate real playback progression
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 50);
    }
  };

  return (
    <section id="vsl" className="relative py-24 bg-[#0a0a0c]/80 border-t border-b border-white/5">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 rounded-full purple-glow opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-96 h-96 rounded-full orange-glow opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Headers */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4 text-xs font-mono font-bold text-purple-400"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE SYSTEMS REVEAL</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white"
          >
            Watch How We <br />
            <span className="bg-gradient-to-r from-purple-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Scale Brands To $10M+
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-neutral-400 text-sm md:text-base font-light font-sans"
          >
            A quick breakdown of our process, results, and how we help businesses dominate social media, command cultural authority, and capture market share.
          </motion.p>
        </div>

        {/* Video container with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto rounded-3xl p-1.5 bg-gradient-to-b from-white/10 to-transparent border border-white/15 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative group overflow-hidden"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/90 flex flex-col justify-between">
            
            {/* Real Loop Video Component as a background when playing */}
            {isPlaying ? (
              <video
                key="vsl-video"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-75"
                referrerPolicy="no-referrer"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-hand-holding-smartphone-recording-vertical-video-of-a-man-40073-large.mp4" type="video/mp4" />
              </video>
            ) : (
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 filter grayscale brightness-75 group-hover:scale-[1.02] transition-transform duration-700" 
                style={{ backgroundImage: `url('https://picsum.photos/seed/vslbg/1280/720')` }}
              />
            )}

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

            {/* Top Bar of VSL Interface */}
            <div className="relative p-5 flex items-center justify-between w-full z-10">
              <span className="flex items-center gap-2 text-xs font-mono tracking-wider font-bold text-amber-400 bg-black/55 px-3 py-1.5 rounded-full border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                NOW STREAMING: CASE DECONCONSTRUCTION v2.3
              </span>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-black/50 hover:bg-black/75 border border-white/10 text-white transition-all pointer-events-auto"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>

            {/* Visual subtitles simulation overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-5/6 z-10">
              {!isPlaying ? (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  onClick={togglePlay}
                  className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.6)] cursor-pointer hover:scale-110 active:scale-95 transition-all pointer-events-auto"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white translate-x-1" />
                </motion.div>
              ) : (
                <div className="bg-black/80 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-xl max-w-lg mx-auto">
                  <p className="text-xs font-mono text-amber-400 tracking-wider">ONSCREEN DEMO</p>
                  <p className="text-sm md:text-base font-semibold text-white mt-1 leading-relaxed">
                    "...we don't just dump basic content. Our script blueprints hook attention metrics of 82% retention over the first 3 seconds..."
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="relative p-5 w-full z-10 mt-auto flex flex-col gap-3">
              {/* Progress Slider */}
              <div className="w-full flex items-center gap-3">
                <span className="text-[10px] font-mono text-neutral-400">1:42</span>
                <div 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                    setProgress(percentage);
                  }}
                  className="h-1 bg-white/10 rounded-full w-full cursor-pointer relative group/progress pointer-events-auto"
                >
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-rose-400 rounded-full" 
                    style={{ width: `${progress}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-rose-500 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                    style={{ left: `calc(${progress}% - 5px)` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-neutral-400">8:30</span>
              </div>

              {/* Actions & Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 pointer-events-auto">
                  <button 
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    <span>{isPlaying ? "Pause Video" : "Resume Playback"}</span>
                  </button>
                  
                  <span className="text-xs text-neutral-400 font-sans hidden md:inline-block">
                    Addictive Content Blueprint Breakdown (HD)
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-mono text-amber-300 font-bold uppercase tracking-wider">Free Masterclass</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Dynamic conversion nudge below VSL */}
        <div className="mt-8 flex flex-col items-center">
          <p className="text-neutral-400 text-xs flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Ready to deploy this engine for your company?
          </p>
          <a
            href="#contact"
            className="mt-3 text-sm font-semibold text-rose-400 hover:text-white transition-colors flex items-center gap-1 group"
          >
            <span>Lock In A Custom Strategy Session</span>
            <span className="translate-x-0 group-hover:translate-x-1.5 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
