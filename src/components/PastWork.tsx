import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Sparkles, Video, ChevronLeft, ChevronRight, X, Volume2, VolumeX } from "lucide-react";
import { WORK_ITEMS, WorkItem } from "../types";

// Helper to extract clean YouTube Video ID
const getYouTubeId = (url: string | undefined): string | null => {
  if (!url) return null;
  const trimmed = url.trim();
  let videoId = "";
  if (trimmed.includes("youtu.be/")) {
    videoId = trimmed.split("youtu.be/")[1]?.split(/[?#]/)[0] || "";
  } else if (trimmed.includes("youtube.com/shorts/")) {
    videoId = trimmed.split("youtube.com/shorts/")[1]?.split(/[?#]/)[0] || "";
  } else if (trimmed.includes("embed/")) {
    videoId = trimmed.split("embed/")[1]?.split(/[?#]/)[0] || "";
  } else if (trimmed.includes("v=")) {
    videoId = trimmed.split("v=")[1]?.split(/[?#&]/)[0] || "";
  }
  return videoId || null;
};

const getCardType = (item: WorkItem, index: number): "tall" | "wide" | "portrait" | "square" => {
  if (item.category === "shorts" || item.category === "reels" || item.category === "ads") {
    const mod = index % 3;
    if (mod === 0) return "tall";
    if (mod === 1) return "portrait";
    return "square";
  } else {
    const mod = index % 3;
    if (mod === 0) return "wide";
    if (mod === 1) return "square";
    return "portrait";
  }
};

interface VideoCardProps {
  item: WorkItem;
  cardType: "tall" | "wide" | "portrait" | "square";
  onPlay: () => void;
}

// Clean aesthetic Video Card with NO overlaid text, showing only the premium video thumbnail and hover-revealed Play button.
const VideoCard: React.FC<VideoCardProps> = ({
  item,
  cardType,
  onPlay
}) => {
  const themeClasses = "border-2 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:border-purple-400 hover:shadow-[0_0_35px_rgba(168,85,247,0.45)]";

  const aspectClasses = {
    tall: "aspect-[9/16]",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
    square: "aspect-square"
  }[cardType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onClick={onPlay}
      className={`group relative flex flex-col justify-between w-full overflow-hidden bg-[#09090b] rounded-2xl transition-all duration-500 ease-out hover:scale-[1.03] cursor-pointer ${aspectClasses} ${themeClasses}`}
    >
      {/* Thumbnail */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-full object-cover filter brightness-[0.8] group-hover:brightness-[0.6] group-hover:scale-[1.02] transition-all duration-700 pointer-events-none"
        referrerPolicy="no-referrer"
      />
      
      {/* Centered Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors duration-300">
        <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.5)] opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
          <Play className="w-5 h-5 fill-current text-black translate-x-0.5" />
        </div>
      </div>
    </motion.div>
  );
};

export default function PastWork() {
  const [activeVideoItem, setActiveVideoItem] = useState<WorkItem | null>(null);
  const [isMutedGlobal, setIsMutedGlobal] = useState(false);
  const [columnsCount, setColumnsCount] = useState(1);

  // Mobile horizontal slider refs and helper
  const shortScrollRef = useRef<HTMLDivElement>(null);
  const longScrollRef = useRef<HTMLDivElement>(null);

  const scrollRow = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1536) { // 2xl
        setColumnsCount(5);
      } else if (width >= 1280) { // xl
        setColumnsCount(4);
      } else if (width >= 1024) { // lg
        setColumnsCount(3);
      } else if (width >= 768) { // md
        setColumnsCount(2);
      } else {
        setColumnsCount(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const displayedWorkItems = WORK_ITEMS;

  const columns = useMemo(() => {
    const cols: { item: WorkItem; index: number }[][] = Array.from({ length: columnsCount }, () => []);
    displayedWorkItems.forEach((item, index) => {
      cols[index % columnsCount].push({ item, index });
    });
    return cols;
  }, [displayedWorkItems, columnsCount]);

  // Divide work items into short-form and long-form
  const shortFormItems = useMemo(() => {
    return displayedWorkItems.filter(
      item => item.category === "shorts" || item.category === "reels" || item.category === "ads"
    );
  }, [displayedWorkItems]);

  const longFormItems = useMemo(() => {
    return displayedWorkItems.filter(
      item => item.category === "youtube" || item.category === "campaigns"
    );
  }, [displayedWorkItems]);

  const handlePrevVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeVideoItem) return;
    const currentIndex = displayedWorkItems.findIndex(item => item.id === activeVideoItem.id);
    if (currentIndex > 0) {
      setActiveVideoItem(displayedWorkItems[currentIndex - 1]);
    } else {
      setActiveVideoItem(displayedWorkItems[displayedWorkItems.length - 1]);
    }
  };

  const handleNextVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeVideoItem) return;
    const currentIndex = displayedWorkItems.findIndex(item => item.id === activeVideoItem.id);
    if (currentIndex < displayedWorkItems.length - 1) {
      setActiveVideoItem(displayedWorkItems[currentIndex + 1]);
    } else {
      setActiveVideoItem(displayedWorkItems[0]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeVideoItem) return;
      if (e.key === "Escape") {
        setActiveVideoItem(null);
      } else if (e.key === "ArrowLeft") {
        handlePrevVideo();
      } else if (e.key === "ArrowRight") {
        handleNextVideo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideoItem]);

  const isVertical = useMemo(() => {
    if (!activeVideoItem) return false;
    return (
      activeVideoItem.category === "shorts" ||
      activeVideoItem.category === "reels" ||
      activeVideoItem.category === "ads"
    );
  }, [activeVideoItem]);

  return (
    <section id="portfolio" className="relative py-20 sm:py-32 bg-dark-bg border-t border-b border-white/5 overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] orange-glow opacity-5 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] purple-glow opacity-10 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header content */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24 animate-[fadeIn_0.8s_ease-out] px-4">
          <div className="inline-block px-12 py-6 sm:py-8 rounded-3xl bg-[#09090b]/80 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden">
            {/* Ambient subtle glow inside */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-accent-orange/10 to-accent-gold/10 opacity-30 blur-xl pointer-events-none" />
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white leading-none relative z-10 select-none">
              Portfolio
            </h2>
          </div>
        </div>

        {/* Mobile-Optimized Swiper View (Visible on mobile/tablet screen widths < 768px) */}
        <div className="block md:hidden space-y-12">
          {displayedWorkItems.length > 0 ? (
            <>
              {/* Row 1: Short-Form Reels & Shorts (Vertical portrait layout) */}
              {shortFormItems.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-display font-black tracking-wider text-white uppercase">
                          Short-Form Reels
                        </h3>
                      </div>
                    </div>

                    {/* Smooth Arrow Navigation buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => scrollRow(shortScrollRef, "left")}
                        className="w-8 h-8 rounded-full border border-white/5 bg-neutral-950/80 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/10 active:scale-95 transition-all cursor-pointer"
                        title="Scroll Left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollRow(shortScrollRef, "right")}
                        className="w-8 h-8 rounded-full border border-white/5 bg-neutral-950/80 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/10 active:scale-95 transition-all cursor-pointer"
                        title="Scroll Right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scroll Track */}
                  <div
                    ref={shortScrollRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-1 scroll-smooth"
                  >
                    {shortFormItems.map((item) => (
                      <div
                        key={item.id}
                        className="w-[200px] shrink-0 snap-center"
                      >
                        <VideoCard
                          item={item}
                          cardType="tall"
                          onPlay={() => setActiveVideoItem(item)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Row 2: Long-Form & Commercial YouTube Campaigns (Landscape wide layout) */}
              {longFormItems.length > 0 && (
                <div className="space-y-4 pt-8 border-t border-white/5">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <Video className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-display font-black tracking-wider text-white uppercase">
                          YouTube & Long-Form
                        </h3>
                      </div>
                    </div>

                    {/* Smooth Arrow Navigation buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => scrollRow(longScrollRef, "left")}
                        className="w-8 h-8 rounded-full border border-white/5 bg-neutral-950/80 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/10 active:scale-95 transition-all cursor-pointer"
                        title="Scroll Left"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scrollRow(longScrollRef, "right")}
                        className="w-8 h-8 rounded-full border border-white/5 bg-neutral-950/80 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/10 active:scale-95 transition-all cursor-pointer"
                        title="Scroll Right"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scroll Track */}
                  <div
                    ref={longScrollRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-1 scroll-smooth"
                  >
                    {longFormItems.map((item) => (
                      <div
                        key={item.id}
                        className="w-[280px] shrink-0 snap-center"
                      >
                        <VideoCard
                          item={item}
                          cardType="wide"
                          onPlay={() => setActiveVideoItem(item)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-neutral-500 font-mono text-xs border border-dashed border-white/5 rounded-2xl bg-neutral-950/20 max-w-xl mx-auto">
              No video portfolio items found.
            </div>
          )}
        </div>

        {/* Desktop & Tablet Collage / Masonry Portfolio Grid (Hidden on mobile < 768px) */}
        <div className="hidden md:block space-y-8">
          {displayedWorkItems.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 max-w-[105rem] mx-auto">
              {columns.map((columnItems, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-4 sm:gap-6">
                  {columnItems.map(({ item, index }) => {
                    const cardType = getCardType(item, index);
                    return (
                      <VideoCard
                        key={item.id}
                        item={item}
                        cardType={cardType}
                        onPlay={() => setActiveVideoItem(item)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-neutral-500 font-mono text-sm border border-dashed border-white/5 rounded-2xl bg-neutral-950/20 max-w-4xl mx-auto">
              No video portfolio items found.
            </div>
          )}
        </div>

      </div>

      {/* Lightbox Video Player Modal - Clean, Minimal & Completely Free of text details */}
      <AnimatePresence>
        {activeVideoItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-8 select-none"
          >
            {/* Modal Content container */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative flex flex-col items-center justify-center w-full h-full max-h-[85vh] max-w-5xl"
            >
              {/* Previous Button (Left) */}
              <button
                onClick={handlePrevVideo}
                className="absolute left-[-1.5rem] md:left-[-5rem] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-neutral-900/80 flex items-center justify-center text-white hover:bg-neutral-800 hover:border-white/20 active:scale-95 transition-all cursor-pointer z-20"
                title="Previous Video"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Video Player Box - Height aligned for true vertical showcase */}
              <div 
                className={`relative bg-black rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.35)] flex items-center justify-center max-w-full max-h-[75vh]
                  ${isVertical 
                    ? "h-[75vh] aspect-[9/16] w-auto" 
                    : "w-full aspect-[16/9]"
                  }`}
              >
                {getYouTubeId(activeVideoItem.videoUrl) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(activeVideoItem.videoUrl)}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                    title={activeVideoItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={activeVideoItem.videoUrl}
                      autoPlay
                      controls
                      loop
                      muted={isMutedGlobal}
                      playsInline
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setIsMutedGlobal(!isMutedGlobal)}
                      className="absolute bottom-4 left-4 p-2.5 rounded-full bg-black/80 border border-white/10 text-white hover:bg-neutral-900 transition-all z-10"
                    >
                      {isMutedGlobal ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Next Button (Right) */}
              <button
                onClick={handleNextVideo}
                className="absolute right-[-1.5rem] md:right-[-5rem] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-neutral-900/80 flex items-center justify-center text-white hover:bg-neutral-800 hover:border-white/20 active:scale-95 transition-all cursor-pointer z-20"
                title="Next Video"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Close Button (Top Right) */}
              <button
                onClick={() => setActiveVideoItem(null)}
                className="absolute top-[-3.5rem] md:top-[-2.5rem] right-0 p-2 rounded-full border border-white/10 bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer z-30"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
