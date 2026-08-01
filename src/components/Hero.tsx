import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Maximize, Flame, ChevronRight } from "lucide-react";

export default function Hero() {
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
    <section id="hero" className="relative min-h-screen md:min-h-[auto] flex flex-col items-center justify-start pt-28 sm:pt-36 md:pt-24 lg:pt-28 pb-16 sm:pb-24 md:pb-12 lg:pb-16 overflow-hidden bg-dark-bg bg-grid">
      {/* Background flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] purple-glow opacity-15 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] orange-glow opacity-10 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 relative z-10 flex flex-col items-center text-center w-full">
        {/* Majestic Centered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[3.8vw] xs:text-[3.6vw] sm:text-[3.3vw] md:text-[2.3rem] lg:text-[2.9rem] xl:text-[3.4rem] font-display md:font-sans font-black md:font-extrabold tracking-tight md:tracking-[-0.03em] leading-[1.2] md:leading-[1.15] text-white max-w-7xl mx-auto flex flex-col items-center space-y-1 sm:space-y-0"
        >
          <span className="block whitespace-nowrap">We Build you a Done-For-You YouTube</span>
          <span className="block whitespace-nowrap">Client Acquisition System That Brings You</span>
          <span className="block whitespace-nowrap bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold bg-clip-text text-transparent font-extrabold">
            5+ High-Ticket Clients in 90 Days
          </span>
        </motion.h1>

        {/* Video Player Section with premium styling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl md:max-w-[780px] lg:max-w-[830px] xl:max-w-[850px] mt-12 sm:mt-16 md:mt-8 lg:mt-9 rounded-2xl p-0.5 bg-gradient-to-r from-purple-500/60 to-purple-500/20 border border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.45),0_50px_100px_rgba(0,0,0,0.8)] relative group overflow-hidden"
        >
          <div
            onClick={togglePlay}
            className="relative rounded-2xl overflow-hidden aspect-video bg-black flex flex-col justify-between cursor-pointer"
          >
            {/* HTML5 Video */}
            <video
              ref={videoRef}
              src={`${import.meta.env.BASE_URL}VSL.mp4`}
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

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50 pointer-events-none" />

            {/* Top Bar controls */}
            <div className="relative p-3 sm:p-5 flex items-center justify-between w-full z-10" onClick={(e) => e.stopPropagation()}>
              <span className="flex items-center gap-1.5 text-[9px] sm:text-xs font-mono tracking-wider font-bold text-neutral-300 bg-neutral-950 px-3.5 py-1.5 sm:py-2 rounded-full border border-neutral-800 shadow-md">
                <span className="w-1.5 h-1.5 bg-accent-purple rounded-full animate-pulse" />
                <span>NOW STREAMING: VSL</span>
              </span>
              <div className="flex items-center gap-1.5 pointer-events-auto">
                <button
                  onClick={toggleMute}
                  className="p-2 sm:p-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-white transition-all active:scale-95 rounded-full"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 sm:p-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-white transition-all active:scale-95 rounded-full"
                  title="Fullscreen"
                >
                  <Maximize className="w-3.5 h-3.5 text-neutral-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Center Play Button Overlay when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold p-[2px] shadow-2xl"
                >
                  <div className="w-full h-full bg-black/90 rounded-full flex items-center justify-center text-white">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white translate-x-1 text-white" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* Bottom bar controls */}
            <div className="relative p-3 sm:p-5 w-full z-10 mt-auto flex flex-col gap-2.5 sm:gap-3" onClick={(e) => e.stopPropagation()}>
              <div className="w-full flex items-center gap-2 sm:gap-3">
                <span className="text-[9px] font-mono text-neutral-500">{currentTime}</span>
                <div
                  onClick={handleProgressBarClick}
                  className="h-1 bg-neutral-800/80 w-full cursor-pointer relative group/progress pointer-events-auto rounded-full overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-purple to-accent-orange"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[9px] font-mono text-neutral-500">{durationTime || "0:15"}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
                  <button
                    onClick={togglePlay}
                    className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[10px] sm:text-xs font-semibold text-white transition-colors active:scale-95 rounded-full"
                  >
                    {isPlaying ? <Pause className="w-3 h-3 fill-white text-white" /> : <Play className="w-3 h-3 fill-white text-white" />}
                    <span className="font-mono text-[10px] uppercase tracking-wider">{isPlaying ? "Pause" : "Play"}</span>
                  </button>
                  <span className="text-[10px] sm:text-xs text-neutral-400 font-sans truncate max-w-[200px] sm:max-w-xs md:max-w-none">
                    Addictive Content Blueprint Breakdown (HD)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic & Highly Visible BOOK A CALL button right below the VSL Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 sm:mt-16 md:mt-8 lg:mt-10 w-full max-w-sm px-4"
        >
          <a
            href="#contact"
            className="group relative overflow-hidden flex items-center justify-center gap-3 px-10 py-5 sm:py-6 bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold text-white font-sans font-black text-base sm:text-lg uppercase tracking-wider rounded-full transition-all hover:scale-105 active:scale-95 duration-300 shadow-[0_0_35px_rgba(249,115,22,0.45)] hover:shadow-[0_0_50px_rgba(168,85,247,0.65),0_0_30px_rgba(249,115,22,0.55)] border border-white/20"
          >
            {/* Glossy sheen overlay sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            
            <Flame className="w-6 h-6 text-white animate-bounce group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Book A Call</span>
            <ChevronRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
