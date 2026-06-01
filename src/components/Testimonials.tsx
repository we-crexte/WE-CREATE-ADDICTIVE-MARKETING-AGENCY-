import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Sparkles, 
  Check, 
  CheckCheck, 
  Paperclip, 
  ShieldCheck, 
  Smartphone,
  MessageSquare
} from "lucide-react";
import { TESTIMONIALS } from "../types";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];

  // Helper to render highlight quote word overlays
  const renderQuote = (quote: string, highlight: string) => {
    if (!highlight) return <span>{quote}</span>;
    const parts = quote.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span 
              key={index} 
              className="font-black italic bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent underline decoration-sky-500/30"
            >
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <section id="testimonials" className="relative py-28 bg-[#070708] overflow-hidden border-t border-neutral-900">
      {/* Background radial glow effects for cosmic aesthetic */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid background backing overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 text-xs font-mono font-bold text-blue-400 uppercase tracking-widest animate-pulse">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>EXECUTIVE VERDICTS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
            Verifiable Gratitude. <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              No Fabricated PR Reviews.
            </span>
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Direct, raw snapshots of high-end partner delivery. True feedback extracted directly from real client threads.
          </p>

          {/* Quick switcher navigation line */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {TESTIMONIALS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 border cursor-pointer ${
                  activeIndex === idx
                    ? "bg-blue-500/15 border-blue-500/40 text-blue-300 font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                    : "bg-white/5 border-white/5 text-neutral-500 hover:text-neutral-300 hover:bg-white/10"
                }`}
              >
                {item.highlightText}
              </button>
            ))}
          </div>
        </div>

        {/* Focus Showcase Board */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              
              {/* LEFT SIDE: iPhone/Desktop Mock Real Chat Thread Window (1 lg block) */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="w-full max-w-md mx-auto aspect-[10/14] bg-[#0c0c0e] border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col relative group">
                  {/* Outer phone glare lines */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                  
                  {/* Sleek Mock Messenger Header */}
                  <div className="p-4 bg-[#121215] border-b border-white/5 shrink-0 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {/* Status blinking indicator */}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#121215]" />
                        <div className={`w-10 h-10 rounded-full ${current.clientColor} text-white font-display font-black text-sm flex items-center justify-center tracking-wider shadow-inner`}>
                          {current.clientInitials}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{current.clientName}</span>
                          <span className="px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-[8px] font-mono text-blue-400 rounded">Verified Partner</span>
                        </div>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{current.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-neutral-400">
                        <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
                      </div>
                    </div>
                  </div>

                  {/* Messaging Area scrolls/renders mock chats */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col bg-[#070708] select-text">
                    
                    {/* Date Header identifier if any */}
                    {current.dateHeader && (
                      <div className="text-center my-2">
                        <span className="text-[9px] font-mono tracking-widest text-neutral-600 uppercase bg-white/5 px-2.5 py-0.5 rounded border border-white/5">
                          {current.dateHeader}
                        </span>
                      </div>
                    )}

                    {/* Speech Bubbles */}
                    {current.messages.map((msg, index) => {
                      const isMe = msg.sender === "me";
                      return (
                        <div
                          key={index}
                          className={`flex flex-col max-w-[85%] ${
                            isMe ? "self-end items-end" : "self-start items-start"
                          }`}
                        >
                          {msg.isAttachment ? (
                            /* Attachment message styling */
                            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-3.5 text-left text-neutral-200 shadow-md flex items-center gap-3 group/item transition-all hover:border-blue-500/30">
                              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                <Paperclip className="w-4 h-4 text-blue-400" />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-xs font-bold text-white truncate max-w-[200px]">
                                  {msg.attachmentName || "Whitelabel file"}
                                </p>
                                <p className="text-[10px] font-mono text-neutral-500 mt-0.5 truncate">
                                  drive.google.com
                                </p>
                              </div>
                            </div>
                          ) : (
                            /* Standard Message Bubble */
                            <div
                              className={`px-4 py-2.5 text-sm rounded-2xl shadow-lg leading-relaxed ${
                                isMe
                                  ? "bg-blue-600 text-white rounded-tr-none text-right font-medium relative"
                                  : "bg-neutral-800/85 text-neutral-200 rounded-tl-none font-light"
                              }`}
                            >
                              <p className="whitespace-pre-line text-xs md:text-sm">{msg.text}</p>
                            </div>
                          )}

                          {/* Time & Delivery Checkmark Status */}
                          {msg.time && (
                            <div className="flex items-center gap-1.5 mt-1 text-[9px] font-mono text-neutral-400">
                              <span>{msg.time}</span>
                              {isMe && (
                                <CheckCheck className="w-3.5 h-3.5 text-blue-400 stroke-[3]" />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}

                  </div>

                  {/* Sleek bottom input drawer (static visual cue) */}
                  <div className="p-3 bg-[#121215] border-t border-white/5 shrink-0 flex items-center justify-between gap-3 font-mono text-[10px] text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                      <span>SECURE RECORD DECLASSIFIED</span>
                    </span>
                    <span className="text-neutral-600">v1.07</span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Impeccable high-contrast Quote & Verdict Stats Block (6 lg block) */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="p-6 md:p-8 flex flex-col justify-between h-full bg-[#0c0c0e]/40 border border-white/5 rounded-3xl relative overflow-hidden backdrop-blur-sm">
                  {/* Ambient top glowing line */}
                  <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-blue-500 to-transparent" />
                  
                  <div>
                    {/* Beautiful floating giant quotes background */}
                    <div className="text-blue-500/5 mb-8">
                      <Quote className="w-16 h-16 fill-blue-500/5" />
                    </div>

                    {/* The highlight title string verbatim */}
                    <h3 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight leading-[1.1] select-all">
                      {renderQuote(current.highlightQuote, current.highlightText)}
                    </h3>

                    {/* Client attribution and agency logs info card */}
                    <div className="mt-10 pt-8 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${current.clientColor} flex items-center justify-center font-display font-bold text-xs text-white`}>
                          {current.clientInitials}
                        </div>
                        <div>
                          <p className="font-display font-bold text-sm text-white">{current.clientName}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{current.role} &mdash; <span className="text-blue-400 font-mono text-[10px] uppercase font-bold">{current.company}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational verification metadata */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400/80 bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span>APPROVED WORK CONVERSATION SECURED</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-neutral-600 block">DELIVERY FLOW</span>
                      <span className="text-xs font-mono font-bold text-neutral-300 block">HYPER-ACCELERATED</span>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Carousel custom direction navigators */}
          <div className="flex justify-center md:justify-end gap-3 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white/5 hover:bg-white/10 hover:text-white transition-all rounded-full border border-white/10 text-neutral-400 active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="Previous Testimonial Snapshot"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 bg-white/5 hover:bg-white/10 hover:text-white transition-all rounded-full border border-white/10 text-neutral-400 active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="Next Testimonial Snapshot"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
