import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RefreshCw, Volume2, VolumeX, Sparkles, Trophy, Maximize } from "lucide-react";

export default function Vsl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [durationTime, setDurationTime] = useState("0:00");
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDurationTime(formatTime(videoRef.current.duration));
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(percentage * 100);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      if (video.requestFullscreen) {
        video.requestFullscreen().catch(() => {});
      } else if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen();
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <section id="vsl" className="relative py-12 sm:py-24 bg-dark-bg/80 border-t border-b border-white/5">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 rounded-full purple-glow opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-96 h-96 rounded-full orange-glow opacity-20 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10 text-center">
        {/* Headers */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4 text-xs font-mono font-bold text-purple-400"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONTENT GROWTH BLUEPRINT</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-6xl font-display font-black tracking-tight text-white leading-tight"
          >
            See How We <br />
            <span className="bg-gradient-to-r from-purple-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Turn Content Into Attention, Leads & Sales
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="mt-3 sm:mt-6 text-neutral-300 text-sm sm:text-base md:text-lg font-light font-sans"
          >
            A behind-the-scenes look at our content strategy, editing process, and the systems we use to help brands grow online.
          </motion.p>
        </div>

        {/* Video container with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto rounded-3xl p-1.5 bg-gradient-to-b from-white/10 to-transparent border border-white/15 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative group overflow-hidden"
        >
          <div 
            onClick={togglePlay}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] xs:aspect-video bg-black/95 flex flex-col justify-between cursor-pointer"
          >
            {/* Real HTML5 Video Component loaded immediately to prevent custom image delays */}
            <video
              ref={videoRef}
              src="/VSL.mp4"
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="absolute inset-0 w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50 pointer-events-none" />

            {/* Top Bar of VSL Interface */}
            <div className="relative p-3 sm:p-5 flex items-center justify-between w-full z-10" onClick={(e) => e.stopPropagation()}>
              <span className="flex items-center gap-1.5 text-[9px] sm:text-xs font-mono tracking-wider font-bold text-amber-400 bg-black/65 px-2.5 py-1 sm:py-1.5 rounded-full border border-white/5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="hidden xs:inline">NOW STREAMING:</span> VSL
              </span>
              <div className="flex items-center gap-1.5 pointer-events-auto">
                <button 
                  onClick={toggleMute}
                  className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-all active:scale-95"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
                <button 
                  onClick={toggleFullscreen}
                  className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-all active:scale-95"
                  title="Fullscreen"
                >
                  <Maximize className="w-3.5 h-3.5 text-neutral-300 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="relative p-3 sm:p-5 w-full z-10 mt-auto flex flex-col gap-2.5 sm:gap-3" onClick={(e) => e.stopPropagation()}>
              {/* Progress Slider */}
              <div className="w-full flex items-center gap-2 sm:gap-3">
                <span className="text-[9px] font-mono text-neutral-400">{currentTime}</span>
                <div 
                  onClick={handleProgressBarClick}
                  className="h-1 bg-white/15 rounded-full w-full cursor-pointer relative group/progress pointer-events-auto"
                >
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-rose-400 to-amber-300 rounded-full" 
                    style={{ width: `${progress}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white border border-rose-500 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                    style={{ left: `calc(${progress}% - 5px)` }}
                  />
                </div>
                <span className="text-[9px] font-mono text-neutral-400">{durationTime || "0:15"}</span>
              </div>

              {/* Actions & Author Row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto overflow-hidden">
                  <button 
                    onClick={togglePlay}
                    className="flex-shrink-0 flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] sm:text-xs font-semibold text-white transition-colors active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white" />}
                    <span>{isPlaying ? "Pause" : "Play"}</span>
                  </button>
                  
                  <span className="text-[10px] sm:text-xs text-neutral-400 font-sans truncate max-w-[140px] sm:max-w-xs md:max-w-none">
                    Addictive Content Blueprint Breakdown (HD)
                  </span>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 bg-black/30 px-2 py-0.5 rounded border border-white/5">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  <span className="text-[9px] sm:text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">Masterclass</span>
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
            Ready to grow your brand with a proven content system?
          </p>
          <a
            href="#contact"
            className="mt-3 text-sm font-semibold text-rose-400 hover:text-white transition-colors flex items-center gap-1 group"
          >
            <span>Book A Free Strategy Call</span>
            <span className="translate-x-0 group-hover:translate-x-1.5 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
