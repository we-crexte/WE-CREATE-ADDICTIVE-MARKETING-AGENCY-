import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MessageSquare, Calendar, Check, Send, Sparkles, Clock, MapPin } from "lucide-react";

export default function Contact() {
  // Form States
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const budgetOptions = [
    { label: "Under $5k/mo", value: "under-5k" },
    { label: "$5k - $10k/mo", value: "5k-10k" },
    { label: "$10k - $25k/mo", value: "10k-25k" },
    { label: "$25k+/mo", value: "25k-plus" },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !budget) return;
    
    const budgetLabel = budgetOptions.find(opt => opt.value === budget)?.label || budget;
    const messageText = `Hello! I'm ${name}.${businessName ? ` from ${businessName}.` : ""} I'd like to make an enquiry.\n\nWork Email: ${email}\nPhone: ${phone || "N/A"}\nBudget: ${budgetLabel}${message ? `\nGoals & Context: ${message}` : ""}`;
    const whatsappUrl = `https://wa.me/+916392591533?text=${encodeURIComponent(messageText)}`;
    
    // Simulate API storage locally
    localStorage.setItem("addictive_lead", JSON.stringify({ name, businessName, email, phone, budget, message, date: new Date().toISOString() }));
    
    // Transfer to WhatsApp in a new window/tab
    window.location.href = whatsappUrl;
    
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-dark-bg overflow-hidden border-t border-white/5">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] orange-glow opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] purple-glow opacity-10 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Main section titles */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/60 border border-neutral-800 rounded-full mb-4 text-xs font-mono font-bold text-neutral-400 uppercase">
            <Calendar className="w-3.5 h-3.5 text-accent-purple" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-white mb-4">
            Let's Build Something <br />
            <span className="bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold bg-clip-text text-transparent font-black">
              Great together.
            </span>
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed px-2">
            Fill out the details below to start. Once submitted, you will be transferred to our direct WhatsApp line to discuss your project.
          </p>
        </div>

        {/* Centered Single Panel Structure */}
        <div className="max-w-2xl mx-auto">
          
          {/* Panel: Premium lead capture form */}
          <div className="bg-dark-card border border-white/5 p-6 sm:p-10 rounded-2xl relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-4 sm:right-10 -translate-y-1/2 bg-neutral-900 border border-neutral-800 text-neutral-400 text-[8px] sm:text-[9px] uppercase font-mono font-bold px-3 py-1 rounded-full">
              Inquiry Intake
            </div>

            <h3 className="font-display font-black text-lg sm:text-xl text-white mb-6 text-left">
              Project Onboarding Request
            </h3>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6 text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Marcus Vance"
                        className="w-full bg-neutral-950 border border-white/10 focus:border-accent-purple focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-700 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Business Name</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Aether Wear"
                        className="w-full bg-neutral-950 border border-white/10 focus:border-accent-purple focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-700 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@aetherwear.com"
                        className="w-full bg-neutral-950 border border-white/10 focus:border-accent-purple focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-700 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-neutral-950 border border-white/10 focus:border-accent-purple focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-700 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Budget Selector buttons */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2.5 font-bold">Monthly Marketing Budget *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setBudget(opt.value)}
                          className={`py-3 px-4 rounded-xl text-[10px] sm:text-xs font-bold border transition-all text-center cursor-pointer ${
                            budget === opt.value
                              ? "bg-white border-white text-black font-extrabold shadow-lg"
                              : "bg-neutral-950 border-white/10 text-neutral-400 hover:bg-neutral-900 hover:text-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Tell us about your project...</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What are your main goals and what kind of content do you need?"
                      className="w-full bg-neutral-950 border border-white/10 focus:border-accent-purple focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-700 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-3">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold text-white font-extrabold text-xs sm:text-sm uppercase rounded-full tracking-wider hover:opacity-90 active:scale-95 transition-all cursor-pointer text-center select-none shadow-xl"
                    >
                      <Send className="w-4 h-4 shrink-0" />
                      <span>Submit & Enquire via WhatsApp</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-2">
                    <Check className="w-8 h-8 text-accent-purple" />
                  </div>
                  <h4 className="font-display font-black text-xl text-white">Transferring to WhatsApp!</h4>
                  <p className="text-xs text-[#bcbcc5] max-w-sm font-sans font-light">
                    Hey <span className="text-white font-bold">{name}</span>, if your WhatsApp chat has not loaded automatically, click the button below to join.
                  </p>
                  <a
                    href={`https://wa.me/+916392591533?text=${encodeURIComponent(
                      `Hello! I'm ${name}.${businessName ? ` from ${businessName}.` : ""} I would like to make an enquiry.\n\nWork Email: ${email}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 bg-gradient-to-r from-accent-purple via-accent-orange to-accent-gold text-white font-extrabold uppercase rounded-full tracking-widest text-xs hover:opacity-90 transition-all inline-block shadow-xl"
                  >
                    Open WhatsApp Chat
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono font-bold uppercase text-neutral-500 hover:text-white underline block pt-2"
                  >
                    Edit form details
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
