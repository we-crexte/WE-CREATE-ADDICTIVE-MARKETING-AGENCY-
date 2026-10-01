import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MessageCircle,
  Send,
  Sparkles,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Phone
} from "lucide-react";

// ============================================================================
// 📱 WHATSAPP CONTACT CONFIGURATION
// You can customize the WhatsApp number below or via VITE_WHATSAPP_NUMBER in .env
// Format: Country code without '+' or symbols (e.g. "916392591533" for +91 6392591533)
// ============================================================================
export const WHATSAPP_PHONE_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "916392591533";

const SERVICES = [
  "Short-Form Growth (Reels / TikTok)",
  "YouTube & Long-Form Video",
  "Full Content System & Distribution",
  "Brand Direction & Creative Strategy"
];

const BUDGETS = [
  "Under $1,500 / mo",
  "$1,500 – $3,500 / mo",
  "$3,500 – $7,500 / mo",
  "$7,500+ / mo"
];

export default function Contact() {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Compose professional WhatsApp message
    const formattedMessage = [
      "🚀 *New Project Inquiry — Adictive Marketing*",
      "",
      `👤 *Name:* ${name.trim() || "Not specified"}`,
      `🏢 *Brand / Handle:* ${handle.trim() || "Not specified"}`,
      `📱 *Contact / Email:* ${contactInfo.trim() || "Not specified"}`,
      `🎯 *Service Required:* ${service}`,
      `💰 *Estimated Budget:* ${budget}`,
      "",
      "📝 *Project Details & Goals:*",
      message.trim() || "Ready to scale content and accelerate brand visibility."
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;

    setSubmitted(true);

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Reset status after short duration
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  const handleDirectChat = () => {
    const directMessage = "Hi Adictive Marketing! I'm interested in scaling my content and working with your team. Can we chat?";
    const directUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(directMessage)}`;
    window.open(directUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-dark-bg overflow-hidden border-t border-white/5 font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-accent-purple/15 via-accent-orange/15 to-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900/90 border border-emerald-500/30 rounded-full mb-4 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest shadow-lg">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>DIRECT ACCESS // 24-HOUR RESPONSE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white mb-4 uppercase">
            LET'S BUILD SOMETHING{" "}
            <span className="bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold bg-clip-text text-transparent font-black">
              ADICTIVE
            </span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Send us your project details below to open a direct WhatsApp strategy chat with our team.
          </p>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Connection & Highlights */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick WhatsApp Action Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-card/90 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-accent-gold" />
              
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg font-display tracking-tight">
                    Direct WhatsApp
                  </h3>
                  <p className="text-emerald-400 text-xs font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available & Online
                  </p>
                </div>
              </div>

              <p className="text-neutral-300 text-sm font-light leading-relaxed mb-6">
                Prefer to skip the form and chat directly? Connect directly with our founder and strategy team on WhatsApp right now.
              </p>

              <button
                type="button"
                onClick={handleDirectChat}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-neutral-950" />
                <span>Instant WhatsApp Chat</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Direct Phone:</span>
                <span className="text-white font-bold tracking-wider">+91 63925 91533</span>
              </div>
            </div>

            {/* Why Adictive Marketing Guarantee Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/60 border border-white/5 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-accent-purple/10 border border-accent-purple/20 text-accent-purple mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">Rapid 2-Hour Response</h4>
                  <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                    We review incoming channel inquiries daily and get back with actionable feedback fast.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-accent-orange/10 border border-accent-orange/20 text-accent-orange mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">Custom Content Blueprint</h4>
                  <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                    No cookie-cutter scripts. We craft tailored hooks, visual pacing, and editing styles suited to your niche.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-accent-gold/10 border border-accent-gold/20 text-accent-gold mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">100% Confidential</h4>
                  <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                    Your brand metrics, unreleased assets, and campaign details remain completely private.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: WhatsApp Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-10 rounded-3xl bg-dark-card/90 border border-white/10 backdrop-blur-xl relative shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div>
                  <h3 className="text-white text-xl sm:text-2xl font-display font-black tracking-tight uppercase">
                    Project Inquiry
                  </h3>
                  <p className="text-neutral-400 text-xs font-light mt-1">
                    Fill in your details below and hit send to open your formatted WhatsApp message.
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-accent-orange hidden sm:block" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Handle Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Your Name <span className="text-accent-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Brand / Social Handle
                    </label>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="e.g. @yourbrand or website"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                    />
                  </div>
                </div>

                {/* Phone / Email */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Your WhatsApp Number / Contact Info <span className="text-accent-orange">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="e.g. +1 555-0199 or email@domain.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                    />
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                    Service You Are Interested In
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setService(s)}
                        className={`text-left px-3.5 py-3 rounded-xl border text-xs font-mono transition-all duration-200 ${
                          service === s
                            ? "bg-accent-purple/20 border-accent-purple text-white shadow-[0_0_15px_rgba(139,92,246,0.2)] font-bold"
                            : "bg-black/40 border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Selection */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                    Estimated Monthly Budget
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`text-center px-2.5 py-2.5 rounded-xl border text-[11px] font-mono transition-all duration-200 ${
                          budget === b
                            ? "bg-accent-orange/20 border-accent-orange text-white shadow-[0_0_15px_rgba(249,115,22,0.2)] font-bold"
                            : "bg-black/40 border-white/5 text-neutral-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message / Goals */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Tell Us About Your Brand & Goals
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your current content, what bottlenecks you have, or your target views/leads..."
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-neutral-950 font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4 text-neutral-950" />
                    <span>Send Inquiry on WhatsApp</span>
                    <ArrowRight className="w-4 h-4 text-neutral-950" />
                  </button>
                </div>

                {/* Success Feedback state */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-xs font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Opening WhatsApp with your pre-filled inquiry...</span>
                  </motion.div>
                )}

                <p className="text-center text-[10px] font-mono text-neutral-500">
                  ⚡ Clicking send will launch WhatsApp with your pre-filled details so you can review before sending.
                </p>

              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
