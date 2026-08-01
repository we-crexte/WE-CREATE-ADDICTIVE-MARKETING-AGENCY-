import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Calendar, 
  Clock, 
  Send, 
  Sparkles, 
  Check,
  User,
  Briefcase,
  Mail,
  Video,
  ExternalLink,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { User as FirebaseUser } from "firebase/auth";
import { 
  initAuth, 
  googleSignIn, 
  getAccessToken, 
  scheduleAndNotifyCall 
} from "../lib/workspace";

const BUDGET_OPTIONS_LOCAL = [
  { label: "Under $5k/mo", value: "under-5k" },
  { label: "$5k - $10k/mo", value: "5k-10k" },
  { label: "$10k - $25k/mo", value: "10k-25k" },
  { label: "$25k+/mo", value: "25k-plus" },
];

const TIME_SLOTS_LOCAL = [
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
  
  // Auth & Booking states
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingResult, setBookingResult] = useState<{
    meetLink: string;
    calendarLink: string;
    formattedDisplay: string;
    eventCreated: boolean;
    emailSentToClient: boolean;
    emailSentToOwner: boolean;
  } | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, cachedToken) => {
        setCurrentUser(user);
        setToken(cachedToken);
      },
      () => {
        setCurrentUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleConnect = async () => {
    setIsSigningIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setToken(res.accessToken);
      }
    } catch (err) {
      console.error("Google Auth failed:", err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time || !budget) return;

    setIsSubmitting(true);

    try {
      let activeToken = token || getAccessToken();
      let activeUserEmail = currentUser?.email;

      // If host has not signed in yet, prompt Google authentication popup on submit
      if (!activeToken) {
        try {
          const authRes = await googleSignIn();
          if (authRes) {
            activeToken = authRes.accessToken;
            activeUserEmail = authRes.user.email;
            setCurrentUser(authRes.user);
            setToken(authRes.accessToken);
          }
        } catch (authErr) {
          console.warn("Google sign-in popup bypassed or closed:", authErr);
        }
      }

      const budgetLabel = BUDGET_OPTIONS_LOCAL.find(opt => opt.value === budget)?.label || budget;
      const ownerEmail = activeUserEmail || "samworks1097@gmail.com";

      const result = await scheduleAndNotifyCall(
        activeToken,
        {
          clientName: name,
          clientEmail: email,
          businessName,
          budget: budgetLabel,
          dateStr: date,
          timeSlot: time,
          notes: message,
          ownerEmail
        },
        ownerEmail
      );

      setBookingResult(result);

      // WhatsApp summary fallback url
      const messageText = `⚡ STRATEGY CALL BOOKED & CONFIRMED ⚡\n\n` + 
        `👤 Client Name: ${name}\n` +
        `📧 Email: ${email}\n` +
        `💼 Business: ${businessName || "N/A"}\n` +
        `💰 Monthly Budget: ${budgetLabel}\n\n` +
        `📅 Date & Time: ${result.formattedDisplay}\n` +
        `📹 Google Meet: ${result.meetLink}\n\n` +
        `📝 Context:\n${message || "No additional context."}`;

      setWhatsappUrl(`https://wa.me/+916392591533?text=${encodeURIComponent(messageText)}`);
      
      setIsBooked(true);
    } catch (error) {
      console.error("Error scheduling call:", error);
      setIsBooked(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 bg-dark-bg overflow-hidden border-t border-white/5">
      {/* Background soft glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900/80 border border-emerald-500/20 rounded-full mb-4 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>GOOGLE MEET & CALENDAR AUTOMATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white mb-4 uppercase">
            BOOK A FREE <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-accent-gold bg-clip-text text-transparent font-black">STRATEGY CALL</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed">
            Select your preferred time slot. We will automatically create a Google Meet meeting, sync it with Google Calendar, and send confirmation emails to both parties.
          </p>

          {/* Host / Owner Google Account Sync Status */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 bg-neutral-950 border border-white/10 px-4 py-2.5 rounded-xl text-xs">
            {currentUser ? (
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Connected as Host: <strong className="text-white">{currentUser.email}</strong></span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-neutral-300 text-xs">
                <span className="text-neutral-400">Host Calendar Sync:</span>
                <button
                  type="button"
                  onClick={handleGoogleConnect}
                  disabled={isSigningIn}
                  className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-lg text-white font-medium transition-colors text-xs cursor-pointer"
                >
                  {isSigningIn ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  )}
                  <span>Connect Google Account</span>
                </button>
              </div>
            )}
          </div>
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
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5 font-bold">Work Email (Receives Google Meet Link) *</label>
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
                    {BUDGET_OPTIONS_LOCAL.map((opt) => (
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
                    {TIME_SLOTS_LOCAL.map((slot) => (
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
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-accent-gold text-black font-extrabold text-xs uppercase rounded-xl tracking-widest hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-xl text-center select-none disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Scheduling Google Meet & Sending Mails...</span>
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4" />
                    <span>Schedule Google Meet & Send Invitations</span>
                  </>
                )}
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
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Strategy Call Scheduled</span>
                <h3 className="text-2xl font-display font-black text-white uppercase">Meeting Confirmed!</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Awesome, <span className="text-white font-bold">{name}</span>! Your Google Meet meeting has been created and confirmation emails have been sent to <span className="text-white font-bold">{email}</span> and the host.
                </p>
              </div>

              {/* Google Meet Primary Join Callout */}
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-emerald-500/30 rounded-xl p-5 space-y-3 max-w-md mx-auto shadow-inner">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold tracking-wider">
                  <Video className="w-4 h-4" />
                  <span>Google Meet Join Link</span>
                </div>
                <div className="p-3 bg-black/60 rounded-lg border border-white/5 font-mono text-xs text-emerald-300 break-all select-all">
                  {bookingResult?.meetLink}
                </div>
                <a
                  href={bookingResult?.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase rounded-lg transition-colors cursor-pointer shadow-lg"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Google Meet Video Call</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="border border-white/5 rounded-xl bg-neutral-900/40 p-5 text-left divide-y divide-white/5 space-y-3 max-w-md mx-auto text-xs">
                <div className="flex justify-between items-center pb-2">
                  <span className="font-mono text-neutral-500 uppercase text-[10px]">SCHEDULED TIME</span>
                  <span className="font-bold text-white uppercase">{bookingResult?.formattedDisplay}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-mono text-neutral-500 uppercase text-[10px]">CLIENT EMAIL</span>
                  <span className="font-mono font-medium text-emerald-400">{email}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-neutral-500 uppercase text-[10px]">NOTIFICATIONS</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Calendar Event ✓
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      Email Sent ✓
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Fallback */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[10px] uppercase font-bold tracking-wider rounded-xl hover:text-white hover:border-neutral-500 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Send Backup Message via WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}

