import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Calendar, 
  Clock, 
  Send, 
  Sparkles, 
  Check,
  User,
  Briefcase,
  Mail
} from "lucide-react";

const BUDGET_OPTIONS = [
  { label: "Under $5k/mo", value: "under-5k" },
  { label: "$5k - $10k/mo", value: "5k-10k" },
  { label: "$10k - $25k/mo", value: "10k-25k" },
  { label: "$25k+/mo", value: "25k-plus" },
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM"
];

export default function Contact() {
  // Simple booking form states
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time || !budget) return;

    // Format date beautifully
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const budgetLabel = BUDGET_OPTIONS.find(opt => opt.value === budget)?.label || budget;

    const messageText = `⚡ NEW STRATEGY CALL BOOKED ⚡\n\n` + 
      `👤 Client Name: ${name}\n` +
      `📧 Email: ${email}\n` +
      `💼 Business: ${businessName || "N/A"}\n` +
      `💰 Monthly Budget: ${budgetLabel}\n\n` +
      `📅 Requested Date: ${formattedDate}\n` +
      `🕒 Requested Time: ${time}\n\n` +
      `📝 Context / Goals:\n${message || "No additional context provided."}`;

    const url = `https://wa.me/+916392591533?text=${encodeURIComponent(messageText)}`;
    setWhatsappUrl(url);
    
    // Save locally
    localStorage.setItem("addictive_booking_lead", JSON.stringify({
      name,
      businessName,
      email,
      date: formattedDate,
      time,
      budget: budgetLabel,
      message,
      createdAt: new Date().toISOString()
    }));

    setIsBooked(true);
    
    // Open WhatsApp directly in a new tab/app window without navigating the current website page away
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-dark-bg overflow-hidden border-t border-white/5">
      {/* Background soft glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/60 border border-neutral-800 rounded-full mb-4 text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>SECURE BOOKING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-4 uppercase">
            BOOK A FREE <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-accent-gold bg-clip-text text-transparent font-black">STRATEGY CALL</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed">
            Fill in your details below and pick your preferred time. We will instantly redirect you to WhatsApp to lock in your call.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!isBooked ? (
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-neutral-950 border border-white/5 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl relative text-left"
            >
              {/* Profile/Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Your Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-emerald-500/50 focus:ring-0 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Work Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@yourbrand.com"
                      className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-emerald-500/50 focus:ring-0 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Business / Instagram Name</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. My Brand / @username"
                      className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-emerald-500/50 focus:ring-0 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Monthly Video Budget *</label>
                  <select
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-emerald-500/50 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 transition-colors cursor-pointer"
                  >
                    <option value="" disabled className="text-neutral-700">Select your budget</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-neutral-950 text-neutral-300">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-emerald-500/50 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-xs text-white transition-colors cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Preferred Time Slot *</label>
                  <select
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-emerald-500/50 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 transition-colors cursor-pointer"
                  >
                    <option value="" disabled className="text-neutral-700">Select a time slot</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-neutral-950 text-neutral-300">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Tell us about your brand (Optional)</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your goals and what you're looking to achieve..."
                  className="w-full bg-neutral-900/40 border border-neutral-800 focus:border-emerald-500/50 focus:ring-0 focus:outline-none rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-700 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-accent-gold text-black font-extrabold text-xs uppercase rounded-xl tracking-widest hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-xl text-center select-none"
              >
                <Send className="w-4 h-4" />
                <span>Schedule Call via WhatsApp</span>
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-neutral-950 border border-white/10 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-accent-gold" />
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Booking Successful</span>
                <h3 className="text-2xl font-display font-black text-white uppercase">You're All Set!</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  Excellent, <span className="text-white font-bold">{name}</span>! Your requested details have been prepared. Your WhatsApp app or a new web tab should have opened automatically. If not, click the button below to send the booking message directly!
                </p>
              </div>

              <div className="border border-white/5 rounded-xl bg-neutral-900/40 p-5 text-left divide-y divide-white/5 space-y-3.5 max-w-md mx-auto">
                <div className="flex justify-between items-center pb-2.5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">DATE</span>
                  <span className="text-xs font-bold text-white uppercase">
                    {new Date(date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">TIME</span>
                  <span className="text-xs font-bold text-white font-mono uppercase">{time}</span>
                </div>
                <div className="flex justify-between items-center pt-2.5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">STATUS</span>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">READY</span>
                </div>
              </div>

              <a
                href={whatsappUrl || `https://wa.me/+916392591533`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-white text-black font-mono text-[10px] uppercase font-extrabold tracking-wider rounded-xl hover:bg-neutral-200 transition-colors shadow-lg"
              >
                Send WhatsApp Message Now
              </a>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
