import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Flame, Sparkles, Film, Video, ChevronLeft, ChevronRight, X, Volume2, VolumeX, Plus, Trash2, Edit3, Sliders, Database, RefreshCw, FileEdit, Check, FolderOpen, Upload, Image, Maximize } from "lucide-react";
import { WORK_ITEMS, WorkItem } from "../types";
import { collection, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth, handleFirestoreError, OperationType, sandboxDb } from "../firebase";

// Helper function to extract YouTube ID and build embedded URL for background playback
const getYouTubeEmbedUrl = (url: string | undefined): string | null => {
  if (!url) return null;
  const trimmed = url.trim();
  if (trimmed.includes("youtube.com") || trimmed.includes("youtu.be")) {
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
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0`;
    }
  }
  return null;
};

// Static sub-component defined outside of PastWork to prevent unmounting and scroll resets on state updates.
const ScrollableRow = ({
  items,
  isVertical,
  playingVideoId,
  setPlayingVideoId,
  isMutedGlobal,
  setIsMutedGlobal
}: {
  items: WorkItem[];
  isVertical: boolean;
  playingVideoId: string | null;
  setPlayingVideoId: (id: string | null) => void;
  isMutedGlobal: boolean;
  setIsMutedGlobal: (muted: boolean) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const isDraggingRef = useRef(false);
  const isDraggingCardsRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const totalDraggedDistanceRef = useRef(0);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingCards, setIsDraggingCards] = useState(false);

  // Combine dragging states to instantly disable transitions for direct tracking responsiveness
  const isDraggingAny = isDragging || isDraggingCards;

  const handleScroll = () => {
    if (isDraggingRef.current) return; // Prevent scroll events from overriding active drag coordinate updates
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);

      // Dynamically calculate active card index based on viewport position
      const cards = containerRef.current.children;
      if (cards.length > 0) {
        let nearestIndex = 0;
        let minDiff = Infinity;
        const containerLeft = containerRef.current.getBoundingClientRect().left;

        for (let i = 0; i < cards.length; i++) {
          const cardRect = cards[i].getBoundingClientRect();
          const diff = Math.abs(cardRect.left - containerLeft);
          if (diff < minDiff) {
            minDiff = diff;
            nearestIndex = i;
          }
        }
        setActiveIndex(nearestIndex);
      }
    }
  };

  useEffect(() => {
    handleScroll();
    // Handle initial render checks
    const timer = setTimeout(handleScroll, 100);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [items]);

  // Desktop drag-to-scroll handler for the horizontal cards row itself
  const handleCardsMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Handled left clicks only
    const target = e.target as HTMLElement;
    if (
      target.closest("button") || 
      target.closest("iframe") || 
      target.closest("video") || 
      target.closest("a") ||
      target.closest("input") ||
      target.closest("textarea")
    ) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    isDraggingCardsRef.current = true;
    setIsDraggingCards(true);
    startXRef.current = e.clientX;
    startScrollLeftRef.current = container.scrollLeft;
    totalDraggedDistanceRef.current = 0;

    const onPointerMove = (moveEvent: MouseEvent) => {
      if (!isDraggingCardsRef.current) return;
      const deltaX = moveEvent.clientX - startXRef.current;
      totalDraggedDistanceRef.current = Math.abs(deltaX);
      container.scrollLeft = startScrollLeftRef.current - deltaX * 1.5;
    };

    const onPointerUp = () => {
      isDraggingCardsRef.current = false;
      setTimeout(() => {
        setIsDraggingCards(false);
      }, 50);
      document.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseup", onPointerUp);
    };

    document.addEventListener("mousemove", onPointerMove);
    document.addEventListener("mouseup", onPointerUp);
  };

  const handleDragUpdate = (clientX: number) => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const rect = track.getBoundingClientRect();
    const padding = 16; // px-4 padding
    const innerWidth = rect.width - padding * 2;
    const clickX = clientX - rect.left - padding;
    const percentage = Math.max(0, Math.min(1, clickX / innerWidth));

    // Instantly sync the visual slider progress percentage to coordinate cursor coordinate
    setScrollProgress(percentage * 100);

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll > 0) {
      container.scrollLeft = percentage * maxScroll;
    }

    const cards = container.children;
    if (cards.length > 0) {
      const targetIndex = Math.round(percentage * (cards.length - 1));
      setActiveIndex(Math.max(0, Math.min(cards.length - 1, targetIndex)));
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Left Click only
    isDraggingRef.current = true;
    setIsDragging(true);
    handleDragUpdate(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      handleDragUpdate(moveEvent.clientX);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      // Run final scroll update to bind exactly to any final scroll/snap position
      handleScroll();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleDragUpdate(e.touches[0].clientX);
    }

    const onTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.cancelable) {
        moveEvent.preventDefault();
      }
      if (moveEvent.touches.length > 0) {
        handleDragUpdate(moveEvent.touches[0].clientX);
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      // Run final scroll update to bind exactly to any final scroll/snap position
      handleScroll();
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
  };

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full py-4 group/carousel select-none">
      {/* Horizontal scroll container with scrollbar completely hidden */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleCardsMouseDown}
        className={`flex gap-6 overflow-x-auto pb-6 pt-2 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          isDraggingCards ? "cursor-grabbing select-none" : "cursor-grab"
        } ${
          isDragging 
            ? "snap-none scroll-auto select-none" 
            : "snap-x snap-mandatory scroll-smooth"
        }`}
      >
        {items.map((item) => {
          const isPlaying = playingVideoId === item.id;
          
          if (isVertical) {
            // SHORT FORM 9:16 FEED: Keep absolute overlay because of vertical height, but optimize for zero congestion
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (totalDraggedDistanceRef.current > 10) return;
                  if (!isPlaying) {
                    setPlayingVideoId(item.id);
                  }
                }}
                className="group cursor-pointer rounded-none overflow-hidden bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between shrink-0 snap-start relative w-[190px] xs:w-[220px] sm:w-[260px] aspect-[9/16]"
              >
                {isPlaying ? (
                  <div className="absolute inset-0 bg-black w-full h-full z-20 flex items-center justify-center overflow-hidden rounded-none">
                    {getYouTubeEmbedUrl(item.videoUrl) ? (
                      <iframe
                        src={getYouTubeEmbedUrl(item.videoUrl)!}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full rounded-none border-0"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    ) : (
                      <video
                        src={item.videoUrl}
                        autoPlay
                        loop
                        muted={isMutedGlobal}
                        playsInline
                        className="w-full h-full object-cover rounded-none"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    )}

                    {/* Minimal Audio & Fullscreen controllers on video overlay */}
                    {!getYouTubeEmbedUrl(item.videoUrl) && (
                      <div className="absolute bottom-3 left-3 flex gap-1.5 z-30 pointer-events-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMutedGlobal(!isMutedGlobal);
                          }}
                          className="p-2 rounded-none bg-black border border-neutral-800 text-white hover:bg-neutral-900 transition-all active:scale-95 shadow-md"
                          title={isMutedGlobal ? "Unmute" : "Mute"}
                        >
                          {isMutedGlobal ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const videoEl = e.currentTarget.parentElement?.parentElement?.querySelector('video');
                            if (videoEl) {
                              if (videoEl.requestFullscreen) {
                                videoEl.requestFullscreen().catch(() => {});
                              } else if ((videoEl as any).webkitEnterFullscreen) {
                                (videoEl as any).webkitEnterFullscreen();
                              }
                            }
                          }}
                          className="p-2 rounded-none bg-black border border-neutral-800 text-white hover:bg-neutral-900 transition-all active:scale-95 shadow-md"
                          title="Fullscreen"
                        >
                          <Maximize className="w-3.5 h-3.5 text-neutral-300" />
                        </button>
                      </div>
                    )}
                    
                    {/* Inline Close Overlay Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingVideoId(null);
                      }}
                      className="absolute top-3 right-3 z-30 p-2 rounded-none bg-black border border-neutral-800 text-white hover:bg-neutral-900 transition-all duration-300 active:scale-95 shadow-lg"
                      title="Close Player"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-full overflow-hidden bg-neutral-950 group rounded-none">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-[0.75] group-hover:scale-105 group-hover:brightness-95 transition-all duration-700 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient shading masks */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-95 pointer-events-none" />

                    {/* Meta Info Overlays */}
                    <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between z-10 font-sans pointer-events-none">
                      <div className="flex justify-between items-center w-full">
                        <span className="px-2 py-0.5 rounded-none bg-neutral-900 border border-neutral-800 text-[7px] min-w-[45px] text-center uppercase tracking-wider font-mono font-bold text-white">
                          {item.category}
                        </span>

                        <span className="text-[7.5px] font-mono font-semibold text-white/50 bg-black px-1.5 py-0.5 rounded-none border border-neutral-900 uppercase">
                          9:16 FEED
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-display font-extrabold text-xs sm:text-sm text-white tracking-tight line-clamp-1 group-hover:text-neutral-400 transition-colors">
                          {item.title}
                        </h4>
                        
                        <p className="text-[9px] sm:text-[10px] text-neutral-400 font-sans line-clamp-2 leading-snug">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between pt-1.5 border-t border-neutral-900">
                          <span className="text-[9px] sm:text-[10px] font-mono text-white font-bold flex items-center gap-0.5">
                            <Flame className="w-3 h-3 fill-current text-white" />
                            {item.metrics}
                          </span>
                          <span className="text-[8px] font-mono text-neutral-400 group-hover:text-white transition-colors flex items-center gap-0.5 font-bold uppercase">
                            <Play className="w-2 h-2 fill-current text-white" /> PLAY
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Play Hover State Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="w-10 h-10 rounded-none bg-black border border-neutral-800 text-white flex items-center justify-center transition-all duration-300">
                        <Play className="w-4 h-4 fill-current text-white translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          } else {
            // LONG FORM 16:9 SCREEN: Split card structure (Media on top, metadata text below layout) to solve mobile congestion
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (totalDraggedDistanceRef.current > 10) return;
                  if (!isPlaying) {
                    setPlayingVideoId(item.id);
                  }
                }}
                className="group cursor-pointer rounded-none overflow-hidden bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between shrink-0 snap-start w-[265px] xs:w-[320px] sm:w-[370px] md:w-[410px]"
              >
                {/* Media Container on Top of Card */}
                <div className="relative w-full aspect-[16/9] bg-neutral-950 overflow-hidden">
                  {isPlaying ? (
                    <div className="absolute inset-0 bg-black w-full h-full z-20 flex items-center justify-center overflow-hidden">
                      {getYouTubeEmbedUrl(item.videoUrl) ? (
                        <iframe
                          src={getYouTubeEmbedUrl(item.videoUrl)!}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full border-0"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      ) : (
                        <video
                          src={item.videoUrl}
                          autoPlay
                          loop
                          muted={isMutedGlobal}
                          playsInline
                          className="w-full h-full object-cover"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      )}

                      {/* Video actions overlay inside top Area */}
                      {!getYouTubeEmbedUrl(item.videoUrl) && (
                        <div className="absolute bottom-2.5 left-2.5 flex gap-1.5 z-30 pointer-events-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMutedGlobal(!isMutedGlobal);
                            }}
                            className="p-1.5 rounded-none bg-black border border-neutral-800 text-white hover:bg-neutral-900 transition-all active:scale-95 shadow"
                            title={isMutedGlobal ? "Unmute" : "Mute"}
                          >
                            {isMutedGlobal ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const videoEl = e.currentTarget.parentElement?.parentElement?.querySelector('video');
                              if (videoEl) {
                                if (videoEl.requestFullscreen) {
                                  videoEl.requestFullscreen().catch(() => {});
                                } else if ((videoEl as any).webkitEnterFullscreen) {
                                  (videoEl as any).webkitEnterFullscreen();
                                }
                              }
                            }}
                            className="p-1.5 rounded-none bg-black border border-neutral-800 text-white hover:bg-neutral-900 transition-all active:scale-95 shadow"
                            title="Fullscreen"
                          >
                            <Maximize className="w-3.5 h-3.5 text-neutral-300" />
                          </button>
                        </div>
                      )}
                      
                      {/* Inline Close */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVideoId(null);
                        }}
                        className="absolute top-2.5 right-2.5 z-30 p-1.5 rounded-none bg-black border border-neutral-800 text-white hover:bg-neutral-900 transition-all duration-300 active:scale-95 shadow-md"
                        title="Close Player"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full h-full overflow-hidden group">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover filter brightness-[0.80] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />

                      {/* Header indicators */}
                      <div className="absolute top-2.5 inset-x-2.5 z-10 pointer-events-none flex justify-between items-center">
                        <span className="px-2 py-0.5 rounded-none bg-neutral-900 border border-neutral-800 text-[7px] uppercase tracking-widest font-mono font-bold text-white">
                          {item.category}
                        </span>
                        <span className="text-[7px] font-mono font-semibold text-white/55 bg-black border border-neutral-900 px-1.5 py-0.5 rounded-none uppercase tracking-wider">
                          16:9 SCREEN
                        </span>
                      </div>

                      {/* Hover action circle */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <div className="w-11 h-11 rounded-none bg-black border border-neutral-800 text-white flex items-center justify-center transition-all duration-300">
                          <Play className="w-4 h-4 fill-current text-white translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Text block below the video, avoiding mobile overlaps absolutely */}
                <div className="p-3.5 sm:p-5 flex flex-col gap-2 bg-neutral-950 border-t border-neutral-900 w-full">
                  <h4 className="font-display font-extrabold text-xs sm:text-sm text-white tracking-tight line-clamp-1 group-hover:text-neutral-400 transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-[9.5px] sm:text-[11px] text-neutral-400 font-sans line-clamp-2 leading-relaxed min-h-[32px] sm:min-h-[38px]">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-900 mt-0.5">
                    <span className="text-[9.5px] sm:text-[10px] font-mono text-white font-bold flex items-center gap-0.5">
                      <Flame className="w-3 h-3 fill-current text-white" />
                      {item.metrics}
                    </span>
                    <span className="text-[8.5px] sm:text-[9px] font-mono text-neutral-400 group-hover:text-white transition-colors flex items-center gap-0.5 font-bold uppercase">
                      <Play className="w-2 h-2 fill-current text-white" /> PLAY SHOWCASE
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Custom Premium Glassmorphic Scrolling Indicator Controller with Dynamic Count */}
      <div className="flex flex-col items-center gap-3 mt-8">
        {/* Dynamic Digital Counter Badge */}
        {items.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-none shadow-sm">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-300">
              {(activeIndex + 1).toString().padStart(2, "0")}
            </span>
            <span className="text-[8px] font-mono text-neutral-600 font-bold">/</span>
            <span className="text-[10px] font-mono text-neutral-400 font-bold tracking-widest">
              {items.length.toString().padStart(2, "0")}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between max-w-[340px] w-full mx-auto px-4 py-2 bg-neutral-950 border border-neutral-900 rounded-none transition-all hover:bg-neutral-900 hover:border-neutral-800 group/slider-console">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded-none transition-all duration-300 ${
              canScrollLeft 
                ? "text-neutral-300 hover:text-white hover:bg-neutral-800 active:scale-95" 
                : "text-neutral-700 cursor-not-allowed opacity-40"
            }`}
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Draggable Slidebar Track with premium reactive glowing feedback */}
          <div 
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="flex-1 px-4 py-3 cursor-grab active:cursor-grabbing relative group/track select-none"
          >
            {/* Ambient subtle background glow for the active track section */}
            <div className="h-[2px] bg-neutral-900 rounded-none w-full relative transition-all duration-300">
              <div
                className="absolute left-0 top-0 h-full bg-white"
                style={{ 
                  width: `${scrollProgress}%`,
                  transition: isDraggingAny ? "none" : "width 240ms cubic-bezier(0.25, 1, 0.5, 1)"
                }}
              />
            </div>
            {/* High-end sliding thumb lens */}
            <div 
              className="absolute w-3 h-3 bg-white border border-black rounded-none top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform hover:scale-110 focus:scale-110"
              style={{ 
                left: `calc(16px + (${scrollProgress}% * (100% - 32px) / 100))`,
                transform: "translate(-50%, -50%)",
                transition: isDraggingAny ? "none" : "left 240ms cubic-bezier(0.25, 1, 0.5, 1), transform 150ms ease-out"
              }}
            >
              {/* Core inner dot */}
              <div className="w-1 h-1 bg-black rounded-none" />
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded-none transition-all duration-300 ${
              canScrollRight 
                ? "text-neutral-300 hover:text-white hover:bg-neutral-800 active:scale-95" 
                : "text-neutral-700 cursor-not-allowed opacity-40"
            }`}
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PastWork() {
  const [allWorkItems, setAllWorkItems] = useState<WorkItem[]>([]);
  const [useCloudDb, setUseCloudDb] = useState(() => {
    return localStorage.getItem("addictive_use_cloud_db") === "true";
  });
  const [localDeletedSet, setLocalDeletedSet] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("addictive_local_deleted");
    return new Set<string>(saved ? JSON.parse(saved) : []);
  });
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMutedGlobal, setIsMutedGlobal] = useState(true);
  
  // Owner Authentication States
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isPasskeyVerified, setIsPasskeyVerified] = useState(() => {
    return localStorage.getItem("addictive_owner_auth") === "true";
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [enteredPasskey, setEnteredPasskey] = useState("");
  const [authError, setAuthError] = useState("");

  // Tab-based owner login modes: "google" | "email" | "passkey"
  const [authMethod, setAuthMethod] = useState<"google" | "email" | "passkey">("google");
  const [emailInput, setEmailInput] = useState("vedantssane2008@gmail.com");
  const [passwordInput, setPasswordInput] = useState("");

  // Verify if current user is logged in via an authorized administrator email (Google Accounts)
  const isAuthorizedAdmin = useMemo(() => {
    const whitelistedEmails = [
      "vedantssane2008@gmail.com",
      // You can easily add more authorized Google email addresses below:
      "vedantssane2.dev@gmail.com"
    ];
    return !!(currentUser?.email && whitelistedEmails.includes(currentUser.email));
  }, [currentUser]);

  // Evaluated ownership state memoized (determines if they can access/view the dashboard)
  const isOwner = useMemo(() => {
    return isPasskeyVerified || isAuthorizedAdmin;
  }, [isPasskeyVerified, isAuthorizedAdmin]);

  // Firebase auth state listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  const handleVerifyPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    const key = enteredPasskey.trim().toLowerCase();
    // Support convenient combinations of owner passwords
    if (key === "addictiveowner" || key === "addictive2026" || key === "owner" || key === "vedantowner") {
      setIsPasskeyVerified(true);
      localStorage.setItem("addictive_owner_auth", "true");
      setShowAuthModal(false);
      setShowControlCenter(true);
      setSuccessMsg("🔑 Authenticated as Website Owner.");
      setEnteredPasskey("");
      setAuthError("");
      setTimeout(() => setSuccessMsg(""), 4000);
    } else {
      setAuthError("Incorrect key. Access Denied.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const whitelistedEmails = [
        "vedantssane2008@gmail.com",
        "vedantssane2.dev@gmail.com"
      ];
      const isWhitelisted = user.email && whitelistedEmails.includes(user.email);

      if (user.emailVerified || isWhitelisted) {
        if (isWhitelisted) {
          setIsPasskeyVerified(true);
          localStorage.setItem("addictive_owner_auth", "true");
          setSuccessMsg(`🔑 Authenticated as Google Master Owner: ${user.email}`);
        } else {
          setSuccessMsg("🔗 Google Account connected successfully!");
        }
        setShowAuthModal(false);
        setShowControlCenter(true);
        setEnteredPasskey("");
        setAuthError("");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        setAuthError("Google email is not verified.");
        await signOut(auth);
      }
    } catch (err: any) {
      setAuthError(err?.message || "Google Sign-In failed.");
    }
  };

  const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, emailInput.trim(), passwordInput);
      const user = result.user;
      
      setIsPasskeyVerified(true);
      localStorage.setItem("addictive_owner_auth", "true");
      setSuccessMsg("🔑 Authenticated via Secure Email/Password!");
      setShowAuthModal(false);
      setShowControlCenter(true);
      setPasswordInput("");
      setAuthError("");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      console.error("Email/Password Sign-In Error:", err);
      let errMsg = err?.message || "Authentication failed.";
      if (err?.code === "auth/user-not-found" || err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential" || err?.message?.includes("invalid-credential")) {
        errMsg = "Incorrect password or account not found. Note: Make sure you have enabled local 'Email/Password' under Firebase console Auth Sign-in Methods and created user 'vedantssane2008@gmail.com'.";
      } else if (err?.code === "auth/operation-not-allowed") {
        errMsg = "Email/Password sign-in provider is not enabled in your Firebase console. Go to Authentication -> Sign-in Method and enable 'Email/Password'.";
      }
      setAuthError(errMsg);
    }
  };

  const handleLogOutOwner = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Firebase logout error:", err);
    }
    setIsPasskeyVerified(false);
    localStorage.removeItem("addictive_owner_auth");
    setShowControlCenter(false);
    setSuccessMsg("🔒 Owner Session Terminated Safely.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Dashboard drawer states
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Sandbox/Playground migration state
  const [sandboxItems, setSandboxItems] = useState<WorkItem[]>([]);
  const [isCheckingSandbox, setIsCheckingSandbox] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  // Creative Form States for new Project
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"shorts" | "reels" | "youtube" | "ads" | "campaigns">("shorts");
  const [newMetrics, setNewMetrics] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [customThumbUrl, setCustomThumbUrl] = useState("");
  const [customVideoUrl, setCustomVideoUrl] = useState("");

  // File Upload states and handlers
  const [thumbSource, setThumbSource] = useState<"url" | "file">("url");
  const [videoSource, setVideoSource] = useState<"url" | "file">("url");
  
  const [isDraggingThumb, setIsDraggingThumb] = useState(false);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  
  const [uploadedThumbName, setUploadedThumbName] = useState("");
  const [uploadedVideoName, setUploadedVideoName] = useState("");

  const thumbInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleThumbFileChange = (file: File | null) => {
    if (!file) return;
    setUploadedThumbName(file.name);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setCustomThumbUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVideoFileChange = (file: File | null) => {
    if (!file) return;
    setUploadedVideoName(file.name);
    
    // Create direct Object URL for peak hardware-accelerated video streaming
    const objUrl = URL.createObjectURL(file);
    setCustomVideoUrl(objUrl);
  };

  const handleDragOverThumb = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingThumb(true);
  };

  const handleDragLeaveThumb = () => {
    setIsDraggingThumb(false);
  };

  const handleDropThumb = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingThumb(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleThumbFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOverVideo = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingVideo(true);
  };

  const handleDragLeaveVideo = () => {
    setIsDraggingVideo(false);
  };

  const handleDropVideo = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingVideo(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoFileChange(e.dataTransfer.files[0]);
    }
  };

  // Preset Visual Assets to keep it highly aesthetic easily!
  const aestheticPresets = [
    {
      name: "Cyberpunk Tech",
      thumb: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-at-night-40134-large.mp4"
    },
    {
      name: "Studio Recording",
      thumb: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-smartphone-recording-vertical-video-of-a-man-40073-large.mp4"
    },
    {
      name: "Nebula Stars",
      thumb: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4"
    },
    {
      name: "Aesthetic Abstract",
      thumb: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=800&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4"
    },
    {
      name: "Market Analytics",
      thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      video: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-smartphone-recording-vertical-video-of-a-man-40073-large.mp4"
    }
  ];

  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  // Load from Firebase Firestore or local storage depending on storage engine selection
  useEffect(() => {
    if (!useCloudDb) {
      // Local-first Offline Mode (Recommended by User)
      const loadLocal = () => {
        const localProjectsStr = localStorage.getItem("addictive_local_projects");
        const localProjects: WorkItem[] = localProjectsStr ? JSON.parse(localProjectsStr) : [];
        
        const localIds = new Set(localProjects.map(item => item.id));
        const merged = [
          ...localProjects,
          ...WORK_ITEMS.filter(defaultItem => !localIds.has(defaultItem.id))
        ];
        setAllWorkItems(merged);
      };
      
      loadLocal();
      
      const handleStorage = (e: StorageEvent) => {
        if (e.key === "addictive_local_projects") {
          loadLocal();
        } else if (e.key === "addictive_local_deleted") {
          const saved = localStorage.getItem("addictive_local_deleted");
          setLocalDeletedSet(new Set<string>(saved ? JSON.parse(saved) : []));
        }
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    } else {
      // Cloud Firebase Syncing Mode
      const projectsCol = collection(db, "projects");
      
      const unsubscribe = onSnapshot(projectsCol, (snapshot) => {
        if (snapshot.empty) {
          setAllWorkItems(WORK_ITEMS);
        } else {
          const items: WorkItem[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.title === "DELETED") {
              return;
            }
            items.push({
              id: doc.id,
              title: data.title || "",
              category: data.category || "shorts",
              thumbnail: data.thumbnail || "",
              videoUrl: data.videoUrl || "",
              description: data.description || "",
              metrics: data.metrics || ""
            });
          });

          const firestoreIds = new Set(items.map(item => item.id));
          const mergedItems = [
            ...items,
            ...WORK_ITEMS.filter(defaultItem => !firestoreIds.has(defaultItem.id))
          ];
          setAllWorkItems(mergedItems);
        }
      }, (error) => {
        console.warn("Firestore snapshot loading error; falling back to local storage:", error);
        // Instant graceful local fallback on firestore block/error
        const localProjectsStr = localStorage.getItem("addictive_local_projects");
        const localProjects: WorkItem[] = localProjectsStr ? JSON.parse(localProjectsStr) : [];
        const localIds = new Set(localProjects.map(item => item.id));
        const merged = [
          ...localProjects,
          ...WORK_ITEMS.filter(defaultItem => !localIds.has(defaultItem.id))
        ];
        setAllWorkItems(merged);
      });

      return () => unsubscribe();
    }
  }, [useCloudDb]);

  // Synchronously fetch and track playground items if sandboxDb is available
  useEffect(() => {
    if (!sandboxDb) return;
    setIsCheckingSandbox(true);
    const sandboxCol = collection(sandboxDb, "projects");
    
    // Subscribing to playground/sandbox projects
    const unsubscribe = onSnapshot(sandboxCol, (snapshot) => {
      const items: WorkItem[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          title: data.title || "",
          category: data.category || "shorts",
          thumbnail: data.thumbnail || "",
          videoUrl: data.videoUrl || "",
          description: data.description || "",
          metrics: data.metrics || ""
        });
      });
      setSandboxItems(items);
      setIsCheckingSandbox(false);
    }, (error) => {
      console.warn("Could not retrieve playground database backups:", error);
      setIsCheckingSandbox(false);
    });

    return () => unsubscribe();
  }, []);

  const handleMigrateSandboxItems = async () => {
    if (sandboxItems.length === 0) {
      setSuccessMsg("❔ No historical showroom videos found in playground database.");
      setTimeout(() => setSuccessMsg(""), 4000);
      return;
    }
    
    setIsMigrating(true);
    setSuccessMsg(`🔄 Restoring ${sandboxItems.length} videos from past playground sessions...`);
    
    let successCount = 0;
    let failCount = 0;
    
    // Always migrate into the active database engine!
    if (useCloudDb) {
      for (const item of sandboxItems) {
        try {
          const docRef = doc(db, "projects", item.id);
          await setDoc(docRef, {
            id: item.id,
            title: item.title,
            category: item.category,
            thumbnail: item.thumbnail,
            videoUrl: item.videoUrl,
            description: item.description,
            metrics: item.metrics,
            createdAt: serverTimestamp()
          }, { merge: true });
          successCount++;
        } catch (err) {
          console.error(`Failed to migrate project ${item.id} from sandbox to custom DB:`, err);
          failCount++;
        }
      }
    } else {
      // Migrate directly into local storage!
      const localProjectsStr = localStorage.getItem("addictive_local_projects");
      const localProjects: WorkItem[] = localProjectsStr ? JSON.parse(localProjectsStr) : [];
      const updatedProjects = [...localProjects];
      
      for (const item of sandboxItems) {
        if (!updatedProjects.some(p => p.id === item.id)) {
          updatedProjects.push(item);
        }
        successCount++;
      }
      
      localStorage.setItem("addictive_local_projects", JSON.stringify(updatedProjects));
      
      const localIds = new Set(updatedProjects.map(item => item.id));
      const merged = [
        ...updatedProjects,
        ...WORK_ITEMS.filter(defaultItem => !localIds.has(defaultItem.id))
      ];
      setAllWorkItems(merged);
    }
    
    setIsMigrating(false);
    if (failCount === 0) {
      setSuccessMsg(`🚀 Restored all ${successCount} previous database videos instantly!`);
    } else {
      setSuccessMsg(`✨ Restored ${successCount} previous videos. (${failCount} cloud authorization blocks skipped)`);
    }
    setTimeout(() => setSuccessMsg(""), 6000);
  };

  // Filter out any soft-deleted items from the display lists
  const displayedWorkItems = useMemo(() => {
    return allWorkItems.filter(item => !localDeletedSet.has(item.id));
  }, [allWorkItems, localDeletedSet]);

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

  // Statistics counters
  const totalProjects = displayedWorkItems.length;
  const shortFormCount = shortFormItems.length;
  const longFormCount = longFormItems.length;

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Use selected preset or custom values
    const assetPreset = aestheticPresets[selectedPresetIndex];
    const finalThumb = customThumbUrl.trim() || assetPreset.thumb;
    const finalVideo = customVideoUrl.trim() || assetPreset.video;

    const projectId = isEditingId || ("proj-" + Date.now());
    const projectData: WorkItem = {
      id: projectId,
      title: newTitle,
      category: newCategory,
      thumbnail: finalThumb,
      videoUrl: finalVideo,
      description: newDescription.trim() || "Professional content project created for audience growth and engagement.",
      metrics: newMetrics.trim() || "Audience Engagement"
    };

    if (useCloudDb) {
      if (!isAuthorizedAdmin) {
        setSuccessMsg("❌ Cloud Error: Google Admin login required to write to global database. Switch to 'Local Storage' to save without restriction.");
        setTimeout(() => setSuccessMsg(""), 6000);
        return;
      }

      try {
        const docRef = doc(db, "projects", projectId);
        await setDoc(docRef, {
          ...projectData,
          createdAt: serverTimestamp()
        }, { merge: true });

        // Also mirror to local storage
        const localProjectsStr = localStorage.getItem("addictive_local_projects");
        const localProjects: WorkItem[] = localProjectsStr ? JSON.parse(localProjectsStr) : [];
        const filtered = localProjects.filter(p => p.id !== projectId);
        localStorage.setItem("addictive_local_projects", JSON.stringify([...filtered, projectData]));
      } catch (err) {
        console.error("Failed to save project to Firestore:", err);
        setSuccessMsg("❌ Cloud Action Denied. Ensure authentic executive Google sign-in.");
        setTimeout(() => setSuccessMsg(""), 5000);
        return;
      }
    } else {
      // Save directly to Local Storage
      const localProjectsStr = localStorage.getItem("addictive_local_projects");
      const localProjects: WorkItem[] = localProjectsStr ? JSON.parse(localProjectsStr) : [];
      const filtered = localProjects.filter(p => p.id !== projectId);
      const updatedProjects = [...filtered, projectData];
      localStorage.setItem("addictive_local_projects", JSON.stringify(updatedProjects));

      // Update state instantly for real-time responsiveness
      const localIds = new Set(updatedProjects.map(item => item.id));
      const merged = [
        ...updatedProjects,
        ...WORK_ITEMS.filter(defaultItem => !localIds.has(defaultItem.id))
      ];
      setAllWorkItems(merged);
    }

    // Reset Form
    setNewTitle("");
    setNewMetrics("");
    setNewDescription("");
    setCustomThumbUrl("");
    setCustomVideoUrl("");
    setUploadedThumbName("");
    setUploadedVideoName("");
    setThumbSource("url");
    setVideoSource("url");
    setIsEditingId(null);
    setSuccessMsg(isEditingId ? "✨ Project updated successfully." : "✨ Project added successfully.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleDeleteProject = async (id: string) => {
    if (useCloudDb) {
      if (!isAuthorizedAdmin) {
        setSuccessMsg("❌ Cloud Error: Google Admin login required to hide from UI. Switch to 'Local Storage' to edit without restriction.");
        setTimeout(() => setSuccessMsg(""), 6000);
        return;
      }
    }

    // Soft-delete from UI UX only: add to localDeletedSet and save to local storage
    const updatedDeletedSet = new Set(localDeletedSet);
    updatedDeletedSet.add(id);
    setLocalDeletedSet(updatedDeletedSet);
    localStorage.setItem("addictive_local_deleted", JSON.stringify(Array.from(updatedDeletedSet)));

    setSuccessMsg("🗑️ Video hidden from UI UX. Data remains fully preserved in the database!");
    setTimeout(() => setSuccessMsg(""), 4000);
    if (playingVideoId === id) setPlayingVideoId(null);
  };

  const handleResetToDefault = async () => {
    if (useCloudDb) {
      if (!isAuthorizedAdmin) {
        setSuccessMsg("❌ Cloud Error: Google Admin login required. Switch to 'Local Storage' to reset without restriction.");
        setTimeout(() => setSuccessMsg(""), 5000);
        return;
      }
      if (window.confirm("Restore default showcasing agency portfolio items globally in Firestore? This replaces it for all worldwide viewers!")) {
        try {
          setSuccessMsg("⏳ Resetting cloud showcase data...");
          
          // Clear any UI deleted state as well
          localStorage.removeItem("addictive_local_deleted");
          setLocalDeletedSet(new Set());

          for (const item of WORK_ITEMS) {
            const docRef = doc(db, "projects", item.id);
            await setDoc(docRef, {
              id: item.id,
              title: item.title,
              category: item.category,
              thumbnail: item.thumbnail,
              videoUrl: item.videoUrl || "",
              description: item.description,
              metrics: item.metrics,
              createdAt: serverTimestamp()
            });
          }
          setSuccessMsg("🔄 Default portfolio restored globally in Firestore.");
          setTimeout(() => setSuccessMsg(""), 4000);
        } catch (err) {
          console.error("Failed to reset database:", err);
          setSuccessMsg("❌ Cloud Reset Denied. Ensure your signed-in Google email matches.");
          setTimeout(() => setSuccessMsg(""), 4000);
        }
      }
    } else {
      if (window.confirm("Restore default showcasing agency portfolio items locally? This clears your custom local creations!")) {
        localStorage.removeItem("addictive_local_projects");
        localStorage.removeItem("addictive_local_deleted");
        setLocalDeletedSet(new Set());
        
        // Reload default items instantly
        setAllWorkItems(WORK_ITEMS);
        setSuccessMsg("🔄 Local portfolio restored to defaults successfully.");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    }
  };

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

          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-3">
              {/* Elegant Toggle Button for Client Dashboard */}
              <button
                onClick={() => {
                  if (isOwner) {
                    setShowControlCenter(!showControlCenter);
                  } else {
                    setShowAuthModal(true);
                  }
                }}
                className="group relative px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
                id="dashboard-toggle-btn"
              >
                <Sliders className="w-4 h-4 text-accent-orange group-hover:rotate-45 transition-transform" />
                {isOwner 
                  ? (showControlCenter ? "Hide Project Editor" : "Open Portfolio Manager") 
                  : "Owner Access 🔒"}
              </button>

              {/* Safe Lock / Log Out button if authenticated */}
              {isOwner && (
                <button
                  onClick={handleLogOutOwner}
                  className="px-5 py-3 rounded-full border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 font-bold"
                  title="Lock Dashboard Session"
                >
                  <Check className="w-3.5 h-3.5 text-accent-purple" />
                  <span>Lock Session (Log Out)</span>
                </button>
              )}
            </div>

            {/* Subtle disclaimer message if not authenticated */}
            {!isOwner ? (
              <span className="text-[10px] font-mono text-neutral-500 tracking-wider">
                🔒 Protected workspace for authorized administrators only
              </span>
            ) : (
              <span className="text-[10px] font-mono text-white tracking-wider flex items-center gap-2 flex-wrap">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-purple animate-pulse shrink-0" />
                {currentUser?.photoURL && (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || "Owner avatar"}
                    className="w-5 h-5 rounded-full border border-neutral-800 object-cover shrink-0 select-none"
                    referrerPolicy="no-referrer"
                  />
                )}
                <span>
                  Admin Session Active ({currentUser?.displayName || currentUser?.email || "Passkey User"})
                </span>
                {isAuthorizedAdmin ? (
                  <span className="px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-white text-[9px] uppercase tracking-wider font-extrabold font-mono shrink-0">
                    Full Admin Write
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-white text-[9px] uppercase tracking-wider font-extrabold font-mono shrink-0 animate-pulse">
                    View-Only Mode
                  </span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Live Project Workspace Central Admin Drawer */}
        {showControlCenter && (
          <div className="mb-20 p-6 md:p-8 rounded-none bg-neutral-950 border border-neutral-900 shadow-none relative overflow-hidden">
            
            {/* Database Engine Sync Mode Controller */}
            <div className="mb-8 pb-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3 text-left">
                <div className={`p-2.5 rounded-xl ${useCloudDb ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  <Database className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Storage Engine Status</h4>
                  <p className="text-[10px] text-neutral-400 font-sans mt-0.5 max-w-lg">
                    {useCloudDb 
                      ? "🌐 Cloud Sync Active: Streaming globally from live Firebase Firestore. Requires Google executive credentials to make changes." 
                      : "💾 Local Sandbox Active: Saving instantly inside your browser's persistent database. 100% offline-safe, no password locks!"}
                  </p>
                </div>
              </div>
              <div className="flex bg-neutral-900/60 p-1 rounded-xl border border-neutral-800 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setUseCloudDb(false);
                    localStorage.setItem("addictive_use_cloud_db", "false");
                    setSuccessMsg("💾 Local sandbox storage enabled! You can now add, edit, and delete projects without restriction.");
                    setTimeout(() => setSuccessMsg(""), 5000);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    !useCloudDb
                      ? "bg-rose-500 text-white font-extrabold shadow-md"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  Local Sandbox (No Auth)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUseCloudDb(true);
                    localStorage.setItem("addictive_use_cloud_db", "true");
                    setSuccessMsg("🌐 Firebase cloud storage enabled! Authenticate as Admin to update globally.");
                    setTimeout(() => setSuccessMsg(""), 5000);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    useCloudDb
                      ? "bg-indigo-600 text-white font-extrabold shadow-md"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  Cloud Firebase
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
              
              {/* Column 1: Add New Project Form */}
              <div className="lg:w-5/12 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
                <div className="flex items-center gap-2.5 mb-6">
                  {isEditingId ? (
                    <FileEdit className="w-5 h-5 text-purple-400 animate-pulse" />
                  ) : (
                    <Plus className="w-5 h-5 text-rose-400" />
                  )}
                  <h3 className="text-lg md:text-xl font-display font-black text-white tracking-tight uppercase">
                    {isEditingId ? "Edit Project Details" : "Add New Project"}
                  </h3>
                  {isEditingId && (
                    <span className="text-[9px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase font-bold animate-pulse">
                      Editing
                    </span>
                  )}
                </div>

                <form onSubmit={handleAddProject} className="space-y-4 font-sans">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono font-bold mb-1.5">Project Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyper-Scale Shopify Creative"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-neutral-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono font-bold mb-1.5">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-neutral-300 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                      >
                        <option value="shorts">Short Form Edit</option>
                        <option value="reels">IG Reel Concept</option>
                        <option value="ads">Ad Placement</option>
                        <option value="youtube">Long Form Video</option>
                        <option value="campaigns">Marketing Campaign</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono font-bold mb-1.5">Results / Metrics</label>
                      <input
                        type="text"
                        placeholder="e.g. +340K Views"
                        value={newMetrics}
                        onChange={(e) => setNewMetrics(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono font-bold mb-1.5">Media Presets</label>
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2">
                      {aestheticPresets.map((preset, i) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setSelectedPresetIndex(i);
                            setCustomThumbUrl("");
                            setCustomVideoUrl("");
                          }}
                          className={`px-1.5 py-2.5 rounded-lg border text-center transition-all ${
                            selectedPresetIndex === i && !customThumbUrl
                              ? "border-rose-500 bg-rose-500/10 text-rose-300"
                              : "border-white/5 bg-white/[0.01] hover:bg-white/5 text-neutral-400 text-xs"
                          }`}
                          title={preset.name}
                        >
                          <div className="text-[10px] font-mono leading-tight truncate">Preset {i+1}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Thumbnail Selector & Upload Dropzone */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono font-bold">
                        Project Thumbnail (Optional)
                      </label>
                      <div className="flex gap-1.5" id="thumb-input-type-togglers">
                        <button
                          type="button"
                          onClick={() => setThumbSource("url")}
                          className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            thumbSource === "url"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold"
                              : "bg-white/[0.02] text-neutral-500 hover:text-neutral-300"
                          }`}
                        >
                          Paste URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setThumbSource("file")}
                          className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            thumbSource === "file"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold"
                              : "bg-white/[0.02] text-neutral-500 hover:text-neutral-300"
                          }`}
                        >
                          Upload File 📤
                        </button>
                      </div>
                    </div>

                    {thumbSource === "url" ? (
                      <div className="relative">
                        <input
                          type="text"
                          id="thumb-text-url-input"
                          placeholder="Or paste custom image URL..."
                          value={customThumbUrl.startsWith("data:") ? "" : customThumbUrl}
                          onChange={(e) => setCustomThumbUrl(e.target.value)}
                          className="w-full px-4 py-2 bg-white/[0.01] border border-white/10 text-white text-xs rounded-lg focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-neutral-600 font-mono"
                        />
                        {customThumbUrl && !customThumbUrl.startsWith("data:") && (
                          <span className="absolute right-2.5 top-2 text-[9px] text-emerald-400 font-mono flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Linked
                          </span>
                        )}
                      </div>
                    ) : (
                      <div
                        id="thumb-drag-drop-zone"
                        onClick={() => thumbInputRef.current?.click()}
                        onDragOver={handleDragOverThumb}
                        onDragLeave={handleDragLeaveThumb}
                        onDrop={handleDropThumb}
                        className={`group relative py-6 px-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                          isDraggingThumb
                            ? "border-purple-500 bg-purple-500/10 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                            : "border-white/10 bg-white/[0.01] hover:border-purple-500/30 hover:bg-white/[0.03] text-neutral-400"
                        }`}
                      >
                        <input
                          ref={thumbInputRef}
                          type="file"
                          id="thumb-file-native-input"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleThumbFileChange(e.target.files?.[0] || null)}
                        />
                        
                        {customThumbUrl && customThumbUrl.startsWith("data:") ? (
                          <div className="flex flex-col items-center gap-1">
                            {/* Small circular preview */}
                            <img
                              src={customThumbUrl}
                              alt="preview"
                              className="w-10 h-10 object-cover rounded-md border border-purple-500/30 mb-1 mx-auto"
                              referrerPolicy="no-referrer"
                            />
                            <span className="text-[10px] font-mono text-emerald-400 font-bold truncate max-w-[200px]" title={uploadedThumbName}>
                              ✓ {uploadedThumbName || "Image Uploaded"}
                            </span>
                            <span className="text-[8px] font-mono text-amber-400 text-center px-2">
                              ⚠️ Converts to base64 string. Must stay under 1MB due to database rules.
                            </span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-neutral-500 group-hover:text-purple-400 transition-colors animate-pulse mx-auto" />
                            <span className="text-[10px] font-mono text-neutral-300 text-center">
                              Drag & drop image here or <span className="text-purple-400 font-bold group-hover:underline">browse</span>
                            </span>
                            <span className="text-[8px] font-mono text-white/40">Converts to base64 (Max 1MB)</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Video Selector & Upload Dropzone */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono font-bold">
                        Project MP4 Video Stream (Optional)
                      </label>
                      <div className="flex gap-1.5" id="video-input-type-togglers">
                        <button
                          type="button"
                          onClick={() => setVideoSource("url")}
                          className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            videoSource === "url"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold"
                              : "bg-white/[0.02] text-neutral-500 hover:text-neutral-300"
                          }`}
                        >
                          Paste URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setVideoSource("file")}
                          className={`px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            videoSource === "file"
                              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold"
                              : "bg-white/[0.02] text-neutral-500 hover:text-neutral-300"
                          }`}
                        >
                          Upload File 📹
                        </button>
                      </div>
                    </div>

                    {videoSource === "url" ? (
                      <div className="relative">
                        <input
                          type="text"
                          id="video-text-url-input"
                          placeholder="Or paste custom MP4 URL..."
                          value={customVideoUrl.startsWith("blob:") ? "" : customVideoUrl}
                          onChange={(e) => setCustomVideoUrl(e.target.value)}
                          className="w-full px-4 py-2 bg-white/[0.01] border border-white/10 text-white text-xs rounded-lg focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-neutral-600 font-mono"
                        />
                        {customVideoUrl && !customVideoUrl.startsWith("blob:") && (
                          <span className="absolute right-2.5 top-2 text-[9px] text-emerald-400 font-mono flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Linked
                          </span>
                        )}
                      </div>
                    ) : (
                      <div
                        id="video-drag-drop-zone"
                        onClick={() => videoInputRef.current?.click()}
                        onDragOver={handleDragOverVideo}
                        onDragLeave={handleDragLeaveVideo}
                        onDrop={handleDropVideo}
                        className={`group relative py-6 px-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                          isDraggingVideo
                            ? "border-purple-500 bg-purple-500/10 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                            : "border-white/10 bg-white/[0.01] hover:border-purple-500/30 hover:bg-white/[0.03] text-neutral-400"
                        }`}
                      >
                        <input
                          ref={videoInputRef}
                          type="file"
                          id="video-file-native-input"
                          accept="video/mp4,video/quicktime,video/*"
                          className="hidden"
                          onChange={(e) => handleVideoFileChange(e.target.files?.[0] || null)}
                        />
                        
                        {customVideoUrl && customVideoUrl.startsWith("blob:") ? (
                          <div className="flex flex-col items-center gap-1 p-2">
                             <div className="w-10 h-10 rounded-md border border-amber-500/30 mb-1 bg-amber-950/20 flex items-center justify-center mx-auto">
                              <Video className="w-4 h-4 text-amber-300" />
                            </div>
                            <span className="text-[10px] font-mono text-amber-400 font-bold truncate max-w-[200px]" title={uploadedVideoName}>
                              ✓ {uploadedVideoName || "Local Video Loaded"}
                            </span>
                            <span className="text-[9px] font-sans text-amber-300 text-center leading-snug max-w-[240px]">
                              ⚠️ <strong>Temporary Local Preview Only</strong>. This file will not play for others or after a page refresh. For permanent public streaming, switch to <strong>"Paste URL"</strong> using a direct cloud link!
                            </span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-neutral-500 group-hover:text-purple-400 transition-colors animate-pulse mx-auto" />
                            <span className="text-[10px] font-mono text-neutral-300 text-center">
                              Create local preview or <span className="text-purple-400 font-bold group-hover:underline">browse</span>
                            </span>
                            <span className="text-[8px] font-mono text-amber-400">⚠️ Local file won't sync permanently to others</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono font-bold mb-1.5">Project Description</label>
                    <textarea
                      rows={2}
                      placeholder="Describe the project, content style, results, or goals."
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-neutral-600 resize-none"
                    />
                  </div>

                  <div className="flex gap-2.5">
                    {isEditingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingId(null);
                          setNewTitle("");
                          setNewMetrics("");
                          setNewDescription("");
                          setCustomThumbUrl("");
                          setCustomVideoUrl("");
                          setUploadedThumbName("");
                          setUploadedVideoName("");
                          setThumbSource("url");
                          setVideoSource("url");
                        }}
                        className="w-1/3 py-3 border border-white/10 hover:bg-white/5 active:scale-[0.98] transition-all rounded-xl text-neutral-300 font-mono text-xs uppercase tracking-wider font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className={`py-3 bg-gradient-to-r from-purple-500 to-rose-500 hover:opacity-90 active:scale-[0.98] transition-all rounded-xl text-white font-mono text-xs uppercase tracking-widest font-extrabold cursor-pointer ${
                        isEditingId ? "w-2/3" : "w-full"
                      }`}
                    >
                      {isEditingId ? "Apply Changes" : "Add to Creative Feed"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Column 2: Live Database Workspace & Performance Stats */}
              <div className="lg:w-7/12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lmd md:text-xl font-display font-black text-white tracking-tight uppercase">
                        Current Portfolio Projects
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {localDeletedSet.size > 0 && (
                        <button
                          onClick={() => {
                            localStorage.removeItem("addictive_local_deleted");
                            setLocalDeletedSet(new Set());
                            setSuccessMsg("🔄 Restored all hidden videos back to the UI UX!");
                            setTimeout(() => setSuccessMsg(""), 4000);
                          }}
                          className="px-3 py-1 rounded-md border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/15 hover:border-purple-500/40 text-purple-400 transition-colors font-mono text-[10px]"
                        >
                          Unhide All ({localDeletedSet.size})
                        </button>
                      )}
                      <button
                        onClick={handleResetToDefault}
                        className="px-3 py-1 rounded-md border border-white/10 bg-white/5 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 transition-colors font-mono text-[10px] text-neutral-400"
                      >
                        Restore Default Portfolio
                      </button>
                    </div>
                  </div>

                  {/* Dashboard stats badges */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                      <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">Total Projects</span>
                      <span className="text-xl md:text-2xl font-display font-black text-white">{totalProjects}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                      <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">Short-Form</span>
                      <span className="text-xl md:text-2xl font-display font-black text-rose-400">{shortFormCount}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                      <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">Long-Form</span>
                      <span className="text-xl md:text-2xl font-display font-black text-indigo-400">{longFormCount}</span>
                    </div>
                  </div>

                  {sandboxItems.length > 0 && (
                    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/20 to-neutral-950/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_8px_30px_rgba(139,92,246,0.12)]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-400 font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                          <span>Playground recovery engine</span>
                        </div>
                        <h4 className="text-xs font-bold text-white tracking-tight">
                          Found {sandboxItems.length} videos from your earlier session!
                        </h4>
                        <p className="text-[10px] text-neutral-400 leading-normal max-w-sm font-sans">
                          You changed your site's Firebase database, leaving your playground database entries safe but uncopied. Push the button to immediately migrate those items into your live, active Firestore!
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleMigrateSandboxItems}
                        disabled={isMigrating}
                        className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shadow-md shrink-0 focus:outline-none"
                      >
                        {isMigrating ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Database className="w-3.5 h-3.5" />
                        )}
                        <span>{isMigrating ? "Migrating..." : "Restore Videos"}</span>
                      </button>
                    </div>
                  )}

                  {successMsg && (
                    <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] text-center">
                      {successMsg}
                    </div>
                  )}

                  {/* List of current projects with inline actions */}
                  <div className="space-y-2 max-h-[290px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                    {displayedWorkItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 flex items-center justify-between gap-4 transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                            referrerPolicy="referrer"
                          />
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[7px] uppercase font-mono text-purple-400 font-bold">
                                {item.category}
                              </span>
                              <span className="text-[9px] font-mono text-emerald-400 font-bold">{item.metrics}</span>
                            </div>
                            <h4 className="text-xs md:text-sm font-semibold text-white/90 truncate mt-0.5">{item.title}</h4>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setIsEditingId(item.id);
                              setNewTitle(item.title);
                              setNewCategory(item.category as any);
                              setNewMetrics(item.metrics || "");
                              setNewDescription(item.description || "");
                              setCustomThumbUrl(item.thumbnail || "");
                              setCustomVideoUrl(item.videoUrl || "");
                              setUploadedThumbName("");
                              setUploadedVideoName("");
                              setThumbSource("url");
                              setVideoSource("url");
                            }}
                            className={`p-2 rounded-lg transition-colors cursor-pointer ${
                              isEditingId === item.id 
                                ? "bg-purple-500/20 text-purple-300" 
                                : "hover:bg-purple-500/10 hover:text-purple-400 text-neutral-500"
                            }`}
                            title="Edit Project details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(item.id)}
                            className="p-2 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 text-neutral-500 transition-colors cursor-pointer"
                            title="Delete Asset"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {displayedWorkItems.length === 0 && (
                      <div className="text-center py-8 font-mono text-neutral-600 text-xs">
                        No projects found in database. Add one above!
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-neutral-500 mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 justify-center">
                  <Database className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span>Real-time cloud synchronization securely backed by Firebase Firestore database.</span>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* SECTION 1: SHORT FORM EDITS */}
        <div className="space-y-4 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 px-2">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-rose-500" />
              <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight">
                Short Form Edits
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              OPTIMIZED FOR INSTANT VIEW RETENTION // 9:16 FEED
            </span>
          </div>
          
          <ScrollableRow 
            items={shortFormItems} 
            isVertical={true} 
            playingVideoId={playingVideoId}
            setPlayingVideoId={setPlayingVideoId}
            isMutedGlobal={isMutedGlobal}
            setIsMutedGlobal={setIsMutedGlobal}
          />
        </div>

        {/* SECTION 2: LONG FORM EDITS */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 px-2">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-indigo-500" />
              <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight">
                Long Form Edits
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              OPTIMIZED FOR YOUTUBE SYSTEM ALGORITHMS // 16:9 SCREEN
            </span>
          </div>

          <ScrollableRow 
            items={longFormItems} 
            isVertical={false} 
            playingVideoId={playingVideoId}
            setPlayingVideoId={setPlayingVideoId}
            isMutedGlobal={isMutedGlobal}
            setIsMutedGlobal={setIsMutedGlobal}
          />
        </div>

        {/* Dynamic Owner Authenticator Modal in AnimatePresence */}
        <AnimatePresence>
          {showAuthModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-dark-card border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] text-left"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    setAuthError("");
                    setEnteredPasskey("");
                    setPasswordInput("");
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors cursor-pointer focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header context */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
                  <span className="font-mono text-[10px] tracking-[0.25em] text-purple-400 font-bold uppercase">
                    Security Gate
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight mb-2">
                  Verify Owner Authority
                </h3>
                <p className="text-neutral-400 text-xs font-sans font-light leading-relaxed mb-5">
                  Access to the Live Attention Portfolio Studio is locked. Select your preferred verification path to gain editing credentials.
                </p>

                {/* AI Studio / Localhost Instant Developer Access Bypass */}
                {typeof window !== "undefined" && (
                  window.location.hostname.includes("run.app") ||
                  window.location.hostname.includes("localhost") ||
                  window.location.hostname.includes("127.0.0.1") ||
                  window.location.hostname.includes("webcontainer") ||
                  window.location.hostname.includes("stackblitz")
                ) && (
                  <div className="mb-5 p-3.5 rounded-xl bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-transparent border border-purple-500/30 text-left shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                    <div className="flex items-center gap-1.5 text-purple-400 font-mono text-[9px] uppercase tracking-wider font-extrabold mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      <span>AI Studio Workspace Bypass Detected</span>
                    </div>
                    <p className="text-[10px] text-neutral-300 mb-2.5 font-sans leading-normal">
                      Security cookies/popups are restricted inside development frames. Grant yourself immediate Master Admin rights with one click:
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPasskeyVerified(true);
                        localStorage.setItem("addictive_owner_auth", "true");
                        setSuccessMsg("⚡ Welcome, Developer! Authenticated as Master Admin.");
                        setShowAuthModal(false);
                        setShowControlCenter(true);
                        setAuthError("");
                        setTimeout(() => setSuccessMsg(""), 5000);
                      }}
                      className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 text-white font-mono text-[10px] uppercase font-black tracking-widest hover:opacity-95 transition-opacity cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <span>🔓 Grant Instant admin Access</span>
                    </button>
                  </div>
                )}

                {/* Authentication Method Tabs */}
                <div className="flex bg-white/[0.03] border border-white/5 rounded-xl p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => { setAuthMethod("google"); setAuthError(""); }}
                    className={`flex-1 py-1.5 rounded-lg text-center font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                      authMethod === "google"
                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    Google Auth
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMethod("email"); setAuthError(""); }}
                    className={`flex-1 py-1.5 rounded-lg text-center font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                      authMethod === "email"
                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    Email/Password
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMethod("passkey"); setAuthError(""); }}
                    className={`flex-1 py-1.5 rounded-lg text-center font-mono text-[10px] uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                      authMethod === "passkey"
                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    Local Passkey
                  </button>
                </div>

                {/* Google Authentication Method */}
                {authMethod === "google" && (
                  <div className="space-y-4">
                    <p className="text-xs text-neutral-400 leading-normal">
                      Logs you in securely with your Google account. This requires your site URL to be registered in the Google API console settings.
                    </p>
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full py-3 rounded-xl bg-white text-black hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2.5 font-sans font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg"
                      id="google-signin-btn"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span>Verify with Google Sign-In</span>
                    </button>
                  </div>
                )}

                {/* Email/Password Method */}
                {authMethod === "email" && (
                  <form onSubmit={handleEmailPasswordSignIn} className="space-y-4">
                    <p className="text-xs text-neutral-400 leading-normal">
                      <strong>Foolproof alternative!</strong> Sign in with email & password. This does <strong>NOT</strong> require any domain Whitelisting and works on Netlify or AI Studio.
                    </p>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono font-bold mb-1.5 text-left">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={emailInput}
                        onChange={(e) => {
                          setEmailInput(e.target.value);
                          if (authError) setAuthError("");
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono font-bold mb-1.5 text-left">
                        Account Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          if (authError) setAuthError("");
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors font-mono tracking-widest"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:opacity-90 font-mono text-xs uppercase tracking-widest font-extrabold text-white cursor-pointer"
                    >
                      Log in with Password
                    </button>
                  </form>
                )}

                {/* Passkey Method */}
                {authMethod === "passkey" && (
                  <form onSubmit={handleVerifyPasskey} className="space-y-4">
                    <p className="text-xs text-neutral-400 leading-normal">
                      Unlock control options using your pre-configured local owner access key.
                    </p>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 font-mono font-bold mb-2">
                        Owner Passkey
                      </label>
                      <input
                        type="password"
                        required
                        autoFocus
                        placeholder="••••••••••••"
                        value={enteredPasskey}
                        onChange={(e) => {
                          setEnteredPasskey(e.target.value);
                          if (authError) setAuthError("");
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-neutral-700 font-mono tracking-widest text-center"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:opacity-90 font-mono text-xs uppercase tracking-widest font-extrabold text-white cursor-pointer"
                    >
                      Unlock Gate
                    </button>
                  </form>
                )}

                {authError && (
                  <p className="text-xs text-rose-400 font-mono font-medium text-center bg-rose-500/5 py-2 px-3 mt-4 rounded-xl border border-rose-500/15 leading-relaxed overflow-hidden text-ellipsis whitespace-normal text-wrap max-w-full">
                    ⚠ {authError}
                  </p>
                )}

                <div className="mt-6 pt-4 border-t border-white/5 text-[9px] font-mono text-neutral-600 text-center leading-normal">
                  Authenticating lets you add, edit, and reorganize projects instantly.
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
