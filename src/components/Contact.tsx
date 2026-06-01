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
    setSubmitted(true);
    // Simulate API storage locally
    localStorage.setItem("addictive_lead", JSON.stringify({ name, businessName, email, phone, budget, message, date: new Date().toISOString() }));
  };

  const handleBookingConfirm = () => {
    setSchedulerBooked(true);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#0a0a0c] overflow-hidden border-t border-white/5">
      {/* Dynamic ambient backdrop light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] purple-glow opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main section titles */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full mb-4 text-xs font-mono font-bold text-rose-400 uppercase">
            <Calendar className="w-3.5 h-3.5 animate-spin" />
            <span>ACCELERATOR SEED LAB</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white">
            Let's Build Something <br />
            <span className="bg-gradient-to-r from-purple-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Addictive.
            </span>
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base font-light">
            Verify the parameters below, secure your digital extraction briefing, or select an entry slot on our founder's calendar.
          </p>
        </div>

        {/* Double-Panel Split: Form left, Custom Scheduler right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Panel Left: Premium lead capture form */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-blur-xl relative shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-rose-500 text-black text-[9px] uppercase font-mono font-semibold px-3 py-1 rounded-full shadow-lg">
              FAST VERIFICATION SYSTEM Active
            </div>

            <h3 className="font-display font-black text-xl text-white mb-6">
              1. Project Initiation Intake
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Marcus Vance"
                        className="w-full bg-black/40 border border-white/5 focus:border-rose-400 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Business Name</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Aether Wear"
                        className="w-full bg-black/40 border border-white/5 focus:border-rose-400 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 transition-colors"
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
                        className="w-full bg-black/40 border border-white/5 focus:border-rose-400 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-black/40 border border-white/5 focus:border-rose-400 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 transition-colors"
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
                          className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all text-center ${
                            budget === opt.value
                              ? "bg-rose-500/20 border-rose-500 text-rose-300"
                              : "bg-black/20 border-white/5 text-neutral-400 hover:bg-black/50 hover:text-white"
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
                      className="w-full bg-black/40 border border-white/5 focus:border-rose-400 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-3">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-bold text-sm uppercase rounded-xl tracking-wider shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Intake Enquiry</span>
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
                  <h4 className="font-display font-black text-xl text-white">Intake Secured!</h4>
                  <p className="text-xs text-[#bcbcc5] max-w-sm">
                    Hey <span className="text-rose-400 font-bold">{name}</span>, your brand extraction file has been registered. Now, grab a slot on the calendar to finalize the plan.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono font-bold uppercase text-neutral-500 hover:text-white underline"
                  >
                    Resubmit a variation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Panel Right: Premium integrated Calendly scheduler representation */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-blur-xl relative shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <h3 className="font-display font-black text-xl text-white mb-2">
              2. Secure Strategy Brief
            </h3>
            <p className="text-xs text-neutral-400 font-sans mb-6">
              Skip typing and lock in a direct live extraction mapping with us instantly.
            </p>

            <div className="rounded-2xl bg-black p-5 border border-white/10 overflow-hidden relative">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-rose-500 flex items-center justify-center text-white text-xs font-mono font-black border-2 border-white/5">
                  AM
                </div>
                <div className="text-left">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-amber-400 font-bold">15-minute Strategy</span>
                  <h4 className="text-sm font-bold text-white">Addictive Extraction Sync</h4>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-neutral-400">
                    <Clock className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                    <span>Zoom Call</span>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!schedulerBooked ? (
                  <motion.div
                    key="scheduler-view"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-2 font-bold">Select briefing date</span>
                      <div className="grid grid-cols-3 gap-2">
                        {["June 3, 2026", "June 4, 2026", "June 5, 2026"].map((dt) => (
                          <button
                            key={dt}
                            type="button"
                            onClick={() => setSelectedDate(dt)}
                            className={`py-2 px-3 rounded-lg text-[11px] font-mono transition-all text-center ${
                              selectedDate === dt ? "bg-[#1c1c24] border-rose-400 border text-white" : "bg-white/[0.02] border-white/5 border text-neutral-400 hover:text-white"
                            }`}
                          >
                            {dt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-2 font-bold">Select briefing slot</span>
                      <div className="grid grid-cols-2 gap-2">
                        {["10:00 AM EST", "1:30 PM EST", "4:00 PM EST"].map((tm) => (
                          <button
                            key={tm}
                            type="button"
                            onClick={() => setSelectedTime(tm)}
                            className={`py-2 px-3 rounded-lg text-[11px] font-mono transition-all text-center ${
                              selectedTime === tm ? "bg-[#1c1c24] border-rose-400 border text-white" : "bg-white/[0.02] border-white/5 border text-neutral-400 hover:text-white"
                            }`}
                          >
                            {tm}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleBookingConfirm}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] text-white text-xs font-mono font-bold uppercase rounded-xl tracking-wider transition-all cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Appointment Slot</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="scheduler-finished"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center flex flex-col items-center justify-center space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <Check className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h5 className="font-display font-extrabold text-sm text-white">Your Sync is Locked!</h5>
                    <p className="text-[11px] text-neutral-400">
                      We'll see you on <span className="text-rose-400 font-bold">{selectedDate}</span> at <span className="text-amber-400 font-bold">{selectedTime}</span>. Calendar invite dispatched to your matching email address.
                    </p>
                    <button
                      onClick={() => setSchedulerBooked(false)}
                      className="text-[10px] font-mono uppercase font-bold text-neutral-500 hover:text-white underline"
                    >
                      Reschedule slot
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Alternative Premium Direct Channels */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <a
                href="https://wa.me/#"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/[0.02] hover:bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:text-black transition-colors" />
                </div>
                <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase mt-2">WhatsApp</span>
              </a>

              <a
                href="mailto:contact@addictivemarketing.io"
                className="p-3 bg-white/[0.02] hover:bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <Mail className="w-4 h-4 text-rose-500 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase mt-2">Email Desk</span>
              </a>

              <a
                href="tel:+"
                className="p-3 bg-white/[0.02] hover:bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Phone className="w-4 h-4 text-amber-500 group-hover:text-black transition-colors" />
                </div>
                <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase mt-2">Hotline</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
