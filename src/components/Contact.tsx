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

  // Scheduler States
  const [selectedDate, setSelectedDate] = useState<string>("June 3, 2026");
  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM EST");
  const [schedulerBooked, setSchedulerBooked] = useState(false);

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
    const messageText = `Hello! I'm ${name}.${businessName ? ` from ${businessName}.` : ""} I'd like to make an enquiry.\n\nWork Email: ${email}\nPhone: ${phone || "N/A"}\nBudget: ${budgetLabel}${message ? `\nBottlenecks & Context: ${message}` : ""}`;
    const whatsappUrl = `https://wa.me/+916392591533?text=${encodeURIComponent(messageText)}`;
    
    // Simulate API storage locally
    localStorage.setItem("addictive_lead", JSON.stringify({ name, businessName, email, phone, budget, message, date: new Date().toISOString() }));
    
    // Transfer to WhatsApp in a new window/tab
    window.location.href = whatsappUrl;
    
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-28 bg-dark-bg overflow-hidden border-t border-white/5">
      {/* Dynamic ambient backdrop light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] purple-glow opacity-10 pointer-events-none" />

      <div className="max-w-[95rem] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Main section titles */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full mb-4 text-xs font-mono font-bold text-rose-400 uppercase">
            <Calendar className="w-3.5 h-3.5 animate-spin" />
            <span>ACCELERATOR SEED LAB</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white">
            Let's Build Something <br />
            <span className="bg-gradient-to-r from-purple-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Addictive.
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-neutral-400 text-xs sm:text-sm md:text-base font-light px-2">
            Fill out the details below to initiate your high-retention content journey. When submitted, you will be transferred instantly to our direct WhatsApp line.
          </p>
        </div>

        {/* Centered Single Panel Structure */}
        <div className="max-w-2xl mx-auto">
          
          {/* Panel Left: Premium lead capture form */}
          <div className="bg-white/[0.02] border border-white/5 p-4 sm:p-8 rounded-3xl backdrop-blur-xl relative shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="absolute top-0 right-4 sm:right-8 -translate-y-1/2 bg-rose-500 text-black text-[8px] sm:text-[9px] uppercase font-mono font-semibold px-2.5 sm:px-3 py-1 rounded-full shadow-lg">
              FAST VERIFICATION SYSTEM Active
            </div>

            <h3 className="font-display font-black text-base sm:text-xl text-white mb-6">
              Project Initiation Intake
            </h3>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Marcus Vance"
                        className="w-full bg-dark-bg/40 border border-white/5 focus:border-rose-400 focus:outline-none rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-neutral-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Business Name</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Aether Wear"
                        className="w-full bg-dark-bg/40 border border-white/5 focus:border-rose-400 focus:outline-none rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-neutral-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="marcus@aetherwear.com"
                        className="w-full bg-dark-bg/40 border border-white/5 focus:border-rose-400 focus:outline-none rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-neutral-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-dark-bg/40 border border-white/5 focus:border-rose-400 focus:outline-none rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-neutral-600 transition-colors"
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
                          className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-[10px] sm:text-xs font-semibold border transition-all text-center ${
                            budget === opt.value
                              ? "bg-rose-500/20 border-rose-500 text-rose-300"
                              : "bg-dark-bg/20 border-white/5 text-neutral-400 hover:bg-dark-bg/50 hover:text-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Briefly explain your bottlenecks...</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="We have trouble keeping viewers past 3 seconds, ad cost is double our past metrics..."
                      className="w-full bg-dark-bg/40 border border-white/5 focus:border-rose-400 focus:outline-none rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-neutral-600 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-3">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#25d366]/85 to-[#128c7e] hover:from-[#25d366] hover:to-[#128c7e] text-white font-bold text-xs sm:text-sm uppercase rounded-xl tracking-wider shadow-lg hover:shadow-emerald-500/20 active:scale-[0.97] transition-all cursor-pointer text-center select-none"
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
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="font-display font-black text-xl text-white">Transferring to WhatsApp!</h4>
                  <p className="text-xs text-[#bcbcc5] max-w-sm">
                    Hey <span className="text-rose-400 font-bold">{name}</span>, if your WhatsApp chat has not loaded automatically, click the button below to join.
                  </p>
                  <a
                    href={`https://wa.me/+916392591533?text=${encodeURIComponent(
                      `Hello! I'm ${name}.${businessName ? ` from ${businessName}.` : ""} I would like to make an enquiry.\n\nWork Email: ${email}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-emerald-500 text-black font-bold uppercase rounded-xl tracking-widest text-xs hover:bg-emerald-400 transition-colors inline-block"
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
