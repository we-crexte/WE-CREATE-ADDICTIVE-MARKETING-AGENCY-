import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Menu, X, Flame, MessageSquare, PhoneCall } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Showreel", href: "#showreel" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Founder", href: "#founder" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-[#070708]/85 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-rose-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-9 h-9 bg-black rounded-full flex items-center justify-center border border-white/10">
                <Flame className="w-5 h-5 text-rose-500 group-hover:text-amber-400 transition-colors duration-300 fill-rose-500/20" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg tracking-wider bg-gradient-to-r from-white via-neutral-200 to-rose-400 bg-clip-text text-transparent">
                ADDICTIVE
              </span>
              <span className="text-[9px] uppercase font-mono tracking-[0.3em] text-amber-400/80 -mt-1 font-bold">
                MARKETING
              </span>
            </div>
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
            <a
              href="https://wa.me/#"
              target="_blank"
              rel="noreferrer"
              className="text-xs p-2 text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
              <span>WhatsApp Direct</span>
            </a>
            
            <a
              href="#contact"
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 rounded-full animate-[gradient-border_3s_infinite_linear] bg-[length:200%_auto]" />
              <div className="relative px-5 py-2.5 bg-[#0e0e11] rounded-full flex items-center gap-2 group-hover:bg-[#0e0e11]/80 transition-all duration-300">
                <span className="text-sm font-semibold text-white tracking-wide">
                  Book Strategy Call
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
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-[#070708]/95 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-display font-medium text-neutral-300 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-white/5 my-2" />
              <div className="flex flex-col gap-4">
                <a
                  href="https://wa.me/#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-full text-neutral-300 hover:bg-white/5"
                >
                  <MessageSquare className="w-4 h-4 text-rose-500" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-rose-500 rounded-full text-white font-semibold"
                >
                  <span>Book Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
