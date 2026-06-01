import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Image as ImageIcon, Flame, ChevronRight, Eye, VolumeX, Volume2, Sparkles, Film, Video } from "lucide-react";
import { WORK_ITEMS, WorkItem } from "../types";

export default function PastWork() {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  useEffect(() => {
    if (selectedWork) {
      setIsLoadingVideo(true);
      const timer = setTimeout(() => {
        setIsLoadingVideo(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [selectedWork]);

  // Divide work items into short form and long form
  const shortFormItems = WORK_ITEMS.filter(
    item => item.category === "shorts" || item.category === "reels" || item.category === "ads"
  );
  const longFormItems = WORK_ITEMS.filter(
    item => item.category === "youtube" || item.category === "campaigns"
  );

  // Sub-component for scrollable row (Moves only when the user scrolls)
  const ScrollableRow = ({ items, isVertical }: { items: WorkItem[], isVertical: boolean }) => {
    return (
      <div className="relative w-full py-2 select-none">
        {/* Soft edge masking overlays for a premium studio layout */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#070708] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#070708] to-transparent z-10 pointer-events-none" />

        {/* Horizontal scroll container */}
        <div className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 pt-2 px-4 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: "thin" }}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setIsLoadingVideo(true);
                setSelectedWork(item);
              }}
              className={`group cursor-pointer rounded-2xl overflow-hidden bg-[#0c0c0e] border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_15px_30px_rgba(244,63,94,0.08)] flex flex-col justify-between shrink-0 snap-start ${
                isVertical ? "w-[240px] aspect-[9/16]" : "w-[380px] aspect-[16/9]"
              }`}
            >
              <div className="relative w-full h-full overflow-hidden bg-neutral-900 group">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-[0.85] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual shading overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

                {/* Main information overlay container */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 font-sans">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[8px] uppercase tracking-widest font-mono font-bold text-amber-400">
                      {item.category}
                    </span>

                    <span className="text-[10px] sm:text-xs">
                      {isVertical ? "VERTICAL" : "LANDSCAPE"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-sm text-white line-clamp-1 group-hover:text-rose-400 transition-colors">
                      {item.title}
                    </h4>
                    
                    <p className="text-[10px] text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        {item.metrics}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-500 group-hover:text-white transition-colors flex items-center gap-1 font-bold">
                        <Play className="w-2.5 h-2.5 fill-current" /> PLAY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Seamless play hover button element */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white text-[#070708] border border-white/20 flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-[#070708] translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="portfolio" className="relative py-28 bg-[#070708] border-t border-b border-neutral-900 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Blueprint background lines pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4 text-xs font-mono font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CREATIVE ENGINEERING</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white">
            Our Addictive <br />
            <span className="bg-gradient-to-r from-purple-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Creative Arsenal.
            </span>
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base font-light">
            An infinite feed of raw attention catalysts. Explore highly interactive visual designs, authority-building scripts, and extreme retention products.
          </p>
        </div>

        {/* SECTION 1: SHORT FORM EDITS (SCROLLING RIGHT TO LEFT) */}
        <div className="space-y-4 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 px-2">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-rose-500" />
              <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight">
                Short Form Edits
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              OPTIMIZED FOR TIKTOK & REELS INFRASTRUCTURE // 9:16 FEED
            </span>
          </div>
          
          <ScrollableRow items={shortFormItems} isVertical={true} />
        </div>

        {/* SECTION 2: LONG FORM EDITS (SCROLLING RIGHT TO LEFT) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 px-2">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-indigo-500" />
              <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight">
                Long Form Edits
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              OPTIMIZED FOR YOUTUBE RETENTION & NARRATIVES // 16:9 SCREEN
            </span>
          </div>

          <ScrollableRow items={longFormItems} isVertical={false} />
        </div>

        {/* Dynamic Lightbox Modal Container */}
        <AnimatePresence>
          {selectedWork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
              onClick={() => setSelectedWork(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-neutral-400 hover:text-white transition-all"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Left Column: Player simulation */}
                  <div className={`md:col-span-7 bg-black text-center flex items-center justify-center p-3 relative ${
                    selectedWork.category === "shorts" || selectedWork.category === "reels" || selectedWork.category === "ads"
                      ? "bg-neutral-950 aspect-[9/16] md:max-h-[600px]"
                      : "aspect-video"
                  }`}>
                    
                    {/* Royalty free loop simulated player */}
                    {selectedWork.videoUrl ? (
                      <div className="relative w-full h-full max-h-[580px] overflow-hidden rounded-xl flex items-center justify-center bg-black/95">
                        {isLoadingVideo && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 font-mono">
                            <div className="w-8 h-8 rounded-full border-2 border-t-rose-500 border-r-transparent border-b-transparent border-l-transparent animate-spin mb-3" />
                            <span className="text-[10px] text-neutral-400 tracking-wider font-bold">STREAMING CREATIVE...</span>
                          </div>
                        )}
                        <video
                          key={selectedWork.id}
                          src={selectedWork.videoUrl}
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          controls
                          preload="auto"
                          crossOrigin="anonymous"
                          onLoadedData={() => setIsLoadingVideo(false)}
                          onCanPlay={() => setIsLoadingVideo(false)}
                          onPlay={() => setIsLoadingVideo(false)}
                          onPlaying={() => setIsLoadingVideo(false)}
                          onLoadStart={() => setIsLoadingVideo(true)}
                          onError={() => setIsLoadingVideo(false)}
                          className={`w-full h-full object-contain bg-black transition-opacity duration-300 ${isLoadingVideo ? 'opacity-0' : 'opacity-100'}`}
                        />
                        
                        {/* Audio toggler on overlay */}
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="absolute bottom-4 left-4 p-2.5 rounded-full bg-black/70 border border-white/10 text-white z-30 hover:bg-black transition-all"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                        </button>
                      </div>
                    ) : (
                      <div className="p-8 text-neutral-500 font-mono text-xs">
                        <ImageIcon className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
                        <span>VIDEO LINK RE-INDEXING (PRE-LOAD BUFFER)</span>
                      </div>
                    )}

                    {/* Smartphone Overlay lines for high-end Shorts feeling */}
                    {(selectedWork.category === "shorts" || selectedWork.category === "reels") && (
                      <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between text-left">
                        <div className="bg-black/40 backdrop-blur-sm px-2 py-1 rounded max-w-fit border border-white/10">
                          <span className="text-[9px] font-mono font-bold text-amber-400 tracking-wider">● MOBILE MOCKUP MTRX</span>
                        </div>
                        <div className="space-y-1 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-xl">
                          <span className="text-[10px] font-mono text-purple-400 font-bold">@addictive_partners</span>
                          <p className="text-white font-bold text-xs">{selectedWork.title}</p>
                          <p className="text-[10px] text-neutral-400 line-clamp-1">{selectedWork.description}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Case study specs */}
                  <div className="md:col-span-5 p-8 flex flex-col justify-between bg-[#0e0e11]">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded">
                          {selectedWork.category}
                        </span>
                        <span className="text-xs text-neutral-500">Addictive Asset</span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-display font-extrabold text-white leading-snug">
                        {selectedWork.title}
                      </h3>

                      <hr className="border-white/5 my-4" />

                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">Asset Strategy Blueprint</span>
                      <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                        {selectedWork.description}
                      </p>

                      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">AUDIENCE TRACTION STAT</span>
                        <p className="text-lg font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                          <Flame className="w-4 h-4" />
                          {selectedWork.metrics}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <a
                        href="#contact"
                        onClick={() => setSelectedWork(null)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white text-xs font-mono font-bold uppercase rounded-xl tracking-wider transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Query Similar Creatives</span>
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

