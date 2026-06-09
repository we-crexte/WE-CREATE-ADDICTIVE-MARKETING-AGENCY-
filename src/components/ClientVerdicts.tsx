import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Star, 
  Flame, 
  Paperclip,
  Check
} from "lucide-react";

interface ChatMessage {
  sender: "client" | "me";
  text: string;
  time?: string;
  isFile?: boolean;
}

interface ReviewPhotoSlot {
  id: number;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  date: string;
  metric?: string;
  messages: ChatMessage[];
  highlightQuote: string;
  highlightText: string;
}

// High-fidelity Chat Replica rendered natively to perfectly mimic Slack/Telegram/WhatsApp chats
function ChatScreenshotReplica({ slot }: { slot: ReviewPhotoSlot }) {
  return (
    <div className="w-full h-full flex flex-col justify-between bg-dark-bg text-[#f4f4f5] font-sans antialiased relative rounded-2xl overflow-hidden border border-white/5">
      {/* Mini Chat Window Header */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-dark-card px-3 py-2.5 shrink-0 select-none">
        {/* Active Contact Marker */}
        <div className="relative">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-rose-500 text-white flex items-center justify-center font-bold text-[10px] uppercase shadow-inner">
            ✓
          </div>
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-black" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white tracking-wide truncate text-[11px] leading-tight">
            Verified Partner
          </p>
          <p className="text-[8px] text-purple-400 font-mono uppercase tracking-wider scale-95 origin-left font-bold">
            {slot.authorTitle}
          </p>
        </div>
        <span className="text-[8px] font-mono text-neutral-500 shrink-0">
          {slot.date}
        </span>
      </div>

      {/* Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 select-none bg-dark-bg flex flex-col justify-end">
        {slot.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              msg.sender === "me" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[88%] rounded-xl px-2.5 py-1.5 text-[10px] leading-relaxed break-words shadow-sm relative ${
                msg.sender === "me"
                  ? "bg-purple-600 text-white rounded-tr-none"
                  : "bg-dark-card text-[#f4f4f5] rounded-tl-none border border-white/[0.02]"
              }`}
            >
              {msg.isFile ? (
                <div className="flex items-center gap-2 border border-white/10 rounded-lg p-2 bg-black/40 text-left">
                  <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Paperclip className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-mono font-medium truncate text-white leading-normal underline decoration-[#007aff]">
                      {msg.text}
                    </p>
                    <p className="text-[7px] text-neutral-500 font-mono tracking-tight leading-none">
                      drive.google.com
                    </p>
                  </div>
                </div>
              ) : (
                <p className="whitespace-pre-line">{msg.text}</p>
              )}
              
              {/* Message Time and Status Marker */}
              {msg.time && (
                <div className="flex items-center justify-end gap-1 mt-1 text-[7px] text-white/40 font-mono leading-none">
                  <span>{msg.time}</span>
                  {msg.sender === "me" && (
                    <span className="flex items-center text-blue-300">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Immersive centered big screenshot quote highlight at bottom */}
      <div className="border-t border-white/5 bg-gradient-to-t from-dark-bg via-dark-card to-dark-bg/85 px-4 py-3 shrink-0 text-center select-none">
        <div className="relative inline-block px-1 py-1">
          {/* Accent quotes */}
          <span className="text-xl font-serif text-blue-400 leading-none absolute -top-1.5 -left-3">“</span>
          
          <p className="text-[11px] font-semibold text-white tracking-wide leading-snug">
            {slot.highlightQuote.includes(slot.highlightText) ? (
              <>
                {slot.highlightQuote.split(slot.highlightText)[0]}
                <span className="text-blue-400 font-bold">{slot.highlightText}</span>
                {slot.highlightQuote.split(slot.highlightText)[1]}
              </>
            ) : (
              slot.highlightQuote
            )}
          </p>

          <span className="text-xl font-serif text-blue-400 leading-none absolute -bottom-3.5 -right-3">”</span>
        </div>
      </div>
    </div>
  );
}

export default function ClientVerdicts() {
  const [videoSrc] = useState<string>("/VSL.mp4");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeSlotId, setActiveSlotId] = useState<number>(1);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Exact 6 screens modeled using the authentic client screenshots
  const [slots, setSlots] = useState<ReviewPhotoSlot[]>([
    {
      id: 1,
      authorName: "Verified Partner",
      authorTitle: "Youtube Client",
      authorAvatar: "✓",
      date: "6:16 AM",
      metric: "Proceeding with next",
      messages: [
        { sender: "client", text: "you can proceed with the remaining videos", time: "6:09 AM" },
        { sender: "me", text: "Alright man appreciate you", time: "6:09 AM" },
        { sender: "me", text: "Will start on the remaining ones", time: "6:11 PM" },
        { sender: "client", text: "Great brother", time: "6:16 AM" }
      ],
      highlightQuote: "Great brother.",
      highlightText: "brother."
    },
    {
      id: 2,
      authorName: "Verified Partner",
      authorTitle: "Video Partner",
      authorAvatar: "✓",
      date: "5:54 AM",
      metric: "Double Variant Deliver",
      messages: [
        { sender: "client", text: "And can you get 2 versions of this video please 1 just like it is and 2nd with nba highlights behind", time: "5:50 AM" },
        { sender: "client", text: "Thank you bro fire video", time: "5:52 AM" },
        { sender: "client", text: "That's it", time: "5:54 AM" },
        { sender: "me", text: "Alright give me like 15 mins man", time: "5:56 AM" }
      ],
      highlightQuote: "Thank you bro fire video.",
      highlightText: "fire video."
    },
    {
      id: 3,
      authorName: "Verified Partner",
      authorTitle: "High Retention Client",
      authorAvatar: "✓",
      date: "6:16 AM",
      metric: "Love it",
      messages: [
        { sender: "client", text: "wow brother, i love it", time: "6:08 AM" },
        { sender: "client", text: "you can proceed with the remaining videos", time: "6:09 AM" },
        { sender: "me", text: "Alright man appreciate you", time: "6:10 AM" },
        { sender: "me", text: "Will start on the remaining ones", time: "6:11 AM" },
        { sender: "client", text: "Great brother", time: "6:16 AM" }
      ],
      highlightQuote: "Wow brother, I love it.",
      highlightText: "I love it."
    },
    {
      id: 4,
      authorName: "Verified Partner",
      authorTitle: "Project Manager",
      authorAvatar: "✓",
      date: "2:01 PM",
      metric: "Approved edit",
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
      highlightQuote: "It looks very good. Good job.",
      highlightText: "very good."
    },
    {
      id: 5,
      authorName: "Verified Partner",
      authorTitle: "Whitelabel Partner",
      authorAvatar: "✓",
      date: "4:19 AM",
      metric: "Praise & Approved",
      messages: [
        { sender: "me", text: "Hey man", time: "4:15 AM" },
        { sender: "me", text: "Here is the edit", time: "4:18 AM" },
        { sender: "client", text: "Yes", time: "4:18 AM" },
        { sender: "client", text: "Whitelabel sfx.mp4", isFile: true, time: "4:18 AM" },
        { sender: "client", text: "I'm ready", time: "4:18 AM" },
        { sender: "me", text: "Lmk what you think bro", time: "4:19 AM" },
        { sender: "client", text: "i love it", time: "4:19 AM" }
      ],
      highlightQuote: "I love it",
      highlightText: "I love it"
    },
    {
      id: 6,
      authorName: "Verified Partner",
      authorTitle: "CEO, Growth Agency",
      authorAvatar: "✓",
      date: "2:00 AM",
      metric: "12h Delivery SLA",
      messages: [
        { sender: "me", text: "https://drive.google.com/file...", isFile: true, time: "1:52 AM" },
        { sender: "me", text: "hey here it is, lmk about this", time: "1:54 AM" },
        { sender: "client", text: "I like this a lot, let me send over to client! I think you SNAPPED.", time: "1:58 AM" },
        { sender: "me", text: "Yessir delivered in 12 hours 😂💪", time: "1:59 AM" },
        { sender: "client", text: "Love it bro, if you can do more of this and stuff like that with quick delivery, I'll have TONS and I mean TONS of work for you.", time: "2:00 AM" }
      ],
      highlightQuote: "I think you SNAPPED.",
      highlightText: "SNAPPED."
    }
  ]);

  return (
    <section id="verdicts" className="relative py-16 sm:py-28 bg-dark-bg overflow-hidden border-b border-white/5">
      {/* Background Ambience Props */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header - Styled elegantly matching the aesthetic */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-400 mb-4 tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Client Feedback
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tight text-white mb-4 sm:mb-6 leading-none">
            Testimonials
          </h2>
          <p className="text-neutral-300 max-w-3xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Browse real client conversations, project approvals, and feedback from creators and businesses we've worked with.
          </p>
        </div>

        {/* Column Grid: Left Column (Testimonial Video) | Right Column (Command Testimonials Hub) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Massive Prominent Video Hub */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-dark-card border border-white/5 rounded-3xl p-5 relative overflow-hidden group/vbox shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none" />
              
              <h3 className="text-base font-display font-semibold text-white mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Client Testimonial
              </h3>
              <p className="text-[11px] text-neutral-400 mb-5 font-mono">
                Video Testimonial
              </p>

              {/* Video Player Display */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-black group/video cursor-pointer">
                <video
                  ref={videoRef}
                  src="/CLient testimonial.MP4"
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                {/* Visual Cover Shadow Mask with simple play/pause handoff */}
                <div 
                  className="absolute inset-0 bg-transparent" 
                  onClick={() => {
                    if (!videoRef.current) return;
                    if (videoRef.current.paused) {
                      videoRef.current.play().catch(() => {});
                      setIsPlaying(true);
                    } else {
                      videoRef.current.pause();
                      setIsPlaying(false);
                    }
                  }}
                />

                {/* Big Center Play/Pause Indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 ${isPlaying ? "opacity-0 scale-90 group-hover/video:opacity-100 group-hover/video:scale-100" : "opacity-100 scale-100"}`}>
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white translate-x-0.5" />}
                  </div>
                </div>

                {/* Sound control strip */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono tracking-wider text-[#bcbcc5] uppercase block">
                      Testimonial Playback
                    </span>
                    <span className="text-[10px] text-[#dac4ff] font-mono font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping inline-block" /> VSL.mp4
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (!videoRef.current) return;
                      videoRef.current.muted = !videoRef.current.muted;
                      setIsMuted(videoRef.current.muted);
                    }}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: High fidelity Testimonials Feed Console (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-display font-black text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Client Feedback Feed
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Select a conversation to view real client feedback and project discussions.
                </p>
              </div>
              <span className="text-[10px] font-mono text-purple-400 border border-purple-500/20 bg-purple-500/5 px-2.5 py-1 rounded font-bold uppercase tracking-wider shrink-0 self-start">
                6 Active Logs
              </span>
            </div>

            {/* Grid for Message Inbox & Live Chat replica (compact, viewable at a single glance) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Active Channels Selector Panel */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="text-[10px] text-neutral-400 font-mono font-extrabold tracking-wider uppercase flex items-center justify-between px-1">
                  <span>CLIENT CONVERSATIONS</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] text-[#dac4ff] font-bold">VERIFIED</span>
                  </span>
                </div>

                {/* Horizontal slider on mobile, stable vertical stack on desktop/tablets */}
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto pb-3 lg:pb-0 scrollbar-none lg:max-h-[440px] pr-1">
                  {slots.map((slot) => {
                    const isActive = slot.id === activeSlotId;
                    return (
                      <button
                        key={slot.id}
                        onClick={() => setActiveSlotId(slot.id)}
                        className={`text-left p-3 rounded-2xl border transition-all relative flex items-start gap-2.5 shrink-0 w-[240px] sm:w-[280px] lg:w-full select-none cursor-pointer ${
                          isActive
                            ? "bg-purple-500/10 border-purple-500/30 shadow-[0_4px_20px_rgba(168,85,247,0.12)] bg-gradient-to-r from-purple-500/10 via-rose-500/5 to-transparent"
                            : "bg-dark-card/40 border-white/5 hover:border-white/10 hover:bg-dark-card/90"
                        }`}
                      >
                        {/* Channel Avatar/Active indicator */}
                        <div className="relative shrink-0 pt-0.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-colors ${
                            isActive 
                              ? "bg-gradient-to-tr from-purple-500 to-rose-500 text-white border-white/20" 
                              : "bg-dark-card border-white/5 text-neutral-400"
                          }`}>
                            {slot.id}
                          </div>
                          <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-black animate-pulse" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className={`font-display font-black text-xs tracking-wide truncate ${
                              isActive ? "text-white" : "text-neutral-400"
                            }`}>
                              {slot.authorTitle}
                            </span>
                            <span className="text-[8px] font-mono text-neutral-500 shrink-0">
                              {slot.date}
                            </span>
                          </div>
                          
                          {/* Key highlight quote block */}
                          <p className={`text-[10px] truncate leading-normal font-light ${
                            isActive ? "text-neutral-200" : "text-neutral-500"
                          }`}>
                            "{slot.highlightQuote}"
                          </p>

                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[7.5px] font-mono uppercase tracking-widest text-[#a855f7] font-extrabold bg-[#a855f7]/10 border border-[#a855f7]/20 px-1 py-0.2 rounded scale-90 origin-left">
                              {slot.metric}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chat Viewport Panel */}
              <div className="lg:col-span-7 flex flex-col justify-between relative min-h-[380px] lg:min-h-[440px]">
                {(() => {
                  const activeSlot = slots.find(s => s.id === activeSlotId) || slots[0];
                  return (
                    <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-dark-card h-full flex flex-col justify-between shadow-2xl select-none">
                      <ChatScreenshotReplica slot={activeSlot} />
                    </div>
                  );
                })()}
              </div>

            </div>

            {/* Compact guidance bar */}
            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#bc93ff] animate-pulse mt-1 shrink-0" />
              <p className="text-[11px] text-neutral-400 font-mono leading-relaxed">
                <span className="text-purple-300 font-bold">Client Note:</span> Select any conversation on the left to browse real client feedback and project discussions.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
