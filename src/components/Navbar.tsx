import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Menu, X, MessageSquare, PhoneCall } from "lucide-react";
import AdictiveLogo from "./AdictiveLogo";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  const menuItems = [
    { label: "Case Studies", href: "#case-studies" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Founder", href: "#founder" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleMobileNav = (e: MouseEvent<HTMLAnchorElement>, href: string, isExternal = false) => {
    // Let standard HTML anchor link navigation work naturally.
    // Simply close the mobile menu immediately to allow seamless scroll orchestration.
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-dark-bg/85 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group">
            <AdictiveLogo iconSize="w-8 h-8" textSize="text-base" className="group-hover:scale-[1.02] transition-transform duration-300" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-rose-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser && (
              <a
                href="#portfolio"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-purple-500/20 transition-all cursor-pointer group shadow-[0_0_15px_rgba(168,85,247,0.05)]"
                title={`${currentUser.displayName || currentUser.email} is Active`}
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="User profile"
                    className="w-6 h-6 rounded-full border border-purple-500/30 object-cover shrink-0 select-none group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-[10px] font-bold text-purple-400 select-none">
                    A
                  </div>
                )}
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white transition-colors tracking-tight font-bold pr-1">
                  ADMIN ACTIVE
                </span>
              </a>
            )}
            <a
              href="#contact"
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 rounded-full animate-[gradient-border_3s_infinite_linear] bg-[length:200%_auto]" />
              <div className="relative px-5 py-2.5 bg-dark-card rounded-full flex items-center gap-2 group-hover:bg-dark-card/80 transition-all duration-300">
                <span className="text-sm font-semibold text-white tracking-wide uppercase">
                  START YOUR JOURNEY
                </span>
                <PhoneCall className="w-4 h-4 text-rose-400 animate-pulse" />
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-50 bg-dark-bg/98 backdrop-blur-2xl border-b border-white/5 md:hidden w-full overflow-hidden"
            >
              <div className="px-4 sm:px-6 py-6 flex flex-col gap-5">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleMobileNav(e, item.href)}
                    className="text-lg font-display font-medium text-neutral-300 hover:text-white transition-colors py-1 block cursor-pointer"
                  >
                    {item.label}
                  </a>
                ))}
                <hr className="border-white/5 my-2" />
                <div className="flex flex-col gap-4">
                  <a
                    href="https://wa.me/+916392591533"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => handleMobileNav(e, "https://wa.me/+916392591533", true)}
                    className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-full text-neutral-300 hover:bg-white/5 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-rose-500" />
                    <span>WhatsApp Chat</span>
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => handleMobileNav(e, "#contact")}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-rose-500 rounded-full text-white font-semibold uppercase text-sm tracking-wider cursor-pointer"
                  >
                    <span>START YOUR JOURNEY</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
