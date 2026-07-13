import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Paperclip,
  Flame,
  Maximize,
  Check,
  CheckCheck
} from "lucide-react";

interface ChatMessage {
  sender: "client" | "me";
  text: string;
  time?: string;
  isFile?: boolean;
}

interface ReviewPhotoSlot {
  id: number;
  messages: ChatMessage[];
  highlightQuote: string;
  accentColor: string; // Used for unique border/glow differentiation
}

function ChatScreenshotCard({ slot }: { slot: ReviewPhotoSlot; key?: any }) {
  return (
    <div 
      className="w-[290px] sm:w-[330px] h-[360px] flex-shrink-0 bg-[#0d0d11] rounded-2xl flex flex-col justify-between overflow-hidden select-none transition-all duration-300 hover:scale-[1.02] mx-3 text-left relative"
      style={{
        border: `1px solid ${slot.accentColor}25`,
        boxShadow: `0 10px 30px -10px rgba(0,0,0,0.7), 0 0 20px -5px ${slot.accentColor}15`
      }}
    >
      {/* Accent Indicator Bar on Left */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1" 
        style={{ backgroundColor: slot.accentColor }}
      />

      {/* Chat Conversation Canvas - Purely the messaging part */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-b from-neutral-950/60 to-neutral-950/90 relative">
        
        {/* Decorative Grid Mesh Background to look like a screenshot texture */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Message Thread container */}
        <div className="space-y-3.5 overflow-y-auto scrollbar-none flex-1 flex flex-col justify-center relative z-10 pr-1">
          {slot.messages.map((msg, idx) => {
            const isMe = msg.sender === "me";
            return (
              <div
                key={idx}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[11px] sm:text-[12px] leading-relaxed break-words relative shadow-md transition-all ${
                    isMe
                      ? "bg-[#0b5c43] text-neutral-100 rounded-tr-none border-t border-r border-[#0e7456]/40"
                      : "bg-[#212e36] text-neutral-200 rounded-tl-none border-t border-l border-[#2e3f4a]/40"
                  }`}
                >
                  {msg.isFile ? (
                    <div className="flex items-center gap-2 border border-white/5 rounded-xl p-2 bg-black/40 text-left">
                      <div className="w-7 h-7 rounded bg-neutral-900 flex items-center justify-center shrink-0 border border-white/5">
                        <Paperclip className="w-3.5 h-3.5 text-neutral-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-mono truncate text-white underline decoration-white font-medium">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line font-light tracking-wide">{msg.text}</p>
                  )}
                  
                  {/* Subtle realistic timestamp + read receipts */}
                  <div className="flex items-center justify-end gap-1 mt-1 text-[8px] text-white/45 font-mono select-none">
                    <span>{msg.time || "11:42 AM"}</span>
                    {isMe && (
                      <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quote Highlight Footer with thin dividers */}
      <div className="bg-[#08080b] py-3.5 px-4 border-t border-white/5 flex items-center justify-center text-center relative z-10 shrink-0">
        <p className="text-[11px] sm:text-[12px] font-medium italic text-neutral-300 font-sans tracking-wide leading-relaxed">
          "{slot.highlightQuote}"
        </p>
      </div>
    </div>
  );
}

export default function ClientVerdicts() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [durationTime, setDurationTime] = useState("0:00");
  const videoRef = useRef<HTMLVideoElement>(null);

  // High-fidelity screenshot datasets with distinct aesthetic colors
  const slots: ReviewPhotoSlot[] = [
    {
      id: 1,
      accentColor: "#8b5cf6", // Purple
      messages: [
        { sender: "client", text: "you can proceed with the remaining videos", time: "6:09 AM" },
        { sender: "me", text: "Alright man appreciate you", time: "6:09 AM" },
        { sender: "me", text: "Will start on the remaining ones", time: "6:11 PM" },
        { sender: "client", text: "Great brother", time: "6:16 AM" }
      ],
      highlightQuote: "Great brother."
    },
    {
      id: 2,
      accentColor: "#f43f5e", // Orange
      messages: [
        { sender: "client", text: "And can you get 2 versions of this video please 1 just like it is and 2nd with nba highlights behind", time: "5:50 AM" },
        { sender: "client", text: "Thank you bro fire video", time: "5:52 AM" },
        { sender: "client", text: "That's it", time: "5:54 AM" },
        { sender: "me", text: "Alright give me like 15 mins man", time: "5:56 AM" }
      ],
      highlightQuote: "Thank you bro fire video."
    },
    {
      id: 3,
      accentColor: "#fbbf24", // Gold
      messages: [
        { sender: "client", text: "wow brother, i love it", time: "6:08 AM" },
        { sender: "client", text: "you can proceed with the remaining videos", time: "6:09 AM" },
        { sender: "me", text: "Alright man appreciate you", time: "6:10 AM" },
        { sender: "me", text: "Will start on the remaining ones", time: "6:11 AM" },
        { sender: "client", text: "Great brother", time: "6:16 AM" }
      ],
      highlightQuote: "Wow brother, I love it."
    },
    {
      id: 4,
      accentColor: "#10b981", // Emerald
      messages: [
        { sender: "client", text: "Started right here. at min 5:05", time: "1:08 PM" },
        { sender: "me", text: "need to remove one IN?", time: "1:10 PM" },
        { sender: "client", text: "yah he repeats", time: "1:11 PM" },
        { sender: "me", text: "okkk", time: "1:11 PM" },
        { sender: "client", text: "yoo", time: "1:36 PM" },
        { sender: "me", text: "yea man", time: "1:44 PM" },
        { sender: "me", text: "everything's uploaded", time: "1:46 PM" },
        { sender: "client", text: "got it", time: "1:50 PM" },
        { sender: "client", text: "I reviewed it, and it looks very good. Good job.", time: "1:59 PM" },
        { sender: "me", text: "alright", time: "2:00 PM" },
        { sender: "me", text: "We could move on thr next then", time: "2:01 PM" }
      ],
      highlightQuote: "It looks very good. Good job."
    },
    {
      id: 5,
      accentColor: "#3b82f6", // Blue
      messages: [
        { sender: "me", text: "Hey man", time: "4:15 AM" },
        { sender: "me", text: "Here is the edit", time: "4:18 AM" },
        { sender: "client", text: "Yes", time: "4:18 AM" },
        { sender: "client", text: "Whitelabel sfx.mp4", isFile: true, time: "4:18 AM" },
        { sender: "client", text: "I'm ready", time: "4:18 AM" },
        { sender: "me", text: "Lmk what you think bro", time: "4:19 AM" },
        { sender: "client", text: "i love it", time: "4:19 AM" }
      ],
      highlightQuote: "I love it."
    },
    {
      id: 6,
      accentColor: "#ec4899", // Pink
      messages: [
        { sender: "me", text: "https://drive.google.com/file...", isFile: true, time: "1:52 AM" },
        { sender: "me", text: "hey here it is, lmk about this", time: "1:54 AM" },
        { sender: "client", text: "I like this a lot, let me send over to client! I think you SNAPPED.", time: "1:58 AM" },
        { sender: "me", text: "Yessir delivered in 12 hours 😂💪", time: "1:59 AM" },
        { sender: "client", text: "Love it bro, if you can do more of this and stuff like that with quick delivery, I'll have TONS and I mean TONS of work for you.", time: "2:00 AM" }
      ],
      highlightQuote: "I think you SNAPPED."
    }
  ];

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
    <section id="testimonials" className="relative py-20 sm:py-32 bg-dark-bg overflow-hidden border-b border-white/5">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] purple-glow opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] orange-glow opacity-5 pointer-events-none" />

      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* Header - Styled elegantly matching the aesthetic */}
        <div className="w-full text-center mb-12 sm:mb-16 px-4">
          <div className="inline-block px-12 py-6 sm:py-8 rounded-3xl bg-[#09090b]/80 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden">
            {/* Ambient subtle glow inside */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-accent-orange/10 to-accent-gold/10 opacity-30 blur-xl pointer-events-none" />
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white leading-none relative z-10 select-none">
              Testimonials
            </h2>
          </div>
        </div>

        {/* MARQUEE OF CONVERSATIONS */}
        <div className="marquee-container w-full py-6 relative z-10 flex mb-16 sm:mb-24">
          {/* First track */}
          <div className="marquee-content flex">
            {slots.map((slot) => (
              <ChatScreenshotCard key={slot.id} slot={slot} />
            ))}
          </div>

          {/* Second track (exact duplicate) for seamless loop */}
          <div className="marquee-content flex" aria-hidden="true">
            {slots.map((slot) => (
              <ChatScreenshotCard key={`dup-${slot.id}`} slot={slot} />
            ))}
          </div>
        </div>

        {/* TESTIMONIAL VIDEO BELOW THE MARQUEE */}
        <div className="w-full max-w-3xl px-6 flex flex-col items-center">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              FEATURED TESTIMONIAL VIDEO
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full rounded-2xl p-0.5 bg-gradient-to-r from-white/5 to-white/0 border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative group overflow-hidden"
          >
            <div
              onClick={togglePlay}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] xs:aspect-video bg-black flex flex-col justify-between cursor-pointer"
            >
              {/* HTML5 Video */}
              <video
                ref={videoRef}
                src="/CLient testimonial.MP4"
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
                  <span>CLIENT TESTIMONIAL: PLAYING</span>
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
                      Video Testimonial & Client Success Breakdown
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
